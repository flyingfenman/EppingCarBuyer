import Link from "next/link"
import {
  ArrowRight,
  BatteryCharging,
  ClipboardCheck,
  FileSearch,
  ScanLine,
  ShieldCheck,
  Video,
} from "lucide-react"

const highlights = [
  { icon: ClipboardCheck, label: "160-point Standard" },
  { icon: FileSearch, label: "260-point Premium" },
  { icon: ScanLine, label: "Full-system diagnostics" },
  { icon: BatteryCharging, label: "EV & hybrid checks" },
]

export function InspectionsHero() {
  return (
    <section className="relative overflow-hidden border-b bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(103,17,164,0.12),transparent_40%)]" />
      <div className="container relative mx-auto px-4 py-9 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
              <ShieldCheck className="h-4 w-4" />
              Independent pre-purchase vehicle inspections
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-[1.06] sm:text-5xl lg:text-6xl">
              We inspect the car like <span className="text-primary">our own money is on the line.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Years of buying cars with our own money shape how we inspect yours. We combine a detailed physical inspection, advanced diagnostics, road testing, vehicle history and clear video evidence so you understand the car before you commit.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#book"
                className="inline-flex h-13 items-center justify-center rounded-xl bg-primary px-6 font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90"
              >
                Book Your Inspection <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/vehicle-inspections/what-we-inspect"
                className="inline-flex h-13 items-center justify-center rounded-xl border-2 border-primary/20 bg-white px-6 font-bold text-primary transition hover:border-primary/40 hover:bg-primary/5"
              >
                Compare What We Inspect
              </Link>
            </div>

            <div className="mt-7 grid gap-2 sm:grid-cols-2">
              {highlights.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 rounded-xl border border-border bg-white px-3.5 py-3 shadow-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-primary/15 bg-primary/5 p-4">
              <Video className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                You don&apos;t just receive a tick-box result. We explain the important findings in plain English and give you evidence you can use when deciding whether to buy, negotiate or walk away.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
