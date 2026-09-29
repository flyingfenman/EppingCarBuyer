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

const PLANS: Plan[] = [
  {
    key: "standard",
    name: "Standard",
    price: "£149.99",
    points: "160-point inspection",
    forWho: "A thorough mechanical and condition check, with the history check, diagnostics and road test.",
    items: IN_BOTH,
    icon: Check,
    cta: "Book Standard",
  },
  {
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
  },
  {
    key: "ev",
    name: "EV Battery Health Check",
    price: "£99.99",
    points: "Battery check on its own",
    forWho: "Just need an electric car's battery checked? The battery test and report, without an inspection.",
    items: [
      { label: "CARA Approved® Autel EV Battery Health Test" },
      { label: "Battery State of Health as a percentage" },
      { label: "Customer battery health report" },
      { label: "Fully electric and plug-in hybrid cars", note: "Compatibility varies by make and model" },
    ],
    icon: Check,
    cta: "Book the battery check",
  },
]

// The three options side by side, each with everything it includes and its own Book button.
export function Pricing() {
  return (
    <section id="prices" className="scroll-mt-20 border-t bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Fixed prices, no quote needed</p>
          <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl lg:text-5xl">Choose your inspection</h2>
          <p className="mt-4 text-lg text-muted-foreground">Everything each one includes is listed below. Pick your exact time when you book.</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl items-start gap-5 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              className={`relative flex flex-col rounded-3xl bg-white p-6 sm:p-7 ${
                plan.featured ? "border-2 border-primary shadow-xl lg:-mt-4" : "border border-border shadow-sm"
              }`}
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
                <ul className="space-y-3">
                  {plan.items.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${plan.icon === Plus ? "bg-primary" : "bg-emerald-600"}`}>
                        <plan.icon className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                      </span>
                      <span>
                        <span className="block font-semibold leading-snug">{item.label}</span>
                        {item.note && <span className="mt-0.5 block text-sm text-muted-foreground">{item.note}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-4 rounded-3xl border border-border bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <BatteryCharging className="h-6 w-6" />
            </span>
            <div>
              <p className="text-lg font-bold">Buying an electric or plug-in hybrid? Add the battery report for +£49.99</p>
              <p className="text-muted-foreground">
                It isn&apos;t included in either inspection. With it, Standard is <strong className="text-foreground">£199.98</strong> and Premium is <strong className="text-foreground">£249.98</strong>.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-1">
            <Link href="/ev-battery-health-check" className="inline-flex min-h-11 items-center font-bold text-primary underline underline-offset-4">
              How the battery test works
            </Link>
            <Link href="/vehicle-inspections/what-we-inspect" className="inline-flex min-h-11 items-center font-bold text-primary underline underline-offset-4">
              See all 260 checklist points
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
