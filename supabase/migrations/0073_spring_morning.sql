-- Insert sample related content data
INSERT INTO related_content (
  video_id,
  related_video_id,
  relationship_type,
  relevance_score
) VALUES
-- For "The Future of AI Technology" video
(
  'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',  -- Main video
  'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',  -- Machine Learning Fundamentals
  'similar',
  95
),
(
  'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',  -- Main video
  'c3d4e5f6-a1b2-6543-8765-3c4d5e6f1a2b',  -- Quick AI Tips
  'recommended',
  85
),

-- For "Machine Learning Fundamentals" video
(
  'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',  -- Main video
  'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',  -- The Future of AI Technology
  'similar',
  90
),
(
  'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',  -- Main video
  'c3d4e5f6-a1b2-6543-8765-3c4d5e6f1a2b',  -- Quick AI Tips
  'recommended',
  80
),

-- For "Quick AI Tips" video
(
  'c3d4e5f6-a1b2-6543-8765-3c4d5e6f1a2b',  -- Main video
  'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',  -- The Future of AI Technology
  'similar',
  85
),
(
  'c3d4e5f6-a1b2-6543-8765-3c4d5e6f1a2b',  -- Main video
  'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',  -- Machine Learning Fundamentals
  'recommended',
  75
);

-- Create function to get related videos with channel info
CREATE OR REPLACE FUNCTION get_related_videos(target_video_id uuid)
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
    WHERE rc.video_id = target_video_id
    GROUP BY rc.video_id
  )
  SELECT 
    gr.video_id,
    COALESCE(gr.related_videos, '[]'::jsonb) as related_videos
  FROM grouped_relationships gr;
END;
$$;