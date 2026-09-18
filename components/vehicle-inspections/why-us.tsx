"use client"

import { ScanSearch, ShieldCheck, Video, FileWarning } from "lucide-react"

const points = [
  {
    icon: ScanSearch,
    title: "A detailed look at the car",
    description:
      "We bring together the physical inspection, diagnostic findings, road test and vehicle history to investigate concerns and explain their significance for your purchase.",
  },
  {
    icon: ShieldCheck,
    title: "Guidance for your buying decision",
    description: "Talk through the positives, concerns and priorities with us. We help you decide what to ask, whether to request repairs and what findings may support a price discussion.",
  },
  {
    icon: Video,
    title: "A video you can understand",
    description: "Both Standard and Premium include a video review explaining the vehicle's condition and key findings in plain English, alongside your written report and personal call.",
  },
  {
    icon: FileWarning,
    title: "Evidence you can refer back to",
    description: "Keep the video, photos and written findings as a record of issues observed during the inspection. They can help you explain a later concern to the seller or a repairer.",
  },
]

export function InspectionsWhyUs() {
  return (
    <section className="py-8 sm:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 sm:mb-12 lg:mb-16 space-y-2 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Why Get It Inspected By Us</h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Understand the vehicle, get guidance before you commit and keep a clear record of what we found.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 sm:gap-6 max-w-4xl mx-auto">
          {points.map((point) => (
            <div
              key={point.title}
              className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl bg-white border border-border hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <point.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-sm leading-tight sm:text-base sm:leading-normal font-semibold text-foreground sm:mb-1">{point.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
