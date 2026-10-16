"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Cookie, X } from "lucide-react"
import {
  currentChoices,
  hasChosen,
  onConsentReady,
  onOpenCookieSettings,
  saveChoices,
  updateGoogleConsent,
  type ConsentChoices,
} from "@/lib/cookie-consent"

// The ids are the purpose ids in Cloudflare Zaraz > Consent > Purposes. Zaraz's own wording there is no longer shown.
const PURPOSES = [
  { id: "analytics", name: "Analytics", description: "Helps us understand how visitors use the site (Google Analytics)." },
  {
    id: "advertising",
    name: "Advertising",
    description: "Lets Google Ads and Meta measure our adverts, show them to past visitors and personalise the ads you see.",
  },
] as const

const ALL_ON: ConsentChoices = { analytics: true, advertising: true }
const ALL_OFF: ConsentChoices = { analytics: false, advertising: false }

// Accept and Reject look exactly the same, so neither is pushed.
const button = "inline-flex h-11 items-center justify-center rounded-xl px-4 text-base font-bold transition"
const solidButton = `${button} bg-primary text-primary-foreground hover:bg-primary/90`
const outlineButton = `${button} border-2 border-primary/30 bg-white text-primary hover:bg-primary/5`
const textLink = "inline-flex min-h-11 items-center rounded-lg text-sm font-semibold text-primary underline underline-offset-4"

