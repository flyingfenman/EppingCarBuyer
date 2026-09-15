import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ""
const WHATSAPP_ICON = "https://cdn.simpleicons.org/whatsapp/FFFFFF"
const FONT_STACK = "'Fredoka','Trebuchet MS',Arial,Helvetica,sans-serif"

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function whatsappButton(label: string) {
  return `<div style="text-align:center;margin-top:26px;">
    <a href="https://wa.me/441992367909" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;font-family:${FONT_STACK};font-size:14px;font-weight:700;padding:13px 20px;border-radius:12px;">
      <img src="${WHATSAPP_ICON}" width="18" height="18" border="0" alt="WhatsApp" style="display:inline-block;width:18px;height:18px;vertical-align:middle;margin-right:8px;">${escapeHtml(label)}
    </a>
  </div>`
}

function brandedEmail(title: string, contentHtml: string) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:#f5f2f7;font-family:${FONT_STACK};color:#171717;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f2f7;padding:28px 12px;font-family:${FONT_STACK};">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 6px 24px rgba(43,20,60,.08);font-family:${FONT_STACK};">
          <tr>
            <td style="background:#6711a4;padding:28px 34px;">
              <div style="font-family:${FONT_STACK};font-size:30px;line-height:1.1;font-weight:700;color:#ffffff;letter-spacing:-.4px;">Epping Car Buyer</div>
              <div style="font-family:${FONT_STACK};font-size:12px;line-height:1.5;color:#eadcf3;margin-top:5px;">Independent vehicle buying, selling and inspections</div>
            </td>
          </tr>
          <tr>
            <td style="padding:34px;">
              <div style="font-family:${FONT_STACK};font-size:25px;line-height:1.25;font-weight:700;color:#24142f;margin:0 0 22px;">${escapeHtml(title)}</div>
              ${contentHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:0 34px 34px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #e8e1ec;padding-top:24px;font-family:${FONT_STACK};">
                <tr>
                  <td>
                    <div style="font-family:${FONT_STACK};font-size:15px;color:#2b2330;line-height:1.7;">Kind regards,</div>
                    <div style="font-family:${FONT_STACK};font-size:22px;font-weight:700;color:#6711a4;margin-top:8px;">Henry</div>
                    <div style="font-family:${FONT_STACK};font-size:14px;font-weight:600;color:#2b2330;margin-top:2px;">Epping Car Buyer</div>
                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:10px;font-family:${FONT_STACK};">
                      <tr>
                        <td style="padding-right:8px;vertical-align:middle;">
                          <a href="https://wa.me/441992367909" style="text-decoration:none;">
                            <img src="${WHATSAPP_ICON}" width="18" height="18" border="0" alt="WhatsApp" style="display:block;width:18px;height:18px;background:#25D366;border-radius:50%;padding:3px;">
                          </a>
                        </td>
                        <td style="vertical-align:middle;">
                          <a href="https://wa.me/441992367909" style="font-family:${FONT_STACK};font-size:13px;line-height:1.7;color:#128C7E;text-decoration:none;font-weight:700;">01992 367909</a>
                        </td>
                      </tr>
                    </table>
                    <div style="font-family:${FONT_STACK};font-size:13px;color:#6f6575;line-height:1.7;margin-top:7px;">
                      <a href="https://www.eppingcarbuyer.com" style="font-family:${FONT_STACK};color:#6711a4;text-decoration:none;font-weight:700;">www.eppingcarbuyer.com</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <div style="font-family:${FONT_STACK};font-size:11px;color:#8b8190;padding:16px 10px 0;line-height:1.5;">Epping Car Buyer</div>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function textToHtml(text: string) {
  return `<div style="font-family:${FONT_STACK};font-size:15px;line-height:1.75;color:#342c38;white-space:pre-line;">${escapeHtml(text)}</div>`
}

function infoTable(rows: Array<[string, string]>) {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0;background:#f8f5fa;border:1px solid #eadff0;border-radius:14px;overflow:hidden;margin:22px 0;font-family:${FONT_STACK};">
    ${rows.map(([label, value], index) => `<tr>
      <td style="padding:13px 16px;font-family:${FONT_STACK};font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#786a80;${index ? "border-top:1px solid #eadff0;" : ""}">${escapeHtml(label)}</td>
      <td style="padding:13px 16px;font-family:${FONT_STACK};font-size:14px;font-weight:600;color:#26182e;text-align:right;${index ? "border-top:1px solid #eadff0;" : ""}">${escapeHtml(value)}</td>
    </tr>`).join("")}
  </table>`
}

async function sendEmail(to: string, subject: string, text: string, html?: string): Promise<boolean> {
  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Epping Car Buyer <noreply@eppingcarbuyer.com>",
      reply_to: "henry@eppingcarbuyer.com",
      to: [to],
      subject,
      text,
      html: html || brandedEmail(subject, textToHtml(text)),
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
        packageName, includeEvSoh, slotStart, slotEnd, registration, location, sellerName, sellerPhone, advertUrl,
        customerName, customerPhone, customerEmail, notes,
      } = session.metadata

      const hasEvSoh = includeEvSoh === "yes"
      const amountPaid = `£${((session.amount_total || 0) / 100).toFixed(2)}`
      const slotFull = new Date(slotStart).toLocaleString("en-GB", { timeZone: "Europe/London", dateStyle: "full", timeStyle: "short" })
      const slotEndTime = new Date(slotEnd).toLocaleString("en-GB", { timeZone: "Europe/London", timeStyle: "short" })
      const evSohLine = hasEvSoh ? "\nEV Battery SOH add on: YES. CARA Approved® Autel EV Battery Health Test report required" : ""

      const internalEmail = `
New PAID Vehicle Inspection Booking

Package: ${packageName}${evSohLine}
Slot: ${slotFull} to ${slotEndTime}

Vehicle Details:
Registration: ${registration}
Where the car is: ${location}
Seller name: ${sellerName || "Not provided"}
Seller contact number: ${sellerPhone || "Not provided"}
Advert link: ${advertUrl || "Not provided"}

Customer Details:
Name: ${customerName}
Phone: ${customerPhone}
Email: ${customerEmail}

Additional Notes:
${notes || "None provided"}

Amount paid: ${amountPaid}
Stripe session: ${session.id}
      `.trim()

      const customerEmailBody = `
Hi ${customerName.split(" ")[0]},

Your ${packageName} is booked and paid for. Thank you.
${hasEvSoh ? "\nYou have also added the £49.99 EV Battery State of Health Report using the CARA Approved® Autel EV Battery Health Test. Vehicle compatibility will be confirmed from the car details.\n" : ""}
When: ${slotFull}
Vehicle: ${registration}
Where: ${location}
Amount paid: ${amountPaid}

Henry will call or message you beforehand to confirm the details. He will then meet you at the car, complete the full inspection and talk you through everything found before you hand over any money to the seller.
${hasEvSoh ? "\nYour EV battery health report will be supplied with your inspection findings.\n" : ""}
Questions in the meantime? WhatsApp Henry directly on 01992 367909.
      `.trim()

      const customerHtml = brandedEmail(
        "Your vehicle inspection is confirmed",
        `<div style="font-family:${FONT_STACK};font-size:16px;line-height:1.7;color:#342c38;">Hi ${escapeHtml(customerName.split(" ")[0])},</div>
         <div style="font-family:${FONT_STACK};font-size:16px;line-height:1.7;color:#342c38;margin-top:12px;">Your <strong>${escapeHtml(packageName)}</strong> is booked and paid for. Thank you.</div>
         ${hasEvSoh ? `<div style="font-family:${FONT_STACK};margin:20px 0 0;background:#eef9f5;border:1px solid #bfe8d7;border-radius:12px;padding:15px 16px;color:#145c48;font-size:14px;line-height:1.6;"><strong>EV Battery SOH included</strong><br>Your £49.99 CARA Approved® Autel EV Battery Health Test has been added to the booking. Vehicle compatibility will be confirmed from the car details.</div>` : ""}
         ${infoTable([
           ["Inspection", packageName],
           ["When", slotFull],
           ["Vehicle", registration],
           ["Location", location],
           ["Amount paid", amountPaid],
         ])}
         <div style="font-family:${FONT_STACK};font-size:15px;line-height:1.75;color:#342c38;">Henry will call or message you beforehand to confirm the details. He will then meet you at the car, complete the full inspection and talk you through everything found before you hand over any money to the seller.</div>
         ${hasEvSoh ? `<div style="font-family:${FONT_STACK};font-size:15px;line-height:1.75;color:#342c38;margin-top:14px;">Your EV battery health report will be supplied with your inspection findings.</div>` : ""}
         ${whatsappButton("WhatsApp Henry")}`
      )

      const subjectSuffix = hasEvSoh ? " + EV Battery SOH" : ""
      const [internalOk, customerOk] = await Promise.all([
        sendEmail(
          "henry@eppingcarbuyer.com",
          `Vehicle inspection request: ${registration} (${packageName}${subjectSuffix}) PAID`,
          internalEmail
        ),
        sendEmail(
          customerEmail,
          `Booking confirmed: ${packageName}${subjectSuffix} on ${slotFull}`,
          customerEmailBody,
          customerHtml,
        ),
      ])

      if (!internalOk || !customerOk) {
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
New PAID Shop Order. Dropship fulfilment needed.

Product: ${productName}
Amount paid: ${amountPaid}

Customer:
Name: ${customerName}
Email: ${customerEmail || "Not provided"}

Ship the supplier order to:
${addressLines}

Stripe session: ${session.id}

ACTION NEEDED: Place this order with your supplier now, using the address above as the delivery address.
      `.trim()

      const customerEmailBody = `
Hi ${customerName.split(" ")[0]},

Thanks for your order. Payment has been received.

Item: ${productName}
Amount paid: ${amountPaid}

We will get this dispatched and email you once it is on its way.

Questions? WhatsApp us on 01992 367909.
      `.trim()

      const customerHtml = brandedEmail(
        "Your order is confirmed",
        `<div style="font-family:${FONT_STACK};font-size:16px;line-height:1.7;color:#342c38;">Hi ${escapeHtml(customerName.split(" ")[0])},</div>
         <div style="font-family:${FONT_STACK};font-size:16px;line-height:1.7;color:#342c38;margin-top:12px;">Thanks for your order. Payment has been received.</div>
         ${infoTable([["Item", productName], ["Amount paid", amountPaid]])}
         <div style="font-family:${FONT_STACK};font-size:15px;line-height:1.75;color:#342c38;">We will get this dispatched and email you once it is on its way.</div>
         ${whatsappButton("WhatsApp us")}`
      )

      const emailTasks = [
        sendEmail("henry@eppingcarbuyer.com", `Shop order: ${productName}. PAID, needs fulfilling`, internalEmail),
      ]
      if (customerEmail) {
        emailTasks.push(sendEmail(customerEmail, `Order confirmed: ${productName}`, customerEmailBody, customerHtml))
      }
      const results = await Promise.all(emailTasks)

      if (results.some((ok) => !ok)) {
        return NextResponse.json({ error: "Failed to send order email" }, { status: 502 })
      }
    }
  }

  return NextResponse.json({ received: true })
}
