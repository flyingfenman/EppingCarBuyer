import { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { HomeCoreServices } from "@/components/home-core-services"
import { HowItWorks } from "@/components/how-it-works"
import { CarTrailerSection } from "@/components/car-trailer-section"
import { AreasWeCover } from "@/components/areas-we-cover"
import { ValuationSection } from "@/components/valuation-section"
import { ContactSection } from "@/components/contact-section"

const title = "Epping Car Buyer — Sell, Market or Inspect Your Car"
const description =
  "Sell your car for a fast cash offer, use our managed Market & Sell service to aim closer to retail value, or book an independent pre-purchase vehicle inspection from £149.99."

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
      <HomeCoreServices />
      <HowItWorks />
      <CarTrailerSection />
      <AreasWeCover />
      <ValuationSection />
      <ContactSection />
    </div>
  )
}
