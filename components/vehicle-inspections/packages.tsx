"use client"

import Link from "next/link"
import { Check, FileText, ArrowRight, Clock, ListChecks } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const packages = [
  {
    name: "Standard Inspection",
    price: "£130",
    pointCheck: "90-Point Check",
    duration: "40–60 minutes on site",
    description: "A thorough mechanical and visual check, plus the history check that matters most.",
    features: [
      "Full visual condition check — exterior, interior, engine bay, underbody, tyres",
      "OBD diagnostic scan, including stored and recently cleared fault codes",
      "Road test to assess how the car actually drives",
      "Outstanding finance, write-off, stolen and mileage history check",
      "Photo report covering all key areas",
      "Personal phone call to talk through what we found",
      "Digital report sent the same day",
    ],
  },
  {
    name: "Premium Inspection",
    price: "£180",
    pointCheck: "140-Point Check",
    duration: "70–90 minutes on site",
    description: "Everything in Standard, plus a deeper look at bodywork and history for extra peace of mind.",
    popular: true,
    features: [
      "Everything in the Standard Inspection",
      "EV & hybrid battery health check, where applicable",
      "Full video walkaround — interior, exterior, and engine running",
      "Paint depth readings across every panel, to flag a respray or accident repair you can't see with the eye",
      "Full vehicle history report — previous keepers, previous sale information, service history cross-check, import/export status",
      "Priority booking — inspected within 24–48 hours",
    ],
  },
]

export function InspectionsPackages() {
  return (
    <section id="packages" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Packages &amp; Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            One flat fee. No hidden extras. Pay only for the inspection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                pkg.popular ? "border-2 border-primary shadow-lg" : "border shadow-md"
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-bl-lg">
                  Most thorough
                </div>
              )}
              <CardHeader className="text-center pb-2 pt-8">
                <p className="text-lg font-semibold text-muted-foreground">{pkg.name}</p>
                <p className="text-5xl font-bold text-foreground mt-2">{pkg.price}</p>
                <p className="text-sm text-muted-foreground mt-1">per inspection</p>
                <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full">
                  <ListChecks className="w-4 h-4" />
                  {pkg.pointCheck}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">{pkg.description}</p>
                <div className="flex items-center justify-center gap-1.5 text-sm font-medium text-primary">
                  <Clock className="w-4 h-4" />
                  {pkg.duration}
                </div>
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8 lg:mt-10">
          <Link
            href="/vehicle-inspections/sample-report"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <FileText className="w-4 h-4" />
            See a sample report
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
