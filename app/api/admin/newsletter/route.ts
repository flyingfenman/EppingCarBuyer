import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { listSubscribers } from '@/lib/newsletter'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.user_metadata?.is_admin !== true) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const subscribers = await listSubscribers()
    return NextResponse.json({ ready: subscribers !== null, subscribers: subscribers ?? [] })
  } catch (error) {
    console.error('Admin newsletter list failed:', error)
    return NextResponse.json({ error: 'Could not load the list from Resend' }, { status: 502 })
  }
}
