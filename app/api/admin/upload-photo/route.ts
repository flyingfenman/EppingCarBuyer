import { NextResponse } from 'next/server'
import { checkPhoto, safeName, savePhoto } from '@/lib/photo-storage'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

async function checkAdmin() {
  const cookieStore = await cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return false
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
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

  const { data: { user } } = await supabase.auth.getUser()
  return user?.user_metadata?.is_admin === true
}

export async function POST(request: Request) {
  try {
    if (!await checkAdmin()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const problem = checkPhoto(file)
    if (problem) {
      return NextResponse.json({ error: problem }, { status: 400 })
    }

    // The saved address is relative on Cloudflare, so it keeps working whatever the website's address is.
    const url = await savePhoto(`cars/${Date.now()}-${safeName(file.name)}`, file)

    return NextResponse.json({ url })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Failed to upload photo' }, { status: 500 })
  }
}
