import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Package, ArrowRight } from "lucide-react"
import { getPublicProducts } from "@/lib/products-public"

export const metadata: Metadata = {
  title: "Shop - Epping Car Buyer",
  description: "Car accessories and products, delivered to your door.",
}

export const revalidate = 60

export default async function ShopPage() {
  const products = await getPublicProducts()

  return (
    <div className="min-h-screen">
      <section className="bg-primary py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Shop</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Car accessories and products, delivered straight to your door.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          {products.length === 0 ? (
            <div className="max-w-lg mx-auto text-center space-y-4 py-12">
              <Package className="w-12 h-12 text-muted-foreground mx-auto" />
              <h2 className="text-2xl font-bold">Nothing in the shop just yet</h2>
              <p className="text-muted-foreground">
                We&apos;re adding products soon — check back shortly.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.id}`}
                  className="group block rounded-2xl border border-border bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden"
                >
                  <div className="relative aspect-[4/3] bg-muted/30">
                    {product.photos && product.photos.length > 0 ? (
                      <Image
                        src={product.photos[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-10 h-10 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                  <div className="p-5 space-y-3">
                    <h2 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h2>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-xl font-bold text-primary">£{product.price.toLocaleString()}</span>
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
