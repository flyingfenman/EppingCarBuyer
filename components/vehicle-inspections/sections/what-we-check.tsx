import Link from "next/link"
import { ArrowRight, Info } from "lucide-react"

const ICON_ROOT = "https://www.vehicleinspect.com.au/wp-content/uploads/2024/03"

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
    subtitle: "Key mechanical and running-condition checks",
    items: [
      { title: "Battery", icon: `${ICON_ROOT}/BatteryIcon.webp` },
      { title: "Engine & transmission leaks and faults", icon: `${ICON_ROOT}/Engine-transmission-leaks-and-faultsIcon.webp` },
      { title: "Brake pad and rotor condition", icon: `${ICON_ROOT}/Brake-pad-and-rotor-conditionIcon.webp` },
      { title: "Power steering", icon: `${ICON_ROOT}/Power-steeringIcon.webp` },
      { title: "Tyre condition", icon: `${ICON_ROOT}/Tyre-conditionIcon.webp` },
      { title: "Suspension", icon: `${ICON_ROOT}/SuspensionIcon.webp` },
    ],
  },
  {
    title: "Exterior",
    subtitle: "Bodywork, lighting and exterior-condition checks",
    items: [
      { title: "Major body repairs", icon: `${ICON_ROOT}/Major-body-repairsIcon.webp` },
      { title: "Headlights", icon: `${ICON_ROOT}/HeadLightsIcon.webp` },
      { title: "Tail lights", icon: `${ICON_ROOT}/Tail-LightsIcon.webp` },
      { title: "Paint depth testing to all panels", icon: `${ICON_ROOT}/Paint-depth-testing-to-all-panelsIcon.webp` },
      { title: "Door operations", icon: `${ICON_ROOT}/Door-operationsIcon.webp` },
      { title: "Scratches and Dints", icon: `${ICON_ROOT}/Scratches-and-DintsIcon.webp` },
    ],
  },
  {
    title: "Interior",
    subtitle: "Controls, safety equipment and cabin checks",
    items: [
      { title: "Dash board condition", icon: `${ICON_ROOT}/Dash-board-condition.webp` },
      { title: "Seat belts", icon: `${ICON_ROOT}/Seat-belts.webp` },
      { title: "Electric windows", icon: `${ICON_ROOT}/Electric-windows.webp` },
      { title: "A/C operation", icon: `${ICON_ROOT}/AC-operation.webp` },
      { title: "Heater operation", icon: `${ICON_ROOT}/Heater-operation.webp` },
      { title: "Exterior mirrors", icon: `${ICON_ROOT}/Exterior-mirrors.webp` },
    ],
  },
]

// The icon artwork uses black and red line work. This SVG filter keeps black,
// white and greys unchanged while remapping the red accent to the site's purple.
function PurpleIconFilter() {
  return (
    <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
      <filter id="inspection-icon-purple" colorInterpolationFilters="sRGB">
        <feColorMatrix
          type="matrix"
          values="
            0.338 0.331 0.331 0 0
           -0.037 0.519 0.518 0 0
            0.603 0.199 0.198 0 0
            0     0     0     1 0
          "
        />
      </filter>
    </svg>
  )
}

function InspectionIcon({ item }: { item: CheckItem }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <span className="flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-2xl border-2 border-[#e2e2e2] bg-white sm:h-[86px] sm:w-[86px]">
        {/* Plain img keeps these small artwork files crisp without adding Next image-domain config. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.icon}
          alt=""
          width={64}
          height={64}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-[58px] w-[58px] object-contain sm:h-16 sm:w-16"
          style={{ filter: "url(#inspection-icon-purple)" }}
        />
      </span>
      <p className="text-[1.05rem] font-bold leading-[1.2] text-foreground sm:text-lg">{item.title}</p>
    </div>
  )
}

// On phones the three groups swipe left-to-right; desktop keeps all three visible together.
export function WhatWeCheck() {
  return (
    <section className="relative border-t bg-white py-12 sm:py-16">
      <PurpleIconFilter />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">What we check</p>
          <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl lg:text-5xl">Bumper to bumper, and underneath</h2>
          <p className="mt-4 text-lg text-muted-foreground">260 points, adapted to petrol, diesel, hybrid and electric cars.</p>
        </div>

        <div className="mx-auto mt-9 max-w-7xl">
          <p className="mb-3 text-center text-sm font-semibold text-muted-foreground md:hidden">Swipe left or right: Mechanical · Exterior · Interior</p>

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
