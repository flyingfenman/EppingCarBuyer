"use client"

import { Check } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const tiers = [
  {
    range: "Under £5,000",
    fee: "£395",
    description: "For cars valued under £5,000",
  },
  {
    range: "£5,000 – £15,000",
    fee: "£595",
    description: "For cars valued between £5,000 and £15,000",
    popular: true,
  },
  {
    range: "Over £15,000",
    fee: "£895",
    description: "For cars valued over £15,000",
  },
]

export function SellForMePricing() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">Simple Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our fee depends on your car&apos;s value. That&apos;s it.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <Card
              key={tier.range}
              className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                tier.popular ? "border-2 border-primary shadow-lg" : "border shadow-md"
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-bl-lg">
                  Most common
                </div>
              )}
              <CardHeader className="text-center pb-2 pt-8">
                <p className="text-lg font-semibold text-muted-foreground">{tier.range}</p>
                <p className="text-5xl font-bold text-foreground mt-2">{tier.fee}</p>
                <p className="text-sm text-muted-foreground mt-1">success fee</p>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">{tier.description}</p>
                <div className="flex items-center justify-center gap-2 text-emerald-600">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">No sale, no fee</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
