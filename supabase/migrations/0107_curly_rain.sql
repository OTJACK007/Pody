-- Drop existing search function
DROP FUNCTION IF EXISTS search_videos;

-- Create improved search function with proper text search
CREATE OR REPLACE FUNCTION search_videos(
  search_query text,
  category_filter text DEFAULT NULL,
  type_filter text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  title text,
  description text,
  thumbnail text,
  video_url text,
  duration text,
  views integer,
  rating decimal,
  category video_category,
  tags jsonb,
  type video_type,
  linkedplatform video_platform,
  channel_name text,
  channel_avatar text,
  channel_is_verified boolean
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    v.id,
    v.title,
    v.description,
    v.thumbnail,
    v.video_url,
    v.duration,
    v.views,
    v.rating,
    v.category,
    v.tags,
    v.type,
    v.linkedplatform,
    COALESCE(uc.channel_name, 'Unknown Channel'),
    COALESCE(uc.profile_image, 'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png'),
    COALESCE(uc.is_verified, false)
  FROM videos v
  LEFT JOIN userchannels uc ON uc.user_id = v.publisher_id
  WHERE v.status = 'public'
  AND (
    search_query IS NULL 
    OR v.title ILIKE '%' || search_query || '%'
    OR v.description ILIKE '%' || search_query || '%'
    OR EXISTS (
      SELECT 1 
      FROM jsonb_array_elements_text(v.tags) tag
      WHERE tag ILIKE '%' || search_query || '%'
    )
    OR COALESCE(uc.channel_name, '') ILIKE '%' || search_query || '%'
  )
  AND (category_filter IS NULL OR v.category::text = category_filter)
  AND (type_filter IS NULL OR v.type::text = type_filter)
  ORDER BY 
    CASE 
      WHEN v.title ILIKE '%' || search_query || '%' THEN 1
      WHEN COALESCE(uc.channel_name, '') ILIKE '%' || search_query || '%' THEN 2
      WHEN v.description ILIKE '%' || search_query || '%' THEN 3
      ELSE 4
    END,
    v.views DESC,
    v.publish_date DESC;
END;
$$;