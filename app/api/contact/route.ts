import { type NextRequest, NextResponse } from "next/server"
import { parseContactDetail } from "@/lib/contact"

function clean(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : ""
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  // Hidden from people; bots fill it in. Pretend success so they don't retry.
  if (clean(body.website, 200)) return NextResponse.json({ success: true })

  const name = clean(body.name, 100)
  const contact = parseContactDetail(clean(body.contact, 200))
  const message = clean(body.message, 2000)
  const source = (body.trafficSource || {}) as { label?: unknown; detail?: unknown; landingPage?: unknown }
  const sourceLabel = clean(source.label, 60)
  const sourceDetail = clean(source.detail, 120)
  const landingPage = clean(source.landingPage, 120)

  if (!name) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 })
  }
  if (!contact) {
    return NextResponse.json({ error: "Please enter a phone number or email so we can reply to you." }, { status: 400 })
  }

  const replyLine =
    contact.kind === "phone"
      ? `Phone: ${contact.phone}\nWhatsApp them: https://wa.me/${contact.whatsappNumber}`
      : `Email: ${contact.email} (just hit reply)`

  const text = `
New message from the website contact form

Name: ${name}
${replyLine}

Message:
${message || "(No message, they'd like you to get in touch)"}

How they found us: ${sourceLabel || "Direct / unknown"}${sourceDetail ? ` (${sourceDetail})` : ""}
Landing page: ${landingPage || "Unknown"}
Sent: ${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}
  `.trim()

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Epping Car Buyer <noreply@eppingcarbuyer.com>",
      to: ["henry@eppingcarbuyer.com"],
      ...(contact.kind === "email" ? { reply_to: contact.email } : {}),
      subject: `Website message from ${name}`,
      text,
    }),
  })

  if (!resendResponse.ok) {
    console.error("Resend error sending contact form message:", await resendResponse.text())
    return NextResponse.json({ error: "Your message didn't send." }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
