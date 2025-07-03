
import { useState } from 'react';
import { Upload, Music, Link as LinkIcon, Volume2 } from 'lucide-react';
import { ProfileData } from '@/pages/Index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface BackgroundMusicSectionProps {
  profileData: ProfileData;
  updateProfileData: (updates: Partial<ProfileData>) => void;
}

export const BackgroundMusicSection = ({ profileData, updateProfileData }: BackgroundMusicSectionProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

  const handleFileUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    updateProfileData({ backgroundMusic: url });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('audio/')) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleUrlSubmit = () => {
    if (audioUrl.trim()) {
      updateProfileData({ backgroundMusic: audioUrl.trim() });
      setAudioUrl('');
    }
  };

  const removeMusic = () => {
    updateProfileData({ backgroundMusic: null });
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Background Music</h3>
        <p className="text-purple-200/80 mb-6">
          Add background music to create an immersive experience for your visitors.
        </p>
        
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
              <Music className="w-8 h-8 text-white" />
            </div>
            
            <div>
              <p className="text-white font-medium mb-2">
                Drag & drop your audio file here, or click to browse
              </p>
              <p className="text-purple-200/60 text-sm">
                Supports MP3, WAV, OGG up to 20MB
              </p>
            </div>

            <label htmlFor="audio-upload">
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <span className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Audio
                </span>
              </Button>
            </label>
            
            <input
              id="audio-upload"
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileInput}
            />
          </div>
        </div>
      </div>

      {/* URL Input */}
      <div>
        <h4 className="text-lg font-medium text-white mb-4">Or Use Audio URL</h4>
        <div className="flex gap-3">
          <Input
            type="url"
            placeholder="Enter audio URL (MP3, WAV, OGG)"
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
            className="flex-1 bg-black/30 border-purple-500/30 text-white placeholder:text-purple-200/50"
          />
          <Button
            onClick={handleUrlSubmit}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <LinkIcon className="w-4 h-4 mr-2" />
            Add URL
          </Button>
        </div>
      </div>

      {/* Current Audio Preview */}
      {profileData.backgroundMusic && (
        <div>
          <h4 className="text-lg font-medium text-white mb-4">Current Background Music</h4>
          <div className="space-y-4">
            <div className="bg-black/50 rounded-xl p-6 border border-purple-500/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Volume2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <audio
                    src={profileData.backgroundMusic}
                    controls
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={removeMusic}
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/20"
              >
                Remove Music
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-purple-600/20 rounded-xl p-6 border border-purple-500/30">
        <h5 className="text-white font-medium mb-3">🎵 Music Guidelines</h5>
        <ul className="space-y-2 text-purple-200/80 text-sm">
          <li>• Choose music that matches your personality or brand</li>
          <li>• Keep volume levels moderate to avoid overwhelming visitors</li>
          <li>• Use royalty-free music to avoid copyright issues</li>
          <li>• Consider instrumental tracks for better focus on content</li>
          <li>• Music will loop automatically and can be controlled by visitors</li>
        </ul>
      </div>
    </div>
  );
};
