import { Metadata } from "next"
import Link from "next/link"
import type { ComponentType, ReactNode } from "react"
import { ArrowRight, BatteryCharging, ChevronDown, FileSearch, FileText, HelpCircle, ListChecks, ShieldCheck, Star, Workflow } from "lucide-react"
import { InspectionsHero } from "@/components/vehicle-inspections/hero"
import { BookNowButton } from "@/components/vehicle-inspections/book-now-button"
import { BookingLinkRedirect } from "@/components/vehicle-inspections/booking-link-redirect"
import { MechanicalReportOverview } from "@/components/vehicle-inspections/mechanical-report-overview"
import { WhatsIncluded } from "@/components/vehicle-inspections/whats-included"
import { InspectionsHowItWorks } from "@/components/vehicle-inspections/how-it-works"
import { InspectionsWhatWeInspect } from "@/components/vehicle-inspections/what-we-inspect"
import { EvBatterySoh } from "@/components/vehicle-inspections/ev-battery-soh"
import { InspectionsWhyUs } from "@/components/vehicle-inspections/why-us"
import { InspectionsFAQ } from "@/components/vehicle-inspections/faq"
import { LocalAreaLinks } from "@/components/vehicle-inspections/local-area-links"
import { TestimonialsSection } from "@/components/testimonials-section"

export const metadata: Metadata = {
  title: "Car Inspection Service | Pre-Purchase Vehicle Inspections | Epping Car Buyer",
  description:
    "Independent mobile car inspection service from £149.99. In-depth pre-purchase inspections with diagnostics, road test, video review and personal buying guidance across Essex, Herts and London.",
  alternates: {
    canonical: "/vehicle-inspections",
  },
  openGraph: {
    title: "Car Inspection Service | Pre-Purchase Vehicle Inspections",
    description:
      "Understand the car before you commit. Both packages include a video review, documented findings and personal buying guidance. Inspections from £149.99.",
    url: "/vehicle-inspections",
    type: "website",
  },
}

// One of the page's dropdowns: closed until tapped, so the page itself stays short.
function InfoSection({ icon: Icon, title, summary, children }: {
  icon: ComponentType<{ className?: string }>
  title: string
  summary: string
  children: ReactNode
}) {
  return (
    <details className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-3">
          <Icon className="h-5 w-5 shrink-0 text-primary" />
          <span>
            <span className="block font-bold">{title}</span>
            <span className="block text-sm text-muted-foreground">{summary}</span>
          </span>
        </span>
        <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-border">{children}</div>
    </details>
  )
}

// Everything about the inspection, in dropdowns between two Book Now buttons. The booking itself is on
// /vehicle-inspections/book.
export default function VehicleInspectionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <BookingLinkRedirect />
      <InspectionsHero />

      <section className="bg-slate-50 py-7 sm:py-10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-5 text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">About your inspection</h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">Tap a section to open it.</p>
            </div>

            <div className="space-y-3">
              <InfoSection icon={ListChecks} title="What's included & prices" summary="Everything you get for £149.99 or £199.99">
                <div className="bg-slate-50 p-3 sm:p-6">
                  <WhatsIncluded />
                </div>
              </InfoSection>

              <InfoSection icon={FileText} title="What's in your report?" summary="Findings, photos, a video review and a personal call">
                <MechanicalReportOverview />
                <p className="p-4 text-center sm:p-5">
                  <Link href="/vehicle-inspections/sample-report" className="inline-flex min-h-11 items-center gap-2 font-bold text-primary hover:underline">
                    View a sample report <ArrowRight className="h-4 w-4" />
                  </Link>
                </p>
              </InfoSection>

              <InfoSection icon={FileSearch} title="What do you inspect?" summary="Every point on the checklist, with Premium-only sections marked">
                <InspectionsWhatWeInspect />
              </InfoSection>

              <InfoSection icon={Workflow} title="How does it work?" summary="Book, we attend, we inspect, you get the findings">
                <InspectionsHowItWorks />
              </InfoSection>

              <InfoSection icon={BatteryCharging} title="EV battery health check" summary="£99.99 on its own or +£49.99 with an inspection">
                <EvBatterySoh />
              </InfoSection>

              <InfoSection icon={ShieldCheck} title="Why use Epping Car Buyer?" summary="Independent findings, direct contact and clear reporting">
                <InspectionsWhyUs />
              </InfoSection>

              <InfoSection icon={Star} title="What customers say" summary="Reviews from buyers whose cars we've inspected">
                <TestimonialsSection className="bg-white" />
              </InfoSection>

              <InfoSection icon={HelpCircle} title="Frequently asked questions" summary="Timing, reports, locations, payments and inspection details">
                <InspectionsFAQ />
              </InfoSection>
            </div>

            <div className="mt-8 text-center">
              <BookNowButton />
              <p className="mt-3 text-sm text-muted-foreground">Choose your inspection, date and time on the next page.</p>
            </div>

            <LocalAreaLinks />
          </div>
        </div>
      </section>
    </div>
  )
}
