-- Insert sample knowledge categories
INSERT INTO knowledge_categories (
  name,
  description,
  image,
  user_id
) VALUES
(
  'Technology',
  'Tech insights and innovations',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
),
(
  'Business',
  'Business strategies and entrepreneurship',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
),
(
  'Personal Growth',
  'Self-improvement and development',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
);

-- Insert sample knowledge summaries
INSERT INTO knowledge_summaries (
  category_id,
  user_id,
  video_id,
  title,
  content,
  source_type,
  source_title,
  metrics,
  tags
) VALUES
(
  (SELECT id FROM knowledge_categories WHERE name = 'Technology' LIMIT 1),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',
  'AI Ethics and Society',
  'AI-generated summary of key ethical considerations in AI development...',
  'video',
  'The Future of AI Technology',
  jsonb_build_object(
    'readingTime', '8 min',
    'comprehension', 98,
    'relevance', 95,
    'impact', 92
  ),
  ARRAY['AI', 'Ethics', 'Technology']
);

-- Insert sample knowledge highlights
INSERT INTO knowledge_highlights (
  category_id,
  user_id,
  video_id,
  quote,
  context,
  source_type,
  source_title,
  timestamp,
  tags
) VALUES
(
  (SELECT id FROM knowledge_categories WHERE name = 'Technology' LIMIT 1),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',
  'AI systems must be designed with clear ethical guidelines',
  'Discussion about the importance of ethical considerations in AI development',
  'video',
  'The Future of AI Technology',
  '00:05:30',
  ARRAY['AI', 'Ethics']
);

-- Insert sample knowledge topics
INSERT INTO knowledge_topics (
  category_id,
  user_id,
  video_id,
  topic_name,
  relevance,
  insights
) VALUES
(
  (SELECT id FROM knowledge_categories WHERE name = 'Technology' LIMIT 1),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',
  'AI Ethics',
  95,
  ARRAY[
    'AI systems must be designed with clear ethical guidelines',
    'Transparency is crucial for building trust in AI',
    'Ethics should be considered from the start of development'
  ]
);