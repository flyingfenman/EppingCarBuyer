"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ChevronLeft, ChevronRight, MapPin, Quote } from "lucide-react"
import { testimonials } from "@/lib/testimonials"

export function TestimonialsSection({ className = "bg-gray-50" }: { className?: string }) {
  const [index, setIndex] = useState(0)
  const count = testimonials.length
  const go = (next: number) => setIndex((next + count) % count)

  return (
    <section className={`py-10 sm:py-12 lg:py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center sm:mb-10">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              What Our Customers <span className="text-primary">Say</span>
            </h2>
          </div>

          <div role="region" aria-roledescription="carousel" aria-label="Customer testimonials">
            {testimonials.map((t, i) => (
              <figure
                key={t.name + t.vehicle}
                hidden={i !== index}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${t.name}`}
                className="grid overflow-hidden rounded-3xl border border-border bg-white shadow-sm motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500 md:grid-cols-[2fr_3fr]"
              >
                <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px]">
                  <Image
                    src={t.image}
                    alt={t.imageAlt}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: t.imagePosition ?? "center" }}
                  />
                </div>
                <div className="flex flex-col justify-center gap-6 p-6 sm:p-8 lg:p-10">
                  <Quote className="h-10 w-10 text-primary" aria-hidden="true" />
                  <blockquote
                    className={`font-bold leading-snug text-foreground ${
                      t.quote.length > 120 ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"
                    }`}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption>
                    <p className="text-lg font-bold text-primary">{t.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.vehicle} · {t.service}
                    </p>
                    <p className="mt-1 flex items-start gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      Inspected at {t.location}
                    </p>
                  </figcaption>
                  {t.fullReview && (
                    <details className="group rounded-2xl border border-border bg-gray-50">
                      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-base font-bold text-primary [&::-webkit-details-marker]:hidden">
                        Read {t.name}&apos;s full review
                        <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                      </summary>
                      <div className="space-y-3 px-4 pb-4 text-base leading-relaxed text-foreground">
                        {t.fullReview.map((paragraph) => (
                          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              </figure>
            ))}

            {count > 1 && (
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Previous testimonial"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((t, i) => (
                    <button
                      key={t.name + t.vehicle}
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Show ${t.name}'s review`}
                      aria-current={i === index}
                      className={`h-3 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        i === index ? "w-9 bg-primary" : "w-3 bg-primary/25 hover:bg-primary/40"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Next testimonial"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>

          <p className="mt-6 text-center">
            <Link href="/inspection-notes" className="inline-flex items-center gap-1 font-bold text-primary hover:underline">
              See what we found on real inspections <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
