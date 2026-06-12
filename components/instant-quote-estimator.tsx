"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Award, Zap } from "lucide-react"

export function InstantQuoteEstimator() {
  const [mileage, setMileage] = useState([50000])
  const [condition, setCondition] = useState([7])
  const [estimatedValue, setEstimatedValue] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const baseprice = 10000
    const mileageFactor = Math.max(0.5, 1 - mileage[0] / 200000)
    const conditionFactor = condition[0] / 10
    const calculated = Math.round(baseprice * mileageFactor * conditionFactor)

    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 500)

    // Animate counter
    const start = estimatedValue
    const end = calculated
    const duration = 500
    const startTime = Date.now()

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      const current = Math.round(start + (end - start) * progress)
      setEstimatedValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()

    return () => clearTimeout(timer)
  }, [mileage, condition])

  return (
    <div className="bg-gradient-to-br from-primary/10 via-background to-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-4" variant="secondary">
              <Zap className="h-3 w-3 mr-1" />
              Instant Estimate
            </Badge>
            <h2 className="text-4xl font-bold mb-3">See What Your Car Could Be Worth</h2>
            <p className="text-muted-foreground text-lg">Adjust the sliders to get an instant ballpark figure</p>
          </div>

          <Card className="overflow-hidden border-2">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
              <CardTitle className="text-center">
                <div className="text-sm text-muted-foreground mb-2">Estimated Value</div>
                <div
                  className={`text-5xl font-bold text-primary transition-all duration-300 ${isAnimating ? "scale-110" : "scale-100"}`}
                >
                  £{estimatedValue.toLocaleString()}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              {/* Mileage Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-lg">Mileage</label>
                  <span className="text-2xl font-bold text-primary">{mileage[0].toLocaleString()} miles</span>
                </div>
                <Slider
                  value={mileage}
                  onValueChange={setMileage}
                  max={150000}
                  min={5000}
                  step={5000}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5,000</span>
                  <span>150,000</span>
                </div>
              </div>

              {/* Condition Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-lg">Condition</label>
                  <span className="text-2xl font-bold text-primary">{condition[0]}/10</span>
                </div>
                <Slider
                  value={condition}
                  onValueChange={setCondition}
                  max={10}
                  min={1}
                  step={1}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="grid md:grid-cols-3 gap-4 pt-6 border-t">
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">Top Prices</p>
                  <p className="text-xs text-muted-foreground">Market-leading offers</p>
                </div>
                <div className="text-center">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">Instant Quote</p>
                  <p className="text-xs text-muted-foreground">Get your price now</p>
                </div>
                <div className="text-center">
                  <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">No Hassle</p>
                  <p className="text-xs text-muted-foreground">Simple & stress-free</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-4">
            This is an estimate only. Enter your registration for an accurate valuation.
          </p>
        </div>
      </div>
    </div>
  )
}
