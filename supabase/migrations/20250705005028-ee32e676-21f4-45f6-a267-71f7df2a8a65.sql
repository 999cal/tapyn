
-- Add music_stats and playlists columns to the profiles table
ALTER TABLE public.profiles 
ADD COLUMN music_stats jsonb DEFAULT '{
  "topArtists": [],
  "topTracks": [],
  "topGenres": []
}'::jsonb,
ADD COLUMN playlists jsonb DEFAULT '[]'::jsonb;
