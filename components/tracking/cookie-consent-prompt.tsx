"use client"

import { useEffect } from "react"

type ZarazConsentWindow = Window & { zaraz?: { consent?: { APIReady?: boolean; modal: boolean } } }

// Name set in Cloudflare Zaraz > Consent > "Consent cookie name". It only exists once the visitor has made a choice.
const CONSENT_COOKIE = "zaraz-consent"

// Zaraz's own "show on page load" adds the banner before React has finished hydrating the page, and hydration then
// removes it. So Zaraz's automatic display is switched off and the banner is opened here, after the page has loaded.
export function CookieConsentPrompt() {
  useEffect(() => {
    const openIfNoChoiceYet = () => {
      const consent = (window as ZarazConsentWindow).zaraz?.consent
      if (!consent) return
      if (document.cookie.split("; ").some((cookie) => cookie.startsWith(`${CONSENT_COOKIE}=`))) return
      window.setTimeout(() => {
        consent.modal = true
      }, 250)
    }

    if ((window as ZarazConsentWindow).zaraz?.consent?.APIReady) {
      openIfNoChoiceYet()
      return
    }
    document.addEventListener("zarazConsentAPIReady", openIfNoChoiceYet, { once: true })
    return () => document.removeEventListener("zarazConsentAPIReady", openIfNoChoiceYet)
  }, [])

  return null
}
