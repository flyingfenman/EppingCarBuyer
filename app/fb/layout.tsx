import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Get Your Free Car Valuation | Epping Car Buyer",
  description:
    "Sell your car quickly and easily. Get an instant free valuation from Epping Car Buyer — we pay the best prices and collect from you.",
}

export default function FBLayout({ children }: { children: React.ReactNode }) {
  // Standalone layout — removes site nav/footer for a clean Facebook ad landing experience
  return <>{children}</>
}
