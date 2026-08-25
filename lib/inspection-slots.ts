// Shared slot logic for the inspection booking calendar.
// Business hours: every day, 9am-6pm Europe/London wall-clock time (handles BST/GMT automatically,
// regardless of what timezone the server process itself runs in — important since Vercel runs in UTC).

export const PACKAGE_DURATIONS_MIN = {
  standard: 60,
  premium: 90,
} as const

export type PackageKey = keyof typeof PACKAGE_DURATIONS_MIN

const BUSINESS_START_HOUR = 9
const BUSINESS_END_HOUR = 18
const LOOKAHEAD_DAYS = 14
const LONDON_TZ = "Europe/London"

export interface Slot {
  /** ISO string (UTC instant) corresponding to a time within 9am-6pm Europe/London wall-clock time */
  start: string
  end: string
}

// True if two [start, end) time ranges overlap at all. Candidate slots are generated every 30 minutes
// but last 60-90 minutes, so adjacent slots overlap in real time — availability must be checked by actual
// overlap against existing bookings, never by comparing exact start-time strings.
export function rangesOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string): boolean {
  return new Date(aStart).getTime() < new Date(bEnd).getTime() && new Date(bStart).getTime() < new Date(aEnd).getTime()
}

// How far Europe/London clocks are ahead of UTC, in minutes, at a given instant (60 during BST, 0 during GMT).
function londonOffsetMinutes(instant: Date): number {
  const asUTC = new Date(instant.toLocaleString("en-US", { timeZone: "UTC" }))
  const asLondon = new Date(instant.toLocaleString("en-US", { timeZone: LONDON_TZ }))
  return Math.round((asLondon.getTime() - asUTC.getTime()) / 60000)
}

// Converts a London wall-clock date/time (e.g. "9am on 25 Aug 2026") to the correct UTC instant.
function londonWallTimeToUTC(year: number, month: number, day: number, hour: number, minute: number): Date {
  const naiveUTCGuess = new Date(Date.UTC(year, month, day, hour, minute))
  const offset = londonOffsetMinutes(naiveUTCGuess)
  return new Date(naiveUTCGuess.getTime() - offset * 60000)
}

// Returns the London calendar date/weekday for a UTC instant, independent of the server's own timezone.
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

// Generates every possible slot for a package across the lookahead window, ignoring bookings.
// Slots start on the hour and half-hour (e.g. 9:00, 9:30, 10:00...) and must fully fit before closing time.
export function generateAllSlots(packageKey: PackageKey, fromDate: Date = new Date()): Slot[] {
  const durationMin = PACKAGE_DURATIONS_MIN[packageKey]
  const slots: Slot[] = []

  for (let dayOffset = 0; dayOffset < LOOKAHEAD_DAYS; dayOffset++) {
    const probe = new Date(fromDate.getTime() + dayOffset * 24 * 60 * 60 * 1000)
    const { year, month, day } = londonDateParts(probe)

    const closing = londonWallTimeToUTC(year, month, day, BUSINESS_END_HOUR, 0)

    for (let minutesFromStart = 0; ; minutesFromStart += 30) {
      const slotStart = londonWallTimeToUTC(year, month, day, BUSINESS_START_HOUR, minutesFromStart)
      const slotEnd = new Date(slotStart.getTime() + durationMin * 60000)

      if (slotEnd > closing) break

      // Skip slots already in the past (only relevant for today)
      if (slotStart.getTime() > fromDate.getTime()) {
        slots.push({ start: slotStart.toISOString(), end: slotEnd.toISOString() })
      }
    }
  }

  return slots
}
