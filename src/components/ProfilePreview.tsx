
import { useState, useRef, useEffect } from 'react';
import { ProfileData } from '@/pages/Index';
import { cn } from '@/lib/utils';
import { Play, Pause, Music, BarChart3 } from 'lucide-react';

interface ProfilePreviewProps {
  profileData: ProfileData;
}

export const ProfilePreview = ({ profileData }: ProfilePreviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    if (profileData.backgroundVideo && videoRef.current) {
      videoRef.current.load();
    }
  }, [profileData.backgroundVideo]);

  useEffect(() => {
    if (profileData.backgroundMusic && audioRef.current) {
      audioRef.current.load();
    }
  }, [profileData.backgroundMusic]);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  const profileEffectClasses = {
    glow: "ring-4 ring-blue-400/50 shadow-lg shadow-blue-500/30",
    rainbow: "ring-4 ring-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 animate-pulse",
    neon: "ring-4 ring-cyan-400/60 shadow-lg shadow-cyan-500/50 animate-pulse",
    fire: "ring-4 ring-orange-400/60 shadow-lg shadow-orange-500/50",
  };

  const fontClasses = {
    modern: "font-sans",
    elegant: "font-serif",
    playful: "font-mono",
    bold: "font-black",
  };

  return (
    <div className="sticky top-6">
      <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-black bg-clip-text text-transparent mb-4 text-center">
        Live Preview
      </h3>
      
      <div className={cn(
        "relative bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-lg rounded-2xl border border-blue-200/50 p-6 overflow-hidden shadow-xl",
        fontClasses[profileData.fontStyle as keyof typeof fontClasses]
      )}>
        {/* Background Video */}
        {profileData.backgroundVideo && (
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              className="w-full h-full object-cover opacity-20"
              loop
              muted
              playsInline
            >
              <source src={profileData.backgroundVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 to-transparent"></div>
          </div>
        )}

        {/* Background Music */}
        {profileData.backgroundMusic && (
          <audio ref={audioRef} loop>
            <source src={profileData.backgroundMusic} type="audio/mpeg" />
          </audio>
        )}

        <div className="relative z-10">
          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className={cn(
                "w-24 h-24 rounded-full overflow-hidden transition-all duration-300",
                profileData.profilePicture 
                  ? profileEffectClasses[profileData.profileEffect as keyof typeof profileEffectClasses]
                  : "bg-gradient-to-br from-blue-500 to-black"
              )}>
                {profileData.profilePicture ? (
                  <img 
                    src={profileData.profilePicture} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">?</span>
                  </div>
                )}
              </div>

              {/* Badges */}
              {profileData.badges.length > 0 && (
                <div className="absolute -top-2 -right-2 flex flex-wrap gap-1">
                  {profileData.badges.slice(0, 3).map((badge, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs shadow-lg"
                    >
                      {badge === 'star' && '⭐'}
                      {badge === 'crown' && '👑'}
                      {badge === 'fire' && '🔥'}
                      {badge === 'diamond' && '💎'}
                      {badge === 'heart' && '❤️'}
                      {badge === 'lightning' && '⚡'}
                      {badge === 'trophy' && '🏆'}
                      {badge === 'rocket' && '🚀'}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="text-center mb-6">
            <h4 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-black bg-clip-text text-transparent mb-1">
              Your Name
            </h4>
            <p className="text-slate-600 text-sm">Digital Creator</p>
          </div>

          {/* Currently Playing */}
          {profileData.musicStats.currentlyPlaying && (
            <div className="mb-4 p-3 bg-gradient-to-r from-blue-100/50 to-slate-100/50 rounded-lg border border-blue-200/30">
              <div className="flex items-center gap-2 mb-2">
                <Music className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-blue-600 font-medium">Now Playing</span>
              </div>
              <div className="flex items-center gap-3">
                {profileData.musicStats.currentlyPlaying.image && (
                  <img 
                    src={profileData.musicStats.currentlyPlaying.image} 
                    alt="Cover" 
                    className="w-8 h-8 rounded object-cover" 
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">
                    {profileData.musicStats.currentlyPlaying.name}
                  </p>
                  <p className="text-xs text-slate-600 truncate">
                    {profileData.musicStats.currentlyPlaying.artist}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Music Stats Preview */}
          {(profileData.musicStats.topArtists.length > 0 || profileData.musicStats.topTracks.length > 0) && (
            <div className="mb-4 p-3 bg-gradient-to-r from-blue-100/50 to-slate-100/50 rounded-lg border border-blue-200/30">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-blue-600 font-medium">Music Stats</span>
              </div>
              {profileData.musicStats.topArtists.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs text-slate-600 mb-1">Top Artist:</p>
                  <p className="text-sm font-medium text-slate-800">
                    {profileData.musicStats.topArtists[0]?.name}
                  </p>
                </div>
              )}
              {profileData.musicStats.topTracks.length > 0 && (
                <div>
                  <p className="text-xs text-slate-600 mb-1">Top Track:</p>
                  <p className="text-sm font-medium text-slate-800">
                    {profileData.musicStats.topTracks[0]?.name}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Playlists Preview */}
          {profileData.playlists.length > 0 && (
            <div className="mb-4 p-3 bg-gradient-to-r from-blue-100/50 to-slate-100/50 rounded-lg border border-blue-200/30">
              <div className="flex items-center gap-2 mb-2">
                <Music className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-blue-600 font-medium">Featured Playlist</span>
              </div>
              <div className="flex items-center gap-3">
                {profileData.playlists[0]?.coverImage && (
                  <img 
                    src={profileData.playlists[0].coverImage} 
                    alt="Playlist" 
                    className="w-8 h-8 rounded object-cover" 
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">
                    {profileData.playlists[0]?.name}
                  </p>
                  <p className="text-xs text-slate-600">
                    {profileData.playlists[0]?.tracks.length} tracks
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Social Links */}
          {profileData.socialLinks.length > 0 && (
            <div className="space-y-2 mb-4">
              <h5 className="text-sm font-medium text-slate-700 text-center mb-3">Connect With Me</h5>
              {profileData.socialLinks.slice(0, 3).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full p-3 bg-gradient-to-r from-blue-100/50 to-slate-100/50 hover:from-blue-200/50 hover:to-slate-200/50 rounded-lg transition-all duration-300 border border-blue-200/30 hover:border-blue-300/50 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-black rounded-lg flex items-center justify-center text-xs font-bold text-white">
                      {link.platform.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-slate-800 text-sm font-medium group-hover:text-blue-700 transition-colors">
                      {link.label}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Media Controls */}
          <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-blue-200/30">
            {profileData.backgroundVideo && (
              <button
                onClick={toggleVideo}
                className="px-3 py-1 bg-gradient-to-r from-blue-500/40 to-black/20 hover:from-blue-600/50 hover:to-black/30 rounded-lg text-slate-700 text-xs transition-all duration-300 border border-blue-200/30"
              >
                {isVideoPlaying ? 'Pause Video' : 'Play Video'}
              </button>
            )}
            {profileData.backgroundMusic && (
              <button
                onClick={toggleAudio}
                className="px-3 py-1 bg-gradient-to-r from-blue-500/40 to-black/20 hover:from-blue-600/50 hover:to-black/30 rounded-lg text-slate-700 text-xs transition-all duration-300 border border-blue-200/30"
              >
                {isAudioPlaying ? 'Pause Music' : 'Play Music'}
              </button>
            )}
          </div>
        </div>

        {/* Special Effects Overlay */}
        {profileData.specialEffects.includes('particles') && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-4 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
            <div className="absolute top-8 right-6 w-1 h-1 bg-blue-600 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-6 left-6 w-1 h-1 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-8 right-4 w-1 h-1 bg-slate-600 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
          </div>
        )}
      </div>
    </div>
  );
};
