import { Metadata } from "next"
import { SellForMeHero } from "@/components/sell-for-me/hero"
import { SellForMeTwoPrices } from "@/components/sell-for-me/two-prices"
import { SellForMeWhatsIncluded } from "@/components/sell-for-me/whats-included"
import { SellForMeSalesFlow } from "@/components/sell-for-me/sales-flow"

const title = "Sell My Car For Me | Market & Sell Service | Epping Car Buyer"
const description =
  "We market and sell your car for you, aiming closer to retail value than a trade sale. No upfront cost, no sale, no fee. Covering Essex, Herts and London."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/market-and-sell" },
  openGraph: {
    title,
    description,
    url: "/market-and-sell",
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
