"use client"

import { Gauge, CalendarClock, BadgeCheck } from "lucide-react"

const stats = [
  {
    icon: Gauge,
    value: "93/100",
    label: "Retail Rating",
  },
  {
    icon: CalendarClock,
    value: "28 Days",
    label: "Average Time To Sell",
  },
  {
    icon: BadgeCheck,
    value: "Independently valued",
    label: "Not guessed",
  },
]

export function SellForMeBuiltOnData() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-balance">Built On Real Data</h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-8 shadow-lg text-center flex flex-col items-center gap-4"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl lg:text-3xl font-bold text-foreground text-balance">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
          We use the same market data the trade uses, so you know exactly where your car sits before we list it.
        </p>
      </div>
    </section>
  )
}
