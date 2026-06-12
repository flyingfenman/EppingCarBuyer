import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Get Your Free Car Valuation | Stamford Car Buyer",
  description: "Get an instant, free car valuation. We buy any car, any condition. Fast payment within 24 hours.",
}

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This layout removes the default header/footer for a focused lead capture experience
  return <>{children}</>
}
