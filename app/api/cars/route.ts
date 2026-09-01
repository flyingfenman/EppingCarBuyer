import { NextResponse } from "next/server"
import { getPublicCars } from "@/lib/cars-public"

export async function GET() {
  const cars = await getPublicCars()
  return NextResponse.json({ cars })
}
