
import { useState } from 'react';
import { User, LogOut, Settings, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useCredits } from '@/hooks/useCredits';
import { useNavigate } from 'react-router-dom';

const ProfileSection = () => {
  const { user, signOut } = useAuth();
  const { credits, currentPlan } = useCredits();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="space-y-6">
      <Card className="bg-purple-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <User className="h-5 w-5 mr-2" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Full Name</label>
            <p className="text-white">{user?.user_metadata?.full_name || 'Not provided'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <p className="text-white">{user?.email}</p>
          </div>
          <div>
            <label className="text-sm text-gray-400">Current Plan</label>
            <p className="text-purple-400 font-medium">{currentPlan}</p>
          </div>
          <div>
            <label className="text-sm text-gray-400">Credits Remaining</label>
            <p className="text-yellow-400 font-medium">{credits} 🪙</p>
          </div>
          <div>
            <label className="text-sm text-gray-400">Member Since</label>
            <p className="text-white">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-purple-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Account Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
            onClick={() => navigate('/pricing')}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Upgrade Plan
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSection;
