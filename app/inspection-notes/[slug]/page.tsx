import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, CalendarCheck, CircleAlert, CircleCheck, MapPin, Quote, Wrench } from "lucide-react"
import { getInspectionNote, inspectionNotes } from "@/lib/inspection-notes"

const SITE_URL = "https://www.eppingcarbuyer.com"

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return inspectionNotes.map((note) => ({ slug: note.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const note = getInspectionNote(slug)
  if (!note) return {}
  const path = `/inspection-notes/${note.slug}`
  return {
    title: note.metaTitle,
    description: note.description,
    alternates: { canonical: path },
    openGraph: {
      title: note.title,
      description: note.description,
      url: path,
      type: "article",
      publishedTime: note.published,
      images: [note.image],
    },
  }
}

export default async function InspectionNotePage({ params }: Props) {
  const { slug } = await params
  const note = getInspectionNote(slug)
  if (!note) notFound()

  const url = `${SITE_URL}/inspection-notes/${note.slug}`
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: note.title,
      description: note.description,
      image: [`${SITE_URL}${note.image}`],
      datePublished: note.published,
      mainEntityOfPage: url,
      author: {
        "@type": "Person",
        name: "Henry",
        worksFor: { "@type": "Organization", name: "Epping Car Buyer", url: SITE_URL },
      },
      publisher: {
        "@type": "Organization",
        name: "Epping Car Buyer",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-touch-icon.png` },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Inspection Notes", item: `${SITE_URL}/inspection-notes` },
        { "@type": "ListItem", position: 3, name: note.title, item: url },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <article>
        <header className="border-b border-border bg-primary/5 py-8 sm:py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <Link href="/inspection-notes" className="-my-3 inline-flex items-center gap-2 py-3 text-sm font-bold text-primary hover:underline">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Inspection Notes
              </Link>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-balance sm:text-4xl lg:text-5xl">{note.title}</h1>
              <ul className="mt-5 flex flex-wrap gap-2 text-sm font-semibold">
                <li className="rounded-full border border-border bg-white px-3 py-1.5">{note.vehicle}</li>
                <li className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5">
                  <MapPin className="h-4 w-4 text-primary" aria-hidden="true" /> {note.town}
                </li>
                <li className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-primary">{note.service}</li>
                <li className="rounded-full border border-border bg-white px-3 py-1.5 text-muted-foreground">Inspected {note.inspected}</li>
              </ul>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-10 sm:py-14">
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-[2fr_3fr] md:items-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-muted/30">
              <Image
                src={note.image}
                alt={note.imageAlt}
                fill
                priority
                sizes="(min-width: 768px) 360px, 100vw"
                className="object-cover"
                style={{ objectPosition: note.imagePosition ?? "center" }}
              />
            </div>

            <div className="space-y-8">
              <p className="text-lg leading-relaxed text-foreground">{note.intro}</p>

              <section aria-labelledby="found-heading">
                <h2 id="found-heading" className="text-2xl font-bold">What we found</h2>
                <ul className="mt-4 space-y-3">
                  {note.findings.map((finding) => (
                    <li key={finding.title} className="flex gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm">
                      {finding.status === "flagged" ? (
                        <CircleAlert className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" aria-label="Flagged" />
                      ) : (
                        <CircleCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" aria-label="No issue" />
                      )}
                      <div>
                        <h3 className="font-bold">{finding.title}</h3>
                        <p className="mt-1 leading-relaxed text-muted-foreground">{finding.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="next-heading">
                <h2 id="next-heading" className="flex items-center gap-2 text-2xl font-bold">
                  <Wrench className="h-6 w-6 text-primary" aria-hidden="true" /> What happened next
                </h2>
                <div className="mt-4 space-y-3 text-lg leading-relaxed text-foreground">
                  {note.outcome.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              </section>

              {note.quote && (
                <figure className="rounded-2xl border-2 border-primary/15 bg-primary/5 p-5">
                  <Quote className="h-7 w-7 text-primary" aria-hidden="true" />
                  <blockquote className="mt-2 text-xl font-bold leading-snug">&ldquo;{note.quote.text}&rdquo;</blockquote>
                  <figcaption className="mt-2 font-bold text-primary">{note.quote.name}</figcaption>
                </figure>
              )}
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl space-y-6">
            {note.related.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {note.related.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10"
                  >
                    {link.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            )}

            <div className="rounded-3xl bg-slate-950 p-7 text-center text-white sm:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">Buying a used car?</h2>
              <p className="mx-auto mt-3 max-w-xl text-slate-300">
                Find out what&apos;s wrong before you pay, not after. We come to the car, wherever it&apos;s being sold.
              </p>
              <Link
                href="/vehicle-inspections#book"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-slate-950 transition hover:bg-slate-100"
              >
                <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Book an inspection
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
