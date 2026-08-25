"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, ChevronRight, ChevronLeft, Clock } from "lucide-react"
import type { PackageKey, Slot } from "@/lib/inspection-slots"

const PACKAGES: { key: PackageKey; name: string; price: string }[] = [
  { key: "standard", name: "Standard", price: "£135" },
  { key: "premium", name: "Premium", price: "£180" },
]

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

// The Europe/London calendar date (YYYY-MM-DD) a slot falls on. Safe as a simple UTC slice here because
// business hours (9am-6pm London) never cross a UTC date boundary even at the BST/GMT extremes.
function dateKey(isoString: string) {
  return isoString.slice(0, 10)
}

// Builds a Monday-first grid of dates for the given month, padded with nulls to complete full weeks.
function getMonthGrid(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1)
  const startWeekday = (firstDay.getDay() + 6) % 7 // Mon=0 ... Sun=6
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (Date | null)[] = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

export function InspectionsBookingCalendar() {
  const [packageKey, setPackageKey] = useState<PackageKey>("standard")
  const [slots, setSlots] = useState<Slot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(true)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [viewDate, setViewDate] = useState(() => { const d = new Date(); return { year: d.getFullYear(), month: d.getMonth() } })
  const [form, setForm] = useState({ registration: "", location: "", name: "", phone: "", email: "", notes: "" })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoadingSlots(true)
    setSelectedDate(null)
    setSelectedSlot(null)
    fetch(`/api/inspection-slots?package=${packageKey}`)
      .then((res) => res.json())
      .then((data) => setSlots(data.slots || []))
      .catch(() => setError("Couldn't load available times — please call or WhatsApp instead."))
      .finally(() => setLoadingSlots(false))
  }, [packageKey])

  const slotsByDate = useMemo(() => {
    const map = new Map<string, Slot[]>()
    for (const slot of slots) {
      const key = dateKey(slot.start)
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(slot)
    }
    return map
  }, [slots])

  const todayKey = toDateKey(new Date())
  const monthGrid = useMemo(() => getMonthGrid(viewDate.year, viewDate.month), [viewDate])
  const monthLabel = new Date(viewDate.year, viewDate.month, 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" })

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const refreshSlots = () => {
    setLoadingSlots(true)
    fetch(`/api/inspection-slots?package=${packageKey}`)
      .then((res) => res.json())
      .then((data) => setSlots(data.slots || []))
      .finally(() => setLoadingSlots(false))
  }

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
        refreshSlots()
      }
      setSubmitting(false)
    }
  }

  if (selectedSlot) {
    return (
      <div className="bg-background rounded-2xl border border-border p-6 md:p-8 shadow-sm max-w-2xl mx-auto">
        <button onClick={() => setSelectedSlot(null)} className="text-sm text-primary font-medium mb-6 hover:underline">
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
    )
  }

  const daySlots = selectedDate ? (slotsByDate.get(selectedDate) || []) : []

  return (
    <div>
      {/* Package toggle */}
      <div className="flex rounded-xl border border-border overflow-hidden mb-8 bg-background max-w-sm mx-auto">
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

      {loadingSlots ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : slots.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">
          No slots available right now — please call or WhatsApp instead.
        </p>
      ) : (
        <div className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden max-w-3xl mx-auto">
          <div className="grid md:grid-cols-[1.3fr_1fr]">
            {/* Month calendar */}
            <div className="p-6 border-b md:border-b-0 md:border-r border-border">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setViewDate((v) => (v.month === 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: v.month - 1 }))}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <p className="font-bold text-foreground">{monthLabel}</p>
                <button
                  onClick={() => setViewDate((v) => (v.month === 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: v.month + 1 }))}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {WEEKDAY_LABELS.map((w) => (
                  <div key={w} className="text-center text-xs font-semibold text-muted-foreground py-1">{w}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {monthGrid.map((date, i) => {
                  if (!date) return <div key={i} />
                  const key = toDateKey(date)
                  const hasSlots = (slotsByDate.get(key) || []).length > 0
                  const isPast = key < todayKey
                  const isToday = key === todayKey
                  const isSelected = key === selectedDate

                  return (
                    <button
                      key={i}
                      disabled={!hasSlots || isPast}
                      onClick={() => setSelectedDate(key)}
                      className={`aspect-square rounded-full text-sm font-medium transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : hasSlots && !isPast
                          ? "text-foreground hover:bg-primary/10 cursor-pointer"
                          : "text-muted-foreground/30 cursor-not-allowed"
                      } ${isToday && !isSelected ? "ring-1 ring-primary/50" : ""}`}
                    >
                      {date.getDate()}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Time slots for selected date */}
            <div className="p-6 bg-muted/20 flex flex-col">
              {!selectedDate ? (
                <div className="flex-1 flex items-center justify-center text-center text-sm text-muted-foreground px-4">
                  Select a date to see available times
                </div>
              ) : (
                <>
                  <p className="text-sm font-bold text-foreground mb-4">
                    {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
                  </p>
                  <div className="space-y-2 overflow-y-auto max-h-80 pr-1">
                    {daySlots.map((slot) => (
                      <button
                        key={slot.start}
                        onClick={() => setSelectedSlot(slot)}
                        className="w-full py-2.5 px-4 text-sm font-semibold rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {new Date(slot.start).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" })}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
