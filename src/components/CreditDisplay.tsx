
import { useCredits } from '@/hooks/useCredits';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins } from 'lucide-react';

const CreditDisplay = () => {
  const { credits, currentPlan, loading } = useCredits();

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-purple-400">
        <Coins className="h-5 w-5 animate-pulse" />
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  return (
    <Card className="bg-purple-900/20 border-purple-500/30 px-3 py-2">
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Coins className="h-5 w-5 text-yellow-400 animate-pulse" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-semibold text-sm">{credits}</span>
          <Badge 
            variant="secondary" 
            className="text-xs bg-purple-600/30 text-purple-300 border-purple-500/20"
          >
            {currentPlan}
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default CreditDisplay;
