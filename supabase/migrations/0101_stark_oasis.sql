-- Add new columns to userchannels table
ALTER TABLE userchannels
ADD COLUMN IF NOT EXISTS is_creator boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS is_shogun_featured boolean DEFAULT false;

-- Create index for better performance when querying featured creators
CREATE INDEX IF NOT EXISTS idx_userchannels_featured ON userchannels(is_shogun_featured) WHERE is_shogun_featured = true;

-- Update existing channels with default values
UPDATE userchannels
SET 
  is_creator = false,
  is_shogun_featured = false
WHERE is_creator IS NULL OR is_shogun_featured IS NULL;

-- Set some sample featured creators
UPDATE userchannels
SET 
  is_creator = true,
  is_shogun_featured = true
WHERE channel_name IN (
  'TechInsights',
  'MindsetGuru',
  'BusinessPro'
);