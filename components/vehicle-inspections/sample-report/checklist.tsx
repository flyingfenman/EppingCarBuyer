import type { LucideIcon } from "lucide-react"
import { Cog, Car, Armchair, CircleCheck, CircleAlert, CircleX, MinusCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Rating = "Good" | "Fair" | "Poor" | "N/A"

interface ChecklistItem {
  label: string
  rating: Rating
  note?: string
}

interface ChecklistCategory {
  name: string
  icon: LucideIcon
  score: number
  items: ChecklistItem[]
}

const ratingStyles: Record<Rating, string> = {
  Good: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Fair: "bg-amber-50 text-amber-700 border-amber-200",
  Poor: "bg-red-50 text-red-700 border-red-200",
  "N/A": "bg-muted text-muted-foreground border-border",
}

const ratingIcons: Record<Rating, LucideIcon> = {
  Good: CircleCheck,
  Fair: CircleAlert,
  Poor: CircleX,
  "N/A": MinusCircle,
}

// Same 3 categories and items as the "What We Inspect" section, but here shown as a completed report —
// every single item carries an actual finding (Good/Fair/Poor/N-A), matching the level of detail a real
// finished report has, not a trimmed-down preview.
const categories: ChecklistCategory[] = [
  {
    name: "Mechanical",
    icon: Cog,
    score: 92,
    items: [
      { label: "Oil condition & level", rating: "Good" },
      { label: "Coolant condition & level", rating: "Good" },
      { label: "Drive belts & hoses", rating: "Good" },
      { label: "Battery condition & charging system", rating: "Good" },
      { label: "EV & hybrid traction battery health check", rating: "N/A", note: "Petrol vehicle — not applicable" },
      { label: "Alternator output", rating: "Good" },
      { label: "Exhaust system & emissions", rating: "Good" },
      { label: "Engine & gearbox mounts", rating: "Good" },
      { label: "Fluid leaks — oil, coolant, power steering, transmission", rating: "Good" },
      { label: "CV joints & driveshafts", rating: "Good" },
      { label: "Timing chain/belt noise check", rating: "Good" },
      { label: "Front & rear suspension components", rating: "Good" },
      { label: "Shock absorbers / struts", rating: "Good" },
      { label: "Ball joints & tie rod ends", rating: "Good" },
      { label: "Suspension bushings", rating: "Good" },
      { label: "Steering rack & power steering", rating: "Good" },
      { label: "Brake pads & discs, front and rear", rating: "Good" },
      { label: "Brake calipers & lines", rating: "Good" },
      { label: "Handbrake operation", rating: "Good" },
      {
        label: "OBD fault code scan — stored and cleared history",
        rating: "Fair",
        note: "2 historic fault codes found, cleared roughly 3 months before inspection",
      },
      { label: "Engine performance under load", rating: "Good" },
      { label: "Gearbox / clutch operation", rating: "Good" },
      { label: "Braking response", rating: "Good" },
      { label: "Steering & handling", rating: "Good" },
      { label: "Noise, vibration & harshness check", rating: "Good" },
    ],
  },
  {
    name: "Body & Chassis",
    icon: Car,
    score: 94,
    items: [
      { label: "Paint condition & panel gaps", rating: "Good" },
      { label: "Evidence of accident repair or respray", rating: "Good" },
      { label: "Rust & corrosion check", rating: "Good" },
      { label: "All lights — head, tail, fog, indicators, reverse, number plate", rating: "Good" },
      { label: "Glass & windscreen condition", rating: "Good" },
      { label: "Doors, boot & bonnet operation", rating: "Good" },
      {
        label: "Wheels & tyre condition, including tread depth",
        rating: "Fair",
        note: "Front tyres at 3mm, nearing replacement",
      },
    ],
  },
  {
    name: "Interior",
    icon: Armchair,
    score: 98,
    items: [
      { label: "Dashboard warning lights", rating: "Good" },
      { label: "Electric windows & mirrors", rating: "Good" },
      { label: "Air conditioning & heating", rating: "Good" },
      { label: "Infotainment & electrics", rating: "Good" },
      { label: "Seatbelts", rating: "Good" },
      { label: "Horn, wipers & washers", rating: "Good" },
      { label: "General interior condition & wear", rating: "Good" },
    ],
  },
]

function RatingBadge({ rating }: { rating: Rating }) {
  const Icon = ratingIcons[rating]
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap flex-shrink-0 ${ratingStyles[rating]}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {rating}
    </span>
  )
}

export function ReportChecklist() {
  return (
    <section id="checklist" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">The Detailed Checklist</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every area we inspect, with a clear rating for every single item
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {categories.map((category) => (
            <Card key={category.name} className="border shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </div>
                  <span className="text-sm font-bold text-primary">{category.score}/100</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-x-8">
                  {category.items.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-start justify-between gap-3 py-2.5 border-b border-border/60"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        {item.note && (
                          <p className="text-xs text-muted-foreground mt-0.5">{item.note}</p>
                        )}
                      </div>
                      <RatingBadge rating={item.rating} />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
