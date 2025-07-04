
import { useState } from 'react';
import { Upload, Video, Link as LinkIcon } from 'lucide-react';
import { ProfileData } from '@/pages/Index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { uploadFile } from '@/utils/fileUpload';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface BackgroundVideoSectionProps {
  profileData: ProfileData;
  updateProfileData: (updates: Partial<ProfileData>) => void;
}

export const BackgroundVideoSection = ({ profileData, updateProfileData }: BackgroundVideoSectionProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please log in to upload files",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const url = await uploadFile(file, 'background-videos', user.id);
      if (url) {
        updateProfileData({ backgroundVideo: url });
        toast({
          title: "Success",
          description: "Background video uploaded successfully",
        });
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload background video",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('video/')) {
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
    if (videoUrl.trim()) {
      updateProfileData({ backgroundVideo: videoUrl.trim() });
      setVideoUrl('');
    }
  };

  const removeVideo = () => {
    updateProfileData({ backgroundVideo: null });
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Background Video</h3>
        <p className="text-purple-200/80 mb-6">
          Add a background video to make your profile dynamic and engaging.
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
              <Video className="w-8 h-8 text-white" />
            </div>
            
            <div>
              <p className="text-white font-medium mb-2">
                {uploading ? 'Uploading...' : 'Drag & drop your video here, or click to browse'}
              </p>
              <p className="text-purple-200/60 text-sm">
                Supports MP4, WebM up to 50MB
              </p>
            </div>

            <label htmlFor="video-upload">
              <Button
                asChild
                disabled={uploading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <span className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Choose Video'}
                </span>
              </Button>
            </label>
            
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileInput}
              disabled={uploading}
            />
          </div>
        </div>
      </div>

      {/* URL Input */}
      <div>
        <h4 className="text-lg font-medium text-white mb-4">Or Use Video URL</h4>
        <div className="flex gap-3">
          <Input
            type="url"
            placeholder="Enter video URL (MP4, WebM)"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
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

      {/* Current Video Preview */}
      {profileData.backgroundVideo && (
        <div>
          <h4 className="text-lg font-medium text-white mb-4">Current Background Video</h4>
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden bg-black/50 aspect-video">
              <video
                src={profileData.backgroundVideo}
                className="w-full h-full object-cover"
                controls
                muted
              />
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={removeVideo}
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/20"
              >
                Remove Video
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-purple-600/20 rounded-xl p-6 border border-purple-500/30">
        <h5 className="text-white font-medium mb-3">💡 Tips for Best Results</h5>
        <ul className="space-y-2 text-purple-200/80 text-sm">
          <li>• Use short, looping videos (5-30 seconds) for best performance</li>
          <li>• Keep file sizes under 50MB for faster loading</li>
          <li>• Videos will play muted and loop automatically</li>
          <li>• Consider using subtle, ambient videos that won't distract from content</li>
        </ul>
      </div>
    </div>
  );
};
