-- Drop existing search function
DROP FUNCTION IF EXISTS search_videos;

-- Create improved search function with channel verification status
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
    COALESCE(uc.channel_name, 'Unknown Channel') as channel_name,
    COALESCE(uc.profile_image, 'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png') as channel_avatar,
    COALESCE(uc.is_verified, false) as channel_is_verified
  FROM videos v
  LEFT JOIN userchannels uc ON uc.user_id = v.publisher_id
  WHERE (
    search_query IS NULL OR
    v.title ILIKE '%' || search_query || '%' OR
    v.description ILIKE '%' || search_query || '%' OR
    EXISTS (
      SELECT 1 FROM jsonb_array_elements_text(v.tags) tag
      WHERE tag ILIKE '%' || search_query || '%'
    ) OR
    COALESCE(uc.channel_name, '') ILIKE '%' || search_query || '%'
  )
  AND (category_filter IS NULL OR v.category::text = category_filter)
  AND (type_filter IS NULL OR v.type::text = type_filter)
  AND v.status = 'public'
  ORDER BY 
    CASE 
      WHEN v.title ILIKE '%' || search_query || '%' THEN 0
      WHEN COALESCE(uc.channel_name, '') ILIKE '%' || search_query || '%' THEN 1
      WHEN EXISTS (
        SELECT 1 FROM jsonb_array_elements_text(v.tags) tag
        WHERE tag ILIKE '%' || search_query || '%'
      ) THEN 2
      ELSE 3
    END,
    v.views DESC,
    v.publish_date DESC;
END;
$$;