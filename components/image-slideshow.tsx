"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  "https://pub-a2f7152982044499ae235745de78c2df.r2.dev/slide1.JPG",
  "https://pub-a2f7152982044499ae235745de78c2df.r2.dev/slide2.jpg",
  "https://pub-a2f7152982044499ae235745de78c2df.r2.dev/slide3.jpg",
  "https://pub-a2f7152982044499ae235745de78c2df.r2.dev/slide4.jpg",
  "https://pub-a2f7152982044499ae235745de78c2df.r2.dev/slide5.jpg",
  "https://pub-a2f7152982044499ae235745de78c2df.r2.dev/slide6.jpg",
]

export function ImageSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image src={slide || "/placeholder.svg"} alt={`Car image ${index + 1}`} fill className="object-cover" />
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/75"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/75"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentSlide ? "bg-primary w-8" : "bg-background/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
