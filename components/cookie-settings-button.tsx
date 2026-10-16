"use client"

import { openCookieSettings } from "@/lib/cookie-consent"

// Lets visitors reopen the cookie settings panel (components/tracking/cookie-banner.tsx) to change or withdraw their choice.
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={openCookieSettings}>
      Cookie settings
    </button>
  )
}
