import "server-only"

// Bookings Henry has moved to another day or time in the lead tool (carsalesleadtool.com) or its PVI Camera app.
// Stripe keeps a booking at the slot it was paid for, so on its own this diary would keep a moved booking's old time
// blocked and offer its new time to someone else. The lead tool publishes every moved booking at MOVES_URL, times
// only: `from` is the slot it was paid for, `start` and `end` where it is now, `movedAt` when it first moved. A booking
// here that starts at `from` and was made before `movedAt` is held at its new time instead. Checking `movedAt` means a
// customer who books the freed time afterwards is never mistaken for the booking that moved.
const MOVES_URL = "https://www.carsalesleadtool.com/diary/moved-bookings.json"

// The list is served straight from Cloudflare storage, so it normally takes milliseconds. Short enough that the
// booking calendar still loads if the lead tool is struggling.
const TIMEOUT_MS = 4000

export interface BookingMove {
  from: number
  movedAt: number
  start: number
  // null: the lead tool's time has no end, so the booking keeps the length it was paid for.
  end: number | null
}

// A booking as this site's diary holds it, with when it was made (Stripe's `created`, in seconds).
export interface DiaryBooking {
  start: string
  end: string
  created: number
}

function instant(value: unknown): number | null {
  if (typeof value !== "string") return null
  const ms = new Date(value).getTime()
  return Number.isFinite(ms) ? ms : null
}

// Anything that does not read as a move is left out, so one odd entry can never stop the calendar loading.
export function parseBookingMoves(body: unknown): BookingMove[] {
  const list = (body as { moves?: unknown } | null)?.moves
  if (!Array.isArray(list)) return []
  const moves: BookingMove[] = []
  for (const item of list) {
    const from = instant(item?.from)
    const movedAt = instant(item?.movedAt)
    const start = instant(item?.start)
    const end = item?.end == null ? null : instant(item.end)
    if (from === null || movedAt === null || start === null) continue
    if (item?.end != null && end === null) continue
    moves.push({ from, movedAt, start, end })
  }
  return moves
}

export async function fetchBookingMoves(): Promise<BookingMove[]> {
  try {
    const response = await fetch(MOVES_URL, {
      headers: { accept: "application/json", "user-agent": "EppingCarBuyer diary check" },
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return parseBookingMoves(await response.json())
  } catch (error) {
    // Fail open, as for the other sites' diaries: bookings are then held at the times they were paid for. Logged so a
    // clash with a moved booking can be traced back to it.
    console.error("Could not read the moved bookings from the lead tool, so bookings are held at their paid times:", error)
    return []
  }
}

// The diary's bookings, each at the time it is really booked for now.
export function applyBookingMoves(bookings: DiaryBooking[], moves: BookingMove[]): { start: string; end: string }[] {
  return bookings.map((booking) => {
    const original = { start: booking.start, end: booking.end }
    const start = new Date(booking.start).getTime()
    const end = new Date(booking.end).getTime()
    const move = moves.find((m) => m.from === start && booking.created * 1000 < m.movedAt)
    if (!move) return original
    const newEnd = move.end ?? move.start + (end - start)
    if (!(newEnd > move.start)) return original
    return { start: new Date(move.start).toISOString(), end: new Date(newEnd).toISOString() }
  })
}
