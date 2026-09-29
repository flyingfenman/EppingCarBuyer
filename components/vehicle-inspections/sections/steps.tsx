import { CalendarCheck, ClipboardCheck, MapPin, PhoneCall, type LucideIcon } from "lucide-react"
import { SITE } from "./site"

const STEPS: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: CalendarCheck, title: "Book online in minutes", text: "Choose Standard, Premium or the battery check, then pick an exact time from the live calendar." },
  { icon: MapPin, title: "We go to the car", text: `At the dealer, the seller's home or yours, across ${SITE.area}.` },
  { icon: ClipboardCheck, title: "We inspect and test it", text: "Diagnostics, history check, a thorough physical inspection and a road test where safe and permitted." },
  { icon: PhoneCall, title: "Same-day report and a call", text: "Photos, a video review and your written report, then Henry talks you through what it means." },
]

// Four numbered steps: a row with a connecting line on larger screens, a timeline on phones.
export function Steps() {
  return (
    <section className="bg-primary/[0.04] py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">How it works</p>
          <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl lg:text-5xl">From booking to answers in four steps</h2>
        </div>

        <ol className="relative mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-4 lg:gap-6">
          <span aria-hidden="true" className="absolute bottom-7 left-7 top-7 w-0.5 bg-primary/20 lg:bottom-auto lg:left-[12.5%] lg:right-[12.5%] lg:top-7 lg:h-0.5 lg:w-auto" />
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-white">
                <Icon className="h-6 w-6" />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold text-primary ring-2 ring-primary/30">{i + 1}</span>
              </span>
              <div className="pt-1 lg:pt-4">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
