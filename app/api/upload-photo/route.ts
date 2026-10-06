import { type NextRequest, NextResponse } from 'next/server'
import { checkPhoto, safeName, savePhoto } from '@/lib/photo-storage'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const registration = formData.get('registration') as string || 'unknown'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const problem = checkPhoto(file)
    if (problem) {
      return NextResponse.json({ error: problem }, { status: 400 })
    }

    // Stored in a folder named after the registration. The link is a full address because it is emailed to us.
    const cleanReg = registration.replace(/[^A-Za-z0-9]/g, '').toUpperCase() || 'UNKNOWN'
    const url = await savePhoto(`valuations/${cleanReg}/${Date.now()}-${safeName(file.name)}`, file, request.url)

    return NextResponse.json({ url })
  } catch (error) {
    console.error('Photo upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
