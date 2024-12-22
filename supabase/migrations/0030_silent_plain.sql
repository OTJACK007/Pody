-- Create podcast_videos table
CREATE TABLE IF NOT EXISTS podcast_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  thumbnail text,
  video_url text,
  duration text,
  views integer DEFAULT 0,
  publish_date timestamptz DEFAULT now(),
  publisher_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create podcast_insights table
CREATE TABLE IF NOT EXISTS podcast_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES podcast_videos ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  timestamp timestamptz DEFAULT now()
);

-- Create podcast_key_moments table
CREATE TABLE IF NOT EXISTS podcast_key_moments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES podcast_videos ON DELETE CASCADE NOT NULL,
  timestamp text NOT NULL,
  title text NOT NULL,
  summary text,
  insights text[] DEFAULT '{}'
);

-- Create podcast_transcripts table
CREATE TABLE IF NOT EXISTS podcast_transcripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES podcast_videos ON DELETE CASCADE NOT NULL,
  time text NOT NULL,
  speaker text,
  text text NOT NULL
);

-- Create podcast_topics table
CREATE TABLE IF NOT EXISTS podcast_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES podcast_videos ON DELETE CASCADE NOT NULL,
  topic_name text NOT NULL,
  relevance integer DEFAULT 0
);

-- Create podcast_full_content table
CREATE TABLE IF NOT EXISTS podcast_full_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES podcast_videos ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  sections jsonb DEFAULT '[]'::jsonb
);

-- Create podcast_related_content table
CREATE TABLE IF NOT EXISTS podcast_related_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES podcast_videos ON DELETE CASCADE NOT NULL,
  related_video_id uuid REFERENCES podcast_videos ON DELETE CASCADE NOT NULL,
  relationship_type text NOT NULL,
  relevance_score integer DEFAULT 0,
  UNIQUE(video_id, related_video_id)
);

-- Enable RLS
ALTER TABLE podcast_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_key_moments ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_full_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_related_content ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Public podcast videos are viewable by everyone"
  ON podcast_videos FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own podcast videos"
  ON podcast_videos FOR ALL
  TO authenticated
  USING (publisher_id = auth.uid());

-- Create function to fetch podcast video with all related data
CREATE OR REPLACE FUNCTION get_podcast_video_with_related_data(video_id uuid)
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
    FROM podcast_videos v
    LEFT JOIN profiles p ON p.id = v.publisher_id
    WHERE v.id = video_id
  ),
  insights_data AS (
    SELECT jsonb_agg(i.*) as insights
    FROM podcast_insights i
    WHERE i.video_id = video_id
  ),
  key_moments_data AS (
    SELECT jsonb_agg(k.*) as key_moments
    FROM podcast_key_moments k
    WHERE k.video_id = video_id
  ),
  transcript_data AS (
    SELECT jsonb_agg(t.* ORDER BY t.time) as transcript
    FROM podcast_transcripts t
    WHERE t.video_id = video_id
  ),
  topics_data AS (
    SELECT jsonb_agg(t.*) as topics
    FROM podcast_topics t
    WHERE t.video_id = video_id
  ),
  full_content_data AS (
    SELECT *
    FROM podcast_full_content f
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
    FROM podcast_related_content rc
    JOIN podcast_videos rv ON rv.id = rc.related_video_id
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
  UPDATE podcast_videos SET views = views + 1 WHERE id = video_id;
  
  RETURN result;
END;
$$;