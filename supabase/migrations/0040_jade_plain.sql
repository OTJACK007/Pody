-- Drop existing policies first
DROP POLICY IF EXISTS "Users can manage video metadata" ON videos;
DROP POLICY IF EXISTS "Users can manage topics" ON topics;
DROP POLICY IF EXISTS "Users can manage key moments" ON key_moments;
DROP POLICY IF EXISTS "Users can manage transcripts" ON transcripts;
DROP POLICY IF EXISTS "Users can manage full content" ON full_content;

-- Add policies for managing video metadata
CREATE POLICY "Users can manage video metadata"
  ON videos
  USING (publisher_id = auth.uid())
  WITH CHECK (publisher_id = auth.uid());

-- Add policies for managing topics
CREATE POLICY "Users can manage topics"
  ON topics
  USING (EXISTS (
    SELECT 1 FROM videos
    WHERE videos.id = video_id
    AND videos.publisher_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM videos
    WHERE videos.id = video_id
    AND videos.publisher_id = auth.uid()
  ));

-- Add policies for managing key moments
CREATE POLICY "Users can manage key moments"
  ON key_moments
  USING (EXISTS (
    SELECT 1 FROM videos
    WHERE videos.id = video_id
    AND videos.publisher_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM videos
    WHERE videos.id = video_id
    AND videos.publisher_id = auth.uid()
  ));

-- Add policies for managing transcripts
CREATE POLICY "Users can manage transcripts"
  ON transcripts
  USING (EXISTS (
    SELECT 1 FROM videos
    WHERE videos.id = video_id
    AND videos.publisher_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM videos
    WHERE videos.id = video_id
    AND videos.publisher_id = auth.uid()
  ));

-- Add policies for managing full content
CREATE POLICY "Users can manage full content"
  ON full_content
  USING (EXISTS (
    SELECT 1 FROM videos
    WHERE videos.id = video_id
    AND videos.publisher_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM videos
    WHERE videos.id = video_id
    AND videos.publisher_id = auth.uid()
  ));