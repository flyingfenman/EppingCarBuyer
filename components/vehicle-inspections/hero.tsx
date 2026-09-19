import { ShieldCheck } from "lucide-react"

export function InspectionsHero() {
  return (
    <section className="border-b border-border bg-white py-7 sm:py-9 lg:py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary sm:text-sm">
            <ShieldCheck className="h-4 w-4" /> Independent pre-purchase vehicle inspections
          </div>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-balance sm:text-5xl lg:text-6xl">
            In-depth Mechanical Inspections. <span className="text-primary">Know Before You Buy.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            In-depth mechanical checks, an easy-to-understand video review, photo evidence and a same-day report. Both packages include a personal call to explain the findings and help you decide before buying.
          </p>
        </div>
      </div>
    </section>
  )
}
