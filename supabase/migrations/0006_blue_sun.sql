/*
  # Fix Profile Creation and User Settings
  
  1. Changes
    - Updates handle_new_user function to properly create profiles
    - Ensures user_settings are created for each new user
    - Adds better error handling
  
  2. Dependencies
    - Requires profiles and user_settings tables
*/

-- Drop existing trigger first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Update handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (
    id,
    fullname,
    email,
    profile_picture
  ) VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      NEW.email
    ),
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'avatar_url',
      'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png'
    )
  );

  -- Create user settings if they don't exist
  INSERT INTO public.user_settings (
    user_id
  ) VALUES (
    NEW.id
  ) ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Log error details
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$ language plpgsql security definer;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Add missing profiles for existing users
DO $$
BEGIN
  INSERT INTO public.profiles (id, fullname, email)
  SELECT 
    id,
    COALESCE(raw_user_meta_data->>'full_name', email),
    email
  FROM auth.users
  WHERE NOT EXISTS (
    SELECT 1 FROM public.profiles WHERE profiles.id = users.id
  );
  
  INSERT INTO public.user_settings (user_id)
  SELECT id FROM auth.users
  WHERE NOT EXISTS (
    SELECT 1 FROM public.user_settings WHERE user_settings.user_id = users.id
  );
END $$;