-- Add ON CONFLICT clause to topics upsert
CREATE OR REPLACE FUNCTION update_video_topics(
  video_id uuid,
  topics jsonb[]
)
RETURNS void AS $$
BEGIN
  -- Delete existing topics for this video
  DELETE FROM topics WHERE video_id = $1;
  
  -- Insert new topics
  INSERT INTO topics (video_id, topic_name, relevance)
  SELECT 
    $1,
    (topic->>'topic_name')::text,
    (topic->>'relevance')::integer
  FROM jsonb_array_elements($2) AS topic;
END;
$$ LANGUAGE plpgsql;

-- Add function to handle AI analysis upsert
CREATE OR REPLACE FUNCTION upsert_ai_analysis(
  video_id uuid,
  key_takeaways text[],
  content_quality jsonb,
  recommendations text[]
)
RETURNS ai_analysis AS $$
DECLARE
  result ai_analysis;
BEGIN
  INSERT INTO ai_analysis (
    video_id,
    key_takeaways,
    content_quality,
    recommendations,
    updated_at
  )
  VALUES (
    video_id,
    key_takeaways,
    content_quality,
    recommendations,
    now()
  )
  ON CONFLICT (video_id) DO UPDATE SET
    key_takeaways = EXCLUDED.key_takeaways,
    content_quality = EXCLUDED.content_quality,
    recommendations = EXCLUDED.recommendations,
    updated_at = now()
  RETURNING * INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;