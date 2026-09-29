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
    images: ["/images/inspection-car.jpg"],
  },
}

export default function BookInspectionPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <InspectionsCta />
    </div>
  )
}
