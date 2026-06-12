"use client"

import type React from "react"

import { Suspense, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

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
        alert("Thank you! We will contact you shortly with a valuation.")
        router.push("/")
      } else {
        alert("Something went wrong. Please try again or contact us directly.")
      }
    } catch (error) {
      alert("Something went wrong. Please try again or contact us directly.")
    } finally {
      setSubmitting(false)
    }
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
