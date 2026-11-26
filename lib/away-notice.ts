// The notice shown under the header on every page while Henry is away. backOn is the first day he is taking
// inspections again, as a UK date. The notice shows until that day starts, then takes itself down, so there is
// nothing to delete afterwards. Set AWAY_NOTICE to null for no notice.
//
// This only puts the words on the page. The days themselves are taken out of the diary in BLOCKED_TIMES in the Pro
// Vehicle Inspections repo (lib/inspection-slots.ts), which covers all three sites.
export const AWAY_NOTICE: { backOn: string } | null = {
  // "taking bookings from next Thursday" (Henry, 26 Nov 2026): away Wednesday 25 November to Wednesday 2 December.
  backOn: "2026-12-03",
}

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

// Midnight at the start of a UK date, as a UTC timestamp. London is either on UTC or one hour ahead of it.
function londonMidnight(year: number, month: number, day: number): number {
  const utcMidnight = Date.UTC(year, month - 1, day)
  const londonHour = Number(
    new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", hour: "2-digit", hourCycle: "h23" }).format(utcMidnight),
  )
  return utcMidnight - londonHour * 60 * 60 * 1000
}

// The words to show and the moment they stop being true, or null when there is nothing to show.
export function getAwayNotice(now: number = Date.now()): { text: string; endsAt: number } | null {
  if (!AWAY_NOTICE) return null
  const [year, month, day] = AWAY_NOTICE.backOn.split("-").map(Number)
  const endsAt = londonMidnight(year, month, day)
  if (now >= endsAt) return null
  const weekday = WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()]
  return { text: `Taking bookings from ${weekday} ${day} ${MONTHS[month - 1]}`, endsAt }
}
