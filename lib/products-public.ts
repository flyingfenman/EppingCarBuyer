import "server-only"
import { createClient } from "@/lib/supabase/server"

export interface PublicProduct {
  id: string
  name: string
  description: string | null
  price: number
  photos: string[] | null
  created_at: string
}

// Only ever select the columns below — supplier_notes is internal and must
// never reach a public page.
const PUBLIC_COLUMNS = "id, name, description, price, photos, created_at"

export async function getPublicProducts(): Promise<PublicProduct[]> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("products")
      .select(PUBLIC_COLUMNS)
      .eq("status", "active")
      .order("created_at", { ascending: false })

    if (error || !data) return []
    return data as unknown as PublicProduct[]
  } catch {
    return []
  }
}

export async function getPublicProductById(id: string): Promise<PublicProduct | null> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("products")
      .select(PUBLIC_COLUMNS)
      .eq("id", id)
      .eq("status", "active")
      .maybeSingle()

    if (error || !data) return null
    return data as unknown as PublicProduct
  } catch {
    return null
  }
}
