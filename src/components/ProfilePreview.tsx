
import { useState, useRef, useEffect } from 'react';
import { ProfileData } from '@/pages/Index';
import { cn } from '@/lib/utils';

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
    glow: "ring-4 ring-purple-400/50 shadow-lg shadow-purple-500/50",
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
      <h3 className="text-lg font-semibold text-white mb-4 text-center">Live Preview</h3>
      
      <div className={cn(
        "relative bg-black/50 backdrop-blur-lg rounded-2xl border border-purple-500/30 p-6 overflow-hidden",
        fontClasses[profileData.fontStyle as keyof typeof fontClasses]
      )}>
        {/* Background Video */}
        {profileData.backgroundVideo && (
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              className="w-full h-full object-cover opacity-30"
              loop
              muted
              playsInline
            >
              <source src={profileData.backgroundVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
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
                  : "bg-gradient-to-br from-purple-500 to-pink-500"
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
                      className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs"
                    >
                      {badge === 'star' && '⭐'}
                      {badge === 'crown' && '👑'}
                      {badge === 'fire' && '🔥'}
                      {badge === 'diamond' && '💎'}
                      {badge === 'heart' && '❤️'}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="text-center mb-6">
            <h4 className="text-xl font-bold text-white mb-1">Your Name</h4>
            <p className="text-purple-200/80 text-sm">Digital Creator</p>
          </div>

          {/* Social Links */}
          {profileData.socialLinks.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-sm font-medium text-purple-200 text-center mb-3">Connect With Me</h5>
              {profileData.socialLinks.slice(0, 4).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full p-3 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg transition-all duration-300 border border-purple-400/30 hover:border-purple-400/60 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-xs font-bold text-white">
                      {link.platform.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white text-sm font-medium group-hover:text-purple-200 transition-colors">
                      {link.label}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Media Controls */}
          <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-purple-500/20">
            {profileData.backgroundVideo && (
              <button
                onClick={toggleVideo}
                className="px-3 py-1 bg-purple-600/40 hover:bg-purple-600/60 rounded-lg text-white text-xs transition-all duration-300"
              >
                {isVideoPlaying ? 'Pause Video' : 'Play Video'}
              </button>
            )}
            {profileData.backgroundMusic && (
              <button
                onClick={toggleAudio}
                className="px-3 py-1 bg-purple-600/40 hover:bg-purple-600/60 rounded-lg text-white text-xs transition-all duration-300"
              >
                {isAudioPlaying ? 'Pause Music' : 'Play Music'}
              </button>
            )}
          </div>
        </div>

        {/* Special Effects Overlay */}
        {profileData.specialEffects.includes('particles') && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-4 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
            <div className="absolute top-8 right-6 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-6 left-6 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          </div>
        )}
      </div>
    </div>
  );
};
