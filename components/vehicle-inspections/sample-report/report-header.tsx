import { FlaskConical, ShieldCheck, CalendarDays, Gauge, UserRound, PackageCheck, Ban } from "lucide-react"

const keyFacts = [
  { icon: ShieldCheck, label: "Registration", value: "RK22 UCJ" },
  { icon: Gauge, label: "Mileage", value: "23,499 miles" },
  { icon: UserRound, label: "Inspector", value: "Henry" },
  { icon: PackageCheck, label: "Package", value: "Premium Inspection" },
]

export function ReportHeader() {
  return (
    <section className="bg-primary py-10 sm:py-14 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-lg border-2 border-white">
            <FlaskConical className="w-5 h-5 text-primary" />
            <span className="text-sm font-extrabold tracking-wide text-primary uppercase">
              Sample Report — Fictional Vehicle, For Illustration Only
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
              2022 Hyundai Ioniq 5 Premium
            </h1>
            <p className="text-white/80 text-lg">
              This is a made-up example report so you can see exactly what you get — not a real customer&apos;s vehicle.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 border border-white/30 rounded-full text-sm font-medium text-white">
              <CalendarDays className="w-4 h-4" />
              Inspection completed 14 August 2026
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white text-primary rounded-full text-sm font-semibold">
              <PackageCheck className="w-4 h-4" />
              Premium Inspection
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-6 sm:mt-8 lg:mt-10 bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {keyFacts.map((fact) => (
              <div key={fact.label} className="flex flex-col items-center text-center gap-2">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
                  <fact.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{fact.label}</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">{fact.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Ban className="w-4 h-4 flex-shrink-0" />
            <span>Sample only — not downloadable</span>
          </div>
        </div>
      </div>
    </section>
  )
}
