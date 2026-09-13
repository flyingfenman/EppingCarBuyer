"use client"

import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BarChart3,
  ClipboardCheck,
  Megaphone,
  ShieldCheck,
  UserCheck,
} from "lucide-react"

const steps = [
  {
    icon: ClipboardCheck,
    title: "We inspect & price it",
    text: "We inspect the car and price it against live market data.",
  },
  {
    icon: Megaphone,
    title: "We market it properly",
    text: "Professional presentation, advertising and buyer enquiries handled for you.",
  },
  {
    icon: UserCheck,
    title: "We manage the buyer",
    text: "We filter enquiries, arrange viewings and handle the negotiation.",
  },
  {
    icon: Banknote,
    title: "You get the sale proceeds",
    text: "The buyer pays you for the car. We only charge our success fee if it sells.",
  },
]

const proof = [
  { icon: BadgeCheck, value: "10 days", label: "average time to sell" },
  { icon: BarChart3, value: "Live market data", label: "used to set the asking price" },
  { icon: ShieldCheck, value: "Trade offer fallback", label: "if Market & Sell is not right for you" },
]

const fees = [
  { range: "Under £5,000", fee: "£197.50" },
  { range: "£5,000–£15,000", fee: "£297.50" },
  { range: "Over £15,000", fee: "£447.50" },
]

const choices = [
  {
    title: "Sell it yourself",
    line: "Potentially strong money",
    note: "You handle the advert, messages, viewings, no-shows and negotiation.",
  },
  {
    title: "Motorway / Carwow",
    line: "Fast and convenient",
    note: "Usually a trade-style route, so convenience can mean giving up some retail value.",
  },
  {
    title: "Market & Sell",
    line: "Professional sale, more value retained",
    note: "We do the selling work while you keep the car and aim closer to retail value.",
    best: true,
  },
]

export function SellForMeSalesFlow() {
  return (
    <section id="how-it-works" className="bg-white py-8 sm:py-10 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
          <div className="px-5 py-7 sm:px-7 lg:px-9">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Simple from your side</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">From clean car to sold car — we handle the hard part.</h2>
              <p className="mt-3 text-muted-foreground">
                One joined-up service designed to make your car easier to buy without you having to become the salesperson.
              </p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-4">
              {steps.map((step, index) => (
                <div key={step.title} className="relative rounded-2xl border border-border bg-muted/20 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-muted-foreground">0{index + 1}</span>
                  </div>
                  <h3 className="mt-3 font-bold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                  {index < steps.length - 1 && (
                    <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-primary/40 md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="border-y border-border bg-muted/20 px-5 py-4 sm:px-7 lg:px-9">
            <div className="grid gap-3 sm:grid-cols-3">
              {proof.map((item) => (
                <div key={item.value} className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-bold text-foreground">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-border px-5 py-6 sm:px-7 lg:border-b-0 lg:border-r lg:px-9">
              <p className="text-sm font-bold text-primary">No upfront cost · No sale, no fee</p>
              <h3 className="mt-1 text-2xl font-bold">Your success fee is based on the car&apos;s value.</h3>
              <div className="mt-5 space-y-2">
                {fees.map((tier) => (
                  <div key={tier.range} className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
                    <span className="text-sm font-semibold text-muted-foreground">{tier.range}</span>
                    <span className="text-lg font-black text-foreground">{tier.fee}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-5 py-6 sm:px-7 lg:px-9">
              <p className="text-sm font-bold text-primary">Why the model makes sense</p>
              <h3 className="mt-1 text-2xl font-bold">Keep the convenience. Give away less of the value.</h3>
              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {choices.map((choice) => (
                  <div
                    key={choice.title}
                    className={`rounded-xl border p-3.5 ${
                      choice.best ? "border-primary/30 bg-primary/5" : "border-border bg-muted/15"
                    }`}
                  >
                    <p className={`text-sm font-black ${choice.best ? "text-primary" : "text-foreground"}`}>{choice.title}</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{choice.line}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{choice.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
