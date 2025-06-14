
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useUserSettings } from '@/hooks/useUserSettings';
import { useNavigate } from 'react-router-dom';
import { FileText, ChevronDown } from 'lucide-react';
import TermsModal from './TermsModal';

const Header = () => {
  const { user, signOut } = useAuth();
  const { settings, updateLastLogin } = useUserSettings();
  const navigate = useNavigate();
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleAuthAction = () => {
    if (user) {
      signOut();
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
        <button className="flex items-center space-x-1 text-white hover:text-purple-300 transition-colors px-4 py-2">
          <span>{title}</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-64 bg-[#060315]/95 backdrop-blur-sm border border-purple-500/30 rounded-lg shadow-lg z-50 animate-fade-in">
            <div className="p-2">
              {items.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className="w-full text-left px-4 py-3 text-white hover:bg-purple-500/20 rounded-md transition-colors block"
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#060315]/90 backdrop-blur-sm border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-purple-600/20 border border-purple-500/30">
                <FileText className="h-6 w-6 text-purple-400" />
              </div>
              <span className="text-xl font-bold text-white">ResumePro</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-1">
              <DropdownMenu title="Platform" items={platformItems} />
              <DropdownMenu title="Features" items={featureItems} />
              <DropdownMenu title="Resources" items={resourceItems} />
              
              <button 
                onClick={() => navigate('/pricing')}
                className="text-white hover:text-purple-300 transition-colors px-4 py-2"
              >
                Pricing
              </button>
              
              <button 
                onClick={() => navigate('/contact')}
                className="text-white hover:text-purple-300 transition-colors px-4 py-2"
              >
                Contact
              </button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              onClick={handleAuthAction}
              variant="outline"
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 hover:scale-105"
            >
              {user ? 'Sign Out' : 'Sign In'}
            </Button>
            
            <Button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300 hover:scale-105"
              style={{ boxShadow: '0 0 20px rgba(78, 54, 226, 0.4)' }}
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
