import Image from "next/image"
import { Quote } from "lucide-react"
import { testimonials } from "@/lib/testimonials"

// "What our customers say about us", straight after the hero: real customers, with photos of their own
// cars, all on show with nothing to click.
export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold sm:text-4xl lg:text-5xl">What our customers say about us</h2>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-5 sm:mt-10 sm:gap-6">
          {testimonials.map((t) => (
            <figure key={t.name} className="grid overflow-hidden rounded-3xl border border-border bg-white shadow-md md:grid-cols-[2fr_3fr]">
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[320px]">
                <Image
                  src={t.image}
                  alt={t.imageAlt}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: t.imagePosition ?? "center" }}
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <Quote className="h-9 w-9 text-primary" aria-hidden="true" />
                <blockquote className="mt-3 text-xl font-bold leading-snug sm:text-2xl">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4">
                  <p className="text-lg font-bold text-primary">{t.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {t.vehicle} · {t.service}
                  </p>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
