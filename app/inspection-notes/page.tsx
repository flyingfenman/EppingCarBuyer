import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CalendarCheck, MapPin } from "lucide-react"
import { inspectionNotes } from "@/lib/inspection-notes"

const title = "Inspection Notes: Real Car Inspections | Epping Car Buyer"
const description =
  "Real used cars we've inspected across Essex and London: what we found and what happened next. Photos from the actual inspections, plates blurred."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/inspection-notes" },
  openGraph: { title, description, url: "/inspection-notes", type: "website", images: ["/images/inspection-car.jpg"] },
}

function formatMonth(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric" })
}

export default function InspectionNotesPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-border bg-primary/5 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">Inspection Notes</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Real cars we&apos;ve inspected, what we found, and what happened next. Photos are from the actual
              inspections, with number plates blurred.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div
            className={`mx-auto grid gap-6 ${
              inspectionNotes.length === 1
                ? "max-w-md"
                : inspectionNotes.length === 2
                  ? "max-w-3xl sm:grid-cols-2"
                  : "max-w-5xl sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {inspectionNotes.map((note) => (
              <Link
                key={note.slug}
                href={`/inspection-notes/${note.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] bg-muted/30">
                  <Image
                    src={note.image}
                    alt={note.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: note.imagePosition ?? "center" }}
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                    <MapPin className="h-4 w-4" aria-hidden="true" /> {note.town}
                  </p>
                  <h2 className="mt-2 text-lg font-bold leading-snug text-foreground group-hover:text-primary">{note.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{note.description}</p>
                  <p className="mt-auto flex items-center justify-between pt-4 text-sm">
                    <span className="text-muted-foreground">{formatMonth(note.published)}</span>
                    <span className="inline-flex items-center gap-1 font-bold text-primary">
                      Read the note <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-slate-950 p-7 text-center text-white sm:p-10">
            <h2 className="text-2xl font-bold sm:text-3xl">Buying a used car?</h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-300">
              Get it inspected before you hand over your money. Book online and we&apos;ll come to the car.
            </p>
            <Link
              href="/vehicle-inspections#book"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-slate-950 transition hover:bg-slate-100"
            >
              <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Book an inspection
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
