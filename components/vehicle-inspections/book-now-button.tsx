import Link from "next/link"
import { ArrowRight } from "lucide-react"

// The inspections page's call to action. Booking has its own page, so the inspections page can stay short.
export function BookNowButton() {
  return (
    <Link
      href="/vehicle-inspections/book"
      className="inline-flex h-14 w-full items-center justify-center rounded-xl bg-primary px-10 text-lg font-bold text-primary-foreground shadow-md transition hover:bg-primary/90 sm:w-auto"
    >
      Book Now <ArrowRight className="ml-2 h-5 w-5" />
    </Link>
  )
}
