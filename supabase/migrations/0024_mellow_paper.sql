-- Drop existing policies first
DROP POLICY IF EXISTS "Public videos are viewable by everyone" ON videos;
DROP POLICY IF EXISTS "Users can view their own videos" ON videos;
DROP POLICY IF EXISTS "Users can insert their own videos" ON videos;
DROP POLICY IF EXISTS "Users can update their own videos" ON videos;
DROP POLICY IF EXISTS "Users can delete their own videos" ON videos;

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