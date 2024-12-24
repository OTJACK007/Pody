-- Create platform type enum
DO $$ BEGIN
  CREATE TYPE video_platform AS ENUM (
    'Shogun Live',
    'YouTube',
    'X',
    'TikTok',
    'Instagram',
    'LinkedIn',
    'Facebook',
    'Twitch',
    'Kick'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add linkedplatform column to videos table
ALTER TABLE videos
ADD COLUMN IF NOT EXISTS linkedplatform video_platform DEFAULT 'Shogun Live';

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_videos_linkedplatform ON videos(linkedplatform);

-- Update existing videos to YouTube
UPDATE videos
SET linkedplatform = 'YouTube'
WHERE linkedplatform IS NULL;