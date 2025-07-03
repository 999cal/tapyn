
import { ProfileData } from '@/pages/Index';
import { cn } from '@/lib/utils';

interface FontsSectionProps {
  profileData: ProfileData;
  updateProfileData: (updates: Partial<ProfileData>) => void;
}

const fontOptions = [
  {
    id: 'modern',
    name: 'Modern Sans',
    description: 'Clean and contemporary',
    className: 'font-sans',
    preview: 'The quick brown fox jumps'
  },
  {
    id: 'elegant',
    name: 'Elegant Serif',
    description: 'Classic and sophisticated',
    className: 'font-serif',
    preview: 'The quick brown fox jumps'
  },
  {
    id: 'playful',
    name: 'Playful Mono',
    description: 'Fun and technical',
    className: 'font-mono',
    preview: 'The quick brown fox jumps'
  },
  {
    id: 'bold',
    name: 'Bold Display',
    description: 'Strong and impactful',
    className: 'font-black',
    preview: 'The quick brown fox jumps'
  },
];

export const FontsSection = ({ profileData, updateProfileData }: FontsSectionProps) => {
  const selectFont = (fontId: string) => {
    updateProfileData({ fontStyle: fontId });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Typography Style</h3>
        <p className="text-purple-200/80 mb-6">
          Choose a font style that reflects your personality. This will affect all text on your profile.
        </p>
      </div>

      {/* Font Selection */}
      <div className="space-y-4">
        {fontOptions.map((font) => {
          const isSelected = profileData.fontStyle === font.id;
          
          return (
            <button
              key={font.id}
              onClick={() => selectFont(font.id)}
              className={cn(
                "w-full p-6 rounded-xl border transition-all duration-300 text-left group",
                isSelected
                  ? "border-purple-400 bg-purple-400/20 shadow-lg shadow-purple-500/25"
                  : "border-purple-500/30 hover:border-purple-400/50 hover:bg-purple-400/10"
              )}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={cn("text-white font-medium text-lg", font.className)}>
                      {font.name}
                    </h4>
                    <p className="text-purple-200/60 text-sm">{font.description}</p>
                  </div>
                  {isSelected && (
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  )}
                </div>
                
                <div className="pt-3 border-t border-purple-500/20">
                  <p className={cn(
                    "text-purple-100 text-xl transition-all duration-300",
                    font.className,
                    isSelected ? "text-white" : "group-hover:text-white"
                  )}>
                    {font.preview}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Current Font Preview */}
      <div>
        <h4 className="text-lg font-medium text-white mb-4">Live Preview</h4>
        <div className="bg-black/30 rounded-xl p-6 border border-purple-500/30">
          <div className={cn(
            "space-y-4 text-center",
            fontOptions.find(f => f.id === profileData.fontStyle)?.className
          )}>
            <h3 className="text-2xl font-bold text-white">Your Name</h3>
            <p className="text-purple-200">Digital Creator & Innovator</p>
            <div className="text-sm text-purple-200/80">
              This is how your profile text will look with the selected font style.
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-purple-600/20 rounded-xl p-6 border border-purple-500/30">
        <h5 className="text-white font-medium mb-3">✨ Font Selection Tips</h5>
        <ul className="space-y-2 text-purple-200/80 text-sm">
          <li>• <strong>Modern Sans:</strong> Great for tech, business, or minimalist profiles</li>
          <li>• <strong>Elegant Serif:</strong> Perfect for creative, academic, or professional profiles</li>
          <li>• <strong>Playful Mono:</strong> Ideal for developers, gamers, or tech enthusiasts</li>
          <li>• <strong>Bold Display:</strong> Best for artists, influencers, or bold personalities</li>
        </ul>
      </div>
    </div>
  );
};
