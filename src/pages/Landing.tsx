import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase'; // your supabase client
import { useEffect } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

useEffect(() => {
  document.title = "Tapyn | Welcome";
}, []);


  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ email: '', password: '', confirmPassword: '', username: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = loginData;

    if (!email || !password) {
      toast({
        title: "Login Failed",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Login Successful!",
      description: "Welcome back to your profile editor.",
    });

    setIsLoginOpen(false);
    navigate('/editor');
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password, confirmPassword, username } = signupData;

    if (!email || !password || password !== confirmPassword || !username) {
      toast({
        title: "Signup Failed",
        description: "Please fill all fields correctly.",
        variant: "destructive",
      });
      return;
    }

    // Check if username is unique
    const { data: existingUser, error: usernameError } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .single();

    if (existingUser) {
      toast({
        title: "Signup Failed",
        description: "Username is already taken.",
        variant: "destructive",
      });
      return;
    }

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    // Insert profile row with username and email
    await supabase.from('profiles').insert({
      id: data.user?.id,
      username,
      email,
      avatar_url: '', // default empty or null
      bio: '',
      links: [],
    });

    toast({
      title: "Account Created!",
      description: "Please check your email to confirm your account.",
    });

    setIsSignupOpen(false);
    navigate('/editor');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
            tapyn
          </h1>
          <p className="text-xl md:text-2xl text-purple-200/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Create your epic digital identity. Customize your profile with stunning visuals, 
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
                  <Label htmlFor="signup-username" className="text-purple-200">Username</Label>
                  <Input
                    id="signup-username"
                    type="text"
                    value={signupData.username}
                    onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                    className="bg-purple-900/30 border-purple-500/30 text-white"
                    placeholder="tapyn.wtf/ "
                  />
                </div>
                <div>
                  <Label htmlFor="signup-email" className="text-purple-200">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
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
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    className="bg-purple-900/30 border-purple-500/30 text-white"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-confirm-password" className="text-purple-200">Confirm Password</Label>
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    className="bg-purple-900/30 border-purple-500/30 text-white"
                    placeholder="••••••••"
                  />
                </div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold">
                  Sign Up
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                variant="outline"
                className="text-purple-300 border-purple-500/50 hover:border-purple-400/70"
              >
                Login
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black/90 border-purple-500/30 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Login to Your Account
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email" className="text-purple-200">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
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
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="bg-purple-900/30 border-purple-500/30 text-white"
                    placeholder="••••••••"
                  />
                </div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold">
                  Login
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Landing;
