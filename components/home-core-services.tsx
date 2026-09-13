import Link from "next/link"
import { ArrowRight, Check, ClipboardCheck, ShieldCheck } from "lucide-react"

const inspectionPoints = [
  "Standard 90-point inspection — £149.99",
  "Premium 140-point inspection — £199.99",
  "Petrol, diesel, hybrid & electric vehicles",
  "Same-day digital report with independent findings",
]

export function HomeCoreServices() {
  return (
    <section className="bg-gray-50 py-10 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 max-w-3xl sm:mb-9">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0d9488]">Independent vehicle inspections</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Buying a used car? Know what you&apos;re buying before you commit.
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              We inspect the vehicle at the seller&apos;s location, road test it, scan its systems and send you a same-day digital report. Petrol, diesel, hybrid or electric — choose Standard or Premium and book online.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-[#0d9488]/20 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#0d9488]/5 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#0d9488] px-3 py-1.5 text-sm font-bold text-white">
                    <ClipboardCheck className="h-4 w-4" /> Vehicle Inspections
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#0d9488]/10 px-3 py-1.5 text-sm font-semibold text-[#0d9488]">
                    From £149.99
                  </span>
                </div>

                <h3 className="mt-5 text-3xl font-bold text-foreground sm:text-4xl">Independent Vehicle Inspections</h3>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  Buying a used car? Have it professionally inspected before you commit. We check the vehicle, road test it, scan its systems and give you an independent report so you know what you are buying.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/vehicle-inspections"
                    className="inline-flex h-12 items-center justify-center rounded-md border-2 border-[#0b7a70] bg-[#0d9488] px-6 font-bold text-white shadow-md transition-colors hover:bg-[#0b7a70]"
                  >
                    Book a Vehicle Inspection <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="/vehicle-inspections"
                    className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-white px-6 font-bold text-foreground transition-colors hover:bg-muted/40"
                  >
                    See What We Inspect
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {inspectionPoints.map((point) => (
                    <div key={point} className="flex items-start gap-2.5 rounded-xl bg-[#0d9488]/5 px-3.5 py-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0d9488] text-white">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-sm font-semibold leading-relaxed text-foreground">{point}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-primary/15 bg-primary/5 px-4 py-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-bold text-foreground">EV buyers are covered too</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        EV and hybrid checks are part of the main inspection where supported, with an optional dedicated EV Battery State of Health report for compatible fully electric vehicles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
