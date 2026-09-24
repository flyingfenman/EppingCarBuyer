import { type NextRequest, NextResponse } from "next/server"

const TOPICS: Record<string, string> = {
  booking: "Booking an inspection",
  question: "Question about an inspection",
  selling: "Market & Sell",
  other: "Something else",
}

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
  const phone = clean(body.phone, 30)
  const email = clean(body.email, 200)
  const message = clean(body.message, 2000)
  const topic = TOPICS[clean(body.topic, 20)] || ""
  const source = (body.trafficSource || {}) as { label?: unknown; detail?: unknown; landingPage?: unknown }
  const sourceLabel = clean(source.label, 60)
  const sourceDetail = clean(source.detail, 120)
  const landingPage = clean(source.landingPage, 120)

  const phoneDigits = phone.replace(/\D/g, "")
  const hasPhone = phoneDigits.length >= 10 && phoneDigits.length <= 15
  const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (!name) {
    return NextResponse.json({ error: "Please tell us your name." }, { status: 400 })
  }
  if (!hasPhone && !hasEmail) {
    return NextResponse.json({ error: "Please give us a phone number or an email so we can reply." }, { status: 400 })
  }

  const whatsappNumber = phoneDigits.startsWith("0") ? `44${phoneDigits.slice(1)}` : phoneDigits
  const text = `
New message from the website contact form

Name: ${name}
Phone: ${phone || "Not provided"}${hasPhone ? `\nWhatsApp them: https://wa.me/${whatsappNumber}` : ""}
Email: ${email || "Not provided"}
About: ${topic || "Not specified"}

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
      ...(hasEmail ? { reply_to: email } : {}),
      subject: `Website message from ${name}${topic ? `: ${topic}` : ""}`,
      text,
    }),
  })

  if (!resendResponse.ok) {
    console.error("Resend error sending contact form message:", await resendResponse.text())
    return NextResponse.json({ error: "Your message didn't send." }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
