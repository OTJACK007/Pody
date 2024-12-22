-- Create ai_insights table
CREATE TABLE IF NOT EXISTS ai_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos ON DELETE CASCADE NOT NULL,
  key_takeaways text[] DEFAULT '{}',
  content_quality jsonb DEFAULT jsonb_build_object(
    'insightDepth', 0,
    'actionability', 0,
    'relevance', 0,
    'clarity', 0
  ),
  recommendations text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Public video AI insights are viewable by everyone"
  ON ai_insights FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM videos WHERE videos.id = video_id AND videos.status = 'public'
  ));

CREATE POLICY "Users can view AI insights for their own videos"
  ON ai_insights FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM videos WHERE videos.id = video_id AND videos.publisher_id = auth.uid()
  ));

-- Add sample AI insights
INSERT INTO ai_insights (video_id, key_takeaways, content_quality, recommendations)
VALUES (
  'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
  ARRAY[
    'AI ethics must be prioritized in development',
    'Machine learning is becoming more accessible',
    'Healthcare will be transformed by AI applications'
  ],
  jsonb_build_object(
    'insightDepth', 95,
    'actionability', 88,
    'relevance', 92,
    'clarity', 90
  ),
  ARRAY[
    'Explore practical AI implementation strategies',
    'Consider ethical implications in AI development',
    'Focus on healthcare AI applications'
  ]
);