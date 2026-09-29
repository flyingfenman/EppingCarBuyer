import { Check, MessageCircle, Phone } from "lucide-react"
import { SITE } from "./site"

const POINTS = [
  "Independent of the seller, with no commission from the car you're buying",
  "The person who inspects the car is the person you talk to",
  "Straight answers in plain English, good news and bad",
]

// The person behind the inspection, and how to reach him directly.
export function MeetHenry() {
  return (
    <section className="overflow-hidden bg-white py-12 sm:py-16">
      <div className="container mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="relative mx-auto w-full max-w-xs md:max-w-sm">
          <div className="absolute inset-x-2 bottom-0 top-12 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-primary/5" />
          {/* The photo has a white background; multiply lets the lavender shape behind show through it. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- the same photo the home page uses */}
          <img src="/henry.webp" alt={`Henry from ${SITE.brand}`} width={750} height={1000} loading="lazy" className="relative h-auto w-full object-contain mix-blend-multiply" />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Who inspects your car</p>
          <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl lg:text-5xl">Meet Henry</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Years of buying cars with our own money shape how we inspect yours. You deal with Henry from booking to findings: no call centre, and no sales commission from the car.
          </p>
          <ul className="mt-6 space-y-3">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-lg font-semibold">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-4 w-4 text-primary" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 text-lg font-bold text-white transition hover:bg-[#1da851]">
              <MessageCircle className="h-5 w-5" /> Message Henry
            </a>
            <a href={SITE.phoneHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-primary/30 px-6 text-lg font-bold text-primary transition hover:bg-primary/5">
              <Phone className="h-5 w-5" /> {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
