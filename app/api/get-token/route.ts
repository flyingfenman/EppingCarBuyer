import { NextResponse } from "next/server"

const CLIENT_ID = "a7be76ce-4f63-4d71-836b-eb0f8abd4eff"
const CLIENT_SECRET = process.env.DVSA_CLIENT_SECRET || ""
const SCOPE = "https://tapi.dvsa.gov.uk/.default"
const TOKEN_URL = "https://login.microsoftonline.com/a455b827-244f-4c97-b5b4-ce5d13b4d00c/oauth2/v2.0/token"

export async function GET() {
  const params = new URLSearchParams()
  params.append("client_id", CLIENT_ID)
  params.append("client_secret", CLIENT_SECRET)
  params.append("scope", SCOPE)
  params.append("grant_type", "client_credentials")

  try {
    const response = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("Token Error:", data)
      return NextResponse.json({ error: "Could not fetch token from GOV.UK" }, { status: 500 })
    }

    return NextResponse.json({ access_token: data.access_token })
  } catch (err) {
    console.error("Failed to fetch token:", err)
    return NextResponse.json({ error: "Server error while fetching token" }, { status: 500 })
  }
}
