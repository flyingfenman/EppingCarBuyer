import type { CSSProperties } from "react"
import Link from "next/link"
import { ArrowRight, Info } from "lucide-react"

type CheckItem = {
  title: string
  x: number
  y: number
}

type CheckGroup = {
  title: string
  subtitle: string
  items: CheckItem[]
}

const ICON_SPRITE = "data:image/webp;base64,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"

const GROUPS: CheckGroup[] = [
  {
    title: "Mechanical",
    subtitle: "Key mechanical and running-condition checks",
    items: [
      { title: "Battery", x: 0, y: 0 },
      { title: "Engine & transmission leaks and faults", x: 20, y: 0 },
      { title: "Brake pad and rotor condition", x: 40, y: 0 },
      { title: "Power steering", x: 60, y: 0 },
      { title: "Tyre condition", x: 80, y: 0 },
      { title: "Suspension", x: 100, y: 0 },
    ],
  },
  {
    title: "Exterior",
    subtitle: "Bodywork, lighting and exterior-condition checks",
    items: [
      { title: "Major body repairs", x: 0, y: 50 },
      { title: "Headlights", x: 20, y: 50 },
      { title: "Tail lights", x: 40, y: 50 },
      { title: "Paint depth testing to all panels", x: 60, y: 50 },
      { title: "Door operations", x: 80, y: 50 },
      { title: "Scratches and Dints", x: 100, y: 50 },
    ],
  },
  {
    title: "Interior",
    subtitle: "Controls, safety equipment and cabin checks",
    items: [
      { title: "Dash board condition", x: 0, y: 100 },
      { title: "Seat belts", x: 20, y: 100 },
      { title: "Electric windows", x: 40, y: 100 },
      { title: "A/C operation", x: 60, y: 100 },
      { title: "Heater operation", x: 80, y: 100 },
      { title: "Exterior mirrors", x: 100, y: 100 },
    ],
  },
]

function InspectionIcon({ item }: { item: CheckItem }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <span
        aria-hidden="true"
        className="h-20 w-20 shrink-0 rounded-2xl bg-no-repeat sm:h-[88px] sm:w-[88px]"
        style={{
          backgroundImage: "var(--inspection-icon-sprite)",
          backgroundSize: "600% 300%",
          backgroundPosition: `${item.x}% ${item.y}%`,
        }}
      />
      <p className="text-[1.05rem] font-bold leading-[1.2] text-foreground sm:text-lg">{item.title}</p>
    </div>
  )
}

export function WhatWeCheck() {
  return (
    <section
      className="border-t bg-white py-12 sm:py-16"
      style={{ "--inspection-icon-sprite": `url("${ICON_SPRITE}")` } as CSSProperties}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">What we check</p>
          <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl lg:text-5xl">Bumper to bumper, and underneath</h2>
          <p className="mt-4 text-lg text-muted-foreground">260 points, adapted to petrol, diesel, hybrid and electric cars.</p>
        </div>

        <div className="mx-auto mt-9 max-w-7xl">
          <p className="mb-3 text-center text-sm font-semibold text-muted-foreground md:hidden">
            Swipe left or right: Mechanical · Exterior · Interior
          </p>

          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0">
            {GROUPS.map((group) => (
              <article
                key={group.title}
                className="min-w-[88%] snap-center rounded-3xl border border-border bg-white p-5 shadow-sm sm:min-w-[76%] md:min-w-0 md:p-6"
              >
                <div className="border-b border-border pb-4">
                  <h3 className="text-2xl font-bold text-primary">{group.title}</h3>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">{group.subtitle}</p>
                </div>

                <div className="mt-5 space-y-4 sm:space-y-5">
                  {group.items.map((item) => (
                    <InspectionIcon key={item.title} item={item} />
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div aria-hidden="true" className="mt-1 flex justify-center gap-2 md:hidden">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="h-2 w-2 rounded-full bg-primary/25" />
            <span className="h-2 w-2 rounded-full bg-primary/25" />
          </div>
        </div>

        <div className="mx-auto mt-7 flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            These are examples from the full inspection. Checks are adapted to the car and the parts we can reach.
          </p>
          <Link href="/vehicle-inspections/what-we-inspect" className="inline-flex min-h-11 shrink-0 items-center font-bold text-primary hover:underline">
            See all 260 points <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
