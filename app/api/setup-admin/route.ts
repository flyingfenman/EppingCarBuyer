import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Use service role to create admin user
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )

    // Create the user with admin metadata
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        is_admin: true,
      },
    })

    if (error) {
      console.error("Error creating admin:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ 
      success: true, 
      message: "Admin account created successfully",
      userId: data.user?.id 
    })
  } catch (error) {
    console.error("Setup error:", error)
    return NextResponse.json(
      { error: "Failed to create admin account" },
      { status: 500 }
    )
  }
}
