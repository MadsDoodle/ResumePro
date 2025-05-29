
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export interface UserCredits {
  credits: number;
  currentPlan: string;
  lastCreditReset: string;
}

export function useCredits() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [credits, setCredits] = useState<number>(0);
  const [currentPlan, setCurrentPlan] = useState<string>('Free');
  const [loading, setLoading] = useState(true);

  // Fetch user credits
  const fetchCredits = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('credits, current_plan, last_credit_reset')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setCredits(data.credits || 0);
        setCurrentPlan(data.current_plan || 'Free');
      }
    } catch (error) {
      console.error('Error fetching credits:', error);
    } finally {
      setLoading(false);
    }
  };

  // Deduct credits for an action
  const deductCredit = async (actionType: string, description?: string) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase.rpc('deduct_credit', {
        p_user_id: user.id,
        p_action_type: actionType,
        p_description: description
      });

      if (error) throw error;

      if (data) {
        setCredits(prev => Math.max(0, prev - 1));
        toast({
          title: "Credit Used",
          description: `1 credit deducted. ${Math.max(0, credits - 1)} credits remaining.`,
        });
        return true;
      } else {
        toast({
          title: "Insufficient Credits",
          description: "You don't have enough credits for this action. Please upgrade your plan.",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error('Error deducting credit:', error);
      toast({
        title: "Error",
        description: "Failed to process credit deduction.",
        variant: "destructive"
      });
      return false;
    }
  };

  // Check if user has credits
  const hasCredits = async () => {
    if (!user) return false;

    try {
      const { data, error } = await supabase.rpc('has_credits', {
        p_user_id: user.id
      });

      if (error) throw error;
      return data || false;
    } catch (error) {
      console.error('Error checking credits:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchCredits();
  }, [user]);

  return {
    credits,
    currentPlan,
    loading,
    deductCredit,
    hasCredits,
    refreshCredits: fetchCredits
  };
}
