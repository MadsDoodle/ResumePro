
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Bot, User, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface ChatHistoryModalProps {
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  message_content: string;
  message_type: 'user' | 'ai';
  created_at: string;
  conversation_id: string;
}

interface Conversation {
  id: string;
  messages: ChatMessage[];
  lastMessage: string;
  lastTimestamp: string;
}

const ChatHistoryModal = ({ onClose }: ChatHistoryModalProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchChatHistory();
  }, [user]);

  const fetchChatHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group messages by conversation_id
      const groupedMessages = (data || []).reduce((acc: Record<string, ChatMessage[]>, message: any) => {
        if (!acc[message.conversation_id]) {
          acc[message.conversation_id] = [];
        }
        acc[message.conversation_id].push(message);
        return acc;
      }, {});

      // Convert to conversation format
      const conversationsList: Conversation[] = Object.entries(groupedMessages).map(([conversationId, messages]) => {
        const sortedMessages = messages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        const lastMessage = sortedMessages[sortedMessages.length - 1];
        
        return {
          id: conversationId,
          messages: sortedMessages,
          lastMessage: lastMessage.message_content.substring(0, 100) + (lastMessage.message_content.length > 100 ? '...' : ''),
          lastTimestamp: lastMessage.created_at
        };
      });

      setConversations(conversationsList.sort((a, b) => new Date(b.lastTimestamp).getTime() - new Date(a.lastTimestamp).getTime()));
    } catch (error) {
      console.error('Error fetching chat history:', error);
      toast({
        title: "Error",
        description: "Failed to load chat history",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConversation = async (conversationId: string) => {
    try {
      const { error } = await supabase
        .from('chat_history')
        .delete()
        .eq('conversation_id', conversationId);

      if (error) throw error;

      setConversations(prev => prev.filter(c => c.id !== conversationId));
      if (selectedConversation === conversationId) {
        setSelectedConversation(null);
      }

      toast({
        title: "Success",
        description: "Conversation deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete conversation",
        variant: "destructive"
      });
    }
  };

  const selectedMessages = selectedConversation 
    ? conversations.find(c => c.id === selectedConversation)?.messages || []
    : [];

  return (
    <div className="flex h-[60vh]">
      {/* Conversations Sidebar */}
      <div className="w-1/3 border-r border-purple-500/20 pr-4">
        <h3 className="text-white font-medium mb-4">Chat Conversations</h3>
        {loading ? (
          <div className="text-gray-400 text-center py-4">Loading...</div>
        ) : conversations.length === 0 ? (
          <div className="text-gray-400 text-center py-4">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No chat history found</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-full overflow-y-auto">
            {conversations.map((conversation) => (
              <Card
                key={conversation.id}
                className={`cursor-pointer transition-all ${
                  selectedConversation === conversation.id
                    ? 'bg-purple-600/30 border-purple-500/50'
                    : 'bg-gray-800/30 border-purple-500/20 hover:border-purple-500/40'
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-white text-sm line-clamp-2">{conversation.lastMessage}</p>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteConversation(conversation.id);
                      }}
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-gray-400 text-xs">
                    {new Date(conversation.lastTimestamp).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div className="w-2/3 pl-4">
        {selectedConversation ? (
          <div className="h-full flex flex-col">
            <h3 className="text-white font-medium mb-4">Chat Messages</h3>
            <div className="flex-1 overflow-y-auto space-y-3">
              {selectedMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.message_type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.message_type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-purple-900/30 border border-purple-500/20 text-white'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.message_type === 'ai' ? (
                        <Bot className="h-4 w-4 mt-1 flex-shrink-0 text-purple-400" />
                      ) : (
                        <User className="h-4 w-4 mt-1 flex-shrink-0" />
                      )}
                      <div>
                        <p className="text-sm">{message.message_content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(message.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select a conversation to view messages</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHistoryModal;
