-- Drop existing policies first
DROP POLICY IF EXISTS "Public videos are viewable by everyone" ON videos;
DROP POLICY IF EXISTS "Users can view their own videos" ON videos;
DROP POLICY IF EXISTS "Public video metadata is viewable by everyone" ON insights;
DROP POLICY IF EXISTS "Public video key moments are viewable by everyone" ON key_moments;
DROP POLICY IF EXISTS "Public video transcripts are viewable by everyone" ON transcripts;
DROP POLICY IF EXISTS "Public video topics are viewable by everyone" ON topics;
DROP POLICY IF EXISTS "Public video full content is viewable by everyone" ON full_content;

-- Add updated public view policies for video content
CREATE POLICY "Videos are viewable by everyone"
  ON videos FOR SELECT
  USING (status = 'public' OR publisher_id = auth.uid());

-- Add updated public view policies for video metadata
CREATE POLICY "Video metadata is viewable by everyone"
  ON insights FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM videos
    WHERE videos.id = video_id
    AND (videos.status = 'public' OR videos.publisher_id = auth.uid())
  ));

CREATE POLICY "Key moments are viewable by everyone"
  ON key_moments FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM videos
    WHERE videos.id = video_id
    AND (videos.status = 'public' OR videos.publisher_id = auth.uid())
  ));

CREATE POLICY "Transcripts are viewable by everyone"
  ON transcripts FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM videos
    WHERE videos.id = video_id
    AND (videos.status = 'public' OR videos.publisher_id = auth.uid())
  ));

CREATE POLICY "Topics are viewable by everyone"
  ON topics FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM videos
    WHERE videos.id = video_id
    AND (videos.status = 'public' OR videos.publisher_id = auth.uid())
  ));

CREATE POLICY "Full content is viewable by everyone"
  ON full_content FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM videos
    WHERE videos.id = video_id
    AND (videos.status = 'public' OR videos.publisher_id = auth.uid())
  ));

-- Ensure all tables have RLS enabled
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE key_moments ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE full_content ENABLE ROW LEVEL SECURITY;