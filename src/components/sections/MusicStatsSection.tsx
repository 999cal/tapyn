
import { useState } from 'react';
import { ProfileData } from '@/pages/Index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, Plus, Trash2, Play, Pause } from 'lucide-react';

interface MusicStatsSectionProps {
  profileData: ProfileData;
  updateProfileData: (updates: Partial<ProfileData>) => void;
}

export const MusicStatsSection = ({ profileData, updateProfileData }: MusicStatsSectionProps) => {
  const [newArtist, setNewArtist] = useState({ name: '', plays: 0, image: '' });
  const [newTrack, setNewTrack] = useState({ name: '', artist: '', plays: 0, image: '' });
  const [newGenre, setNewGenre] = useState({ name: '', percentage: 0 });
  const [currentlyPlaying, setCurrentlyPlaying] = useState({
    name: profileData.musicStats.currentlyPlaying?.name || '',
    artist: profileData.musicStats.currentlyPlaying?.artist || '',
    image: profileData.musicStats.currentlyPlaying?.image || ''
  });

  const addArtist = () => {
    if (newArtist.name) {
      const updatedStats = {
        ...profileData.musicStats,
        topArtists: [...profileData.musicStats.topArtists, { ...newArtist }]
      };
      updateProfileData({ musicStats: updatedStats });
      setNewArtist({ name: '', plays: 0, image: '' });
    }
  };

  const removeArtist = (index: number) => {
    const updatedStats = {
      ...profileData.musicStats,
      topArtists: profileData.musicStats.topArtists.filter((_, i) => i !== index)
    };
    updateProfileData({ musicStats: updatedStats });
  };

  const addTrack = () => {
    if (newTrack.name && newTrack.artist) {
      const updatedStats = {
        ...profileData.musicStats,
        topTracks: [...profileData.musicStats.topTracks, { ...newTrack }]
      };
      updateProfileData({ musicStats: updatedStats });
      setNewTrack({ name: '', artist: '', plays: 0, image: '' });
    }
  };

  const removeTrack = (index: number) => {
    const updatedStats = {
      ...profileData.musicStats,
      topTracks: profileData.musicStats.topTracks.filter((_, i) => i !== index)
    };
    updateProfileData({ musicStats: updatedStats });
  };

  const addGenre = () => {
    if (newGenre.name) {
      const updatedStats = {
        ...profileData.musicStats,
        topGenres: [...profileData.musicStats.topGenres, { ...newGenre }]
      };
      updateProfileData({ musicStats: updatedStats });
      setNewGenre({ name: '', percentage: 0 });
    }
  };

  const removeGenre = (index: number) => {
    const updatedStats = {
      ...profileData.musicStats,
      topGenres: profileData.musicStats.topGenres.filter((_, i) => i !== index)
    };
    updateProfileData({ musicStats: updatedStats });
  };

  const updateCurrentlyPlaying = () => {
    const updatedStats = {
      ...profileData.musicStats,
      currentlyPlaying: currentlyPlaying.name ? currentlyPlaying : undefined
    };
    updateProfileData({ musicStats: updatedStats });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-black rounded-lg flex items-center justify-center">
          <Music className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-black bg-clip-text text-transparent">
            Music Statistics
          </h2>
          <p className="text-slate-600">Showcase your music taste and listening habits</p>
        </div>
      </div>

      {/* Currently Playing */}
      <Card className="border-blue-200/50 bg-gradient-to-br from-white/80 to-blue-50/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Play className="w-5 h-5" />
            Currently Playing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-700">Track Name</Label>
              <Input
                value={currentlyPlaying.name}
                onChange={(e) => setCurrentlyPlaying(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter track name"
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
            <div>
              <Label className="text-slate-700">Artist</Label>
              <Input
                value={currentlyPlaying.artist}
                onChange={(e) => setCurrentlyPlaying(prev => ({ ...prev, artist: e.target.value }))}
                placeholder="Enter artist name"
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
          </div>
          <div>
            <Label className="text-slate-700">Cover Image URL</Label>
            <Input
              value={currentlyPlaying.image}
              onChange={(e) => setCurrentlyPlaying(prev => ({ ...prev, image: e.target.value }))}
              placeholder="Enter image URL"
              className="border-blue-200 focus:border-blue-400"
            />
          </div>
          <Button 
            onClick={updateCurrentlyPlaying}
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
          >
            Update Currently Playing
          </Button>
        </CardContent>
      </Card>

      {/* Top Artists */}
      <Card className="border-blue-200/50 bg-gradient-to-br from-white/80 to-blue-50/80">
        <CardHeader>
          <CardTitle className="text-blue-700">Top Artists</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Input
              value={newArtist.name}
              onChange={(e) => setNewArtist(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Artist name"
              className="border-blue-200 focus:border-blue-400"
            />
            <Input
              type="number"
              value={newArtist.plays}
              onChange={(e) => setNewArtist(prev => ({ ...prev, plays: parseInt(e.target.value) || 0 }))}
              placeholder="Play count"
              className="border-blue-200 focus:border-blue-400"
            />
            <Input
              value={newArtist.image}
              onChange={(e) => setNewArtist(prev => ({ ...prev, image: e.target.value }))}
              placeholder="Image URL"
              className="border-blue-200 focus:border-blue-400"
            />
          </div>
          <Button 
            onClick={addArtist}
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Artist
          </Button>
          
          <div className="space-y-2">
            {profileData.musicStats.topArtists.map((artist, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg border border-blue-200/50">
                <div className="flex items-center gap-3">
                  {artist.image && (
                    <img src={artist.image} alt={artist.name} className="w-10 h-10 rounded-full object-cover" />
                  )}
                  <div>
                    <p className="font-medium text-slate-800">{artist.name}</p>
                    <p className="text-sm text-slate-600">{artist.plays} plays</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeArtist(index)}
                  className="text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Tracks */}
      <Card className="border-blue-200/50 bg-gradient-to-br from-white/80 to-blue-50/80">
        <CardHeader>
          <CardTitle className="text-blue-700">Top Tracks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              value={newTrack.name}
              onChange={(e) => setNewTrack(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Track name"
              className="border-blue-200 focus:border-blue-400"
            />
            <Input
              value={newTrack.artist}
              onChange={(e) => setNewTrack(prev => ({ ...prev, artist: e.target.value }))}
              placeholder="Artist name"
              className="border-blue-200 focus:border-blue-400"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              value={newTrack.plays}
              onChange={(e) => setNewTrack(prev => ({ ...prev, plays: parseInt(e.target.value) || 0 }))}
              placeholder="Play count"
              className="border-blue-200 focus:border-blue-400"
            />
            <Input
              value={newTrack.image}
              onChange={(e) => setNewTrack(prev => ({ ...prev, image: e.target.value }))}
              placeholder="Cover image URL"
              className="border-blue-200 focus:border-blue-400"
            />
          </div>
          <Button 
            onClick={addTrack}
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Track
          </Button>
          
          <div className="space-y-2">
            {profileData.musicStats.topTracks.map((track, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg border border-blue-200/50">
                <div className="flex items-center gap-3">
                  {track.image && (
                    <img src={track.image} alt={track.name} className="w-10 h-10 rounded object-cover" />
                  )}
                  <div>
                    <p className="font-medium text-slate-800">{track.name}</p>
                    <p className="text-sm text-slate-600">{track.artist} • {track.plays} plays</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTrack(index)}
                  className="text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Genres */}
      <Card className="border-blue-200/50 bg-gradient-to-br from-white/80 to-blue-50/80">
        <CardHeader>
          <CardTitle className="text-blue-700">Top Genres</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              value={newGenre.name}
              onChange={(e) => setNewGenre(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Genre name"
              className="border-blue-200 focus:border-blue-400"
            />
            <Input
              type="number"
              value={newGenre.percentage}
              onChange={(e) => setNewGenre(prev => ({ ...prev, percentage: parseInt(e.target.value) || 0 }))}
              placeholder="Percentage"
              min="0"
              max="100"
              className="border-blue-200 focus:border-blue-400"
            />
          </div>
          <Button 
            onClick={addGenre}
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Genre
          </Button>
          
          <div className="space-y-2">
            {profileData.musicStats.topGenres.map((genre, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg border border-blue-200/50">
                <div>
                  <p className="font-medium text-slate-800">{genre.name}</p>
                  <div className="w-32 h-2 bg-slate-200 rounded-full mt-1">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"
                      style={{ width: `${genre.percentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{genre.percentage}%</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeGenre(index)}
                  className="text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
