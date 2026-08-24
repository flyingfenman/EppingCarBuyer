import Image from "next/image"
import { Images, Camera } from "lucide-react"

const placeholderTiles = [
  "Rear exterior",
  "Interior & dashboard",
  "Engine bay",
  "Underbody & suspension",
  "Front tyre tread",
  "OBD diagnostic scan",
  "Road test",
]

export function ReportPhotoGallery() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">Sample Photo Report</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every inspection comes with a full photo report — this is a mock-up of the layout
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md border border-border">
              <Image
                src="/images/fb-hero-car.png"
                alt="Example exterior photo used for illustration — not a real inspection photo of a fictional demo vehicle"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/60 px-3 py-2">
                <p className="text-xs font-semibold text-white">Front exterior</p>
              </div>
            </div>

            {placeholderTiles.map((label) => (
              <div
                key={label}
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-dashed border-border bg-muted/40 flex flex-col items-center justify-center gap-2 text-center px-3"
              >
                <Camera className="w-6 h-6 text-muted-foreground/60" />
                <p className="text-xs font-medium text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-center">
            <Images className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Full inspections include 30–40+ real photos covering every area of the vehicle — this sample just
              shows the layout.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
