"use client"

import { useEffect } from "react"
import { trackBookingComplete, type BookingConversionData } from "@/lib/tracking"

export function BookingConversion({ transactionId, value, currency, packageName, includeEvSoh }: BookingConversionData) {
  useEffect(() => {
    trackBookingComplete({ transactionId, value, currency, packageName, includeEvSoh })
  }, [transactionId, value, currency, packageName, includeEvSoh])

  return null
}
