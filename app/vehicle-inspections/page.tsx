import { Metadata } from "next"
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
    <div className="min-h-screen">
      <InspectionsHero />
      <InspectionsHowItWorks />
      <InspectionsWhatWeInspect />
      <EvBatterySoh />
      <InspectionsWhyUs />
      <InspectionsCta />
      <InspectionsFAQ />
    </div>
  )
}
