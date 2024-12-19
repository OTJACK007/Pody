/*
  # Fix Profile Picture Column Names
  
  1. Schema Changes
    - Rename avatar_url to profile_picture in profiles table
    - Add profile_picture column if missing
  
  2. Data Migration
    - Ensure existing data is preserved
*/

-- Add profile_picture column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'profile_picture'
  ) THEN
    ALTER TABLE profiles 
    ADD COLUMN profile_picture text 
    DEFAULT 'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png';
  END IF;
END $$;

-- Migrate data from avatar_url to profile_picture if needed
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'avatar_url'
  ) THEN
    UPDATE profiles 
    SET profile_picture = avatar_url 
    WHERE profile_picture IS NULL 
    AND avatar_url IS NOT NULL;
    
    ALTER TABLE profiles DROP COLUMN IF EXISTS avatar_url;
  END IF;
END $$;