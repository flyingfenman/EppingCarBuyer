"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Check } from "lucide-react"
import { SellForMeTopVehicleForm } from "@/components/sell-for-me/top-vehicle-form"

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
              A smarter way to sell
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-balance sm:text-5xl lg:text-6xl">
              Want More Than
              <br />
              <span className="text-primary">We Offered?</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              If our offer isn&apos;t right for you, let us market and sell your car on your behalf for closer to retail value.
            </p>

            <div className="mt-7 space-y-3">
              {["No upfront cost", "We handle the marketing and enquiries", "You only pay us if we sell it"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-semibold text-foreground sm:text-base">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-4 w-4" />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <Button
              onClick={scrollToHowItWorks}
              size="lg"
              variant="outline"
              className="mt-8 h-12 px-6 font-semibold"
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
