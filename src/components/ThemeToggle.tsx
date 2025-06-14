
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={`relative overflow-hidden transition-all duration-300 h-9 w-9 ${
        isDark 
          ? 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400' 
          : 'border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400'
      }`}
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
};

export default ThemeToggle;
