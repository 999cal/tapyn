
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ProfilePreview } from '@/components/ProfilePreview';
import { ProfilePictureSection } from '@/components/sections/ProfilePictureSection';
import { BackgroundVideoSection } from '@/components/sections/BackgroundVideoSection';
import { BackgroundMusicSection } from '@/components/sections/BackgroundMusicSection';
import { BadgesSection } from '@/components/sections/BadgesSection';
import { FontsSection } from '@/components/sections/FontsSection';
import { SpecialEffectsSection } from '@/components/sections/SpecialEffectsSection';
import { SocialLinksSection } from '@/components/sections/SocialLinksSection';
import { MusicStatsSection } from '@/components/sections/MusicStatsSection';
import { PlaylistSection } from '@/components/sections/PlaylistSection';
import { InteractiveBackground } from '@/components/InteractiveBackground';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { LogOut, User, Save, ExternalLink, Music, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ProfileData {
  profilePicture: string | null;
  profileEffect: string;
  backgroundVideo: string | null;
  backgroundMusic: string | null;
  badges: string[];
  fontStyle: string;
  specialEffects: string[];
  socialLinks: Array<{
    id: string;
    platform: string;
    url: string;
    label: string;
  }>;
  musicStats: {
    topArtists: Array<{ name: string; plays: number; image?: string }>;
    topTracks: Array<{ name: string; artist: string; plays: number; image?: string }>;
    topGenres: Array<{ name: string; percentage: number }>;
    currentlyPlaying?: { name: string; artist: string; image?: string };
  };
  playlists: Array<{
    id: string;
    name: string;
    description: string;
    tracks: Array<{ name: string; artist: string; duration: string }>;
    coverImage?: string;
  }>;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('profile-picture');
  const [profileData, setProfileData] = useState<ProfileData>({
    profilePicture: null,
    profileEffect: 'glow',
    backgroundVideo: null,
    backgroundMusic: null,
    badges: [],
    fontStyle: 'modern',
    specialEffects: [],
    socialLinks: [],
    musicStats: {
      topArtists: [],
      topTracks: [],
      topGenres: [],
    },
    playlists: []
  });
  const [isSaving, setIsSaving] = useState(false);

  const { user, signOut } = useAuth();
  const { profile, updateProfile } = useProfile();
  const { toast } = useToast();

  // Load profile data when profile is fetched
  useEffect(() => {
    if (profile) {
      setProfileData({
        profilePicture: profile.profile_picture_url || null,
        profileEffect: profile.profile_effect || 'glow',
        backgroundVideo: profile.background_video_url || null,
        backgroundMusic: profile.background_music_url || null,
        badges: profile.badges || [],
        fontStyle: profile.font_style || 'modern',
        specialEffects: profile.special_effects || [],
        socialLinks: profile.social_links || [],
        musicStats: profile.music_stats || {
          topArtists: [],
          topTracks: [],
          topGenres: [],
        },
        playlists: profile.playlists || []
      });
    }
  }, [profile]);

  const updateProfileData = async (updates: Partial<ProfileData>) => {
    // Update local state immediately
    setProfileData(prev => ({ ...prev, ...updates }));

    // Update database
    const dbUpdates: any = {};
    if (updates.profilePicture !== undefined) dbUpdates.profile_picture_url = updates.profilePicture;
    if (updates.profileEffect !== undefined) dbUpdates.profile_effect = updates.profileEffect;
    if (updates.backgroundVideo !== undefined) dbUpdates.background_video_url = updates.backgroundVideo;
    if (updates.backgroundMusic !== undefined) dbUpdates.background_music_url = updates.backgroundMusic;
    if (updates.badges !== undefined) dbUpdates.badges = updates.badges;
    if (updates.fontStyle !== undefined) dbUpdates.font_style = updates.fontStyle;
    if (updates.specialEffects !== undefined) dbUpdates.special_effects = updates.specialEffects;
    if (updates.socialLinks !== undefined) dbUpdates.social_links = updates.socialLinks;
    if (updates.musicStats !== undefined) dbUpdates.music_stats = updates.musicStats;
    if (updates.playlists !== undefined) dbUpdates.playlists = updates.playlists;

    if (Object.keys(dbUpdates).length > 0) {
      await updateProfile(dbUpdates);
    }
  };

  const handleSaveAndPublish = async () => {
    if (!profile?.username) {
      toast({
        title: "Error",
        description: "Username not found. Please try refreshing the page.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    try {
      // Save all current profile data
      const dbUpdates = {
        profile_picture_url: profileData.profilePicture,
        profile_effect: profileData.profileEffect,
        background_video_url: profileData.backgroundVideo,
        background_music_url: profileData.backgroundMusic,
        badges: profileData.badges,
        font_style: profileData.fontStyle,
        special_effects: profileData.specialEffects,
        social_links: profileData.socialLinks,
        music_stats: profileData.musicStats,
        playlists: profileData.playlists
      };

      await updateProfile(dbUpdates);

      // Show success message with profile URL
      const profileUrl = `https://playd.io/${profile.username}`;
      
      toast({
        title: "Profile Published! 🎉",
        description: (
          <div className="flex items-center gap-2">
            <span>Your profile is live at:</span>
            <a 
              href={profileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
            >
              {profileUrl}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ),
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to save and publish profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile-picture':
        return <ProfilePictureSection profileData={profileData} updateProfileData={updateProfileData} />;
      case 'background-video':
        return <BackgroundVideoSection profileData={profileData} updateProfileData={updateProfileData} />;
      case 'background-music':
        return <BackgroundMusicSection profileData={profileData} updateProfileData={updateProfileData} />;
      case 'badges':
        return <BadgesSection profileData={profileData} updateProfileData={updateProfileData} />;
      case 'fonts':
        return <FontsSection profileData={profileData} updateProfileData={updateProfileData} />;
      case 'special-effects':
        return <SpecialEffectsSection profileData={profileData} updateProfileData={updateProfileData} />;
      case 'social-links':
        return <SocialLinksSection profileData={profileData} updateProfileData={updateProfileData} />;
      case 'music-stats':
        return <MusicStatsSection profileData={profileData} updateProfileData={updateProfileData} />;
      case 'playlists':
        return <PlaylistSection profileData={profileData} updateProfileData={updateProfileData} />;
      default:
        return <ProfilePictureSection profileData={profileData} updateProfileData={updateProfileData} />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-100 to-black/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-black rounded-full flex items-center justify-center mx-auto mb-6">
            <Music className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-black bg-clip-text text-transparent mb-4">Welcome to Playd</h1>
          <p className="text-slate-600 mb-8">Please sign in to create your gaming and music profile</p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-full px-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-100 to-black/30 relative overflow-hidden">
      <InteractiveBackground />
      
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-100/90 to-slate-200/90 backdrop-blur-sm border-b border-blue-200/50 z-50 h-16">
        <div className="flex items-center justify-between px-6 h-full">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-black rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-black bg-clip-text text-transparent">
              Playd
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            {profile?.username && (
              <div className="text-right">
                <p className="text-slate-600 text-sm">Your profile:</p>
                <a 
                  href={`https://playd.io/${profile.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center gap-1"
                >
                  playd.io/{profile.username}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-slate-600">
                <User className="w-4 h-4" />
                <span className="text-sm">{user.email}</span>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="border-blue-200 text-slate-600 hover:bg-blue-50"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex pt-16">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        {/* Main Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-lg rounded-2xl border border-blue-200/50 p-8 shadow-xl">
              <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-black bg-clip-text text-transparent mb-2">
                  Customize Your Profile
                </h1>
                <p className="text-slate-600">
                  Create your perfect gaming and music profile
                </p>
              </div>
              
              {renderSection()}

              {/* Save & Publish Button */}
              <div className="mt-8 pt-6 border-t border-blue-200/50 flex justify-center">
                <Button
                  onClick={handleSaveAndPublish}
                  disabled={isSaving}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Save & Publish Profile
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="w-80 p-6 border-l border-blue-200/50 bg-gradient-to-b from-white/30 to-blue-50/30 backdrop-blur-sm">
          <ProfilePreview profileData={profileData} />
        </div>
      </div>
    </div>
  );
};

export default Index;
