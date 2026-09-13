"use client"

import { Activity, CalendarCheck, Camera, CreditCard, Handshake, MessageCircle, Shield, Truck } from "lucide-react"

const features = [
  { icon: Activity, title: "Vehicle inspection" },
  { icon: Camera, title: "Professional marketing" },
  { icon: MessageCircle, title: "Enquiries handled" },
  { icon: CalendarCheck, title: "Viewings managed" },
  { icon: Handshake, title: "Negotiation handled" },
  { icon: CreditCard, title: "Buyer finance options" },
  { icon: Shield, title: "Warranty option" },
  { icon: Truck, title: "Delivery arranged" },
]

export function SellForMeWhatsIncluded() {
  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">We handle the hard part</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Everything needed to make your car easier to buy</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            A more professional buying experience helps your car compete for stronger money without you becoming the salesperson.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            {features.map((feature) => (
              <div key={feature.title} className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/25 px-3.5 py-2 text-sm font-semibold text-foreground">
                <feature.icon className="h-4 w-4 text-primary" />
                {feature.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
