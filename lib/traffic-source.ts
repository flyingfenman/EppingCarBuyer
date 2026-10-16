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

// This visit's source is kept in memory, so every page of the visit knows it without storing anything on the device.
// It is only written to the browser, to be remembered on a later visit, once the visitor has agreed to analytics or
// advertising cookies in the cookie banner (UK cookie rules: remembering which advert someone clicked needs a yes).
let thisVisit: TrafficSource | null = null
let mayStore = false

// Runs on every full page load. Direct and internal visits are ignored so they can't overwrite
// the real source of a visitor who comes back later to book.
export function captureTrafficSource() {
  try {
    const visit = classifyVisit(document.referrer, window.location.search)
    if (visit) thisVisit = { ...visit, landingPage: window.location.pathname, capturedAt: Date.now() }
  } catch {
    // Unknown source: the booking is simply recorded as direct/unknown.
  }
}

// Runs once the visitor's cookie choice is known on each page load, and whenever they save a new one. Saying no removes
// anything remembered from before. Until they choose, nothing is written or read.
export function syncTrafficSourceConsent(allowed: boolean, chosen: boolean) {
  mayStore = allowed
  try {
    if (allowed && thisVisit) localStorage.setItem(STORAGE_KEY, JSON.stringify(thisVisit))
    else if (!allowed && chosen) localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage blocked: only this visit's source is known.
  }
}

function rememberedTrafficSource(): TrafficSource | null {
  if (!mayStore) return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const record = JSON.parse(raw) as TrafficSource
    if (record?.label && Date.now() - record.capturedAt <= MAX_AGE_MS) return record
    localStorage.removeItem(STORAGE_KEY)
    return null
  } catch {
    return null
  }
}

export function getTrafficSource(): TrafficSource | null {
  return thisVisit ?? rememberedTrafficSource()
}

// Messages to Henry's WhatsApp from any link on the site start with a note of where the visitor came from, so each chat
// shows which advert or search brought it in. It uses the source above and stores nothing new. The visitor sees the note
// and can delete it before sending.
const OWN_WHATSAPP = /^https:\/\/wa\.me\/441992367909\/?(\?|$)/
const NOTE_START = "(Ref: website"

export function addSourceNoteToWhatsAppLink(link: HTMLAnchorElement) {
  if (!OWN_WHATSAPP.test(link.href)) return
  try {
    const url = new URL(link.href)
    const text = url.searchParams.get("text") || ""
    if (text.startsWith(NOTE_START)) return
    const source = getTrafficSource() ?? classifyVisit(document.referrer, window.location.search)
    const note = source ? `${NOTE_START}, ${Array.from(source.label).slice(0, 40).join("")})` : `${NOTE_START})`
    link.href = `${url.origin}${url.pathname}?text=${encodeURIComponent(`${note}\n${text || "Hi!"}`)}`
  } catch {
    // Leave the link as it was.
  }
}
