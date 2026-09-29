import Link from "next/link"
import { ArrowRight, Camera, FileText, PhoneCall, Video, type LucideIcon } from "lucide-react"

const ITEMS: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Camera, title: "30–40+ photos", text: "Every area of the car, so you see what we saw." },
  { icon: Video, title: "A video review", text: "The findings explained in plain English." },
  { icon: FileText, title: "A written report", text: "Sent the same day, to keep and to show the seller." },
  { icon: PhoneCall, title: "A call with Henry", text: "Talk through what it means before you decide." },
]

// What the customer receives, in four tiles.
export function ReportStrip() {
  return (
    <section className="bg-primary/[0.04] py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Your report</p>
          <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl lg:text-5xl">You get the evidence, the same day</h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {ITEMS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border bg-white p-4 text-center shadow-sm sm:p-6">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/25">
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="mt-4 text-lg font-bold leading-snug sm:text-xl">{title}</h3>
              <p className="mt-1.5 text-sm leading-snug text-muted-foreground sm:text-base">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/vehicle-inspections/sample-report" className="inline-flex min-h-12 items-center rounded-xl border-2 border-primary/30 bg-white px-6 text-lg font-bold text-primary transition hover:bg-primary/5">
            View a sample report <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
