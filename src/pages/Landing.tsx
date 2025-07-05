
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/AuthModal';
import { useAuth } from '@/hooks/useAuth';
import { Music, Gamepad2, Users, ExternalLink, Twitter, Mail, Play, Pause } from 'lucide-react';
import { NowPlayingWidget } from '@/components/NowPlayingWidget';

const Landing = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/editor');
    } else {
      setAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setAuthModalOpen(false);
    navigate('/editor');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-sm border-b border-sky-400/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
              Playd
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <Button 
                onClick={() => navigate('/editor')}
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white rounded-full px-6"
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => setAuthModalOpen(true)}
                  className="text-slate-300 hover:text-sky-400 hover:bg-sky-400/10"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white rounded-full px-6"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">
            Your Gaming & Music
            <span className="block bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
              Profile, Perfected
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Create stunning public profiles that showcase your favorite music, gaming achievements, 
            and social connections. Perfect for gamers, Discord users, and music enthusiasts.
          </p>

          {/* Now Playing Widget */}
          <div className="mb-8 flex justify-center">
            <NowPlayingWidget />
          </div>

          <div className="flex gap-4 justify-center">
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {user ? 'Go to Dashboard' : 'Create Your Profile'}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-sky-400/30 text-sky-400 hover:bg-sky-400/10 hover:border-sky-400 px-8 py-4 text-lg rounded-full"
            >
              View Examples
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-sky-400/20 p-8 text-center shadow-sm hover:shadow-lg hover:border-sky-400/40 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-400/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Music className="w-8 h-8 text-sky-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Music Integration</h3>
            <p className="text-slate-300 leading-relaxed">
              Connect Spotify and Last.fm to showcase your top artists, tracks, and listening stats. 
              Let visitors hear what you're currently playing.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-sky-400/20 p-8 text-center shadow-sm hover:shadow-lg hover:border-sky-400/40 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-400/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gamepad2 className="w-8 h-8 text-sky-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Gaming Profiles</h3>
            <p className="text-slate-300 leading-relaxed">
              Link your Discord, Steam, PSN, Xbox, and Riot accounts. Show off your achievements 
              and connect with fellow gamers.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-sky-400/20 p-8 text-center shadow-sm hover:shadow-lg hover:border-sky-400/40 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-400/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-sky-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Social Hub</h3>
            <p className="text-slate-300 leading-relaxed">
              Create a central hub for all your social media, streaming platforms, and gaming profiles. 
              One link to rule them all.
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl border border-sky-400/20 p-12 mb-20 shadow-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8">About Playd</h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Playd was created for the modern digital generation - gamers, Discord users, and music lovers 
              who want to showcase their personality online. Whether you're streaming on Twitch, competing 
              in esports, or just want to share your incredible music taste, Playd gives you the tools to 
              create a stunning, personalized profile that truly represents you.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              With seamless integrations to Spotify, Last.fm, Discord, and major gaming platforms, 
              plus powerful customization options, your Playd profile becomes your digital identity card 
              for the gaming and music communities.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <div className="flex justify-center gap-6 flex-wrap">
            <a
              href="https://discord.gg/playd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              <Users className="w-5 h-5" />
              <span>Join our Discord</span>
            </a>
            <a
              href="https://twitter.com/playdapp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              <Twitter className="w-5 h-5" />
              <span>Follow on Twitter</span>
            </a>
            <a
              href="mailto:hello@playd.io"
              className="flex items-center gap-3 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              <Mail className="w-5 h-5" />
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t border-sky-400/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Playd</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a
                href="https://discord.gg/playd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-sky-400 transition-colors"
              >
                <Users className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/playdapp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-sky-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@playd.io"
                className="text-slate-400 hover:text-sky-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Playd. All rights reserved. Built for gamers, by gamers.</p>
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Landing;
