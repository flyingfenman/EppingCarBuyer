import "server-only"

// Every email this site sends comes from Henry's Pro Vehicle Inspections address, whichever business it is for
// (Henry, 12 Nov 2026). Replies to customers go to the same address.
// The old Epping noreply address is tried second only so nothing is lost in the minutes before
// provehicleinspections.com is verified in Resend. Once eppingcarbuyer.com is removed from Resend it is refused too.
export const SENDER_NAME = "Pro Vehicle Inspections"
export const SENDER_ADDRESS = "henry@provehicleinspections.com"
export const SENDERS = [`${SENDER_NAME} <${SENDER_ADDRESS}>`, `${SENDER_NAME} <noreply@eppingcarbuyer.com>`]
export const REPLY_TO = SENDER_ADDRESS

export type Email = {
  to: string[]
  subject: string
  text: string
  html?: string
  reply_to?: string
}

// Sends one email through Resend, trying the next sender when Resend refuses one. Returns Resend's last answer,
// so a caller can still read the error text when every sender was refused.
export async function sendEmail(email: Email, apiKey = process.env.RESEND_API_KEY): Promise<Response> {
  let response: Response | undefined
  for (const from of SENDERS) {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, ...email }),
    })
    if (response.ok) return response
    console.error(`Resend refused "${email.subject}" as ${from}:`, await response.clone().text())
  }
  return response as Response
}
