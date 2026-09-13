"use client"

import { Button } from "@/components/ui/button"
import {
  ArrowDown,
  ArrowRight,
  BatteryCharging,
  CalendarDays,
  Check,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react"

export function InspectionsHero() {
  const scrollToPackages = () => {
    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToBook = () => {
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative bg-white py-10 sm:py-14 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Independent pre-purchase vehicle inspections
            </div>

            <h1 className="text-4xl font-bold leading-tight text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
              Buying a Used Car?
              <br />
              <span className="text-primary">Know Before You Buy.</span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl lg:mx-0">
              We inspect the car where it&apos;s being sold before you hand over a penny — visual condition,
              diagnostic scan, road test and vehicle history. Petrol, diesel, hybrid or electric, with a dedicated
              EV Battery State of Health report available for compatible electric cars.
            </p>

            <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900">
              <BatteryCharging className="h-5 w-5 text-emerald-700" />
              EV Battery SOH Report +£49.99 · CARA Approved® Autel Test
            </div>

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                onClick={scrollToBook}
                size="lg"
                className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90"
              >
                Book an Inspection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={scrollToPackages}
                variant="outline"
                size="lg"
                className="h-14 px-7 text-base font-semibold"
              >
                See Packages &amp; Prices
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground lg:justify-start">
              <MapPin className="h-4 w-4" />
              Covering Essex, Hertfordshire, Cambridgeshire &amp; Greater London
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-background p-5 shadow-xl sm:p-7 lg:p-8">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <CalendarDays className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-primary">Epping Car Buyer</p>
                <h2 className="mt-1 text-3xl font-bold sm:text-4xl">Book an Inspection</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Choose the level of inspection you need, pick an available time and pay securely online.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-muted/25 p-4">
                <p className="text-sm font-semibold text-muted-foreground">Standard Inspection</p>
                <p className="mt-1 text-3xl font-bold">£149.99</p>
                <p className="mt-1 text-xs text-muted-foreground">90-point pre-purchase check</p>
              </div>
              <div className="rounded-2xl border-2 border-primary bg-primary/5 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-muted-foreground">Premium Inspection</p>
                  <span className="rounded-full bg-primary px-2 py-1 text-[10px] font-bold uppercase text-primary-foreground">
                    Most thorough
                  </span>
                </div>
                <p className="mt-1 text-3xl font-bold">£199.99</p>
                <p className="mt-1 text-xs text-muted-foreground">140-point pre-purchase check</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="flex items-start gap-3">
                <BatteryCharging className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-700" />
                <div>
                  <p className="font-bold text-emerald-950">EV Battery State of Health Report +£49.99</p>
                  <p className="mt-1 text-xs leading-relaxed text-emerald-900/80">
                    Add the CARA Approved® Autel EV Battery Health Test for compatible fully electric vehicles.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-2 text-sm text-foreground sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Diagnostic scan
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Road test
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Vehicle history check
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Same-day digital report
              </div>
            </div>

            <Button
              onClick={scrollToBook}
              size="lg"
              className="mt-6 h-14 w-full text-lg font-bold bg-primary hover:bg-primary/90"
            >
              Choose a Time &amp; Book Online
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <a
              href="https://wa.me/441992367909"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border text-sm font-semibold transition-colors hover:bg-muted/40"
            >
              <MessageCircle className="h-4 w-4" />
              Prefer to ask first? WhatsApp Henry
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
