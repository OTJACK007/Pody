/*
  # Create channel-images storage bucket
  
  1. Create bucket for storing channel images
  2. Set up storage policies for user access
*/

-- Create channel-images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('channel-images', 'channel-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to channel images
CREATE POLICY "Channel images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'channel-images');

-- Allow authenticated users to upload channel images
CREATE POLICY "Users can upload channel images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'channel-images'
    AND auth.uid()::text = (storage.foldername(name))[1]
    AND (storage.extension(name) = 'jpg' OR 
         storage.extension(name) = 'jpeg' OR 
         storage.extension(name) = 'png' OR 
         storage.extension(name) = 'gif')
  );

-- Allow users to update their own channel images
CREATE POLICY "Users can update own channel images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'channel-images' AND auth.uid()::text = (storage.foldername(name))[1])
  WITH CHECK (
    bucket_id = 'channel-images'
    AND (storage.extension(name) = 'jpg' OR
         storage.extension(name) = 'jpeg' OR
         storage.extension(name) = 'png' OR
         storage.extension(name) = 'gif')
  );

-- Allow users to delete their own channel images
CREATE POLICY "Users can delete own channel images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'channel-images' AND auth.uid()::text = (storage.foldername(name))[1]);