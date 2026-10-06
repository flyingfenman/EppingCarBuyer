import { getCloudflareContext } from "@opennextjs/cloudflare"

// Photo storage. On Cloudflare the photos live in the R2 bucket bound as PHOTOS (see wrangler.jsonc) and are
// served back through /api/photos/... . Anywhere else (the site is still on Vercel) they go to Vercel Blob as
// before, so the same code works in both places until the move is finished.

export type PhotoObject = {
  body: ReadableStream
  size: number
  httpEtag: string
  httpMetadata?: { contentType?: string }
}

export type PhotoBucket = {
  put(key: string, value: ArrayBuffer, options?: { httpMetadata?: { contentType?: string } }): Promise<unknown>
  get(key: string): Promise<PhotoObject | null>
}

export const MAX_PHOTO_BYTES = 20 * 1024 * 1024

// Only real photo types are accepted, and the type we store is our own (never an uploaded SVG or HTML file).
const PHOTO_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  heic: "image/heic",
  heif: "image/heif",
  avif: "image/avif",
}

export function photoBucket(): PhotoBucket | null {
  try {
    const env = getCloudflareContext().env as { PHOTOS?: PhotoBucket }
    return env.PHOTOS ?? null
  } catch {
    // Not running on Cloudflare.
    return null
  }
}

export function photoContentType(file: File): string | null {
  if (Object.values(PHOTO_TYPES).includes(file.type)) return file.type
  const extension = file.name.split(".").pop()?.toLowerCase() ?? ""
  return PHOTO_TYPES[extension] ?? null
}

// Returns a message for the customer if the file can't be accepted, otherwise null.
export function checkPhoto(file: File): string | null {
  if (file.size === 0) return "That file is empty"
  if (file.size > MAX_PHOTO_BYTES) return "That photo is too large (20MB is the most)"
  if (!photoContentType(file)) return "Please choose a photo (JPG, PNG, WebP, HEIC)"
  return null
}

export function safeName(name: string) {
  return name.replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(-80) || "photo"
}

// Stores the photo and returns where to find it. `absoluteFrom` makes the address a full link (for emails).
export async function savePhoto(key: string, file: File, absoluteFrom?: string): Promise<string> {
  const bucket = photoBucket()
  if (bucket) {
    await bucket.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: photoContentType(file) ?? "image/jpeg" } })
    const path = `/api/photos/${key}`
    return absoluteFrom ? new URL(path, absoluteFrom).toString() : path
  }
  const { put } = await import("@vercel/blob")
  const blob = await put(key, file, { access: "public" })
  return blob.url
}
