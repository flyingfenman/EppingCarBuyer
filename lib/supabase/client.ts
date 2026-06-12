import { createBrowserClient, type SupabaseClient } from '@supabase/ssr'

let cachedClient: SupabaseClient | null = null
let cachedConfig: { url: string; anonKey: string } | null = null

export async function getSupabaseConfig() {
  if (cachedConfig) return cachedConfig
  
  // Try environment variables first
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (url && key) {
    cachedConfig = { url, anonKey: key }
    return cachedConfig
  }
  
  // Fetch from API if env vars not available on client
  const res = await fetch('/api/supabase-config')
  if (!res.ok) throw new Error('Failed to get Supabase config')
  cachedConfig = await res.json()
  return cachedConfig!
}

export function createClient() {
  // For synchronous usage, try env vars directly
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (supabaseUrl && supabaseKey) {
    return createBrowserClient(supabaseUrl, supabaseKey)
  }
  
  // If cached config exists, use it
  if (cachedConfig) {
    return createBrowserClient(cachedConfig.url, cachedConfig.anonKey)
  }
  
  throw new Error('Call getSupabaseConfig() first or set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export async function createClientAsync() {
  if (cachedClient) return cachedClient
  
  const config = await getSupabaseConfig()
  cachedClient = createBrowserClient(config.url, config.anonKey)
  return cachedClient
}
