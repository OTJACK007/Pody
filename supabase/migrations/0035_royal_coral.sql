-- Update existing video data
UPDATE videos 
SET description = 'An in-depth discussion about artificial intelligence and its impact on various industries',
    video_url = 'https://video.wixstatic.com/video/c67dd6_8c436b9b6e42468a9e2b68ea49868528/1080p/mp4/file.mp4'
WHERE id = 'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a';

-- Insert key moments if not exists
INSERT INTO key_moments (video_id, timestamp, title, summary)
SELECT 
  'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
  '00:05:30',
  'Introduction to AI Ethics',
  'Discussion about the importance of ethical considerations in AI development'
WHERE NOT EXISTS (
  SELECT 1 FROM key_moments 
  WHERE video_id = 'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a' 
  AND timestamp = '00:05:30'
);

INSERT INTO key_moments (video_id, timestamp, title, summary)
SELECT
  'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
  '00:15:45',
  'Future of Machine Learning',
  'Exploring upcoming trends and innovations in machine learning'
WHERE NOT EXISTS (
  SELECT 1 FROM key_moments
  WHERE video_id = 'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a'
  AND timestamp = '00:15:45'
);

-- Insert transcripts if not exists
INSERT INTO transcripts (video_id, time, speaker, text)
SELECT
  'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
  '00:00:00',
  'Host',
  'Welcome to another episode of Tech Insights.'
WHERE NOT EXISTS (
  SELECT 1 FROM transcripts
  WHERE video_id = 'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a'
  AND time = '00:00:00'
);

INSERT INTO transcripts (video_id, time, speaker, text)
SELECT
  'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
  '00:00:15',
  'Guest',
  'Thanks for having me. I''m excited to share my insights on AI development.'
WHERE NOT EXISTS (
  SELECT 1 FROM transcripts
  WHERE video_id = 'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a'
  AND time = '00:00:15'
);

INSERT INTO transcripts (video_id, time, speaker, text)
SELECT
  'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
  '00:00:30',
  'Host',
  'Let''s start with the ethical considerations.'
WHERE NOT EXISTS (
  SELECT 1 FROM transcripts
  WHERE video_id = 'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a'
  AND time = '00:00:30'
);

-- Insert topics if not exists
INSERT INTO topics (video_id, topic_name, relevance)
SELECT
  'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
  'AI Ethics',
  95
WHERE NOT EXISTS (
  SELECT 1 FROM topics
  WHERE video_id = 'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a'
  AND topic_name = 'AI Ethics'
);

INSERT INTO topics (video_id, topic_name, relevance)
SELECT
  'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
  'Machine Learning',
  85
WHERE NOT EXISTS (
  SELECT 1 FROM topics
  WHERE video_id = 'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a'
  AND topic_name = 'Machine Learning'
);

INSERT INTO topics (video_id, topic_name, relevance)
SELECT
  'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
  'Technology',
  80
WHERE NOT EXISTS (
  SELECT 1 FROM topics
  WHERE video_id = 'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a'
  AND topic_name = 'Technology'
);