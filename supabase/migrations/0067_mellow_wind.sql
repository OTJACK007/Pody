-- Add foreign key relationship between videos and userchannels
ALTER TABLE videos
ADD COLUMN IF NOT EXISTS channel_id uuid REFERENCES userchannels(id);

-- Update existing videos with channel_id
UPDATE videos v
SET channel_id = uc.id
FROM userchannels uc
WHERE uc.user_id = v.publisher_id;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_videos_channel_id ON videos(channel_id);

-- Update get_video_with_metadata function to use proper joins
CREATE OR REPLACE FUNCTION get_video_with_metadata(video_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result jsonb;
BEGIN
  WITH video_data AS (
    SELECT 
      v.*,
      uc.channel_name,
      uc.profile_image
    FROM videos v
    LEFT JOIN userchannels uc ON uc.id = v.channel_id
    WHERE v.id = video_id
  ),
  related_videos_data AS (
    SELECT jsonb_agg(
      jsonb_build_object(
        'id', rv.id,
        'title', rv.title,
        'thumbnail', rv.thumbnail,
        'duration', rv.duration,
        'views', rv.views,
        'channel', jsonb_build_object(
          'name', uc.channel_name,
          'avatar', uc.profile_image
        )
      )
    ) as related_videos
    FROM related_content rc
    JOIN videos rv ON rv.id = rc.related_video_id
    LEFT JOIN userchannels uc ON uc.id = rv.channel_id
    WHERE rc.video_id = video_id
  )
  SELECT jsonb_build_object(
    'video', jsonb_build_object(
      'id', vd.id,
      'title', vd.title,
      'description', vd.description,
      'thumbnail', vd.thumbnail,
      'video_url', vd.video_url,
      'duration', vd.duration,
      'views', vd.views,
      'publish_date', vd.publish_date,
      'status', vd.status,
      'type', vd.type,
      'publisher_id', vd.publisher_id,
      'channel', jsonb_build_object(
        'name', vd.channel_name,
        'avatar', vd.profile_image
      )
    ),
    'relatedVideos', COALESCE(rv.related_videos, '[]'::jsonb)
  ) INTO result
  FROM video_data vd
  LEFT JOIN related_videos_data rv ON true;

  RETURN result;
END;
$$;