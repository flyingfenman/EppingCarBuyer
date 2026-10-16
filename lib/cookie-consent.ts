// The cookie banner (components/tracking/cookie-banner.tsx) is the site's own. Cloudflare Zaraz only stores the choice
// and switches its tools on or off: Zaraz's own consent window is never shown (Zaraz > Consent has "hide modal" on).

export type ConsentChoices = { analytics: boolean; advertising: boolean }

type ZarazConsent = {
  APIReady?: boolean
  getAll: () => Record<string, boolean>
  set: (choices: Record<string, boolean>) => void
  sendQueuedEvents: () => void
}
type ZarazWindow = Window & { zaraz?: { set?: (key: string, value: unknown) => unknown; consent?: ZarazConsent } }

// Name set in Cloudflare Zaraz > Consent > "Consent cookie name". It only exists once the visitor has made a choice.
const CONSENT_COOKIE = "zaraz-consent"
const OPEN_SETTINGS_EVENT = "ecb:open-cookie-settings"

// Cookies the tools leave on this site, cleared when their purpose is switched off. Zaraz's own copies are named
// after the tool (google-analytics_v4, google-ads); the Meta pixel runs in the page and sets _fbp and _fbc.
const TOOL_COOKIES: Record<keyof ConsentChoices, RegExp> = {
  analytics: /^(_ga|_gid)|google-analytics/,
  advertising: /^(_gcl|_fbp|_fbc)|google-ads|facebook/,
}

const zaraz = () => (window as ZarazWindow).zaraz
export const consentReady = () => !!zaraz()?.consent?.APIReady
export const hasChosen = () => document.cookie.split("; ").some((cookie) => cookie.startsWith(`${CONSENT_COOKIE}=`))

// Runs once Zaraz's consent API has loaded. On previews and local development Zaraz never loads, so it never runs.
export function onConsentReady(callback: () => void) {
  if (consentReady()) {
    callback()
    return () => {}
  }
  document.addEventListener("zarazConsentAPIReady", callback, { once: true })
  return () => document.removeEventListener("zarazConsentAPIReady", callback)
}

// Everything is off until the visitor has chosen: no pre-ticked switches.
export function currentChoices(): ConsentChoices {
  try {
    const all = hasChosen() ? zaraz()?.consent?.getAll() : undefined
    return { analytics: !!all?.analytics, advertising: !!all?.advertising }
  } catch {
    return { analytics: false, advertising: false }
  }
}

// Zaraz holds its tools back until the visitor agrees, but it does not tell Google about the choice. With "Set Google
// Consent Mode v2 state" ticked in Zaraz > Settings, Google Analytics and Google Ads are told "denied" by default, so
// without this update they would still treat every visitor who accepted as having refused.
export function updateGoogleConsent({ analytics, advertising }: ConsentChoices) {
  const ads = advertising ? "granted" : "denied"
  try {
    zaraz()?.set?.("google_consent_update", {
      analytics_storage: analytics ? "granted" : "denied",
      ad_storage: ads,
      ad_user_data: ads,
      ad_personalization: ads,
    })
  } catch {
    // Never let tracking break the page.
  }
}

// Removes a cookie wherever it may have been set: this host only, or shared with the rest of the domain.
function clearCookies(name: RegExp) {
  const host = location.hostname.split(".")
  const domains = ["", ...host.slice(0, -1).map((_, i) => `; Domain=.${host.slice(i).join(".")}`)]
  for (const cookie of document.cookie.split("; ")) {
    const cookieName = cookie.split("=")[0]
    if (!cookieName || !name.test(cookieName)) continue
    for (const domain of domains) document.cookie = `${cookieName}=; Max-Age=0; Path=/${domain}`
  }
}

export function saveChoices(choices: ConsentChoices) {
  const consent = zaraz()?.consent
  if (!consent?.APIReady) return
  const before = currentChoices()
  const withdrawn = (["analytics", "advertising"] as const).filter((purpose) => before[purpose] && !choices[purpose])
  updateGoogleConsent(choices) // First, so the page view sent below already carries it.
  try {
    consent.set({ analytics: choices.analytics, advertising: choices.advertising }) // Writes the cookie, kept for a year.
    if (!withdrawn.length) {
      // Sends this page's page view to the tools just allowed. After a first reject they stay off.
      consent.sendQueuedEvents()
      return
    }
    // Switching something off: tags already running on this page (the Meta pixel counts page changes by itself) only
    // stop when the page reloads, so clear what they stored and reload.
    withdrawn.forEach((purpose) => clearCookies(TOOL_COOKIES[purpose]))
    window.location.reload()
  } catch {
    // Never let tracking break the page.
  }
}

// The footer's "Cookie settings" button opens the banner's settings panel through this event.
export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))
export function onOpenCookieSettings(callback: () => void) {
  window.addEventListener(OPEN_SETTINGS_EVENT, callback)
  return () => window.removeEventListener(OPEN_SETTINGS_EVENT, callback)
}
