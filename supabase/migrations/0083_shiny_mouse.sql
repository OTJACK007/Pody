-- Create knowledge summaries table
CREATE TABLE IF NOT EXISTS knowledge_summaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES knowledge_categories ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  video_id uuid REFERENCES videos ON DELETE SET NULL,
  title text NOT NULL,
  content text,
  source_type text,
  source_title text,
  source_url text,
  metrics jsonb DEFAULT jsonb_build_object(
    'readingTime', '0 min',
    'comprehension', 0,
    'relevance', 0,
    'impact', 0
  ),
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create knowledge highlights table
CREATE TABLE IF NOT EXISTS knowledge_highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES knowledge_categories ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  video_id uuid REFERENCES videos ON DELETE SET NULL,
  quote text NOT NULL,
  context text,
  source_type text,
  source_title text,
  source_url text,
  timestamp text,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create knowledge topics table
CREATE TABLE IF NOT EXISTS knowledge_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES knowledge_categories ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  video_id uuid REFERENCES videos ON DELETE SET NULL,
  topic_name text NOT NULL,
  relevance integer DEFAULT 0,
  insights text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create function to process video content with OpenAI
CREATE OR REPLACE FUNCTION process_video_content_with_ai(
  video_id uuid,
  content text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result jsonb;
BEGIN
  -- This is where we would integrate with OpenAI
  -- For now, return mock data
  result := jsonb_build_object(
    'highlights', array[
      'Key insight about AI ethics',
      'Important point about machine learning',
      'Critical observation about data privacy'
    ],
    'summary', 'AI-generated summary of the content...',
    'topics', array[
      jsonb_build_object('name', 'AI Ethics', 'relevance', 95),
      jsonb_build_object('name', 'Machine Learning', 'relevance', 90),
      jsonb_build_object('name', 'Data Privacy', 'relevance', 85)
    ]
  );
  
  RETURN result;
END;
$$;

-- Create function to export video content to knowledge library
CREATE OR REPLACE FUNCTION export_video_to_knowledge(
  video_id uuid,
  category_id uuid,
  sections text[]
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result jsonb = '{}'::jsonb;
  user_id uuid = auth.uid();
  ai_content jsonb;
BEGIN
  -- Get AI-processed content if needed
  IF 'highlights' = ANY(sections) OR 'summary' = ANY(sections) THEN
    SELECT process_video_content_with_ai(
      video_id,
      (SELECT content FROM full_content WHERE video_id = export_video_to_knowledge.video_id)
    ) INTO ai_content;
  END IF;

  -- Export AI Summary if selected
  IF 'summary' = ANY(sections) THEN
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
    )
    SELECT 
      category_id,
      user_id,
      video_id,
      v.title,
      ai_content->>'summary',
      'video',
      v.title,
      jsonb_build_object(
        'readingTime', '5 min',
        'comprehension', 95,
        'relevance', 90,
        'impact', 85
      ),
      v.tags
    FROM videos v
    WHERE v.id = video_id
    RETURNING id INTO result;
  END IF;

  -- Export highlights if selected
  IF 'highlights' = ANY(sections) THEN
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
    )
    SELECT 
      category_id,
      user_id,
      video_id,
      highlight,
      'Generated from video content',
      'video',
      v.title,
      '00:00:00',
      v.tags
    FROM videos v,
    jsonb_array_elements_text(ai_content->'highlights') as highlight
    WHERE v.id = video_id;
  END IF;

  -- Export topics if selected
  IF 'topics' = ANY(sections) THEN
    INSERT INTO knowledge_topics (
      category_id,
      user_id,
      video_id,
      topic_name,
      relevance,
      insights
    )
    SELECT 
      category_id,
      user_id,
      video_id,
      (topic->>'name')::text,
      (topic->>'relevance')::integer,
      ARRAY[]::text[]
    FROM videos v,
    jsonb_array_elements(ai_content->'topics') as topic
    WHERE v.id = video_id;
  END IF;

  RETURN result;
END;
$$;