import { Metadata } from "next"
import { BookingLinkRedirect } from "@/components/vehicle-inspections/booking-link-redirect"
import { LocalAreaLinks } from "@/components/vehicle-inspections/local-area-links"
import { InspectionsHero } from "@/components/vehicle-inspections/sections/hero"
import { Reviews } from "@/components/vehicle-inspections/sections/reviews"
import { Pricing } from "@/components/vehicle-inspections/sections/pricing"
import { Steps } from "@/components/vehicle-inspections/sections/steps"
import { WhatWeCheck } from "@/components/vehicle-inspections/sections/what-we-check"
import { ReportStrip } from "@/components/vehicle-inspections/sections/report-strip"
import { MeetHenry } from "@/components/vehicle-inspections/sections/meet-henry"
import { InspectionsFAQ } from "@/components/vehicle-inspections/sections/faq"
import { FinalCta } from "@/components/vehicle-inspections/sections/final-cta"

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

// Everything about the inspection on one page, with nothing to open: what customers say comes straight
// after the hero. The booking itself is on /vehicle-inspections/book.
export default function VehicleInspectionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <BookingLinkRedirect />
      <InspectionsHero />
      <Reviews />
      <Pricing />
      <Steps />
      <WhatWeCheck />
      <ReportStrip />
      <MeetHenry />
      <InspectionsFAQ />
      <FinalCta />
      <div className="container mx-auto max-w-6xl px-4 pb-12">
        <LocalAreaLinks />
      </div>
    </div>
  )
}
