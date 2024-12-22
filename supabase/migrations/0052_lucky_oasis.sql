-- First, clear existing insight_ids to start fresh
UPDATE topics 
SET insight_ids = '{}';

-- Create function to find related insights for a topic
CREATE OR REPLACE FUNCTION find_topic_insights(topic_name text)
RETURNS uuid[] AS $$
BEGIN
  RETURN ARRAY(
    SELECT id::uuid
    FROM insights
    WHERE content ILIKE '%' || topic_name || '%'
  );
END;
$$ LANGUAGE plpgsql;

-- Update topics with related insights
UPDATE topics t
SET insight_ids = find_topic_insights(t.topic_name)
WHERE true;

-- Add sample insights if none exist
INSERT INTO insights (id, video_id, content)
SELECT 
  gen_random_uuid(),
  t.video_id,
  'Key insight about ' || t.topic_name || ': ' || (
    CASE 
      WHEN t.topic_name ILIKE '%AI%' THEN 'AI technology is transforming industries through automation and intelligence'
      WHEN t.topic_name ILIKE '%Machine Learning%' THEN 'Machine learning models require quality training data'
      WHEN t.topic_name ILIKE '%Ethics%' THEN 'Ethical considerations are crucial in technology development'
      ELSE 'Important insight related to ' || t.topic_name
    END
  )
FROM topics t
WHERE t.insight_ids = '{}';

-- Update topics again to include new insights
UPDATE topics t
SET insight_ids = find_topic_insights(t.topic_name)
WHERE t.insight_ids = '{}';