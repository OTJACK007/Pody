/*
  # Create Storage Bucket for Avatars
  
  1. New Storage
    - Creates a new public storage bucket for user avatars
    - Sets appropriate security policies
  
  2. Security
    - Enables public read access
    - Restricts write access to authenticated users
    - Limits file types to images
    - Sets max file size to 5MB
*/

-- Create avatars bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Allow public access to avatars
create policy "Avatar files are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'avatars' );

-- Allow authenticated users to upload avatar files
create policy "Users can upload avatar files"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'avatars' 
    and auth.uid()::text = (storage.foldername(name))[1]
    and (storage.extension(name) = 'jpg' or 
         storage.extension(name) = 'jpeg' or 
         storage.extension(name) = 'png' or 
         storage.extension(name) = 'gif')
    and octet_length(content) < 5242880
  );

-- Allow users to update their own avatar files  
create policy "Users can update own avatar files"
  on storage.objects for update
  to authenticated
  using ( bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1] )
  with check (
    bucket_id = 'avatars'
    and (storage.extension(name) = 'jpg' or
         storage.extension(name) = 'jpeg' or
         storage.extension(name) = 'png' or
         storage.extension(name) = 'gif')
    and octet_length(content) < 5242880
  );

-- Allow users to delete their own avatar files
create policy "Users can delete own avatar files" 
  on storage.objects for delete
  to authenticated
  using ( bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1] );