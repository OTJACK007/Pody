-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can manage AI insights for their own videos" ON ai_insights;
DROP POLICY IF EXISTS "Users can view AI insights for public videos" ON ai_insights;

-- Create RLS policies for ai_insights table
CREATE POLICY "Users can manage AI insights for their own videos"
  ON ai_insights
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_id
      AND videos.publisher_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_id
      AND videos.publisher_id = auth.uid()
    )
  );

CREATE POLICY "Users can view AI insights for public videos"
  ON ai_insights FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_id
      AND (videos.status = 'public' OR videos.publisher_id = auth.uid())
    )
  );

-- Ensure RLS is enabled
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;