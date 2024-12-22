-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public video key moments are viewable by everyone" ON key_moments;
DROP POLICY IF EXISTS "Users can view key moments for their own videos" ON key_moments;
DROP POLICY IF EXISTS "Public video transcripts are viewable by everyone" ON transcripts;
DROP POLICY IF EXISTS "Users can view transcripts for their own videos" ON transcripts;
DROP POLICY IF EXISTS "Public video topics are viewable by everyone" ON topics;
DROP POLICY IF EXISTS "Users can view topics for their own videos" ON topics;

-- Create key_moments table if not exists
CREATE TABLE IF NOT EXISTS key_moments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos ON DELETE CASCADE NOT NULL,
  timestamp text NOT NULL,
  title text NOT NULL,
  summary text,
  created_at timestamptz DEFAULT now()
);

-- Create transcripts table if not exists
CREATE TABLE IF NOT EXISTS transcripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos ON DELETE CASCADE NOT NULL,
  time text NOT NULL,
  speaker text,
  text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create topics table if not exists
CREATE TABLE IF NOT EXISTS topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos ON DELETE CASCADE NOT NULL,
  topic_name text NOT NULL,
  relevance integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE key_moments ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
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

-- Insert sample data
INSERT INTO key_moments (video_id, timestamp, title, summary)
VALUES
('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', '00:05:30', 'Introduction to AI Ethics', 
 'Discussion about the importance of ethical considerations in AI development'),
('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', '00:15:45', 'Future of Machine Learning',
 'Exploring upcoming trends and innovations in machine learning');

INSERT INTO transcripts (video_id, time, speaker, text)
VALUES 
('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', '00:00:00', 'Host', 'Welcome to another episode of Tech Insights.'),
('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', '00:00:15', 'Guest', 'Thanks for having me. I''m excited to share my insights on AI development.'),
('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', '00:00:30', 'Host', 'Let''s start with the ethical considerations.');

INSERT INTO topics (video_id, topic_name, relevance)
VALUES
('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', 'AI Ethics', 95),
('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', 'Machine Learning', 85),
('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', 'Technology', 80);