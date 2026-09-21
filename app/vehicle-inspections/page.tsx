import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BatteryCharging, ChevronDown, FileText, HelpCircle, ListChecks, ShieldCheck, Workflow } from "lucide-react"
import { InspectionsHero } from "@/components/vehicle-inspections/hero"
import { MechanicalReportOverview } from "@/components/vehicle-inspections/mechanical-report-overview"
import { InspectionsHowItWorks } from "@/components/vehicle-inspections/how-it-works"
import { InspectionsWhatWeInspect } from "@/components/vehicle-inspections/what-we-inspect"
import { EvBatterySoh } from "@/components/vehicle-inspections/ev-battery-soh"
import { InspectionsWhyUs } from "@/components/vehicle-inspections/why-us"
import { InspectionsFAQ } from "@/components/vehicle-inspections/faq"
import { InspectionsCta } from "@/components/vehicle-inspections/cta"
import { LocalAreaLinks } from "@/components/vehicle-inspections/local-area-links"

export const metadata: Metadata = {
  title: "Pre-Purchase Vehicle Inspections & EV Battery Health Checks | Epping Car Buyer",
  description:
    "In-depth mechanical car inspections covering engine, drivetrain, brakes, steering, suspension and diagnostics, with video review, evidence and personal buying guidance.",
  alternates: {
    canonical: "/vehicle-inspections",
  },
  openGraph: {
    title: "Pre-Purchase Vehicle Inspections & EV Battery Health Checks",
    description:
      "Understand the car before you commit. Both packages include a video review, documented findings and personal buying guidance. Inspections from £149.99.",
    url: "/vehicle-inspections",
    type: "website",
  },
}

export default function VehicleInspectionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <InspectionsHero />
      <InspectionsCta />
      <div id="inspection-details" className="scroll-mt-24">
        <MechanicalReportOverview />
      </div>

      <section className="bg-slate-50 py-7 sm:py-10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-5 text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">More about your inspection</h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Explore the checks, view a sample report or read the answers to common questions.
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
                      <p className="mt-1 text-sm text-muted-foreground">An in-depth 160-point mechanical and condition inspection covering the relevant engine and drivetrain, brakes, steering, suspension, diagnostics and road test. Includes vehicle history, a clear video review, photo evidence, same-day report and personal buying guidance.</p>
                    </div>
                    <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4">
                      <p className="text-sm font-bold text-primary">Premium Inspection</p>
                      <p className="mt-1 text-3xl font-bold">£199.99</p>
                      <p className="mt-1 text-sm text-muted-foreground">Everything in Standard, including the video review and buying guidance, plus a deeper 260-point assessment, paint-depth assessment, extended road test, repair-cost guidance and additional vehicle and seller provenance searches.</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Premium adds searches of available auction, salvage and previous advert records, including Copart where available, and checks for indicators of undisclosed motor trading. Searches depend on available records. Road tests are subject to safety and permission.</p>
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
                      <span className="block text-xs text-muted-foreground sm:text-sm">160-point Standard · 260-point Premium · diagnostics, paint, provenance and road test</span>
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
            <LocalAreaLinks />
          </div>
        </div>
      </section>

    </div>
  )
}
