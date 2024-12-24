-- Insert more sample knowledge summaries
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
  'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
  'Machine Learning Fundamentals',
  'Comprehensive overview of machine learning basics including supervised and unsupervised learning, model training, and evaluation metrics...',
  'video',
  'ML Basics',
  jsonb_build_object(
    'readingTime', '12 min',
    'comprehension', 95,
    'relevance', 90,
    'impact', 88
  ),
  ARRAY['Machine Learning', 'AI', 'Technology']
),
(
  (SELECT id FROM knowledge_categories WHERE name = 'Technology' LIMIT 1),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'c3d4e5f6-a1b2-6543-8765-3c4d5e6f1a2b',
  'Web3 Development Trends',
  'Analysis of current trends in Web3 development including blockchain, smart contracts, and decentralized applications...',
  'video',
  'Web3 Today',
  jsonb_build_object(
    'readingTime', '15 min',
    'comprehension', 92,
    'relevance', 94,
    'impact', 90
  ),
  ARRAY['Web3', 'Blockchain', 'Development']
);

-- Insert more sample knowledge highlights
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
  'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
  'Data quality is crucial for ML model performance',
  'Discussion about the importance of data preprocessing and cleaning in machine learning',
  'video',
  'ML Basics',
  '00:15:45',
  ARRAY['Machine Learning', 'Data Science']
),
(
  (SELECT id FROM knowledge_categories WHERE name = 'Technology' LIMIT 1),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'c3d4e5f6-a1b2-6543-8765-3c4d5e6f1a2b',
  'Smart contracts are revolutionizing digital agreements',
  'Explanation of how smart contracts are transforming business processes',
  'video',
  'Web3 Today',
  '00:23:15',
  ARRAY['Web3', 'Smart Contracts']
);

-- Insert more sample knowledge topics
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
  'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
  'Machine Learning',
  90,
  ARRAY[
    'Data quality is crucial for ML success',
    'Model validation is essential',
    'Regular retraining improves performance'
  ]
),
(
  (SELECT id FROM knowledge_categories WHERE name = 'Technology' LIMIT 1),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'c3d4e5f6-a1b2-6543-8765-3c4d5e6f1a2b',
  'Web3',
  88,
  ARRAY[
    'Blockchain technology enables trustless transactions',
    'Smart contracts automate agreement execution',
    'Decentralization changes traditional business models'
  ]
);

-- Insert sample knowledge notes
INSERT INTO knowledge_notes (
  category_id,
  user_id,
  title,
  content,
  source_type,
  source_title,
  tags
) VALUES
(
  (SELECT id FROM knowledge_categories WHERE name = 'Technology' LIMIT 1),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Getting Started with AI Development',
  'Key insights and best practices for starting AI development projects. Important considerations include data quality, model selection, and ethical guidelines...',
  'video',
  'AI Development Fundamentals',
  ARRAY['AI', 'Development', 'Best Practices']
),
(
  (SELECT id FROM knowledge_categories WHERE name = 'Technology' LIMIT 1),
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Web3 Security Best Practices',
  'Essential security considerations for Web3 development including smart contract auditing, secure key management, and common attack vectors...',
  'video',
  'Web3 Security',
  ARRAY['Web3', 'Security', 'Smart Contracts']
);