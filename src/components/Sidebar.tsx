
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
    <div className="w-64 bg-gradient-to-b from-white/20 to-black/20 backdrop-blur-lg border-r border-blue-200/50 p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-black bg-clip-text text-transparent mb-2">
          Profile Studio
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-black rounded-full"></div>
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
                  ? "bg-gradient-to-r from-blue-500/50 to-black/30 text-slate-900 shadow-lg shadow-blue-500/25 border border-blue-400/30"
                  : "text-slate-700 hover:text-slate-900 hover:bg-gradient-to-r hover:from-blue-200/30 hover:to-black/10 hover:shadow-lg hover:shadow-blue-500/10"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 transition-all duration-300",
                isActive 
                  ? "text-blue-600 drop-shadow-sm" 
                  : "group-hover:text-blue-600 group-hover:drop-shadow-sm"
              )} />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 p-4 bg-gradient-to-br from-blue-200/20 to-black/10 rounded-xl border border-blue-200/30 backdrop-blur-sm">
        <p className="text-xs text-slate-600 text-center">
          Create your perfect digital identity
        </p>
      </div>
    </div>
  );
};
