"use client"

import Link from "next/link"
import { Check, ArrowRight, Clock, ListChecks, BatteryCharging, BadgeCheck } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const packages = [
  {
    name: "Standard Inspection",
    price: "£149.99",
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
    price: "£199.99",
    pointCheck: "140-Point Check",
    duration: "70–90 minutes on site",
    description: "Everything in Standard, plus a deeper bodywork and vehicle-history assessment for extra peace of mind.",
    popular: true,
    features: [
      "Everything in the Standard Inspection",
      "Paint depth readings to help identify previous repairs and resprays",
      "Full video walkaround — interior, exterior, and engine running",
      "Full vehicle history — keepers, service records, import/export status",
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
            Clear pricing, independent advice and a same-day digital report.
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
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-8 rounded-2xl border-2 border-primary/20 bg-primary/5 p-5 sm:p-7">
          <div className="flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BatteryCharging className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold text-foreground">EV Battery State of Health Report</h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white border border-primary/20 px-2.5 py-1 text-xs font-bold text-primary">
                    <BadgeCheck className="w-3.5 h-3.5" /> CARA Approved® Autel Test
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
                  Add a high-voltage traction battery SOH assessment and separate battery health report to either inspection on a compatible fully electric vehicle.
                </p>
                <Link href="/ev-battery-health-check" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline mt-2">
                  What the EV battery check includes <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="sm:text-right flex-shrink-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Optional add-on</p>
              <p className="text-3xl font-bold text-foreground">+£49.99</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
