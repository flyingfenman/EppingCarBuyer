import { InspectionsBookingCalendar } from "./booking-calendar"

export function InspectionsCta() {
  return (
    <section id="book" className="scroll-mt-24 bg-white py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary sm:text-sm">Book online</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-4xl">Choose your inspection and appointment</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Pick Standard or Premium, choose an available time and enter the vehicle details.
            </p>
          </div>

          <InspectionsBookingCalendar />

          <p className="mt-5 text-center text-xs text-muted-foreground sm:text-sm">
            You&apos;ll deal directly with Henry from booking through to the inspection findings.
          </p>
        </div>
      </div>
    </section>
  )
}
