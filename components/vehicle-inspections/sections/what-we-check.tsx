import Link from "next/link"
import { ArrowRight, Info } from "lucide-react"

type CheckItem = {
  title: string
  icon: number
}

type CheckGroup = {
  title: string
  subtitle: string
  items: CheckItem[]
}

const SPRITE_COLS = 8
const SPRITE_ROWS = 6

const GROUPS: CheckGroup[] = [
  {
    title: "Mechanical",
    subtitle: "Mechanical, running gear and under-bonnet checks",
    items: [
      { title: "Battery", icon: 0 },
      { title: "Fuel system operation", icon: 1 },
      { title: "CV Joint / boots, drive-shaft and universal joints", icon: 2 },
      { title: "Ball joint and tie rod ends", icon: 3 },
      { title: "Coolant recovery tank", icon: 5 },
      { title: "Engine & transmission leaks and faults", icon: 6 },
      { title: "Brake pad and rotor condition", icon: 7 },
      { title: "Brake caliper leakage", icon: 8 },
      { title: "Power steering", icon: 9 },
      { title: "Engine / transmission mount condition", icon: 10 },
      { title: "AC compressor operation", icon: 11 },
      { title: "Tyre condition", icon: 12 },
      { title: "Suspension", icon: 13 },
      { title: "A/C condenser", icon: 14 },
      { title: "Bushing condition", icon: 15 },
      { title: "Alternator", icon: 38 },
      { title: "Engine valve noise", icon: 39 },
      { title: "Cooling fan operation", icon: 40 },
      { title: "Transfer case condition", icon: 41 },
    ],
  },
  {
    title: "Exterior",
    subtitle: "Bodywork, paint, lighting and exterior equipment",
    items: [
      { title: "Major body repairs", icon: 16 },
      { title: "Reverse Lights", icon: 17 },
      { title: "Number plate lights", icon: 18 },
      { title: "Scratches and Dints", icon: 19 },
      { title: "Hazard", icon: 20 },
      { title: "Headlights", icon: 21 },
      { title: "Paint depth testing to all panels", icon: 22 },
      { title: "Fog Lamp condition and operation", icon: 23 },
      { title: "Tail Lights", icon: 4 },
      { title: "Door operations", icon: 24 },
      { title: "Turn signals operation", icon: 25 },
    ],
  },
  {
    title: "Interior",
    subtitle: "Cabin condition, controls and safety equipment",
    items: [
      { title: "Interior lights", icon: 26 },
      { title: "Seat belts", icon: 27 },
      { title: "Wipers", icon: 28 },
      { title: "Horn", icon: 29 },
      { title: "Exterior mirrors", icon: 30 },
      { title: "Dash board condition", icon: 31 },
      { title: "A/C operation", icon: 32 },
      { title: "Heater operation", icon: 33 },
      { title: "Carpet condition", icon: 34 },
      { title: "Steering wheel condition", icon: 35 },
      { title: "Air vents", icon: 36 },
      { title: "Electric windows", icon: 37 },
      { title: "Fuel & temperature gauges", icon: 42 },
      { title: "Park brake", icon: 43 },
    ],
  },
]

function InspectionIcon({ item }: { item: CheckItem }) {
  const col = item.icon % SPRITE_COLS
  const row = Math.floor(item.icon / SPRITE_COLS)
  const x = SPRITE_COLS === 1 ? 0 : (col / (SPRITE_COLS - 1)) * 100
  const y = SPRITE_ROWS === 1 ? 0 : (row / (SPRITE_ROWS - 1)) * 100

  return (
    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
      <span
        aria-hidden="true"
        className="h-16 w-16 shrink-0 bg-no-repeat sm:h-[72px] sm:w-[72px]"
        style={{
          backgroundImage: "url('/images/inspection-icons-full.webp')",
          backgroundSize: `${SPRITE_COLS * 100}% ${SPRITE_ROWS * 100}%`,
          backgroundPosition: `${x}% ${y}%`,
        }}
      />
      <p className="min-w-0 text-[13px] font-bold leading-[1.2] text-foreground sm:text-sm">{item.title}</p>
    </div>
  )
}

export function WhatWeCheck() {
  return (
    <section className="border-t bg-white py-12 sm:py-16">
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

          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:block md:overflow-visible md:pb-0">
            {GROUPS.map((group) => (
              <article
                key={group.title}
                className="min-w-[94%] snap-center rounded-3xl border border-border bg-white p-4 shadow-sm sm:min-w-[86%] sm:p-5 md:mb-5 md:min-w-0 md:p-6"
              >
                <div className="border-b border-border pb-4">
                  <h3 className="text-2xl font-bold text-primary">{group.title}</h3>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">{group.subtitle}</p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
                  {group.items.map((item) => (
                    <InspectionIcon key={item.title} item={item} />
                  ))}
                </div>
              </article>
            ))}
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
