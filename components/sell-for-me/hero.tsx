"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export function SellForMeHero() {
  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative bg-white py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary">
            A smarter way to sell
          </div>
          
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-balance">
            Want More Than
            <br />
            <span className="text-primary">We Offered?</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            If our offer isn&apos;t right for you, let us sell your car on your behalf. 
            No upfront cost. No hassle. You only pay us if we sell it.
          </p>

          <Button
            onClick={scrollToHowItWorks}
            size="lg"
            className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 transition-colors duration-200 group"
          >
            Find Out More
            <ArrowDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform duration-200" />
          </Button>
        </div>
      </div>
    </section>
  )
}
