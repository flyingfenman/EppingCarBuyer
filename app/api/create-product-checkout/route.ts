import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@/lib/supabase/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const productId = body?.productId

    if (!productId || typeof productId !== "string") {
      return NextResponse.json({ error: "Missing product" }, { status: 400 })
    }

    // Always re-fetch the price server-side — never trust a client-supplied amount.
    const supabase = await createClient()
    const { data: product, error } = await supabase
      .from("products")
      .select("id, name, price, photos, status")
      .eq("id", productId)
      .eq("status", "active")
      .maybeSingle()

    if (error || !product) {
      return NextResponse.json({ error: "That product isn't available right now" }, { status: 404 })
    }

    const origin = request.nextUrl.origin
    const firstPhoto = product.photos && product.photos.length > 0 ? product.photos[0] : undefined

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      shipping_address_collection: { allowed_countries: ["GB"] },
      line_items: [
        {
          price_data: {
            currency: "gbp",
            unit_amount: Math.round(product.price * 100),
            product_data: {
              name: product.name,
              images: firstPhoto ? [firstPhoto] : undefined,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: "product_order",
        productId: product.id,
        productName: product.name,
      },
      success_url: `${origin}/shop/ordered?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop/${product.id}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Error creating product checkout session:", error)
    return NextResponse.json({ error: "Failed to start checkout" }, { status: 500 })
  }
}
