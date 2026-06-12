"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImageSlideshow } from "@/components/image-slideshow"
import { Sparkles } from "lucide-react"

export function ValuationSection() {
  const [registration, setRegistration] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (registration.length > 0) {
      setIsTyping(true)
      const timer = setTimeout(() => setIsTyping(false), 300)
      return () => clearTimeout(timer)
    }
  }, [registration])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (registration.trim()) {
      router.push(`/vehicle-details?reg=${encodeURIComponent(registration.trim())}`)
    } else {
      alert("Please enter a valid registration number.")
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Form */}
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in-left">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                <h2 className="text-4xl lg:text-5xl font-bold">Get Your Free Valuation</h2>
                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <p className="text-lg text-muted-foreground">No obligation. Instant results.</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  value={registration}
                  onChange={(e) => setRegistration(e.target.value.toUpperCase())}
                  placeholder="ENTER YOUR REG"
                  className={`text-center text-6xl h-24 font-bold uppercase tracking-[0.15em] !bg-[#ffd500] !text-black !border-0 placeholder:!text-black placeholder:!opacity-100 focus:!bg-[#ffd500] focus:!border-0 focus:!ring-4 focus:!ring-primary/50 hover:!bg-[#ffdb1a] rounded-xl shadow-lg transition-all duration-300 ${
                    isTyping ? "scale-[1.02]" : "scale-100"
                  }`}
                  style={{ fontFamily: "var(--font-charles-wright), monospace", fontSize: "2.55rem" }}
                />
                {registration && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-xl pointer-events-none" />
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-16 text-xl font-bold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                Get Instant Valuation
              </Button>

              <p className="text-sm text-muted-foreground animate-fade-in">Takes less than 30 seconds</p>
            </form>
          </div>

          {/* Slideshow */}
          <div className="animate-fade-in-right">
            <ImageSlideshow />
          </div>
        </div>
      </div>
    </section>
  )
}
