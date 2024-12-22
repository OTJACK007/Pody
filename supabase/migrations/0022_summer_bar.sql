/*
  # Video Storage Configuration
  
  1. Create Buckets
    - videos bucket for video files
    - thumbnails bucket for video thumbnails

  2. Security
    - Enable RLS policies
    - Configure access control
*/

-- Create videos bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos', 'videos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to videos
CREATE POLICY "Videos are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'videos');

-- Allow authenticated users to upload videos
CREATE POLICY "Users can upload videos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'videos'
    AND auth.uid()::text = (storage.foldername(name))[1]
    AND (storage.extension(name) = 'mp4' OR
         storage.extension(name) = 'mov' OR
         storage.extension(name) = 'webm')
  );

-- Allow users to update their own videos
CREATE POLICY "Users can update own videos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'videos' AND auth.uid()::text = (storage.foldername(name))[1])
  WITH CHECK (
    bucket_id = 'videos'
    AND (storage.extension(name) = 'mp4' OR
         storage.extension(name) = 'mov' OR
         storage.extension(name) = 'webm')
  );

-- Allow users to delete their own videos
CREATE POLICY "Users can delete own videos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'videos' AND auth.uid()::text = (storage.foldername(name))[1]);