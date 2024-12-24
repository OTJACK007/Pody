-- Drop existing search function
DROP FUNCTION IF EXISTS search_knowledge_categories;

-- Create improved search function with explicit table references
CREATE OR REPLACE FUNCTION search_knowledge_categories(
  search_query text,
  search_user_id uuid
)
RETURNS SETOF knowledge_categories
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT kc.*
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