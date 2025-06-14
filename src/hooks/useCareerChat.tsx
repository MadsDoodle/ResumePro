
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: Date;
}

export const useCareerChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (message: string, conversationHistory: Message[] = []): Promise<string | null> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('career-chat', {
        body: { 
          message,
          conversationHistory: conversationHistory.slice(-10) // Keep last 10 messages for context
        }
      });

      if (error) {
        throw error;
      }

      return data.response;
    } catch (error) {
      console.error('Error sending message to career coach:', error);
      toast({
        title: "Error",
        description: "Failed to get response from career coach. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendMessage,
    isLoading
  };
};
