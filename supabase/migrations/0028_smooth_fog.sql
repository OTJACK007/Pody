-- Enable pg_trgm extension first
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Add composite indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_videos_publisher_status ON videos(publisher_id, status);
CREATE INDEX IF NOT EXISTS idx_videos_publisher_type ON videos(publisher_id, type);
CREATE INDEX IF NOT EXISTS idx_videos_status_type ON videos(status, type);

-- Add trigram indexes for text search after enabling extension
CREATE INDEX IF NOT EXISTS idx_videos_title_trgm ON videos USING gin(title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_videos_description_trgm ON videos USING gin(description gin_trgm_ops);

-- Add indexes for related tables
CREATE INDEX IF NOT EXISTS idx_insights_video_timestamp ON insights(video_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_key_moments_video_timestamp ON key_moments(video_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_transcripts_video_time ON transcripts(video_id, time);
CREATE INDEX IF NOT EXISTS idx_topics_video_relevance ON topics(video_id, relevance);
CREATE INDEX IF NOT EXISTS idx_related_content_scores ON related_content(video_id, relevance_score DESC);

-- Create function to efficiently fetch video with all related data
CREATE OR REPLACE FUNCTION get_video_with_related_data(video_id uuid)
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
      p.fullname as publisher_name,
      p.profile_picture as publisher_avatar
    FROM videos v
    LEFT JOIN profiles p ON p.id = v.publisher_id
    WHERE v.id = video_id
  ),
  insights_data AS (
    SELECT jsonb_agg(i.*) as insights
    FROM insights i
    WHERE i.video_id = video_id
  ),
  key_moments_data AS (
    SELECT jsonb_agg(k.*) as key_moments
    FROM key_moments k
    WHERE k.video_id = video_id
  ),
  transcript_data AS (
    SELECT jsonb_agg(t.* ORDER BY t.time) as transcript
    FROM transcripts t
    WHERE t.video_id = video_id
  ),
  topics_data AS (
    SELECT jsonb_agg(t.*) as topics
    FROM topics t
    WHERE t.video_id = video_id
  ),
  full_content_data AS (
    SELECT *
    FROM full_content f
    WHERE f.video_id = video_id
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
          'name', p.fullname,
          'avatar', p.profile_picture
        )
      )
    ) as related_videos
    FROM related_content rc
    JOIN videos rv ON rv.id = rc.related_video_id
    LEFT JOIN profiles p ON p.id = rv.publisher_id
    WHERE rc.video_id = video_id
  )
  SELECT jsonb_build_object(
    'video', to_jsonb(vd.*),
    'insights', COALESCE(i.insights, '[]'::jsonb),
    'keyMoments', COALESCE(k.key_moments, '[]'::jsonb),
    'transcript', COALESCE(t.transcript, '[]'::jsonb),
    'topics', COALESCE(tp.topics, '[]'::jsonb),
    'fullContent', to_jsonb(fc.*),
    'relatedVideos', COALESCE(rv.related_videos, '[]'::jsonb)
  ) INTO result
  FROM video_data vd
  LEFT JOIN insights_data i ON true
  LEFT JOIN key_moments_data k ON true
  LEFT JOIN transcript_data t ON true
  LEFT JOIN topics_data tp ON true
  LEFT JOIN full_content_data fc ON true
  LEFT JOIN related_videos_data rv ON true;

  -- Increment view count asynchronously
  PERFORM pg_notify('increment_views', video_id::text);
  
  RETURN result;
END;
$$;