-- Enable pg_trgm extension for text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Add tags column to videos table
ALTER TABLE videos 
ADD COLUMN IF NOT EXISTS tags jsonb DEFAULT '[]'::jsonb;

-- Create GIN indexes for text search
CREATE INDEX IF NOT EXISTS idx_videos_title_trgm ON videos USING gin (title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_videos_tags_gin ON videos USING gin (tags);
CREATE INDEX IF NOT EXISTS idx_videos_search ON videos USING gin ((
  title || ' ' || 
  COALESCE(description, '') || ' ' || 
  COALESCE(tags::text, '[]')
) gin_trgm_ops);

-- Update existing videos with sample tags
UPDATE videos SET tags = 
  CASE id
    -- The Future of AI Technology
    WHEN 'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f' THEN 
      '["AI", "Technology", "Future", "Machine Learning", "Innovation"]'::jsonb
    
    -- Machine Learning Fundamentals
    WHEN 'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a' THEN 
      '["Machine Learning", "AI", "Data Science", "Programming", "Technology"]'::jsonb
    
    -- Quick AI Tips
    WHEN 'c3d4e5f6-a1b2-6543-8765-3c4d5e6f1a2b' THEN 
      '["AI Tips", "Machine Learning", "Quick Guide", "Technology", "Tutorial"]'::jsonb
    
    ELSE '[]'::jsonb
  END
WHERE tags = '[]'::jsonb OR tags IS NULL;

-- Create function for video search
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
  channel_name text,
  channel_avatar text
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
    COALESCE(uc.channel_name, 'Unknown Channel') as channel_name,
    COALESCE(uc.profile_image, 'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png') as channel_avatar
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
      ELSE 2
    END,
    v.views DESC,
    v.publish_date DESC;
END;
$$;