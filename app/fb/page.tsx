"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Shield,
  Clock,
  Banknote,
  Car,
  Loader2,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Star,
  Phone,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface FormData {
  registration: string
  mileage: string
  condition: string
  serviceHistory: string
  name: string
  email: string
  phone: string
  postcode: string
}

interface VehicleInfo {
  make: string
  model: string
  yearOfManufacture: number
  colour: string
  fuelType: string
  engineSize?: string
  motExpiryDate?: string
  lastMotMileage?: number
  registration: string
}

const TOTAL_STEPS = 3

export default function FBLeadForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    registration: "",
    mileage: "",
    condition: "",
    serviceHistory: "",
    name: "",
    email: "",
    phone: "",
    postcode: "",
  })
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo | null>(null)
  const [isLoadingVehicle, setIsLoadingVehicle] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const fetchVehicleInfo = async (reg: string) => {
    if (reg.replace(/\s/g, "").length < 5) return
    setIsLoadingVehicle(true)
    setError("")
    setVehicleInfo(null)
    try {
      const response = await fetch(`/api/vehicle?reg=${encodeURIComponent(reg)}`)
      if (response.ok) {
        const data = await response.json()
        if (data.make && data.model) {
          const lastMotMileage = data.motTests?.[0]?.odometerValue
          setVehicleInfo({
            make: data.make,
            model: data.model,
            yearOfManufacture: data.yearOfManufacture || data.manufactureYear,
            colour: data.primaryColour || data.colour,
            fuelType: data.fuelType,
            engineSize: data.engineSize,
            motExpiryDate: data.motTests?.[0]?.expiryDate,
            lastMotMileage: lastMotMileage ? parseInt(lastMotMileage) : undefined,
            registration: reg.toUpperCase(),
          })
        }
      }
    } catch {
      setVehicleInfo(null)
    } finally {
      setIsLoadingVehicle(false)
    }
  }

  const handleNext = () => {
    if (currentStep === 1 && !formData.registration.trim()) {
      setError("Please enter your registration number")
      return
    }
    if (currentStep === 2) {
      if (!formData.mileage.trim()) {
        setError("Please enter your mileage")
        return
      }
      if (vehicleInfo?.lastMotMileage && parseInt(formData.mileage) < vehicleInfo.lastMotMileage) {
        setError(
          `Your previous MOT shows ${vehicleInfo.lastMotMileage.toLocaleString()} miles. Please enter a higher mileage.`
        )
        return
      }
    }
    setError("")
    setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }

  const handleBack = () => {
    setCurrentStep((s) => Math.max(s - 1, 1))
    setError("")
  }

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.postcode.trim()) {
      setError("Please fill in all fields")
      return
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }
    setIsSubmitting(true)
    setError("")
    try {
      const response = await fetch("/api/submit-valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registration: formData.registration,
          mileage: formData.mileage,
          condition: formData.condition || "Not specified",
          serviceHistory: formData.serviceHistory || "Not specified",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          additionalInfo: `Postcode: ${formData.postcode}. Source: Facebook Ad`,
        }),
      })
      if (response.ok) {
        setIsSubmitted(true)
        if (typeof window !== "undefined" && (window as unknown as { fbq?: (a: string, e: string) => void }).fbq) {
          ;(window as unknown as { fbq: (a: string, e: string) => void }).fbq("track", "Lead")
        }
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  if (isSubmitted) {
    return <SuccessScreen name={formData.name} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background flex flex-col font-sans">
      {/* Header */}
      <header className="py-5 px-4 bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-center max-w-2xl">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground text-lg">Epping Car Buyer</span>
          </Link>
        </div>
      </header>

      {/* Hero headline */}
      <div className="bg-primary px-4 py-6 text-center">
        <div className="max-w-lg mx-auto space-y-2">
          <h1 className="text-white text-2xl md:text-3xl font-bold text-balance">
            Get a Free Instant Car Valuation
          </h1>
          <p className="text-white/80 text-sm">
            Find out what your car is worth — takes less than 2 minutes
          </p>
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mt-1">
            <Sparkles className="w-4 h-4 shrink-0" />
            We will pay more if your car has been well looked after
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="bg-white border-b border-border px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-around">
          <TrustBadge icon={<Clock className="w-4 h-4 text-primary" />} text="Same Day Payment" />
          <div className="w-px h-6 bg-border" />
          <TrustBadge icon={<Banknote className="w-4 h-4 text-primary" />} text="Best Prices Paid" />
          <div className="w-px h-6 bg-border" />
          <TrustBadge icon={<Shield className="w-4 h-4 text-primary" />} text="Safe & Secure" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-secondary border-b border-border">
        <div className="container mx-auto max-w-lg px-4">
          <div className="flex items-center gap-2 py-3">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1 flex items-center gap-2">
                <div
                  className={cn(
                    "h-2 flex-1 rounded-full transition-all duration-500",
                    step <= currentStep ? "bg-primary" : "bg-muted"
                  )}
                />
                {step < 3 && (
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      step < currentStep ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          {/* Step labels */}
          <div className="flex justify-between pb-2 -mt-1">
            {["Your Car", "Details", "Contact"].map((label, index) => (
              <div
                key={label}
                className={cn(
                  "text-xs font-medium transition-colors",
                  index + 1 === currentStep
                    ? "text-primary"
                    : index + 1 < currentStep
                    ? "text-primary/60"
                    : "text-muted-foreground/40"
                )}
              >
                {index + 1 < currentStep && <Check className="w-3 h-3 inline mr-0.5" />}
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form area */}
      <main className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-8 flex-1 flex flex-col max-w-lg">
          {/* Form steps */}
          <div className="flex-1 flex flex-col justify-center">
            {currentStep === 1 && (
              <StepOne
                registration={formData.registration}
                onChange={(val) => {
                  updateField("registration", val.toUpperCase())
                  if (val.replace(/\s/g, "").length >= 5) fetchVehicleInfo(val)
                  else setVehicleInfo(null)
                }}
                vehicleInfo={vehicleInfo}
                isLoading={isLoadingVehicle}
                error={error}
              />
            )}
            {currentStep === 2 && (
              <StepTwo
                mileage={formData.mileage}
                serviceHistory={formData.serviceHistory}
                condition={formData.condition}
                onMileageChange={(val) => updateField("mileage", val)}
                onServiceHistoryChange={(val) => updateField("serviceHistory", val)}
                onConditionChange={(val) => updateField("condition", val)}
                vehicleInfo={vehicleInfo}
                error={error}
              />
            )}
            {currentStep === 3 && (
              <StepThree
                formData={formData}
                updateField={updateField}
                error={error}
                vehicleInfo={vehicleInfo}
              />
            )}
          </div>

          {/* Navigation buttons */}
          <div className="space-y-3 pt-8">
            {currentStep < TOTAL_STEPS ? (
              <Button
                onClick={handleNext}
                className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get My Free Valuation
                  </>
                )}
              </Button>
            )}

            {currentStep > 1 && (
              <Button
                onClick={handleBack}
                variant="ghost"
                className="w-full h-12 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
          </div>

          {/* Social proof */}
          <div className="mt-8 bg-white rounded-2xl border border-border p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground text-xs text-right">
              Rated <strong className="text-foreground">5 stars</strong> · 200+ cars bought locally
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex justify-center gap-4 pt-6 pb-2">
            <TrustBadge icon={<Clock className="w-4 h-4 text-primary" />} text="24hr Payment" />
            <TrustBadge icon={<Banknote className="w-4 h-4 text-primary" />} text="Best Prices" />
            <TrustBadge icon={<Shield className="w-4 h-4 text-primary" />} text="Safe & Secure" />
          </div>

          <p className="text-muted-foreground text-[11px] text-center mt-3 leading-relaxed">
            By submitting you agree to our{" "}
            <Link href="/privacy-policy" className="underline hover:text-foreground">
              privacy policy
            </Link>
            . We will never share your data with third parties.
          </p>
        </div>
      </main>
    </div>
  )
}

// ─── Step 1: Registration ────────────────────────────────────────────────────

function StepOne({
  registration,
  onChange,
  vehicleInfo,
  isLoading,
  error,
}: {
  registration: string
  onChange: (val: string) => void
  vehicleInfo: VehicleInfo | null
  isLoading: boolean
  error: string
}) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Instant Valuation
        </div>
        <h2 className="text-3xl font-bold text-foreground text-balance">
          What&apos;s your reg number?
        </h2>
        <p className="text-muted-foreground">
          We&apos;ll instantly look up your car details for you
        </p>
      </div>

      <div className="space-y-4">
        {/* UK number plate style input */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-[#003399] rounded-l-2xl flex items-center justify-center z-10">
            <span className="text-white text-[8px] font-bold tracking-tight text-center leading-tight">
              GB
            </span>
          </div>
          <input
            type="text"
            value={registration}
            onChange={(e) => onChange(e.target.value.toUpperCase().replace(/[^A-Z0-9 ]/g, ""))}
            placeholder="AB12 CDE"
            maxLength={8}
            className="w-full pl-12 pr-4 h-20 text-2xl font-bold tracking-[0.2em] text-center uppercase bg-[#ffd500] text-black border-2 border-black/10 rounded-2xl placeholder:text-black/30 focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/20 shadow-lg"
            style={{ fontFamily: "var(--font-charles-wright, monospace)" }}
          />
        </div>

        {error && (
          <p className="text-destructive text-sm text-center font-medium">{error}</p>
        )}

        {isLoading && (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-sm">Looking up your car...</span>
          </div>
        )}

        {vehicleInfo && !isLoading && (
          <div className="bg-primary/5 rounded-2xl p-5 border-2 border-primary/20 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-2 text-primary mb-3">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-semibold">Vehicle Found</span>
            </div>
            <p className="font-bold text-xl text-foreground">
              {vehicleInfo.make} {vehicleInfo.model}
            </p>
            <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
              <VehicleChip label="Year" value={String(vehicleInfo.yearOfManufacture)} />
              <VehicleChip label="Colour" value={vehicleInfo.colour} />
              <VehicleChip label="Fuel" value={vehicleInfo.fuelType} />
              {vehicleInfo.engineSize && (
                <VehicleChip label="Engine" value={`${vehicleInfo.engineSize}cc`} />
              )}
              {vehicleInfo.motExpiryDate && (
                <VehicleChip
                  label="MOT"
                  value={new Date(vehicleInfo.motExpiryDate).toLocaleDateString("en-GB", {
                    month: "short",
                    year: "numeric",
                  })}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function VehicleChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background/60 rounded-lg px-3 py-2">
      <p className="text-muted-foreground text-[10px] uppercase tracking-wider">{label}</p>
      <p className="text-foreground text-sm font-medium mt-0.5 truncate">{value}</p>
    </div>
  )
}

// ─── Step 2: Car Details ─────────────────────────────────────────────────────

function StepTwo({
  mileage,
  serviceHistory,
  condition,
  onMileageChange,
  onServiceHistoryChange,
  onConditionChange,
  vehicleInfo,
  error,
}: {
  mileage: string
  serviceHistory: string
  condition: string
  onMileageChange: (val: string) => void
  onServiceHistoryChange: (val: string) => void
  onConditionChange: (val: string) => void
  vehicleInfo: VehicleInfo | null
  error: string
}) {
  const conditionOptions = [
    { value: "Excellent", label: "Excellent", desc: "Like new" },
    { value: "Good", label: "Good", desc: "Minor wear" },
    { value: "Fair", label: "Fair", desc: "Some marks" },
    { value: "Poor", label: "Poor", desc: "Needs work" },
  ]

  const historyOptions = ["Full", "Partial", "None"]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-foreground text-balance">Tell us about your car</h2>
        {vehicleInfo && (
          <p className="text-primary font-medium">
            {vehicleInfo.yearOfManufacture} {vehicleInfo.make} {vehicleInfo.model}
          </p>
        )}
      </div>

      <div className="space-y-5">
        {/* Mileage */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Current mileage</label>
          <div className="relative">
            <Input
              type="text"
              inputMode="numeric"
              value={mileage}
              onChange={(e) => onMileageChange(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="e.g. 45000"
              className={cn(
                "h-14 text-lg text-center bg-background border-2 text-foreground placeholder:text-muted-foreground focus:ring-4 focus:ring-primary/20 rounded-xl pr-16",
                vehicleInfo?.lastMotMileage && mileage && parseInt(mileage) < vehicleInfo.lastMotMileage
                  ? "border-destructive focus:border-destructive"
                  : "border-border focus:border-primary"
              )}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">
              miles
            </span>
          </div>
          {vehicleInfo?.lastMotMileage && mileage && parseInt(mileage) < vehicleInfo.lastMotMileage && (
            <p className="text-destructive text-xs font-medium">
              Previous MOT recorded {vehicleInfo.lastMotMileage.toLocaleString()} miles — please enter a higher value.
            </p>
          )}
        </div>

        {/* Condition */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Overall condition</label>
          <div className="grid grid-cols-2 gap-2">
            {conditionOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onConditionChange(opt.value)}
                className={cn(
                  "flex flex-col items-start p-3 rounded-xl border-2 text-left transition-all duration-150",
                  condition === opt.value
                    ? "border-primary bg-primary/5 text-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                <span className="font-semibold text-sm">{opt.label}</span>
                <span className="text-[11px] mt-0.5 opacity-70">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Service History */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Service history</label>
          <div className="flex gap-2">
            {historyOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onServiceHistoryChange(opt)}
                className={cn(
                  "flex-1 py-3 rounded-xl text-sm font-medium border-2 transition-all duration-150",
                  serviceHistory === opt
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-destructive text-sm text-center font-medium">{error}</p>
        )}
      </div>
    </div>
  )
}

// ─── Step 3: Contact Details ─────────────────────────────────────────────────

function StepThree({
  formData,
  updateField,
  error,
  vehicleInfo,
}: {
  formData: FormData
  updateField: (field: keyof FormData, value: string) => void
  error: string
  vehicleInfo: VehicleInfo | null
}) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
          <CheckCircle2 className="w-4 h-4" />
          Almost there!
        </div>
        <h2 className="text-3xl font-bold text-foreground text-balance">
          Where should we send your quote?
        </h2>
      </div>

      {/* Vehicle summary */}
      {vehicleInfo && (
        <div className="bg-secondary rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
            <Car className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">
              {vehicleInfo.make} {vehicleInfo.model}
            </p>
            <p className="text-sm text-muted-foreground">
              {formData.registration} &bull; {parseInt(formData.mileage || "0").toLocaleString()} miles
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Full name *</label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="John Smith"
            className="h-12 bg-background border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-xl"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Postcode *</label>
          <Input
            type="text"
            value={formData.postcode}
            onChange={(e) => updateField("postcode", e.target.value.toUpperCase())}
            placeholder="e.g. CM16 4AB"
            maxLength={8}
            className="h-12 bg-background border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-xl uppercase"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Email address *</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="john@example.com"
            className="h-12 bg-background border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-xl"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Phone number *</label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="07123 456789"
            className="h-12 bg-background border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-xl"
          />
        </div>

        {error && (
          <p className="text-destructive text-sm text-center font-medium">{error}</p>
        )}
      </div>
    </div>
  )
}

// ─── Success Screen ──────────────────────────────────────────────────────────

function SuccessScreen({ name }: { name: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex flex-col font-sans">
      <header className="py-5 px-4 bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto flex items-center justify-center max-w-2xl">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">Epping Car Buyer</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mx-auto shadow-lg shadow-primary/30">
              <Check className="w-12 h-12 text-primary-foreground" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-4 h-4 text-yellow-800" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-foreground">
              Thanks, {name.split(" ")[0]}!
            </h1>
            <p className="text-muted-foreground text-lg">
              We&apos;ll be in touch shortly with your free car valuation.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <p className="text-muted-foreground mb-4">Want a faster response?</p>
            <a
              href="https://wa.me/441992367909"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to homepage
          </Link>
        </div>
      </main>
    </div>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      {icon}
      <span className="text-xs font-medium">{text}</span>
    </div>
  )
}
