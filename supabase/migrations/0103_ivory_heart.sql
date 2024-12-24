-- Add is_verified column to userchannels table
ALTER TABLE userchannels
ADD COLUMN IF NOT EXISTS is_verified boolean DEFAULT true;

-- Update existing channels
UPDATE userchannels
SET is_verified = true
WHERE is_verified IS NULL;