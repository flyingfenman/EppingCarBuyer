import { Metadata } from "next"
import { SellForMeHero } from "@/components/sell-for-me/hero"
import { SellForMeHowItWorks } from "@/components/sell-for-me/how-it-works"
import { SellForMeWhatsIncluded } from "@/components/sell-for-me/whats-included"
import { SellForMePricing } from "@/components/sell-for-me/pricing"
import { SellForMeComparison } from "@/components/sell-for-me/comparison"
import { SellForMeCta } from "@/components/sell-for-me/cta"

export const metadata: Metadata = {
  title: "Sell It For Me - Epping Car Buyer",
  description:
    "Let us sell your car on your behalf for closer to retail price. No upfront cost, no hassle. You only pay us if we sell it.",
}

export default function SellForMePage() {
  return (
    <div className="min-h-screen">
      <SellForMeHero />
      <SellForMeHowItWorks />
      <SellForMeWhatsIncluded />
      <SellForMePricing />
      <SellForMeComparison />
      <SellForMeCta />
    </div>
  )
}
