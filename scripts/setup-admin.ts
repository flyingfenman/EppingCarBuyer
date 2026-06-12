import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function createAdminUser() {
  const email = "henry@eppingcarbuyer.com"
  const password = "Boston7530*"

  console.log("Creating admin user:", email)

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      is_admin: true,
    },
  })

  if (error) {
    if (error.message.includes("already been registered")) {
      console.log("User already exists, updating to admin...")
      
      // Get existing user and update metadata
      const { data: users } = await supabase.auth.admin.listUsers()
      const existingUser = users?.users?.find(u => u.email === email)
      
      if (existingUser) {
        const { error: updateError } = await supabase.auth.admin.updateUserById(
          existingUser.id,
          { user_metadata: { is_admin: true } }
        )
        if (updateError) {
          console.error("Error updating user:", updateError)
          return
        }
        console.log("User updated to admin successfully!")
        return
      }
    }
    console.error("Error creating admin:", error)
    return
  }

  console.log("Admin user created successfully!")
  console.log("User ID:", data.user?.id)
}

createAdminUser()
