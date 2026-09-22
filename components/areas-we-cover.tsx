import Link from "next/link"
import { MapPin, CheckCircle } from "lucide-react"

const areas = [
  {
    name: "Essex",
    places: "Waltham Abbey, Epping, Loughton, Harlow, Brentwood, Chelmsford, Ongar and Chigwell.",
  },
  {
    name: "Hertfordshire",
    places: "Hertford, Watford, Stevenage, St Albans, Bishop’s Stortford and Hoddesdon.",
  },
  {
    name: "Greater London",
    places: "East and North London, including Enfield, Walthamstow, Ilford and Romford.",
  },
  {
    name: "South Cambridgeshire",
    places: "Villages south of Cambridge, including Sawston, Duxford, Great Shelford, Little Shelford, Whittlesford and Melbourn.",
  },
]

export function AreasWeCover() {
  return (
    <section id="areas" className="relative overflow-hidden px-4 py-12 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/2 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>
      <div className="container relative z-10 mx-auto">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">Service Coverage</span>
            </div>
            <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
              Where Do We <span className="text-primary">Cover?</span>
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Book an in-depth pre-purchase vehicle inspection across Essex, Hertfordshire, Greater London and South Cambridgeshire.
              We inspect the car at the private seller’s address or dealership, including EV and hybrid vehicles.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              We also cover parts of Bedfordshire and Suffolk. If the vehicle is outside the places listed,
              send us its postcode and we’ll confirm whether we can attend before you book.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href="/vehicle-inspection-london" className="rounded-full border border-primary/20 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10">
                Vehicle Inspection London
              </Link>
              <Link href="/pre-purchase-car-inspection-essex" className="rounded-full border border-primary/20 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10">
                Pre Purchase Car Inspection Essex
              </Link>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {areas.map((area) => (
              <li key={area.name} className="rounded-2xl border border-primary/15 bg-primary/5 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                  <h3 className="text-lg font-bold text-primary">{area.name}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{area.places}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
