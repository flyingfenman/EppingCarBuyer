import Link from "next/link"
import { ArrowRight, Check, ClipboardCheck, ShieldCheck } from "lucide-react"

const inspectionPoints = [
  "Standard 160-point inspection — £149.99",
  "Premium 260-point inspection — £199.99",
  "Petrol, diesel, hybrid & electric vehicles",
  "Video review, evidence and same-day report in both packages",
  "Personal call to guide your purchase decision",
]

export function HomeCoreServices() {
  return (
    <section className="bg-gray-50 py-10 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 max-w-3xl sm:mb-9">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#0d9488]/10 px-3 py-1.5 text-sm font-bold text-[#0d9488]">
              <ClipboardCheck className="h-4 w-4" /> Vehicle Inspections
            </div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              In-depth Vehicle Inspections
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              Buying a used car? Our inspections assess the relevant engine and drivetrain, brakes, steering, suspension, diagnostic findings, body condition and road-test behaviour. We explain the issues and help you understand what they mean before you commit.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-[#0d9488]/20 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#0d9488]/10 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#0d9488] px-3 py-1.5 text-sm font-bold text-white">
                    <ClipboardCheck className="h-4 w-4" /> Inspections from £149.99
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#6711a4]/10 px-3 py-1.5 text-sm font-semibold text-[#6711a4]">
                    160 or 260 points
                  </span>
                </div>

                <h3 className="mt-5 text-3xl font-bold text-foreground sm:text-4xl">Know what you&apos;re buying before you pay for it</h3>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  See the car through an inspector&apos;s eyes. We explain the positives, the issues and what needs attention in plain English, so you can decide whether to proceed, ask for repairs or discuss the price.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/vehicle-inspections"
                    className="inline-flex h-12 items-center justify-center rounded-md border-2 border-[#0b7a70] bg-[#0d9488] px-6 font-bold text-white shadow-md transition-colors hover:bg-[#0b7a70]"
                  >
                    Book a Vehicle Inspection <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="/vehicle-inspections/what-we-inspect"
                    className="inline-flex h-12 items-center justify-center rounded-md border-2 border-[#6711a4]/20 bg-[#6711a4]/5 px-6 font-bold text-[#6711a4] transition-colors hover:bg-[#6711a4]/10"
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

                <div className="rounded-2xl border border-[#6711a4]/15 bg-[#6711a4]/5 px-4 py-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#6711a4]" />
                    <div>
                      <p className="font-bold text-foreground">EV buyers are covered too</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        EV and hybrid checks are part of the main inspection where supported, with an optional dedicated EV Battery State of Health report for compatible fully electric and plug-in hybrid vehicles.
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
