import Link from "next/link"
import { ArrowRight, BatteryCharging, FileText, MapPin, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function InspectionsHero() {
  return (
    <section className="border-b border-border bg-white py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary sm:text-sm">
            <ShieldCheck className="h-4 w-4" /> Independent pre-purchase vehicle inspections
          </div>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-balance sm:text-5xl lg:text-6xl">
            Buying a Used Car? <span className="text-primary">Know Before You Buy.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            We inspect the vehicle where it is being sold, road test it, scan its systems and check its history before you commit.
          </p>

          <div className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border bg-white p-4 text-left shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Standard</p>
              <p className="mt-1 text-2xl font-bold">£149.99</p>
              <p className="mt-1 text-xs text-muted-foreground">90-point inspection</p>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 text-left shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-primary">Premium</p>
              <p className="mt-1 text-2xl font-bold">£199.99</p>
              <p className="mt-1 text-xs text-muted-foreground">140-point inspection</p>
            </div>
          </div>

          <div className="mx-auto mt-3 flex max-w-2xl items-center justify-center gap-2 rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary">
            <BatteryCharging className="h-4 w-4 shrink-0" />
            EV Battery State of Health Report +£49.99
          </div>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-13 px-7 font-bold">
              <a href="#book">
                Book an Inspection <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-13 px-7 font-bold">
              <Link href="/vehicle-inspections/sample-report">
                <FileText className="mr-2 h-4 w-4" /> View Sample Report
              </Link>
            </Button>
          </div>

          <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
            <MapPin className="h-4 w-4" /> Essex · Hertfordshire · Cambridgeshire · Greater London · surrounding areas
          </p>
        </div>
      </div>
    </section>
  )
}
