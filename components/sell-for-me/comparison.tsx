"use client"

import { X, Check, Minus } from "lucide-react"

const comparisons = [
  {
    name: "Private Sale",
    tagline: "Do it yourself",
    pros: ["Potentially highest price"],
    cons: [
      "Endless messages and calls",
      "Time-wasters and no-shows",
      "Strangers at your door",
      "Scams and fraud risk",
      "Negotiation stress",
    ],
    verdict: "hassle",
  },
  {
    name: "Motorway / CarGurus",
    tagline: "Quick but cheap",
    pros: ["Fast and easy"],
    cons: [
      "Trade-in prices only",
      "Typically 20-30% below retail",
      "No negotiation",
      "Take it or leave it",
    ],
    verdict: "lowball",
  },
  {
    name: "Sell It For Me",
    tagline: "The sweet spot",
    pros: [
      "Closer to retail price",
      "No upfront cost",
      "We handle everything",
      "Professional marketing",
      "Serious buyers only",
      "You stay in control",
    ],
    cons: [],
    verdict: "best",
  },
]

export function SellForMeComparison() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">Why Choose Us?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We sit in the sweet spot between hassle and lowball offers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {comparisons.map((option) => (
            <div
              key={option.name}
              className={`rounded-2xl p-6 ${
                option.verdict === "best"
                  ? "bg-primary text-white ring-2 ring-primary shadow-xl"
                  : "bg-muted/50"
              }`}
            >
              <div className="space-y-4">
                <div>
                  <h3 className={`text-xl font-bold ${option.verdict === "best" ? "text-white" : "text-foreground"}`}>
                    {option.name}
                  </h3>
                  <p className={`text-sm ${option.verdict === "best" ? "text-white/80" : "text-muted-foreground"}`}>
                    {option.tagline}
                  </p>
                </div>

                <div className="space-y-2">
                  {option.pros.map((pro) => (
                    <div key={pro} className="flex items-start gap-2">
                      <Check
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          option.verdict === "best" ? "text-emerald-300" : "text-emerald-600"
                        }`}
                      />
                      <span className={`text-sm ${option.verdict === "best" ? "text-white" : "text-foreground"}`}>
                        {pro}
                      </span>
                    </div>
                  ))}
                  {option.cons.map((con) => (
                    <div key={con} className="flex items-start gap-2">
                      <X
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          option.verdict === "best" ? "text-red-300" : "text-red-500"
                        }`}
                      />
                      <span
                        className={`text-sm ${option.verdict === "best" ? "text-white/80" : "text-muted-foreground"}`}
                      >
                        {con}
                      </span>
                    </div>
                  ))}
                </div>

                {option.verdict !== "best" && (
                  <div className="pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Minus className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {option.verdict === "hassle" ? "Too much effort" : "Leaves money on the table"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
