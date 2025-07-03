
import { useState } from 'react';
import { Upload, Image } from 'lucide-react';
import { ProfileData } from '@/pages/Index';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProfilePictureSectionProps {
  profileData: ProfileData;
  updateProfileData: (updates: Partial<ProfileData>) => void;
}

const effects = [
  { id: 'glow', name: 'Purple Glow', preview: 'ring-4 ring-purple-400/50 shadow-lg shadow-purple-500/50' },
  { id: 'rainbow', name: 'Rainbow', preview: 'ring-4 ring-gradient-to-r from-red-400 to-purple-400 animate-pulse' },
  { id: 'neon', name: 'Neon Cyan', preview: 'ring-4 ring-cyan-400/60 shadow-lg shadow-cyan-500/50' },
  { id: 'fire', name: 'Fire', preview: 'ring-4 ring-orange-400/60 shadow-lg shadow-orange-500/50' },
];

export const ProfilePictureSection = ({ profileData, updateProfileData }: ProfilePictureSectionProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      updateProfileData({ profilePicture: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Upload Profile Picture</h3>
        
        <div
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300",
            dragActive 
              ? "border-purple-400 bg-purple-400/10" 
              : "border-purple-500/30 hover:border-purple-400/50 hover:bg-purple-400/5"
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>
            
            <div>
              <p className="text-white font-medium mb-2">
                Drag & drop your image here, or click to browse
              </p>
              <p className="text-purple-200/60 text-sm">
                Supports PNG, JPG, GIF up to 10MB
              </p>
            </div>

            <label htmlFor="profile-upload">
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <span className="cursor-pointer">
                  <Image className="w-4 h-4 mr-2" />
                  Choose File
                </span>
              </Button>
            </label>
            
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInput}
            />
          </div>
        </div>
      </div>

      {/* Current Image Preview */}
      {profileData.profilePicture && (
        <div>
          <h4 className="text-lg font-medium text-white mb-4">Current Image</h4>
          <div className="flex justify-center">
            <div className={cn(
              "w-32 h-32 rounded-full overflow-hidden transition-all duration-300",
              effects.find(e => e.id === profileData.profileEffect)?.preview
            )}>
              <img 
                src={profileData.profilePicture} 
                alt="Profile Preview" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Effect Selection */}
      <div>
        <h4 className="text-lg font-medium text-white mb-4">Choose Effect</h4>
        <div className="grid grid-cols-2 gap-4">
          {effects.map((effect) => (
            <button
              key={effect.id}
              onClick={() => updateProfileData({ profileEffect: effect.id })}
              className={cn(
                "p-4 rounded-xl border transition-all duration-300 text-left",
                profileData.profileEffect === effect.id
                  ? "border-purple-400 bg-purple-400/20 shadow-lg shadow-purple-500/25"
                  : "border-purple-500/30 hover:border-purple-400/50 hover:bg-purple-400/10"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500",
                  effect.preview
                )}></div>
                <span className="text-white font-medium">{effect.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
