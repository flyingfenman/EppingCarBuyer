"use client"

import { ArrowRight } from "lucide-react"

export function SellForMeTwoPrices() {
  return (
    <section className="bg-white pb-6 sm:pb-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl rounded-2xl border border-primary/15 bg-primary/5 px-4 py-4 sm:px-6">
          <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-6">
            <div className="text-center md:text-left">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Example trade-style offer</p>
              <p className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">£16,366</p>
            </div>

            <div className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-primary shadow-sm">
              <ArrowRight className="hidden h-5 w-5 sm:block" />
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-wide">Value gap</p>
                <p className="text-2xl font-black">£3,491</p>
              </div>
              <ArrowRight className="h-5 w-5" />
            </div>

            <div className="text-center md:text-right">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Example retail value</p>
              <p className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">£19,857</p>
            </div>
          </div>

          <p className="mt-3 text-center text-sm text-muted-foreground">
            <span className="font-bold text-foreground">That gap is why Market &amp; Sell exists.</span> We help you keep more of the car&apos;s value instead of giving it away for convenience.
          </p>
        </div>
      </div>
    </section>
  )
}
