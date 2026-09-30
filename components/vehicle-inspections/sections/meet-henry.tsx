import { Check, MessageCircle } from "lucide-react"
import { SITE } from "./site"

const POINTS = [
  "Independent of the seller, with no commission from the car you're buying",
  "The person who inspects the car is the person you talk to",
  "Straight answers in plain English, good news and bad",
]

// The person behind the inspection, and how to reach him directly.
export function MeetHenry() {
  return (
    <section className="overflow-hidden border-t bg-white py-12 sm:py-16">
      <div className="container mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="mx-auto w-full max-w-xs overflow-hidden rounded-[2.5rem] border border-border bg-white shadow-md md:max-w-sm">
          {/* eslint-disable-next-line @next/next/no-img-element -- the same photo the home page uses */}
          <img src="/henry.webp" alt={`Henry from ${SITE.brand}`} width={750} height={1000} loading="lazy" className="h-auto w-full object-contain" />
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
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
                  <Check className="h-4 w-4 text-white" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 text-lg font-bold text-white transition hover:bg-[#1da851]">
              <MessageCircle className="h-5 w-5" /> Message Henry
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
