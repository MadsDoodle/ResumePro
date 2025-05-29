
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UpgradeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpgradeModal = ({ isOpen, onOpenChange }: UpgradeModalProps) => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      credits: 10,
      features: ['10 credits/month', 'Basic templates', 'Email support']
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      credits: 50,
      features: ['50 credits/month', 'Premium templates', 'Priority support', 'Advanced analytics']
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      credits: 'Unlimited',
      features: ['Unlimited credits', 'Custom templates', '24/7 support', 'Team management']
    }
  ];

  const handleUpgrade = (planName: string) => {
    onOpenChange(false);
    navigate('/pricing');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/95 backdrop-blur-xl border-purple-500/30 text-white max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-purple-400 flex items-center justify-center gap-2">
            <Coins className="h-6 w-6 text-yellow-400" />
            Upgrade Your Plan
          </DialogTitle>
          <p className="text-center text-gray-300 mt-2">
            You've run out of credits! Choose a plan to continue using ResumePro.
          </p>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-6 py-6">
          {plans.map((plan) => (
            <Card key={plan.name} className="bg-purple-900/20 border-purple-500/30 hover:scale-105 transition-transform">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold text-purple-400">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <Badge variant="secondary" className="bg-yellow-600/20 text-yellow-400 border-yellow-500/20">
                  <Coins className="h-3 w-3 mr-1" />
                  {plan.credits} credits
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-300">
                      <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => handleUpgrade(plan.name)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <DialogFooter className="justify-center">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-purple-500/30 text-purple-400">
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeModal;
