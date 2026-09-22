import Link from "next/link"
import {
  ArrowRight,
  BatteryCharging,
  Check,
  ClipboardCheck,
  FileSearch,
  Gauge,
  ScanLine,
  ShieldCheck,
  Video,
} from "lucide-react"

const included = [
  { icon: ScanLine, title: "Diagnostics", text: "Full-system scan of accessible control modules and recorded fault findings." },
  { icon: Gauge, title: "Road test", text: "Steering, braking, drivetrain behaviour, noises, vibration and warning lights." },
  { icon: Video, title: "Video evidence", text: "A clear explanation of the vehicle and the issues we found, not just a checklist." },
  { icon: FileSearch, title: "Vehicle history", text: "Finance, write-off, stolen and mileage checks, with deeper provenance work in Premium." },
  { icon: BatteryCharging, title: "EV & hybrid", text: "Relevant high-voltage, charging and battery-management checks where supported." },
  { icon: ShieldCheck, title: "Buying guidance", text: "Findings explained in practical terms so you know what to ask, negotiate or avoid." },
]

export function HomeCoreServices() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-primary">Vehicle inspections are a core service</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl lg:text-5xl">More than a visual once-over</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              We inspect the vehicle as a buyer would want it inspected: physical condition, mechanical systems, diagnostics, road behaviour, history and evidence all brought together before you commit.
            </p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                <p className="font-bold text-primary">Standard Inspection</p>
              </div>
              <div className="mt-3 flex items-end gap-3">
                <span className="text-4xl font-bold">£149.99</span>
                <span className="pb-1 text-sm font-semibold text-muted-foreground">160 points</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A comprehensive pre-purchase inspection covering mechanical condition, diagnostics, body and interior condition, underbody, road test, vehicle history, video review and same-day report.
              </p>
              <Link href="/vehicle-inspections#book" className="mt-5 inline-flex items-center font-bold text-primary hover:underline">
                Book Standard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-3xl border-2 border-primary/30 bg-primary/5 p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="font-bold text-primary">Premium Inspection</p>
              </div>
              <div className="mt-3 flex items-end gap-3">
                <span className="text-4xl font-bold">£199.99</span>
                <span className="pb-1 text-sm font-semibold text-muted-foreground">260 points</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Everything in Standard, plus paint-depth assessment, deeper body and underbody checks, extended road test, repair-cost guidance, seller and vehicle provenance checks, enhanced video evidence and priority booking.
              </p>
              <Link href="/vehicle-inspections/what-we-inspect" className="mt-5 inline-flex items-center font-bold text-primary hover:underline">
                See all 260 points <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {included.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-primary px-5 py-5 text-white sm:flex-row sm:px-7">
            <div>
              <p className="font-bold">Compare us on what is actually inspected.</p>
              <p className="mt-1 text-sm text-white/80">Our full Premium checklist is published point-by-point so you can see exactly what your money covers.</p>
            </div>
            <Link
              href="/vehicle-inspections/what-we-inspect"
              className="inline-flex shrink-0 items-center rounded-xl bg-white px-5 py-3 font-bold text-primary transition hover:bg-white/90"
            >
              View Full Checklist <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
