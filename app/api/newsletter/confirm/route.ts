import { type NextRequest, NextResponse } from "next/server"
import { confirmSubscription, verifyConfirm } from "@/lib/newsletter"

export async function GET(request: NextRequest) {
  const done = (status: string) => NextResponse.redirect(new URL(`/newsletter?status=${status}`, request.url), 303)

  const signup = await verifyConfirm(request.nextUrl.searchParams).catch(() => null)
  if (!signup) return done("expired")

  const ok = await confirmSubscription(signup.email, signup.name)
  // The confirmation itself is the consent record: who, when, and where they signed up.
  if (ok) console.log(`Newsletter: confirmed signup from ${signup.source} at ${new Date().toISOString()}`)
  return done(ok ? "confirmed" : "error")
}
