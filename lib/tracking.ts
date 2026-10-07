// Analytics and advertising tags (Google Analytics 4, Google Ads, Meta pixel) run through Cloudflare Zaraz, not in the
// page: Zaraz loads them at Cloudflare's edge, only after the visitor agrees in the cookie banner. The IDs, the Ads
// conversion labels (booking, WhatsApp click) and which tool fires on which event below are configured in the
// Cloudflare dashboard (Zaraz > Tools / Triggers). This file only sends the events: "purchase" (booking confirmed)
// and "contact" (WhatsApp click), the same event names Google Analytics already used.

type ZarazWindow = Window & {
  zaraz?: { track?: (eventName: string, eventProperties?: Record<string, unknown>) => unknown }
}

function track(eventName: string, eventProperties: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return
  const send = () => {
    try {
      void Promise.resolve((window as ZarazWindow).zaraz?.track?.(eventName, eventProperties)).catch(() => {})
    } catch {
      // Never let tracking break the page.
    }
  }

  if ((window as ZarazWindow).zaraz?.track) return send()

  // Zaraz loads after the page has hydrated, so on a fast page (the booking confirmation) it may not be there yet:
  // retry for up to 10 seconds. On previews and local development it never appears, and the event is simply dropped.
  let tries = 0
  const timer = window.setInterval(() => {
    if ((window as ZarazWindow).zaraz?.track) {
      window.clearInterval(timer)
      send()
    } else if (++tries >= 100) {
      window.clearInterval(timer)
    }
  }, 100)
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

  track("purchase", {
    transaction_id: booking.transactionId,
    value: booking.value,
    currency: booking.currency,
    item_name: booking.includeEvSoh ? `${booking.packageName} + EV Battery SOH` : booking.packageName,
    price: booking.value,
    quantity: 1,
  })
}

export function trackWhatsAppClick(clickLocation: string) {
  track("contact", { method: "whatsapp", click_location: clickLocation })
}
