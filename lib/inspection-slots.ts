// Shared slot logic for the inspection booking calendar.
// Business hours: every day, 9am-6pm Europe/London wall-clock time.

export const PACKAGE_DURATIONS_MIN = {
  standard: 60,
  premium: 90,
} as const

// Slots inside this window are still shown to customers, but must be confirmed by message first.
// The checkout API also enforces this as a backstop so a short-notice slot cannot be paid for directly.
export const MIN_BOOKING_NOTICE_HOURS = 24

export type PackageKey = keyof typeof PACKAGE_DURATIONS_MIN

const BUSINESS_START_HOUR = 9
const BUSINESS_END_HOUR = 18
const LOOKAHEAD_DAYS = 30
// Appointments start on the hour.
const SLOT_INTERVAL_MIN = 60
const LONDON_TZ = "Europe/London"

export interface Slot {
  start: string
  end: string
}

export function rangesOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string): boolean {
  return new Date(aStart).getTime() < new Date(bEnd).getTime() && new Date(bStart).getTime() < new Date(aEnd).getTime()
}

function londonOffsetMinutes(instant: Date): number {
  const asUTC = new Date(instant.toLocaleString("en-US", { timeZone: "UTC" }))
  const asLondon = new Date(instant.toLocaleString("en-US", { timeZone: LONDON_TZ }))
  return Math.round((asLondon.getTime() - asUTC.getTime()) / 60000)
}

function londonWallTimeToUTC(year: number, month: number, day: number, hour: number, minute: number): Date {
  const naiveUTCGuess = new Date(Date.UTC(year, month, day, hour, minute))
  const offset = londonOffsetMinutes(naiveUTCGuess)
  return new Date(naiveUTCGuess.getTime() - offset * 60000)
}

function londonDateParts(instant: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: LONDON_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(instant)
  const get = (type: string) => parts.find((p) => p.type === type)?.value || ""
  const weekdayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  return {
    year: Number(get("year")),
    month: Number(get("month")) - 1,
    day: Number(get("day")),
    weekday: weekdayMap[get("weekday")] ?? -1,
  }
}

export function generateAllSlots(packageKey: PackageKey, fromDate: Date = new Date()): Slot[] {
  const durationMin = PACKAGE_DURATIONS_MIN[packageKey]
  const slots: Slot[] = []

  for (let dayOffset = 0; dayOffset < LOOKAHEAD_DAYS; dayOffset++) {
    const probe = new Date(fromDate.getTime() + dayOffset * 24 * 60 * 60 * 1000)
    const { year, month, day } = londonDateParts(probe)
    const closing = londonWallTimeToUTC(year, month, day, BUSINESS_END_HOUR, 0)

    for (let minutesFromStart = 0; ; minutesFromStart += SLOT_INTERVAL_MIN) {
      const slotStart = londonWallTimeToUTC(year, month, day, BUSINESS_START_HOUR, minutesFromStart)
      const slotEnd = new Date(slotStart.getTime() + durationMin * 60000)

      if (slotEnd > closing) break
      if (slotStart.getTime() > fromDate.getTime()) {
        slots.push({ start: slotStart.toISOString(), end: slotEnd.toISOString() })
      }
    }
  }

  return slots
}
