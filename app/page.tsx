import { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { HomeCoreServices } from "@/components/home-core-services"
import { TestimonialsSection } from "@/components/testimonials-section"
import { AreasWeCover } from "@/components/areas-we-cover"
import { ContactSection } from "@/components/contact-section"

const title = "Car Inspection Service & Market and Sell | Epping Car Buyer"
const description =
  "Book an independent pre-purchase car inspection from £149.99, or let us market and sell your car for you with our managed Market & Sell service."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
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
      <TestimonialsSection />
      <AreasWeCover />
      <ContactSection />
    </div>
  )
}
