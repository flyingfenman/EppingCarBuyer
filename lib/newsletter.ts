import "server-only"

// The Friday newsletter list. People join it only by asking to, and only once they click the link in the
// confirmation email, so every address on the list has a record of saying yes (UK GDPR and PECR).
// Contacts live in Resend's "Newsletter" segment; broadcasts sent from Resend carry its
// own unsubscribe link ({{{RESEND_UNSUBSCRIBE_URL}}}), which updates the contact there.

const NEWSLETTER_SEGMENT_ID = process.env.RESEND_NEWSLETTER_SEGMENT_ID || "4a2023ec-5a07-4db5-9817-775951af74ff"
const FROM = "Henry at Epping Car Buyer <noreply@eppingcarbuyer.com>"
const REPLY_TO = "henry@eppingcarbuyer.com"
const SITE = "https://www.eppingcarbuyer.com"
// A confirmation link older than this is refused, so a stale or forwarded email can't sign someone up later.
const CONFIRM_LINK_DAYS = 7

export type SignupSource = "footer" | "newsletter-page" | "contact-form" | "booking"

export function normaliseEmail(value: unknown): string | null {
  if (typeof value !== "string") return null
  const email = value.trim().toLowerCase().slice(0, 200)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null
}

function base64url(bytes: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

async function sign(payload: string): Promise<string> {
  const secret = process.env.NEWSLETTER_SECRET
  if (!secret) throw new Error("NEWSLETTER_SECRET is not configured")
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"])
  return base64url(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload)))
}

function sameText(a: string, b: string) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

// Confirmation links carry the name and where they signed up, so nothing is stored until they click.
export async function verifyConfirm(params: URLSearchParams) {
  const email = normaliseEmail(params.get("e"))
  const name = (params.get("n") || "").slice(0, 100)
  const source = params.get("s") || ""
  const issued = Number(params.get("d"))
  const token = params.get("t") || ""
  if (!email || !Number.isFinite(issued)) return null
  if (Date.now() - issued > CONFIRM_LINK_DAYS * 24 * 60 * 60 * 1000) return null
  const expected = await sign([email, name, source, issued].join("|"))
  return sameText(token, expected) ? { email, name, source } : null
}

async function resend(path: string, method: string, body?: unknown) {
  return fetch(`https://api.resend.com${path}`, {
    method,
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
}

// Sends the "please confirm" email. Nothing is added to the list here.
export async function requestSubscription(email: string, name: string, source: SignupSource): Promise<boolean> {
  const issued = Date.now()
  const cleanName = name.trim().slice(0, 100)
  const params = new URLSearchParams({ e: email, n: cleanName, s: source, d: String(issued) })
  params.set("t", await sign([email, cleanName, source, issued].join("|")))
  const confirmUrl = `${SITE}/api/newsletter/confirm?${params}`
  const firstName = cleanName.split(/\s+/)[0]

  const text = `${firstName ? `Hi ${firstName},` : "Hi,"}

Someone (hopefully you) asked to get the Epping Car Buyer newsletter at this address. It's a short email from me on Fridays about buying and selling used cars.

To start getting it, confirm here:
${confirmUrl}

If this wasn't you, ignore this email and you won't hear from me again.

Henry
Epping Car Buyer
${SITE}`

  const response = await resend("/emails", "POST", {
    from: FROM,
    reply_to: REPLY_TO,
    to: [email],
    subject: "Confirm your Epping Car Buyer newsletter",
    text,
  })
  if (!response.ok) console.error(`Newsletter: confirmation email to ${email} refused:`, await response.text())
  return response.ok
}

// Called from the confirmation link: adds them to the Newsletter segment, or re-subscribes them if they left before.
export async function confirmSubscription(email: string, name: string): Promise<boolean> {
  const [firstName, ...rest] = name.trim().split(/\s+/)
  const created = await resend("/contacts", "POST", {
    email,
    first_name: firstName || undefined,
    last_name: rest.join(" ") || undefined,
    unsubscribed: false,
    segments: [{ id: NEWSLETTER_SEGMENT_ID }],
  })
  if (created.ok) return true

  // Already a contact (for example they unsubscribed once and came back): switch them back on and add the segment.
  const updated = await resend(`/contacts/${encodeURIComponent(email)}`, "PATCH", { unsubscribed: false })
  if (!updated.ok) {
    console.error(`Newsletter: could not add ${email}:`, await created.text(), await updated.text())
    return false
  }
  const segment = await resend(`/contacts/${encodeURIComponent(email)}/segments/${NEWSLETTER_SEGMENT_ID}`, "POST")
  if (!segment.ok && segment.status !== 409) console.error(`Newsletter: could not add ${email} to the segment:`, await segment.text())
  return true
}
