import { Info } from "lucide-react"

export function ReportTerms() {
  return (
    <section className="py-10 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto rounded-xl border border-border bg-white p-6 flex items-start gap-3">
          <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Sample report — terms &amp; limitations
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This is a sample report for a fictional vehicle, shown to illustrate the format and level of detail
              you receive — it is not a real inspection record. On a genuine inspection, our checks are visual and
              non-invasive: we assess what is visible and accessible on the day, without dismantling the vehicle or
              its mechanical components, so items hidden from view or inspection aren't covered. The report is not
              a roadworthiness certificate and does not constitute a warranty or guarantee of the vehicle's
              condition, and it isn't a substitute for independent legal or mechanical advice. The final decision to
              purchase the vehicle, and any negotiation with the seller, remains the buyer's responsibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
