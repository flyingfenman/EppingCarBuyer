import type { Metadata } from "next"
import { InspectionsCta } from "@/components/vehicle-inspections/cta"
import { EARLY_SLOTS_SCRIPT } from "@/lib/early-slots"

const description =
  "Choose your inspection, pick a time and pay securely online: Standard £249.99, Premium £299.99, or the EV battery health check on its own for £149.99."

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
      {/* Asks for the free times as soon as the page arrives, before the calendar's own code has loaded. */}
      <script dangerouslySetInnerHTML={{ __html: EARLY_SLOTS_SCRIPT }} />
      <InspectionsCta />
    </div>
  )
}
