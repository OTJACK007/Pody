-- Create temporary table to store the most recent entries
CREATE TEMP TABLE temp_full_content AS
SELECT DISTINCT ON (video_id) *
FROM full_content
ORDER BY video_id, updated_at DESC NULLS LAST;

-- Delete all entries from full_content
TRUNCATE full_content;

-- Reinsert only the most recent entries
INSERT INTO full_content
SELECT * FROM temp_full_content;

-- Drop temporary table
DROP TABLE temp_full_content;

-- Add unique constraint
ALTER TABLE full_content DROP CONSTRAINT IF EXISTS unique_video_content;
ALTER TABLE full_content ADD CONSTRAINT unique_video_content UNIQUE (video_id);

-- Add updated_at trigger if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'set_full_content_updated_at'
  ) THEN
    CREATE TRIGGER set_full_content_updated_at
      BEFORE UPDATE ON full_content
      FOR EACH ROW
      EXECUTE FUNCTION handle_updated_at();
  END IF;
END $$;