
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface TermsModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

const TermsModal = ({ isOpen, onAccept }: TermsModalProps) => {
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleAccept = async () => {
    if (!user || !accepted) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_settings')
        .update({ 
          terms_accepted: true,
          last_login: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Terms Accepted",
        description: "Welcome to ResumePro! You're ready to get started.",
      });

      onAccept();
    } catch (error) {
      console.error('Error accepting terms:', error);
      toast({
        title: "Error",
        description: "Failed to accept terms. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="bg-black/95 backdrop-blur-xl border-purple-500/30 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-purple-400">
            Terms & Conditions
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-96 w-full rounded border border-purple-500/20 p-4">
          <div className="space-y-4 text-gray-300">
            <h3 className="text-lg font-semibold text-white">1. Acceptance of Terms</h3>
            <p>By using ResumePro, you agree to be bound by these Terms & Conditions.</p>
            
            <h3 className="text-lg font-semibold text-white">2. Credit System</h3>
            <p>
              ResumePro operates on a credit-based system. Each action (resume generation, analysis, etc.) 
              consumes credits. New users receive 50 free credits to get started.
            </p>
            
            <h3 className="text-lg font-semibold text-white">3. Data Privacy</h3>
            <p>
              We respect your privacy and protect your personal information. Your resume data is stored 
              securely and is only accessible to you.
            </p>
            
            <h3 className="text-lg font-semibold text-white">4. Service Availability</h3>
            <p>
              We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. We reserve 
              the right to perform maintenance as needed.
            </p>
            
            <h3 className="text-lg font-semibold text-white">5. User Responsibilities</h3>
            <p>
              Users are responsible for maintaining the confidentiality of their account credentials and 
              for all activities under their account.
            </p>
            
            <h3 className="text-lg font-semibold text-white">6. Limitation of Liability</h3>
            <p>
              ResumePro shall not be liable for any indirect, incidental, special, or consequential damages 
              resulting from your use of the service.
            </p>
          </div>
        </ScrollArea>
        
        <div className="flex items-center space-x-2 py-4">
          <Checkbox 
            id="terms" 
            checked={accepted}
            onCheckedChange={(checked) => setAccepted(checked === true)}
            className="border-purple-500/30"
          />
          <label htmlFor="terms" className="text-sm text-gray-300 cursor-pointer">
            I have read and agree to the Terms & Conditions
          </label>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleAccept}
            disabled={!accepted || loading}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            {loading ? 'Processing...' : 'Accept & Continue'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TermsModal;
