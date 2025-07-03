
import { ProfileData } from '@/pages/Index';
import { cn } from '@/lib/utils';
import { Sparkles, Zap, Heart, Star } from 'lucide-react';

interface SpecialEffectsSectionProps {
  profileData: ProfileData;
  updateProfileData: (updates: Partial<ProfileData>) => void;
}

const effectOptions = [
  {
    id: 'particles',
    name: 'Floating Particles',
    description: 'Subtle animated particles in the background',
    icon: Sparkles,
    preview: 'Animated dots that float around your profile'
  },
  {
    id: 'glow-pulse',
    name: 'Glow Pulse',
    description: 'Gentle pulsing glow effect on profile picture',
    icon: Zap,
    preview: 'Your profile picture will have a rhythmic glow'
  },
  {
    id: 'rainbow-border',
    name: 'Rainbow Border',
    description: 'Animated rainbow border around profile',
    icon: Heart,
    preview: 'Colorful animated border around your profile area'
  },
  {
    id: 'star-trail',
    name: 'Star Trail',
    description: 'Shooting stars across the background',
    icon: Star,
    preview: 'Occasional shooting stars in your background'
  },
];

export const SpecialEffectsSection = ({ profileData, updateProfileData }: SpecialEffectsSectionProps) => {
  const toggleEffect = (effectId: string) => {
    const currentEffects = profileData.specialEffects;
    const isActive = currentEffects.includes(effectId);
    
    let newEffects;
    if (isActive) {
      newEffects = currentEffects.filter(id => id !== effectId);
    } else {
      newEffects = [...currentEffects, effectId];
    }
    
    updateProfileData({ specialEffects: newEffects });
  };

  const clearAllEffects = () => {
    updateProfileData({ specialEffects: [] });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Special Visual Effects</h3>
        <p className="text-purple-200/80 mb-6">
          Add visual flair to your profile with special effects. Mix and match to create your unique style.
        </p>
      </div>

      {/* Effects Selection */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-medium text-white">
            Available Effects ({profileData.specialEffects.length} active)
          </h4>
          {profileData.specialEffects.length > 0 && (
            <button
              onClick={clearAllEffects}
              className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg border border-red-500/30 transition-all duration-300 text-sm"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="space-y-4">
          {effectOptions.map((effect) => {
            const isActive = profileData.specialEffects.includes(effect.id);
            const Icon = effect.icon;
            
            return (
              <button
                key={effect.id}
                onClick={() => toggleEffect(effect.id)}
                className={cn(
                  "w-full p-6 rounded-xl border transition-all duration-300 text-left group",
                  isActive
                    ? "border-purple-400 bg-purple-400/20 shadow-lg shadow-purple-500/25"
                    : "border-purple-500/30 hover:border-purple-400/50 hover:bg-purple-400/10"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30"
                      : "bg-purple-600/30 group-hover:bg-purple-600/50"
                  )}>
                    <Icon className={cn(
                      "w-6 h-6 transition-all duration-300",
                      isActive ? "text-white" : "text-purple-300"
                    )} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-white font-medium">{effect.name}</h5>
                      {isActive && (
                        <div className="px-2 py-1 bg-purple-500/30 rounded-full text-xs text-purple-200 border border-purple-400/30">
                          Active
                        </div>
                      )}
                    </div>
                    <p className="text-purple-200/70 text-sm mb-2">{effect.description}</p>
                    <p className="text-purple-200/50 text-xs italic">{effect.preview}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Effects Preview */}
      {profileData.specialEffects.length > 0 && (
        <div>
          <h4 className="text-lg font-medium text-white mb-4">Active Effects</h4>
          <div className="bg-black/30 rounded-xl p-6 border border-purple-500/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileData.specialEffects.map((effectId) => {
                const effect = effectOptions.find(e => e.id === effectId);
                if (!effect) return null;
                
                const Icon = effect.icon;
                return (
                  <div
                    key={effectId}
                    className="flex items-center gap-3 p-3 bg-purple-600/20 rounded-lg border border-purple-400/30"
                  >
                    <Icon className="w-5 h-5 text-purple-300" />
                    <span className="text-white text-sm font-medium">{effect.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Performance Note */}
      <div className="bg-yellow-600/20 rounded-xl p-6 border border-yellow-500/30">
        <h5 className="text-yellow-200 font-medium mb-3">⚡ Performance Note</h5>
        <p className="text-yellow-200/80 text-sm">
          Special effects add visual appeal but may impact performance on slower devices. 
          Consider using 1-2 effects for the best balance of style and performance.
        </p>
      </div>

      {/* Tips */}
      <div className="bg-purple-600/20 rounded-xl p-6 border border-purple-500/30">
        <h5 className="text-white font-medium mb-3">✨ Effect Combinations</h5>
        <ul className="space-y-2 text-purple-200/80 text-sm">
          <li>• <strong>Subtle:</strong> Just "Floating Particles" for a minimal touch</li>
          <li>• <strong>Energetic:</strong> "Glow Pulse" + "Star Trail" for dynamic profiles</li>
          <li>• <strong>Vibrant:</strong> "Rainbow Border" + "Floating Particles" for colorful flair</li>
          <li>• <strong>Maximum Impact:</strong> All effects for the most dramatic presentation</li>
        </ul>
      </div>
    </div>
  );
};
