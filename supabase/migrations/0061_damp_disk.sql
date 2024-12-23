-- Create function to get podroom videos with video details
CREATE OR REPLACE FUNCTION get_podroom_videos()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  video_id uuid,
  added_at timestamptz,
  notes text,
  is_favorite boolean,
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
        'name', p.fullname,
        'avatar', p.profile_picture
      )
    ) as video
  FROM podroom_videos pv
  LEFT JOIN videos v ON v.id = pv.video_id
  LEFT JOIN profiles p ON p.id = v.publisher_id
  WHERE pv.user_id = auth.uid()
  ORDER BY pv.added_at DESC;
END;
$$;