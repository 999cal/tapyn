import { useState } from 'react';
import { ProfileData } from '@/pages/Index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListMusic, Plus, Trash2, Music, Clock } from 'lucide-react';

interface PlaylistSectionProps {
  profileData: ProfileData;
  updateProfileData: (updates: Partial<ProfileData>) => void;
}

export const PlaylistSection = ({ profileData, updateProfileData }: PlaylistSectionProps) => {
  const [newPlaylist, setNewPlaylist] = useState({
    name: '',
    description: '',
    coverImage: '',
    tracks: [] as Array<{ name: string; artist: string; duration: string }>
  });
  const [newTrack, setNewTrack] = useState({ name: '', artist: '', duration: '' });
  const [editingPlaylist, setEditingPlaylist] = useState<number | null>(null);

  const addPlaylist = () => {
    if (newPlaylist.name) {
      const playlist = {
        id: Date.now().toString(),
        ...newPlaylist
      };
      updateProfileData({ 
        playlists: [...profileData.playlists, playlist] 
      });
      setNewPlaylist({ name: '', description: '', coverImage: '', tracks: [] });
    }
  };

  const removePlaylist = (index: number) => {
    const updatedPlaylists = profileData.playlists.filter((_, i) => i !== index);
    updateProfileData({ playlists: updatedPlaylists });
  };

  const addTrackToPlaylist = (playlistIndex: number) => {
    if (newTrack.name && newTrack.artist) {
      const updatedPlaylists = [...profileData.playlists];
      updatedPlaylists[playlistIndex].tracks.push({ ...newTrack });
      updateProfileData({ playlists: updatedPlaylists });
      setNewTrack({ name: '', artist: '', duration: '' });
    }
  };

  const removeTrackFromPlaylist = (playlistIndex: number, trackIndex: number) => {
    const updatedPlaylists = [...profileData.playlists];
    updatedPlaylists[playlistIndex].tracks = updatedPlaylists[playlistIndex].tracks.filter((_, i) => i !== trackIndex);
    updateProfileData({ playlists: updatedPlaylists });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-black rounded-lg flex items-center justify-center">
          <ListMusic className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-black bg-clip-text text-transparent">
            Music Playlists
          </h2>
          <p className="text-slate-600">Create and showcase your favorite playlists</p>
        </div>
      </div>

      {/* Create New Playlist */}
      <Card className="border-blue-200/50 bg-gradient-to-br from-white/80 to-blue-50/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Plus className="w-5 h-5" />
            Create New Playlist
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-700">Playlist Name</Label>
              <Input
                value={newPlaylist.name}
                onChange={(e) => setNewPlaylist(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter playlist name"
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
            <div>
              <Label className="text-slate-700">Cover Image URL</Label>
              <Input
                value={newPlaylist.coverImage}
                onChange={(e) => setNewPlaylist(prev => ({ ...prev, coverImage: e.target.value }))}
                placeholder="Enter cover image URL"
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
          </div>
          <div>
            <Label className="text-slate-700">Description</Label>
            <Textarea
              value={newPlaylist.description}
              onChange={(e) => setNewPlaylist(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your playlist"
              className="border-blue-200 focus:border-blue-400"
            />
          </div>
          <Button 
            onClick={addPlaylist}
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Playlist
          </Button>
        </CardContent>
      </Card>

      {/* Existing Playlists */}
      <div className="space-y-6">
        {profileData.playlists.map((playlist, playlistIndex) => (
          <Card key={playlist.id} className="border-blue-200/50 bg-gradient-to-br from-white/80 to-blue-50/80">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {playlist.coverImage && (
                    <img src={playlist.coverImage} alt={playlist.name} className="w-12 h-12 rounded object-cover" />
                  )}
                  <div>
                    <CardTitle className="text-blue-700">{playlist.name}</CardTitle>
                    <p className="text-sm text-slate-600">{playlist.description}</p>
                    <p className="text-xs text-slate-500">{playlist.tracks.length} tracks</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingPlaylist(editingPlaylist === playlistIndex ? null : playlistIndex)}
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    {editingPlaylist === playlistIndex ? 'Done' : 'Edit'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePlaylist(playlistIndex)}
                    className="text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {editingPlaylist === playlistIndex && (
                <div className="space-y-4 mb-4 p-4 bg-blue-50/50 rounded-lg border border-blue-200/50">
                  <h4 className="font-medium text-slate-700">Add Track</h4>
                  <div className="grid grid-cols-3 gap-3">
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
                    <Input
                      value={newTrack.duration}
                      onChange={(e) => setNewTrack(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="Duration (e.g., 3:45)"
                      className="border-blue-200 focus:border-blue-400"
                    />
                  </div>
                  <Button 
                    onClick={() => addTrackToPlaylist(playlistIndex)}
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Track
                  </Button>
                </div>
              )}

              <div className="space-y-2">
                {playlist.tracks.map((track, trackIndex) => (
                  <div key={trackIndex} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-lg border border-slate-200/50">
                    <div className="flex items-center gap-3">
                      <Music className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="font-medium text-slate-800">{track.name}</p>
                        <p className="text-sm text-slate-600">{track.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        {track.duration}
                      </div>
                      {editingPlaylist === playlistIndex && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTrackFromPlaylist(playlistIndex, trackIndex)}
                          className="text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
