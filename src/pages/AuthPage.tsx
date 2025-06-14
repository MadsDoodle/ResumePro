import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import { useTheme } from '@/contexts/ThemeContext';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isDark } = useTheme();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      toast({
        title: 'Success!',
        description: 'Account created successfully. Please check your email for verification.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-300 ${
      isDark ? 'bg-black' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    }`}>
      <AnimatedBackground />
      <Header />
      
      <div className="relative z-10 pt-20 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Card className={`w-full max-w-md backdrop-blur-sm transition-all duration-300 ${
          isDark 
            ? 'bg-purple-900/20 border-purple-500/30' 
            : 'bg-white/70 border-blue-200/40'
        }`}>
          <CardHeader>
            <CardTitle className={`text-center text-2xl transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Welcome to ResumePro</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className={`grid w-full grid-cols-2 border transition-all duration-300 ${
                isDark 
                  ? 'bg-purple-900/30 border-purple-500/30' 
                  : 'bg-blue-50/50 border-blue-200/50'
              }`}>
                <TabsTrigger 
                  value="signin"
                  className={`transition-all duration-300 ${
                    isDark 
                      ? 'data-[state=active]:bg-purple-600 data-[state=active]:text-white' 
                      : 'data-[state=active]:bg-blue-600 data-[state=active]:text-white'
                  }`}
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className={`transition-all duration-300 ${
                    isDark 
                      ? 'data-[state=active]:bg-purple-600 data-[state=active]:text-white' 
                      : 'data-[state=active]:bg-blue-600 data-[state=active]:text-white'
                  }`}
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className={`transition-colors duration-300 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`transition-all duration-300 ${
                        isDark 
                          ? 'bg-black/50 border-purple-500/30 text-white' 
                          : 'bg-white/80 border-blue-200/50 text-gray-900'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className={`transition-colors duration-300 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`transition-all duration-300 ${
                        isDark 
                          ? 'bg-black/50 border-purple-500/30 text-white' 
                          : 'bg-white/80 border-blue-200/50 text-gray-900'
                      }`}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className={`w-full transition-all duration-300 ${
                      isDark 
                        ? 'bg-purple-600 hover:bg-purple-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName" className={`transition-colors duration-300 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`transition-all duration-300 ${
                        isDark 
                          ? 'bg-black/50 border-purple-500/30 text-white' 
                          : 'bg-white/80 border-blue-200/50 text-gray-900'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className={`transition-colors duration-300 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`transition-all duration-300 ${
                        isDark 
                          ? 'bg-black/50 border-purple-500/30 text-white' 
                          : 'bg-white/80 border-blue-200/50 text-gray-900'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className={`transition-colors duration-300 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`transition-all duration-300 ${
                        isDark 
                          ? 'bg-black/50 border-purple-500/30 text-white' 
                          : 'bg-white/80 border-blue-200/50 text-gray-900'
                      }`}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className={`w-full transition-all duration-300 ${
                      isDark 
                        ? 'bg-purple-600 hover:bg-purple-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
