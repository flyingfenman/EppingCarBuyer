"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  const [registration, setRegistration] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (registration.trim()) {
      router.push(`/vehicle-details?reg=${encodeURIComponent(registration.trim())}`)
    }
  }

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className="relative bg-white">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
                Trusted by 300+ customers
              </div>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-balance">
                Sell Your Car
                <br />
                <span className="text-primary">In Minutes</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg text-pretty leading-relaxed">
                Get an instant online valuation. We buy any car, any condition. Payment within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
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

          {/* Video Section */}
          <div className="relative">
            <video
              ref={videoRef}
              controls={isPlaying}
              className="w-full rounded-2xl shadow-2xl"
              preload="none"
              poster="https://pub-a2f7152982044499ae235745de78c2df.r2.dev/intro-thumbnail.jpg"
              onEnded={() => setIsPlaying(false)}
            >
              <source src="https://pub-a2f7152982044499ae235745de78c2df.r2.dev/intro-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Custom Play Button Overlay */}
            {!isPlaying && (
              <button
                onClick={handlePlayVideo}
                className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors duration-200 rounded-2xl cursor-pointer group"
                aria-label="Play video"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <Play className="w-8 h-8 text-primary fill-primary ml-1" />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
