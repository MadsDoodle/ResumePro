
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Home, 
  FileText, 
  BarChart3, 
  MessageSquare, 
  User, 
  Settings,
  BookOpen,
  History,
  Download,
  Trash2,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import ChatHistoryModal from '@/components/modals/ChatHistoryModal';
import LibraryModal from '@/components/modals/LibraryModal';
import AnalysisHistoryModal from '@/components/sidebar/AnalysisHistoryModal';

interface CollapsibleSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const CollapsibleSidebar = ({ isOpen, onToggle, onClose }: CollapsibleSidebarProps) => {
  const navigate = useNavigate();
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showAnalysisHistory, setShowAnalysisHistory] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Create Resume', path: '/create' },
    { icon: BarChart3, label: 'Analyze Resume', path: '/analyze' },
    { icon: MessageSquare, label: 'AI Assistant', path: '/resume-chat' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-gray-900/95 backdrop-blur-sm border-r border-gray-800 
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-80 lg:w-72
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Navigation
          </h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation Menu */}
        <div className="p-4 space-y-2">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Main Menu
          </h3>
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50"
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>

        {/* Library Section */}
        <div className="p-4 space-y-2 border-t border-gray-800">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            My Library
          </h3>
          
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50"
            onClick={() => setShowLibrary(true)}
          >
            <BookOpen className="mr-3 h-4 w-4" />
            Saved Projects
            <Badge variant="secondary" className="ml-auto bg-blue-600 text-white">
              New
            </Badge>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50"
            onClick={() => setShowChatHistory(true)}
          >
            <MessageSquare className="mr-3 h-4 w-4" />
            Chat History
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50"
            onClick={() => setShowAnalysisHistory(true)}
          >
            <BarChart3 className="mr-3 h-4 w-4" />
            Analysis History
            <Badge variant="secondary" className="ml-auto bg-green-600 text-white">
              Track
            </Badge>
          </Button>
        </div>

        {/* Settings */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50"
            onClick={() => handleNavigation('/profile')}
          >
            <Settings className="mr-3 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Modals */}
      <ChatHistoryModal 
        isOpen={showChatHistory}
        onClose={() => setShowChatHistory(false)}
      />
      
      <LibraryModal 
        isOpen={showLibrary}
        onClose={() => setShowLibrary(false)}
      />

      <AnalysisHistoryModal 
        isOpen={showAnalysisHistory}
        onClose={() => setShowAnalysisHistory(false)}
      />
    </>
  );
};

export default CollapsibleSidebar;
