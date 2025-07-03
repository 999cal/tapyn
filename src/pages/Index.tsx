
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ProfilePreview } from '@/components/ProfilePreview';
import { ProfilePictureSection } from '@/components/sections/ProfilePictureSection';
import { BackgroundVideoSection } from '@/components/sections/BackgroundVideoSection';
import { BackgroundMusicSection } from '@/components/sections/BackgroundMusicSection';
import { BadgesSection } from '@/components/sections/BadgesSection';
import { FontsSection } from '@/components/sections/FontsSection';
import { SpecialEffectsSection } from '@/components/sections/SpecialEffectsSection';
import { SocialLinksSection } from '@/components/sections/SocialLinksSection';

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

  const updateProfileData = (updates: Partial<ProfileData>) => {
    setProfileData(prev => ({ ...prev, ...updates }));
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

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 flex font-${profileData.fontStyle}`}>
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div className="flex-1 flex">
        {/* Main Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8 shadow-2xl">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Customize Your Profile
                </h1>
                <p className="text-purple-200/80">
                  Personalize your digital identity with style
                </p>
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
