"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, MapPin } from "lucide-react"

export function InspectionsHero() {
  const scrollToPackages = () => {
    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative bg-white py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary">
            Independent pre-purchase inspections
          </div>

          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-balance">
            Buying a Used Car?
            <br />
            <span className="text-primary">Know Before You Buy.</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            We&apos;ll inspect any car, anywhere it&apos;s being sold, before you hand over a penny. Full visual
            check, diagnostic scan and road test — the same checks we run before we buy a car ourselves. Petrol,
            diesel, hybrid or electric — including EV battery health checks.
          </p>

          <Button
            onClick={scrollToPackages}
            size="lg"
            className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 transition-colors duration-200 group"
          >
            See Packages &amp; Prices
            <ArrowDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform duration-200" />
          </Button>

          <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            Covering Essex, Hertfordshire, Cambridgeshire &amp; Greater London
          </p>
        </div>
      </div>
    </section>
  )
}
