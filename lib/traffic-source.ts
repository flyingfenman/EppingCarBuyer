const STORAGE_KEY = "ecb_traffic_source"
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000

export interface TrafficSource {
  label: string
  detail: string
  landingPage: string
  capturedAt: number
}

// Order matters: the more specific hosts (Gemini) must come before the generic Google one.
const REFERRER_SOURCES: Array<[RegExp, string]> = [
  [/(^|\.)(chatgpt|openai)\.com$/, "ChatGPT"],
  [/(^|\.)perplexity\.ai$/, "Perplexity"],
  [/(^|\.)claude\.ai$/, "Claude"],
  [/^gemini\.google\.com$/, "Gemini"],
  [/(^|\.)copilot\.microsoft\.com$/, "Copilot"],
  [/(^|\.)google\.[a-z.]+$/, "Google search"],
  [/(^|\.)bing\.com$/, "Bing"],
  [/(^|\.)duckduckgo\.com$/, "DuckDuckGo"],
  [/(^|\.)yahoo\.com$/, "Yahoo"],
  [/(^|\.)ecosia\.org$/, "Ecosia"],
  [/(^|\.)(facebook|instagram)\.com$/, "Facebook / Instagram"],
]

export function classifyVisit(referrer: string, search: string): { label: string; detail: string } | null {
  const params = new URLSearchParams(search)

  // Ad click IDs beat the referrer: Google Ads clicks also arrive with a google.com referrer.
  if (params.get("gclid") || params.get("gbraid") || params.get("wbraid")) {
    return { label: "Google Ads", detail: params.get("utm_campaign") || "ad click" }
  }
  if (params.get("fbclid")) {
    return { label: "Facebook / Instagram", detail: params.get("utm_campaign") || "ad click" }
  }

  const utmSource = params.get("utm_source")
  if (utmSource) {
    const detail = [params.get("utm_medium"), params.get("utm_campaign")].filter(Boolean).join(" / ")
    return { label: /chatgpt|openai/i.test(utmSource) ? "ChatGPT" : utmSource, detail: detail || "utm link" }
  }

  let host = ""
  try {
    host = new URL(referrer).hostname.toLowerCase()
  } catch {
    return null
  }
  if (!host || host.endsWith("eppingcarbuyer.com")) return null

  const known = REFERRER_SOURCES.find(([pattern]) => pattern.test(host))
  return { label: known ? known[1] : host, detail: known ? "referral" : "link from another site" }
}

// Runs on every full page load. Direct and internal visits are ignored so they can't overwrite
// the real source of a visitor who comes back later to book.
export function captureTrafficSource() {
  try {
    const visit = classifyVisit(document.referrer, window.location.search)
    if (!visit) return
    const record: TrafficSource = { ...visit, landingPage: window.location.pathname, capturedAt: Date.now() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  } catch {
    // Storage blocked: the booking is simply recorded as direct/unknown.
  }
}

export function getTrafficSource(): TrafficSource | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const record = JSON.parse(raw) as TrafficSource
    if (!record?.label || Date.now() - record.capturedAt > MAX_AGE_MS) return null
    return record
  } catch {
    return null
  }
}
