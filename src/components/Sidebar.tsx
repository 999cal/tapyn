
import { User, Video, Music, Award, Type, Sparkles, Link } from 'lucide-react';
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
];

export const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  return (
    <div className="w-64 bg-black/40 backdrop-blur-lg border-r border-purple-500/20 p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Profile Studio
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
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
                  ? "bg-gradient-to-r from-purple-600/50 to-pink-600/50 text-white shadow-lg shadow-purple-500/25 border border-purple-400/30"
                  : "text-purple-200/70 hover:text-white hover:bg-purple-500/20 hover:shadow-lg hover:shadow-purple-500/10"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 transition-all duration-300",
                isActive 
                  ? "text-purple-300 drop-shadow-sm" 
                  : "group-hover:text-purple-300 group-hover:drop-shadow-sm"
              )} />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 p-4 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-400/20">
        <p className="text-xs text-purple-200/60 text-center">
          Create your perfect digital identity
        </p>
      </div>
    </div>
  );
};
