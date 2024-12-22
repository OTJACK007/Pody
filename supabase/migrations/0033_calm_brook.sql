-- Create ai_analysis table
CREATE TABLE IF NOT EXISTS ai_analysis (
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
  updated_at timestamptz DEFAULT now(),
  UNIQUE(video_id)
);

-- Enable RLS
ALTER TABLE ai_analysis ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Public video AI analysis is viewable by everyone"
  ON ai_analysis FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM videos WHERE videos.id = video_id AND videos.status = 'public'
  ));

CREATE POLICY "Users can view AI analysis for their own videos"
  ON ai_analysis FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM videos WHERE videos.id = video_id AND videos.publisher_id = auth.uid()
  ));

-- Add sample data
INSERT INTO ai_analysis (
  video_id,
  key_takeaways,
  content_quality,
  recommendations
) VALUES (
  'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',
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