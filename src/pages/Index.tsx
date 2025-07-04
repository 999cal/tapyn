
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
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

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
    socialLinks: []
  });

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
        socialLinks: profile.social_links || []
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

    if (Object.keys(dbUpdates).length > 0) {
      await updateProfile(dbUpdates);
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
      default:
        return <ProfilePictureSection profileData={profileData} updateProfileData={updateProfileData} />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Profile Studio</h1>
          <p className="text-purple-200/80 mb-8">Please sign in to create your profile</p>
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 flex font-${profileData.fontStyle}`}>
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div className="flex-1 flex">
        {/* Main Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8 shadow-2xl">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Customize Your Profile
                  </h1>
                  <p className="text-purple-200/80">
                    Personalize your digital identity with style
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  {profile?.username && (
                    <div className="text-right">
                      <p className="text-white text-sm">Your profile:</p>
                      <p className="text-purple-400 font-medium">
                        tapyn.netlify.app/{profile.username}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 text-purple-200">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      size="sm"
                      className="border-purple-400/30 text-purple-200 hover:bg-purple-500/20"
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {renderSection()}
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="w-80 p-6 border-l border-purple-500/20">
          <ProfilePreview profileData={profileData} />
        </div>
      </div>
    </div>
  );
};

export default Index;
