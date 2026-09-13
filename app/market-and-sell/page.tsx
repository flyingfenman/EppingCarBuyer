import { Metadata } from "next"
import { SellForMeHero } from "@/components/sell-for-me/hero"
import { SellForMeTwoPrices } from "@/components/sell-for-me/two-prices"
import { SellForMeWhatsIncluded } from "@/components/sell-for-me/whats-included"
import { SellForMeSalesFlow } from "@/components/sell-for-me/sales-flow"

export const metadata: Metadata = {
  title: "Market & Sell - Epping Car Buyer",
  description:
    "Let us market and sell your car on your behalf for closer to retail price. No upfront cost, no hassle. You only pay us if we sell it.",
  openGraph: {
    title: "Market & Sell - Epping Car Buyer",
    description:
      "Let us market and sell your car on your behalf for closer to retail price. No upfront cost, no hassle. You only pay us if we sell it.",
    images: ["/images/inspection-car.jpg"],
  },
}

export default function MarketAndSellPage() {
  return (
    <div className="min-h-screen">
      <SellForMeHero />
      <SellForMeTwoPrices />
      <SellForMeWhatsIncluded />
      <SellForMeSalesFlow />
    </div>
  )
}
