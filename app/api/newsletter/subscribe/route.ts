import { type NextRequest, NextResponse } from "next/server"
import { normaliseEmail, requestSubscription, type SignupSource } from "@/lib/newsletter"

const SOURCES: SignupSource[] = ["footer", "newsletter-page", "contact-form"]

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  // Hidden from people; bots fill it in. Pretend success so they don't retry.
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ success: true })

  const email = normaliseEmail(body.email)
  if (!email) return NextResponse.json({ error: "Please check your email address." }, { status: 400 })
  const name = typeof body.name === "string" ? body.name : ""
  const source = SOURCES.includes(body.source as SignupSource) ? (body.source as SignupSource) : "footer"

  try {
    if (!(await requestSubscription(email, name, source))) {
      return NextResponse.json({ error: "We couldn't send the confirmation email." }, { status: 502 })
    }
  } catch (error) {
    console.error("Newsletter signup failed:", error)
    return NextResponse.json({ error: "We couldn't send the confirmation email." }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
