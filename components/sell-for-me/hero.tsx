"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Check } from "lucide-react"
import { SellForMeTopVehicleForm } from "@/components/sell-for-me/top-vehicle-form"

const SELLING_BENEFITS = [
  "Inspection included",
  "Professional marketing",
  "Finance options for buyers",
  "Warranty option",
  "Delivery arranged",
]

export function SellForMeHero() {
  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-12">
          <div className="pt-2 lg:pt-10">
            <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Dealer-style selling. More of the value stays with you.
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-balance sm:text-5xl lg:text-6xl">
              Sell Your Car For More,{" "}
              <br />
              <span className="text-primary">Without the Hassle</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Don&apos;t give away the gap between trade and retail just for convenience. We inspect, market and sell your car professionally so you can keep more of its value.
            </p>

            <div className="mt-6 flex max-w-xl flex-wrap gap-2">
              {SELLING_BENEFITS.map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-foreground sm:text-sm">
                  <Check className="h-3.5 w-3.5 text-primary" /> {item}
                </span>
              ))}
            </div>

            <div className="mt-6 max-w-xl rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3">
              <p className="font-bold text-foreground">Your job? Keep the car clean and make it available.</p>
              <p className="mt-1 text-sm text-muted-foreground">We handle the selling. No upfront cost. No sale, no fee.</p>
            </div>

            <Button
              onClick={scrollToHowItWorks}
              size="lg"
              variant="outline"
              className="mt-7 h-12 px-6 font-semibold"
            >
              See how it works
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <SellForMeTopVehicleForm />
        </div>
      </div>
    </section>
  )
}
