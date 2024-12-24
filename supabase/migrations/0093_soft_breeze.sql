-- Insert sample knowledge notes
INSERT INTO knowledge_notes (
  category_id,
  user_id,
  title,
  content,
  source_type,
  source_title,
  tags
) 
SELECT 
  kc.id,
  kc.user_id,
  'Getting Started with AI Development',
  'Key insights and best practices for starting AI development projects...',
  'video',
  'AI Development Fundamentals',
  ARRAY['AI', 'Development', 'Best Practices']
FROM knowledge_categories kc
WHERE kc.name = 'Technology'
AND kc.user_id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
LIMIT 1;

-- Create function to search notes
CREATE OR REPLACE FUNCTION search_knowledge_notes(
  category_id uuid,
  search_query text
)
RETURNS TABLE (
  id uuid,
  title text,
  content text,
  source_type text,
  source_title text,
  tags text[],
  created_at timestamptz
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    n.id,
    n.title,
    n.content,
    n.source_type,
    n.source_title,
    n.tags,
    n.created_at
  FROM knowledge_notes n
  WHERE n.category_id = search_knowledge_notes.category_id
  AND n.user_id = auth.uid()
  AND (
    search_query IS NULL
    OR n.title ILIKE '%' || search_query || '%'
    OR n.content ILIKE '%' || search_query || '%'
    OR EXISTS (
      SELECT 1 FROM unnest(n.tags) tag
      WHERE tag ILIKE '%' || search_query || '%'
    )
  )
  ORDER BY n.created_at DESC;
END;
$$;