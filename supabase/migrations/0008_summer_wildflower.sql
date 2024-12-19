-- Drop existing trigger first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop existing policies that depend on user_id
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

-- Now we can safely modify the profiles table
ALTER TABLE profiles 
DROP COLUMN IF EXISTS user_id,
ADD COLUMN IF NOT EXISTS fullname text;

-- Create new policies using id instead of user_id
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Update trigger function
CREATE OR REPLACE FUNCTION handle_new_user_signup()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (
    id,
    fullname,
    email,
    profile_picture
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'avatar_url',
      'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png'
    )
  );

  -- Insert into user_settings
  INSERT INTO public.user_settings (
    user_id,
    theme,
    color_scheme
  ) VALUES (
    NEW.id,
    'dark',
    '#ff3366'
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user_signup();