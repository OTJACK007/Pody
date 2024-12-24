-- Drop existing search function
DROP FUNCTION IF EXISTS search_knowledge_categories;

-- Create improved search function with explicit table references
CREATE OR REPLACE FUNCTION search_knowledge_categories(
  search_query text,
  search_user_id uuid
)
RETURNS TABLE (
  id uuid,
  name text,
  description text,
  image text,
  notes_count integer,
  last_updated timestamptz,
  created_at timestamptz,
  updated_at timestamptz,
  user_id uuid
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    kc.id,
    kc.name,
    kc.description,
    kc.image,
    kc.notes_count,
    kc.last_updated,
    kc.created_at,
    kc.updated_at,
    kc.user_id
  FROM knowledge_categories kc
  WHERE kc.user_id = search_user_id
  AND (
    search_query IS NULL
    OR kc.name ILIKE '%' || search_query || '%'
    OR kc.description ILIKE '%' || search_query || '%'
  )
  ORDER BY kc.last_updated DESC;
END;
$$;