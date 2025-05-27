
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
import { FileText, MessageSquare, Bookmark, User, Settings, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppSidebar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('dashboard');

  const mainItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      url: '/dashboard',
      icon: Home,
    },
    {
      id: 'library',
      title: 'My Library',
      url: '/library',
      icon: FileText,
    },
    {
      id: 'chat',
      title: 'Chat Responses',
      url: '/chat-history',
      icon: MessageSquare,
    },
    {
      id: 'bookmarks',
      title: 'Bookmarked Paths',
      url: '/bookmarks',
      icon: Bookmark,
    },
  ];

  const bottomItems = [
    {
      id: 'profile',
      title: 'Profile',
      url: '/profile',
      icon: User,
    },
    {
      id: 'settings',
      title: 'Settings',
      url: '/settings',
      icon: Settings,
    },
  ];

  const handleItemClick = (item: any) => {
    setActiveItem(item.id);
    if (item.url === '/dashboard') {
      navigate('/dashboard');
    } else {
      // For now, just stay on dashboard for other items
      console.log(`Navigate to ${item.url}`);
    }
  };

  return (
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
                    className={`text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-200 ${
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
                    className={`text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-200 ${
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
  );
};

export default AppSidebar;
