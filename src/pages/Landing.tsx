
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const Landing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ email: '', password: '', confirmPassword: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation for demo purposes
    if (loginData.email && loginData.password) {
      toast({
        title: "Login Successful!",
        description: "Welcome back to your profile editor.",
      });
      setIsLoginOpen(false);
      navigate('/editor');
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter valid credentials.",
        variant: "destructive",
      });
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.email && signupData.password && signupData.password === signupData.confirmPassword) {
      toast({
        title: "Account Created!",
        description: "Welcome to your new profile editor.",
      });
      setIsSignupOpen(false);
      navigate('/editor');
    } else {
      toast({
        title: "Signup Failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
            Glyph Canvas
          </h1>
          <p className="text-xl md:text-2xl text-purple-200/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Create your ultimate digital identity. Customize your profile with stunning visuals, 
            showcase your achievements, and connect all your social links in one beautiful place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-6 hover:border-purple-400/40 transition-all duration-300 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎨</div>
            <h3 className="text-xl font-semibold text-white mb-3">Custom Profiles</h3>
            <p className="text-purple-200/80">Personalize your profile picture with special effects and glowing borders</p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-6 hover:border-purple-400/40 transition-all duration-300 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎵</div>
            <h3 className="text-xl font-semibold text-white mb-3">Media Integration</h3>
            <p className="text-purple-200/80">Add background videos and music to create an immersive experience</p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-6 hover:border-purple-400/40 transition-all duration-300 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🔗</div>
            <h3 className="text-xl font-semibold text-white mb-3">Social Hub</h3>
            <p className="text-purple-200/80">Connect all your social media links and showcase your digital presence</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
              >
                Get Started Free
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black/90 border-purple-500/30 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Create Your Account
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Label htmlFor="signup-email" className="text-purple-200">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    className="bg-purple-900/30 border-purple-500/30 text-white"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-password" className="text-purple-200">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    className="bg-purple-900/30 border-purple-500/30 text-white"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-confirm" className="text-purple-200">Confirm Password</Label>
                  <Input
                    id="signup-confirm"
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                    className="bg-purple-900/30 border-purple-500/30 text-white"
                    placeholder="••••••••"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Create Account
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-purple-500/50 text-purple-300 hover:bg-purple-600/20 hover:border-purple-400 px-8 py-3 text-lg font-semibold transition-all duration-300"
              >
                Sign In
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black/90 border-purple-500/30 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Welcome Back
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email" className="text-purple-200">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    className="bg-purple-900/30 border-purple-500/30 text-white"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="login-password" className="text-purple-200">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="bg-purple-900/30 border-purple-500/30 text-white"
                    placeholder="••••••••"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Sign In
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Footer */}
        <div className="mt-16 text-purple-300/60 text-sm">
          <p>Join thousands of creators building their digital identity</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
