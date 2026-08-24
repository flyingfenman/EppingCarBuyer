"use client"

import { Check, Wrench, CircleGauge, Car, Sofa, ScanSearch, FileCheck2 } from "lucide-react"

const categories = [
  {
    icon: Wrench,
    name: "Engine & Mechanical",
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
    ],
  },
  {
    icon: CircleGauge,
    name: "Suspension, Steering & Brakes",
    items: [
      "Front & rear suspension components",
      "Shock absorbers / struts",
      "Ball joints & tie rod ends",
      "Suspension bushings",
      "Steering rack & power steering",
      "Brake pads & discs, front and rear",
      "Brake calipers & lines",
      "Handbrake operation",
    ],
  },
  {
    icon: Car,
    name: "Exterior & Bodywork",
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
  {
    icon: Sofa,
    name: "Interior & Electrics",
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
  {
    icon: ScanSearch,
    name: "Diagnostic & Road Test",
    items: [
      "OBD fault code scan — stored and cleared history",
      "Engine performance under load",
      "Gearbox / clutch operation",
      "Braking response",
      "Steering & handling",
      "Noise, vibration & harshness check",
    ],
  },
  {
    icon: FileCheck2,
    name: "History & Paperwork",
    items: [
      "Outstanding finance check",
      "Write-off / insurance history",
      "Stolen vehicle check",
      "Mileage & odometer consistency check",
    ],
  },
]

const totalItems = categories.reduce((sum, category) => sum + category.items.length, 0)

export function InspectionsWhatWeCheck() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">What We Actually Check</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Not a quick glance around the car — a proper mechanical and visual inspection, covering everything below.
          </p>
        </div>

        <p className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary">
            {totalItems}+ individual check points across {categories.length} areas of the car
          </span>
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-muted/30 rounded-2xl p-6 border border-border hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">{category.name}</h3>
              </div>
              <ul className="space-y-2.5">
                {category.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto mt-10">
          Every check above is included in the Standard Inspection. Premium adds a full video walkaround, paint
          depth readings, and a fuller vehicle history report — see{" "}
          <a href="#packages" className="text-primary font-medium hover:underline">
            packages &amp; pricing
          </a>
          .
        </p>
      </div>
    </section>
  )
}
