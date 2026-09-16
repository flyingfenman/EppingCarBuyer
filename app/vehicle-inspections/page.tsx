import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BatteryCharging, ChevronDown, FileText, HelpCircle, ListChecks, ShieldCheck, Workflow } from "lucide-react"
import { InspectionsHero } from "@/components/vehicle-inspections/hero"
import { InspectionsHowItWorks } from "@/components/vehicle-inspections/how-it-works"
import { InspectionsWhatWeInspect } from "@/components/vehicle-inspections/what-we-inspect"
import { EvBatterySoh } from "@/components/vehicle-inspections/ev-battery-soh"
import { InspectionsWhyUs } from "@/components/vehicle-inspections/why-us"
import { InspectionsFAQ } from "@/components/vehicle-inspections/faq"
import { InspectionsCta } from "@/components/vehicle-inspections/cta"

export const metadata: Metadata = {
  title: "Pre-Purchase Vehicle Inspections & EV Battery Health Checks | Epping Car Buyer",
  description:
    "Independent mobile pre-purchase car inspections across Essex, Hertfordshire, Greater London, Cambridgeshire and nearby areas. Diagnostic scan, road test, history check and optional £49.99 CARA Approved® Autel EV Battery State of Health report.",
  alternates: {
    canonical: "/vehicle-inspections",
  },
  openGraph: {
    title: "Pre-Purchase Vehicle Inspections & EV Battery Health Checks",
    description:
      "Independent vehicle inspections from £149.99, with an optional £49.99 CARA Approved® Autel EV Battery State of Health report.",
    url: "/vehicle-inspections",
    type: "website",
  },
}

export default function VehicleInspectionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <InspectionsHero />

      <section className="bg-slate-50 py-7 sm:py-10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-5 text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">Everything you need to know</h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Open only the information you want. You can go straight to booking at any time.
              </p>
            </div>

            <div className="mb-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/vehicle-inspections/sample-report"
                className="group flex items-center justify-between rounded-2xl border border-primary/20 bg-white p-4 shadow-sm transition hover:border-primary/40 hover:shadow-md"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-bold">View Sample Report</span>
                    <span className="block text-xs text-muted-foreground">See exactly what the finished report looks like</span>
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/ev-battery-health-check"
                className="group flex items-center justify-between rounded-2xl border border-primary/20 bg-white p-4 shadow-sm transition hover:border-primary/40 hover:shadow-md"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BatteryCharging className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-bold">EV Battery Health</span>
                    <span className="block text-xs text-muted-foreground">Learn about the £49.99 SOH report</span>
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="space-y-3">
              <details className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-3">
                    <ListChecks className="h-5 w-5 shrink-0 text-primary" />
                    <span>
                      <span className="block font-bold">Packages & prices</span>
                      <span className="block text-xs text-muted-foreground sm:text-sm">Standard £149.99 · Premium £199.99</span>
                    </span>
                  </span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-border p-4 sm:p-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border p-4">
                      <p className="text-sm font-bold text-primary">Standard Inspection</p>
                      <p className="mt-1 text-3xl font-bold">£149.99</p>
                      <p className="mt-1 text-sm text-muted-foreground">90-point inspection including diagnostic scan, road test, history check and same-day digital report.</p>
                    </div>
                    <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4">
                      <p className="text-sm font-bold text-primary">Premium Inspection</p>
                      <p className="mt-1 text-3xl font-bold">£199.99</p>
                      <p className="mt-1 text-sm text-muted-foreground">140-point inspection with deeper bodywork assessment, paint-depth readings and video walkaround.</p>
                    </div>
                  </div>
                  <a href="#book" className="mt-4 inline-flex items-center gap-2 font-bold text-primary hover:underline">
                    Choose a package and book <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </details>

              <details className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-3">
                    <ListChecks className="h-5 w-5 shrink-0 text-primary" />
                    <span>
                      <span className="block font-bold">What do you inspect?</span>
                      <span className="block text-xs text-muted-foreground sm:text-sm">Mechanical, body, interior, diagnostics, history and road test</span>
                    </span>
                  </span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-border">
                  <InspectionsWhatWeInspect />
                </div>
              </details>

              <details className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-3">
                    <Workflow className="h-5 w-5 shrink-0 text-primary" />
                    <span>
                      <span className="block font-bold">How does it work?</span>
                      <span className="block text-xs text-muted-foreground sm:text-sm">Book, we attend, we inspect, you get the findings</span>
                    </span>
                  </span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-border">
                  <InspectionsHowItWorks />
                </div>
              </details>

              <details className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-3">
                    <BatteryCharging className="h-5 w-5 shrink-0 text-primary" />
                    <span>
                      <span className="block font-bold">EV Battery State of Health</span>
                      <span className="block text-xs text-muted-foreground sm:text-sm">Optional CARA Approved® Autel SOH report +£49.99</span>
                    </span>
                  </span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-border">
                  <EvBatterySoh />
                </div>
              </details>

              <details className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
                    <span>
                      <span className="block font-bold">Why use Epping Car Buyer?</span>
                      <span className="block text-xs text-muted-foreground sm:text-sm">Independent findings, direct contact and clear reporting</span>
                    </span>
                  </span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-border">
                  <InspectionsWhyUs />
                </div>
              </details>

              <details className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 shrink-0 text-primary" />
                    <span>
                      <span className="block font-bold">Frequently asked questions</span>
                      <span className="block text-xs text-muted-foreground sm:text-sm">Timing, reports, locations, payments and inspection details</span>
                    </span>
                  </span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-border">
                  <InspectionsFAQ />
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <InspectionsCta />
    </div>
  )
}
