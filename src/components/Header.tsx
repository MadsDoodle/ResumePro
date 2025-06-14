
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useUserSettings } from '@/hooks/useUserSettings';
import { useNavigate } from 'react-router-dom';
import { FileText, ChevronDown } from 'lucide-react';
import TermsModal from './TermsModal';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

const Header = () => {
  const { user, signOut } = useAuth();
  const { settings, updateLastLogin } = useUserSettings();
  const navigate = useNavigate();
  const [showTermsModal, setShowTermsModal] = useState(false);
  const { isDark } = useTheme();

  const handleAuthAction = async () => {
    if (user) {
      try {
        await signOut();
        // Navigate to landing page after sign out
        navigate('/');
      } catch (error) {
        console.error('Sign out error:', error);
        // Force navigation to landing page even if sign out fails
        navigate('/');
      }
    } else {
      navigate('/auth');
    }
  };

  const handleGetStarted = async () => {
    if (!user) {
      // Not authenticated - redirect to auth page
      navigate('/auth');
      return;
    }

    // User is authenticated - check terms acceptance
    if (settings && !settings.termsAccepted) {
      // Show terms modal
      setShowTermsModal(true);
      return;
    }

    // Terms accepted - update last login and redirect to dashboard
    await updateLastLogin();
    navigate('/dashboard');
  };

  const handleTermsAccepted = async () => {
    setShowTermsModal(false);
    await updateLastLogin();
    navigate('/dashboard');
  };

  const platformItems = [
    { name: 'Resume Builder', href: '/create' },
    { name: 'Resume Analyzer', href: '/analyze' },
    { name: 'AI Career Advisor', href: '/chat' },
  ];

  const featureItems = [
    { name: 'ATS Optimized Templates', href: '/templates' },
    { name: 'Chat-Based Editing', href: '/chat' },
    { name: 'Smart Suggestions', href: '/dashboard' },
    { name: 'Version History', href: '/dashboard' },
  ];

  const resourceItems = [
    { name: 'Resume Tips', href: '/resources' },
    { name: 'Career Paths', href: '/resources' },
    { name: 'Blog', href: '/resources' },
  ];

  const DropdownMenu = ({ title, items }: { title: string; items: typeof platformItems }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div 
        className="relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button className={`flex items-center space-x-1 transition-colors px-4 py-2 ${
          isDark 
            ? 'text-white hover:text-purple-300' 
            : 'text-gray-700 hover:text-blue-600'
        }`}>
          <span>{title}</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className={`absolute top-full left-0 mt-1 w-64 backdrop-blur-sm border rounded-lg shadow-lg z-50 animate-fade-in ${
            isDark 
              ? 'bg-[#060315]/95 border-purple-500/30' 
              : 'bg-white/95 border-gray-200'
          }`}>
            <div className="p-2">
              {items.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className={`w-full text-left px-4 py-3 rounded-md transition-colors block ${
                    isDark 
                      ? 'text-white hover:bg-purple-500/20' 
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-all duration-300 ${
        isDark 
          ? 'bg-[#060315]/90 border-purple-500/20' 
          : 'bg-white/90 border-blue-200/50'
      }`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg border transition-colors duration-300 ${
                isDark 
                  ? 'bg-purple-600/20 border-purple-500/30' 
                  : 'bg-blue-100 border-blue-300'
              }`}>
                <FileText className={`h-6 w-6 transition-colors duration-300 ${
                  isDark ? 'text-purple-400' : 'text-blue-600'
                }`} />
              </div>
              <button 
                onClick={() => navigate('/')}
                className={`text-xl font-bold transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                ResumePro
              </button>
            </div>
            
            <nav className="hidden md:flex items-center space-x-1">
              <DropdownMenu title="Platform" items={platformItems} />
              <DropdownMenu title="Features" items={featureItems} />
              <DropdownMenu title="Resources" items={resourceItems} />
              
              <button 
                onClick={() => navigate('/pricing')}
                className={`transition-colors px-4 py-2 ${
                  isDark 
                    ? 'text-white hover:text-purple-300' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Pricing
              </button>
              
              <button 
                onClick={() => navigate('/contact')}
                className={`transition-colors px-4 py-2 ${
                  isDark 
                    ? 'text-white hover:text-purple-300' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Contact
              </button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <Button 
              onClick={handleAuthAction}
              variant="outline"
              className={`transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400' 
                  : 'border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400'
              }`}
            >
              {user ? 'Sign Out' : 'Sign In'}
            </Button>
            
            <Button 
              onClick={handleGetStarted}
              className={`transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
              }`}
              style={{ 
                boxShadow: isDark 
                  ? '0 0 20px rgba(78, 54, 226, 0.4)' 
                  : '0 0 20px rgba(59, 130, 246, 0.4)' 
              }}
            >
              {user ? 'Go to Dashboard' : 'Start Free'}
            </Button>
          </div>
        </div>
      </header>

      <TermsModal 
        isOpen={showTermsModal} 
        onAccept={handleTermsAccepted} 
      />
    </>
  );
};

export default Header;
