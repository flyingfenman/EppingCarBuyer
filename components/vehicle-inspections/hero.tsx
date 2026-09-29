import { Check, ShieldCheck } from "lucide-react"
import { BookNowButton } from "./book-now-button"

const IN_BOTH = ["We come to the car", "History check", "Full diagnostics", "Road test", "Video review", "Same-day report"]

// The title, the prices, what both inspections include and the first of the page's two Book Now
// buttons; the detail sits in the dropdowns below, so the page stays short, especially on phones.
export function InspectionsHero() {
  return (
    <section className="relative overflow-hidden border-b bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(103,17,164,0.12),transparent_40%)]" />
      <div className="container relative mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="hidden items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary sm:inline-flex">
            <ShieldCheck className="h-4 w-4" />
            Independent pre-purchase car inspection service
          </div>

          <h1 className="text-4xl font-bold leading-[1.06] sm:mt-5 sm:text-5xl lg:text-6xl">
            We inspect the car like <span className="text-primary">our own money is on the line.</span>
          </h1>

          <p className="mt-5 hidden max-w-2xl text-xl leading-relaxed text-muted-foreground sm:block">
            Years of buying cars with our own money shape how we inspect yours. We combine a detailed physical inspection, advanced diagnostics, road testing, vehicle history and clear video evidence so you understand the car before you commit.
          </p>

          <p className="mt-4 text-lg font-bold text-foreground sm:mt-5">
            Standard £149.99 · Premium £199.99
          </p>
          <p className="mt-3 text-sm font-bold uppercase tracking-wide text-primary">Both inspections include</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2 font-semibold sm:flex sm:flex-wrap sm:gap-x-6">
            {IN_BOTH.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-5 w-5 shrink-0 text-emerald-600" /> {item}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            EV battery health report: +£49.99 with either inspection, or £99.99 on its own.
          </p>

          <div className="mt-6">
            <BookNowButton />
          </div>
        </div>
      </div>
    </section>
  )
}
