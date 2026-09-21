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
    description: "An in-depth mechanical and condition inspection covering the relevant engine and drivetrain, brakes, steering, suspension and diagnostics, with a clear video review, documented findings and personal buying guidance. Tailored to petrol, diesel, hybrid or electric vehicles.",
    features: [
      "Full visual condition check — exterior, interior, underbody, tyres and relevant powertrain areas",
      "Full-system diagnostic scan, including stored faults and warning history where available",
      "Powertrain-specific checks — engine/gearbox systems on petrol, diesel and hybrid vehicles; high-voltage, charging and electric drivetrain checks on EVs and hybrids where supported",
      "Road test to assess braking, steering, handling, noises and how the vehicle actually drives",
      "Outstanding finance, write-off, stolen and mileage history check",
      "Easy-to-understand video review explaining the vehicle's condition and key findings",
      "Photo evidence and written findings recording issues observed during the inspection",
      "Personal phone call covering concerns, priorities and questions to raise before buying",
      "Same-day mechanical and condition report with findings and priorities",
    ],
  },
  {
    name: "Premium Inspection",
    price: "£199.99",
    pointCheck: "260-Point Check",
    duration: "70–90 minutes on site",
    description: "Everything in Standard, including the video review, evidence and buying guidance, plus a 260-point assessment with paint-depth checks, deeper body and condition assessment, extended road test, repair-cost guidance and additional research into the vehicle's history and seller.",
    popular: true,
    features: [
      "Everything in the Standard Inspection",
      "260 defined inspection points across bodywork, paint, mechanical systems, diagnostics, underbody, interior and road test",\n      "Paint-depth assessment on suitable accessible painted panels",\n      "Repair-cost guidance and prioritised action plan",
      "Extended road test where safe and permitted",
      "Search available auction, salvage and previous advert records, including Copart where available",
      "Checks for indicators of undisclosed motor trading",
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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Both packages include a clear video review, photo evidence, a same-day digital report and a personal call. Understand the findings, make an informed purchase decision and keep a record of the issues observed.
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
                  EV-specific diagnostic and condition checks are already part of the main inspection. For compatible fully electric vehicles, add the dedicated high-voltage traction battery SOH assessment and separate customer battery-health report for a deeper look at battery condition.
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
