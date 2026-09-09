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

    if (session.metadata?.type === "product_order") {
      const { productName } = session.metadata
      const shipping = session.collected_information?.shipping_details
      const address = shipping?.address
      const addressLines = address
        ? [address.line1, address.line2, address.city, address.state, address.postal_code, address.country]
            .filter(Boolean)
            .join(", ")
        : "Not provided"

      const emailContent = `
New PAID Shop Order — dropship fulfillment needed

Product: ${productName}
Amount paid: £${((session.amount_total || 0) / 100).toFixed(2)}

Customer:
- Name: ${shipping?.name || session.customer_details?.name || "Not provided"}
- Email: ${session.customer_details?.email || "Not provided"}

Ship the supplier order to:
${addressLines}

Stripe session: ${session.id}

ACTION NEEDED: Place this order with your supplier now, using the address above as the delivery address.
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
          subject: `Shop order — ${productName} — PAID, needs fulfilling`,
          text: emailContent,
        }),
      })

      if (!resendResponse.ok) {
        console.error("Resend error on product order confirmation:", await resendResponse.text())
        // Same reasoning as the inspection booking above — this email is the only record of the
        // order and its shipping address, so Stripe must retry rather than silently succeed.
        return NextResponse.json({ error: "Failed to send order email" }, { status: 502 })
      }
    }
  }

  return NextResponse.json({ received: true })
}
