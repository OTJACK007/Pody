-- Insert sample data for test user
DO $$
DECLARE
  test_user_id uuid := 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
  tech_category_id uuid;
BEGIN
  -- Insert test categories if they don't exist
  INSERT INTO knowledge_categories (
    id,
    user_id,
    name,
    description,
    image,
    notes_count,
    last_updated
  ) VALUES (
    gen_random_uuid(),
    test_user_id,
    'Technology',
    'Tech insights and innovations',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    3,
    now()
  ) RETURNING id INTO tech_category_id;

  -- Insert sample summaries
  INSERT INTO knowledge_summaries (
    category_id,
    user_id,
    title,
    content,
    source_type,
    source_title,
    metrics,
    tags
  ) VALUES (
    tech_category_id,
    test_user_id,
    'AI Ethics and Society',
    'Key insights on ethical considerations in AI development and societal impact',
    'video',
    'The Future of AI',
    jsonb_build_object(
      'readingTime', '8 min',
      'comprehension', 95,
      'relevance', 92,
      'impact', 88
    ),
    ARRAY['AI', 'Ethics', 'Technology']
  );

  -- Insert sample highlights
  INSERT INTO knowledge_highlights (
    category_id,
    user_id,
    quote,
    context,
    source_type,
    source_title,
    timestamp,
    tags
  ) VALUES (
    tech_category_id,
    test_user_id,
    'AI systems must be designed with clear ethical guidelines',
    'Discussion about the importance of ethical considerations in AI development',
    'video',
    'AI Ethics Today',
    '00:15:30',
    ARRAY['AI', 'Ethics']
  );

  -- Insert sample topics
  INSERT INTO knowledge_topics (
    category_id,
    user_id,
    topic_name,
    relevance,
    insights
  ) VALUES (
    tech_category_id,
    test_user_id,
    'AI Ethics',
    95,
    ARRAY[
      'AI systems must be designed with clear ethical guidelines',
      'Transparency is crucial for building trust in AI',
      'Ethics should be considered from the start of development'
    ]
  );

END $$;