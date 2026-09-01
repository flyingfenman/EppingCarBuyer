import "server-only"
import { createClient } from "@/lib/supabase/server"

export interface PublicCar {
  id: string
  make: string
  model: string
  year: number
  mileage: number
  retail_price: number
  description: string | null
  photos: string[] | null
  created_at: string
}

// Only ever select the columns below — guide_price and notes are trade-only
// and must never reach a public page.
const PUBLIC_COLUMNS = "id, make, model, year, mileage, retail_price, description, photos, created_at"

export async function getPublicCars(): Promise<PublicCar[]> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("cars")
      .select(PUBLIC_COLUMNS)
      .eq("status", "available")
      .not("retail_price", "is", null)
      .order("created_at", { ascending: false })

    if (error || !data) return []
    return data as unknown as PublicCar[]
  } catch {
    return []
  }
}

export async function getPublicCarById(id: string): Promise<PublicCar | null> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("cars")
      .select(PUBLIC_COLUMNS)
      .eq("id", id)
      .eq("status", "available")
      .not("retail_price", "is", null)
      .maybeSingle()

    if (error || !data) return null
    return data as unknown as PublicCar
  } catch {
    return null
  }
}
