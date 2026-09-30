import { Camera, PhoneCall, Video, type LucideIcon } from "lucide-react"

function WrittenReportIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="h-11 w-11"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path className="stroke-foreground" strokeWidth="2.8" d="M15 8h25l9 9v31H15z" />
      <path className="stroke-foreground" strokeWidth="2.8" d="M40 8v10h9" />
      <rect className="stroke-foreground" x="20" y="22" width="7" height="7" rx="1" strokeWidth="2.5" />
      <path className="stroke-primary" d="m22 25 2 2 4-5" strokeWidth="2.8" />
      <path className="stroke-foreground" d="M31 25h10" strokeWidth="2.8" />
      <rect className="stroke-foreground" x="20" y="33" width="7" height="7" rx="1" strokeWidth="2.5" />
      <path className="stroke-primary" d="m22 36 2 2 4-5" strokeWidth="2.8" />
      <path className="stroke-foreground" d="M31 36h8" strokeWidth="2.8" />
      <circle className="fill-white stroke-primary" cx="44" cy="43" r="12" strokeWidth="2.8" />
      <path className="stroke-primary" d="m38.5 43 4 4 7-8" strokeWidth="3.2" />
    </svg>
  )
}

const ITEMS: Array<
  | { icon: LucideIcon; title: string; text: string; custom?: false }
  | { icon: null; title: string; text: string; custom: true }
> = [
  { icon: Camera, title: "Comprehensive photos", text: "Every area of the car, so you see what we saw." },
  { icon: Video, title: "A video review", text: "The findings explained in plain English." },
  { icon: null, custom: true, title: "A written report", text: "Sent the same day, to keep and to show the seller." },
  { icon: PhoneCall, title: "A call with Henry", text: "Talk through what it means before you decide." },
]

// What the customer receives, in four tiles.
export function ReportStrip() {
  return (
    <section className="border-t bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Your report</p>
          <h2 className="mt-3 text-balance text-3xl font-bold sm:text-4xl lg:text-5xl">You get the evidence, the same day</h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="rounded-2xl border border-border bg-white p-4 text-center shadow-sm sm:p-6">
                {item.custom ? (
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-border bg-muted/40">
                    <WrittenReportIcon />
                  </span>
                ) : (
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                    {Icon && <Icon className="h-7 w-7" />}
                  </span>
                )}
                <h3 className="mt-4 text-lg font-bold leading-snug sm:text-xl">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-snug text-muted-foreground sm:text-base">{item.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
