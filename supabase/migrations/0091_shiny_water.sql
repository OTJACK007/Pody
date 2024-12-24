-- Drop existing export function
DROP FUNCTION IF EXISTS export_video_to_knowledge;

-- Create improved export function with proper validation and error handling
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
  video_exists boolean;
  category_exists boolean;
BEGIN
  -- Input validation
  IF video_id IS NULL OR category_id IS NULL OR sections IS NULL THEN
    RETURN jsonb_build_object(
      'error', true,
      'message', 'Missing required parameters'
    );
  END IF;

  -- Check video exists and is accessible
  SELECT EXISTS (
    SELECT 1 FROM videos v
    WHERE v.id = video_id 
    AND (v.status = 'public' OR v.publisher_id = user_id)
  ) INTO video_exists;

  IF NOT video_exists THEN
    RETURN jsonb_build_object(
      'error', true,
      'message', 'Video not found or access denied'
    );
  END IF;

  -- Check category exists and user owns it
  SELECT EXISTS (
    SELECT 1 FROM knowledge_categories 
    WHERE id = category_id AND user_id = auth.uid()
  ) INTO category_exists;

  IF NOT category_exists THEN
    RETURN jsonb_build_object(
      'error', true,
      'message', 'Category not found or access denied'
    );
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
      COALESCE(a.key_takeaways[1], 'No summary available'),
      'video',
      v.title,
      jsonb_build_object(
        'readingTime', '5 min',
        'comprehension', COALESCE((a.content_quality->>'insightDepth')::integer, 0),
        'relevance', COALESCE((a.content_quality->>'relevance')::integer, 0),
        'impact', COALESCE((a.content_quality->>'actionability')::integer, 0)
      ),
      COALESCE(v.tags, ARRAY[]::text[])
    FROM videos v
    LEFT JOIN ai_analysis a ON a.video_id = v.id
    WHERE v.id = video_id
    RETURNING jsonb_build_object(
      'id', id,
      'type', 'summary'
    ) INTO result;
  END IF;

  -- Export highlights if selected
  IF 'highlights' = ANY(sections) THEN
    WITH inserted_highlights AS (
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
        COALESCE(v.tags, ARRAY[]::text[])
      FROM videos v
      JOIN key_moments km ON km.video_id = v.id
      WHERE v.id = video_id
      RETURNING id
    )
    SELECT jsonb_build_object(
      'highlights', jsonb_agg(id)
    )
    FROM inserted_highlights
    INTO result;
  END IF;

  -- Export topics if selected
  IF 'topics' = ANY(sections) THEN
    WITH inserted_topics AS (
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
        COALESCE(t.insight_ids::text[], ARRAY[]::text[])
      FROM videos v
      JOIN topics t ON t.video_id = v.id
      WHERE v.id = video_id
      RETURNING id
    )
    SELECT jsonb_build_object(
      'topics', jsonb_agg(id)
    )
    FROM inserted_topics
    INTO result;
  END IF;

  -- Update category last_updated timestamp and notes count
  UPDATE knowledge_categories
  SET 
    last_updated = now(),
    notes_count = notes_count + (
      SELECT count(*) 
      FROM jsonb_object_keys(result) 
      WHERE key != 'error'
    )
  WHERE id = category_id;

  -- Return success result
  RETURN jsonb_build_object(
    'success', true,
    'data', result
  );

EXCEPTION WHEN OTHERS THEN
  -- Log error details
  RAISE LOG 'Error in export_video_to_knowledge: %', SQLERRM;
  
  -- Return error information
  RETURN jsonb_build_object(
    'error', true,
    'message', SQLERRM
  );
END;
$$;