// Updated: Force rebuild timestamp 2026-03-19
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Get env vars with fallbacks
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

  // Skip if Supabase not configured
  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Redirect unauthenticated users to login
  if (!user) {
    if (request.nextUrl.pathname.startsWith('/admin/dashboard') ||
        request.nextUrl.pathname.startsWith('/admin/dealers') ||
        request.nextUrl.pathname.startsWith('/admin/cars') ||
        request.nextUrl.pathname.startsWith('/admin/bids') ||
        request.nextUrl.pathname.startsWith('/admin/enquiries')) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }
    if (request.nextUrl.pathname.startsWith('/dealer/dashboard') ||
        request.nextUrl.pathname.startsWith('/dealer/car')) {
      const url = request.nextUrl.clone()
      url.pathname = '/dealer/login'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
