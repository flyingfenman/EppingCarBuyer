"use client"

import { useId, useState, type FormEvent } from "react"
import Link from "next/link"
import { CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react"
import { parseContactDetail } from "@/lib/contact"
import { getTrafficSource } from "@/lib/traffic-source"

const WHATSAPP_URL = "https://wa.me/441992367909"

const inputClass =
  "block w-full rounded-xl border-2 border-border bg-white px-4 text-lg text-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 aria-[invalid=true]:border-red-600"

export function ContactForm({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel
  const uid = useId()
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [message, setMessage] = useState("")
  const [website, setWebsite] = useState("")
  const [errors, setErrors] = useState<{ name?: string; contact?: string }>({})
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle")

  const validate = () => {
    const next: { name?: string; contact?: string } = {}
    if (!name.trim()) next.name = "Please enter your name."
    if (!parseContactDetail(contact)) {
      next.contact = contact.trim()
        ? "Please check your phone number or email. We need it to reply to you."
        : "Please enter a phone number or email so we can reply to you."
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, message, website, trafficSource: getTrafficSource() }),
      })
      setStatus(res.ok ? "sent" : "failed")
    } catch {
      setStatus("failed")
    }
  }

  if (status === "sent") {
    const firstName = name.trim().split(/\s+/)[0]
    return (
      <div className="rounded-3xl border-2 border-primary/20 bg-white p-6 text-center shadow-sm sm:p-10" role="status">
        <CheckCircle2 className="mx-auto h-16 w-16 text-primary" aria-hidden="true" />
        <Heading className="mt-4 text-3xl font-bold">Thanks, {firstName}!</Heading>
        <p className="mt-3 text-lg leading-relaxed text-foreground">
          Your message has been sent. Henry will get back to you soon, usually within an hour during business hours.
        </p>
        <p className="mt-6 text-base text-muted-foreground">Need an answer faster?</p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 text-lg font-bold text-white transition hover:bg-[#1da851]"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp us
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl border-2 border-primary/15 bg-white p-5 text-left shadow-sm sm:p-8">
      <Heading className="text-2xl font-bold sm:text-3xl">Send us a message</Heading>
      <p className="mt-2 text-lg text-foreground">We usually reply within an hour during business hours.</p>

      <div className="mt-6">
        <label htmlFor={`${uid}-name`} className="text-lg font-semibold text-foreground">
          Your name
        </label>
        <input
          id={`${uid}-name`}
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${uid}-name-error` : undefined}
          className={`mt-2 h-14 ${inputClass}`}
        />
        {errors.name && (
          <p id={`${uid}-name-error`} className="mt-2 text-base font-medium text-red-700">
            {errors.name}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor={`${uid}-detail`} className="text-lg font-semibold text-foreground">
          Phone number or email
        </label>
        <input
          id={`${uid}-detail`}
          type="text"
          autoComplete="tel"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          aria-invalid={!!errors.contact}
          aria-describedby={errors.contact ? `${uid}-detail-error` : undefined}
          className={`mt-2 h-14 ${inputClass}`}
        />
        {errors.contact && (
          <p id={`${uid}-detail-error`} className="mt-2 text-base font-medium text-red-700">
            {errors.contact}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor={`${uid}-message`} className="text-lg font-semibold text-foreground">
          How can we help?
        </label>
        <textarea
          id={`${uid}-message`}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`mt-2 py-3 ${inputClass}`}
        />
      </div>

      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Leave this empty</label>
        <input
          id={`${uid}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {status === "failed" && (
        <div role="alert" className="mt-6 rounded-xl border-2 border-red-200 bg-red-50 p-4 text-base text-red-800">
          Sorry, your message didn&apos;t send. Please try again, or{" "}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-bold underline">
            message us on WhatsApp
          </a>{" "}
          instead.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex h-16 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-xl font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            <Send className="h-6 w-6" aria-hidden="true" /> Send message
          </>
        )}
      </button>

      <p className="mt-4 text-sm text-muted-foreground">
        We only use your details to reply to you. See our{" "}
        <Link href="/privacy-policy" className="underline hover:text-foreground">
          privacy policy
        </Link>
        .
      </p>
    </form>
  )
}
