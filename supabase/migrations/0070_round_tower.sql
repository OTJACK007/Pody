-- Drop existing function
DROP FUNCTION IF EXISTS get_video_with_metadata(uuid);

-- Recreate function with proper null handling
CREATE OR REPLACE FUNCTION get_video_with_metadata(target_video_id uuid)
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
      COALESCE(uc.channel_name, 'Unknown Channel') as channel_name,
      COALESCE(uc.profile_image, 'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png') as profile_image
    FROM videos v
    LEFT JOIN userchannels uc ON uc.user_id = v.publisher_id
    WHERE v.id = target_video_id
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
          'name', COALESCE(uc.channel_name, 'Unknown Channel'),
          'avatar', COALESCE(uc.profile_image, 'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png')
        )
      )
    ) as related_videos
    FROM related_content rc
    JOIN videos rv ON rv.id = rc.related_video_id
    LEFT JOIN userchannels uc ON uc.user_id = rv.publisher_id
    WHERE rc.video_id = target_video_id
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