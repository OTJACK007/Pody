-- Add function to filter videos by duration and date
CREATE OR REPLACE FUNCTION filter_videos(
  user_id uuid,
  video_type text,
  date_filter text,
  duration_filter text,
  search_query text DEFAULT NULL,
  video_status text DEFAULT NULL
)
RETURNS SETOF videos AS $$
DECLARE
  date_threshold timestamptz;
BEGIN
  -- Set date threshold based on filter
  date_threshold := CASE date_filter
    WHEN 'today' THEN current_date
    WHEN 'week' THEN current_date - interval '7 days'
    WHEN 'month' THEN current_date - interval '1 month'
    WHEN 'year' THEN current_date - interval '1 year'
    ELSE NULL
  END;

  RETURN QUERY
  SELECT v.*
  FROM videos v
  WHERE v.publisher_id = user_id
    AND v.type = video_type::video_type
    AND (video_status IS NULL OR v.status = video_status::video_status)
    AND (search_query IS NULL OR v.title ILIKE '%' || search_query || '%')
    AND (date_threshold IS NULL OR v.publish_date >= date_threshold)
    AND (duration_filter = 'all' 
      OR (duration_filter = 'short' AND v.duration <= '05:00')
      OR (duration_filter = 'medium' AND v.duration > '05:00' AND v.duration <= '20:00')
      OR (duration_filter = 'long' AND v.duration > '20:00')
    )
  ORDER BY v.publish_date DESC;
END;
$$ LANGUAGE plpgsql;