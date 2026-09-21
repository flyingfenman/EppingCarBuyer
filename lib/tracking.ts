export const GA_TRACKING_ID = "G-0VZ6KTHLBW"
export const GOOGLE_ADS_ID = "AW-18442938327"

// Labels come from Google Ads > Goals > Conversions > (the action) > Tag setup, e.g. "AbC1dEfG2hIjK3lM".
// An empty label means that conversion action doesn't exist yet, so only GA4 receives the event.
const ADS_CONVERSION_LABELS = {
  booking: "",
  whatsapp: "",
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return
  const send = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag
  if (typeof send === "function") send(...args)
}

function sendAdsConversion(label: string, params: Record<string, unknown> = {}) {
  if (!label) return
  gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${label}`, ...params })
}

export interface BookingConversionData {
  transactionId: string
  value: number
  currency: string
  packageName: string
  includeEvSoh: boolean
}

export function trackBookingComplete(booking: BookingConversionData) {
  const storageKey = `ecb_conversion_${booking.transactionId}`
  try {
    if (localStorage.getItem(storageKey)) return
    localStorage.setItem(storageKey, "1")
  } catch {
    // Storage blocked: still report the booking once for this page view.
  }

  gtag("event", "purchase", {
    send_to: GA_TRACKING_ID,
    transaction_id: booking.transactionId,
    value: booking.value,
    currency: booking.currency,
    items: [
      {
        item_name: booking.includeEvSoh ? `${booking.packageName} + EV Battery SOH` : booking.packageName,
        price: booking.value,
        quantity: 1,
      },
    ],
  })
  sendAdsConversion(ADS_CONVERSION_LABELS.booking, {
    value: booking.value,
    currency: booking.currency,
    transaction_id: booking.transactionId,
  })
}

export function trackWhatsAppClick(clickLocation: string) {
  gtag("event", "contact", { send_to: GA_TRACKING_ID, method: "whatsapp", click_location: clickLocation })
  sendAdsConversion(ADS_CONVERSION_LABELS.whatsapp)
}
