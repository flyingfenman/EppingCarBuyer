import { InspectionsBookingCalendar } from "./booking-calendar"
import { LocalAreaLinks } from "./local-area-links"

export function InspectionsCta() {
  return (
    <section id="book" className="scroll-mt-24 bg-slate-50 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-9 max-w-3xl text-center sm:mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Independent. Thorough. On your side.</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">Book Your Vehicle Inspection</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Choose your inspection, reserve a convenient appointment and we&apos;ll handle the rest.
            </p>
          </div>

          <InspectionsBookingCalendar />
          <LocalAreaLinks />

          <p className="mt-7 text-center text-sm text-muted-foreground">
            You&apos;ll deal directly with Henry from booking through to your inspection findings — no call centre and no sales commission from the car.
          </p>
        </div>
      </div>
    </section>
  )
}
