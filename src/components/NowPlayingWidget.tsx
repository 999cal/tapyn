
import { useState, useEffect } from 'react';
import { Music, Play, Pause, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Track {
  name: string;
  artist: string;
  album?: string;
  image?: string;
  isPlaying?: boolean;
  url?: string;
}

export const NowPlayingWidget = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching from Spotify/Last.fm API
    const fetchNowPlaying = async () => {
      setIsLoading(true);
      
      // This would be replaced with actual API calls to Spotify/Last.fm
      // For now, showing demo data
      setTimeout(() => {
        setCurrentTrack({
          name: "Blinding Lights",
          artist: "The Weeknd",
          album: "After Hours",
          image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
          isPlaying: true,
          url: "https://open.spotify.com/track/example"
        });
        setIsLoading(false);
      }, 1000);
    };

    fetchNowPlaying();
    
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <Card className="w-96 bg-slate-800/50 border-sky-400/30 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-slate-700 rounded-lg animate-pulse" />
            <div className="flex-1">
              <div className="h-4 bg-slate-700 rounded animate-pulse mb-2" />
              <div className="h-3 bg-slate-700 rounded animate-pulse w-2/3" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentTrack) {
    return (
      <Card className="w-96 bg-slate-800/50 border-sky-400/30 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 text-slate-400">
            <div className="w-16 h-16 bg-slate-700/50 rounded-lg flex items-center justify-center">
              <Music className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Nothing playing</p>
              <p className="text-sm">Connect your Spotify or Last.fm to see live music</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-96 bg-slate-800/50 border-sky-400/30 backdrop-blur-sm hover:border-sky-400/50 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          {currentTrack.image ? (
            <img 
              src={currentTrack.image} 
              alt={`${currentTrack.name} cover`}
              className="w-16 h-16 rounded-lg object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-gradient-to-br from-sky-400/20 to-blue-600/20 rounded-lg flex items-center justify-center">
              <Music className="w-8 h-8 text-sky-400" />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {currentTrack.isPlaying ? (
                <Play className="w-4 h-4 text-sky-400" />
              ) : (
                <Pause className="w-4 h-4 text-slate-400" />
              )}
              <span className="text-xs text-sky-400 font-medium">
                {currentTrack.isPlaying ? 'NOW PLAYING' : 'PAUSED'}
              </span>
            </div>
            
            <h3 className="font-semibold text-white truncate">
              {currentTrack.name}
            </h3>
            <p className="text-sm text-slate-300 truncate">
              {currentTrack.artist}
              {currentTrack.album && ` • ${currentTrack.album}`}
            </p>
          </div>

          {currentTrack.url && (
            <a
              href={currentTrack.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-sky-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
