
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-purple-500/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-purple-600/20 border border-purple-500/30">
            <FileText className="h-6 w-6 text-purple-400" />
          </div>
          <span className="text-xl font-bold text-white">ResumePro</span>
        </div>
        
        <Button 
          onClick={handleAuthAction}
          variant="outline"
          className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400"
        >
          {user ? 'Sign Out' : 'Sign In / Sign Up'}
        </Button>
      </div>
    </header>
  );
};

export default Header;
