"use client"

import type React from "react"

import { Suspense, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Check, ArrowRight, MessageCircle } from "lucide-react"

function ContinueContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const reg = searchParams.get("reg") || ""

  const [formData, setFormData] = useState({
    registration: reg,
    mileage: "",
    condition: "",
    serviceHistory: "",
    name: "",
    email: "",
    phone: "",
    postcode: "",
    additionalInfo: "",
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/submit-valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          additionalInfo: `Postcode: ${formData.postcode}${formData.additionalInfo ? `\n${formData.additionalInfo}` : ''}`,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        setError("Something went wrong. Please try again or contact us directly.")
      }
    } catch (error) {
      setError("Something went wrong. Please try again or contact us directly.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="text-center space-y-8 py-10">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto shadow-lg shadow-primary/30">
              <Check className="w-10 h-10 text-primary-foreground" />
            </div>

            <div className="space-y-3">
              <h1 className="text-2xl font-bold text-foreground">
                Thanks, {formData.name.split(" ")[0] || "there"}!
              </h1>
              <p className="text-muted-foreground text-lg">
                We will be in touch shortly with your free car valuation.
              </p>
            </div>

            <div className="bg-muted/40 rounded-2xl p-6 border border-dashed border-border text-left space-y-3">
              <p className="font-semibold text-foreground">Not the number you were hoping for?</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You don&apos;t have to accept our first offer. Our Market &amp; Sell service lists your car
                for a price closer to retail — no upfront cost, no obligation.
              </p>
              <Link
                href="/market-and-sell"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                See how Market &amp; Sell works
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <a
              href="https://wa.me/441992367909"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp for a faster response
            </a>

            <Button variant="ghost" onClick={() => router.push("/")}>
              Back to homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Complete Your Valuation Request</CardTitle>
          <CardDescription>
            Please provide additional details about your vehicle to receive an accurate valuation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vehicle Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Vehicle Information</h3>

              <div>
                <Label htmlFor="registration">Registration Number</Label>
                <Input id="registration" value={formData.registration} disabled className="bg-muted" />
              </div>

              <div>
                <Label htmlFor="mileage">Current Mileage *</Label>
                <Input
                  id="mileage"
                  type="number"
                  placeholder="e.g., 45000"
                  required
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="condition">Overall Condition *</Label>
                <Select
                  required
                  value={formData.condition}
                  onValueChange={(value) => setFormData({ ...formData, condition: value })}
                >
                  <SelectTrigger id="condition">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="serviceHistory">Service History *</Label>
                <Select
                  required
                  value={formData.serviceHistory}
                  onValueChange={(value) => setFormData({ ...formData, serviceHistory: value })}
                >
                  <SelectTrigger id="serviceHistory">
                    <SelectValue placeholder="Select service history" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Service History</SelectItem>
                    <SelectItem value="partial">Partial Service History</SelectItem>
                    <SelectItem value="none">No Service History</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>

            {/* Contact Information */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-lg">Contact Information</h3>

              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Smith"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="postcode">Postcode *</Label>
                <Input
                  id="postcode"
                  type="text"
                  placeholder="e.g. PE9 1AB"
                  required
                  maxLength={8}
                  value={formData.postcode}
                  onChange={(e) => setFormData({ ...formData, postcode: e.target.value.toUpperCase() })}
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="01205 212339"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Any damage, modifications, or other details we should know about..."
                  rows={4}
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                />
              </div>
            </div>

            {error && <p className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-lg">{error}</p>}

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Valuation Request"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ContinuePage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <ContinueContent />
    </Suspense>
  )
}
