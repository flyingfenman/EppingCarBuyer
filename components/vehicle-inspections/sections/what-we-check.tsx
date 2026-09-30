import Link from "next/link"
import { ArrowRight } from "lucide-react"

type CheckItem = {
  title: string
  icon: string
}

type CheckGroup = {
  title: string
  subtitle: string
  items: CheckItem[]
}

const GROUPS: CheckGroup[] = [
  {
    title: "Mechanical",
    subtitle: "Mechanical, running gear and under-bonnet checks",
    items: [
      { title: "Battery", icon: "battery" },
      { title: "Fuel system operation", icon: "fuel-system" },
      { title: "CV Joint / boots, drive-shaft and universal joints", icon: "cv-joints" },
      { title: "Ball joint and tie rod ends", icon: "ball-joint" },
      { title: "Coolant recovery tank", icon: "coolant-recovery" },
      { title: "Engine & transmission leaks and faults", icon: "engine-transmission-leaks" },
      { title: "Brake pad and rotor condition", icon: "brake-pad-rotor" },
      { title: "Brake caliper leakage", icon: "brake-caliper" },
      { title: "Power steering", icon: "power-steering" },
      { title: "Engine / transmission mount condition", icon: "engine-transmission-mount" },
      { title: "AC compressor operation", icon: "ac-compressor" },
      { title: "Tyre condition", icon: "tyre-condition" },
      { title: "Suspension", icon: "suspension" },
      { title: "A/C condenser", icon: "ac-condenser" },
      { title: "Bushing condition", icon: "bushing-condition" },
      { title: "Alternator", icon: "alternator" },
      { title: "Engine valve noise", icon: "engine-valve-noise" },
      { title: "Cooling fan operation", icon: "cooling-fan" },
      { title: "Transfer case condition", icon: "transfer-case" },
    ],
  },
  {
    title: "Exterior",
    subtitle: "Bodywork, paint, lighting and exterior equipment",
    items: [
      { title: "Major body repairs", icon: "major-body-repairs" },
      { title: "Reverse Lights", icon: "reverse-lights" },
      { title: "Number plate lights", icon: "number-plate-lights" },
      { title: "Scratches and Dints", icon: "scratches-dints" },
      { title: "Hazard", icon: "hazard" },
      { title: "Headlights", icon: "headlights" },
      { title: "Paint depth testing to all panels", icon: "paint-depth" },
      { title: "Fog Lamp condition and operation", icon: "fog-lamp" },
      { title: "Tail Lights", icon: "tail-lights" },
      { title: "Door operations", icon: "door-operations" },
      { title: "Turn signals operation", icon: "turn-signals" },
    ],
  },
  {
    title: "Interior",
    subtitle: "Cabin condition, controls and safety equipment",
    items: [
      { title: "Interior lights", icon: "interior-lights" },
      { title: "Seat belts", icon: "seat-belts" },
      { title: "Wipers", icon: "wipers" },
      { title: "Horn", icon: "horn" },
      { title: "Exterior mirrors", icon: "exterior-mirrors" },
      { title: "Dash board condition", icon: "dashboard" },
      { title: "A/C operation", icon: "ac-operation" },
      { title: "Heater operation", icon: "heater-operation" },
      { title: "Carpet condition", icon: "carpet-condition" },
      { title: "Steering wheel condition", icon: "steering-wheel" },
      { title: "Air vents", icon: "air-vents" },
      { title: "Electric windows", icon: "electric-windows" },
      { title: "Fuel & temperature gauges", icon: "fuel-temperature-gauges" },
      { title: "Park brake", icon: "park-brake" },
    ],
  },
]

function InspectionIcon({ item }: { item: CheckItem }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
      {/* Individual 140px+ source artwork renders at roughly half-size for crisp HiDPI edges. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/inspection-icons/${item.icon}.png`}
        alt=""
        width={72}
        height={72}
        loading="lazy"
        decoding="async"
        className="h-16 w-16 shrink-0 object-contain sm:h-[72px] sm:w-[72px]"
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

          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 touch-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:block md:overflow-visible md:pb-0">
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

        <div className="mx-auto mt-7 flex max-w-7xl justify-end">
          <Link href="/vehicle-inspections/what-we-inspect" className="inline-flex min-h-11 shrink-0 items-center font-bold text-primary hover:underline">
            See all 260 points <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
