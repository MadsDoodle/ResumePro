
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

interface AuthPageEnhancementProps {
  onSignIn: (email: string, password: string) => void;
  onSignUp: (email: string, password: string, fullName: string) => void;
  isLoading?: boolean;
}

const AuthPageEnhancement = ({ onSignIn, onSignUp, isLoading }: AuthPageEnhancementProps) => {
  const [signInForm, setSignInForm] = useState({
    email: 'madhavsukla.baidya.chy22@itbhu.ac.in',
    password: ''
  });
  
  const [signUpForm, setSignUpForm] = useState({
    fullName: 'Madhav S Baidya',
    email: 'madhavsukla.baidya.chy22@itbhu.ac.in',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(signInForm.email, signInForm.password);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpForm.password !== signUpForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onSignUp(signUpForm.email, signUpForm.password, signUpForm.fullName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main Glass Container */}
      <Card className="w-full max-w-md relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-white mb-2">
            Welcome to ResumePro
          </CardTitle>
          <p className="text-gray-300 text-sm">
            Build your future with AI-powered resume tools
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm">
              <TabsTrigger 
                value="signin" 
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4 mt-6">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      value={signInForm.email}
                      onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                      className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={signInForm.password}
                      onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                      className="pl-10 pr-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 transition-all duration-300 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      value={signUpForm.fullName}
                      onChange={(e) => setSignUpForm({ ...signUpForm, fullName: e.target.value })}
                      className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      value={signUpForm.email}
                      onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                      className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={signUpForm.password}
                      onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                      className="pl-10 pr-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="password"
                      value={signUpForm.confirmPassword}
                      onChange={(e) => setSignUpForm({ ...signUpForm, confirmPassword: e.target.value })}
                      className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 transition-all duration-300 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="text-center pt-4 border-t border-white/20">
            <p className="text-xs text-gray-400">
              By continuing, you agree to our{' '}
              <a href="/terms" className="text-purple-400 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="text-purple-400 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPageEnhancement;
