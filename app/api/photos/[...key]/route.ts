import { photoBucket } from "@/lib/photo-storage"

// Serves photos stored in the Cloudflare R2 bucket. Names include a timestamp, so they never change.
const ALLOWED_KEY = /^(cars|valuations)\/[A-Za-z0-9._\/-]+$/

export async function GET(_request: Request, { params }: { params: Promise<{ key: string[] }> }) {
  const { key } = await params
  const objectKey = key.join("/")
  const bucket = photoBucket()

  if (!bucket || !ALLOWED_KEY.test(objectKey) || objectKey.includes("..")) {
    return new Response("Not found", { status: 404 })
  }

  const object = await bucket.get(objectKey)
  if (!object) return new Response("Not found", { status: 404 })

  return new Response(object.body, {
    headers: {
      "Content-Type": object.httpMetadata?.contentType ?? "image/jpeg",
      "Content-Length": String(object.size),
      ETag: object.httpEtag,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  })
}
