import { ProfileData } from '@/pages/Index';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface BadgesSectionProps {
  profileData: ProfileData;
  updateProfileData: (updates: Partial<ProfileData>) => void;
}

const availableBadges = [
  { id: 'star', name: 'Star', emoji: '⭐', description: 'Show your achievements' },
  { id: 'crown', name: 'Crown', emoji: '👑', description: 'Display your leadership' },
  { id: 'fire', name: 'Fire', emoji: '🔥', description: 'Highlight your passion' },
  { id: 'diamond', name: 'Diamond', emoji: '💎', description: 'Premium member status' },
  { id: 'heart', name: 'Heart', emoji: '❤️', description: 'Show some love' },
  { id: 'lightning', name: 'Lightning', emoji: '⚡', description: 'High energy creator' },
  { id: 'trophy', name: 'Trophy', emoji: '🏆', description: 'Winner badge' },
  { id: 'rocket', name: 'Rocket', emoji: '🚀', description: 'Innovation leader' },
];

export const BadgesSection = ({ profileData, updateProfileData }: BadgesSectionProps) => {
  const toggleBadge = (badgeId: string) => {
    const currentBadges = profileData.badges;
    const isSelected = currentBadges.includes(badgeId);
    
    let newBadges;
    if (isSelected) {
      newBadges = currentBadges.filter(id => id !== badgeId);
    } else {
      if (currentBadges.length < 5) {
        newBadges = [...currentBadges, badgeId];
      } else {
        return; // Max 5 badges
      }
    }
    
    updateProfileData({ badges: newBadges });
  };

  const clearAllBadges = () => {
    updateProfileData({ badges: [] });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Achievement Badges</h3>
        <p className="text-purple-200/80 mb-6">
          Select up to 5 badges to showcase your achievements and personality. 
          They'll appear near your profile picture.
        </p>
      </div>

      {/* Badge Selection */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium text-white">
            Available Badges ({profileData.badges.length}/5)
          </h4>
          {profileData.badges.length > 0 && (
            <Button
              onClick={clearAllBadges}
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-400 hover:bg-red-500/20"
            >
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {availableBadges.map((badge) => {
            const isSelected = profileData.badges.includes(badge.id);
            const isDisabled = !isSelected && profileData.badges.length >= 5;
            
            return (
              <button
                key={badge.id}
                onClick={() => !isDisabled && toggleBadge(badge.id)}
                disabled={isDisabled}
                className={cn(
                  "p-4 rounded-xl border transition-all duration-300 text-center group",
                  isSelected
                    ? "border-purple-400 bg-purple-400/20 shadow-lg shadow-purple-500/25"
                    : isDisabled
                    ? "border-gray-600/30 bg-gray-600/10 cursor-not-allowed opacity-50"
                    : "border-purple-500/30 hover:border-purple-400/50 hover:bg-purple-400/10 cursor-pointer"
                )}
              >
                <div className="space-y-3">
                  <div className={cn(
                    "text-3xl transition-transform duration-300",
                    isSelected ? "scale-110" : "group-hover:scale-105"
                  )}>
                    {badge.emoji}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{badge.name}</div>
                    <div className="text-purple-200/60 text-xs mt-1">{badge.description}</div>
                  </div>
                  {isSelected && (
                    <div className="w-2 h-2 bg-purple-400 rounded-full mx-auto animate-pulse"></div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Badges Preview */}
      {profileData.badges.length > 0 && (
        <div>
          <h4 className="text-lg font-medium text-white mb-4">Selected Badges</h4>
          <div className="bg-black/30 rounded-xl p-6 border border-purple-500/30">
            <div className="flex flex-wrap gap-3 justify-center">
              {profileData.badges.map((badgeId) => {
                const badge = availableBadges.find(b => b.id === badgeId);
                return badge ? (
                  <div
                    key={badgeId}
                    className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-lg border border-purple-400/30"
                  >
                    <span className="text-lg">{badge.emoji}</span>
                    <span className="text-white text-sm font-medium">{badge.name}</span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-purple-600/20 rounded-xl p-6 border border-purple-500/30">
        <h5 className="text-white font-medium mb-3">🏅 Badge Tips</h5>
        <ul className="space-y-2 text-purple-200/80 text-sm">
          <li>• Choose badges that represent your achievements or interests</li>
          <li>• Mix different types for a diverse showcase</li>
          <li>• Update your badges regularly to reflect your growth</li>
          <li>• Badges appear in the order you select them</li>
        </ul>
      </div>
    </div>
  );
};
