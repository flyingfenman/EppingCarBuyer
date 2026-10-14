import type { Metadata } from "next"
import { InspectionsCta } from "@/components/vehicle-inspections/cta"

const description =
  "Choose your inspection, pick a time and pay securely online: Standard £149.99, Premium £199.99, or the EV battery health check on its own for £99.99."

export const metadata: Metadata = {
  title: "Book a Vehicle Inspection | Epping Car Buyer",
  description,
  alternates: {
    canonical: "/vehicle-inspections/book",
  },
  openGraph: {
    title: "Book a Vehicle Inspection",
    description,
    url: "/vehicle-inspections/book",
    type: "website",
    // A small square logo, so a booking link sent on WhatsApp shows a small thumbnail rather than a big photo.
    images: [{ url: "/images/share-logo-purple.png", width: 300, height: 300, alt: "Epping Car Buyer Vehicle Inspections" }],
  },
  twitter: {
    card: "summary",
    images: ["/images/share-logo-purple.png"],
  },
}

export default function BookInspectionPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <InspectionsCta />
    </div>
  )
}
