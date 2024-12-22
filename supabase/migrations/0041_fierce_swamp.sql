-- First clean up duplicate entries, keeping only the most recent one
WITH ranked_content AS (
  SELECT 
    id,
    video_id,
    ROW_NUMBER() OVER (
      PARTITION BY video_id 
      ORDER BY updated_at DESC NULLS LAST, id DESC
    ) as rn
  FROM full_content
)
DELETE FROM full_content
WHERE id IN (
  SELECT id 
  FROM ranked_content 
  WHERE rn > 1
);

-- Now it's safe to add the unique constraint
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