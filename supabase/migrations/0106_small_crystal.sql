-- Enable pg_trgm extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Add indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_videos_title_trgm ON videos USING gin (title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_videos_description_trgm ON videos USING gin (description gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_userchannels_name_trgm ON userchannels USING gin (channel_name gin_trgm_ops);

-- Create composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_videos_status_type ON videos(status, type);
CREATE INDEX IF NOT EXISTS idx_videos_publisher_status ON videos(publisher_id, status);

-- Drop existing search function
DROP FUNCTION IF EXISTS search_videos;

-- Create improved search function
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
  WITH ranked_results AS (
    SELECT 
      v.*,
      uc.channel_name,
      uc.profile_image as channel_avatar,
      uc.is_verified as channel_is_verified,
      CASE 
        WHEN v.title ILIKE '%' || search_query || '%' THEN 1
        WHEN uc.channel_name ILIKE '%' || search_query || '%' THEN 2
        WHEN v.description ILIKE '%' || search_query || '%' THEN 3
        ELSE 4
      END as rank
    FROM videos v
    LEFT JOIN userchannels uc ON uc.user_id = v.publisher_id
    WHERE v.status = 'public'
    AND (
      search_query IS NULL 
      OR v.title ILIKE '%' || search_query || '%'
      OR v.description ILIKE '%' || search_query || '%'
      OR uc.channel_name ILIKE '%' || search_query || '%'
    )
    AND (category_filter IS NULL OR v.category::text = category_filter)
    AND (type_filter IS NULL OR v.type::text = type_filter)
  )
  SELECT 
    r.id,
    r.title,
    r.description,
    r.thumbnail,
    r.video_url,
    r.duration,
    r.views,
    r.rating,
    r.category,
    r.tags,
    r.type,
    r.linkedplatform,
    COALESCE(r.channel_name, 'Unknown Channel'),
    COALESCE(r.channel_avatar, 'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png'),
    COALESCE(r.channel_is_verified, false)
  FROM ranked_results r
  ORDER BY 
    r.rank,
    r.views DESC,
    r.publish_date DESC;
END;
$$;