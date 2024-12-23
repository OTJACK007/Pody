-- Update get_podroom_videos function to include channel profile image
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
    COALESCE(uc.channel_name, 'Unknown Channel') as channel_name,
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
        'name', COALESCE(uc.channel_name, 'Unknown Channel'),
        'avatar', COALESCE(uc.profile_image, 'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png')
      )
    ) as video
  FROM podroom_videos pv
  LEFT JOIN videos v ON v.id = pv.video_id
  LEFT JOIN userchannels uc ON uc.user_id = pv.publisher_id
  WHERE pv.user_id = auth.uid()
  ORDER BY pv.added_at DESC;
END;
$$;