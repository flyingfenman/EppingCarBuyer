"use client"

import { useState, useEffect, type FormEvent } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Handshake, ShieldCheck, Zap } from "lucide-react"

const trustBadges = [
  {
    icon: Zap,
    label: "Same-Day Report",
    position: "top-6 -left-3 sm:left-0 lg:-left-6",
    delay: 500,
  },
  {
    icon: ShieldCheck,
    label: "Reliable",
    position: "top-1/3 -right-3 sm:right-0 lg:-right-6",
    delay: 700,
  },
  {
    icon: Handshake,
    label: "Honest",
    position: "bottom-16 -left-3 sm:left-2 lg:-left-6",
    delay: 900,
  },
]

type Route = "inspection" | "sell"

// Solid colours match the header buttons; the teal is the header's darker shade so small white text stays readable.
const ROUTES: Array<{ value: Route; title: string; subtitle: string; cardClass: string; subtitleClass: string; circleClass: string; dotClass: string }> = [
  {
    value: "inspection",
    title: "Get it inspected",
    subtitle: "Buying this car? We check it before you pay.",
    cardClass: "bg-[#0b7a70] text-white",
    subtitleClass: "text-white",
    circleClass: "border-white",
    dotClass: "bg-white",
  },
  {
    value: "sell",
    title: "Market & Sell it",
    subtitle: "Selling this car? We sell it for you.",
    cardClass: "bg-[#FFCC00] text-black",
    subtitleClass: "text-black/80",
    circleClass: "border-black",
    dotClass: "bg-black",
  },
]

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [reg, setReg] = useState("")
  const [route, setRoute] = useState<Route | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleContinue = (e: FormEvent) => {
    e.preventDefault()
    if (!route) {
      setError("Please choose whether you'd like it inspected or want us to Market & Sell it.")
      return
    }
    const plate = reg.trim().toUpperCase()
    const query = plate ? `?reg=${encodeURIComponent(plate)}` : ""
    window.location.assign(route === "inspection" ? `/vehicle-inspections${query}#book` : `/market-and-sell${query}#vehicle-details`)
  }

  return (
    <div id="top" className="relative overflow-x-hidden bg-white">
      <div className="container mx-auto px-4 py-10 lg:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                Vehicle Inspections • Market &amp; Sell
              </div>
              <h1 className="text-4xl font-bold leading-tight text-balance sm:text-5xl xl:text-6xl">
                Vehicle Inspection <span className="text-primary">+ Market &amp; Sell</span>
              </h1>
              <p className="text-xl leading-relaxed text-pretty text-muted-foreground">
                At Epping Car Buyer, we offer two specialist services: in-depth vehicle inspections to help you buy with confidence, and our managed Market &amp; Sell service to help you get more for your vehicle.
              </p>
            </div>

            <form onSubmit={handleContinue} noValidate className="space-y-4">
              <Input
                type="text"
                name="reg"
                value={reg}
                onChange={(e) => setReg(e.target.value)}
                aria-label="Vehicle registration"
                placeholder="ENTER YOUR REG"
                maxLength={16}
                autoCapitalize="characters"
                autoComplete="off"
                spellCheck={false}
                className="h-20 rounded-xl !border-0 !bg-[#ffd500] text-center font-bold uppercase tracking-[0.08em] !text-black placeholder:!text-black placeholder:!opacity-100 transition-all duration-200 focus:!border-0 focus:!bg-[#ffd500] focus:!ring-4 focus:!ring-primary/20 sm:h-24 sm:tracking-[0.15em]"
                style={{ fontFamily: "var(--font-charles-wright), monospace", fontSize: "clamp(1.4rem, 7vw, 2.55rem)" }}
              />

              <fieldset>
                <legend className="text-lg font-semibold text-foreground">What would you like us to do?</legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {ROUTES.map((option) => {
                    const selected = route === option.value
                    return (
                      <label
                        key={option.value}
                        className={`flex min-h-16 cursor-pointer items-start gap-3 rounded-2xl p-4 shadow-sm transition hover:brightness-95 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-primary/40 ${option.cardClass} ${
                          selected ? "ring-4 ring-primary ring-offset-2" : route ? "opacity-60" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="route"
                          value={option.value}
                          checked={selected}
                          onChange={() => {
                            setRoute(option.value)
                            setError("")
                          }}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${option.circleClass}`}
                        >
                          {selected && <span className={`h-3 w-3 rounded-full ${option.dotClass}`} />}
                        </span>
                        <span>
                          <span className="block text-lg font-bold leading-tight">{option.title}</span>
                          <span className={`mt-1 block text-sm font-medium ${option.subtitleClass}`}>{option.subtitle}</span>
                        </span>
                      </label>
                    )
                  })}
                </div>
              </fieldset>

              {error && (
                <p role="alert" className="text-base font-medium text-red-700">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                className="group h-16 w-full bg-primary text-lg font-semibold transition-colors duration-200 hover:bg-primary/90"
              >
                {route === "inspection" ? "Book my inspection" : route === "sell" ? "Start Market & Sell" : "Continue"}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </form>
          </div>

          <div className="relative flex justify-center px-6 sm:px-10">
            <div
              className={`relative mx-auto w-full max-w-xs transition-all duration-1000 ease-out ${
                mounted ? "translate-y-0 opacity-100" : "-translate-y-16 opacity-0"
              }`}
            >
              <Image
                src="/henry.webp"
                alt="Henry from Epping Car Buyer"
                width={750}
                height={1000}
                sizes="(min-width: 1024px) 320px, 80vw"
                priority
                className="h-auto w-full object-contain"
              />
            </div>

            {trustBadges.map(({ icon: Icon, label, position, delay }) => (
              <div
                key={label}
                className={`absolute z-20 ${position} transition-all duration-700 ease-out ${
                  mounted ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-90 opacity-0"
                }`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                <div className="animate-float" style={{ animationDelay: `${delay}ms` }}>
                  <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-xl ring-1 ring-black/5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </span>
                    <span className="whitespace-nowrap text-sm font-semibold text-foreground">{label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
