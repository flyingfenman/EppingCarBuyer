import Image from "next/image"
import { Check, ShieldCheck } from "lucide-react"
import { testimonials } from "@/lib/testimonials"
import { BookNowButton } from "../book-now-button"

const IN_BOTH = ["We come to the car", "History check", "Full diagnostics", "Road test", "Video review", "Same-day report"]

// The title, the prices, what both inspections include, the first Book Now and, beside it (under it on
// phones), a real customer's words, so a visitor sees why to choose us in the first few seconds.
export function InspectionsHero() {
  const review = testimonials[0]
  return (
    <section className="border-b bg-white">
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-14">
          <div>
            <div className="hidden items-center gap-2 rounded-full border border-primary/30 bg-white px-4 py-2 text-sm font-bold text-primary sm:inline-flex">
              <ShieldCheck className="h-4 w-4" />
              Independent pre-purchase car inspection service
            </div>

            <h1 className="text-4xl font-bold leading-[1.06] sm:mt-5 sm:text-5xl lg:text-6xl">
              We inspect the car like <span className="text-primary">our own money is on the line.</span>
            </h1>

            <p className="mt-5 hidden max-w-2xl text-xl leading-relaxed text-muted-foreground sm:block">
              Years of buying cars with our own money shape how we inspect yours. We combine a detailed physical inspection, advanced diagnostics, road testing, vehicle history and clear video evidence so you understand the car before you commit.
            </p>

            <p className="mt-4 text-lg font-bold text-foreground sm:mt-5">Standard £149.99 · Premium £199.99</p>
            <p className="mt-3 text-sm font-bold uppercase tracking-wide text-primary">Both inspections include</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2 font-semibold sm:flex sm:flex-wrap sm:gap-x-6">
              {IN_BOTH.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-5 w-5 shrink-0 text-emerald-600" /> {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">EV battery health report: +£49.99 with either inspection, or £99.99 on its own.</p>

            <div className="mt-6">
              <BookNowButton />
            </div>
          </div>

          <a href="#reviews" className="group block rounded-3xl border border-border bg-white p-4 shadow-lg transition hover:shadow-xl lg:p-5">
            <p className="mb-3 flex items-center justify-between gap-3 text-sm font-bold uppercase tracking-wide text-primary">
              <span>What our customers say</span>
              <span className="normal-case group-hover:underline lg:hidden">Read more ↓</span>
            </p>
            <div className="flex items-center gap-4 lg:flex-col lg:items-stretch lg:gap-5">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl lg:h-72 lg:w-full">
                <Image
                  src={review.image}
                  alt={review.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 96px"
                  className="object-cover"
                  style={{ objectPosition: review.imagePosition ?? "center" }}
                />
              </div>
              <div>
                <p className="text-base font-bold leading-snug sm:text-lg lg:text-2xl">&ldquo;{review.headline}&rdquo;</p>
                <p className="mt-2 text-sm font-semibold text-primary">
                  {review.name} · {review.vehicle}
                </p>
              </div>
            </div>
            <p className="mt-3 hidden border-t border-border pt-3 text-sm font-bold text-primary group-hover:underline lg:block">Read more from our customers ↓</p>
          </a>
        </div>
      </div>
    </section>
  )
}
