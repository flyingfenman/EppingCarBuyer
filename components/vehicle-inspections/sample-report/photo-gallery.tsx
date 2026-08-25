import Image from "next/image"
import { Images } from "lucide-react"

const photos = [
  { file: "rk22ucj-ins-2.jpg", label: "Front exterior" },
  { file: "rk22ucj-ins-3.jpg", label: "Side profile" },
  { file: "rk22ucj-ins-12.jpg", label: "Front three-quarter view" },
  { file: "rk22ucj-ins-13.jpg", label: "Front detail — lights & bumper" },
  { file: "rk22ucj-ins-1.jpg", label: "Front wing & wheel arch" },
  { file: "rk22ucj-ins-4.jpg", label: "Front tyre tread" },
  { file: "rk22ucj-ins-5.jpg", label: "Front wheel condition" },
  { file: "rk22ucj-ins-6.jpg", label: "Wheel & tyre condition" },
  { file: "rk22ucj-ins-7.jpg", label: "Rear tyre tread" },
  { file: "rk22ucj-ins-8.jpg", label: "Interior & dashboard" },
  { file: "rk22ucj-ins-9.jpg", label: "Driver's seat & footwell" },
  { file: "rk22ucj-ins-10.jpg", label: "Steering column controls" },
  { file: "rk22ucj-ins-11.jpg", label: "Digital instrument cluster" },
]

export function ReportPhotoGallery() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Sample Photo Report</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real photos from one of our own inspections, showing the kind of coverage every report includes
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.file}
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md border border-border"
              >
                <Image
                  src={`/images/sample-report/${photo.file}`}
                  alt={photo.label}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 px-3 py-2">
                  <p className="text-xs font-semibold text-white">{photo.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-center">
            <Images className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Full inspections include 30–40+ photos like these, covering every area of the vehicle.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
