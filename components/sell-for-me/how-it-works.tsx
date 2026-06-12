"use client"

import { ClipboardCheck, Megaphone, UserCheck, Banknote } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "We inspect your car",
    description: "We visit you, run an OBD health scan, take professional photos, and shoot a walkaround video.",
  },
  {
    number: "02",
    icon: Megaphone,
    title: "We advertise it everywhere",
    description: "We list your car across Facebook Marketplace and other platforms, handling all enquiries and negotiations.",
  },
  {
    number: "03",
    icon: UserCheck,
    title: "Serious buyers only",
    description: "We filter out the time-wasters so you don&apos;t have to deal with no-shows and lowballers.",
  },
  {
    number: "04",
    icon: Banknote,
    title: "You get paid",
    description: "Car sells, buyer pays you directly, and we invoice you our fee. Simple.",
  },
]

export function SellForMeHowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to getting more for your car
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute -top-4 left-8 px-3 py-1 bg-primary text-white text-sm font-bold rounded-full">
                {step.number}
              </div>
              <div className="mt-4 space-y-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
