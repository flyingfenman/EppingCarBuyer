"use client"

import Link from "next/link"
import { MapPin, CheckCircle } from "lucide-react"
import { useState } from "react"

const areas = [
  "Greater London",
  "Epping",
  "Loughton",
  "Chigwell",
  "Harlow",
  "Brentwood",
  "Romford",
  "Ilford",
  "Chelmsford",
  "Hertfordshire",
  "Cambridge area",
]

export function AreasWeCover() {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null)

  return (
    <section id="areas" className="relative overflow-hidden px-4 py-12 sm:py-16 lg:py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-1/2 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">Mobile inspection coverage</span>
            </div>
            <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
              We inspect the car <span className="text-primary">where it is.</span>
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              We travel to private sellers, dealerships and vehicle locations across Greater London, Essex, Hertfordshire and surrounding areas. If the car is further away, ask us before booking and we&apos;ll confirm coverage.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Link href="/vehicle-inspection-london" className="rounded-full border border-primary/20 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10">
                Vehicle Inspection London
              </Link>
              <Link href="/pre-purchase-car-inspection-essex" className="rounded-full border border-primary/20 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10">
                Pre-Purchase Inspection Essex
              </Link>
              <Link href="/vehicle-inspection-cambridge" className="rounded-full border border-primary/20 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10">
                Vehicle Inspection Cambridge
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-6 text-muted-foreground">Regular inspection areas include:</p>
            <ul className="grid grid-cols-2 gap-3">
              {areas.map((area) => (
                <li
                  key={area}
                  className={`flex cursor-default items-center gap-3 rounded-lg p-3 transition-all duration-200 ${
                    hoveredArea === area ? "scale-[1.02] bg-primary/10 shadow-sm" : "bg-muted/30"
                  }`}
                  onMouseEnter={() => setHoveredArea(area)}
                  onMouseLeave={() => setHoveredArea(null)}
                >
                  <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                  <span className="font-medium">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
