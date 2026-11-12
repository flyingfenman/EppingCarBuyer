import { type NextRequest, NextResponse } from "next/server"
import { SENDERS } from "@/lib/email-sender"

// Stamford Car Buyer's contact and Market & Sell forms send through here when the Stamford site can't
// send email itself (for example when its own RESEND_API_KEY isn't set), so an enquiry isn't lost.
// Henry no longer has the Stamford mailbox, so it goes to his Epping inbox; every Stamford subject
// starts with "Stamford", so they stand out. Like the public contact forms, the most it can be used
// for is a message to Henry.
// The Pro Vehicle Inspections contact form uses it the same way when that site's Resend key is refused;
// its subjects start with "Pro Vehicle Inspections: ".
const INBOX = "henry@eppingcarbuyer.com"
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function send(from: string, subject: string, text: string, replyTo?: string): Promise<boolean> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [INBOX], subject, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
    })
    if (response.ok) return true
    console.error(`Stamford enquiry relay: Resend refused ${from}:`, await response.text())
  } catch (error) {
    console.error(`Stamford enquiry relay: could not reach Resend as ${from}:`, error)
  }
  return false
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const subject = typeof body.subject === "string" ? body.subject.replace(/\s+/g, " ").trim().slice(0, 200) : ""
  const text = typeof body.text === "string" ? body.text.trim().slice(0, 8000) : ""
  const replyTo = typeof body.replyTo === "string" && EMAIL_PATTERN.test(body.replyTo.trim()) ? body.replyTo.trim() : undefined

  // Every Stamford and Pro Vehicle Inspections enquiry subject starts one of these ways.
  if (!(subject.startsWith("Stamford ") || subject.startsWith("Pro Vehicle Inspections: ")) || !text) {
    return NextResponse.json({ error: "Invalid enquiry" }, { status: 400 })
  }

  for (const from of SENDERS) {
    if (await send(from, subject, text, replyTo)) return NextResponse.json({ success: true })
  }
  return NextResponse.json({ error: "Could not send the enquiry" }, { status: 502 })
}
