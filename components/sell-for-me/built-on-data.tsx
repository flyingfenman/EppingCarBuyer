"use client"

import { CalendarClock, BadgeCheck, ShieldCheck } from "lucide-react"

const stats = [
  {
    icon: CalendarClock,
    value: "14 Days",
    label: "Average Time To Sell",
  },
  {
    icon: ShieldCheck,
    value: "Trade Price Fallback",
    label: "Not happy? Our competitive trade offer is always there",
  },
  {
    icon: BadgeCheck,
    value: "Real-Time Data",
    label: "Priced against live market, not guesswork",
  },
]

export function SellForMeBuiltOnData() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">Built On Real Data</h2>
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

        <p className="mt-6 sm:mt-8 lg:mt-10 text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
          We use the same market data the trade uses, so you know exactly where your car sits before we list it.
        </p>
      </div>
    </section>
  )
}
