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
    description: "Our inspector attends wherever it's being sold — across Essex, Hertfordshire, South Cambridgeshire, Greater London, and parts of Bedfordshire and Suffolk.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Full inspection on the spot",
    description: "We assess the vehicle, scan its systems, road test it where permitted and investigate concerns using the findings and history.",
  },
  {
    number: "04",
    icon: FileCheck2,
    title: "Understand before you decide",
    description: "Both packages include a clear video review, photo evidence, a same-day report and a personal call to guide your decision. Keep the findings for future reference.",
  },
]

export function InspectionsHowItWorks() {
  return (
    <section id="how-it-works" className="py-8 sm:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 sm:mb-12 lg:mb-16 space-y-2 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">How It Works</h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to buying with confidence
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 max-w-6xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative aspect-square sm:aspect-auto bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute -top-3 sm:-top-4 left-3 sm:left-8 px-2.5 sm:px-3 py-0.5 sm:py-1 bg-primary text-white text-xs sm:text-sm font-bold rounded-full">
                {step.number}
              </div>
              <div className="mt-2 sm:mt-4 h-full flex flex-col gap-2.5 sm:gap-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <step.icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
                </div>
                <h3 className="text-sm leading-tight sm:text-xl sm:leading-normal font-bold">{step.title}</h3>
                <p className="hidden sm:block text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
