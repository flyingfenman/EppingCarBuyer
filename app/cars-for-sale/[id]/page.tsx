import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Gauge, MessageCircle, ShieldCheck } from "lucide-react"
import { getPublicCarById } from "@/lib/cars-public"
import { CarPhotoGallery } from "@/components/cars-for-sale/photo-gallery"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const car = await getPublicCarById(id)
  if (!car) return { title: "Car Not Found - Epping Car Buyer" }
  return {
    title: `${car.year} ${car.make} ${car.model} - Epping Car Buyer`,
    description: `${car.year} ${car.make} ${car.model}, ${car.mileage.toLocaleString()} miles — £${car.retail_price.toLocaleString()}. For sale at Epping Car Buyer.`,
  }
}

export default async function CarDetailPage({ params }: Props) {
  const { id } = await params
  const car = await getPublicCarById(id)

  if (!car) notFound()

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in the ${car.year} ${car.make} ${car.model} listed for £${car.retail_price.toLocaleString()}.`
  )

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/cars-for-sale"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all cars
        </Link>

        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 max-w-6xl mx-auto">
          <CarPhotoGallery photos={car.photos || []} alt={`${car.year} ${car.make} ${car.model}`} />

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {car.make} {car.model}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground mt-2">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {car.year}
                </span>
                <span className="flex items-center gap-1.5">
                  <Gauge className="w-4 h-4" />
                  {car.mileage.toLocaleString()} miles
                </span>
              </div>
            </div>

            <p className="text-4xl font-bold text-primary">£{car.retail_price.toLocaleString()}</p>

            <div className="flex items-center gap-2.5 text-sm text-muted-foreground bg-muted/40 rounded-xl p-4">
              <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
              Every car we sell has been through our own inspection process before it goes on the forecourt.
            </div>

            {car.description && (
              <div className="space-y-2">
                <h2 className="font-bold text-foreground">About this car</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{car.description}</p>
              </div>
            )}

            <a
              href={`https://wa.me/441992367909?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full h-14 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold text-lg rounded-xl transition-colors shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us About This Car
            </a>
            <p className="text-xs text-center text-muted-foreground">
              Speak to Henry directly. Real person, real local service.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
