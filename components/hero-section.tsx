"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
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

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

            <form action="/market-and-sell#vehicle-details" method="get" className="space-y-4">
              <Input
                type="text"
                name="reg"
                aria-label="Vehicle registration"
                placeholder="ENTER YOUR REG"
                required
                pattern=".*[A-Za-z0-9].*"
                maxLength={16}
                autoCapitalize="characters"
                className="h-20 rounded-xl !border-0 !bg-[#ffd500] text-center font-bold uppercase tracking-[0.08em] !text-black placeholder:!text-black placeholder:!opacity-100 transition-all duration-200 focus:!border-0 focus:!bg-[#ffd500] focus:!ring-4 focus:!ring-primary/20 sm:h-24 sm:tracking-[0.15em]"
                style={{ fontFamily: "var(--font-charles-wright), monospace", fontSize: "clamp(1.4rem, 7vw, 2.55rem)" }}
              />
              <Button
                type="submit"
                size="lg"
                className="group h-16 w-full bg-primary text-lg font-semibold transition-colors duration-200 hover:bg-primary/90"
              >
                Start Market &amp; Sell
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </form>

            <Button
              asChild
              size="lg"
              className="group min-h-16 h-auto w-full whitespace-normal bg-[#0d9488] px-4 py-4 text-center text-lg font-semibold text-white transition-colors duration-200 hover:bg-[#0b7a70]"
            >
              <Link href="/vehicle-inspections">
                In Depth Vehicle Inspections
                <ArrowRight className="ml-2 h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>

            <div className="flex flex-wrap gap-8 pt-2">
              <div>
                <div className="text-3xl font-bold text-foreground">£149.99</div>
                <div className="text-sm text-muted-foreground">Inspections from</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">4.9/5</div>
                <div className="text-sm text-muted-foreground">Customer rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">Same day</div>
                <div className="text-sm text-muted-foreground">Digital inspection report</div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center px-6 sm:px-10">
            <div
              className={`relative mx-auto w-full max-w-xs transition-all duration-1000 ease-out ${
                mounted ? "translate-y-0 opacity-100" : "-translate-y-16 opacity-0"
              }`}
            >
              <Image
                src="/henry.png"
                alt="Henry from Epping Car Buyer"
                width={1500}
                height={2000}
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
