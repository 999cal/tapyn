
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const { fetchProfileByUsername } = useProfile();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!username) return;
      
      setLoading(true);
      const data = await fetchProfileByUsername(username);
      
      if (data) {
        setProfile(data);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    };

    loadProfile();
  }, [username, fetchProfileByUsername]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading profile...</div>
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Profile Not Found</h1>
          <p className="text-purple-200/80 mb-8">The profile you're looking for doesn't exist.</p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const fontClasses = {
    modern: "font-sans",
    elegant: "font-serif",
    playful: "font-mono",
    bold: "font-black",
  };

  const profileEffectClasses = {
    glow: "ring-4 ring-purple-400/50 shadow-lg shadow-purple-500/50",
    rainbow: "ring-4 ring-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 animate-pulse",
    neon: "ring-4 ring-cyan-400/60 shadow-lg shadow-cyan-500/50 animate-pulse",
    fire: "ring-4 ring-orange-400/60 shadow-lg shadow-orange-500/50",
  };

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 relative overflow-hidden",
      fontClasses[profile.font_style as keyof typeof fontClasses] || "font-sans"
    )}>
      {/* Background Video */}
      {profile.background_video_url && (
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover opacity-30"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={profile.background_video_url} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
      )}

      {/* Background Music */}
      {profile.background_music_url && (
        <audio autoPlay loop>
          <source src={profile.background_music_url} type="audio/mpeg" />
        </audio>
      )}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-black/50 backdrop-blur-lg rounded-2xl border border-purple-500/30 p-8 text-center">
          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className={cn(
                "w-32 h-32 rounded-full overflow-hidden transition-all duration-300",
                profile.profile_picture_url 
                  ? profileEffectClasses[profile.profile_effect as keyof typeof profileEffectClasses] || profileEffectClasses.glow
                  : "bg-gradient-to-br from-purple-500 to-pink-500"
              )}>
                {profile.profile_picture_url ? (
                  <img 
                    src={profile.profile_picture_url} 
                    alt={`${profile.username}'s profile`} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">
                      {profile.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Badges */}
              {profile.badges && profile.badges.length > 0 && (
                <div className="absolute -top-2 -right-2 flex flex-wrap gap-1">
                  {profile.badges.slice(0, 3).map((badge: string, index: number) => (
                    <div
                      key={index}
                      className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-sm"
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

          {/* Name and Bio */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">@{profile.username}</h1>
            {profile.bio && (
              <p className="text-purple-200/80 text-sm">{profile.bio}</p>
            )}
          </div>

          {/* Social Links */}
          {profile.social_links && profile.social_links.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-medium text-purple-200 mb-4">Connect With Me</h2>
              {profile.social_links.map((link: any) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full p-4 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg transition-all duration-300 border border-purple-400/30 hover:border-purple-400/60 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-sm font-bold text-white">
                      {link.platform.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white font-medium group-hover:text-purple-200 transition-colors">
                      {link.label}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Back to Home */}
          <div className="mt-8 pt-6 border-t border-purple-500/20">
            <Link to="/">
              <Button
                variant="outline"
                className="border-purple-400/30 text-purple-200 hover:bg-purple-500/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Create Your Own Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Special Effects */}
      {profile.special_effects && profile.special_effects.includes('particles') && (
        <div className="absolute inset-0 pointer-events-none z-5">
          <div className="absolute top-10 left-10 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
          <div className="absolute top-20 right-16 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-16 left-16 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 right-12 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
        </div>
      )}
    </div>
  );
};

export default Profile;
