import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BatteryCharging,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  ScanLine,
  ShieldCheck,
  Video,
} from "lucide-react"

const proof = [
  { icon: ClipboardCheck, text: "160-point Standard inspection" },
  { icon: FileSearch, text: "260-point Premium inspection" },
  { icon: ScanLine, text: "Full-system diagnostic scan" },
  { icon: BatteryCharging, text: "EV & hybrid checks" },
]

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden border-b bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(103,17,164,0.10),transparent_38%)]" />
      <div className="container relative mx-auto px-4 py-10 sm:py-14 lg:py-18">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
              <ShieldCheck className="h-4 w-4" />
              Independent pre-purchase vehicle inspections
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              Know the car before you <span className="text-primary">put your money into it.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              In-depth vehicle inspections for buyers across London, Essex, Hertfordshire and surrounding areas. We combine hands-on car-buying experience, physical inspection, diagnostics, road testing and clear video evidence so you can make a better buying decision.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/vehicle-inspections#book"
                className="inline-flex h-13 items-center justify-center rounded-xl bg-primary px-6 font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90"
              >
                Book an Inspection <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/vehicle-inspections/what-we-inspect"
                className="inline-flex h-13 items-center justify-center rounded-xl border-2 border-primary/20 bg-white px-6 font-bold text-primary transition hover:border-primary/40 hover:bg-primary/5"
              >
                See the Full 260-Point Checklist
              </Link>
            </div>

            <div className="mt-7 grid gap-2 sm:grid-cols-2">
              {proof.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 rounded-xl border border-border bg-white px-3.5 py-3 shadow-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-primary/15 bg-slate-50 p-3 shadow-2xl shadow-primary/10">
              <div className="relative aspect-[1600/900] overflow-hidden rounded-2xl bg-white">
                <Image
                  src="/images/inspection-car.jpg"
                  alt="Vehicle undergoing an independent pre-purchase inspection"
                  fill
                  priority
                  className="object-contain p-3"
                  sizes="(min-width: 1024px) 44vw, 94vw"
                />
              </div>
              <div className="grid gap-3 p-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-primary">Standard</p>
                  <p className="mt-1 text-2xl font-bold">160 points · £149.99</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Mechanical, diagnostics, condition, road test, history and report.</p>
                </div>
                <div className="rounded-2xl bg-primary p-4 text-white">
                  <p className="text-xs font-bold uppercase tracking-wide text-white/80">Premium</p>
                  <p className="mt-1 text-2xl font-bold">260 points · £199.99</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/80">Paint-depth, provenance, repair guidance, deeper evidence and priority booking.</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-3 hidden max-w-xs rounded-2xl border bg-white p-4 shadow-xl sm:block">
              <div className="flex items-start gap-3">
                <Video className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-bold">You see what we see</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Video evidence and clear findings, not just a tick-box sheet.</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-3 top-6 hidden rounded-2xl border bg-white px-4 py-3 shadow-xl sm:block">
              <div className="flex items-center gap-2 text-sm font-bold">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Buyer-first inspection
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
