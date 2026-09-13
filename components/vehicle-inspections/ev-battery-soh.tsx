import Link from "next/link"
import { BatteryCharging, BadgeCheck, FileCheck2, Gauge, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EvBatterySoh() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-950 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.05fr_.95fr] gap-8 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300 mb-5">
              <BadgeCheck className="w-4 h-4" />
              CARA Approved® Autel Blitz Test
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Buying an EV? Check the battery before you buy.
            </h2>

            <p className="mt-5 text-lg text-slate-300 leading-relaxed">
              Add a professional high-voltage traction battery State of Health (SOH) assessment to either vehicle
              inspection for <strong className="text-white">£49.99</strong>. We use the Autel Blitz Battery Health
              Check, which carries the Battery Health Check CARA Approved® certification mark.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold">
                <a href="#book">
                  Add EV Battery SOH — £49.99
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link href="/ev-battery-health-check">Learn about the battery test</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-400/10 flex items-center justify-center">
                <BatteryCharging className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Optional EV add-on</p>
                <p className="text-3xl font-bold">+£49.99</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex gap-3">
                <Gauge className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Battery State of Health (SOH)</p>
                  <p className="text-sm text-slate-400 mt-1">A clear percentage showing the traction battery health reported through the vehicle&apos;s battery management data.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <FileCheck2 className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Customer battery health report</p>
                  <p className="text-sm text-slate-400 mt-1">A separate Autel battery health report you can keep with your pre-purchase inspection.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <BadgeCheck className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">CARA Approved® test method</p>
                  <p className="text-sm text-slate-400 mt-1">The approval applies to the Autel Blitz Test. Vehicle compatibility and available battery data vary by make and model.</p>
                </div>
              </div>
            </div>

            <p className="mt-6 pt-5 border-t border-white/10 text-xs text-slate-500 leading-relaxed">
              The Autel Blitz test is a diagnostic SOH assessment based on data available from the vehicle/BMS. It is not a full independent charge-and-discharge capacity test.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
