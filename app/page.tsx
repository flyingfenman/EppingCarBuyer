import { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { HomeCoreServices } from "@/components/home-core-services"
import { HowItWorks } from "@/components/how-it-works"
import { CarTrailerSection } from "@/components/car-trailer-section"
import { AreasWeCover } from "@/components/areas-we-cover"
import { ValuationSection } from "@/components/valuation-section"
import { ContactSection } from "@/components/contact-section"

const title = "Vehicle Inspections, Market & Sell & Car Buying | Epping Car Buyer"
const description =
  "Book an independent pre-purchase vehicle inspection from £149.99, use our managed Market & Sell service, or get an instant valuation and fast payment for your car."

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
    <div className="min-h-screen">
      <HomeCoreServices />
      <HeroSection />
      <HowItWorks />
      <CarTrailerSection />
      <AreasWeCover />
      <ValuationSection />
      <ContactSection />
    </div>
  )
}
