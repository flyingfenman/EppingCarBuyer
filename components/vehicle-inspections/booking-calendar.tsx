"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Loader2,
  ChevronRight,
  ChevronLeft,
  Clock,
  TriangleAlert,
  Phone,
  MessageCircle,
  BatteryCharging,
  BadgeCheck,
  Check,
  Wrench,
  CalendarDays,
} from "lucide-react"
import { MIN_BOOKING_NOTICE_HOURS, type PackageKey, type Slot } from "@/lib/inspection-slots"
import { trackWhatsAppClick } from "@/lib/tracking"
import { getTrafficSource } from "@/lib/traffic-source"

function toWhatsAppNumber(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, "")
  if (cleaned.startsWith("+")) return cleaned.slice(1)
  if (cleaned.startsWith("0")) return "44" + cleaned.slice(1)
  return cleaned
}

const PACKAGES: Array<{
  key: PackageKey
  name: string
  price: string
  amount: number
  points: string
  strapline: string
  features: string[]
  popular?: boolean
}> = [
  {
    key: "standard",
    name: "Standard Inspection",
    price: "£149.99",
    amount: 149.99,
    points: "160-point inspection",
    strapline: "In-depth mechanical findings and buying guidance",
    features: ["Engine / drivetrain, brakes, steering and suspension", "Full diagnostic scan and road test", "Vehicle history check", "Easy-to-understand video review", "Photo evidence and same-day mechanical report", "Personal call and buying guidance"],
  },
  {
    key: "premium",
    name: "Premium Inspection",
    price: "£199.99",
    amount: 199.99,
    points: "260-point inspection",
    strapline: "Deeper inspection and vehicle and seller research",
    features: ["Everything in Standard, including video review", "Deeper bodywork and condition assessment", "Extended road test where safe and permitted", "Available auction, salvage and previous advert searches", "Checks for indicators of undisclosed motor trading"],
    popular: true,
  },
]

const EV_SOH_PRICE = 49.99
const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const SHORT_NOTICE_MS = MIN_BOOKING_NOTICE_HOURS * 60 * 60 * 1000
const DEFAULT_CALENDAR_START_HOURS = 25

function dateKey(isoString: string) {
  return isoString.slice(0, 10)
}

function getMonthGrid(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1)
  const startWeekday = (firstDay.getDay() + 6) % 7
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

function setViewFromDateKey(key: string) {
  const [year, month] = key.split("-").map(Number)
  return { year, month: month - 1 }
}

function isShortNotice(slot: Slot, nowMs: number) {
  return new Date(slot.start).getTime() < nowMs + SHORT_NOTICE_MS
}

function shortNoticeWhatsAppUrl(slot: Slot, packageName: string) {
  const when = new Date(slot.start).toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
  })
  const message = `Hi Henry, I can see the ${packageName} slot at ${when}. Is this short-notice appointment still available?`
  return `https://wa.me/441992367909?text=${encodeURIComponent(message)}`
}

function formatSlotTime(slot: Slot) {
  return new Date(slot.start).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
  })
}

function formatSlotDateTime(slot: Slot) {
  return new Date(slot.start).toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
  })
}

