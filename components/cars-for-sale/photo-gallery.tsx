"use client"

import { useState } from "react"
import Image from "next/image"
import { Car } from "lucide-react"

export function CarPhotoGallery({ photos, alt }: { photos: string[]; alt: string }) {
  const [active, setActive] = useState(0)

  if (photos.length === 0) {
    return (
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted/30 flex items-center justify-center">
        <Car className="w-16 h-16 text-muted-foreground/40" />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted/30 shadow-md">
        <Image
          src={photos[active]}
          alt={alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
      </div>
      {photos.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {photos.map((photo, index) => (
            <button
              key={photo}
              onClick={() => setActive(index)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                index === active ? "border-primary" : "border-transparent hover:border-border"
              }`}
            >
              <Image src={photo} alt={`${alt} — photo ${index + 1}`} fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
