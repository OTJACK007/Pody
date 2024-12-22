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

-- Insert sample video data
INSERT INTO videos (
  id,
  title,
  description,
  thumbnail,
  video_url,
  duration,
  views,
  status,
  type,
  publisher_id
) VALUES (
  'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
  'The Future of AI Technology',
  'An in-depth discussion about artificial intelligence and its impact on various industries',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
  'https://video.wixstatic.com/video/c67dd6_8c436b9b6e42468a9e2b68ea49868528/1080p/mp4/file.mp4',
  '45:30',
  125000,
  'public',
  'video',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
);

-- Insert key moments
INSERT INTO key_moments (video_id, timestamp, title, summary, insights)
VALUES
('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', '00:05:30', 'Introduction to AI Ethics', 
 'Discussion about the importance of ethical considerations in AI development',
 ARRAY['AI systems must be designed with clear ethical guidelines', 'Transparency is crucial for building trust in AI']),
('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', '00:15:45', 'Future of Machine Learning',
 'Exploring upcoming trends and innovations in machine learning',
 ARRAY['Automated ML will become more accessible', 'Edge computing will drive ML innovation']);

-- Insert transcripts
INSERT INTO transcripts (video_id, time, speaker, text)
VALUES 
('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', '00:00:00', 'Host', 'Welcome to another episode of Tech Insights.'),
('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', '00:00:15', 'Guest', 'Thanks for having me. I''m excited to share my insights on AI development.'),
('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', '00:00:30', 'Host', 'Let''s start with the ethical considerations.');

-- Insert topics
INSERT INTO topics (video_id, topic_name, relevance)
VALUES
('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', 'AI Ethics', 95),
('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', 'Machine Learning', 85),
('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', 'Technology', 80);