-- Create new transcripts_json table
CREATE TABLE IF NOT EXISTS transcripts_json (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos ON DELETE CASCADE NOT NULL,
  content jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(video_id)
);

-- Enable RLS
ALTER TABLE transcripts_json ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Public video transcripts are viewable by everyone"
  ON transcripts_json FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM videos
    WHERE videos.id = video_id
    AND videos.status = 'public'
  ));

CREATE POLICY "Users can view transcripts for their own videos"
  ON transcripts_json FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM videos
    WHERE videos.id = video_id
    AND videos.publisher_id = auth.uid()
  ));

CREATE POLICY "Users can manage transcripts for their own videos"
  ON transcripts_json
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM videos
    WHERE videos.id = video_id
    AND videos.publisher_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM videos
    WHERE videos.id = video_id
    AND videos.publisher_id = auth.uid()
  ));

-- Migrate existing data
INSERT INTO transcripts_json (video_id, content)
SELECT 
  video_id,
  jsonb_agg(
    jsonb_build_object(
      'time', time,
      'speaker', speaker,
      'text', text
    )
    ORDER BY time
  )
FROM transcripts
GROUP BY video_id;

-- Add trigger for updated_at
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON transcripts_json
FOR EACH ROW
EXECUTE FUNCTION handle_updated_at();