import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(_request: NextRequest) {
  // Middleware disabled - auth is handled at page level via server actions
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
