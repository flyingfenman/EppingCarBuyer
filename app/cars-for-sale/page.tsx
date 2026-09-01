import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Car, Gauge, Calendar, MessageCircle, ArrowRight } from "lucide-react"
import { getPublicCars } from "@/lib/cars-public"

export const metadata: Metadata = {
  title: "Cars For Sale - Epping Car Buyer",
  description:
    "Quality used cars for sale in Epping, Essex. Every car we sell has been through our own inspection process before it goes on the forecourt.",
}

export const revalidate = 60

export default async function CarsForSalePage() {
  const cars = await getPublicCars()

  return (
    <div className="min-h-screen">
      <section className="bg-primary py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Cars For Sale</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Quality used cars, checked over by us before they go on sale — no auction cars, no trade junk.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          {cars.length === 0 ? (
            <div className="max-w-lg mx-auto text-center space-y-4 py-12">
              <Car className="w-12 h-12 text-muted-foreground mx-auto" />
              <h2 className="text-2xl font-bold">Nothing on the forecourt right now</h2>
              <p className="text-muted-foreground">
                Our stock changes fast. Check back soon, or WhatsApp us and we&apos;ll let you know as soon as
                something matching what you want comes in.
              </p>
              <a
                href="https://wa.me/441992367909"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {cars.map((car) => (
                <Link
                  key={car.id}
                  href={`/cars-for-sale/${car.id}`}
                  className="group block rounded-2xl border border-border bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden"
                >
                  <div className="relative aspect-[4/3] bg-muted/30">
                    {car.photos && car.photos.length > 0 ? (
                      <Image
                        src={car.photos[0]}
                        alt={`${car.year} ${car.make} ${car.model}`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Car className="w-10 h-10 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                  <div className="p-5 space-y-3">
                    <div>
                      <h2 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                        {car.make} {car.model}
                      </h2>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {car.year}
                        </span>
                        <span className="flex items-center gap-1">
                          <Gauge className="w-3.5 h-3.5" />
                          {car.mileage.toLocaleString()} miles
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-xl font-bold text-primary">£{car.retail_price.toLocaleString()}</span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
