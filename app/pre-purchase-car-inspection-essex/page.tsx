import type { Metadata } from "next"
import { LocalInspectionPage } from "@/components/vehicle-inspections/local-inspection-page"

const canonicalPath = "/pre-purchase-car-inspection-essex"

export const metadata: Metadata = {
  title: "Pre Purchase Car Inspection Essex | Epping Car Buyer",
  description:
    "Independent pre-purchase car inspections across Essex from £149.99. Diagnostic scan, road test, history check, same-day report and optional EV battery SOH testing.",
  alternates: { canonical: canonicalPath },
  openGraph: {
    title: "Pre Purchase Car Inspection Essex | Epping Car Buyer",
    description: "Independent mobile used-car inspections across Essex from £149.99.",
    url: canonicalPath,
    type: "website",
  },
}

export default function PrePurchaseCarInspectionEssexPage() {
  return (
    <LocalInspectionPage
      brandName="Epping Car Buyer"
      siteUrl="https://www.eppingcarbuyer.com"
      keyword="Pre Purchase Car Inspection Essex"
      city="Essex"
      areaType="AdministrativeArea"
      canonicalPath={canonicalPath}
      intro="Buying a used car in Essex? Get an independent inspection before you pay. We attend the vehicle where it is being sold and check its condition, diagnostics, road behaviour and history."
      localCopy="Our mobile pre-purchase inspection service covers Essex and nearby areas from our Epping side of the business. It is aimed at buyers who want more than an advert, short test drive or dealer description before committing to a used car."
      nearbyAreas={["Epping", "Loughton", "Harlow", "Brentwood", "Chelmsford", "Wickford", "Ongar", "Chigwell"]}
    />
  )
}
