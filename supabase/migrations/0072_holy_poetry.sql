-- Create function to get video relationships as JSON
CREATE OR REPLACE FUNCTION get_video_relationships()
RETURNS TABLE (
  video_id uuid,
  related_videos jsonb
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  WITH grouped_relationships AS (
    SELECT 
      rc.video_id,
      jsonb_agg(
        jsonb_build_object(
          'id', rv.id,
          'title', rv.title,
          'thumbnail', rv.thumbnail,
          'duration', rv.duration,
          'views', rv.views,
          'channel', jsonb_build_object(
            'name', COALESCE(uc.channel_name, 'Unknown Channel'),
            'avatar', COALESCE(uc.profile_image, 'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png')
          ),
          'relationship_type', rc.relationship_type,
          'relevance_score', rc.relevance_score
        ) ORDER BY rc.relevance_score DESC
      ) as related_videos
    FROM related_content rc
    JOIN videos rv ON rv.id = rc.related_video_id
    LEFT JOIN userchannels uc ON uc.user_id = rv.publisher_id
    GROUP BY rc.video_id
  )
  SELECT 
    gr.video_id,
    COALESCE(gr.related_videos, '[]'::jsonb) as related_videos
  FROM grouped_relationships gr;
END;
$$;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_related_content_video_id_score 
ON related_content(video_id, relevance_score DESC);

-- Create index for channel lookups
CREATE INDEX IF NOT EXISTS idx_videos_publisher_channel 
ON videos(publisher_id) 
INCLUDE (id, title, thumbnail, duration, views);