"use client"

import { useEffect } from "react"

// The booking calendar used to sit on this page at #book. It has its own page now, so older links
// (/vehicle-inspections#book, ?package=ev, and Stripe's ?booking=cancelled) go straight there,
// including a #book link followed while already on this page.
export function BookingLinkRedirect() {
  useEffect(() => {
    const sendToBooking = () => {
      const { hash, search } = window.location
      const params = new URLSearchParams(search)
      if (hash === "#book" || params.has("package") || params.has("booking")) {
        window.location.replace(`/vehicle-inspections/book${search}`)
      }
    }
    sendToBooking()
    window.addEventListener("hashchange", sendToBooking)
    return () => window.removeEventListener("hashchange", sendToBooking)
  }, [])
  return null
}
