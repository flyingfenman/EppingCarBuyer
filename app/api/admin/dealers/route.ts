import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.user_metadata?.is_admin !== true) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { email, password, name, company_name, phone } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Email, password and name are required' }, { status: 400 })
    }

    // Create admin client with service role key
    const adminClient = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    // Create the user in Supabase Auth
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { is_dealer: true }
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    // Create dealer profile
    const { error: profileError } = await adminClient
      .from('dealers')
      .insert({
        id: authData.user.id,
        email,
        name,
        company_name: company_name || null,
        phone: phone || null,
      })

    if (profileError) {
      // Rollback: delete the auth user if profile creation fails
      await adminClient.auth.admin.deleteUser(authData.user.id)
      return NextResponse.json({ error: profileError.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, dealer: { id: authData.user.id, email, name } })
  } catch (error) {
    console.error('Error creating dealer:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.user_metadata?.is_admin !== true) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const dealerId = searchParams.get('id')

    if (!dealerId) {
      return NextResponse.json({ error: 'Dealer ID required' }, { status: 400 })
    }

    // Create admin client with service role key
    const adminClient = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    // Delete user from auth (this will cascade to dealers table due to foreign key)
    const { error } = await adminClient.auth.admin.deleteUser(dealerId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting dealer:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
