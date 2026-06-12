import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

async function getSupabaseClient() {
  const cookieStore = await cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options)
        })
      },
    },
  })
}

async function checkAdmin(supabase: Awaited<ReturnType<typeof getSupabaseClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  return user?.user_metadata?.is_admin === true
}

export async function GET() {
  try {
    const supabase = await getSupabaseClient()
    
    if (!await checkAdmin(supabase)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ cars: data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await getSupabaseClient()
    
    if (!await checkAdmin(supabase)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { make, model, year, mileage, guide_price, status, notes, photos } = body

    const { data, error } = await supabase
      .from('cars')
      .insert({ make, model, year, mileage, guide_price, status, notes, photos })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ car: data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create car' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await getSupabaseClient()
    
    if (!await checkAdmin(supabase)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, make, model, year, mileage, guide_price, status, notes, photos } = body

    const { data, error } = await supabase
      .from('cars')
      .update({ make, model, year, mileage, guide_price, status, notes, photos })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ car: data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update car' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await getSupabaseClient()
    
    if (!await checkAdmin(supabase)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing car ID' }, { status: 400 })
    }

    const { error } = await supabase.from('cars').delete().eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete car' }, { status: 500 })
  }
}