export function InspectionsBookingCalendar() {
  const bookingFormRef = useRef<HTMLDivElement>(null)
  const [packageKey, setPackageKey] = useState<PackageKey>("standard")
  const [includeEvSoh, setIncludeEvSoh] = useState(false)
  const [slotsByPackage, setSlotsByPackage] = useState<Record<PackageKey, Slot[]>>({ standard: [], premium: [] })
  const [loadingSlots, setLoadingSlots] = useState(true)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [shortNoticeCandidate, setShortNoticeCandidate] = useState<Slot | null>(null)
  const [shortNoticeConfirmed, setShortNoticeConfirmed] = useState(false)
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date()
    return { year: d.getFullYear(), month: d.getMonth() }
  })
  const [nowMs] = useState(() => Date.now())
  const [form, setForm] = useState({
    registration: "",
    location: "",
    sellerName: "",
    sellerPhone: "",
    advertUrl: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const selectedPackage = PACKAGES.find((p) => p.key === packageKey) || PACKAGES[0]
  const totalPrice = selectedPackage.amount + (includeEvSoh ? EV_SOH_PRICE : 0)
  const slots = slotsByPackage[packageKey]

  const loadAvailability = useCallback(async () => {
    setLoadingSlots(true)
    setError("")
    try {
      const res = await fetch("/api/inspection-slots?package=all", { cache: "no-store" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Couldn't load availability")
      setSlotsByPackage({
        standard: data.slotsByPackage?.standard || [],
        premium: data.slotsByPackage?.premium || [],
      })
    } catch {
      setError("Couldn't load available times — please WhatsApp us and we'll arrange it with you.")
    } finally {
      setLoadingSlots(false)
    }
  }, [])

  useEffect(() => {
    void loadAvailability()
  }, [loadAvailability])

  useEffect(() => {
    if (loadingSlots || selectedDate || slots.length === 0) return
    const defaultStartMs = nowMs + DEFAULT_CALENDAR_START_HOURS * 60 * 60 * 1000
    const firstDefaultSlot = slots.find((slot) => new Date(slot.start).getTime() >= defaultStartMs) || slots[0]
    const firstDate = dateKey(firstDefaultSlot.start)
    setSelectedDate(firstDate)
    setViewDate(setViewFromDateKey(firstDate))
  }, [loadingSlots, nowMs, selectedDate, slots])

  useEffect(() => {
    if (!selectedSlot) return

    // The calendar is replaced by a shorter form. Move to it after the DOM updates
    // instead of leaving the viewport at the calendar's previous scroll position.
    const frame = window.requestAnimationFrame(() => {
      const bookingForm = bookingFormRef.current
      if (!bookingForm) return
      bookingForm.focus({ preventScroll: true })
      bookingForm.scrollIntoView({ behavior: "instant", block: "start" })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [selectedSlot])

  const slotsByDate = useMemo(() => {
    const map = new Map<string, Slot[]>()
    for (const slot of slots) {
      const key = dateKey(slot.start)
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(slot)
    }
    return map
  }, [slots])

  const monthGrid = useMemo(() => getMonthGrid(viewDate.year, viewDate.month), [viewDate])
  const monthLabel = new Date(viewDate.year, viewDate.month, 1).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  })

  const set = (field: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const resetShortNotice = () => {
    setShortNoticeCandidate(null)
    setShortNoticeConfirmed(false)
  }

  const choosePackage = (key: PackageKey) => {
    setPackageKey(key)
    setSelectedDate(null)
    setSelectedSlot(null)
    resetShortNotice()
    setError("")
  }

  const chooseDate = (key: string) => {
    setSelectedDate(key)
    resetShortNotice()
  }

  const handleSlotClick = (slot: Slot) => {
    if (isShortNotice(slot, nowMs)) {
      setShortNoticeCandidate(slot)
      setShortNoticeConfirmed(false)
      trackWhatsAppClick("short_notice_slot")
      window.open(shortNoticeWhatsAppUrl(slot, selectedPackage.name), "_blank", "noopener,noreferrer")
      return
    }
    resetShortNotice()
    setSelectedSlot(slot)
  }

  const bookConfirmedShortNotice = () => {
    if (!shortNoticeCandidate || !shortNoticeConfirmed) return
    setSelectedSlot(shortNoticeCandidate)
  }

  const changeDateOrTime = () => {
    setSelectedSlot(null)
    resetShortNotice()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!selectedSlot) return
    setSubmitting(true)
    setError("")

    try {
      const res = await fetch("/api/create-inspection-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageKey,
          includeEvSoh,
          shortNoticeConfirmed: isShortNotice(selectedSlot, nowMs) && shortNoticeConfirmed,
          slotStart: selectedSlot.start,
          slotEnd: selectedSlot.end,
          trafficSource: getTrafficSource(),
          ...form,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Something went wrong")
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      if (err instanceof Error && (err.message.includes("just booked") || err.message.includes("confirmed"))) {
        setSelectedSlot(null)
        resetShortNotice()
        await loadAvailability()
      }
      setSubmitting(false)
    }
  }

  if (selectedSlot) {
    const selectedIsShortNotice = isShortNotice(selectedSlot, nowMs)

    return (
      <div ref={bookingFormRef} tabIndex={-1} aria-label="Your inspection booking" className="mx-auto max-w-3xl scroll-mt-24 overflow-hidden rounded-3xl border border-border bg-background shadow-xl">
        <div className="border-b border-border bg-slate-950 px-5 py-5 text-white sm:px-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <button onClick={changeDateOrTime} className="text-sm font-semibold text-emerald-300 hover:underline">
                ← Change package, add-on or time
              </button>
              <p className="mt-2 text-sm text-slate-400">You&apos;re booking</p>
              <h3 className="text-2xl font-bold">{selectedPackage.name}</h3>
              <p className="mt-1 text-sm text-slate-300">
                {new Date(selectedSlot.start).toLocaleString("en-GB", {
                  dateStyle: "full",
                  timeStyle: "short",
                  timeZone: "Europe/London",
                })}
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 px-5 py-3 sm:text-right">
              <p className="text-xs uppercase tracking-wide text-slate-400">Current total</p>
              <p className="text-3xl font-bold">£{totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-2 border-b border-border bg-emerald-50 px-5 py-4 text-sm sm:grid-cols-2 sm:px-7 lg:grid-cols-4">
          {["Diagnostic scan", "Road test", "History check", "Same-day report"].map((item) => (
            <div key={item} className="flex items-center gap-2 font-semibold text-emerald-950">
              <Check className="h-4 w-4 text-emerald-600" /> {item}
            </div>
          ))}
        </div>

        {selectedIsShortNotice && shortNoticeConfirmed && (
          <div className="border-b border-primary/15 bg-primary/5 px-5 py-3 text-sm font-semibold text-primary sm:px-7">
            <span className="inline-flex items-center gap-2"><Check className="h-4 w-4" /> Short-notice slot confirmed with Henry</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7 p-5 sm:p-7">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">1</span>
              <div>
                <h3 className="font-bold">Tell us about the car</h3>
                <p className="text-xs text-muted-foreground">This lets us prepare before we arrive.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="registration">Registration *</Label>
                <Input id="registration" value={form.registration} onChange={set("registration")} placeholder="e.g. AB12 CDE" required className="uk-numberplate text-center tracking-widest" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="location">Where is the car? *</Label>
                <Input id="location" value={form.location} onChange={set("location")} placeholder="Postcode or dealer name" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="sellerName">Seller&apos;s name</Label>
                <Input id="sellerName" value={form.sellerName} onChange={set("sellerName")} placeholder="Private seller or dealership" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="sellerPhone">Seller&apos;s contact number</Label>
                <Input id="sellerPhone" type="tel" value={form.sellerPhone} onChange={set("sellerPhone")} placeholder="07700 900000" />
              </div>

              {form.sellerPhone.trim().length >= 10 && (
                <div className="sm:col-span-2 flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 sm:flex-row sm:items-center">
                  <div className="flex flex-1 items-start gap-2">
                    <TriangleAlert className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-700" />
                    <p className="text-xs text-amber-900">
                      Please make sure the seller can give us access to the vehicle at this time before you pay.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a href={`tel:${form.sellerPhone.replace(/\s+/g, "")}`} className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-amber-300 bg-white px-3 text-xs font-semibold text-amber-900 hover:bg-amber-100 sm:flex-initial">
                      <Phone className="h-3.5 w-3.5" /> Call seller
                    </a>
                    <a href={`https://wa.me/${toWhatsAppNumber(form.sellerPhone)}`} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#25D366] px-3 text-xs font-semibold text-white hover:bg-[#1da851] sm:flex-initial">
                      <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                    </a>
                  </div>
                </div>
              )}

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="advertUrl">Link to the advert</Label>
                <Input id="advertUrl" type="text" value={form.advertUrl} onChange={set("advertUrl")} placeholder="AutoTrader, eBay, Facebook Marketplace, dealer advert..." />
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">2</span>
              <div>
                <h3 className="font-bold">Your details</h3>
                <p className="text-xs text-muted-foreground">We&apos;ll send the booking confirmation and report here.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full name *</Label>
                <Input id="name" value={form.name} onChange={set("name")} placeholder="Your name" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone number *</Label>
                <Input id="phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="07700 900000" required />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="email">Email address *</Label>
                <Input id="email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" required />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="notes">Anything you&apos;re already concerned about?</Label>
                <Textarea id="notes" value={form.notes} onChange={set("notes")} placeholder="Any noises, warning lights, seller comments or access details..." rows={2} maxLength={400} />
              </div>
            </div>
          </div>

          {error && <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}

          <div className="rounded-2xl border border-border bg-muted/25 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-bold">{selectedPackage.name}</p>
                <p className="text-xs text-muted-foreground">{includeEvSoh ? "Includes EV Battery State of Health Report (+£49.99)" : "Inspection only — no optional battery State of Health report"}</p>
              </div>
              <p className="text-2xl font-bold">£{totalPrice.toFixed(2)}</p>
            </div>
          </div>

          <Button type="submit" size="lg" disabled={submitting} className="h-14 w-full text-lg font-bold bg-primary hover:bg-primary/90">
            {submitting ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Opening secure payment...</>
            ) : (
              <>Reserve My Inspection — £{totalPrice.toFixed(2)} <ChevronRight className="ml-2 h-5 w-5" /></>
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Secure checkout via Stripe. Your appointment is confirmed once payment is complete.
          </p>
        </form>
      </div>
    )
  }

  const daySlots = selectedDate ? slotsByDate.get(selectedDate) || [] : []

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-7 grid gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border bg-white p-4">
          <BatteryCharging className="h-6 w-6 shrink-0 text-primary" />
          <div><p className="text-sm font-bold">Specialists in EV</p><p className="text-xs text-muted-foreground">EV diagnostics &amp; optional battery health reports</p></div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border bg-white p-4">
          <Clock className="h-6 w-6 shrink-0 text-primary" />
          <div><p className="text-sm font-bold">Short-notice availability</p><p className="text-xs text-muted-foreground">Message first inside 24 hours</p></div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border bg-white p-4">
          <Wrench className="h-6 w-6 shrink-0 text-primary" />
          <div><p className="text-sm font-bold">Most thorough mechanical checks available</p><p className="text-xs text-muted-foreground">In-depth findings, video &amp; buying guidance</p></div>
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">1</span>
          <div>
            <h3 className="text-xl font-bold">Choose your inspection</h3>
            <p className="text-sm text-muted-foreground">Both packages include an in-depth mechanical inspection, video review, evidence and personal buying guidance.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {PACKAGES.map((pkg) => {
            const active = packageKey === pkg.key
            return (
              <button key={pkg.key} type="button" onClick={() => choosePackage(pkg.key)} className={`relative rounded-2xl border-2 p-5 text-left transition-all ${active ? "border-primary bg-primary/5 shadow-md" : "border-border bg-white hover:border-primary/40 hover:shadow-sm"}`}>
                {pkg.popular && <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">Most thorough</span>}
                <p className="text-sm font-semibold text-muted-foreground">{pkg.points}</p>
                <div className="mt-1 flex items-end gap-3">
                  <h4 className="text-xl font-bold">{pkg.name}</h4>
                  <p className="ml-auto text-3xl font-bold">{pkg.price}</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{pkg.strapline}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {pkg.features.map((feature) => (
                    <span key={feature} className="flex items-center gap-2 text-xs font-medium"><Check className="h-4 w-4 text-emerald-600" /> {feature}</span>
                  ))}
                </div>
                {active && <div className="mt-4 flex items-center gap-2 text-sm font-bold text-primary"><Check className="h-4 w-4" /> Selected</div>}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">+</span>
          <div>
            <h3 className="font-bold">Optional EV battery State of Health report</h3>
            <p className="text-xs text-muted-foreground">Choose your add-on now. EV-specific inspection checks are already included in both packages.</p>
          </div>
        </div>
        <label htmlFor="includeEvSoh" className={`block cursor-pointer rounded-2xl border-2 p-4 transition-all ${includeEvSoh ? "border-emerald-500 bg-emerald-50 shadow-sm" : "border-border bg-background hover:border-emerald-300"}`}>
          <div className="flex items-start gap-3">
            <input id="includeEvSoh" type="checkbox" checked={includeEvSoh} onChange={(e) => setIncludeEvSoh(e.target.checked)} className="mt-1 h-5 w-5 rounded border-border accent-emerald-600" />
            <BatteryCharging className="h-6 w-6 flex-shrink-0 text-emerald-700" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-bold text-foreground">EV Battery State of Health Report</p>
                <p className="text-lg font-bold text-emerald-800">+£49.99</p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Dedicated traction-battery SOH assessment and customer battery health report for compatible fully electric vehicles.
              </p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                <BadgeCheck className="h-4 w-4" /> CARA Approved® Autel EV Battery Health Test
              </p>
            </div>
          </div>
        </label>
      </div>

      <div className="my-6 flex items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-4" aria-live="polite">
        <div>
          <p className="font-bold">{selectedPackage.name}</p>
          <p className="text-sm text-muted-foreground">{includeEvSoh ? "Includes EV Battery State of Health Report (+£49.99)" : "No optional battery State of Health report selected"}</p>
        </div>
        <p className="shrink-0 text-2xl font-bold">£{totalPrice.toFixed(2)}</p>
      </div>

      <div>
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">2</span>
          <div>
            <h3 className="text-xl font-bold">Choose a convenient time</h3>
            <p className="text-sm text-muted-foreground">All open times are shown. If it&apos;s within 24 hours, message us first so we can confirm travel and access.</p>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-3 text-xs font-semibold">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-primary">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" /> Book online
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1.5 text-foreground">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-primary bg-white" /> Within 24 hours — message first
          </span>
        </div>

        {loadingSlots ? (
          <div className="grid gap-4 md:grid-cols-[1.25fr_.75fr]">
            <div className="h-80 animate-pulse rounded-2xl border bg-muted/40" />
            <div className="h-80 animate-pulse rounded-2xl border bg-muted/30" />
          </div>
        ) : slots.length === 0 ? (
          <div className="rounded-2xl border bg-white p-8 text-center">
            <CalendarDays className="mx-auto h-8 w-8 text-primary" />
            <p className="mt-3 font-bold">No availability showing for this package.</p>
            <p className="mt-1 text-sm text-muted-foreground">Message us and we&apos;ll see what we can arrange.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
            <div className="grid md:h-[430px] md:grid-cols-[1.25fr_.75fr]">
              <div className="border-b border-border p-5 md:h-full md:overflow-hidden md:border-b-0 md:border-r sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <button type="button" onClick={() => setViewDate((v) => (v.month === 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: v.month - 1 }))} className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted" aria-label="Previous month">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <p className="font-bold">{monthLabel}</p>
                  <button type="button" onClick={() => setViewDate((v) => (v.month === 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: v.month + 1 }))} className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted" aria-label="Next month">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mb-2 grid grid-cols-7 gap-1">
                  {WEEKDAY_LABELS.map((w) => <div key={w} className="py-1 text-center text-xs font-semibold text-muted-foreground">{w}</div>)}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {monthGrid.map((date, i) => {
                    if (!date) return <div key={i} />
                    const key = toDateKey(date)
                    const dateSlots = slotsByDate.get(key) || []
                    const hasSlots = dateSlots.length > 0
                    const onlyShortNotice = hasSlots && dateSlots.every((slot) => isShortNotice(slot, nowMs))
                    const isSelected = key === selectedDate
                    return (
                      <button
                        key={i}
                        type="button"
                        disabled={!hasSlots}
                        onClick={() => chooseDate(key)}
                        className={`h-10 rounded-full text-sm font-semibold transition-colors ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : onlyShortNotice
                              ? "bg-primary/5 text-primary ring-1 ring-primary/25 hover:bg-primary/10"
                              : hasSlots
                                ? "text-foreground hover:bg-primary/10"
                                : "cursor-not-allowed text-muted-foreground/25"
                        }`}
                      >
                        {date.getDate()}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="bg-muted/20 p-5 sm:p-6 md:h-full md:overflow-y-auto md:overscroll-contain">
                {selectedDate ? (
                  <>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">Available appointments</p>
                    <p className="mb-4 font-bold">
                      {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
                    </p>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
                      {daySlots.map((slot) => {
                        const shortNotice = isShortNotice(slot, nowMs)
                        const isCandidate = shortNoticeCandidate?.start === slot.start
                        const time = formatSlotTime(slot)
                        return (
                          <button
                            key={slot.start}
                            type="button"
                            onClick={() => handleSlotClick(slot)}
                            className={`rounded-xl border px-4 py-3 text-sm font-bold transition-all hover:shadow-sm ${
                              shortNotice
                                ? isCandidate
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-primary/25 bg-white text-foreground hover:border-primary/50 hover:bg-primary/5"
                                : "border-primary bg-white text-primary hover:bg-primary hover:text-primary-foreground"
                            }`}
                          >
                            <span className="block text-base">{time}</span>
                            <span className={`mt-0.5 block text-[11px] font-semibold ${shortNotice ? "text-muted-foreground" : "opacity-70"}`}>
                              {shortNotice ? "Message first" : "Book online"}
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    {shortNoticeCandidate && dateKey(shortNoticeCandidate.start) === selectedDate && (
                      <div className="mt-4 rounded-2xl border-2 border-primary/20 bg-white p-4">
                        <p className="font-bold text-foreground">Want to book {formatSlotTime(shortNoticeCandidate)}?</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          Message Henry first. If he confirms this exact short-notice slot is available, tick the box below to unlock online booking.
                        </p>
                        <a
                          href={shortNoticeWhatsAppUrl(shortNoticeCandidate, selectedPackage.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                        >
                          <MessageCircle className="h-4 w-4" /> Message Henry about this slot
                        </a>
                        <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-primary/15 bg-primary/5 p-3">
                          <input
                            type="checkbox"
                            checked={shortNoticeConfirmed}
                            onChange={(e) => setShortNoticeConfirmed(e.target.checked)}
                            className="mt-0.5 h-5 w-5 rounded border-border accent-primary"
                          />
                          <span className="text-sm font-semibold text-foreground">
                            Henry has confirmed {formatSlotDateTime(shortNoticeCandidate)} is available for me.
                          </span>
                        </label>
                        <Button
                          type="button"
                          onClick={bookConfirmedShortNotice}
                          disabled={!shortNoticeConfirmed}
                          className="mt-3 w-full font-bold"
                        >
                          Book confirmed {formatSlotTime(shortNoticeCandidate)} slot
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex min-h-48 items-center justify-center text-center text-sm text-muted-foreground">Choose a highlighted date to see appointment times.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {error && <p className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}

        <div className="mt-5 flex flex-col items-center justify-between gap-3 rounded-2xl border border-primary/15 bg-primary/5 p-4 sm:flex-row">
          <div>
            <p className="font-bold text-foreground">Short-notice appointments are still shown.</p>
            <p className="text-sm text-muted-foreground">Inside 24 hours, message Henry first. Once he confirms your exact slot, tick the confirmation box and book online as normal.</p>
          </div>
          <a href="https://wa.me/441992367909" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 flex-shrink-0 items-center justify-center gap-2 rounded-xl border border-primary/20 bg-white px-5 text-sm font-bold text-primary hover:bg-primary/5">
            <MessageCircle className="h-4 w-4" /> Message Henry
          </a>
        </div>
      </div>
    </div>
  )
}
