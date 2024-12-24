-- Create category-images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('category-images', 'category-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to category images
CREATE POLICY "Category images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'category-images');

-- Allow authenticated users to upload category images
CREATE POLICY "Users can upload category images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'category-images'
    AND auth.uid()::text = (storage.foldername(name))[1]
    AND (storage.extension(name) = 'jpg' OR
         storage.extension(name) = 'jpeg' OR
         storage.extension(name) = 'png' OR
         storage.extension(name) = 'gif')
  );

-- Allow users to update their own category images
CREATE POLICY "Users can update own category images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'category-images' AND auth.uid()::text = (storage.foldername(name))[1])
  WITH CHECK (
    bucket_id = 'category-images'
    AND (storage.extension(name) = 'jpg' OR
         storage.extension(name) = 'jpeg' OR
         storage.extension(name) = 'png' OR
         storage.extension(name) = 'gif')
  );

-- Allow users to delete their own category images
CREATE POLICY "Users can delete own category images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'category-images' AND auth.uid()::text = (storage.foldername(name))[1]);