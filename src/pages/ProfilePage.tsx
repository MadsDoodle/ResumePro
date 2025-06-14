
import { useState } from 'react';
import ModernNavigation from '@/components/ModernNavigation';
import CollapsibleSidebar from '@/components/CollapsibleSidebar';
import ProfileSection from '@/components/ProfileSection';
import { useTheme } from '@/contexts/ThemeContext';

const ProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e]' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    }`}>
      <ModernNavigation />
      
      <CollapsibleSidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="relative z-10 pt-8">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className={`text-4xl font-bold mb-8 text-center transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>User Profile</h1>
          <ProfileSection />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
