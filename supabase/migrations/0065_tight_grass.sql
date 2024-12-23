-- Add missing columns and fix constraints
ALTER TABLE podroom_videos 
DROP CONSTRAINT IF EXISTS podroom_videos_user_id_fkey,
DROP CONSTRAINT IF EXISTS podroom_videos_video_id_fkey,
DROP CONSTRAINT IF EXISTS podroom_videos_publisher_id_fkey;

-- Re-add constraints
ALTER TABLE podroom_videos
ADD CONSTRAINT podroom_videos_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
ADD CONSTRAINT podroom_videos_video_id_fkey 
  FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE,
ADD CONSTRAINT podroom_videos_publisher_id_fkey 
  FOREIGN KEY (publisher_id) REFERENCES auth.users(id);

-- Update RPC function
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
    COALESCE(pv.channel_name, 'Unknown Channel') as channel_name,
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
      'type', v.type
    ) as video
  FROM podroom_videos pv
  LEFT JOIN videos v ON v.id = pv.video_id
  WHERE pv.user_id = auth.uid()
  ORDER BY pv.added_at DESC;
END;
$$;