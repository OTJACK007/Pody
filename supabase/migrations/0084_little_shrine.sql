-- Drop existing policies first
DROP POLICY IF EXISTS "Users can manage their own summaries" ON knowledge_summaries;
DROP POLICY IF EXISTS "Users can manage their own highlights" ON knowledge_highlights;
DROP POLICY IF EXISTS "Users can manage their own topics" ON knowledge_topics;

-- Create knowledge summaries table if not exists
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

-- Create knowledge highlights table if not exists
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

-- Create knowledge topics table if not exists
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

-- Enable RLS
ALTER TABLE knowledge_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_topics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage their own summaries"
  ON knowledge_summaries
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own highlights"
  ON knowledge_highlights
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own topics"
  ON knowledge_topics
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

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
BEGIN
  -- Export AI Summary if selected
  IF 'ai_summary' = ANY(sections) THEN
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
      a.key_takeaways[1], -- First takeaway as content
      'video',
      v.title,
      jsonb_build_object(
        'readingTime', '5 min',
        'comprehension', (a.content_quality->>'insightDepth')::integer,
        'relevance', (a.content_quality->>'relevance')::integer,
        'impact', (a.content_quality->>'actionability')::integer
      ),
      v.tags
    FROM videos v
    JOIN ai_analysis a ON a.video_id = v.id
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
      km.title,
      km.summary,
      'video',
      v.title,
      km.timestamp,
      v.tags
    FROM videos v
    JOIN key_moments km ON km.video_id = v.id
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
      t.topic_name,
      t.relevance,
      t.insight_ids::text[]
    FROM videos v
    JOIN topics t ON t.video_id = v.id
    WHERE v.id = video_id;
  END IF;

  RETURN result;
END;
$$;