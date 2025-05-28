
import { useState } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import { FileText, MessageSquare, Bookmark, User, Settings, Home } from 'lucide-react';
import LibraryModal from './sidebar/LibraryModal';
import ChatModal from './sidebar/ChatModal';
import BookmarksModal from './sidebar/BookmarksModal';
import SidebarMenuComponent from './sidebar/SidebarMenu';

const EnhancedSidebar = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Mock data
  const resumeLibrary = [
    {
      id: 1,
      title: "Marketing Resume - Feb",
      description: "Focused on branding jobs",
      lastModified: "2024-02-15"
    },
    {
      id: 2,
      title: "Tech Resume - Jan",
      description: "Software engineering positions",
      lastModified: "2024-01-20"
    }
  ];

  const chatHistory = [
    {
      id: 1,
      topic: "Resume Format Tips",
      date: "2024-02-15",
      lastMessage: "How to format technical skills section?"
    },
    {
      id: 2,
      topic: "Cover Letter Help",
      date: "2024-02-10",
      lastMessage: "Writing compelling opening statements"
    }
  ];

  const bookmarkedPaths = [
    {
      id: 1,
      title: "Product Manager",
      industry: "Tech",
      tags: ["Strategy", "Analytics", "Leadership"],
      insight: "Focus on data-driven decision making"
    },
    {
      id: 2,
      title: "Marketing Director",
      industry: "Marketing",
      tags: ["Digital", "Branding", "Growth"],
      insight: "Emphasize campaign ROI and team leadership"
    }
  ];

  const mainItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: Home
    },
    {
      id: 'library',
      title: 'My Library',
      icon: FileText,
      action: () => setIsLibraryOpen(true)
    },
    {
      id: 'chat',
      title: 'Chat Responses',
      icon: MessageSquare,
      action: () => setIsChatOpen(true)
    },
    {
      id: 'bookmarks',
      title: 'Bookmarked Paths',
      icon: Bookmark,
      action: () => setIsBookmarksOpen(true)
    }
  ];

  const bottomItems = [
    {
      id: 'profile',
      title: 'Profile',
      icon: User
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: Settings
    }
  ];

  const handleItemClick = (item: any) => {
    setActiveItem(item.id);
    if (item.action) {
      item.action();
    }
  };

  return (
    <>
      <Sidebar className="border-r border-purple-500/20 bg-[#060315]/95 backdrop-blur-sm">
        <SidebarHeader className="p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-purple-500/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-purple-600/20 border border-purple-500/30">
              <FileText className="h-6 w-6 text-purple-400" />
            </div>
            <span className="text-xl font-bold text-white">ResumePro</span>
          </div>
        </SidebarHeader>

        <SidebarContent className="bg-[#060315]/95">
          <SidebarMenuComponent 
            items={mainItems}
            activeItem={activeItem}
            onItemClick={handleItemClick}
            label="Main Menu"
          />

          <div className="mt-auto">
            <SidebarMenuComponent 
              items={bottomItems}
              activeItem={activeItem}
              onItemClick={handleItemClick}
              label=""
            />
          </div>
        </SidebarContent>

        <SidebarFooter className="p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-t border-purple-500/20">
          <div className="text-xs text-gray-400 text-center">
            © 2024 ResumePro
          </div>
        </SidebarFooter>
      </Sidebar>

      <LibraryModal 
        isOpen={isLibraryOpen}
        onOpenChange={setIsLibraryOpen}
        resumeLibrary={resumeLibrary}
      />

      <ChatModal 
        isOpen={isChatOpen}
        onOpenChange={setIsChatOpen}
        chatHistory={chatHistory}
      />

      <BookmarksModal 
        isOpen={isBookmarksOpen}
        onOpenChange={setIsBookmarksOpen}
        bookmarkedPaths={bookmarkedPaths}
      />
    </>
  );
};

export default EnhancedSidebar;
