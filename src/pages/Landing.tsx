
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/AuthModal';
import { useAuth } from '@/hooks/useAuth';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Create Your Digital Identity
          </h1>
          <p className="text-xl text-purple-200/80 mb-8 max-w-2xl mx-auto">
            Build a stunning profile page that showcases your personality. Share your story, connect with others, and make a lasting impression.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg"
            >
              {user ? 'Go to Editor' : 'Get Started'}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-purple-400/30 text-purple-200 hover:bg-purple-500/20 px-8 py-4 text-lg"
            >
              View Examples
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Customizable Design</h3>
            <p className="text-purple-200/80">
              Choose from multiple themes, effects, and layouts to create a profile that truly represents you.
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🎵</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Rich Media</h3>
            <p className="text-purple-200/80">
              Add background music, videos, and stunning visual effects to make your profile come alive.
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Easy Sharing</h3>
            <p className="text-purple-200/80">
              Get your unique URL and share your profile across all social media platforms instantly.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Connect With Us</h2>
          <div className="flex justify-center gap-6">
            <a
              href="https://discord.gg/your-server"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg transition-all duration-300 border border-purple-400/30 hover:border-purple-400/60 text-white"
            >
              <span className="text-xl">💬</span>
              <span>Discord</span>
            </a>
            <a
              href="https://twitter.com/your-handle"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg transition-all duration-300 border border-purple-400/30 hover:border-purple-400/60 text-white"
            >
              <span className="text-xl">🐦</span>
              <span>Twitter</span>
            </a>
            <a
              href="mailto:contact@tapyn.com"
              className="flex items-center gap-3 px-6 py-3 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg transition-all duration-300 border border-purple-400/30 hover:border-purple-400/60 text-white"
            >
              <span className="text-xl">📧</span>
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Landing;