// A small card at the bottom of the screen (bottom right on bigger screens), in place of Zaraz's full-screen consent
// window. The page stays usable behind it, and ignoring it counts as no: nothing optional runs until Accept or Save
// choices.
export function CookieBanner() {
  const [view, setView] = useState<"hidden" | "banner" | "settings">("hidden")
  const [choices, setChoices] = useState<ConsentChoices>(ALL_OFF)
  const panel = useRef<HTMLDivElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const chooseButton = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const lastView = useRef(view)
  const open = view !== "hidden"

  useEffect(
    () =>
      onConsentReady(() => {
        // Visitors who chose earlier, including in Zaraz's old window (which never told Google), get Google updated here.
        if (hasChosen()) updateGoogleConsent(currentChoices())
        else setView("banner")
      }),
    [],
  )

  // The footer's "Cookie settings" button. Zaraz loads after the page, so a click before then opens the panel once it
  // is ready. If Zaraz is blocked nothing is tracked and there is nothing to change.
  useEffect(() => {
    let stopWaiting = () => {}
    const stopListening = onOpenCookieSettings(() => {
      const opener = document.activeElement as HTMLElement | null
      stopWaiting()
      stopWaiting = onConsentReady(() => {
        returnFocus.current = opener
        setChoices(currentChoices())
        setView("settings")
      })
    })
    return () => {
      stopListening()
      stopWaiting()
    }
  }, [])

  // Moves focus into the settings panel, and back to where it came from when it closes.
  useEffect(() => {
    if (view === "settings") heading.current?.focus()
    else if (lastView.current === "settings") (view === "banner" ? chooseButton.current : returnFocus.current)?.focus()
    lastView.current = view
  }, [view])

  // Escape only closes the settings panel. It never counts as a yes.
  useEffect(() => {
    if (view !== "settings") return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setView(hasChosen() ? "hidden" : "banner")
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [view])

  // While the first view is showing, the card tells the WhatsApp button, the footer and the booking bar how much room
  // to leave below them. data-cookie-banner lets the WhatsApp button hide its message, and hide itself behind the
  // settings panel (see whatsapp-float.tsx).
  useEffect(() => {
    const card = panel.current
    if (view === "hidden" || !card) return
    const root = document.documentElement
    root.dataset.cookieBanner = view
    const observer = new ResizeObserver(() => {
      root.style.setProperty("--cookie-banner-space", `${card.offsetHeight + parseFloat(getComputedStyle(card).bottom)}px`)
    })
    if (view === "banner") observer.observe(card)
    return () => {
      observer.disconnect()
      delete root.dataset.cookieBanner
      root.style.removeProperty("--cookie-banner-space")
    }
  }, [view])

  function save(next: ConsentChoices) {
    saveChoices(next)
    setView("hidden")
  }

  if (!open) return null

  return (
    <div
      ref={panel}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      className="fixed bottom-3 left-3 right-3 z-[60] max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-2xl border border-primary/15 bg-white p-4 text-foreground shadow-xl motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-300 md:bottom-6 md:left-auto md:right-6 md:max-h-[calc(100dvh-3rem)] md:w-full md:max-w-md md:p-5"
    >
      {view === "banner" ? (
        <>
          <p id="cookie-banner-title" className="flex items-center gap-2 text-lg font-bold">
            <Cookie className="h-5 w-5 text-primary" aria-hidden="true" /> Can we use cookies?
          </p>
          <p className="mt-1 text-sm leading-snug text-muted-foreground">
            Cookies from Google and Meta help us see how the site is used, measure our adverts and show them to past
            visitors. None of them are on unless you say yes.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button type="button" className={solidButton} onClick={() => save(ALL_ON)}>
              Accept
            </button>
            <button type="button" className={solidButton} onClick={() => save(ALL_OFF)}>
              Reject
            </button>
          </div>
          <div className="mt-1 flex items-center justify-between gap-4">
            <button
              ref={chooseButton}
              type="button"
              className={textLink}
              onClick={() => {
                returnFocus.current = null
                setChoices(currentChoices())
                setView("settings")
              }}
            >
              Let me choose
            </button>
            <Link href="/privacy-policy" className={textLink}>
              Privacy policy
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <h2 ref={heading} id="cookie-banner-title" tabIndex={-1} className="text-lg font-bold focus:outline-none">
              Cookie settings
            </h2>
            <button
              type="button"
              aria-label="Close cookie settings"
              onClick={() => setView(hasChosen() ? "hidden" : "banner")}
              className="-mr-2 -mt-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Everything is off unless you switch it on. You can change your mind any time using Cookie settings at the
            bottom of any page. See our{" "}
            <Link href="/privacy-policy" className="rounded font-semibold text-primary underline underline-offset-4">
              privacy policy
            </Link>
            .
          </p>
          <div className="mt-3 space-y-2">
            {PURPOSES.map((purpose) => {
              const on = choices[purpose.id]
              return (
                <button
                  key={purpose.id}
                  type="button"
                  role="switch"
                  aria-checked={on}
                  aria-labelledby={`cookie-${purpose.id}`}
                  aria-describedby={`cookie-${purpose.id}-description`}
                  onClick={() => setChoices((current) => ({ ...current, [purpose.id]: !current[purpose.id] }))}
                  className="flex w-full items-center gap-3 rounded-xl border border-border p-3 text-left hover:bg-primary/5"
                >
                  <span className="flex-1">
                    <span id={`cookie-${purpose.id}`} className="block text-base font-bold">
                      {purpose.name}
                    </span>
                    <span id={`cookie-${purpose.id}-description`} className="block text-sm text-muted-foreground">
                      {purpose.description}
                    </span>
                  </span>
                  <span aria-hidden="true" className="w-7 shrink-0 text-right text-sm font-semibold text-muted-foreground">
                    {on ? "On" : "Off"}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${on ? "bg-primary" : "bg-gray-400"}`}
                  >
                    <span
                      className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform motion-reduce:transition-none ${on ? "translate-x-5" : ""}`}
                    />
                  </span>
                </button>
              )
            })}
          </div>
          <button type="button" className={`${solidButton} mt-3 w-full`} onClick={() => save(choices)}>
            Save choices
          </button>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button type="button" className={outlineButton} onClick={() => save(ALL_ON)}>
              Accept all
            </button>
            <button type="button" className={outlineButton} onClick={() => save(ALL_OFF)}>
              Reject all
            </button>
          </div>
        </>
      )}
    </div>
  )
}
