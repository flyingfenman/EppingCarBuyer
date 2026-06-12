import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { registration, mileage, condition, serviceHistory, name, email, phone, additionalInfo } = body

    // Validate required fields
    if (!registration || !mileage || !condition || !serviceHistory || !name || !email || !phone) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 })
    }

    const emailContent = `
New Valuation Request

Vehicle Information:
- Registration: ${registration}
- Mileage: ${mileage}
- Condition: ${condition}
- Service History: ${serviceHistory}

Customer Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}

Additional Information:
${additionalInfo || "None provided"}

Submitted: ${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}
    `.trim()

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Stamford Car Buyer <noreply@stamfordcarbuyer.com>",
        to: ["henry@stamfordcarbuyer.com"],
        subject: `New Valuation Request: ${registration}`,
        text: emailContent,
      }),
    })

    if (!resendResponse.ok) {
      console.error("Failed to send email:", await resendResponse.text())
    }

    return NextResponse.json({
      success: true,
      message: "Valuation request submitted successfully",
    })
  } catch (error) {
    console.error("Error processing valuation submission:", error)
    return NextResponse.json({ error: "Failed to submit valuation request" }, { status: 500 })
  }
}
