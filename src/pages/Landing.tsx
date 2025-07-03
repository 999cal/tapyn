
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Star, Zap, Users, Check, Mail, Phone, MapPin, ArrowRight, Sparkles } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    document.title = "Tapyn | Welcome";

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
      avatar_url: '',
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
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-2xl animate-pulse" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 backdrop-blur-sm">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          tapyn
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
          <a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a>
          <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl w-full text-center">
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent animate-fade-in">
              tapyn
            </h1>
            <p className="text-xl md:text-2xl text-purple-200/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              Create your epic digital identity. Customize your profile with stunning visuals, 
              showcase your achievements, and connect all your social links in one beautiful place.
            </p>
          </div>

          {/* Interactive Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="group bg-black/40 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8 hover:border-purple-400/60 transition-all duration-500 hover:scale-105 cursor-pointer">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🎨</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Custom Profiles</h3>
              <p className="text-purple-200/80 leading-relaxed">Personalize your profile picture with special effects and glowing borders</p>
            </div>
            
            <div className="group bg-black/40 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8 hover:border-purple-400/60 transition-all duration-500 hover:scale-105 cursor-pointer">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🎵</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Media Integration</h3>
              <p className="text-purple-200/80 leading-relaxed">Add background videos and music to create an immersive experience</p>
            </div>
            
            <div className="group bg-black/40 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8 hover:border-purple-400/60 transition-all duration-500 hover:scale-105 cursor-pointer">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🔗</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Social Hub</h3>
              <p className="text-purple-200/80 leading-relaxed">Connect all your social media links and showcase your digital presence</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-lg font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                      placeholder="tapyn.wtf/"
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
                  className="text-purple-300 border-purple-500/50 hover:border-purple-400/70 px-12 py-4 text-lg hover:scale-105 transition-all duration-300"
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
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Tapyn
            </h2>
            <p className="text-xl text-purple-200/80 max-w-3xl mx-auto">
              We're revolutionizing how you present yourself online with cutting-edge profile customization tools
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-purple-600/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Innovation First</h3>
              <p className="text-purple-200/70">Leading the way with cutting-edge profile customization technology</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-purple-600/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Community Driven</h3>
              <p className="text-purple-200/70">Built by creators, for creators. Join our growing community</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-purple-600/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Lightning Fast</h3>
              <p className="text-purple-200/70">Create stunning profiles in minutes, not hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Simple Pricing
            </h2>
            <p className="text-xl text-purple-200/80">Choose the plan that works for you</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8 hover:border-purple-400/40 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-purple-200/60">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-3" />Basic profile customization</li>
                <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-3" />5 social links</li>
                <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-3" />Standard templates</li>
              </ul>
              <Button className="w-full" variant="outline">Get Started</Button>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-gradient-to-b from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl border border-purple-400/40 p-8 scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <div className="text-4xl font-bold mb-6">$9<span className="text-lg text-purple-200/60">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-3" />Advanced customization</li>
                <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-3" />Unlimited social links</li>
                <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-3" />Background videos & music</li>
                <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-3" />Special effects</li>
                <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-3" />Custom domain</li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">Choose Pro</Button>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8 hover:border-purple-400/40 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="text-4xl font-bold mb-6">$29<span className="text-lg text-purple-200/60">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-3" />Everything in Pro</li>
                <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-3" />Team collaboration</li>
                <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-3" />Analytics dashboard</li>
                <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-3" />Priority support</li>
                <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-3" />White-label options</li>
              </ul>
              <Button className="w-full" variant="outline">Contact Sales</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl text-purple-200/80">Have questions? We'd love to hear from you</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-600/20 rounded-full w-12 h-12 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <p className="text-purple-200/70">hello@tapyn.wtf</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-purple-600/20 rounded-full w-12 h-12 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Phone</h3>
                  <p className="text-purple-200/70">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-purple-600/20 rounded-full w-12 h-12 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Location</h3>
                  <p className="text-purple-200/70">San Francisco, CA</p>
                </div>
              </div>
            </div>
            
            <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8">
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-purple-200">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    className="bg-purple-900/30 border-purple-500/30 text-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-purple-200">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    className="bg-purple-900/30 border-purple-500/30 text-white"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-purple-200">Message</Label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-purple-900/30 border border-purple-500/30 rounded-md px-3 py-2 text-white placeholder:text-purple-200/50"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/60 backdrop-blur-lg border-t border-purple-500/20 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                tapyn
              </div>
              <p className="text-purple-200/70 text-sm">
                Create your epic digital identity with stunning customizable profiles.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-purple-200/70">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-purple-200/70">
                <li><a href="#" className="hover:text-purple-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-purple-200/70">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-purple-500/20 pt-8 text-center text-sm text-purple-200/60">
            <p>&copy; 2024 Tapyn. All rights reserved. Made with ❤️ for creators worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
