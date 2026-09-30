import Link from "next/link"
import {
  Armchair,
  ArrowRight,
  BatteryCharging,
  CarFront,
  CircleDot,
  Cog,
  Disc3,
  Droplets,
  FileSearch,
  Info,
  Route,
  ScanLine,
  SprayCan,
  Wrench,
  type LucideIcon,
} from "lucide-react"

const AREAS: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: FileSearch, title: "History check", text: "Finance, write-off, stolen and mileage" },
  { icon: ScanLine, title: "Diagnostic scan", text: "Fault codes across the car's systems" },
  { icon: Droplets, title: "Engine and fluids", text: "Leaks, levels, noises and warning signs" },
  { icon: Cog, title: "Gearbox and drivetrain", text: "How it shifts, drives and pulls away" },
  { icon: Disc3, title: "Brakes", text: "Visible discs and pads, and how it stops" },
  { icon: Wrench, title: "Steering and suspension", text: "Play, knocks and how it handles" },
  { icon: CircleDot, title: "Wheels and tyres", text: "Tread, condition and damage, all four" },
  { icon: SprayCan, title: "Bodywork and paint", text: "Panel by panel; paint readings with Premium" },
  { icon: Armchair, title: "Interior and equipment", text: "Controls, safety kit and features" },
  { icon: CarFront, title: "Underbody", text: "Corrosion, damage and leaks where accessible" },
  { icon: Route, title: "Road test", text: "How it drives on the road" },
  { icon: BatteryCharging, title: "Electric and hybrid", text: "High-voltage, charging and battery faults" },
]

// The areas every inspection covers, as a grid of icons, with a link to the full checklist.
export function WhatWeCheck() {
  return (
    <section className="border-t bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">What we check</p>
          <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl lg:text-5xl">Bumper to bumper, and underneath</h2>
          <p className="mt-4 text-lg text-muted-foreground">260 points, adapted to petrol, diesel, hybrid and electric cars.</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {AREAS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-3 font-bold leading-snug">{title}</h3>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-6 flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            Checks are adapted to the car and the parts we can reach. Searches depend on the records available.
          </p>
          <Link href="/vehicle-inspections/what-we-inspect" className="inline-flex min-h-11 shrink-0 items-center font-bold text-primary hover:underline">
            See all 260 points <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
