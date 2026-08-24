import { CheckCircle2, MessageSquareText, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const ratingGuide = [
  {
    label: "Good",
    description: "No issues found — in line with the car's age and mileage",
    dot: "bg-emerald-500",
    text: "text-emerald-700",
  },
  {
    label: "Fair",
    description: "Minor wear, or a point worth knowing about",
    dot: "bg-amber-500",
    text: "text-amber-700",
  },
  {
    label: "Poor",
    description: "A problem we think needs addressing",
    dot: "bg-red-500",
    text: "text-red-700",
  },
  {
    label: "N/A",
    description: "Not applicable to this vehicle",
    dot: "bg-gray-400",
    text: "text-gray-600",
  },
]

const historyChecks = [
  "No write-off recorded",
  "No outstanding finance",
  "Not recorded stolen",
  "No mileage discrepancy flagged",
]

export function ReportSummary() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">Inspector&apos;s Summary</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The overall verdict on this sample Golf GTI, in the inspector&apos;s own words
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="rounded-2xl border shadow-md">
            <CardContent>
              <h3 className="text-lg font-bold text-foreground mb-4">Rating Guide</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {ratingGuide.map((rating) => (
                  <div key={rating.label} className="flex items-start gap-2.5">
                    <span className={`mt-1.5 w-3 h-3 rounded-full flex-shrink-0 ${rating.dot}`} />
                    <div>
                      <p className={`text-sm font-bold ${rating.text}`}>{rating.label}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{rating.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-2 border-primary/20 bg-primary/5 shadow-lg">
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageSquareText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Inspector&apos;s Notes</p>
                  <p className="text-xs text-muted-foreground">Henry · 14 August 2026</p>
                </div>
              </div>
              <p className="text-foreground leading-relaxed">
                &ldquo;Overall this Golf presented in good condition for its age and mileage — no signs of
                accident repair or structural damage, and it drove well on the road test. The only points worth
                knowing about: the front tyres are down to around 3mm and will need replacing before too long,
                and the diagnostic scan picked up two historic fault codes that were cleared a few months back —
                worth asking the seller about, but not a dealbreaker on their own.&rdquo;
              </p>
              <p className="text-sm font-bold text-foreground">— Henry</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border shadow-md">
            <CardContent>
              <div className="flex items-center gap-2.5 mb-4">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Vehicle History Check</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {historyChecks.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
