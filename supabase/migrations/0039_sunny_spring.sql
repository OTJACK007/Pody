-- Drop existing policies
DROP POLICY IF EXISTS "Users can manage topics for their own videos" ON topics;
DROP POLICY IF EXISTS "Users can view topics for public videos" ON topics;
DROP POLICY IF EXISTS "Users can manage key moments for their own videos" ON key_moments;
DROP POLICY IF EXISTS "Users can view key moments for public videos" ON key_moments;
DROP POLICY IF EXISTS "Users can manage transcripts for their own videos" ON transcripts;
DROP POLICY IF EXISTS "Users can view transcripts for public videos" ON transcripts;
DROP POLICY IF EXISTS "Users can manage full content for their own videos" ON full_content;
DROP POLICY IF EXISTS "Users can view full content for public videos" ON full_content;

-- Create RLS policies for topics
CREATE POLICY "Users can manage topics for their own videos"
  ON topics
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

CREATE POLICY "Users can view topics for public videos"
  ON topics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_id
      AND (videos.status = 'public' OR videos.publisher_id = auth.uid())
    )
  );

-- Create RLS policies for key_moments
CREATE POLICY "Users can manage key moments for their own videos"
  ON key_moments
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

CREATE POLICY "Users can view key moments for public videos"
  ON key_moments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_id
      AND (videos.status = 'public' OR videos.publisher_id = auth.uid())
    )
  );

-- Create RLS policies for transcripts
CREATE POLICY "Users can manage transcripts for their own videos"
  ON transcripts
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

CREATE POLICY "Users can view transcripts for public videos"
  ON transcripts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_id
      AND (videos.status = 'public' OR videos.publisher_id = auth.uid())
    )
  );

-- Create RLS policies for full_content
CREATE POLICY "Users can manage full content for their own videos"
  ON full_content
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

CREATE POLICY "Users can view full content for public videos"
  ON full_content FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_id
      AND (videos.status = 'public' OR videos.publisher_id = auth.uid())
    )
  );

-- Ensure RLS is enabled for all tables
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE key_moments ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE full_content ENABLE ROW LEVEL SECURITY;