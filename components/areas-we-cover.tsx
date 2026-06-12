"use client"

import { MapPin, CheckCircle } from "lucide-react"
import { useState } from "react"

const areas = [
  "Boston",
  "Grantham",
  "Bourne",
  "Huntingdon",
  "Kettering",
  "Melton Mowbray",
  "Spalding",
  "Stamford",
  "Corby",
  "Wellingborough",
  "Peterborough",
]

export function AreasWeCover() {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null)

  return (
    <section id="areas" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-semibold text-primary">Service Coverage</span>
            </div>
            <h2 className="text-5xl font-bold leading-tight">
              Where Do We <span className="text-primary">Cover?</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We serve customers across the East Midlands and surrounding areas. Professional car buying service within
              a 50-mile radius of Stamford.
            </p>
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-4xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Miles Coverage</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">11</div>
                <div className="text-sm text-muted-foreground">Major Areas</div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-right">
            <p className="mb-6 text-muted-foreground">This includes but isn&apos;t limited to:</p>
            <ul className="grid grid-cols-2 gap-3">
              {areas.map((area, index) => (
                <li
                  key={area}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                    hoveredArea === area ? "bg-primary/10 scale-105 shadow-md" : "bg-muted/30 hover:bg-muted/50"
                  }`}
                  onMouseEnter={() => setHoveredArea(area)}
                  onMouseLeave={() => setHoveredArea(null)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`transition-all duration-300 ${hoveredArea === area ? "scale-110" : "scale-100"}`}>
                    <CheckCircle className={`w-5 h-5 ${hoveredArea === area ? "text-primary" : "text-primary/60"}`} />
                  </div>
                  <span className={`font-medium ${hoveredArea === area ? "text-primary" : ""}`}>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
