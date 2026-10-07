"use client"

type ZarazConsentWindow = Window & { zaraz?: { consent?: { modal: boolean } } }

// Lets visitors reopen the Cloudflare Zaraz consent window to change or withdraw their choice.
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const consent = (window as ZarazConsentWindow).zaraz?.consent
        if (consent) consent.modal = true
      }}
    >
      Cookie settings
    </button>
  )
}
