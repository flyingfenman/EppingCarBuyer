import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

async function sendEmail(to: string, subject: string, text: string): Promise<boolean> {
  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Epping Car Buyer <noreply@eppingcarbuyer.com>",
      to: [to],
      subject,
      text,
    }),
  })

  if (!resendResponse.ok) {
    console.error(`Resend error sending "${subject}" to ${to}:`, await resendResponse.text())
    return false
  }
  return true
}

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

      const amountPaid = `£${((session.amount_total || 0) / 100).toFixed(2)}`
      const slotFull = new Date(slotStart).toLocaleString("en-GB", { timeZone: "Europe/London", dateStyle: "full", timeStyle: "short" })
      const slotEndTime = new Date(slotEnd).toLocaleString("en-GB", { timeZone: "Europe/London", timeStyle: "short" })

      const internalEmail = `
New PAID Vehicle Inspection Booking

Package: ${packageName}
Slot: ${slotFull} – ${slotEndTime}

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

Amount paid: ${amountPaid}
Stripe session: ${session.id}
      `.trim()

      const customerEmailBody = `
Hi ${customerName.split(" ")[0]},

Your ${packageName} is booked and paid for — thanks!

When: ${slotFull}
Vehicle: ${registration}
Where: ${location}
Amount paid: ${amountPaid}

Henry will call or message you beforehand to confirm the details, then meet you at the car, run the full
inspection, and talk you through everything he finds — before you hand over any money to the seller.

Questions in the meantime? WhatsApp Henry directly: https://wa.me/441992367909

Thanks,
Epping Car Buyer
      `.trim()

      const [internalOk, customerOk] = await Promise.all([
        sendEmail(
          "henry@eppingcarbuyer.com",
          `Vehicle inspection request — ${registration} (${packageName}) — PAID`,
          internalEmail
        ),
        sendEmail(customerEmail, `Booking confirmed — ${packageName} on ${slotFull}`, customerEmailBody),
      ])

      if (!internalOk || !customerOk) {
        // Fail the webhook so Stripe retries with backoff — there's no database here, so these emails
        // are the only record of a paid booking. A silent 200 here would mean money taken with nobody
        // (Henry or the customer) ever finding out. A retry may re-send whichever email already
        // succeeded too — a harmless duplicate, worth accepting over a silently missing one.
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

      const amountPaid = `£${((session.amount_total || 0) / 100).toFixed(2)}`
      const customerName = shipping?.name || session.customer_details?.name || "there"
      const customerEmail = session.customer_details?.email

      const internalEmail = `
New PAID Shop Order — dropship fulfillment needed

Product: ${productName}
Amount paid: ${amountPaid}

Customer:
- Name: ${customerName}
- Email: ${customerEmail || "Not provided"}

Ship the supplier order to:
${addressLines}

Stripe session: ${session.id}

ACTION NEEDED: Place this order with your supplier now, using the address above as the delivery address.
      `.trim()

      const customerEmailBody = `
Hi ${customerName.split(" ")[0]},

Thanks for your order — payment received.

Item: ${productName}
Amount paid: ${amountPaid}

We'll get this dispatched and email you once it's on its way.

Questions? WhatsApp us: https://wa.me/441992367909

Thanks,
Epping Car Buyer
      `.trim()

      const emailTasks = [sendEmail("henry@eppingcarbuyer.com", `Shop order — ${productName} — PAID, needs fulfilling`, internalEmail)]
      if (customerEmail) {
        emailTasks.push(sendEmail(customerEmail, `Order confirmed — ${productName}`, customerEmailBody))
      }
      const results = await Promise.all(emailTasks)

      if (results.some((ok) => !ok)) {
        // Same reasoning as the inspection booking above — these emails are the only record of the
        // order and its shipping address, so Stripe must retry rather than silently succeed.
        return NextResponse.json({ error: "Failed to send order email" }, { status: 502 })
      }
    }
  }

  return NextResponse.json({ received: true })
}
