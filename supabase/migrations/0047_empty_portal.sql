-- Add unique constraint to ai_analysis table
ALTER TABLE ai_analysis DROP CONSTRAINT IF EXISTS unique_video_analysis;
ALTER TABLE ai_analysis ADD CONSTRAINT unique_video_analysis UNIQUE (video_id);

-- Add updated_at trigger if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'set_ai_analysis_updated_at'
  ) THEN
    CREATE TRIGGER set_ai_analysis_updated_at
      BEFORE UPDATE ON ai_analysis
      FOR EACH ROW
      EXECUTE FUNCTION handle_updated_at();
  END IF;
END $$;