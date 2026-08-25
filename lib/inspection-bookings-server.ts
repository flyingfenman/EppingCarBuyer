import "server-only"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")

export interface OccupiedRange {
  start: string
  end: string
}

// Fetches every inspection-booking Checkout Session created in the lookback window that isn't expired —
// i.e. still open (customer is mid-checkout) or already paid. Both count as "occupying" their slot, so a
// slot becomes unavailable to other customers the moment someone starts paying for it, not only once they
// finish. Paginates fully rather than trusting a single page, since Stripe caps each page at 100.
export async function getOccupiedRanges(lookbackDays: number): Promise<OccupiedRange[]> {
  const windowStart = Math.floor(Date.now() / 1000) - 60 * 60 * 24 * lookbackDays
  const ranges: OccupiedRange[] = []

  let startingAfter: string | undefined
  for (let page = 0; page < 20; page++) {
    // 20 pages (2,000 sessions) is a generous ceiling for a small business — stops a runaway loop if
    // something upstream ever misbehaves, without silently truncating any realistic volume of bookings.
    const response: Stripe.ApiList<Stripe.Checkout.Session> = await stripe.checkout.sessions.list({
      created: { gte: windowStart },
      limit: 100,
      starting_after: startingAfter,
    })

    for (const session of response.data) {
      if (session.status === "expired") continue
      if (session.metadata?.type !== "inspection_booking") continue
      if (typeof session.metadata?.slotStart !== "string" || typeof session.metadata?.slotEnd !== "string") continue
      ranges.push({ start: session.metadata.slotStart, end: session.metadata.slotEnd })
    }

    if (!response.has_more || response.data.length === 0) break
    startingAfter = response.data[response.data.length - 1].id
  }

  return ranges
}
