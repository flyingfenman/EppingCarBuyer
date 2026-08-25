import { Metadata } from "next"
import { InspectionsHero } from "@/components/vehicle-inspections/hero"
import { InspectionsHowItWorks } from "@/components/vehicle-inspections/how-it-works"
import { InspectionsWhatWeInspect } from "@/components/vehicle-inspections/what-we-inspect"
import { InspectionsPackages } from "@/components/vehicle-inspections/packages"
import { InspectionsWhyUs } from "@/components/vehicle-inspections/why-us"
import { InspectionsCta } from "@/components/vehicle-inspections/cta"

export const metadata: Metadata = {
  title: "Vehicle Inspections - Epping Car Buyer",
  description:
    "Independent pre-purchase vehicle inspections across Essex, Hertfordshire, Cambridgeshire, Greater London and more. Full diagnostic scan, road test and history check before you buy — from £135.",
}

export default function VehicleInspectionsPage() {
  return (
    <div className="min-h-screen">
      <InspectionsHero />
      <InspectionsHowItWorks />
      <InspectionsWhatWeInspect />
      <InspectionsPackages />
      <InspectionsWhyUs />
      <InspectionsCta />
    </div>
  )
}
