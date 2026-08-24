"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageSquare, Phone, CheckCircle2, Loader2, ChevronRight, Search } from "lucide-react"

type Tab = "contact" | "form"

type FormState = {
  packageName: string
  registration: string
  make: string
  model: string
  location: string
  preferredDate: string
  name: string
  phone: string
  email: string
  notes: string
}

const INITIAL: FormState = {
  packageName: "Standard Inspection (£135)",
  registration: "",
  make: "",
  model: "",
  location: "",
  preferredDate: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
}

export function InspectionsCta() {
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
      const res = await fetch("/api/submit-inspection", {
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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-10 space-y-3">
            <h2 className="text-4xl lg:text-5xl font-bold">Book an Inspection</h2>
            <p className="text-xl text-muted-foreground">
              Tell us about the car and we&apos;ll be in touch to arrange a time.
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
              <Phone className="inline w-4 h-4 mr-2 mb-0.5" />
              Call or WhatsApp
            </button>
            <button
              onClick={() => setTab("form")}
              className={`flex-1 py-3 text-sm font-semibold transition-colors duration-200 ${
                tab === "form"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted/60"
              }`}
            >
              <Search className="inline w-4 h-4 mr-2 mb-0.5" />
              Book Online
            </button>
          </div>

          {/* Contact tab */}
          {tab === "contact" && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 px-8 text-lg border-2 hover:bg-muted/50 transition-all duration-300"
              >
                <a href="tel:+441992367909">
                  <Phone className="mr-2 h-5 w-5" />
                  01992 367909
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
                  <h3 className="text-2xl font-bold">Thanks, we&apos;ve got your booking request!</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Henry will be in touch shortly to confirm a time for the inspection.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Package + car details */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
                      The Car
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2 space-y-1.5">
                        <Label htmlFor="packageName">Package *</Label>
                        <select
                          id="packageName"
                          value={form.packageName}
                          onChange={set("packageName")}
                          required
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          <option value="Standard Inspection (£135)">Standard Inspection — £135</option>
                          <option value="Premium Inspection (£180)">Premium Inspection — £180</option>
                          <option value="Not sure yet">Not sure yet — advise me</option>
                        </select>
                      </div>
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
                        <Label htmlFor="location">Where is the car? *</Label>
                        <Input
                          id="location"
                          value={form.location}
                          onChange={set("location")}
                          placeholder="Postcode or dealer name"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="make">Make</Label>
                        <Input
                          id="make"
                          value={form.make}
                          onChange={set("make")}
                          placeholder="e.g. Volkswagen"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="model">Model</Label>
                        <Input
                          id="model"
                          value={form.model}
                          onChange={set("model")}
                          placeholder="e.g. Golf GTI"
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-1.5">
                        <Label htmlFor="preferredDate">Preferred date</Label>
                        <Input
                          id="preferredDate"
                          value={form.preferredDate}
                          onChange={set("preferredDate")}
                          placeholder="e.g. This Saturday, or ASAP"
                        />
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
                          placeholder="Access details, best time to call, anything you're already concerned about..."
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
                      <>Request Booking <ChevronRight className="ml-2 h-5 w-5" /></>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    We&apos;ll confirm your booking time by phone or email. No payment required to request one.
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
