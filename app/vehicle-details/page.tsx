"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Car, Calendar, Gauge, Fuel, Cog, Palette } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface VehicleData {
  registrationNumber: string
  make: string
  model: string
  colour: string
  primaryColour?: string
  secondaryColour?: string
  yearOfManufacture: number
  firstUsedDate?: string
  registrationDate?: string
  manufactureDate?: string
  engineCapacity: number
  fuelType: string
  transmission?: string
  motStatus?: string
  motExpiryDate?: string
  mileage?: number
  co2Emissions?: number
  euroStatus?: string
  typeApproval?: string
  wheelplan?: string
  revenueWeight?: number
  grossWeight?: number
  numberOfSeats?: number
  numberOfDoors?: number
  vehicleClass?: string
  bodyType?: string
  v5cIssuedDate?: string
  dvlaVehicleId?: number
  motTests?: Array<{
    completedDate: string
    testResult: string
    expiryDate: string
    odometerValue: number
    odometerUnit: string
    motTestNumber: string
    rfrAndComments?: Array<{
      text: string
      type: string
    }>
  }>
}

function VehicleDetailsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const reg = searchParams.get("reg")

  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!reg) {
      router.push("/")
      return
    }

    const fetchVehicleData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/vehicle?reg=${encodeURIComponent(reg)}`)

        if (!response.ok) {
          throw new Error("Failed to fetch vehicle data")
        }

        const data = await response.json()
        setVehicleData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchVehicleData()
  }, [reg, router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-64" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !vehicleData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Unable to Find Vehicle</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              We couldn&apos;t find vehicle details for registration: <strong>{reg}</strong>
            </p>
            <Button onClick={() => router.push("/")}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Car className="h-6 w-6" />
            Vehicle Details - {vehicleData.registrationNumber}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Make & Model */}
            <div className="flex items-start gap-3">
              <Car className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Make & Model</p>
                <p className="font-semibold">
                  {vehicleData.make} {vehicleData.model}
                </p>
              </div>
            </div>

            {/* Year */}
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Year of Manufacture</p>
                <p className="font-semibold">{vehicleData.yearOfManufacture}</p>
              </div>
            </div>

            {/* First Used Date */}
            {vehicleData.firstUsedDate && (
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">First Used</p>
                  <p className="font-semibold">{new Date(vehicleData.firstUsedDate).toLocaleDateString()}</p>
                </div>
              </div>
            )}

            {/* Registration Date */}
            {vehicleData.registrationDate && (
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Registration Date</p>
                  <p className="font-semibold">
                    {new Date(vehicleData.registrationDate).toLocaleDateString()}
                    {vehicleData.yearOfManufacture && ` (${vehicleData.yearOfManufacture})`}
                  </p>
                </div>
              </div>
            )}

            {/* Colour */}
            <div className="flex items-start gap-3">
              <Palette className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Colour</p>
                <p className="font-semibold">
                  {vehicleData.colour || vehicleData.primaryColour}
                  {vehicleData.secondaryColour && ` / ${vehicleData.secondaryColour}`}
                </p>
              </div>
            </div>

            {/* Fuel Type */}
            <div className="flex items-start gap-3">
              <Fuel className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Fuel Type</p>
                <p className="font-semibold">{vehicleData.fuelType}</p>
              </div>
            </div>

            {/* Engine Capacity */}
            {vehicleData.engineCapacity && (
              <div className="flex items-start gap-3">
                <Gauge className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Engine Capacity</p>
                  <p className="font-semibold">{vehicleData.engineCapacity}cc</p>
                </div>
              </div>
            )}

            {/* Transmission */}
            {vehicleData.transmission && (
              <div className="flex items-start gap-3">
                <Cog className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Transmission</p>
                  <p className="font-semibold">{vehicleData.transmission}</p>
                </div>
              </div>
            )}

            {/* Body Type */}
            {vehicleData.bodyType && (
              <div className="flex items-start gap-3">
                <Car className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Body Type</p>
                  <p className="font-semibold">{vehicleData.bodyType}</p>
                </div>
              </div>
            )}

            {/* Number of Doors */}
            {vehicleData.numberOfDoors && (
              <div className="flex items-start gap-3">
                <Car className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Doors</p>
                  <p className="font-semibold">{vehicleData.numberOfDoors}</p>
                </div>
              </div>
            )}

            {/* Number of Seats */}
            {vehicleData.numberOfSeats && (
              <div className="flex items-start gap-3">
                <Car className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Seats</p>
                  <p className="font-semibold">{vehicleData.numberOfSeats}</p>
                </div>
              </div>
            )}

            {/* CO2 Emissions */}
            {vehicleData.co2Emissions && (
              <div className="flex items-start gap-3">
                <Gauge className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">CO₂ Emissions</p>
                  <p className="font-semibold">{vehicleData.co2Emissions}g/km</p>
                </div>
              </div>
            )}

            {/* Euro Status */}
            {vehicleData.euroStatus && (
              <div className="flex items-start gap-3">
                <Gauge className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Euro Status</p>
                  <p className="font-semibold">{vehicleData.euroStatus}</p>
                </div>
              </div>
            )}

            {/* Vehicle Class */}
            {vehicleData.vehicleClass && (
              <div className="flex items-start gap-3">
                <Car className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Vehicle Class</p>
                  <p className="font-semibold">{vehicleData.vehicleClass}</p>
                </div>
              </div>
            )}

            {/* Mileage */}
            {vehicleData.mileage && (
              <div className="flex items-start gap-3">
                <Gauge className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Recorded Mileage</p>
                  <p className="font-semibold">{vehicleData.mileage.toLocaleString()} miles</p>
                </div>
              </div>
            )}
          </div>

          {/* MOT Status Section */}
          {(vehicleData.motStatus || vehicleData.motExpiryDate) && (
            <div className="mt-8 pt-6 border-t">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Car className="h-5 w-5" />
                MOT Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {vehicleData.motStatus && (
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-semibold">{vehicleData.motStatus}</p>
                  </div>
                )}
                {vehicleData.motExpiryDate && (
                  <div>
                    <p className="text-sm text-muted-foreground">Expiry Date</p>
                    <p className="font-semibold">{new Date(vehicleData.motExpiryDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* MOT History Section */}
          {vehicleData.motTests && vehicleData.motTests.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <h3 className="font-bold text-lg mb-4">Recent MOT History</h3>
              <div className="space-y-4">
                {vehicleData.motTests.slice(0, 3).map((test, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Test Date</p>
                          <p className="font-semibold">{new Date(test.completedDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Result</p>
                          <p
                            className={`font-semibold ${test.testResult === "PASSED" ? "text-green-600" : "text-red-600"}`}
                          >
                            {test.testResult}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Mileage</p>
                          <p className="font-semibold">
                            {test.odometerValue?.toLocaleString()} {test.odometerUnit}
                          </p>
                        </div>
                      </div>
                      {test.rfrAndComments && test.rfrAndComments.length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm font-semibold mb-2">Comments:</p>
                          <ul className="text-sm space-y-1">
                            {test.rfrAndComments.slice(0, 3).map((comment, i) => (
                              <li key={i} className="text-muted-foreground">
                                • {comment.text}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="font-bold text-lg mb-4">Next Steps</h3>
            <p className="text-muted-foreground mb-4">
              Ready to get a valuation? Click continue to provide additional details about your vehicle&apos;s
              condition.
            </p>
            <Button
              size="lg"
              className="w-full"
              onClick={() => router.push(`/continue?reg=${encodeURIComponent(reg || "")}`)}
            >
              Continue to Valuation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function VehicleDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <VehicleDetailsContent />
    </Suspense>
  )
}
