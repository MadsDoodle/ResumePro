
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'ai';
  timestamp: string;
  conversationId: string;
  sessionId: string;
}

export function useChatHistory() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const saveMessage = async (
    content: string, 
    type: 'user' | 'ai', 
    conversationId: string,
    sessionId: string
  ) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chat_history')
        .insert({
          user_id: user.id,
          message_content: content,
          message_type: type,
          conversation_id: conversationId,
          session_id: sessionId
        })
        .select()
        .single();

      if (error) throw error;

      const newMessage: ChatMessage = {
        id: data.id,
        content: data.message_content,
        type: data.message_type as 'user' | 'ai',
        timestamp: data.created_at,
        conversationId: data.conversation_id,
        sessionId: data.session_id
      };

      setMessages(prev => [...prev, newMessage]);
      return data;
    } catch (error) {
      console.error('Error saving message:', error);
      return null;
    }
  };

  const loadChatHistory = async (conversationId?: string) => {
    if (!user) return;

    setLoading(true);
    try {
      let query = supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (conversationId) {
        query = query.eq('conversation_id', conversationId);
      }

      const { data, error } = await query;

      if (error) throw error;

      const chatMessages: ChatMessage[] = data.map(msg => ({
        id: msg.id,
        content: msg.message_content,
        type: msg.message_type as 'user' | 'ai',
        timestamp: msg.created_at,
        conversationId: msg.conversation_id,
        sessionId: msg.session_id
      }));

      setMessages(chatMessages);
    } catch (error) {
      console.error('Error loading chat history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getConversations = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('conversation_id, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group by conversation_id and get latest timestamp
      const conversations = data.reduce((acc: any[], msg) => {
        const existing = acc.find(conv => conv.conversation_id === msg.conversation_id);
        if (!existing) {
          acc.push({
            conversation_id: msg.conversation_id,
            last_activity: msg.created_at
          });
        }
        return acc;
      }, []);

      return conversations;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }
  };

  return {
    messages,
    loading,
    saveMessage,
    loadChatHistory,
    getConversations,
    clearMessages: () => setMessages([])
  };
}
