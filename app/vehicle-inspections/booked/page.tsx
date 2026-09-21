import Stripe from "stripe"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookingConversion } from "@/components/tracking/booking-conversion"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")

// Only a genuinely paid inspection session counts as a conversion, so a made-up or reloaded URL can't inflate the numbers.
async function getPaidBooking(sessionId?: string) {
  if (!sessionId || !sessionId.startsWith("cs_")) return null
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== "paid" || session.metadata?.type !== "inspection_booking") return null
    return {
      transactionId: session.id,
      value: (session.amount_total || 0) / 100,
      currency: (session.currency || "gbp").toUpperCase(),
      packageName: session.metadata.packageName || "Vehicle Inspection",
      includeEvSoh: session.metadata.includeEvSoh === "yes",
    }
  } catch {
    return null
  }
}

export default async function InspectionBookedPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams
  const booking = await getPaidBooking(session_id)

  return (
    <div className="min-h-screen flex items-center justify-center py-12 sm:py-16 lg:py-20 px-4">
      <div className="max-w-md mx-auto text-center space-y-6">
        <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
        <h1 className="text-3xl font-bold">You&apos;re booked in!</h1>
        <p className="text-muted-foreground">
          Payment received and your inspection is confirmed. You&apos;ll get a confirmation call or message shortly
          to finalise the details.
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
          <Link href="/">Back to homepage</Link>
        </Button>
      </div>
      {booking && <BookingConversion {...booking} />}
    </div>
  )
}
