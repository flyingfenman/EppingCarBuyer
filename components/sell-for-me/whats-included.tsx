"use client"

import { Camera, Activity, MessageCircle, CalendarCheck, Handshake, Shield, CreditCard } from "lucide-react"

const features = [
  {
    icon: Camera,
    title: "Professional photos and listing",
    description: "High-quality images that make your car stand out",
  },
  {
    icon: Activity,
    title: "OBD diagnostic scan",
    description: "Full health check to give buyers confidence",
  },
  {
    icon: MessageCircle,
    title: "All enquiries handled",
    description: "We respond to every message so you don&apos;t have to",
  },
  {
    icon: CalendarCheck,
    title: "Viewings managed",
    description: "We arrange and attend viewings on your behalf",
  },
  {
    icon: Handshake,
    title: "Negotiation on your behalf",
    description: "We handle the back-and-forth to get you the best price",
  },
  {
    icon: Shield,
    title: "Optional Hander Protect warranty",
    description: "Offer the buyer a warranty to sweeten the deal",
  },
  {
    icon: CreditCard,
    title: "Optional buyer finance arranged",
    description: "Help buyers purchase with finance options",
  },
]

export function SellForMeWhatsIncluded() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">What&apos;s Included</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to sell your car without the hassle
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-4 p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
