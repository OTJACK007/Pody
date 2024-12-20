-- Add role column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'user';

-- Create index on role column
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- Add RLS policy for role
CREATE POLICY "Users can view their own role"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Add RLS policy for updating role (admin only)
CREATE POLICY "Only admins can update roles"
  ON profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );