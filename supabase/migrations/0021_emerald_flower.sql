/*
  # Video Metadata Tables
  
  1. New Tables
    - videos
    - insights
    - key_moments
    - transcripts
    - related_content
    - topics
    - full_content

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for public access where needed

  3. Changes
    - Add foreign key relationships
    - Add indexes for performance
*/

-- Create video status enum
CREATE TYPE video_status AS ENUM ('private', 'public', 'unlisted');
CREATE TYPE video_type AS ENUM ('video', 'short');

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  publisher_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  thumbnail text,
  views integer DEFAULT 0,
  duration text,
  publish_date timestamptz DEFAULT now(),
  status video_status DEFAULT 'private',
  progress integer DEFAULT 0,
  type video_type DEFAULT 'video',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create insights table
CREATE TABLE IF NOT EXISTS insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create key_moments table
CREATE TABLE IF NOT EXISTS key_moments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos ON DELETE CASCADE NOT NULL,
  timestamp text NOT NULL,
  title text NOT NULL,
  summary text,
  created_at timestamptz DEFAULT now()
);

-- Create transcripts table
CREATE TABLE IF NOT EXISTS transcripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos ON DELETE CASCADE NOT NULL,
  time text NOT NULL,
  speaker text,
  text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create related_content table
CREATE TABLE IF NOT EXISTS related_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos ON DELETE CASCADE NOT NULL,
  related_video_id uuid REFERENCES videos ON DELETE CASCADE NOT NULL,
  relationship_type text NOT NULL,
  relevance_score integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(video_id, related_video_id)
);

-- Create topics table
CREATE TABLE IF NOT EXISTS topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos ON DELETE CASCADE NOT NULL,
  topic_name text NOT NULL,
  relevance integer DEFAULT 0,
  insight_ids uuid[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create full_content table
CREATE TABLE IF NOT EXISTS full_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  sections jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_videos_publisher_id ON videos(publisher_id);
CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);
CREATE INDEX IF NOT EXISTS idx_videos_type ON videos(type);
CREATE INDEX IF NOT EXISTS idx_videos_publish_date ON videos(publish_date);
CREATE INDEX IF NOT EXISTS idx_insights_video_id ON insights(video_id);
CREATE INDEX IF NOT EXISTS idx_key_moments_video_id ON key_moments(video_id);
CREATE INDEX IF NOT EXISTS idx_transcripts_video_id ON transcripts(video_id);
CREATE INDEX IF NOT EXISTS idx_topics_video_id ON topics(video_id);
CREATE INDEX IF NOT EXISTS idx_topics_name ON topics(topic_name);
CREATE INDEX IF NOT EXISTS idx_full_content_video_id ON full_content(video_id);

-- Enable RLS
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE key_moments ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE related_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE full_content ENABLE ROW LEVEL SECURITY;

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

-- Create video service functions
CREATE OR REPLACE FUNCTION increment_video_views(video_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE videos
  SET views = views + 1
  WHERE id = video_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;