import Image from "next/image"
import { Star } from "lucide-react"
import type { Testimonial } from "@/lib/testimonials"

// The left-hand side of a review card: the customer's own photo of their car, or, for a review left
// online with no photo, its star rating and where it was posted on a light purple panel.
export function TestimonialMedia({ t, className, sizes }: { t: Testimonial; className: string; sizes: string }) {
  if (t.image) {
    return (
      <div className={`relative aspect-[4/3] md:aspect-auto ${className}`}>
        <Image
          src={t.image}
          alt={t.imageAlt ?? ""}
          fill
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: t.imagePosition ?? "center" }}
        />
      </div>
    )
  }
  const rating = t.rating ?? 5
  return (
    <div className={`flex flex-col items-center justify-center gap-2 bg-primary/10 px-6 py-8 text-center ${className}`}>
      <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: rating }, (_, i) => (
          <Star key={i} className="h-7 w-7 fill-amber-400 text-amber-400" aria-hidden="true" />
        ))}
      </div>
      {t.source && <p className="text-base font-bold text-primary">{t.source}</p>}
    </div>
  )
}
