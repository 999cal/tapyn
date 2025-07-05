
import { User, Video, Music, Award, Type, Sparkles, Link, BarChart3, ListMusic } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const navigationItems = [
  { id: 'profile-picture', label: 'Profile Picture', icon: User },
  { id: 'background-video', label: 'Background Video', icon: Video },
  { id: 'background-music', label: 'Background Music', icon: Music },
  { id: 'badges', label: 'Badges', icon: Award },
  { id: 'fonts', label: 'Fonts', icon: Type },
  { id: 'special-effects', label: 'Special Effects', icon: Sparkles },
  { id: 'social-links', label: 'Social Links', icon: Link },
  { id: 'music-stats', label: 'Music Stats', icon: BarChart3 },
  { id: 'playlists', label: 'Playlists', icon: ListMusic },
];

export const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  return (
    <div className="w-64 bg-gradient-to-b from-slate-900/80 to-black/80 backdrop-blur-lg border-r border-blue-500/30 p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">
          Profile Studio
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></div>
      </div>

      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left group",
                isActive
                  ? "bg-gradient-to-r from-blue-600/50 to-blue-800/30 text-blue-100 shadow-lg shadow-blue-500/25 border border-blue-500/40"
                  : "text-slate-400 hover:text-blue-200 hover:bg-gradient-to-r hover:from-blue-900/30 hover:to-slate-800/30 hover:shadow-lg hover:shadow-blue-500/10"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 transition-all duration-300",
                isActive 
                  ? "text-blue-300 drop-shadow-sm" 
                  : "group-hover:text-blue-400 group-hover:drop-shadow-sm"
              )} />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 p-4 bg-gradient-to-br from-blue-900/20 to-slate-800/20 rounded-xl border border-blue-500/30 backdrop-blur-sm">
        <p className="text-xs text-slate-400 text-center">
          Create your perfect digital identity
        </p>
      </div>
    </div>
  );
};
