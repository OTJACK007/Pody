-- Create test user if not exists
DO $$
DECLARE
  test_user_id uuid := 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
BEGIN
  -- Insert test user into auth.users if not exists
  INSERT INTO auth.users (id, email)
  VALUES (test_user_id, 'test@example.com')
  ON CONFLICT (id) DO NOTHING;

  -- Insert sample video if not exists
  INSERT INTO videos (
    id,
    publisher_id,
    title,
    description,
    thumbnail,
    video_url,
    duration,
    views,
    status,
    type
  ) VALUES (
    'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
    test_user_id,
    'The Future of AI Technology',
    'An in-depth discussion about artificial intelligence and its impact on various industries',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    'https://video.wixstatic.com/video/c67dd6_8c436b9b6e42468a9e2b68ea49868528/1080p/mp4/file.mp4',
    '45:30',
    125000,
    'public',
    'video'
  ) ON CONFLICT (id) DO UPDATE SET
    description = EXCLUDED.description,
    video_url = EXCLUDED.video_url;

  -- Insert key moments
  INSERT INTO key_moments (video_id, timestamp, title, summary)
  VALUES
  ('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', '00:05:30', 'Introduction to AI Ethics', 
   'Discussion about the importance of ethical considerations in AI development'),
  ('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', '00:15:45', 'Future of Machine Learning',
   'Exploring upcoming trends and innovations in machine learning')
  ON CONFLICT DO NOTHING;

  -- Insert transcripts
  INSERT INTO transcripts (video_id, time, speaker, text)
  VALUES 
  ('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', '00:00:00', 'Host', 'Welcome to another episode of Tech Insights.'),
  ('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', '00:00:15', 'Guest', 'Thanks for having me. I''m excited to share my insights on AI development.'),
  ('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', '00:00:30', 'Host', 'Let''s start with the ethical considerations.')
  ON CONFLICT DO NOTHING;

  -- Insert topics
  INSERT INTO topics (video_id, topic_name, relevance)
  VALUES
  ('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', 'AI Ethics', 95),
  ('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', 'Machine Learning', 85),
  ('b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a', 'Technology', 80)
  ON CONFLICT DO NOTHING;

  -- Insert AI analysis
  INSERT INTO ai_analysis (
    video_id,
    key_takeaways,
    content_quality,
    recommendations
  ) VALUES (
    'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
    ARRAY[
      'AI ethics must be prioritized in development',
      'Machine learning is becoming more accessible',
      'Healthcare will be transformed by AI applications'
    ],
    jsonb_build_object(
      'insightDepth', 95,
      'actionability', 88,
      'relevance', 92,
      'clarity', 90
    ),
    ARRAY[
      'Explore practical AI implementation strategies',
      'Consider ethical implications in AI development',
      'Focus on healthcare AI applications'
    ]
  ) ON CONFLICT DO NOTHING;

END $$;