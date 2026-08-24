"use client"

import { ScanSearch, ShieldCheck, MapPin, FileWarning } from "lucide-react"

const points = [
  {
    icon: ScanSearch,
    title: "The same checks we use on our own stock",
    description:
      "Every car we buy gets an OBD scan, a test drive, and a check on when fault codes were last cleared. Your inspection gets exactly the same treatment.",
  },
  {
    icon: ShieldCheck,
    title: "Independent — not the seller, not on commission",
    description: "We report what we find, good or bad. We've got no stake in whether the sale goes ahead.",
  },
  {
    icon: MapPin,
    title: "Local and hands-on",
    description: "Based in Waltham Abbey, covering Epping, Essex, and all of Greater London — we come to the car.",
  },
  {
    icon: FileWarning,
    title: "No surprises after you've paid",
    description: "You get the full report and talk it through with us before any money changes hands.",
  },
]

export function InspectionsWhyUs() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">Why Get It Inspected By Us</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We buy and inspect cars every day — this is just us doing the same job for you
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {points.map((point) => (
            <div
              key={point.title}
              className="flex items-start gap-4 p-6 rounded-xl bg-white border border-border hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <point.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{point.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
