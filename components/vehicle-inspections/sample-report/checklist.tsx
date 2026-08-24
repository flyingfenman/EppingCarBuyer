import type { LucideIcon } from "lucide-react"
import {
  Car,
  Armchair,
  Cog,
  Wrench,
  ScanLine,
  Route,
  CircleCheck,
  CircleAlert,
  CircleX,
  MinusCircle,
} from "lucide-react"
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

const categories: ChecklistCategory[] = [
  {
    name: "Exterior",
    icon: Car,
    items: [
      { label: "Paintwork & panels", rating: "Good" },
      { label: "Glass & windscreen", rating: "Good" },
      { label: "Lights", rating: "Good" },
      {
        label: "Front tyres",
        rating: "Fair",
        note: "3mm tread remaining, nearing replacement",
      },
      { label: "Panel gaps & bodywork", rating: "Good" },
    ],
  },
  {
    name: "Interior",
    icon: Armchair,
    items: [
      { label: "Upholstery & trim", rating: "Good" },
      { label: "Electrics & infotainment", rating: "Good" },
      { label: "Climate control", rating: "Good" },
      { label: "Dashboard warning lights", rating: "Good" },
    ],
  },
  {
    name: "Engine Bay",
    icon: Cog,
    items: [
      { label: "Oil condition & level", rating: "Good" },
      { label: "Coolant & fluid levels", rating: "Good" },
      { label: "Belts & hoses", rating: "Good" },
      { label: "Battery condition & terminals", rating: "Good" },
      { label: "Visible leaks", rating: "Good" },
    ],
  },
  {
    name: "Underbody & Suspension",
    icon: Wrench,
    items: [
      { label: "Suspension components", rating: "Good" },
      { label: "Exhaust system", rating: "Good" },
      { label: "Brakes & discs", rating: "Good" },
      { label: "Underbody corrosion", rating: "Good" },
      { label: "Steering components", rating: "Good" },
    ],
  },
  {
    name: "Diagnostics (OBD Scan)",
    icon: ScanLine,
    items: [
      { label: "Stored fault codes", rating: "Good" },
      {
        label: "Fault code history",
        rating: "Fair",
        note: "2 historic fault codes found, cleared roughly 3 months before inspection",
      },
      { label: "Emissions system", rating: "Good" },
      { label: "Live sensor readings", rating: "Good" },
    ],
  },
  {
    name: "Road Test",
    icon: Route,
    items: [
      { label: "Engine performance", rating: "Good" },
      { label: "Gearbox & clutch", rating: "Good" },
      { label: "Braking response", rating: "Good" },
      { label: "Steering & handling", rating: "Good" },
      { label: "Noise, vibration & harshness", rating: "Good" },
    ],
  },
]

function RatingBadge({ rating }: { rating: Rating }) {
  const Icon = ratingIcons[rating]
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${ratingStyles[rating]}`}
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
        <div className="text-center mb-6 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">The Detailed Checklist</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every area we inspect, with a clear rating for each item
          </p>
        </div>

        <p className="text-center italic text-sm text-muted-foreground max-w-2xl mx-auto mb-16">
          This is a shortened sample — your full report includes a complete item-by-item checklist for
          every area inspected.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="border shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul>
                  {category.items.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-start justify-between gap-3 py-2.5 border-b border-border/60 last:border-0"
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
