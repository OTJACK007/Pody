-- Add insight_ids column to topics table if it doesn't exist
ALTER TABLE topics 
ADD COLUMN IF NOT EXISTS insight_ids uuid[] DEFAULT '{}';

-- Create index on insight_ids for better performance
CREATE INDEX IF NOT EXISTS idx_topics_insight_ids ON topics USING gin(insight_ids);

-- Update existing topics with sample insight_ids
WITH topic_insights AS (
  SELECT 
    t.id as topic_id,
    array_agg(i.id) as insight_ids
  FROM topics t
  CROSS JOIN insights i
  WHERE i.content ILIKE '%' || t.topic_name || '%'
  GROUP BY t.id
)
UPDATE topics t
SET insight_ids = ti.insight_ids
FROM topic_insights ti
WHERE t.id = ti.topic_id;