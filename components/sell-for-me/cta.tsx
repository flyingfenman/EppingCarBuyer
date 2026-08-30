"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageSquare, CheckCircle2, Loader2, ChevronRight, Car } from "lucide-react"

type Tab = "contact" | "form"

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

export function SellForMeCta() {
  const [tab, setTab] = useState<Tab>("contact")
  const [form, setForm] = useState<FormState>(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

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
      if (!res.ok) throw new Error("submission failed")
      setSubmitted(true)
    } catch {
      setError("Something went wrong. Please try calling or WhatsApp instead.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-10 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Ready to get started?</h2>
            <p className="text-xl text-muted-foreground">
              Get in touch and we&apos;ll take it from here. No pressure, no obligation.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex rounded-xl border border-border overflow-hidden mb-8 bg-background">
            <button
              onClick={() => setTab("contact")}
              className={`flex-1 py-3 text-sm font-semibold transition-colors duration-200 ${
                tab === "contact"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted/60"
              }`}
            >
              <MessageSquare className="inline w-4 h-4 mr-2 mb-0.5" />
              WhatsApp Us
            </button>
            <button
              onClick={() => setTab("form")}
              className={`flex-1 py-3 text-sm font-semibold transition-colors duration-200 ${
                tab === "form"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted/60"
              }`}
            >
              <Car className="inline w-4 h-4 mr-2 mb-0.5" />
              Submit Your Car Details
            </button>
          </div>

          {/* Contact tab */}
          {tab === "contact" && (
            <div className="flex items-center justify-center">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-lg bg-[#25D366] hover:bg-[#1da851] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <a href="https://wa.me/441992367909" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          )}

          {/* Form tab */}
          {tab === "form" && (
            <div className="bg-background rounded-2xl border border-border p-6 md:p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <CheckCircle2 className="w-14 h-14 text-primary mx-auto" />
                  <h3 className="text-2xl font-bold">Thanks, we&apos;ve got your details!</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Henry will be in touch shortly to discuss your car and arrange a viewing.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Car details */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
                      Your Car
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="registration">Registration *</Label>
                        <Input
                          id="registration"
                          value={form.registration}
                          onChange={set("registration")}
                          placeholder="e.g. AB12 CDE"
                          required
                          className="uk-numberplate text-center text-lg tracking-widest"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="mileage">Mileage *</Label>
                        <Input
                          id="mileage"
                          value={form.mileage}
                          onChange={set("mileage")}
                          placeholder="e.g. 42,000"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="make">Make *</Label>
                        <Input
                          id="make"
                          value={form.make}
                          onChange={set("make")}
                          placeholder="e.g. Volkswagen"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="model">Model *</Label>
                        <Input
                          id="model"
                          value={form.model}
                          onChange={set("model")}
                          placeholder="e.g. Golf GTI"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="year">Year *</Label>
                        <Input
                          id="year"
                          value={form.year}
                          onChange={set("year")}
                          placeholder="e.g. 2021"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="colour">Colour</Label>
                        <Input
                          id="colour"
                          value={form.colour}
                          onChange={set("colour")}
                          placeholder="e.g. Midnight Blue"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="condition">Condition *</Label>
                        <select
                          id="condition"
                          value={form.condition}
                          onChange={set("condition")}
                          required
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          <option value="">Select condition...</option>
                          <option value="Excellent">Excellent — near perfect</option>
                          <option value="Good">Good — minor marks only</option>
                          <option value="Fair">Fair — visible wear</option>
                          <option value="Poor">Poor — needs attention</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="serviceHistory">Service History *</Label>
                        <select
                          id="serviceHistory"
                          value={form.serviceHistory}
                          onChange={set("serviceHistory")}
                          required
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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

                  {/* Contact details */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
                      Your Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" value={form.name} onChange={set("name")} placeholder="Your name" required />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="07700 900000" required />
                      </div>
                      <div className="sm:col-span-2 space-y-1.5">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" required />
                      </div>
                      <div className="sm:col-span-2 space-y-1.5">
                        <Label htmlFor="notes">Anything else we should know?</Label>
                        <Textarea
                          id="notes"
                          value={form.notes}
                          onChange={set("notes")}
                          placeholder="Modifications, recent work done, reason for selling, asking price in mind..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <p className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-lg">{error}</p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 transition-colors"
                  >
                    {submitting ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
                    ) : (
                      <>Submit My Car Details <ChevronRight className="ml-2 h-5 w-5" /></>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    We&apos;ll review your details and contact you within a few hours. No commitment required.
                  </p>
                </form>
              )}
            </div>
          )}

          <p className="text-sm text-muted-foreground text-center mt-6">
            Speak to Henry directly. Real person, real local service.
          </p>
        </div>
      </div>
    </section>
  )
}
