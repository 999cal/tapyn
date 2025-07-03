import { useState } from 'react';
import { Plus, Trash2, ExternalLink, Instagram, Youtube, Twitter } from 'lucide-react';
import { ProfileData } from '@/pages/Index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SocialLinksSectionProps {
  profileData: ProfileData;
  updateProfileData: (updates: Partial<ProfileData>) => void;
}

const platformOptions = [
  { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: 'from-blue-500 to-blue-600' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600' },
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'from-red-500 to-red-600' },
  { id: 'tiktok', name: 'TikTok', icon: ExternalLink, color: 'from-black to-gray-800' },
  { id: 'discord', name: 'Discord', icon: ExternalLink, color: 'from-indigo-500 to-purple-600' },
  { id: 'twitch', name: 'Twitch', icon: ExternalLink, color: 'from-purple-500 to-purple-700' },
  { id: 'linkedin', name: 'LinkedIn', icon: ExternalLink, color: 'from-blue-600 to-blue-700' },
  { id: 'github', name: 'GitHub', icon: ExternalLink, color: 'from-gray-700 to-black' },
  { id: 'website', name: 'Website', icon: ExternalLink, color: 'from-green-500 to-green-600' },
  { id: 'other', name: 'Other', icon: ExternalLink, color: 'from-gray-500 to-gray-600' },
];

export const SocialLinksSection = ({ profileData, updateProfileData }: SocialLinksSectionProps) => {
  const [newLink, setNewLink] = useState({
    platform: 'twitter',
    url: '',
    label: ''
  });

  const addSocialLink = () => {
    if (newLink.url.trim() && newLink.label.trim()) {
      const link = {
        id: Date.now().toString(),
        platform: newLink.platform,
        url: newLink.url.trim(),
        label: newLink.label.trim()
      };
      
      updateProfileData({
        socialLinks: [...profileData.socialLinks, link]
      });
      
      setNewLink({ platform: 'twitter', url: '', label: '' });
    }
  };

  const removeSocialLink = (linkId: string) => {
    updateProfileData({
      socialLinks: profileData.socialLinks.filter(link => link.id !== linkId)
    });
  };

  const updateSocialLink = (linkId: string, updates: Partial<typeof newLink>) => {
    updateProfileData({
      socialLinks: profileData.socialLinks.map(link =>
        link.id === linkId ? { ...link, ...updates } : link
      )
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Social Media Links</h3>
        <p className="text-purple-200/80 mb-6">
          Connect all your social profiles in one place. Visitors can easily find and follow you across platforms.
        </p>
      </div>

      {/* Add New Link */}
      <div>
        <h4 className="text-lg font-medium text-white mb-4">Add New Link</h4>
        <div className="bg-black/30 rounded-xl p-6 border border-purple-500/30 space-y-4">
          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-3">Platform</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {platformOptions.map((platform) => {
                const Icon = platform.icon;
                const isSelected = newLink.platform === platform.id;
                
                return (
                  <button
                    key={platform.id}
                    onClick={() => setNewLink({ ...newLink, platform: platform.id })}
                    className={cn(
                      "p-3 rounded-lg border transition-all duration-300 text-center",
                      isSelected
                        ? "border-purple-400 bg-purple-400/20"
                        : "border-purple-500/30 hover:border-purple-400/50 hover:bg-purple-400/10"
                    )}
                  >
                    <Icon className="w-5 h-5 mx-auto mb-1 text-purple-300" />
                    <div className="text-xs text-white">{platform.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* URL and Label Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">URL</label>
              <Input
                type="url"
                placeholder="https://..."
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                className="bg-black/50 border-purple-500/30 text-white placeholder:text-purple-200/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">Display Label</label>
              <Input
                type="text"
                placeholder="Follow me on..."
                value={newLink.label}
                onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                className="bg-black/50 border-purple-500/30 text-white placeholder:text-purple-200/50"
              />
            </div>
          </div>

          <Button
            onClick={addSocialLink}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={!newLink.url.trim() || !newLink.label.trim()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Social Link
          </Button>
        </div>
      </div>

      {/* Existing Links */}
      {profileData.socialLinks.length > 0 && (
        <div>
          <h4 className="text-lg font-medium text-white mb-4">Your Social Links</h4>
          <div className="space-y-3">
            {profileData.socialLinks.map((link, index) => {
              const platform = platformOptions.find(p => p.id === link.platform);
              const Icon = platform?.icon || ExternalLink;
              
              return (
                <div
                  key={link.id}
                  className="bg-black/30 rounded-xl p-4 border border-purple-500/30 group hover:border-purple-400/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br",
                      platform?.color || 'from-gray-500 to-gray-600'
                    )}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium">{link.label}</span>
                        <ExternalLink className="w-3 h-3 text-purple-300" />
                      </div>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-200/70 text-sm hover:text-purple-200 transition-colors truncate block"
                      >
                        {link.url}
                      </a>
                    </div>
                    
                    <Button
                      onClick={() => removeSocialLink(link.id)}
                      variant="outline"
                      size="sm"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-purple-600/20 rounded-xl p-6 border border-purple-500/30">
        <h5 className="text-white font-medium mb-3">🔗 Link Best Practices</h5>
        <ul className="space-y-2 text-purple-200/80 text-sm">
          <li>• Use clear, action-oriented labels like "Follow on Instagram" or "Watch on YouTube"</li>
          <li>• Make sure all URLs are complete and working (include https://)</li>
          <li>• Order your most important social platforms first</li>
          <li>• Keep the list focused - too many links can overwhelm visitors</li>
          <li>• Test your links regularly to ensure they're still active</li>
        </ul>
      </div>
    </div>
  );
};
