-- Add indexes for video filtering
CREATE INDEX IF NOT EXISTS idx_videos_duration ON videos(duration);
CREATE INDEX IF NOT EXISTS idx_videos_publish_date ON videos(publish_date);

-- Add function to filter videos by duration range
CREATE OR REPLACE FUNCTION filter_videos_by_duration(
  min_duration interval,
  max_duration interval
) RETURNS SETOF videos AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM videos
  WHERE 
    CASE 
      WHEN duration ~ '^([0-9]+):([0-9]{2})$' THEN
        (split_part(duration, ':', 1)::integer * interval '1 minute' +
         split_part(duration, ':', 2)::integer * interval '1 second')
        BETWEEN min_duration AND max_duration
      ELSE false
    END;
END;
$$ LANGUAGE plpgsql;