
import { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import ModernNavigation from '@/components/ModernNavigation';
import CollapsibleSidebar from '@/components/CollapsibleSidebar';
import ProfileSection from '@/components/ProfileSection';

const ProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#060315] relative overflow-hidden">
      <AnimatedBackground />
      <ModernNavigation />
      
      <CollapsibleSidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="relative z-10 pt-8">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">User Profile</h1>
          <ProfileSection />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
