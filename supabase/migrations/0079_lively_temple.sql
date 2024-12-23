-- Add streaming status to userchannels table
ALTER TABLE userchannels
ADD COLUMN IF NOT EXISTS is_streaming boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS streaming_platform text,
ADD COLUMN IF NOT EXISTS stream_title text,
ADD COLUMN IF NOT EXISTS stream_viewers integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS stream_started_at timestamptz;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_userchannels_streaming ON userchannels(is_streaming);

-- Insert sample streaming data
UPDATE userchannels
SET 
  is_streaming = true,
  streaming_platform = CASE floor(random() * 5)
    WHEN 0 THEN 'YouTube'
    WHEN 1 THEN 'Kick'
    WHEN 2 THEN 'X'
    WHEN 3 THEN 'TikTok'
    ELSE 'Instagram'
  END,
  stream_title = CASE floor(random() * 5)
    WHEN 0 THEN 'Live Q&A Session'
    WHEN 1 THEN 'Tech Talk Live'
    WHEN 2 THEN 'Podcast Recording'
    WHEN 3 THEN 'Community Chat'
    ELSE 'Special Announcement'
  END,
  stream_viewers = floor(random() * 10000) + 100,
  stream_started_at = now() - (floor(random() * 180) || ' minutes')::interval
WHERE random() < 0.3; -- Make 30% of channels live