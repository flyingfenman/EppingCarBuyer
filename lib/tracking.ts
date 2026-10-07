// Analytics and advertising tags (Google Analytics 4, Google Ads, Meta pixel) run through Cloudflare Zaraz, not in the
// page: Zaraz loads them at Cloudflare's edge, only after the visitor agrees in the cookie banner. The IDs, the Ads
// conversion labels (booking, WhatsApp click) and which tool fires on which event below are configured in the
// Cloudflare dashboard (Zaraz > Tools / Triggers). This file only sends the events.

type ZarazWindow = Window & {
  zaraz?: { track?: (eventName: string, eventProperties?: Record<string, unknown>) => unknown }
}

function track(eventName: string, eventProperties: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return
  try {
    // zaraz is missing on previews and local development; there is nothing to send to then.
    void Promise.resolve((window as ZarazWindow).zaraz?.track?.(eventName, eventProperties)).catch(() => {})
  } catch {
    // Never let tracking break the page.
  }
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

  track("booking_complete", {
    transaction_id: booking.transactionId,
    value: booking.value,
    currency: booking.currency,
    item_name: booking.includeEvSoh ? `${booking.packageName} + EV Battery SOH` : booking.packageName,
    price: booking.value,
    quantity: 1,
  })
}

export function trackWhatsAppClick(clickLocation: string) {
  track("whatsapp_click", { method: "whatsapp", click_location: clickLocation })
}
