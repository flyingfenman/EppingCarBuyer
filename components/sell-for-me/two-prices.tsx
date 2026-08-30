"use client"

import { ArrowRight } from "lucide-react"

export function SellForMeTwoPrices() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">Every Car Has Two Prices</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            The gap between them pays middlemen — not you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border bg-muted/30 p-8 lg:p-10 shadow-lg">
            <div className="flex h-16 sm:h-20 rounded-xl overflow-hidden shadow-inner">
              <div
                className="flex items-center justify-center bg-foreground/80 text-white font-bold text-sm sm:text-lg px-2"
                style={{ width: "82%" }}
              >
                Part-Ex £16,366
              </div>
              <div className="flex-1 flex items-center justify-center bg-primary text-white font-bold text-sm sm:text-lg px-2">
                +£3,491
              </div>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mt-3 px-1">
              <span>Trade price</span>
              <span>Retail price: £19,857</span>
            </div>

            <div className="mt-8 pt-8 border-t flex items-center justify-center gap-3 text-center">
              <ArrowRight className="w-6 h-6 text-primary flex-shrink-0 hidden sm:block" />
              <p className="text-muted-foreground max-w-xl">
                That purple slice is dealership overheads, auction fees, or a buying company&apos;s margin —
                <span className="font-semibold text-foreground"> Market &amp; Sell puts it back in your pocket.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
