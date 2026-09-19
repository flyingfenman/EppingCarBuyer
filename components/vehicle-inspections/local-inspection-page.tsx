import Link from "next/link"
import { MechanicalReportOverview } from "@/components/vehicle-inspections/mechanical-report-overview"
import {
  ArrowRight,
  BatteryCharging,
  Check,
  ChevronDown,
  FileText,
  MapPin,
  ScanLine,
  ShieldCheck,
} from "lucide-react"

export type LocalInspectionPageProps = {
  brandName: string
  siteUrl: string
  keyword: string
  city: string
  areaType?: "City" | "AdministrativeArea"
  canonicalPath: string
  intro: string
  localCopy: string
  nearbyAreas: string[]
}

export function LocalInspectionPage({
  brandName,
  siteUrl,
  keyword,
  city,
  areaType = "City",
  canonicalPath,
  intro,
  localCopy,
  nearbyAreas,
}: LocalInspectionPageProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: keyword,
    serviceType: "Pre-purchase vehicle inspection",
    provider: {
      "@type": "Organization",
      name: brandName,
      url: siteUrl,
    },
    areaServed: {
      "@type": areaType,
      name: city,
    },
    url: `${siteUrl}${canonicalPath}`,
    offers: [
      {
        "@type": "Offer",
        name: "Standard Inspection",
        price: "149.99",
        priceCurrency: "GBP",
      },
      {
        "@type": "Offer",
        name: "Premium Inspection",
        price: "199.99",
        priceCurrency: "GBP",
      },
    ],
  }

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-white py-10 sm:py-14 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Link href="/vehicle-inspections" className="text-sm font-semibold text-primary hover:underline">
              Vehicle inspections
            </Link>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{keyword}</h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{intro}</p>

            <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm font-semibold">
              <span className="rounded-full border bg-white px-4 py-2">Standard £149.99</span>
              <span className="rounded-full border bg-white px-4 py-2">Premium £199.99</span>
              <span className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-primary">EV Battery SOH +£49.99</span>
            </div>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/vehicle-inspections#book"
                className="inline-flex h-13 items-center justify-center rounded-xl bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground transition hover:bg-primary/90"
              >
                Book an Inspection <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/vehicle-inspections/sample-report"
                className="inline-flex h-13 items-center justify-center rounded-xl border border-border bg-white px-7 py-3.5 text-base font-bold transition hover:bg-muted/30"
              >
                <FileText className="mr-2 h-4 w-4" /> View Sample Report
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary">
                <MapPin className="h-4 w-4" /> Mobile inspection service
              </div>
              <h2 className="mt-4 text-3xl font-bold">Pre-purchase car inspections in {city}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{localCopy}</p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Our in-depth mechanical inspection investigates the vehicle&apos;s condition at the seller&apos;s location and help you understand what the findings mean for your purchase. Both packages include a clear video review and a personal call to discuss concerns, priorities and questions to raise. Your photos and report also give you a record of issues observed to refer back to after purchase.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {nearbyAreas.map((area) => (
                  <span key={area} className="rounded-full border border-border bg-slate-50 px-3 py-1.5 text-sm font-medium">
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-slate-50 p-5 sm:p-6">
              <h3 className="text-xl font-bold">Every inspection includes</h3>
              <div className="mt-4 space-y-3 text-sm">
                {[
                  "Full-system diagnostic scan",
                  "Road test where safe and permitted",
                  "Vehicle history check",
                  "Seller identity and document checks with cooperation",
                  "Body, chassis, tyres and interior checks",
                  "Powertrain-specific checks for petrol, diesel, hybrid or EV",
                  "Easy-to-understand video review in both packages",
                  "Photo evidence and same-day digital report",
                  "Personal call and buying guidance",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <MechanicalReportOverview />

      <section className="bg-slate-50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Choose the inspection that suits the car</h2>
              <p className="mt-2 text-muted-foreground">Clear pricing with no need to request a quote first.</p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-primary">Standard Inspection</p>
                <p className="mt-2 text-4xl font-bold">£149.99</p>
                <p className="mt-2 font-semibold">90-point pre-purchase inspection</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  An in-depth mechanical inspection of the relevant engine and drivetrain, brakes, steering, suspension and diagnostics. Includes road test, vehicle history, seller identity and document checks with cooperation, a clear video review, photo evidence and personal buying guidance.
                </p>
              </div>

              <div className="rounded-3xl border-2 border-primary/30 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-primary">Premium Inspection</p>
                <p className="mt-2 text-4xl font-bold">£199.99</p>
                <p className="mt-2 font-semibold">140-point pre-purchase inspection</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Everything in Standard, including seller identity and document checks and the video review, plus deeper condition checks, an extended road test, available auction, salvage and previous advert searches, and checks for indicators of undisclosed motor trading. Subject to available records, seller cooperation and road-test permission.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-3">
                  <BatteryCharging className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-bold">Buying a fully electric car?</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Add a dedicated CARA Approved® Autel EV Battery State of Health report for compatible EVs.
                    </p>
                  </div>
                </div>
                <div className="shrink-0 sm:text-right">
                  <p className="text-2xl font-bold">+£49.99</p>
                  <Link href="/ev-battery-health-check" className="text-sm font-bold text-primary hover:underline">
                    EV battery details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-3xl font-bold">What happens after you book?</h2>
            <div className="mt-7 space-y-3">
              {[
                ["1", "Choose a package and appointment", "Book online and tell us where the vehicle is being sold."],
                ["2", "We attend the vehicle", `We travel to the seller or dealer in ${city} or the surrounding area.`],
                ["3", "We inspect and test", "We carry out the relevant physical, diagnostic, history and road-test checks."],
                ["4", "Understand before you decide", "Receive your video review, photos and digital report, then talk through the findings and buying decision with us. Keep the evidence for future reference."],
              ].map(([number, title, text]) => (
                <div key={number} className="flex gap-4 rounded-2xl border border-border bg-white p-4 sm:p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">{number}</span>
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href="/vehicle-inspections/sample-report" className="group rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-md">
                <FileText className="h-7 w-7 text-primary" />
                <h2 className="mt-4 text-xl font-bold">See a sample inspection report</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">See the level of detail, findings and checklist before you book.</p>
                <span className="mt-4 inline-flex items-center font-bold text-primary">View sample report <ArrowRight className="ml-2 h-4 w-4" /></span>
              </Link>

              <Link href="/ev-battery-health-check" className="group rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-md">
                <BatteryCharging className="h-7 w-7 text-primary" />
                <h2 className="mt-4 text-xl font-bold">EV battery health checks</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Learn what the optional State of Health assessment checks on compatible fully electric cars.</p>
                <span className="mt-4 inline-flex items-center font-bold text-primary">EV battery health <ArrowRight className="ml-2 h-4 w-4" /></span>
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              <details className="group rounded-2xl border bg-white p-4 sm:p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-bold [&::-webkit-details-marker]:hidden">
                  Can you inspect a car at a dealership in {city}?
                  <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Yes. The inspection is mobile, so we can attend a dealer or private seller as long as access to the vehicle and the required checks can be arranged.</p>
              </details>
              <details className="group rounded-2xl border bg-white p-4 sm:p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-bold [&::-webkit-details-marker]:hidden">
                  Do I need to be there?
                  <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">No. We can inspect the vehicle directly with the seller or dealer and send the findings to you afterwards.</p>
              </details>
              <details className="group rounded-2xl border bg-white p-4 sm:p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-bold [&::-webkit-details-marker]:hidden">
                  Will you tell me whether to buy the car?
                  <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">We give you the inspection findings, highlight the important issues and talk you through them so you can make your own buying decision.</p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-3xl bg-slate-950 p-7 text-center text-white sm:p-10">
            <ShieldCheck className="mx-auto h-9 w-9 text-emerald-400" />
            <h2 className="mt-4 text-3xl font-bold">Inspect it before you buy it.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">Independent pre-purchase vehicle inspections in {city} from £149.99.</p>
            <Link href="/vehicle-inspections#book" className="mt-6 inline-flex items-center rounded-xl bg-white px-6 py-3 font-bold text-slate-950 transition hover:bg-slate-100">
              Book an Inspection <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
