"use client"

import { useEffect } from "react"
import { captureTrafficSource } from "@/lib/traffic-source"
import { trackWhatsAppClick } from "@/lib/tracking"

const WHATSAPP_LINK = /^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//

export function SiteTracking() {
  useEffect(() => {
    captureTrafficSource()

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null
      if (link && WHATSAPP_LINK.test(link.href)) trackWhatsAppClick(window.location.pathname)
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return null
}
