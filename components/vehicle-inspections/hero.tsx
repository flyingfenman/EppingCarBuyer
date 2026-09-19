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
            We’ve Been Putting Our Own Money on the Line for Years. <span className="text-primary">Now We Help You Decide Where to Put Yours.</span>
          </h1>

          <ol className="mx-auto mt-6 max-w-3xl list-decimal space-y-4 pl-6 text-left text-base leading-relaxed text-muted-foreground sm:text-lg">
            <li>We combine years of hands on car buying experience with advanced diagnostic equipment to inspect your next car with the same scrutiny we bring to our own stock.</li>
            <li>Get in depth mechanical findings explained in an easy to understand video, backed by a detailed report and a straight conversation about what we’ve found. Use that knowledge to negotiate the price, ask for faults to be put right and decide whether to go ahead.</li>
            <li>Your video, photos and report also give you a record of the issues identified before purchase valuable evidence to refer back to if problems arise months later. Identifying those issues early could save you thousands in unexpected repair costs.</li>
          </ol>
        </div>
      </div>
    </section>
  )
}
