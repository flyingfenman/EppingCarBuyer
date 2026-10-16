"use client"

import { useEffect } from "react"
import { currentChoices, hasChosen, onConsentReady } from "@/lib/cookie-consent"
import { addSourceNoteToWhatsAppLink, captureTrafficSource, syncTrafficSourceConsent } from "@/lib/traffic-source"
import { trackWhatsAppClick } from "@/lib/tracking"

const WHATSAPP_LINK = /^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//

export function SiteTracking() {
  useEffect(() => {
    captureTrafficSource()
    const stopWaiting = onConsentReady(() => {
      const { analytics, advertising } = currentChoices()
      syncTrafficSourceConsent(analytics || advertising, hasChosen())
    })

    const linkFrom = (event: Event) => (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null

    // Before the link opens (tap, click, middle-click, long-press, keyboard), so the note is in the message WhatsApp shows.
    const addNote = (event: Event) => {
      const link = linkFrom(event)
      if (link) addSourceNoteToWhatsAppLink(link)
    }
    const onClick = (event: MouseEvent) => {
      const link = linkFrom(event)
      if (link && WHATSAPP_LINK.test(link.href)) trackWhatsAppClick(window.location.pathname)
    }
    document.addEventListener("pointerdown", addNote, true)
    document.addEventListener("focusin", addNote, true)
    document.addEventListener("click", addNote, true)
    document.addEventListener("click", onClick)
    return () => {
      stopWaiting()
      document.removeEventListener("pointerdown", addNote, true)
      document.removeEventListener("focusin", addNote, true)
      document.removeEventListener("click", addNote, true)
      document.removeEventListener("click", onClick)
    }
  }, [])

  return null
}
