"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MessageSquareQuote, Quote } from "lucide-react"

type Testimonial = {
  name: string
  vehicle: string
  service: string
  quote: string
  image: string
  imageAlt: string
}

const testimonials: Testimonial[] = [
  {
    name: "Dave",
    vehicle: "Land Rover Discovery",
    service: "Pre-purchase inspection",
    quote: "I am very happy with the service. Value for money was great.",
    image: "/images/testimonials/dave-land-rover-discovery.jpg",
    imageAlt: "Dave's Land Rover Discovery on ramps during its pre-purchase inspection",
  },
]

const AUTO_ADVANCE_MS = 7000

export function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = testimonials.length
  const current = testimonials[index]

  useEffect(() => {
    if (count < 2 || paused) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), AUTO_ADVANCE_MS)
    return () => window.clearInterval(timer)
  }, [count, paused])

  const go = (next: number) => setIndex((next + count) % count)

  return (
    <section className="bg-gray-50 py-10 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 space-y-4 text-center sm:mb-10">
            <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2">
              <MessageSquareQuote className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">Customer Stories</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              What Our Customers <span className="text-primary">Say</span>
            </h2>
          </div>

          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Customer testimonials"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <figure
              key={index}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              className="grid overflow-hidden rounded-3xl border border-border bg-white shadow-sm motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500 md:grid-cols-[2fr_3fr]"
            >
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px]">
                <Image
                  src={current.image}
                  alt={current.imageAlt}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-6 p-6 sm:p-8 lg:p-10">
                <Quote className="h-10 w-10 text-primary" aria-hidden="true" />
                <blockquote className="text-2xl font-bold leading-snug text-foreground sm:text-3xl">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
                <figcaption>
                  <p className="text-lg font-bold text-primary">{current.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {current.vehicle} · {current.service}
                  </p>
                </figcaption>
              </div>
            </figure>

            {count > 1 && (
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Previous testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((t, i) => (
                    <button
                      key={t.name + t.vehicle}
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Show testimonial ${i + 1}`}
                      aria-current={i === index}
                      className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        i === index ? "w-8 bg-primary" : "w-2.5 bg-primary/25 hover:bg-primary/40"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Next testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
