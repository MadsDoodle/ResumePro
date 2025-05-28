
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, MessageSquare, Bookmark, User, Settings, Home, Plus, Edit, Download, X } from 'lucide-react';

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
      lastModified: "2024-02-15",
    },
    {
      id: 2,
      title: "Tech Resume - Jan",
      description: "Software engineering positions",
      lastModified: "2024-01-20",
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
      icon: Home,
    },
    {
      id: 'library',
      title: 'My Library',
      icon: FileText,
      action: () => setIsLibraryOpen(true),
    },
    {
      id: 'chat',
      title: 'Chat Responses',
      icon: MessageSquare,
      action: () => setIsChatOpen(true),
    },
    {
      id: 'bookmarks',
      title: 'Bookmarked Paths',
      icon: Bookmark,
      action: () => setIsBookmarksOpen(true),
    },
  ];

  const bottomItems = [
    {
      id: 'profile',
      title: 'Profile',
      icon: User,
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: Settings,
    },
  ];

  const handleItemClick = (item: any) => {
    setActiveItem(item.id);
    if (item.action) {
      item.action();
    }
  };

  return (
    <>
      <Sidebar className="border-r border-purple-500/20 bg-black/40 backdrop-blur-sm">
        <SidebarHeader className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-purple-600/20 border border-purple-500/30">
              <FileText className="h-6 w-6 text-purple-400" />
            </div>
            <span className="text-xl font-bold text-white">ResumePro</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-purple-300 text-sm font-medium px-2 mb-2">
              Main Menu
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => handleItemClick(item)}
                      isActive={activeItem === item.id}
                      className={`text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-200 hover:scale-105 ${
                        activeItem === item.id 
                          ? 'bg-purple-600/30 text-white border-r-2 border-purple-400' 
                          : ''
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                {bottomItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => handleItemClick(item)}
                      isActive={activeItem === item.id}
                      className={`text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-200 hover:scale-105 ${
                        activeItem === item.id 
                          ? 'bg-purple-600/30 text-white border-r-2 border-purple-400' 
                          : ''
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4">
          <div className="text-xs text-gray-500 text-center">
            © 2024 ResumePro
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* My Library Modal */}
      <Dialog open={isLibraryOpen} onOpenChange={setIsLibraryOpen}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-sm border-purple-500/30 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white flex items-center">
              <FileText className="h-6 w-6 mr-2 text-purple-400" />
              My Resume Library
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Button className="bg-purple-600 hover:bg-purple-700 mb-4">
              <Plus className="h-4 w-4 mr-2" />
              Create New Resume
            </Button>
            <div className="grid md:grid-cols-2 gap-4">
              {resumeLibrary.map((resume) => (
                <Card key={resume.id} className="bg-gray-800/50 border-purple-500/20 hover:scale-105 transition-transform cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{resume.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm mb-2">{resume.description}</p>
                    <p className="text-gray-500 text-xs mb-4">Last modified: {resume.lastModified}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-400">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="border-green-500/30 text-green-400">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Responses Modal */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-sm border-purple-500/30 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white flex items-center">
              <MessageSquare className="h-6 w-6 mr-2 text-purple-400" />
              Chat History
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {chatHistory.map((chat) => (
              <Card key={chat.id} className="bg-gray-800/50 border-purple-500/20 hover:scale-105 transition-transform cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-semibold">{chat.topic}</h3>
                      <p className="text-gray-300 text-sm mt-1">{chat.lastMessage}</p>
                      <p className="text-gray-500 text-xs mt-2">{chat.date}</p>
                    </div>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Bookmarked Paths Modal */}
      <Dialog open={isBookmarksOpen} onOpenChange={setIsBookmarksOpen}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-sm border-purple-500/30 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white flex items-center">
              <Bookmark className="h-6 w-6 mr-2 text-purple-400" />
              Bookmarked Career Paths
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {bookmarkedPaths.map((path) => (
              <Card key={path.id} className="bg-gray-800/50 border-purple-500/20 hover:scale-105 transition-transform">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{path.title}</h3>
                      <p className="text-purple-300">{path.industry}</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-400">
                      View Details
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {path.tags.map((tag, index) => (
                      <span key={index} className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm">{path.insight}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EnhancedSidebar;
