-- Create thumbnails bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('thumbnails', 'thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to thumbnails
CREATE POLICY "Thumbnails are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'thumbnails');

-- Allow authenticated users to upload thumbnails
CREATE POLICY "Users can upload thumbnails"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'thumbnails'
    AND auth.uid()::text = (storage.foldername(name))[1]
    AND (storage.extension(name) = 'jpg' OR
         storage.extension(name) = 'jpeg' OR
         storage.extension(name) = 'png' OR
         storage.extension(name) = 'gif')
  );

-- Allow users to update their own thumbnails
CREATE POLICY "Users can update own thumbnails"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'thumbnails' AND auth.uid()::text = (storage.foldername(name))[1])
  WITH CHECK (
    bucket_id = 'thumbnails'
    AND (storage.extension(name) = 'jpg' OR
         storage.extension(name) = 'jpeg' OR
         storage.extension(name) = 'png' OR
         storage.extension(name) = 'gif')
  );

-- Allow users to delete their own thumbnails
CREATE POLICY "Users can delete own thumbnails"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'thumbnails' AND auth.uid()::text = (storage.foldername(name))[1]);