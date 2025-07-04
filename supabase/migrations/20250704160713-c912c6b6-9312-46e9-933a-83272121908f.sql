
-- Create storage buckets for user uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('profile-pictures', 'profile-pictures', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']),
  ('background-videos', 'background-videos', true, 52428800, ARRAY['video/mp4', 'video/webm', 'video/quicktime']),
  ('background-music', 'background-music', true, 20971520, ARRAY['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4']);

-- Create storage policies for profile pictures
CREATE POLICY "Users can upload their own profile pictures"
ON storage.objects FOR INSERT 
TO authenticated
WITH CHECK (
  bucket_id = 'profile-pictures' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view all profile pictures"
ON storage.objects FOR SELECT 
TO public
USING (bucket_id = 'profile-pictures');

CREATE POLICY "Users can update their own profile pictures"
ON storage.objects FOR UPDATE 
TO authenticated
USING (
  bucket_id = 'profile-pictures' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own profile pictures"
ON storage.objects FOR DELETE 
TO authenticated
USING (
  bucket_id = 'profile-pictures' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create storage policies for background videos
CREATE POLICY "Users can upload their own background videos"
ON storage.objects FOR INSERT 
TO authenticated
WITH CHECK (
  bucket_id = 'background-videos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view all background videos"
ON storage.objects FOR SELECT 
TO public
USING (bucket_id = 'background-videos');

CREATE POLICY "Users can update their own background videos"
ON storage.objects FOR UPDATE 
TO authenticated
USING (
  bucket_id = 'background-videos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own background videos"
ON storage.objects FOR DELETE 
TO authenticated
USING (
  bucket_id = 'background-videos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create storage policies for background music
CREATE POLICY "Users can upload their own background music"
ON storage.objects FOR INSERT 
TO authenticated
WITH CHECK (
  bucket_id = 'background-music' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view all background music"
ON storage.objects FOR SELECT 
TO public
USING (bucket_id = 'background-music');

CREATE POLICY "Users can update their own background music"
ON storage.objects FOR UPDATE 
TO authenticated
USING (
  bucket_id = 'background-music' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own background music"
ON storage.objects FOR DELETE 
TO authenticated
USING (
  bucket_id = 'background-music' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Update profiles table to store file URLs and profile data
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS profile_picture_url TEXT,
ADD COLUMN IF NOT EXISTS background_video_url TEXT,
ADD COLUMN IF NOT EXISTS background_music_url TEXT,
ADD COLUMN IF NOT EXISTS profile_effect TEXT DEFAULT 'glow',
ADD COLUMN IF NOT EXISTS badges JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS font_style TEXT DEFAULT 'modern',
ADD COLUMN IF NOT EXISTS special_effects JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '[]';

-- Create RLS policy to allow public viewing of profiles by username
CREATE POLICY "Anyone can view profiles by username" 
ON public.profiles 
FOR SELECT 
TO public
USING (true);
