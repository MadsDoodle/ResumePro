
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  action?: () => void;
}

interface SidebarMenuProps {
  items: MenuItem[];
  activeItem: string;
  onItemClick: (item: MenuItem) => void;
  label: string;
}

const SidebarMenuComponent = ({ items, activeItem, onItemClick, label }: SidebarMenuProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-purple-300 text-sm font-medium px-2 mb-2">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton 
                onClick={() => onItemClick(item)}
                isActive={activeItem === item.id}
                className={`text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-300 hover:scale-105 ${
                  activeItem === item.id ? 'bg-purple-600/30 text-white border-r-2 border-purple-400' : ''
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
  );
};

export default SidebarMenuComponent;
