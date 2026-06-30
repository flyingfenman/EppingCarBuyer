"use client"

import { ArrowRight } from "lucide-react"

export function SellForMeTwoPrices() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-balance">Every Car Has Two Prices</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            A trade price and a retail price. The gap between them covers a dealership&apos;s overheads, not the car&apos;s
            actual condition.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border bg-muted/30 p-8 lg:p-10 shadow-lg">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
              <div className="text-center space-y-1">
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Part Ex Value</p>
                <p className="text-4xl lg:text-5xl font-bold text-foreground">£16,366</p>
              </div>

              <div className="hidden lg:flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
              </div>

              <div className="text-center space-y-1">
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Retail Value</p>
                <p className="text-4xl lg:text-5xl font-bold text-foreground">£19,857</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">The Gap</p>
              <p className="text-5xl lg:text-6xl font-bold text-primary mt-1">£3,491</p>
            </div>

            <p className="mt-8 text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              That gap covers a dealership&apos;s yard, staff, advertising and overheads. If your car is in good
              condition, you shouldn&apos;t have to pay for things it doesn&apos;t need.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
