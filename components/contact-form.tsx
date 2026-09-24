"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react"
import { getTrafficSource } from "@/lib/traffic-source"

const TOPICS = [
  { value: "booking", label: "Booking an inspection" },
  { value: "question", label: "Question about an inspection" },
  { value: "selling", label: "Selling my car" },
  { value: "other", label: "Something else" },
]

const WHATSAPP_URL = "https://wa.me/441992367909"

const inputClass =
  "block w-full rounded-xl border-2 border-border bg-white px-4 text-lg text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 aria-[invalid=true]:border-red-600"

export function ContactForm() {
  const [topic, setTopic] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [website, setWebsite] = useState("")
  const [errors, setErrors] = useState<{ name?: string; contact?: string }>({})
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle")

  const validate = () => {
    const next: { name?: string; contact?: string } = {}
    if (!name.trim()) next.name = "Please tell us your name."
    const digits = phone.replace(/\D/g, "").length
    const phoneOk = digits >= 10 && digits <= 15
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!phoneOk && !emailOk) {
      next.contact =
        phone.trim() || email.trim()
          ? "Please check your phone number or email. We need one of them to reply."
          : "Please give us a phone number or an email so we can reply."
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
        body: JSON.stringify({ topic, name, phone, email, message, website, trafficSource: getTrafficSource() }),
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
        <h2 className="mt-4 text-3xl font-bold">Thanks, {firstName}!</h2>
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
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border-2 border-primary/15 bg-white p-5 shadow-sm sm:p-8"
      aria-labelledby="contact-form-heading"
    >
      <h2 id="contact-form-heading" className="text-2xl font-bold sm:text-3xl">
        Send us a message
      </h2>
      <p className="mt-2 text-lg text-foreground">Just your name and a way to reply. That&apos;s all we need.</p>

      <fieldset className="mt-6">
        <legend className="text-lg font-semibold text-foreground">
          What&apos;s it about? <span className="font-normal text-muted-foreground">(optional)</span>
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {TOPICS.map((t) => (
            <label
              key={t.value}
              className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 text-lg font-medium transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-primary/15 ${
                topic === t.value ? "border-primary bg-primary/5 text-primary" : "border-border bg-white text-foreground hover:border-primary/40"
              }`}
            >
              <input
                type="radio"
                name="topic"
                value={t.value}
                checked={topic === t.value}
                onChange={() => setTopic(t.value)}
                className="h-5 w-5 shrink-0 accent-[#6711a4]"
              />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <label htmlFor="contact-name" className="text-lg font-semibold text-foreground">
          Your name
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={`mt-2 h-14 ${inputClass}`}
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-2 text-base font-medium text-red-700">
            {errors.name}
          </p>
        )}
      </div>

      <fieldset className="mt-6" aria-describedby={errors.contact ? "contact-reply-error" : "contact-reply-hint"}>
        <legend className="text-lg font-semibold text-foreground">How should we reply?</legend>
        <p id="contact-reply-hint" className="mt-1 text-base text-muted-foreground">
          Fill in either one. You don&apos;t need both.
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-phone" className="text-base font-semibold text-foreground">
              Phone number
            </label>
            <input
              id="contact-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={!!errors.contact}
              className={`mt-2 h-14 ${inputClass}`}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="text-base font-semibold text-foreground">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.contact}
              className={`mt-2 h-14 ${inputClass}`}
            />
          </div>
        </div>
        {errors.contact && (
          <p id="contact-reply-error" className="mt-2 text-base font-medium text-red-700">
            {errors.contact}
          </p>
        )}
      </fieldset>

      <div className="mt-6">
        <label htmlFor="contact-message" className="text-lg font-semibold text-foreground">
          Your message <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="For example: the car's make and model, and where it is"
          className={`mt-2 py-3 ${inputClass}`}
        />
      </div>

      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Leave this empty</label>
        <input
          id="contact-website"
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
