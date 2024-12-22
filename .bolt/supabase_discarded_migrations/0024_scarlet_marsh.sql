-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public videos are viewable by everyone" ON videos;
DROP POLICY IF EXISTS "Users can view their own videos" ON videos;
DROP POLICY IF EXISTS "Users can insert their own videos" ON videos;
DROP POLICY IF EXISTS "Users can update their own videos" ON videos;
DROP POLICY IF EXISTS "Users can delete their own videos" ON videos;
DROP POLICY IF EXISTS "Public video insights are viewable by everyone" ON insights;
DROP POLICY IF EXISTS "Users can view insights for their own videos" ON insights;
DROP POLICY IF EXISTS "Public video key moments are viewable by everyone" ON key_moments;
DROP POLICY IF EXISTS "Users can view key moments for their own videos" ON key_moments;
DROP POLICY IF EXISTS "Public video transcripts are viewable by everyone" ON transcripts;
DROP POLICY IF EXISTS "Users can view transcripts for their own videos" ON transcripts;
DROP POLICY IF EXISTS "Public video topics are viewable by everyone" ON topics;
DROP POLICY IF EXISTS "Users can view topics for their own videos" ON topics;
DROP POLICY IF EXISTS "Public video full content is viewable by everyone" ON full_content;
DROP POLICY IF EXISTS "Users can view full content for their own videos" ON full_content;
DROP POLICY IF EXISTS "Public video related content is viewable by everyone" ON related_content;
DROP POLICY IF EXISTS "Users can view related content for their own videos" ON related_content;

-- Add description column to videos if it doesn't exist
ALTER TABLE videos ADD COLUMN IF NOT EXISTS description text;

-- Add video_url column to videos if it doesn't exist
ALTER TABLE videos ADD COLUMN IF NOT EXISTS video_url text;

-- Create RLS policies

-- Videos policies
CREATE POLICY "Public videos are viewable by everyone"
  ON videos FOR SELECT
  USING (status = 'public');

CREATE POLICY "Users can view their own videos"
  ON videos FOR SELECT
  TO authenticated
  USING (publisher_id = auth.uid());

CREATE POLICY "Users can insert their own videos"
  ON videos FOR INSERT
  TO authenticated
  WITH CHECK (publisher_id = auth.uid());

CREATE POLICY "Users can update their own videos"
  ON videos FOR UPDATE
  TO authenticated
  USING (publisher_id = auth.uid());

CREATE POLICY "Users can delete their own videos"
  ON videos FOR DELETE
  TO authenticated
  USING (publisher_id = auth.uid());

-- Insights policies
CREATE POLICY "Public video insights are viewable by everyone"
  ON insights FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_id
      AND videos.status = 'public'
    )
  );

CREATE POLICY "Users can view insights for their own videos"
  ON insights FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_id
      AND videos.publisher_id = auth.uid()
    )
  );

-- Key moments policies
CREATE POLICY "Public video key moments are viewable by everyone"
  ON key_moments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_id
      AND videos.status = 'public'
    )
  );

CREATE POLICY "Users can view key moments for their own videos"
  ON key_moments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_id
      AND videos.publisher_id = auth.uid()
    )
  );

-- Transcripts policies
CREATE POLICY "Public video transcripts are viewable by everyone"
  ON transcripts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_id
      AND videos.status = 'public'
    )
  );

CREATE POLICY "Users can view transcripts for their own videos"
  ON transcripts FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_id
      AND videos.publisher_id = auth.uid()
    )
  );

-- Topics policies
CREATE POLICY "Public video topics are viewable by everyone"
  ON topics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_id
      AND videos.status = 'public'
    )
  );

CREATE POLICY "Users can view topics for their own videos"
  ON topics FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_id
      AND videos.publisher_id = auth.uid()
    )
  );

-- Full content policies
CREATE POLICY "Public video full content is viewable by everyone"
  ON full_content FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_id
      AND videos.status = 'public'
    )
  );

CREATE POLICY "Users can view full content for their own videos"
  ON full_content FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_id
      AND videos.publisher_id = auth.uid()
    )
  );

-- Related content policies
CREATE POLICY "Public video related content is viewable by everyone"
  ON related_content FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_id
      AND videos.status = 'public'
    )
  );

CREATE POLICY "Users can view related content for their own videos"
  ON related_content FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_id
      AND videos.publisher_id = auth.uid()
    )
  );