"use client"

import { CalendarCheck, MapPin, ClipboardCheck, FileCheck2 } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Book online or by phone",
    description: "Tell us the registration and where the car is — a dealer forecourt or a private seller's address.",
  },
  {
    number: "02",
    icon: MapPin,
    title: "We come to the car",
    description: "Our inspector attends wherever it's being sold — across Essex, Hertfordshire, Cambridgeshire, Greater London, and parts of Bedfordshire and Suffolk.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Full inspection on the spot",
    description: "Visual condition check, OBD diagnostic scan, road test, and a full history check while we're there.",
  },
  {
    number: "04",
    icon: FileCheck2,
    title: "Report before you commit",
    description: "You get the full findings and a phone call talking you through them — before you hand over any money.",
  },
]

export function InspectionsHowItWorks() {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to buying with confidence
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
