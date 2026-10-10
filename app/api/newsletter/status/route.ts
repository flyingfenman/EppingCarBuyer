import { NextResponse } from "next/server"
import { newsletterReady } from "@/lib/newsletter"

export const dynamic = "force-dynamic"

// Lets the signup form and tick boxes stay hidden until the newsletter secrets are set.
export async function GET() {
  return NextResponse.json({ ready: newsletterReady() })
}
