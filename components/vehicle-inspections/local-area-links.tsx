import Link from "next/link"
import { MapPin } from "lucide-react"

const areas = [
  { label: "Vehicle Inspection London", href: "/vehicle-inspection-london" },
  { label: "Pre Purchase Car Inspection Essex", href: "/pre-purchase-car-inspection-essex" },
]

export function LocalAreaLinks() {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-white p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        <h3 className="font-bold">Local inspection pages</h3>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {areas.map((area) => (
          <Link
            key={area.href}
            href={area.href}
            className="rounded-full border border-primary/20 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            {area.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
