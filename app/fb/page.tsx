"use client"

import { useState } from "react"
import Image from "next/image"
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
  Phone,
  Star,
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
        setError(`Your previous MOT shows ${vehicleInfo.lastMotMileage.toLocaleString()} miles. Please enter a higher mileage.`)
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
          (window as unknown as { fbq: (a: string, e: string) => void }).fbq("track", "Lead")
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
    <div className="min-h-screen bg-[#0f1117] flex flex-col font-sans">
      {/* Hero Banner */}
      <div className="relative w-full h-48 md:h-64 overflow-hidden">
        <Image
          src="/images/fb-hero-car.png"
          alt="Sell your car for the best price"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1117]/60 via-[#0f1117]/30 to-[#0f1117]" />

        {/* Logo overlay */}
        <div className="absolute top-4 left-0 right-0 flex justify-center">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#e8a020] flex items-center justify-center shadow-lg">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight drop-shadow">Epping Car Buyer</span>
          </div>
        </div>

        {/* Hero headline */}
        <div className="absolute bottom-6 left-0 right-0 text-center px-4">
          <p className="text-[#e8a020] text-sm font-semibold uppercase tracking-widest mb-1">
            🚗 Facebook Exclusive
          </p>
          <h1 className="text-white text-2xl md:text-3xl font-bold text-balance drop-shadow-lg">
            Get a Free Instant Car Valuation
          </h1>
        </div>
      </div>

      {/* Trust bar */}
      <div className="bg-[#1a1d27] border-b border-white/5 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-around">
          <TrustBadge icon={<Clock className="w-4 h-4 text-[#e8a020]" />} text="Same Day Payment" />
          <div className="w-px h-6 bg-white/10" />
          <TrustBadge icon={<Banknote className="w-4 h-4 text-[#e8a020]" />} text="Best Prices Paid" />
          <div className="w-px h-6 bg-white/10" />
          <TrustBadge icon={<Shield className="w-4 h-4 text-[#e8a020]" />} text="Safe & Secure" />
        </div>
      </div>

      {/* Step Progress */}
      <div className="bg-[#0f1117] px-4 pt-5 pb-2 max-w-lg mx-auto w-full">
        <div className="flex items-center gap-2">
          {["Your Car", "Details", "Contact"].map((label, i) => {
            const step = i + 1
            const isActive = step === currentStep
            const isDone = step < currentStep
            return (
              <div key={label} className="flex items-center flex-1 gap-2">
                <div className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className={cn(
                      "h-1.5 w-full rounded-full transition-all duration-500",
                      isDone ? "bg-[#e8a020]" : isActive ? "bg-[#e8a020]/70" : "bg-white/10"
                    )}
                  />
                  <span
                    className={cn(
                      "text-[10px] font-medium transition-colors",
                      isActive ? "text-[#e8a020]" : isDone ? "text-[#e8a020]/60" : "text-white/20"
                    )}
                  >
                    {isDone ? <Check className="w-3 h-3 inline" /> : null} {label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Form card */}
      <main className="flex-1 px-4 pb-8 max-w-lg mx-auto w-full">
        <div className="bg-[#1a1d27] rounded-2xl border border-white/8 shadow-2xl overflow-hidden">
          <div className="p-6 md:p-8">
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

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mt-8">
              {currentStep < TOTAL_STEPS ? (
                <Button
                  onClick={handleNext}
                  className="w-full h-14 text-lg font-bold bg-[#e8a020] hover:bg-[#d4911a] text-white rounded-xl shadow-lg shadow-[#e8a020]/20 transition-all duration-200 hover:-translate-y-0.5"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" data-icon="inline-end" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-bold bg-[#e8a020] hover:bg-[#d4911a] text-white rounded-xl shadow-lg shadow-[#e8a020]/20 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" data-icon="inline-start" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" data-icon="inline-start" />
                      Get My Free Valuation
                    </>
                  )}
                </Button>
              )}

              {currentStep > 1 && (
                <Button
                  onClick={handleBack}
                  variant="ghost"
                  className="w-full h-11 text-white/40 hover:text-white/70 hover:bg-white/5 rounded-xl"
                >
                  <ArrowLeft className="w-4 h-4" data-icon="inline-start" />
                  Back
                </Button>
              )}
            </div>
          </div>

          {/* Social proof footer */}
          <div className="border-t border-white/8 bg-[#0f1117]/60 px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#e8a020] text-[#e8a020]" />
              ))}
            </div>
            <p className="text-white/40 text-xs text-right">
              Rated <strong className="text-white/60">5 stars</strong> · 200+ cars bought locally
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-white/20 text-[11px] text-center mt-4 px-4 leading-relaxed">
          By submitting you agree to our{" "}
          <Link href="/privacy-policy" className="underline hover:text-white/40">privacy policy</Link>.
          {" "}We will never share your data with third parties.
        </p>
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
      <div className="space-y-2">
        <p className="text-[#e8a020] text-xs font-semibold uppercase tracking-widest">Step 1 of 3</p>
        <h2 className="text-white text-2xl font-bold text-balance">What&apos;s your reg number?</h2>
        <p className="text-white/50 text-sm">We&apos;ll instantly look up your car details for you.</p>
      </div>

      <div className="space-y-3">
        {/* UK number plate style input */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-[#003399] rounded-l-xl flex items-center justify-center">
            <span className="text-white text-[8px] font-bold rotate-0 tracking-tight text-center leading-tight">
              GB
            </span>
          </div>
          <input
            type="text"
            value={registration}
            onChange={(e) => onChange(e.target.value.toUpperCase().replace(/[^A-Z0-9 ]/g, ""))}
            placeholder="AB12 CDE"
            maxLength={8}
            className="w-full pl-12 pr-4 h-16 text-2xl font-bold tracking-[0.2em] text-center uppercase bg-[#ffd500] text-black border-2 border-black/20 rounded-xl placeholder:text-black/30 focus:outline-none focus:border-black/40 focus:ring-2 focus:ring-[#ffd500]/50 shadow-lg"
            style={{ fontFamily: "var(--font-charles-wright, monospace)" }}
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center font-medium">{error}</p>
        )}

        {isLoading && (
          <div className="flex items-center justify-center gap-2 text-white/50">
            <Loader2 className="w-4 h-4 animate-spin text-[#e8a020]" />
            <span className="text-sm">Looking up your car...</span>
          </div>
        )}

        {vehicleInfo && !isLoading && (
          <div className="bg-white/5 border border-[#e8a020]/30 rounded-xl p-4 animate-in slide-in-from-bottom-3 duration-300">
            <div className="flex items-center gap-2 text-[#e8a020] mb-3">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Vehicle Found</span>
            </div>
            <p className="text-white font-bold text-xl">
              {vehicleInfo.make} {vehicleInfo.model}
            </p>
            <div className="grid grid-cols-3 gap-2 mt-3">
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
    <div className="bg-white/5 rounded-lg px-3 py-2">
      <p className="text-white/40 text-[10px] uppercase tracking-wider">{label}</p>
      <p className="text-white text-sm font-medium mt-0.5 truncate">{value}</p>
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
      <div className="space-y-2">
        <p className="text-[#e8a020] text-xs font-semibold uppercase tracking-widest">Step 2 of 3</p>
        <h2 className="text-white text-2xl font-bold text-balance">Tell us about your car</h2>
        {vehicleInfo && (
          <p className="text-white/50 text-sm">
            {vehicleInfo.yearOfManufacture} {vehicleInfo.make} {vehicleInfo.model}
          </p>
        )}
      </div>

      <div className="space-y-5">
        {/* Mileage */}
        <div className="space-y-2">
          <label className="text-white/70 text-sm font-medium">Current mileage</label>
          <div className="relative">
            <Input
              type="text"
              inputMode="numeric"
              value={mileage}
              onChange={(e) => onMileageChange(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="e.g. 45000"
              className={cn(
                "h-13 bg-white/5 border text-white placeholder:text-white/25 rounded-xl pr-16 focus:ring-2 focus:ring-[#e8a020]/40 h-12",
                vehicleInfo?.lastMotMileage && mileage && parseInt(mileage) < vehicleInfo.lastMotMileage
                  ? "border-red-500/60"
                  : "border-white/10 focus:border-[#e8a020]/60"
              )}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">
              miles
            </span>
          </div>
          {vehicleInfo?.lastMotMileage && mileage && parseInt(mileage) < vehicleInfo.lastMotMileage && (
            <p className="text-red-400 text-xs">
              Previous MOT recorded {vehicleInfo.lastMotMileage.toLocaleString()} miles — please enter a higher value.
            </p>
          )}
        </div>

        {/* Condition */}
        <div className="space-y-2">
          <label className="text-white/70 text-sm font-medium">Overall condition</label>
          <div className="grid grid-cols-2 gap-2">
            {conditionOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onConditionChange(opt.value)}
                className={cn(
                  "flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-150",
                  condition === opt.value
                    ? "border-[#e8a020] bg-[#e8a020]/10 text-white"
                    : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/70"
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
          <label className="text-white/70 text-sm font-medium">Service history</label>
          <div className="flex gap-2">
            {historyOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onServiceHistoryChange(opt)}
                className={cn(
                  "flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all duration-150",
                  serviceHistory === opt
                    ? "border-[#e8a020] bg-[#e8a020]/10 text-white"
                    : "border-white/10 bg-white/5 text-white/40 hover:border-white/20 hover:text-white/60"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
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
      <div className="space-y-2">
        <p className="text-[#e8a020] text-xs font-semibold uppercase tracking-widest">Step 3 of 3</p>
        <h2 className="text-white text-2xl font-bold text-balance">Where do we send your offer?</h2>
        <p className="text-white/50 text-sm">We&apos;ll be in touch within minutes.</p>
      </div>

      {/* Car summary pill */}
      {vehicleInfo && (
        <div className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl px-4 py-3">
          <div className="w-9 h-9 rounded-full bg-[#e8a020]/15 flex items-center justify-center flex-shrink-0">
            <Car className="w-4 h-4 text-[#e8a020]" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm truncate">
              {vehicleInfo.make} {vehicleInfo.model}
            </p>
            <p className="text-white/40 text-xs">
              {formData.registration} &middot; {formData.mileage ? parseInt(formData.mileage).toLocaleString() : "–"} miles
            </p>
          </div>
          <CheckCircle2 className="w-5 h-5 text-[#e8a020] flex-shrink-0 ml-auto" />
        </div>
      )}

      <div className="space-y-4">
        <FormField label="Your full name" required>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="John Smith"
            className="h-12 bg-white/5 border border-white/10 text-white placeholder:text-white/25 rounded-xl focus:border-[#e8a020]/60 focus:ring-2 focus:ring-[#e8a020]/20"
          />
        </FormField>

        <FormField label="Phone number" required>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="07123 456789"
              className="h-12 bg-white/5 border border-white/10 text-white placeholder:text-white/25 rounded-xl pl-9 focus:border-[#e8a020]/60 focus:ring-2 focus:ring-[#e8a020]/20"
            />
          </div>
        </FormField>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Email address" required>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="you@email.com"
              className="h-12 bg-white/5 border border-white/10 text-white placeholder:text-white/25 rounded-xl focus:border-[#e8a020]/60 focus:ring-2 focus:ring-[#e8a020]/20"
            />
          </FormField>
          <FormField label="Postcode" required>
            <Input
              type="text"
              value={formData.postcode}
              onChange={(e) => updateField("postcode", e.target.value.toUpperCase())}
              placeholder="CM16 4EH"
              maxLength={8}
              className="h-12 bg-white/5 border border-white/10 text-white placeholder:text-white/25 rounded-xl uppercase focus:border-[#e8a020]/60 focus:ring-2 focus:ring-[#e8a020]/20"
            />
          </FormField>
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}
      </div>
    </div>
  )
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-white/60 text-xs font-medium uppercase tracking-wider">
        {label}{required && <span className="text-[#e8a020] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen({ name }: { name: string }) {
  return (
    <div className="min-h-screen bg-[#0f1117] flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Animated check */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-[#e8a020] flex items-center justify-center shadow-2xl shadow-[#e8a020]/30 animate-in zoom-in-50 duration-500">
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
          <div className="absolute -top-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center animate-bounce shadow">
            <Sparkles className="w-4 h-4 text-[#e8a020]" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-white text-3xl font-bold">
            Thanks, {name.split(" ")[0]}! 🎉
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            We&apos;ve received your details and will be in touch <strong className="text-white">within the hour</strong> with your free valuation.
          </p>
        </div>

        {/* WhatsApp CTA */}
        <div className="bg-[#1a1d27] rounded-2xl border border-white/8 p-6 space-y-4">
          <p className="text-white/50 text-sm">Want a faster response? Chat directly with us:</p>
          <a
            href="https://wa.me/441992367909"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full h-13 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#25D366]/20"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/30 hover:text-white/60 text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to homepage
        </Link>
      </div>
    </div>
  )
}

// ─── Trust Badge ─────────────────────────────────────────────────────────────

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-white/60 text-xs font-medium">{text}</span>
    </div>
  )
}
