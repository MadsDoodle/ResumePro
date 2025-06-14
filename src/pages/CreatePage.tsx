
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

const CreatePage = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // Redirect to template selection when this page loads
  useEffect(() => {
    navigate('/templates');
  }, [navigate]);

  // This component will briefly show before redirecting
  return (
    <div className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e]' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    }`}>
      <div className={`transition-colors duration-300 ${
        isDark ? 'text-purple-400' : 'text-blue-600'
      }`}>Redirecting to template selection...</div>
    </div>
  );
};

export default CreatePage;
