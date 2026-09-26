import { InspectionsBookingCalendar } from "./booking-calendar"

export function InspectionsCta() {
  return (
    <section id="book" className="scroll-mt-24 bg-slate-50 py-7 sm:py-9 lg:py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
            <p className="hidden text-sm font-bold uppercase tracking-[0.18em] text-primary sm:block">Independent. Thorough. On your side.</p>
            <h2 className="text-3xl font-bold sm:mt-3 sm:text-4xl lg:text-5xl">Book Your Vehicle Inspection</h2>
            <p className="mt-4 hidden text-xl leading-relaxed text-muted-foreground sm:block">
              Choose your inspection, reserve a convenient appointment and we&apos;ll handle the rest.
            </p>
          </div>

          <InspectionsBookingCalendar />
          <p className="mt-7 text-center">
            <a href="#inspection-details" className="text-sm font-bold text-primary underline underline-offset-4">
              Want more detail? See what your mechanical report covers below
            </a>
          </p>

          <p className="mt-7 text-center text-sm text-muted-foreground">
            You&apos;ll deal directly with Henry from booking through to your inspection findings — no call centre and no sales commission from the car.
          </p>
        </div>
      </div>
    </section>
  )
}
