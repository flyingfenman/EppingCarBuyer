"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, ChevronRight, CalendarDays, Clock } from "lucide-react"
import type { PackageKey, Slot } from "@/lib/inspection-slots"

const PACKAGES: { key: PackageKey; name: string; price: string }[] = [
  { key: "standard", name: "Standard", price: "£135" },
  { key: "premium", name: "Premium", price: "£180" },
]

function groupByDay(slots: Slot[]) {
  const groups = new Map<string, Slot[]>()
  for (const slot of slots) {
    const dayKey = new Date(slot.start).toLocaleDateString("en-GB", {
      weekday: "short", day: "numeric", month: "short", timeZone: "Europe/London",
    })
    if (!groups.has(dayKey)) groups.set(dayKey, [])
    groups.get(dayKey)!.push(slot)
  }
  return groups
}

export function InspectionsBookingCalendar() {
  const [packageKey, setPackageKey] = useState<PackageKey>("standard")
  const [slots, setSlots] = useState<Slot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(true)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [form, setForm] = useState({ registration: "", location: "", name: "", phone: "", email: "", notes: "" })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoadingSlots(true)
    setSelectedSlot(null)
    fetch(`/api/inspection-slots?package=${packageKey}`)
      .then((res) => res.json())
      .then((data) => setSlots(data.slots || []))
      .catch(() => setError("Couldn't load available times — please call or WhatsApp instead."))
      .finally(() => setLoadingSlots(false))
  }, [packageKey])

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSlot) return
    setSubmitting(true)
    setError("")

    try {
      const res = await fetch("/api/create-inspection-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageKey, slotStart: selectedSlot.start, slotEnd: selectedSlot.end, ...form }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Something went wrong")
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      if (err instanceof Error && err.message.includes("just booked")) {
        setSelectedSlot(null)
        setLoadingSlots(true)
        fetch(`/api/inspection-slots?package=${packageKey}`)
          .then((res) => res.json())
          .then((data) => setSlots(data.slots || []))
          .finally(() => setLoadingSlots(false))
      }
      setSubmitting(false)
    }
  }

  const dayGroups = groupByDay(slots)

  return (
    <div>
      {/* Package toggle */}
      <div className="flex rounded-xl border border-border overflow-hidden mb-6 bg-background max-w-sm mx-auto">
        {PACKAGES.map((pkg) => (
          <button
            key={pkg.key}
            onClick={() => setPackageKey(pkg.key)}
            className={`flex-1 py-3 text-sm font-semibold transition-colors duration-200 ${
              packageKey === pkg.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted/60"
            }`}
          >
            {pkg.name} — {pkg.price}
          </button>
        ))}
      </div>

      {!selectedSlot ? (
        <div>
          <div className="flex items-center justify-center gap-2 mb-6 text-muted-foreground">
            <CalendarDays className="w-4 h-4" />
            <span className="text-sm font-medium">Choose a time — 9am–6pm, every day</span>
          </div>

          {loadingSlots ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : dayGroups.size === 0 ? (
            <p className="text-center text-muted-foreground py-16">
              No slots available right now — please call or WhatsApp instead.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-1">
              {[...dayGroups.entries()].map(([day, daySlots]) => (
                <div key={day} className="bg-muted/30 rounded-xl p-4 border border-border">
                  <p className="text-sm font-bold text-foreground mb-3">{day}</p>
                  <div className="flex flex-wrap gap-2">
                    {daySlots.map((slot) => (
                      <button
                        key={slot.start}
                        onClick={() => setSelectedSlot(slot)}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border bg-background hover:border-primary hover:text-primary transition-colors"
                      >
                        {new Date(slot.start).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" })}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-background rounded-2xl border border-border p-6 md:p-8 shadow-sm max-w-2xl mx-auto">
          <button
            onClick={() => setSelectedSlot(null)}
            className="text-sm text-primary font-medium mb-6 hover:underline"
          >
            ← Choose a different time
          </button>

          <div className="flex items-center gap-2.5 mb-6 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <Clock className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm font-semibold text-foreground">
              {PACKAGES.find((p) => p.key === packageKey)?.name} Inspection —{" "}
              {new Date(selectedSlot.start).toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short", timeZone: "Europe/London" })}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="registration">Registration *</Label>
                <Input id="registration" value={form.registration} onChange={set("registration")} placeholder="e.g. AB12 CDE" required className="uk-numberplate text-center tracking-widest" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="location">Where is the car? *</Label>
                <Input id="location" value={form.location} onChange={set("location")} placeholder="Postcode or dealer name" required />
              </div>
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
                <Textarea id="notes" value={form.notes} onChange={set("notes")} placeholder="Access details, anything you're already concerned about..." rows={2} maxLength={400} />
              </div>
            </div>

            {error && <p className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-lg">{error}</p>}

            <Button type="submit" size="lg" disabled={submitting} className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90">
              {submitting ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Redirecting to payment...</>
              ) : (
                <>Continue to Payment <ChevronRight className="ml-2 h-5 w-5" /></>
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              You&apos;ll pay securely via Stripe. Your slot is only confirmed once payment completes.
            </p>
          </form>
        </div>
      )}
    </div>
  )
}
