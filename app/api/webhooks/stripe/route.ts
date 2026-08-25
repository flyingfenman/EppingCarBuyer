import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature || !webhookSecret) {
    console.error("Stripe webhook: missing signature or webhook secret")
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    if (session.metadata?.type === "inspection_booking") {
      const {
        packageName, slotStart, slotEnd, registration, location, sellerName, sellerPhone, advertUrl,
        customerName, customerPhone, customerEmail, notes,
      } = session.metadata

      const emailContent = `
New PAID Vehicle Inspection Booking

Package: ${packageName}
Slot: ${new Date(slotStart).toLocaleString("en-GB", { timeZone: "Europe/London", dateStyle: "full", timeStyle: "short" })} – ${new Date(slotEnd).toLocaleString("en-GB", { timeZone: "Europe/London", timeStyle: "short" })}

Vehicle Details:
- Registration: ${registration}
- Where the car is: ${location}
- Seller name: ${sellerName || "Not provided"}
- Seller contact number: ${sellerPhone || "Not provided"}
- Advert link: ${advertUrl || "Not provided"}

Customer Details:
- Name: ${customerName}
- Phone: ${customerPhone}
- Email: ${customerEmail}

Additional Notes:
${notes || "None provided"}

Amount paid: £${((session.amount_total || 0) / 100).toFixed(2)}
Stripe session: ${session.id}
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
          subject: `Vehicle inspection request — ${registration} (${packageName}) — PAID`,
          text: emailContent,
        }),
      })

      if (!resendResponse.ok) {
        console.error("Resend error on inspection booking confirmation:", await resendResponse.text())
        // Fail the webhook so Stripe retries with backoff — there's no database here, so this email
        // is the only record of a paid booking. A silent 200 here would mean money taken with nobody
        // ever finding out.
        return NextResponse.json({ error: "Failed to send confirmation email" }, { status: 502 })
      }
    }
  }

  return NextResponse.json({ received: true })
}
