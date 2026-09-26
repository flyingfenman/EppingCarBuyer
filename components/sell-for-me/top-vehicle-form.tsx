"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, ChevronRight, Loader2, MessageSquare } from "lucide-react"
import { scrollToAnchorWhileLoading } from "@/lib/scroll-to-anchor"

type FormState = {
  registration: string
  make: string
  model: string
  year: string
  mileage: string
  colour: string
  serviceHistory: string
  condition: string
  name: string
  phone: string
  email: string
  notes: string
}

const INITIAL: FormState = {
  registration: "",
  make: "",
  model: "",
  year: "",
  mileage: "",
  colour: "",
  serviceHistory: "",
  condition: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
}

export function SellForMeTopVehicleForm() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const registration = new URLSearchParams(window.location.search).get("reg")?.trim().toUpperCase()
    if (registration) {
      setForm((current) => ({ ...current, registration: current.registration || registration }))
    }
    // Arriving from the homepage chooser: the browser's own jump to the form gets undone during page load.
    if (window.location.hash === "#vehicle-details") return scrollToAnchorWhileLoading("vehicle-details")
  }, [])

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((current) => ({ ...current, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const res = await fetch("/api/submit-market-sell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || "submission failed")
      setSubmitted(true)
    } catch {
      setError("Something went wrong. Please try again or message Henry on WhatsApp.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-[520px] items-center justify-center rounded-3xl border border-border bg-white p-8 shadow-sm">
        <div className="max-w-md text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
          <h2 className="mt-5 text-2xl font-bold">Thanks, we&apos;ve got your vehicle details.</h2>
          <p className="mt-3 text-muted-foreground">
            Henry will review the car and get in touch to discuss the best way to market and sell it.
          </p>
          <a
            href="https://wa.me/441992367909"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            <MessageSquare className="h-4 w-4" /> Message Henry on WhatsApp
          </a>
        </div>
      </div>
    )
  }

  return (
    <div id="vehicle-details" className="scroll-mt-24 overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
      <div className="border-b border-border bg-primary/5 px-5 py-5 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">No obligation</p>
        <h2 className="mt-1 text-2xl font-bold">Submit Your Vehicle Details</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Tell us about the car and we&apos;ll review whether our Market & Sell service is a good fit.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="lg:h-[610px] lg:overflow-y-auto lg:overscroll-contain">
        <div className="space-y-7 p-5 sm:p-6">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">1</span>
              <h3 className="font-bold">Your car</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="market-registration">Registration *</Label>
                <Input id="market-registration" value={form.registration} onChange={set("registration")} placeholder="e.g. AB12 CDE" required className="uk-numberplate text-center tracking-widest" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="market-mileage">Mileage *</Label>
                <Input id="market-mileage" value={form.mileage} onChange={set("mileage")} placeholder="e.g. 42,000" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="market-make">Make *</Label>
                <Input id="market-make" value={form.make} onChange={set("make")} placeholder="e.g. Volkswagen" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="market-model">Model *</Label>
                <Input id="market-model" value={form.model} onChange={set("model")} placeholder="e.g. Golf GTI" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="market-year">Year *</Label>
                <Input id="market-year" value={form.year} onChange={set("year")} placeholder="e.g. 2021" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="market-colour">Colour</Label>
                <Input id="market-colour" value={form.colour} onChange={set("colour")} placeholder="e.g. Midnight Blue" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="market-condition">Condition *</Label>
                <select
                  id="market-condition"
                  value={form.condition}
                  onChange={set("condition")}
                  required
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="">Select condition...</option>
                  <option value="Excellent">Excellent — near perfect</option>
                  <option value="Good">Good — minor marks only</option>
                  <option value="Fair">Fair — visible wear</option>
                  <option value="Poor">Poor — needs attention</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="market-service-history">Service History *</Label>
                <select
                  id="market-service-history"
                  value={form.serviceHistory}
                  onChange={set("serviceHistory")}
                  required
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="">Select history...</option>
                  <option value="Full dealer service history">Full dealer service history</option>
                  <option value="Full independent service history">Full independent service history</option>
                  <option value="Partial service history">Partial service history</option>
                  <option value="No service history">No service history</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">2</span>
              <h3 className="font-bold">Your details</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="market-name">Full Name *</Label>
                <Input id="market-name" value={form.name} onChange={set("name")} placeholder="Your name" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="market-phone">Phone Number *</Label>
                <Input id="market-phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="07700 900000" required />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="market-email">Email Address *</Label>
                <Input id="market-email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" required />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="market-notes">Anything else we should know?</Label>
                <Textarea
                  id="market-notes"
                  value={form.notes}
                  onChange={set("notes")}
                  placeholder="Modifications, recent work, reason for selling, asking price in mind..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          {error && <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}

          <Button type="submit" size="lg" disabled={submitting} className="h-14 w-full text-lg font-bold">
            {submitting ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
            ) : (
              <>Submit My Vehicle Details <ChevronRight className="ml-2 h-5 w-5" /></>
            )}
          </Button>

          <div className="flex flex-col items-center justify-between gap-2 border-t border-border pt-4 text-sm sm:flex-row">
            <p className="text-muted-foreground">No commitment required.</p>
            <a href="https://wa.me/441992367909" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-primary hover:underline">
              <MessageSquare className="h-4 w-4" /> Prefer WhatsApp?
            </a>
          </div>
        </div>
      </form>
    </div>
  )
}
