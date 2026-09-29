import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { SITE } from "./site"

// The last push to book, for anyone who has read this far.
export function FinalCta() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-3xl border border-primary/20 bg-primary/5 px-6 py-10 text-center sm:px-10 sm:py-14">
          <h2 className="text-balance text-3xl font-bold sm:text-4xl lg:text-5xl">Don&apos;t buy a used car blind</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Book in a couple of minutes, choose your exact time and get the video report the same day.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/vehicle-inspections/book" className="inline-flex h-14 items-center justify-center rounded-xl bg-primary px-8 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90">
              Book Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border-2 border-primary/30 bg-white px-8 text-lg font-bold text-primary transition hover:bg-primary/5">
              <MessageCircle className="h-5 w-5" /> Ask Henry a question
            </a>
          </div>
          <p className="mt-6 font-semibold text-muted-foreground">Standard £149.99 · Premium £199.99 · EV battery check £99.99</p>
        </div>
      </div>
    </section>
  )
}
