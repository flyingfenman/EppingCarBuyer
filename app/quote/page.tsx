"use client"

import { useState } from "react"
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
  MessageCircle
} from "lucide-react"
import Link from "next/link"

interface FormData {
  registration: string
  mileage: string
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

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    registration: "",
    mileage: "",
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
    if (reg.length < 5) return
    setIsLoadingVehicle(true)
    setError("")
    setVehicleInfo(null)
    try {
      const response = await fetch(`/api/vehicle?reg=${encodeURIComponent(reg)}`)
      if (response.ok) {
        const data = await response.json()
        // Only set vehicle info if we got valid data back with make and model
        if (data.make && data.model) {
          // Get the most recent MOT test mileage
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
      } else {
        setVehicleInfo(null)
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
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setError("")
    }
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
          condition: "Standard",
          serviceHistory: formData.serviceHistory || "Not specified",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          additionalInfo: `Postcode: ${formData.postcode}`,
        }),
      })
      
      if (response.ok) {
        setIsSubmitted(true)
        if (typeof window !== "undefined" && (window as unknown as { fbq?: (action: string, event: string) => void }).fbq) {
          (window as unknown as { fbq: (action: string, event: string) => void }).fbq("track", "Lead")
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
    setFormData(prev => ({ ...prev, [field]: value }))
    setError("")
  }

  const progress = (currentStep / TOTAL_STEPS) * 100

  if (isSubmitted) {
    return <SuccessScreen name={formData.name} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background flex flex-col">
      {/* Header */}
      <header className="py-5 px-4 bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-center max-w-2xl">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">Epping Car Buyer</span>
          </Link>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-secondary">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="flex items-center gap-2 py-3">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1 flex items-center gap-2">
                <div 
                  className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                    step <= currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
                {step < 3 && (
                  <div className={`w-2 h-2 rounded-full ${step < currentStep ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-8 flex-1 flex flex-col max-w-lg">
          
          {/* Step Labels */}
          <div className="flex justify-center gap-8 mb-8">
            {["Your Car", "Details", "Contact"].map((label, index) => (
              <div 
                key={label}
                className={`text-sm font-medium transition-colors ${
                  index + 1 === currentStep 
                    ? 'text-primary' 
                    : index + 1 < currentStep 
                      ? 'text-primary/70'
                      : 'text-muted-foreground/50'
                }`}
              >
                {index + 1 < currentStep && <Check className="w-4 h-4 inline mr-1" />}
                {label}
              </div>
            ))}
          </div>

          {/* Form Steps */}
          <div className="flex-1 flex flex-col justify-center">
            {currentStep === 1 && (
              <StepOne
                registration={formData.registration}
                onChange={(val) => {
                  updateField("registration", val.toUpperCase())
                  // Only fetch when we have a full reg (typically 7 chars for UK plates)
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
                onMileageChange={(val) => updateField("mileage", val)}
                onServiceHistoryChange={(val) => updateField("serviceHistory", val)}
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

          {/* Navigation Buttons */}
          <div className="space-y-3 pt-8">
            {currentStep < 3 ? (
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
                    Submitting...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get My Free Quote
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

          {/* Trust Badges */}
          <div className="flex justify-center gap-4 pt-8 pb-4">
            <TrustBadge icon={<Clock className="w-4 h-4 text-primary" />} text="24hr Payment" />
            <TrustBadge icon={<Banknote className="w-4 h-4 text-primary" />} text="Best Prices" />
            <TrustBadge icon={<Shield className="w-4 h-4 text-primary" />} text="Safe & Secure" />
          </div>
        </div>
      </main>
    </div>
  )
}

function StepOne({ 
  registration, 
  onChange, 
  vehicleInfo, 
  isLoading,
  error 
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
        <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
          What car are you selling?
        </h1>
        <p className="text-muted-foreground">
          Enter your reg and we will find your car
        </p>
      </div>

      <div className="space-y-4">
        <Input
          type="text"
          value={registration}
          onChange={(e) => onChange(e.target.value)}
          placeholder="ENTER REG"
          className="text-center text-2xl h-20 font-bold uppercase tracking-[0.15em] !bg-[#ffd500] !text-black !border-2 !border-black/10 placeholder:!text-black/40 focus:!ring-4 focus:!ring-primary/20 focus:!border-primary rounded-2xl shadow-lg"
          style={{ fontFamily: "var(--font-charles-wright), monospace" }}
        />
        
        {error && (
          <p className="text-destructive text-sm text-center font-medium">{error}</p>
        )}

        {isLoading && (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-sm">Finding your car...</span>
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
            <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
              <div className="bg-background/60 rounded-lg px-3 py-2">
                <span className="text-muted-foreground block text-xs">Year</span>
                <span className="font-medium text-foreground">{vehicleInfo.yearOfManufacture}</span>
              </div>
              <div className="bg-background/60 rounded-lg px-3 py-2">
                <span className="text-muted-foreground block text-xs">Colour</span>
                <span className="font-medium text-foreground">{vehicleInfo.colour}</span>
              </div>
              <div className="bg-background/60 rounded-lg px-3 py-2">
                <span className="text-muted-foreground block text-xs">Fuel</span>
                <span className="font-medium text-foreground">{vehicleInfo.fuelType}</span>
              </div>
              {vehicleInfo.engineSize && (
                <div className="bg-background/60 rounded-lg px-3 py-2">
                  <span className="text-muted-foreground block text-xs">Engine</span>
                  <span className="font-medium text-foreground">{vehicleInfo.engineSize}cc</span>
                </div>
              )}
            </div>
            {vehicleInfo.motExpiryDate && (
              <div className="mt-3 text-xs text-muted-foreground bg-background/60 rounded-lg px-3 py-2">
                MOT expires: {new Date(vehicleInfo.motExpiryDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function StepTwo({ 
  mileage, 
  serviceHistory,
  onMileageChange,
  onServiceHistoryChange,
  vehicleInfo,
  error
}: { 
  mileage: string
  serviceHistory: string
  onMileageChange: (val: string) => void
  onServiceHistoryChange: (val: string) => void
  vehicleInfo: VehicleInfo | null
  error: string
}) {
  const serviceHistoryOptions = [
    { label: "Full", value: "Full" },
    { label: "Partial", value: "Partial" },
    { label: "None", value: "None" }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
          Tell us a bit more
        </h1>
        {vehicleInfo && (
          <p className="text-primary font-medium">
            {vehicleInfo.yearOfManufacture} {vehicleInfo.make} {vehicleInfo.model}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {/* Mileage Input */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Current mileage</label>
          <div className="relative">
            <Input
              type="text"
              inputMode="numeric"
              value={mileage}
              onChange={(e) => onMileageChange(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="Enter mileage"
              className={`h-14 text-lg text-center bg-background border-2 text-foreground placeholder:text-muted-foreground focus:ring-4 focus:ring-primary/20 rounded-xl pr-16 ${
                vehicleInfo?.lastMotMileage && mileage && parseInt(mileage) < vehicleInfo.lastMotMileage
                  ? 'border-destructive focus:border-destructive'
                  : 'border-border focus:border-primary'
              }`}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
              miles
            </span>
          </div>
          {vehicleInfo?.lastMotMileage && mileage && parseInt(mileage) < vehicleInfo.lastMotMileage && (
            <p className="text-destructive text-sm font-medium">
              Your previous MOT shows {vehicleInfo.lastMotMileage.toLocaleString()} miles. Please enter a higher mileage.
            </p>
          )}
        </div>

        {/* Service History */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Service history</label>
          <div className="flex gap-2">
            {serviceHistoryOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onServiceHistoryChange(option.value)}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                  serviceHistory === option.value
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {option.label}
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

function StepThree({ 
  formData, 
  updateField,
  error,
  vehicleInfo
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
        <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
          Where should we send your quote?
        </h1>
      </div>

      {/* Vehicle Summary Card */}
      {vehicleInfo && (
        <div className="bg-secondary rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Car className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">
              {vehicleInfo.make} {vehicleInfo.model}
            </p>
            <p className="text-sm text-muted-foreground">
              {formData.registration} &bull; {parseInt(formData.mileage).toLocaleString()} miles
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
            placeholder="e.g. PE9 1AB"
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

        <p className="text-muted-foreground text-xs text-center pt-2">
          By submitting, you agree to our{" "}
          <Link href="/privacy-policy" className="underline hover:text-foreground">
            privacy policy
          </Link>{" "}
          and{" "}
          <Link href="/terms-of-service" className="underline hover:text-foreground">
            terms of service
          </Link>
        </p>
      </div>
    </div>
  )
}

function SuccessScreen({ name }: { name: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex flex-col">
      <header className="py-5 px-4 bg-background/80 backdrop-blur-sm border-b border-border">
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
          <div className="relative">
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
              We will be in touch shortly with your free car valuation.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <p className="text-muted-foreground mb-4">
              Want a faster response?
            </p>
            <a
              href="https://wa.me/447123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          <Link
            href="/"
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to homepage
          </Link>
        </div>
      </main>
    </div>
  )
}

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      {icon}
      <span className="text-xs font-medium">{text}</span>
    </div>
  )
}
