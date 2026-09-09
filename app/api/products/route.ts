import { NextResponse } from "next/server"
import { getPublicProducts } from "@/lib/products-public"

export async function GET() {
  const products = await getPublicProducts()
  return NextResponse.json({ products })
}
