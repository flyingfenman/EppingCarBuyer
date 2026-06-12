import Image from "next/image"

export function CarTrailerSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Image
            src="https://pub-a2f7152982044499ae235745de78c2df.r2.dev/car-trailer.jpeg"
            alt="Car and Trailer - Epping Car Buyer"
            width={1920}
            height={1080}
            className="w-full h-auto rounded-lg shadow-lg"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
