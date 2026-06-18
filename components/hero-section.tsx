"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Zap, ShieldCheck, Handshake } from "lucide-react"

const trustBadges = [
  {
    icon: Zap,
    label: "Instant Payment",
    // top-left of the photo
    position: "top-6 -left-3 sm:left-0 lg:-left-6",
    delay: 500,
  },
  {
    icon: ShieldCheck,
    label: "Reliable",
    // right side, mid height
    position: "top-1/3 -right-3 sm:right-0 lg:-right-6",
    delay: 700,
  },
  {
    icon: Handshake,
    label: "Honest",
    // bottom-left of the photo
    position: "bottom-16 -left-3 sm:left-2 lg:-left-6",
    delay: 900,
  },
]

export function HeroSection() {
  const [registration, setRegistration] = useState("")
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (registration.trim()) {
      router.push(`/vehicle-details?reg=${encodeURIComponent(registration.trim())}`)
    }
  }

  return (
    <div className="relative bg-white">
      <div className="container mx-auto px-4 py-10 lg:py-16">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-center">
          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
                Trusted by 300+ customers
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight whitespace-nowrap">
                Sell Your Car <span className="text-primary">In Minutes</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Get an instant online valuation. We buy any car, any condition. Payment within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                value={registration}
                onChange={(e) => setRegistration(e.target.value.toUpperCase())}
                placeholder="ENTER YOUR REG"
                className="text-center text-6xl h-24 font-bold uppercase tracking-[0.15em] !bg-[#ffd500] !text-black !border-0 placeholder:!text-black placeholder:!opacity-100 focus:!bg-[#ffd500] focus:!border-0 focus:!ring-4 focus:!ring-primary/20 rounded-xl transition-all duration-200"
                style={{ fontFamily: "var(--font-charles-wright), monospace", fontSize: "2.55rem" }}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full h-16 text-lg font-semibold bg-primary hover:bg-primary/90 transition-colors duration-200 group"
              >
                Get Instant Valuation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>

              <p className="text-sm text-muted-foreground text-center">Free • No obligation • Takes 30 seconds</p>
            </form>

            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-foreground">£83K+</div>
                <div className="text-sm text-muted-foreground">Paid out this month</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">4.9/5</div>
                <div className="text-sm text-muted-foreground">Customer rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">5 mins</div>
                <div className="text-sm text-muted-foreground">Instant payment time</div>
              </div>
            </div>
          </div>

          {/* Photo Section */}
          <div className="relative flex justify-center px-10">
            {/* Photo that drops in on load */}
            <div
              className={`relative w-full max-w-xs mx-auto transition-all duration-1000 ease-out ${
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

            {/* Floating trust badges dotted around the photo */}
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
