-- Add unique constraints and indexes for video metadata tables
ALTER TABLE full_content DROP CONSTRAINT IF EXISTS unique_video_content;
ALTER TABLE full_content ADD CONSTRAINT unique_video_content UNIQUE (video_id);

ALTER TABLE ai_analysis DROP CONSTRAINT IF EXISTS unique_video_analysis;
ALTER TABLE ai_analysis ADD CONSTRAINT unique_video_analysis UNIQUE (video_id);

-- Create function to handle full content upsert
CREATE OR REPLACE FUNCTION upsert_full_content(
  video_id uuid,
  title text,
  description text,
  sections jsonb
)
RETURNS full_content AS $$
DECLARE
  result full_content;
BEGIN
  INSERT INTO full_content (
    video_id,
    title,
    description,
    sections,
    updated_at
  )
  VALUES (
    video_id,
    title,
    description,
    sections,
    now()
  )
  ON CONFLICT (video_id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    sections = EXCLUDED.sections,
    updated_at = now()
  RETURNING * INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Create function to handle topics upsert
CREATE OR REPLACE FUNCTION upsert_video_topics(
  video_id uuid,
  topic_data jsonb[]
)
RETURNS SETOF topics AS $$
BEGIN
  -- Delete existing topics
  DELETE FROM topics WHERE video_id = $1;
  
  -- Insert new topics
  RETURN QUERY
  INSERT INTO topics (
    video_id,
    topic_name,
    relevance
  )
  SELECT 
    $1,
    (topic->>'topic_name')::text,
    (topic->>'relevance')::integer
  FROM jsonb_array_elements($2) AS topic
  RETURNING *;
END;
$$ LANGUAGE plpgsql;