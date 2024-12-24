-- Insert sample data for Technology category
DO $$
DECLARE
  tech_category_id uuid;
  test_user_id uuid := 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
BEGIN
  -- Get Technology category ID
  SELECT id INTO tech_category_id 
  FROM knowledge_categories 
  WHERE name = 'Technology' 
  AND user_id = test_user_id;

  -- Insert AI summaries
  INSERT INTO knowledge_summaries (
    category_id,
    user_id,
    title,
    content,
    source_type,
    source_title,
    metrics,
    tags
  ) VALUES
  (
    tech_category_id,
    test_user_id,
    'AI Ethics and Society',
    'AI-generated summary of key ethical considerations in AI development...',
    'podcast',
    'Tech Ethics Today',
    jsonb_build_object(
      'readingTime', '8 min',
      'comprehension', 98,
      'relevance', 95,
      'impact', 92
    ),
    ARRAY['AI', 'Ethics', 'Technology']
  ),
  (
    tech_category_id,
    test_user_id,
    'Machine Learning Fundamentals',
    'Core concepts and principles of machine learning explained...',
    'video',
    'ML Basics',
    jsonb_build_object(
      'readingTime', '12 min',
      'comprehension', 95,
      'relevance', 90,
      'impact', 88
    ),
    ARRAY['Machine Learning', 'AI', 'Technology']
  );

  -- Insert highlights
  INSERT INTO knowledge_highlights (
    category_id,
    user_id,
    quote,
    context,
    source_type,
    source_title,
    timestamp,
    tags
  ) VALUES
  (
    tech_category_id,
    test_user_id,
    'Innovation distinguishes between a leader and a follower.',
    'Analysis of leadership qualities in tech industry...',
    'podcast',
    'Tech Leadership',
    '15:20',
    ARRAY['Leadership', 'Innovation', 'Technology']
  ),
  (
    tech_category_id,
    test_user_id,
    'AI systems must be designed with clear ethical guidelines',
    'Discussion about ethical AI development principles...',
    'video',
    'AI Ethics',
    '23:45',
    ARRAY['AI', 'Ethics', 'Technology']
  );

  -- Insert topics
  INSERT INTO knowledge_topics (
    category_id,
    user_id,
    topic_name,
    relevance,
    insights
  ) VALUES
  (
    tech_category_id,
    test_user_id,
    'AI Ethics',
    95,
    ARRAY[
      'AI systems must be designed with clear ethical guidelines',
      'Transparency is crucial for building trust in AI',
      'Ethics should be considered from the start of development'
    ]
  ),
  (
    tech_category_id,
    test_user_id,
    'Machine Learning',
    90,
    ARRAY[
      'Data quality is crucial for ML success',
      'Model validation is essential',
      'Regular retraining improves performance'
    ]
  );

END $$;