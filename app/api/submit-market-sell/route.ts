import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      registration, make, model, year, mileage, colour,
      serviceHistory, condition, name, phone, email, notes,
    } = body

    if (!registration || !make || !model || !year || !mileage || !condition || !serviceHistory || !name || !phone || !email) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 })
    }

    const emailContent = `
New Market & Sell Enquiry

Vehicle Details:
- Registration: ${registration}
- Make / Model: ${make} ${model}
- Year: ${year}
- Colour: ${colour || "Not provided"}
- Mileage: ${mileage}
- Condition: ${condition}
- Service History: ${serviceHistory}

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
        subject: `New Market & Sell Enquiry: ${make} ${model} (${registration})`,
        text: emailContent,
      }),
    })

    if (!resendResponse.ok) {
      console.error("Resend error:", await resendResponse.text())
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error submitting market & sell enquiry:", error)
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 })
  }
}
