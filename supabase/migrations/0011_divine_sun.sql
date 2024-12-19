/*
  # Add Professional Information to User Settings
  
  1. Changes
    - Adds professional_info column to user_settings table
    - Sets default values for existing rows
*/

-- Add Professional Information column
ALTER TABLE public.user_settings 
ADD COLUMN IF NOT EXISTS professional_info jsonb;

-- Set default value for new professional_info column
ALTER TABLE public.user_settings 
ALTER COLUMN professional_info SET DEFAULT '{
  "company": "",
  "jobTitle": "",
  "location": "",
  "website": ""
}'::jsonb;

-- Update existing rows with default value
UPDATE public.user_settings
SET professional_info = '{
  "company": "",
  "jobTitle": "",
  "location": "",
  "website": ""
}'::jsonb
WHERE professional_info IS NULL;