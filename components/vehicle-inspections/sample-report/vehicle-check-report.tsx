import { ShieldCheck, CircleCheck, Car, Gauge, CalendarDays, SearchCheck, ArrowLeftRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const vehicleDetails = [
  { label: "Make", value: "HYUNDAI" },
  { label: "Model", value: "IONIQ 5 PREMIUM" },
  { label: "Body Type", value: "SUV" },
  { label: "Fuel Type", value: "Electric" },
  { label: "Transmission", value: "Automatic — single-speed reduction gear" },
  { label: "Registration (VRM)", value: "RK22 UCJ" },
  { label: "VIN", value: "KMHLN81CXNU214477" },
  { label: "Colour", value: "Cyberspace Grey" },
  { label: "Date First Registered", value: "15 March 2022" },
  { label: "Year of Manufacture", value: "2022" },
  { label: "Number of Previous Owners", value: "1" },
  { label: "Current V5C Issue Date", value: "18 November 2023" },
  { label: "CO2 Emissions", value: "0 g/km" },
]

const historySummary = [
  "Not recorded as stolen",
  "Not recorded as scrapped",
  "Not recorded as a write-off",
  "Not imported",
  "Not exported",
  "No third-party interest",
  "No outstanding finance",
  "No mileage discrepancies",
  "No colour changes",
  "No recorded plate changes",
]

interface MotHistoryEntry {
  mileage: string
  date: string
  result: string
  advisory: string | null
}

const motHistory: MotHistoryEntry[] = [
  {
    mileage: "9,120 mi",
    date: "08 March 2025",
    result: "Pass",
    advisory: "Nearside rear tyre worn close to the legal limit",
  },
  {
    mileage: "19,860 mi",
    date: "22 February 2026",
    result: "Pass",
    advisory: null,
  },
]

export function VehicleCheckReport() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">Vehicle Check Report</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every Epping Car Buyer inspection includes a full AutoTrader-verified vehicle history check as
            standard — it&apos;s the very first thing you&apos;ll find in your report.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 bg-emerald-600 text-white rounded-2xl shadow-lg py-6 px-6 text-center sm:text-left">
            <ShieldCheck className="w-10 h-10 flex-shrink-0" />
            <div>
              <p className="text-2xl font-extrabold tracking-wide uppercase">All Checks Passed</p>
              <p className="text-emerald-50 text-sm mt-1">No adverse history markers found on this vehicle</p>
            </div>
          </div>

          <Card className="border shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Registered Vehicle Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {vehicleDetails.map((item) => (
                  <div key={item.label}>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Vehicle Check Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <ul className="grid sm:grid-cols-2 gap-x-8">
                {historySummary.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 py-2 border-b border-border/60">
                    <CircleCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between gap-3 pt-1">
                <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <CalendarDays className="w-4 h-4 text-primary flex-shrink-0" />
                  MOT expiry date
                </span>
                <span className="text-sm font-bold text-foreground">22 February 2027</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Gauge className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Mileage & MOT History</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between rounded-lg bg-primary/5 px-4 py-3">
                <span className="text-sm font-medium text-foreground">Mileage at inspection</span>
                <span className="text-sm font-bold text-primary">23,499 miles</span>
              </div>

              <div>
                {motHistory.map((entry, index) => (
                  <div
                    key={entry.date}
                    className={`flex items-start justify-between gap-4 py-3 ${
                      index < motHistory.length - 1 ? "border-b border-border/60" : ""
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-foreground">
                        {entry.mileage} <span className="font-normal text-muted-foreground">&middot; {entry.date}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{entry.advisory ?? "No advisories"}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 flex-shrink-0">
                      <CircleCheck className="w-3.5 h-3.5" />
                      {entry.result}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center gap-2.5 text-sm text-muted-foreground text-center px-4">
            <SearchCheck className="w-4 h-4 text-primary flex-shrink-0" />
            <span>
              This vehicle has been checked 6 times by other trade buyers and finance companies in the past 12
              months — a sign of a well-documented, actively verified history.
            </span>
          </div>

          <Card className="rounded-2xl border-2 border-primary/20 bg-primary/5 shadow-lg">
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ArrowLeftRight className="w-5 h-5 text-primary" />
                </div>
                <p className="font-bold text-foreground">Part-Exchange Offer</p>
              </div>
              <p className="text-4xl sm:text-5xl font-bold text-primary">£23,750</p>
              <p className="text-foreground leading-relaxed">
                Based on this vehicle&apos;s specification, mileage, and the condition confirmed during this
                inspection, alongside its clean AutoTrader-verified history.
              </p>
              <p className="text-sm text-muted-foreground">
                Final part-exchange figures are always confirmed in person after a physical inspection of the
                vehicle being traded in — this figure is illustrative only, as with the rest of this sample
                report.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
