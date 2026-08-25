"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Cog, Car, type LucideIcon,
  Droplet, Thermometer, Cable, BatteryCharging, BatteryFull, Zap, Wind, Settings2, Droplets,
  RotateCw, Link, Waves, ArrowUpDown, CircleDot, Cylinder, Compass, Disc, Disc2,
  ParkingCircle, ScanLine, Gauge, CircleStop, Navigation, Volume2,
  Palette, SprayCan, ShieldAlert, Lightbulb, CarFront, DoorOpen,
  TriangleAlert, Radio, ShieldCheck,
} from "lucide-react"

// lucide-react has no car-seat icon (Sofa/Armchair read as living-room furniture), so this is a small
// custom outline icon built to match lucide's own visual weight (24x24, currentColor, rounded strokes).
function CarSeatIcon({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 3h6a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V5a2 2 0 0 1 1-2Z" />
      <path d="M6 17v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2" />
      <path d="M6 17h12" />
    </svg>
  )
}

type CategoryKey = "mechanical" | "body" | "interior"

interface ChecklistItem {
  label: string
  icon: LucideIcon
}

interface Category {
  label: string
  icon: LucideIcon
  items: ChecklistItem[]
}

const categories: Record<CategoryKey, Category> = {
  mechanical: {
    label: "Mechanical",
    icon: Cog,
    items: [
      { label: "Oil condition & level", icon: Droplet },
      { label: "Coolant condition & level", icon: Thermometer },
      { label: "Drive belts & hoses", icon: Cable },
      { label: "Battery condition & charging system", icon: BatteryCharging },
      { label: "EV & hybrid traction battery health check", icon: BatteryFull },
      { label: "Alternator output", icon: Zap },
      { label: "Exhaust system & emissions", icon: Wind },
      { label: "Engine & gearbox mounts", icon: Settings2 },
      { label: "Fluid leaks — oil, coolant, power steering, transmission", icon: Droplets },
      { label: "CV joints & driveshafts", icon: RotateCw },
      { label: "Timing chain/belt noise check", icon: Link },
      { label: "Front & rear suspension components", icon: Waves },
      { label: "Shock absorbers / struts", icon: ArrowUpDown },
      { label: "Ball joints & tie rod ends", icon: CircleDot },
      { label: "Suspension bushings", icon: Cylinder },
      { label: "Steering rack & power steering", icon: Compass },
      { label: "Brake pads & discs, front and rear", icon: Disc },
      { label: "Brake calipers & lines", icon: Disc2 },
      { label: "Handbrake operation", icon: ParkingCircle },
      { label: "OBD fault code scan — stored and cleared history", icon: ScanLine },
      { label: "Engine performance under load", icon: Gauge },
      { label: "Gearbox / clutch operation", icon: Cog },
      { label: "Braking response", icon: CircleStop },
      { label: "Steering & handling", icon: Navigation },
      { label: "Noise, vibration & harshness check", icon: Volume2 },
    ],
  },
  body: {
    label: "Body & Chassis",
    icon: Car,
    items: [
      { label: "Paint condition & panel gaps", icon: Palette },
      { label: "Evidence of accident repair or respray", icon: SprayCan },
      { label: "Rust & corrosion check", icon: ShieldAlert },
      { label: "All lights — head, tail, fog, indicators, reverse, number plate", icon: Lightbulb },
      { label: "Glass & windscreen condition", icon: CarFront },
      { label: "Doors, boot & bonnet operation", icon: DoorOpen },
      { label: "Wheels & tyre condition, including tread depth", icon: Disc },
    ],
  },
  interior: {
    label: "Interior",
    icon: CarSeatIcon,
    items: [
      { label: "Dashboard warning lights", icon: TriangleAlert },
      { label: "Electric windows & mirrors", icon: ArrowUpDown },
      { label: "Air conditioning & heating", icon: Zap },
      { label: "Infotainment & electrics", icon: Radio },
      { label: "Seatbelts", icon: ShieldCheck },
      { label: "Horn, wipers & washers", icon: Volume2 },
      { label: "General interior condition & wear", icon: CarSeatIcon },
    ],
  },
}

const order: CategoryKey[] = ["mechanical", "body", "interior"]

export function InspectionsWhatWeInspect() {
  const [active, setActive] = useState<CategoryKey>("mechanical")
  const current = categories[active]

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-4xl lg:text-6xl font-bold">What We Inspect</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Tap a category below to see exactly what's covered in every inspection.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-6">
          <div className="relative aspect-[1600/629] rounded-2xl overflow-hidden bg-muted/30">
            <Image
              src="/images/inspection-car.jpg"
              alt="Example vehicle"
              fill
              className="object-contain p-2"
              sizes="(min-width: 1024px) 768px, 95vw"
              priority
            />
          </div>
        </div>

        <div className="flex items-start justify-center gap-10 sm:gap-20 mb-14">
          {order.map((key) => {
            const category = categories[key]
            const isActive = key === active
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className="group flex flex-col items-center"
              >
                <category.icon
                  strokeWidth={1.25}
                  className={`w-12 h-12 sm:w-14 sm:h-14 mb-3 transition-all duration-200 ${
                    isActive ? "text-primary scale-110" : "text-muted-foreground/40 group-hover:text-muted-foreground"
                  }`}
                />
                <div className={`w-px h-6 transition-colors duration-200 ${isActive ? "bg-primary" : "bg-border"}`} />
                <span
                  className={`mt-0 px-5 py-2 rounded-lg border text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                      : "bg-muted/30 text-muted-foreground border-border group-hover:border-muted-foreground/30 group-hover:text-foreground"
                  }`}
                >
                  {category.label}
                </span>
              </button>
            )
          })}
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-primary rounded-xl px-6 py-4 mb-6 flex items-center justify-between shadow-lg shadow-primary/20">
            <h3 className="text-white font-bold text-base md:text-lg">
              Key points covered in our {current.label} inspection
            </h3>
            <span className="text-white/80 text-sm font-medium flex-shrink-0 ml-4">
              {current.items.length} checks
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {current.items.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3.5 p-4 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
                  <item.icon strokeWidth={1.75} className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground leading-snug">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground max-w-xl mx-auto mt-10">
          Every inspection also includes a full outstanding finance, write-off, stolen and mileage history check.
        </p>
      </div>
    </section>
  )
}
