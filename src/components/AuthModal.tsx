
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Music } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, username);
        toast({
          title: "Account created",
          description: "Welcome to Playd! Please check your email to verify your account",
        });
      } else {
        await signIn(email, password);
        toast({
          title: "Welcome back!",
          description: "Successfully signed in to Playd",
        });
        onSuccess();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white border border-blue-100 shadow-xl max-w-md">
        <DialogHeader className="text-center pb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Music className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-slate-800">
            {isSignUp ? 'Join Playd' : 'Welcome Back'}
          </DialogTitle>
          <p className="text-slate-600 text-sm">
            {isSignUp 
              ? 'Create your gaming and music profile' 
              : 'Sign in to your Playd account'
            }
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 border-slate-200 focus:border-sky-400 focus:ring-sky-400"
              placeholder="your@email.com"
            />
          </div>

          {isSignUp && (
            <div>
              <Label htmlFor="username" className="text-slate-700 font-medium">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 border-slate-200 focus:border-sky-400 focus:ring-sky-400"
                placeholder="your_username"
              />
              <p className="text-xs text-slate-500 mt-1">
                This will be your profile URL: playd.io/your_username
              </p>
            </div>
          )}

          <div>
            <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 border-slate-200 focus:border-sky-400 focus:ring-sky-400"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-3 rounded-full font-medium"
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isSignUp ? 'Create Account' : 'Sign In'}
          </Button>

          <div className="text-center pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-slate-600 hover:text-sky-600"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
