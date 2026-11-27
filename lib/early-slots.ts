// The booking calendar's free times, asked for early.
//
// The calendar is drawn by the page's JavaScript, which has to download and start before it can ask for the free
// times: most of a second on a phone. EARLY_SLOTS_SCRIPT is a few lines written straight into the booking page's HTML
// that ask for the times the moment the page arrives, so the answer is usually waiting by the time the calendar is
// ready for it. The calendar picks it up with takeEarlySlots(). If the early request failed, or the page was reached
// without a full page load, there is nothing to pick up and the calendar asks for the times itself, as it always has.

export const SLOTS_URL = "/api/inspection-slots?package=all"

const EARLY_SLOTS_KEY = "__earlyInspectionSlots"

// An early answer older than this is thrown away and the times are asked for again.
const EARLY_SLOTS_MAX_AGE_MS = 30 * 1000

export interface EarlySlots {
  ok: boolean
  data: Record<string, unknown>
  // When the answer arrived, by the customer's clock.
  at: number
}

export const EARLY_SLOTS_SCRIPT = `window.${EARLY_SLOTS_KEY}=fetch(${JSON.stringify(SLOTS_URL)},{cache:"no-store"}).then(function(r){return r.json().then(function(d){return{ok:r.ok,data:d,at:Date.now()}})}).catch(function(){return null})`

// The early answer, if there is one. It is handed over once only, so every later refresh of the times asks again.
export async function takeEarlySlots(): Promise<EarlySlots | null> {
  if (typeof window === "undefined") return null
  const holder = window as unknown as Record<string, Promise<EarlySlots | null> | undefined>
  const early = holder[EARLY_SLOTS_KEY]
  if (!early) return null
  delete holder[EARLY_SLOTS_KEY]
  try {
    const result = await early
    if (!result || typeof result.data !== "object" || result.data === null) return null
    if (Date.now() - result.at > EARLY_SLOTS_MAX_AGE_MS) return null
    return result
  } catch {
    return null
  }
}
