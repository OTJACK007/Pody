-- Drop existing policies
DROP POLICY IF EXISTS "Users can manage AI analysis" ON ai_analysis;
DROP POLICY IF EXISTS "Users can view AI analysis" ON ai_analysis;
DROP POLICY IF EXISTS "Users can manage video metadata" ON videos;
DROP POLICY IF EXISTS "Users can manage topics" ON topics;
DROP POLICY IF EXISTS "Users can manage key moments" ON key_moments;
DROP POLICY IF EXISTS "Users can manage transcripts" ON transcripts;
DROP POLICY IF EXISTS "Users can manage full content" ON full_content;

-- Create comprehensive RLS policies for AI analysis
CREATE POLICY "Users can manage AI analysis"
  ON ai_analysis
  FOR ALL
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

CREATE POLICY "Users can view AI analysis"
  ON ai_analysis
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_id
      AND (videos.status = 'public' OR videos.publisher_id = auth.uid())
    )
  );

-- Add comprehensive policies for video metadata management
CREATE POLICY "Users can manage video metadata"
  ON videos
  FOR ALL
  USING (publisher_id = auth.uid())
  WITH CHECK (publisher_id = auth.uid());

-- Add policies for managing topics
CREATE POLICY "Users can manage topics"
  ON topics
  FOR ALL
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

-- Add policies for managing key moments
CREATE POLICY "Users can manage key moments"
  ON key_moments
  FOR ALL
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

-- Add policies for managing transcripts
CREATE POLICY "Users can manage transcripts"
  ON transcripts
  FOR ALL
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

-- Add policies for managing full content
CREATE POLICY "Users can manage full content"
  ON full_content
  FOR ALL
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

-- Ensure RLS is enabled for all tables
ALTER TABLE ai_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE key_moments ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE full_content ENABLE ROW LEVEL SECURITY;