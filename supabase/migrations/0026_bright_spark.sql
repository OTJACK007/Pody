-- Create video status and type enums if they don't exist
DO $$ BEGIN
  CREATE TYPE video_status AS ENUM ('private', 'public', 'unlisted');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
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

-- Create indexes for efficient filtering
CREATE INDEX IF NOT EXISTS idx_videos_publisher_id ON videos(publisher_id);
CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);
CREATE INDEX IF NOT EXISTS idx_videos_type ON videos(type);
CREATE INDEX IF NOT EXISTS idx_videos_publish_date ON videos(publish_date);
CREATE INDEX IF NOT EXISTS idx_videos_duration ON videos(duration);

-- Enable RLS
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public videos are viewable by everyone" ON videos;
DROP POLICY IF EXISTS "Users can view their own videos" ON videos;
DROP POLICY IF EXISTS "Users can manage their own videos" ON videos;

-- Create new RLS policies
CREATE POLICY "Public videos are viewable by everyone"
  ON videos FOR SELECT
  USING (status = 'public');

CREATE POLICY "Users can view their own videos"
  ON videos FOR SELECT
  TO authenticated
  USING (publisher_id = auth.uid());

CREATE POLICY "Users can manage their own videos"
  ON videos FOR ALL
  TO authenticated
  USING (publisher_id = auth.uid());