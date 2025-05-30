
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  MessageSquare, 
  Bookmark, 
  User, 
  Settings, 
  Home,
  Menu,
  X,
  Coins,
  CreditCard,
  LogOut,
  Plus,
  Download,
  Trash2,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useCredits } from '@/hooks/useCredits';
import { useFlowcharts } from '@/hooks/useFlowcharts';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import FlowchartCreator from '@/components/FlowchartCreator';

interface CollapsibleSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const CollapsibleSidebar = ({ isOpen, onToggle, onClose }: CollapsibleSidebarProps) => {
  const { user, signOut } = useAuth();
  const { credits, currentPlan } = useCredits();
  const { flowcharts, loading, deleteFlowchart } = useFlowcharts();
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [showLibrary, setShowLibrary] = useState(false);
  const [isFlowchartModalOpen, setIsFlowchartModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const mainNavItems = [
    { id: 'dashboard', title: 'Dashboard', icon: Home, route: '/dashboard' },
    { id: 'library', title: 'My Library', icon: FileText, action: () => setShowLibrary(!showLibrary) },
    { id: 'projects', title: 'Saved Projects', icon: Bookmark, route: '/saved-projects' },
    { id: 'chat', title: 'AI Chat History', icon: MessageSquare, route: '/chat-history' },
    { id: 'settings', title: 'Settings', icon: Settings, route: '/settings' },
    { id: 'billing', title: 'Billing & Subscription', icon: CreditCard, route: '/pricing' },
  ];

  const handleNavigation = (route: string, itemId: string) => {
    setActiveItem(itemId);
    navigate(route);
    onClose();
  };

  const handleFlowchartCreate = () => {
    setIsFlowchartModalOpen(true);
    onClose();
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    onClose();
  };

  const handleDownloadFlowchart = (flowchart: any) => {
    const dataStr = JSON.stringify(flowchart.flowchart_data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${flowchart.title.replace(/\s+/g, '_')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleDeleteFlowchart = async (id: string) => {
    try {
      await deleteFlowchart(id);
      toast({
        title: "Success",
        description: "Flowchart deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete flowchart",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <Button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 w-12 h-12 rounded-full bg-purple-600/20 border border-purple-500/30 hover:bg-purple-600/30 transition-all duration-200 hover:scale-105 shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:shadow-[0_0_25px_rgba(147,51,234,0.7)]"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X className="h-5 w-5 text-purple-400" /> : <Menu className="h-5 w-5 text-purple-400" />}
        </motion.div>
      </Button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={sidebarRef}
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.4, 0, 0.2, 1] 
            }}
            className="fixed left-0 top-0 h-full w-80 bg-[#060315]/95 backdrop-blur-sm border-r border-purple-500/20 z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-purple-500/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-600/20 border border-purple-500/30">
                  <FileText className="h-6 w-6 text-purple-400" />
                </div>
                <span className="text-xl font-bold text-white">ResumePro</span>
              </div>

              {/* Primary Action */}
              <Button 
                onClick={handleFlowchartCreate}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white mb-4 relative overflow-hidden group"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Flow Map
                <Badge className="ml-2 bg-green-500/20 text-green-400 animate-pulse">
                  Glow
                </Badge>
              </Button>

              {/* Account Section */}
              <div className="bg-purple-900/20 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Credits</span>
                  <motion.div 
                    className="flex items-center text-yellow-400 font-bold"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                  >
                    {credits} <Coins className="h-4 w-4 ml-1" />
                  </motion.div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Plan</span>
                  <span className="text-purple-400 font-medium">{currentPlan}</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-purple-300 text-sm font-medium mb-3">Main Navigation</h3>
                <div className="space-y-1">
                  {mainNavItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => item.action ? item.action() : handleNavigation(item.route!, item.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                        activeItem === item.id
                          ? 'bg-purple-600/30 text-white shadow-[0_0_12px_rgba(147,51,234,0.5)]'
                          : 'text-gray-300 hover:text-white hover:bg-purple-600/20'
                      }`}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.title}
                    </motion.button>
                  ))}
                </div>

                {/* Library Section */}
                <AnimatePresence>
                  {showLibrary && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 ml-4 border-l border-purple-500/20 pl-4 space-y-2"
                    >
                      <h4 className="text-sm font-medium text-purple-300">Flowcharts</h4>
                      {loading ? (
                        <div className="text-gray-400 text-sm">Loading...</div>
                      ) : flowcharts.length === 0 ? (
                        <div className="text-gray-400 text-sm">No flowcharts yet</div>
                      ) : (
                        flowcharts.slice(0, 5).map((flowchart) => (
                          <div key={flowchart.id} className="bg-gray-800/50 rounded-lg p-3 space-y-2">
                            <div className="text-white text-sm font-medium truncate">
                              {flowchart.title}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {new Date(flowchart.created_at).toLocaleDateString()}
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                onClick={() => handleDownloadFlowchart(flowchart)}
                                size="sm"
                                variant="outline"
                                className="border-green-500/30 text-green-400 hover:bg-green-500/10 text-xs p-1"
                              >
                                <Download className="h-3 w-3" />
                              </Button>
                              <Button
                                onClick={() => handleDeleteFlowchart(flowchart.id)}
                                size="sm"
                                variant="outline"
                                className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs p-1"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Account Controls */}
              <div className="border-t border-purple-500/20 pt-6">
                <h3 className="text-purple-300 text-sm font-medium mb-3">Account</h3>
                <div className="space-y-1">
                  <motion.button
                    onClick={() => handleNavigation('/profile', 'profile')}
                    className="w-full flex items-center px-4 py-3 rounded-lg text-left text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-200"
                    whileHover={{ x: 4 }}
                  >
                    <User className="h-5 w-5 mr-3" />
                    Profile
                  </motion.button>
                  
                  <motion.button
                    onClick={handleSignOut}
                    className="w-full flex items-center px-4 py-3 rounded-lg text-left text-red-400 hover:text-red-300 hover:bg-red-600/20 transition-all duration-200"
                    whileHover={{ x: 4 }}
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign Out
                  </motion.button>
                </div>
              </div>

              {/* User Info */}
              <div className="border-t border-purple-500/20 pt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                    <span className="text-purple-400 text-sm font-medium">
                      {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {user?.user_metadata?.full_name || 'User'}
                    </p>
                    <p className="text-gray-400 text-xs truncate">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flowchart Creator Modal */}
      <FlowchartCreator 
        isOpen={isFlowchartModalOpen} 
        onClose={() => setIsFlowchartModalOpen(false)} 
      />
    </>
  );
};

export default CollapsibleSidebar;
