-- Create podroom_videos table
CREATE TABLE IF NOT EXISTS podroom_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  video_id uuid REFERENCES videos ON DELETE CASCADE NOT NULL,
  added_at timestamptz DEFAULT now(),
  notes text,
  is_favorite boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, video_id)
);

-- Create podroom_collections table for organizing videos
CREATE TABLE IF NOT EXISTS podroom_collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create podroom_collection_videos table for collection-video relationships
CREATE TABLE IF NOT EXISTS podroom_collection_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id uuid REFERENCES podroom_collections ON DELETE CASCADE NOT NULL,
  podroom_video_id uuid REFERENCES podroom_videos ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(collection_id, podroom_video_id)
);

-- Enable RLS
ALTER TABLE podroom_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE podroom_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE podroom_collection_videos ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage their own podroom videos"
  ON podroom_videos
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own collections"
  ON podroom_collections
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own collection videos"
  ON podroom_collection_videos
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM podroom_collections pc
    WHERE pc.id = collection_id
    AND pc.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM podroom_collections pc
    WHERE pc.id = collection_id
    AND pc.user_id = auth.uid()
  ));

-- Add triggers for updated_at
CREATE TRIGGER set_timestamp_podroom_videos
  BEFORE UPDATE ON podroom_videos
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_timestamp_podroom_collections
  BEFORE UPDATE ON podroom_collections
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();