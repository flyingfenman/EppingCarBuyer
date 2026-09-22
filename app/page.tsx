import { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { HomeCoreServices } from "@/components/home-core-services"
import { MechanicalReportOverview } from "@/components/vehicle-inspections/mechanical-report-overview"
import { InspectionsWhyUs } from "@/components/vehicle-inspections/why-us"
import { AreasWeCover } from "@/components/areas-we-cover"
import { ContactSection } from "@/components/contact-section"

const title = "Independent Vehicle Inspections | Epping Car Buyer"
const description =
  "Independent pre-purchase vehicle inspections from £149.99. 160-point Standard and 260-point Premium inspections with diagnostics, road test, video evidence and EV and hybrid checks across London, Essex and surrounding areas."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: ["/images/inspection-car.jpg"],
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <HomeCoreServices />
      <MechanicalReportOverview />
      <InspectionsWhyUs />
      <AreasWeCover />
      <ContactSection />
    </div>
  )
}
