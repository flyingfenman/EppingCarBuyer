import { BatteryCharging, Check, Plus, type LucideIcon } from "lucide-react"

// What Standard and Premium include, with the battery report shown as a priced extra. It answers what
// customers ask most: do you come to the car, is the history check in both, is the battery report in
// Premium, and what's the total. Grouped lists rather than a table, so it reads easily on a phone.
type Item = { label: string; note?: string }

const IN_BOTH: Item[] = [
  { label: "We come to the car", note: "At the dealer, the seller's home or yours, across Essex, Hertfordshire, London and nearby" },
  { label: "History check", note: "Outstanding finance, insurance write-off, stolen and mileage records" },
  { label: "Full diagnostic scan" },
  { label: "Engine, gearbox, brakes, steering, suspension and tyres" },
  { label: "Electric and hybrid fault checks", note: "High-voltage, charging and battery-management systems, where supported" },
  { label: "Road test, where safe and permitted", note: "Extended in Premium" },
  { label: "Video review, photos and a same-day report" },
  { label: "Personal call and buying advice" },
]

const PREMIUM_ADDS: Item[] = [
  { label: "Paint-depth readings on suitable panels" },
  { label: "Deeper bodywork and condition assessment" },
  { label: "Repair-cost guidance and an action plan", note: "What to fix now, within three months and later" },
  { label: "Seller and logbook (V5C) checks", note: "Where documents and permission are available" },
  { label: "Auction, salvage and previous advert searches", note: "Including Copart, where records are available" },
  { label: "Checks for signs of undisclosed motor trading" },
]

function List({ items, icon: Icon, iconClassName }: { items: Item[]; icon: LucideIcon; iconClassName: string }) {
  return (
    <ul className="mt-3 space-y-3">
      {items.map((item) => (
        <li key={item.label} className="flex items-start gap-2.5">
          <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconClassName}`} />
          <span>
            <span className="block font-semibold leading-snug">{item.label}</span>
            {item.note && <span className="mt-0.5 block text-sm text-muted-foreground">{item.note}</span>}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function WhatsIncluded() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border bg-white p-3 text-center sm:p-4">
          <p className="font-bold">Standard</p>
          <p className="text-2xl font-bold">£149.99</p>
          <p className="text-sm text-muted-foreground">160-point inspection</p>
        </div>
        <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-3 text-center sm:p-4">
          <p className="font-bold text-primary">Premium</p>
          <p className="text-2xl font-bold">£199.99</p>
          <p className="text-sm text-muted-foreground">260-point inspection</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-border bg-white p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-primary">In both inspections</h3>
          <List items={IN_BOTH} icon={Check} iconClassName="text-emerald-600" />
        </section>
        <section className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-primary">Premium also adds</h3>
          <List items={PREMIUM_ADDS} icon={Plus} iconClassName="text-primary" />
        </section>
      </div>

      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="flex items-start gap-2 font-bold leading-snug">
            <BatteryCharging className="h-5 w-5 shrink-0 text-emerald-700" />
            Optional EV battery State of Health report
          </h3>
          <p className="shrink-0 text-lg font-bold leading-none text-emerald-800">+£49.99</p>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          The battery&apos;s health as a percentage, with its own report. <strong className="text-foreground">Not included in either inspection.</strong> For compatible electric and plug-in hybrid cars.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 text-center">
          <p className="rounded-xl bg-white p-2">
            <span className="block text-sm text-muted-foreground">Standard + report</span>
            <span className="text-lg font-bold">£199.98</span>
          </p>
          <p className="rounded-xl bg-white p-2">
            <span className="block text-sm text-muted-foreground">Premium + report</span>
            <span className="text-lg font-bold">£249.98</span>
          </p>
        </div>
        <p className="mt-3 text-sm">
          Only need the battery checked?{" "}
          {/* A full page load, so the booking calendar picks the battery check up from the link. */}
          <a href="/vehicle-inspections/book?package=ev" className="font-bold text-primary underline underline-offset-4">
            The battery health check on its own is £99.99.
          </a>
        </p>
      </section>

      <p className="text-sm text-muted-foreground">Searches depend on the records available, and electric checks on what the car supports.</p>
    </div>
  )
}
