import type { Metadata } from "next"
import { LocalInspectionPage } from "@/components/vehicle-inspections/local-inspection-page"

const canonicalPath = "/vehicle-inspection-london"

export const metadata: Metadata = {
  title: "Vehicle Inspection London | Pre-Purchase Car Inspection | Epping Car Buyer",
  description:
    "Independent mobile vehicle inspections in London from £149.99. Diagnostic scan, road test, history check, same-day report and optional EV battery SOH testing.",
  alternates: { canonical: canonicalPath },
  openGraph: {
    title: "Vehicle Inspection London | Epping Car Buyer",
    description: "Independent pre-purchase car inspections in London from £149.99.",
    url: canonicalPath,
    type: "website",
  },
}

export default function VehicleInspectionLondonPage() {
  return (
    <LocalInspectionPage
      brandName="Epping Car Buyer"
      siteUrl="https://www.eppingcarbuyer.com"
      keyword="Vehicle Inspection London"
      city="London"
      canonicalPath={canonicalPath}
      intro="Buying a used car in London? We can inspect it at the seller or dealership before you commit, with diagnostics, a road test, vehicle history and a same-day digital report."
      localCopy="Our London vehicle inspection service is designed for buyers who want an independent view of a used car before handing over their money. We inspect petrol, diesel, hybrid and electric vehicles and explain the important findings in plain English."
      nearbyAreas={["East London", "North London", "Enfield", "Walthamstow", "Ilford", "Romford"]}
    />
  )
}
