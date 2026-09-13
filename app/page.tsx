import { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { CarTrailerSection } from "@/components/car-trailer-section"
import { AreasWeCover } from "@/components/areas-we-cover"
import { ValuationSection } from "@/components/valuation-section"
import { ContactSection } from "@/components/contact-section"

const title = "Epping Car Buyer — Sell Your Car Fast, Or Get It Inspected Before You Buy"
const description =
  "Get an instant cash offer to sell your car, or book an independent vehicle inspection from £130 before you buy."

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
      <HeroSection />
      <HowItWorks />
      <CarTrailerSection />
      <AreasWeCover />
      <ValuationSection />
      <ContactSection />
    </div>
  )
}
