import Link from "next/link"
import { ArrowRight, BadgeCheck, BatteryCharging, Check, Plus } from "lucide-react"
import { IN_BOTH, PREMIUM_ADDS, type Item } from "../whats-included"

type Plan = {
  key: "standard" | "premium" | "ev"
  name: string
  price: string
  points: string
  forWho: string
  lead?: string
  items: Item[]
  icon: typeof Check
  cta: string
  featured?: boolean
}

// What the battery report is, for the add-on box and the battery check on its own.
const BATTERY_ITEMS: Item[] = [
  { label: "CARA Approved® Autel EV Battery Health Test" },
  { label: "Battery State of Health as a percentage" },
  { label: "Customer battery health report" },
  { label: "Fully electric and plug-in hybrid cars", note: "Compatibility varies by make and model" },
]


const STANDARD: Plan = {
  key: "standard",
  name: "Standard",
  price: "£149.99",
  points: "160-point inspection",
  forWho: "A thorough mechanical and condition check, with the history check, diagnostics and road test.",
  items: IN_BOTH,
  icon: Check,
  cta: "Book Standard",
}

const PREMIUM: Plan = {
  key: "premium",
  name: "Premium",
  price: "£199.99",
  points: "260-point inspection",
  forWho: "Our deepest inspection, with paint readings, repair costs and research into the car and seller.",
  lead: "Everything in Standard, plus:",
  items: PREMIUM_ADDS,
  icon: Plus,
  cta: "Book Premium",
  featured: true,
}

const EV_ONLY: Plan = {
  key: "ev",
  name: "EV Battery Health Check",
  price: "£99.99",
  points: "Battery check on its own",
  forWho: "Just need an electric car's battery checked? The battery test and report, without an inspection.",
  items: BATTERY_ITEMS,
  icon: Check,
  cta: "Book the battery check",
}

function Bullets({ items, icon: Icon = Check }: { items: Item[]; icon?: typeof Check }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.label} className="flex items-start gap-3">
          <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${Icon === Plus ? "bg-primary" : "bg-emerald-600"}`}>
            <Icon className="h-3.5 w-3.5 text-white" strokeWidth={3} />
          </span>
          <span>
            <span className="block font-semibold leading-snug">{item.label}</span>
            {item.note && <span className="mt-0.5 block text-sm text-muted-foreground">{item.note}</span>}
          </span>
        </li>
      ))}
    </ul>
  )
}

function PlanCard({ plan, className = "" }: { plan: Plan; className?: string }) {
  return (
    <div
      className={`relative flex flex-col rounded-3xl bg-white p-6 sm:p-7 ${
        plan.featured ? "border-2 border-primary shadow-xl lg:-mt-4" : "border border-border shadow-sm"
      } ${className}`}
    >
      {plan.featured && (
        <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground shadow-md">
          <BadgeCheck className="h-4 w-4" /> Most thorough
        </span>
      )}
      <div className="flex items-center gap-2">
        {plan.key === "ev" && <BatteryCharging className="h-5 w-5 text-primary" />}
        <h3 className="text-2xl font-bold">{plan.name}</h3>
      </div>
      <p className="mt-1 text-sm font-semibold text-primary">{plan.points}</p>
      <p className="mt-4 text-5xl font-bold tracking-tight">{plan.price}</p>
      <p className="mt-3 text-muted-foreground">{plan.forWho}</p>

      <Link
        href={`/vehicle-inspections/book?package=${plan.key}`}
        className={`mt-6 inline-flex min-h-12 items-center justify-center rounded-xl px-6 text-lg font-bold transition ${
          plan.featured ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90" : "border-2 border-primary bg-white text-primary hover:bg-primary/5"
        }`}
      >
        {plan.cta} <ArrowRight className="ml-2 h-5 w-5" />
      </Link>

      <div className="mt-6 border-t border-border pt-5">
        {plan.lead && <p className="mb-3 font-bold">{plan.lead}</p>}
        <Bullets items={plan.items} icon={plan.icon} />
      </div>
    </div>
  )
}

// A small box directly under Standard and Premium: the battery report can be added to either inspection.
function BatteryAddOn() {
  return (
    <div id="battery-report" className="relative scroll-mt-24 rounded-3xl border border-border bg-white p-6 pt-8 shadow-sm sm:p-7 sm:pt-9 lg:col-span-2">
      <span className="absolute -top-3.5 left-6 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground shadow-md sm:left-7">
        <Plus className="h-4 w-4" strokeWidth={3} /> Add-on for either inspection
      </span>

      <div className="flex items-start gap-4">
        <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground sm:flex">
          <BatteryCharging className="h-8 w-8" />
        </span>
        <div>
          <h3 className="text-2xl font-bold leading-tight sm:text-3xl">Buying an electric or plug-in hybrid?</h3>
          <p className="mt-2 text-xl font-bold sm:text-2xl">Add the battery report for</p>
          <p className="text-5xl font-bold tracking-tight text-primary sm:text-6xl">+£49.99</p>
          <p className="mt-1 text-muted-foreground">It isn&apos;t included in either inspection, so add it when you book.</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-1 sm:flex-row sm:gap-6">
        <Link href="/ev-battery-health-check" className="inline-flex min-h-11 items-center font-bold text-primary underline underline-offset-4">
          How the battery test works
        </Link>
        <Link href="/vehicle-inspections/what-we-inspect" className="inline-flex min-h-11 items-center font-bold text-primary underline underline-offset-4">
          See all 260 checklist points
        </Link>
      </div>
    </div>
  )
}

// Standard and Premium side by side, the battery add-on directly under them, and the battery check on its own
// beside them. On phones they stack in that order.
export function Pricing() {
  return (
    <section id="prices" className="scroll-mt-20 border-t bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold sm:text-4xl lg:text-5xl">Choose your inspection</h2>
          <p className="mt-4 text-lg text-muted-foreground">Everything each one includes is listed below. Pick your exact time when you book.</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-x-5 gap-y-8 lg:grid-cols-3">
          <PlanCard plan={STANDARD} />
          <PlanCard plan={PREMIUM} />
          <BatteryAddOn />
          <PlanCard plan={EV_ONLY} className="lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:self-start" />
        </div>
      </div>
    </section>
  )
}
