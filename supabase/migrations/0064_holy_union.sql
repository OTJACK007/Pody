-- Drop existing function if exists
DROP FUNCTION IF EXISTS get_podroom_videos();

-- Add publisher_id column to podroom_videos if it doesn't exist
ALTER TABLE podroom_videos 
ADD COLUMN IF NOT EXISTS publisher_id uuid REFERENCES auth.users(id);

-- Update publisher_id from videos table
UPDATE podroom_videos pv
SET publisher_id = v.publisher_id
FROM videos v
WHERE v.id = pv.video_id;

-- Create function to get podroom videos with video and channel details
CREATE OR REPLACE FUNCTION get_podroom_videos()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  video_id uuid,
  added_at timestamptz,
  notes text,
  is_favorite boolean,
  channel_name text,
  publisher_id uuid,
  video jsonb
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pv.id,
    pv.user_id,
    pv.video_id,
    pv.added_at,
    pv.notes,
    pv.is_favorite,
    pv.channel_name,
    pv.publisher_id,
    jsonb_build_object(
      'id', v.id,
      'title', v.title,
      'description', v.description,
      'thumbnail', v.thumbnail,
      'duration', v.duration,
      'views', v.views,
      'publish_date', v.publish_date,
      'status', v.status,
      'type', v.type,
      'channel', jsonb_build_object(
        'name', uc.channel_name,
        'avatar', uc.profile_image
      )
    ) as video
  FROM podroom_videos pv
  LEFT JOIN videos v ON v.id = pv.video_id
  LEFT JOIN userchannels uc ON uc.user_id = pv.publisher_id
  WHERE pv.user_id = auth.uid()
  ORDER BY pv.added_at DESC;
END;
$$;