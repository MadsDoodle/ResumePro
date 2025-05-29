
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  ChevronDown, 
  Menu, 
  X, 
  Plus,
  Zap,
  BarChart3,
  MessageSquare,
  Target,
  BookOpen,
  Briefcase,
  Settings as SettingsIcon,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useCredits } from '@/hooks/useCredits';

const ModernNavigation = () => {
  const { user, signOut } = useAuth();
  const { credits } = useCredits();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isFlowchartModalOpen, setIsFlowchartModalOpen] = useState(false);

  const platformItems = [
    { name: 'Resume Builder', href: '/create', icon: FileText },
    { name: 'Resume Analyzer', href: '/analyze', icon: BarChart3 },
    { name: 'AI Career Advisor', href: '/chat', icon: MessageSquare },
  ];

  const featureItems = [
    { name: 'ATS Optimized Templates', href: '/templates', icon: Target },
    { name: 'Chat-Based Editing', href: '/chat', icon: MessageSquare },
    { name: 'Smart Suggestions', href: '/dashboard', icon: Zap },
    { name: 'Version History', href: '/dashboard', icon: BookOpen },
  ];

  const resourceItems = [
    { name: 'Resume Tips', href: '#', icon: BookOpen },
    { name: 'Career Paths', href: '#', icon: Briefcase },
    { name: 'Blog', href: '#', icon: FileText },
  ];

  const DropdownMenu = ({ 
    title, 
    items, 
    isOpen, 
    onToggle 
  }: { 
    title: string; 
    items: typeof platformItems; 
    isOpen: boolean; 
    onToggle: () => void; 
  }) => (
    <div className="relative">
      <button 
        onClick={onToggle}
        className="flex items-center space-x-1 text-gray-300 hover:text-white transition-all duration-300 px-4 py-2 group"
      >
        <span className="relative">
          {title}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-64 bg-[#0D0D0D]/95 backdrop-blur-sm border border-gray-800 rounded-lg shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-2">
              {items.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    navigate(item.href);
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 rounded-md transition-all duration-300 flex items-center space-x-3 group"
                >
                  <item.icon className="h-4 w-4 text-purple-400 group-hover:text-white transition-colors" />
                  <span className="relative">
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <nav className="bg-[#0D0D0D] border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/')}
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                <FileText className="h-6 w-6 text-purple-400" />
              </div>
              <span className="text-xl font-bold text-white">ResumePro</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <DropdownMenu 
                title="Platform" 
                items={platformItems} 
                isOpen={activeDropdown === 'platform'}
                onToggle={() => setActiveDropdown(activeDropdown === 'platform' ? null : 'platform')}
              />
              <DropdownMenu 
                title="Features" 
                items={featureItems} 
                isOpen={activeDropdown === 'features'}
                onToggle={() => setActiveDropdown(activeDropdown === 'features' ? null : 'features')}
              />
              <DropdownMenu 
                title="Resources" 
                items={resourceItems} 
                isOpen={activeDropdown === 'resources'}
                onToggle={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
              />
              
              <button 
                onClick={() => navigate('/pricing')}
                className="text-gray-300 hover:text-white transition-all duration-300 px-4 py-2 group"
              >
                <span className="relative">
                  Pricing
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </button>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Flowchart Creator Button */}
              <motion.button
                onClick={() => setIsFlowchartModalOpen(true)}
                className="bg-[#00FF88]/10 text-[#00FF88] px-6 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-[0_0_15px_rgba(0,255,136,0.5)] hover:shadow-[0_0_25px_rgba(0,255,136,0.7)] border border-[#00FF88]/20 hover:bg-[#00FF88]/20 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center">
                  <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  Create Flowchart
                  <Zap className="h-4 w-4 ml-2 animate-pulse" />
                </span>
              </motion.button>

              {/* Credits Display */}
              {user && (
                <div className="hidden sm:flex items-center space-x-2 bg-yellow-600/10 border border-yellow-500/20 rounded-lg px-3 py-2">
                  <span className="text-yellow-400 font-medium">{credits}</span>
                  <span className="text-yellow-400">🪙</span>
                </div>
              )}

              {/* Auth Buttons */}
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 flex items-center justify-center">
                    <span className="text-purple-400 text-sm font-medium">
                      {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <Button 
                    onClick={() => signOut()}
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-400"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    onClick={() => navigate('/auth')}
                    variant="outline"
                    className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={() => navigate('/auth')}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    Start Free
                  </Button>
                </>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0D0D0D] border-t border-gray-800"
            >
              <div className="px-4 py-4 space-y-2">
                {platformItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center space-x-3"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Flowchart Creator Modal */}
      <AnimatePresence>
        {isFlowchartModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setIsFlowchartModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0E0E0E] rounded-lg p-8 max-w-2xl w-full mx-4 border border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-4">Flowchart Creator</h2>
              <p className="text-gray-300 mb-6">
                Create interactive flowcharts and diagrams. This feature is coming soon!
              </p>
              <div className="flex justify-end space-x-3">
                <Button 
                  onClick={() => setIsFlowchartModalOpen(false)}
                  variant="outline"
                  className="border-gray-600 text-gray-300"
                >
                  Close
                </Button>
                <Button 
                  className="bg-[#00FF88] text-black hover:bg-[#00FF88]/90"
                  disabled
                >
                  Coming Soon
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModernNavigation;
