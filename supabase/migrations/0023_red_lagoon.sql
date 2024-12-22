/*
  # Populate Video Metadata Tables
  
  1. Create test user if not exists
  2. Add sample videos
  3. Add insights, key moments, and transcripts
  4. Add topics and full content
  5. Create relationships between videos
*/

-- Create test user if not exists
DO $$
DECLARE
  test_user_id uuid;
BEGIN
  -- Insert test user into auth.users if not exists
  INSERT INTO auth.users (id, email)
  VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'test@example.com'
  )
  ON CONFLICT (id) DO NOTHING
  RETURNING id INTO test_user_id;

  -- Insert sample videos
  INSERT INTO videos (
    id,
    publisher_id,
    title,
    thumbnail,
    views,
    duration,
    status,
    type
  ) VALUES
  -- Tech videos
  (
    'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'The Future of AI Technology',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    125000,
    '45:30',
    'public',
    'video'
  ),
  (
    'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Machine Learning Fundamentals',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
    98000,
    '38:15',
    'public',
    'video'
  ),
  -- AI Shorts
  (
    'c3d4e5f6-a1b2-6543-8765-3c4d5e6f1a2b',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Quick AI Tips',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    250000,
    '0:60',
    'public',
    'short'
  );

  -- Insert insights
  INSERT INTO insights (
    video_id,
    content,
    timestamp
  ) VALUES
  (
    'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',
    'AI systems must be designed with clear ethical guidelines',
    NOW() - INTERVAL '1 hour'
  ),
  (
    'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',
    'Transparency is crucial for building trust in AI',
    NOW() - INTERVAL '2 hours'
  ),
  (
    'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
    'Machine learning models require quality training data',
    NOW() - INTERVAL '3 hours'
  );

  -- Insert key moments
  INSERT INTO key_moments (
    video_id,
    timestamp,
    title,
    summary
  ) VALUES
  (
    'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',
    '00:05:30',
    'Introduction to AI Ethics',
    'Discussion about the importance of ethical considerations in AI development'
  ),
  (
    'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',
    '00:15:45',
    'Future of Machine Learning',
    'Exploring upcoming trends and innovations in machine learning'
  ),
  (
    'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
    '00:10:20',
    'Data Quality',
    'Understanding the importance of data quality in ML models'
  );

  -- Insert transcripts
  INSERT INTO transcripts (
    video_id,
    time,
    speaker,
    text
  ) VALUES
  (
    'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',
    '00:00:00',
    'Host',
    'Welcome to another episode about the future of AI technology.'
  ),
  (
    'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',
    '00:00:15',
    'Guest',
    'Thanks for having me. I''m excited to share my insights on AI development.'
  ),
  (
    'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
    '00:00:00',
    'Host',
    'Today we''ll cover the fundamentals of machine learning.'
  );

  -- Insert topics
  INSERT INTO topics (
    video_id,
    topic_name,
    relevance
  ) VALUES
  (
    'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',
    'AI Ethics',
    95
  ),
  (
    'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',
    'Machine Learning',
    85
  ),
  (
    'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
    'Data Science',
    90
  );

  -- Insert full content
  INSERT INTO full_content (
    video_id,
    title,
    description,
    sections
  ) VALUES
  (
    'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',
    'The Future of AI Technology',
    'An in-depth discussion about artificial intelligence and its impact on various industries',
    '[
      {
        "title": "Overview",
        "content": "This episode explores the fascinating world of artificial intelligence and its profound impact across various industries. We delve into current trends, ethical considerations, and future predictions from industry experts.",
        "key_points": [
          "Evolution of AI technology",
          "Current industry applications",
          "Future predictions and trends",
          "Impact on business and society"
        ],
        "detailed_points": [
          {
            "title": "Evolution of AI Technology",
            "content": "The journey of AI technology has been remarkable, starting from simple rule-based systems to today''s sophisticated neural networks."
          },
          {
            "title": "Current Industry Applications",
            "content": "AI is currently transforming numerous industries. In healthcare, it''s improving diagnostic accuracy and drug discovery."
          }
        ]
      }
    ]'
  ),
  (
    'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
    'Machine Learning Fundamentals',
    'A comprehensive guide to understanding machine learning basics and applications',
    '[
      {
        "title": "Introduction to ML",
        "content": "Understanding the basic concepts and principles of machine learning",
        "key_points": [
          "What is machine learning",
          "Types of ML algorithms",
          "Common applications"
        ]
      }
    ]'
  );

  -- Create relationships between videos
  INSERT INTO related_content (
    video_id,
    related_video_id,
    relationship_type,
    relevance_score
  ) VALUES
  (
    'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',
    'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
    'similar',
    85
  ),
  (
    'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
    'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',
    'recommended',
    80
  );
END $$;