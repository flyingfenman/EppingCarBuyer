-- Create admin user for Henry
-- This creates an auth user with admin privileges

-- First, we need to use Supabase's auth.users table
-- The admin user will be created via the signup flow, but we'll mark them as admin

-- Insert into dealers table as an admin record (optional, for reference)
-- The actual admin check is done via user_metadata in the auth system

-- Note: The admin user should sign up via the /admin/login page
-- After signing up, run this to grant admin access:

UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{is_admin}',
  'true'::jsonb
)
WHERE email = 'henry@eppingcarbuyer.com';
