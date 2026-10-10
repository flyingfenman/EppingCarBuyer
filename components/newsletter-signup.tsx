"use client"

import { useId, useState, type FormEvent } from "react"
import Link from "next/link"
import { Loader2, Mail } from "lucide-react"
import { useNewsletterReady } from "@/lib/use-newsletter-ready"

export function NewsletterSignup({ source = "footer", compact = false }: { source?: "footer" | "newsletter-page"; compact?: boolean }) {
  const uid = useId()
  const ready = useNewsletterReady()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle")
  const [error, setError] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    setError("")
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, website, source }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) return setStatus("sent")
      setError(data.error || "Sorry, that didn't work. Please try again.")
      setStatus("failed")
    } catch {
      setError("Sorry, that didn't work. Please try again.")
      setStatus("failed")
    }
  }

  if (!ready) return null

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-primary/20 bg-white p-5 text-center">
        <p className="text-lg font-bold">Nearly there. Check your inbox.</p>
        <p className="mt-1 text-base text-muted-foreground">
          We&apos;ve sent a link to {email}. Click it to confirm and you&apos;re on the list.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-xl rounded-2xl border border-primary/15 bg-white p-5 text-left shadow-sm">
      <p className="flex items-center gap-2 text-lg font-bold">
        <Mail className="h-5 w-5 text-primary" aria-hidden="true" /> The Friday newsletter
      </p>
      <p className="mt-1 text-base text-muted-foreground">A short email from Henry each Friday about buying and selling used cars.</p>

      <div className={`mt-4 grid gap-3 ${compact ? "sm:grid-cols-[1fr_1.4fr_auto]" : ""}`}>
        <div>
          <label htmlFor={`${uid}-name`} className="text-sm font-semibold">
            First name <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input
            id={`${uid}-name`}
            type="text"
            autoComplete="given-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 h-12 w-full rounded-xl border-2 border-border px-3 text-base focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className="text-sm font-semibold">
            Email
          </label>
          <input
            id={`${uid}-email`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={status === "failed"}
            aria-describedby={error ? `${uid}-error` : undefined}
            className="mt-1 h-12 w-full rounded-xl border-2 border-border px-3 text-base focus:border-primary focus:outline-none aria-[invalid=true]:border-red-600"
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-12 items-center justify-center gap-2 self-end rounded-xl bg-primary px-5 text-base font-bold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-70"
        >
          {status === "sending" ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : null}
          Sign me up
        </button>
      </div>

      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Leave this empty</label>
        <input id={`${uid}-website`} type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      {error && (
        <p id={`${uid}-error`} role="alert" className="mt-3 text-base font-medium text-red-700">
          {error}
        </p>
      )}

      <p className="mt-3 text-sm text-muted-foreground">
        We&apos;ll email you a link to confirm. Unsubscribe any time from the link in every email. See our{" "}
        <Link href="/privacy-policy" className="underline hover:text-foreground">
          privacy policy
        </Link>
        .
      </p>
    </form>
  )
}
