-- Create video tables and related tables
DO $$ BEGIN
  -- Create video status and type enums if they don't exist
  CREATE TYPE video_status AS ENUM ('private', 'public', 'unlisted');
  CREATE TYPE video_type AS ENUM ('video', 'short');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create videos table if it doesn't exist
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  thumbnail text,
  video_url text,
  duration text,
  views integer DEFAULT 0,
  publish_date timestamptz DEFAULT now(),
  status video_status DEFAULT 'private',
  type video_type DEFAULT 'video',
  publisher_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create insights table
CREATE TABLE IF NOT EXISTS insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  timestamp timestamptz DEFAULT now()
);

-- Create key_moments table
CREATE TABLE IF NOT EXISTS key_moments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos ON DELETE CASCADE NOT NULL,
  timestamp text NOT NULL,
  title text NOT NULL,
  summary text,
  insights text[] DEFAULT '{}'
);

-- Create transcripts table
CREATE TABLE IF NOT EXISTS transcripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos ON DELETE CASCADE NOT NULL,
  time text NOT NULL,
  speaker text,
  text text NOT NULL
);

-- Create topics table
CREATE TABLE IF NOT EXISTS topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos ON DELETE CASCADE NOT NULL,
  topic_name text NOT NULL,
  relevance integer DEFAULT 0
);

-- Create full_content table
CREATE TABLE IF NOT EXISTS full_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  sections jsonb DEFAULT '[]'::jsonb
);

-- Create related_content table
CREATE TABLE IF NOT EXISTS related_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos ON DELETE CASCADE NOT NULL,
  related_video_id uuid REFERENCES videos ON DELETE CASCADE NOT NULL,
  relationship_type text NOT NULL,
  relevance_score integer DEFAULT 0,
  UNIQUE(video_id, related_video_id)
);

-- Create indexes for efficient filtering
CREATE INDEX IF NOT EXISTS idx_videos_publisher_id ON videos(publisher_id);
CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);
CREATE INDEX IF NOT EXISTS idx_videos_type ON videos(type);
CREATE INDEX IF NOT EXISTS idx_videos_publish_date ON videos(publish_date);
CREATE INDEX IF NOT EXISTS idx_videos_duration ON videos(duration);

-- Enable RLS
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE key_moments ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE full_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE related_content ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
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

-- Create RLS policies for insights
CREATE POLICY "Public video insights are viewable by everyone"
  ON insights FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM videos WHERE videos.id = video_id AND videos.status = 'public'
  ));

CREATE POLICY "Users can view insights for their own videos"
  ON insights FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM videos WHERE videos.id = video_id AND videos.publisher_id = auth.uid()
  ));

-- Create RLS policies for key_moments
CREATE POLICY "Public video key moments are viewable by everyone"
  ON key_moments FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM videos WHERE videos.id = video_id AND videos.status = 'public'
  ));

CREATE POLICY "Users can view key moments for their own videos"
  ON key_moments FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM videos WHERE videos.id = video_id AND videos.publisher_id = auth.uid()
  ));

-- Create RLS policies for transcripts
CREATE POLICY "Public video transcripts are viewable by everyone"
  ON transcripts FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM videos WHERE videos.id = video_id AND videos.status = 'public'
  ));

CREATE POLICY "Users can view transcripts for their own videos"
  ON transcripts FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM videos WHERE videos.id = video_id AND videos.publisher_id = auth.uid()
  ));

-- Create RLS policies for topics
CREATE POLICY "Public video topics are viewable by everyone"
  ON topics FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM videos WHERE videos.id = video_id AND videos.status = 'public'
  ));

CREATE POLICY "Users can view topics for their own videos"
  ON topics FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM videos WHERE videos.id = video_id AND videos.publisher_id = auth.uid()
  ));

-- Create RLS policies for full_content
CREATE POLICY "Public video full content is viewable by everyone"
  ON full_content FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM videos WHERE videos.id = video_id AND videos.status = 'public'
  ));

CREATE POLICY "Users can view full content for their own videos"
  ON full_content FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM videos WHERE videos.id = video_id AND videos.publisher_id = auth.uid()
  ));

-- Create RLS policies for related_content
CREATE POLICY "Public video related content is viewable by everyone"
  ON related_content FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM videos WHERE videos.id = video_id AND videos.status = 'public'
  ));

CREATE POLICY "Users can view related content for their own videos"
  ON related_content FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM videos WHERE videos.id = video_id AND videos.publisher_id = auth.uid()
  ));