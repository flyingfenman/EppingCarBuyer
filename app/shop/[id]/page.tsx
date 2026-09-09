import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Truck } from "lucide-react"
import { getPublicProductById } from "@/lib/products-public"
import { PhotoGallery } from "@/components/photo-gallery"
import { BuyButton } from "@/components/shop/buy-button"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = await getPublicProductById(id)
  if (!product) return { title: "Product Not Found - Epping Car Buyer" }
  return {
    title: `${product.name} - Epping Car Buyer Shop`,
    description: product.description || `${product.name} — £${product.price.toLocaleString()}`,
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  const product = await getPublicProductById(id)

  if (!product) notFound()

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to shop
        </Link>

        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 max-w-6xl mx-auto">
          <PhotoGallery photos={product.photos || []} alt={product.name} />

          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>

            <p className="text-4xl font-bold text-primary">£{product.price.toLocaleString()}</p>

            {product.description && (
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{product.description}</p>
            )}

            <div className="flex items-center gap-2.5 text-sm text-muted-foreground bg-muted/40 rounded-xl p-4">
              <Truck className="w-5 h-5 text-primary flex-shrink-0" />
              Delivered to your door, UK mainland.
            </div>

            <BuyButton productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
