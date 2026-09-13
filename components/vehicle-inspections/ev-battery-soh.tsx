import Link from "next/link"
import { BatteryCharging, BadgeCheck, FileCheck2, Gauge, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EvBatterySoh() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.05fr_.95fr] gap-8 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-bold text-primary mb-5">
              <BadgeCheck className="w-4 h-4" />
              CARA Approved® Autel EV Battery Health Test
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
              Buying an EV? Check the battery before you buy.
            </h2>

            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Add a professional high-voltage traction battery State of Health (SOH) assessment to either vehicle
              inspection for <strong className="text-foreground">£49.99</strong>. We use a CARA Approved® Autel EV Battery
              Health Test and provide a customer battery health report.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
                <a href="#book">
                  Add EV Battery SOH — £49.99
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/20 bg-white text-foreground hover:bg-primary/5 hover:text-primary">
                <Link href="/ev-battery-health-check">Learn about the battery test</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-primary/15 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BatteryCharging className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Optional EV add-on</p>
                <p className="text-3xl font-bold text-foreground">+£49.99</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex gap-3">
                <Gauge className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Battery State of Health (SOH)</p>
                  <p className="text-sm text-muted-foreground mt-1">A clear percentage showing the traction battery health reported through the vehicle&apos;s battery management data.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <FileCheck2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Customer battery health report</p>
                  <p className="text-sm text-muted-foreground mt-1">A separate Autel battery health report you can keep with your pre-purchase inspection.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <BadgeCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">CARA Approved® test method</p>
                  <p className="text-sm text-muted-foreground mt-1">The approval applies to the Autel battery health test method. Vehicle compatibility and available battery data vary by make and model.</p>
                </div>
              </div>
            </div>

            <p className="mt-6 pt-5 border-t border-border text-xs text-muted-foreground leading-relaxed">
              The Autel EV Battery Health Test is a diagnostic SOH assessment based on data available from the vehicle/BMS. It is not a full independent charge-and-discharge capacity test.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
