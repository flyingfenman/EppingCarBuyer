import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { CarTrailerSection } from "@/components/car-trailer-section"
import { AreasWeCover } from "@/components/areas-we-cover"
import { ValuationSection } from "@/components/valuation-section"
import { ContactSection } from "@/components/contact-section"

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
