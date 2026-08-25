import { MessageSquareText } from "lucide-react"
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

export function ReportSummary() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">Inspector&apos;s Summary</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The overall verdict on this sample Ioniq 5, in the inspector&apos;s own words
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
                &ldquo;This Ioniq drove well on the road test and there&apos;s nothing here that should stop you
                buying it, but it's not a car without things to know about. The traction battery itself checked out
                well — 97% state of health with no signs of degradation — but the rear dampers are starting to show
                their age, the rear discs have some light surface corrosion (common on EVs that lean heavily on
                regenerative braking, not a safety concern), and there&apos;s a wind noise from the driver&apos;s door
                seal worth getting looked at. We also found one historic charging-system fault code that cleared and
                hasn&apos;t come back during testing, front tyres down to around 3mm, a small stone chip in the
                windscreen, and some paint depth variance on the rear wing suggesting a minor repair at some point —
                nothing structural, but worth asking the seller about. None of this is a dealbreaker on its own, but
                it&apos;s exactly the kind of detail that&apos;s easy to miss without a proper inspection — and
                useful to know before you agree a price.&rdquo;
              </p>
              <p className="text-sm font-bold text-foreground">— Henry</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
