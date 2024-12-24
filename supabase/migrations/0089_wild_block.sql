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
  -- Validate user owns the category
  IF NOT EXISTS (
    SELECT 1 FROM knowledge_categories 
    WHERE id = category_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Category not found or access denied';
  END IF;

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

  -- Update category last_updated timestamp
  UPDATE knowledge_categories
  SET last_updated = now()
  WHERE id = category_id;

  RETURN result;
END;
$$;