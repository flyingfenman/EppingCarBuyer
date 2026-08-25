import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      packageName, registration, make, model, location,
      preferredDate, name, phone, email, notes,
    } = body

    if (!packageName || !registration || !location || !name || !phone || !email) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 })
    }

    const emailContent = `
New Vehicle Inspection Booking

Package: ${packageName}

Vehicle Details:
- Registration: ${registration}
- Make / Model: ${make || "Not provided"} ${model || ""}
- Where the car is: ${location}
- Preferred date: ${preferredDate || "Not specified"}

Customer Details:
- Name: ${name}
- Phone: ${phone}
- Email: ${email}

Additional Notes:
${notes || "None provided"}

Submitted: ${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}
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
        subject: `Vehicle inspection request — ${registration} (${packageName})`,
        text: emailContent,
      }),
    })

    if (!resendResponse.ok) {
      console.error("Resend error:", await resendResponse.text())
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error submitting inspection booking:", error)
    return NextResponse.json({ error: "Failed to submit booking" }, { status: 500 })
  }
}
