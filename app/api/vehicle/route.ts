import { type NextRequest, NextResponse } from "next/server"

const DVSA_ENDPOINT = "https://history.mot.api.gov.uk/v1/trade/vehicles/registration/"
const API_KEY = process.env.DVSA_API_KEY || ""

const CLIENT_ID = "a7be76ce-4f63-4d71-836b-eb0f8abd4eff"
const CLIENT_SECRET = process.env.DVSA_CLIENT_SECRET || ""
const SCOPE = "https://tapi.dvsa.gov.uk/.default"
const TOKEN_URL = "https://login.microsoftonline.com/a455b827-244f-4c97-b5b4-ce5d13b4d00c/oauth2/v2.0/token"

const allowedOrigins = ["https://www.stamfordcarbuyer.com", "http://localhost:3000", "http://localhost:3001"]

function getCorsHeaders(origin: string | null) {
  const corsOrigin = origin && allowedOrigins.includes(origin) ? origin : "https://www.stamfordcarbuyer.com"

  return {
    "Access-Control-Allow-Origin": corsOrigin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  }
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin")
  return new NextResponse(null, {
    status: 200,
    headers: getCorsHeaders(origin),
  })
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin")
  const searchParams = request.nextUrl.searchParams
  const reg = searchParams.get("reg")

  if (!reg) {
    return NextResponse.json(
      { error: "No registration number provided." },
      { status: 400, headers: getCorsHeaders(origin) },
    )
  }

  try {
    console.log("[v0] Fetching OAuth token...")

    const params = new URLSearchParams()
    params.append("client_id", CLIENT_ID)
    params.append("client_secret", CLIENT_SECRET)
    params.append("scope", SCOPE)
    params.append("grant_type", "client_credentials")

    const tokenResp = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    })

    if (!tokenResp.ok) {
      const errorText = await tokenResp.text()
      console.log("[v0] Token fetch failed:", errorText)
      return NextResponse.json(
        { error: `Failed to fetch token: ${errorText}` },
        { status: 500, headers: getCorsHeaders(origin) },
      )
    }

    const tokenData = await tokenResp.json()
    console.log("[v0] Token received successfully")

    if (!tokenData.access_token) {
      return NextResponse.json(
        { error: "Failed to retrieve access token." },
        { status: 500, headers: getCorsHeaders(origin) },
      )
    }

    console.log("[v0] Calling DVSA API for registration:", reg)

    const dvsaResp = await fetch(DVSA_ENDPOINT + encodeURIComponent(reg), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "x-api-key": API_KEY,
        Accept: "application/json",
      },
    })

    const dvsaData = await dvsaResp.json()

    if (!dvsaResp.ok) {
      console.log("[v0] DVSA API error:", dvsaData)
      return NextResponse.json(
        {
          error: dvsaData.message || "Failed to fetch vehicle data.",
        },
        { status: dvsaResp.status, headers: getCorsHeaders(origin) },
      )
    }

    console.log("[v0] Vehicle data retrieved successfully")
    return NextResponse.json(dvsaData, { headers: getCorsHeaders(origin) })
  } catch (error) {
    console.error("[v0] Unexpected error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500, headers: getCorsHeaders(origin) },
    )
  }
}
