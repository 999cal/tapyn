
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Music, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NowPlayingWidget } from '@/components/NowPlayingWidget';

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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black flex items-center justify-center">
        <div className="text-sky-400 text-xl">Loading profile...</div>
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Music className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Profile Not Found</h1>
          <p className="text-slate-300 mb-8">The profile you're looking for doesn't exist.</p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white rounded-full px-6">
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
    glow: "ring-4 ring-sky-400/50 shadow-lg shadow-sky-500/30",
    rainbow: "ring-4 ring-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 animate-pulse",
    neon: "ring-4 ring-cyan-400/60 shadow-lg shadow-cyan-500/50 animate-pulse",
    fire: "ring-4 ring-orange-400/60 shadow-lg shadow-orange-500/50",
  };

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-slate-900 to-black relative overflow-hidden text-white",
      fontClasses[profile.font_style as keyof typeof fontClasses] || "font-sans"
    )}>
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-sm border-b border-sky-400/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
              Playd
            </h1>
          </Link>
          
          <Link to="/">
            <Button
              variant="outline"
              className="border-sky-400/30 text-sky-400 hover:bg-sky-400/10 hover:border-sky-400 rounded-full px-6"
            >
              Create Your Profile
            </Button>
          </Link>
        </div>
      </header>

      {/* Background Video */}
      {profile.background_video_url && (
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover opacity-20"
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
        <div className="max-w-md w-full space-y-6">
          {/* Now Playing Widget */}
          <div className="flex justify-center">
            <NowPlayingWidget />
          </div>

          {/* Main Profile Card */}
          <div className="bg-slate-800/90 backdrop-blur-lg rounded-3xl border border-sky-400/30 p-8 text-center shadow-xl">
            {/* Profile Picture */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className={cn(
                  "w-32 h-32 rounded-full overflow-hidden transition-all duration-300",
                  profile.profile_picture_url 
                    ? profileEffectClasses[profile.profile_effect as keyof typeof profileEffectClasses] || profileEffectClasses.glow
                    : "bg-gradient-to-br from-sky-400 to-blue-600"
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
                        className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-sm shadow-lg"
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
                <p className="text-slate-300 text-sm">{profile.bio}</p>
              )}
            </div>

            {/* Social Links */}
            {profile.social_links && profile.social_links.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-medium text-sky-400 mb-4">Connect With Me</h2>
                {profile.social_links.map((link: any) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full p-4 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-all duration-300 border border-sky-400/20 hover:border-sky-400/40 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center text-sm font-bold text-white">
                        {link.platform.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-white font-medium group-hover:text-sky-400 transition-colors">
                        {link.label}
                      </span>
                      <ExternalLink className="w-4 h-4 text-slate-400 ml-auto group-hover:text-sky-400 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-sky-400/20">
              <p className="text-xs text-slate-400 mb-4">Powered by Playd</p>
              <Link to="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-sky-400/30 text-sky-400 hover:bg-sky-400/10 hover:border-sky-400 rounded-full px-4"
                >
                  Create Your Own Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Special Effects */}
      {profile.special_effects && profile.special_effects.includes('particles') && (
        <div className="absolute inset-0 pointer-events-none z-5">
          <div className="absolute top-10 left-10 w-2 h-2 bg-sky-400 rounded-full animate-ping"></div>
          <div className="absolute top-20 right-16 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-16 left-16 w-2 h-2 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 right-12 w-2 h-2 bg-indigo-400 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
        </div>
      )}
    </div>
  );
};

export default Profile;
