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
