"use client"

import { useState } from "react"
import { Cog, Car, Sofa, Check, ImageIcon, type LucideIcon } from "lucide-react"

type CategoryKey = "mechanical" | "body" | "interior"

interface Category {
  label: string
  icon: LucideIcon
  items: string[]
}

const categories: Record<CategoryKey, Category> = {
  mechanical: {
    label: "Mechanical",
    icon: Cog,
    items: [
      "Oil condition & level",
      "Coolant condition & level",
      "Drive belts & hoses",
      "Battery condition & charging system",
      "Alternator output",
      "Exhaust system & emissions",
      "Engine & gearbox mounts",
      "Fluid leaks — oil, coolant, power steering, transmission",
      "CV joints & driveshafts",
      "Timing chain/belt noise check",
      "Front & rear suspension components",
      "Shock absorbers / struts",
      "Ball joints & tie rod ends",
      "Suspension bushings",
      "Steering rack & power steering",
      "Brake pads & discs, front and rear",
      "Brake calipers & lines",
      "Handbrake operation",
      "OBD fault code scan — stored and cleared history",
      "Engine performance under load",
      "Gearbox / clutch operation",
      "Braking response",
      "Steering & handling",
      "Noise, vibration & harshness check",
    ],
  },
  body: {
    label: "Body & Chassis",
    icon: Car,
    items: [
      "Paint condition & panel gaps",
      "Evidence of accident repair or respray",
      "Rust & corrosion check",
      "All lights — head, tail, fog, indicators, reverse, number plate",
      "Glass & windscreen condition",
      "Doors, boot & bonnet operation",
      "Wheels & tyre condition, including tread depth",
    ],
  },
  interior: {
    label: "Interior",
    icon: Sofa,
    items: [
      "Dashboard warning lights",
      "Electric windows & mirrors",
      "Air conditioning & heating",
      "Infotainment & electrics",
      "Seatbelts",
      "Horn, wipers & washers",
      "General interior condition & wear",
    ],
  },
}

const order: CategoryKey[] = ["mechanical", "body", "interior"]

export function InspectionsWhatWeInspect() {
  const [active, setActive] = useState<CategoryKey>("mechanical")
  const current = categories[active]

  return (
    <section className="bg-gray-950 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-4xl lg:text-6xl font-bold text-white">What We Inspect</h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto">
            Tap a category below to see exactly what's covered in every inspection.
          </p>
        </div>

        <div className="max-w-lg mx-auto mb-10">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center gap-2">
            <ImageIcon className="w-8 h-8 text-white/30" />
            <p className="text-sm text-white/40">Car photo goes here</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {order.map((key) => {
            const category = categories[key]
            const isActive = key === active
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 border ${
                  isActive
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                    : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                <category.icon className="w-5 h-5" />
                {category.label}
              </button>
            )
          })}
        </div>

        <div className="max-w-2xl mx-auto bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-white">{current.label} checks</h3>
            <span className="text-sm text-white/50">{current.items.length} checks</span>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
            {current.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-white/90">
                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-center text-sm text-white/50 max-w-xl mx-auto mt-8">
          Every inspection also includes a full outstanding finance, write-off, stolen and mileage history check.
        </p>
      </div>
    </section>
  )
}
