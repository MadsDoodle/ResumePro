
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useCareerChat } from '@/hooks/useCareerChat';
import { 
  MessageSquare, 
  X, 
  Send, 
  Trash2, 
  Bot, 
  User,
  Minimize2,
  Maximize2,
  Copy,
  Bookmark,
  Briefcase,
  TrendingUp,
  FileText
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatInterface = ({ isOpen, onClose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI Career Coach. I'm here to help you advance your career, improve your resume, and explore new opportunities. What would you like to work on today?",
      isAI: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [conversationId] = useState(() => crypto.randomUUID());
  const [sessionId] = useState(() => crypto.randomUUID());
  const [typingText, setTypingText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(true);
  
  const { user } = useAuth();
  const { toast } = useToast();
  const { sendMessage: sendCareerMessage, isLoading } = useCareerChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    { icon: Briefcase, text: "Show me career options", color: "text-blue-400" },
    { icon: TrendingUp, text: "Suggest skills for AI roles", color: "text-green-400" },
    { icon: FileText, text: "Improve this resume section", color: "text-purple-400" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Typing animation effect
  const typeMessage = (text: string, messageId: string) => {
    setIsTypingComplete(false);
    setTypingText('');
    let currentText = '';
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        currentText += text[index];
        setTypingText(currentText);
        index++;
      } else {
        clearInterval(typeInterval);
        setIsTypingComplete(true);
        // Update the actual message content
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, content: text } : msg
        ));
        setTypingText('');
      }
    }, 30);
  };

  const saveChatMessage = async (content: string, isAI: boolean) => {
    if (!user) return;

    try {
      await supabase
        .from('chat_history')
        .insert({
          user_id: user.id,
          conversation_id: conversationId,
          session_id: sessionId,
          message_content: content,
          message_type: isAI ? 'ai' : 'user'
        });
    } catch (error) {
      console.error('Error saving chat message:', error);
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const messageToSend = messageText || input.trim();
    if (!messageToSend || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: messageToSend,
      isAI: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    await saveChatMessage(userMessage.content, false);
    setInput('');

    // Send to career coach
    const response = await sendCareerMessage(messageToSend, messages);
    
    if (response) {
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        content: '', // Will be filled by typing animation
        isAI: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      typeMessage(response, aiMessage.id);
      await saveChatMessage(response, true);
    }
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInput(suggestion);
    handleSendMessage(suggestion);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: "Message copied to clipboard"
    });
  };

  const bookmarkMessage = async (content: string) => {
    // This would integrate with a bookmarks system
    toast({
      title: "Bookmarked!",
      description: "Message saved to your bookmarks"
    });
  };

  const clearConversation = async () => {
    setMessages([{
      id: '1',
      content: "Hello! I'm your AI Career Coach. I'm here to help you advance your career, improve your resume, and explore new opportunities. What would you like to work on today?",
      isAI: true,
      timestamp: new Date()
    }]);
    
    if (user) {
      try {
        await supabase
          .from('chat_history')
          .delete()
          .eq('conversation_id', conversationId)
          .eq('user_id', user.id);
        
        toast({
          title: "Success",
          description: "Conversation cleared successfully"
        });
      } catch (error) {
        console.error('Error clearing conversation:', error);
        toast({
          title: "Error",
          description: "Failed to clear conversation",
          variant: "destructive"
        });
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`fixed right-0 top-0 h-full bg-[#0E0E0E]/95 backdrop-blur-sm border-l border-purple-500/20 z-50 shadow-2xl ${
          isMinimized ? 'w-80' : 'w-[28rem]'
        }`}
      >
        <Card className="h-full bg-transparent border-none shadow-none">
          <CardHeader className="border-b border-purple-500/20 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-purple-400" />
                AI Career Coach
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setIsMinimized(!isMinimized)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  onClick={clearConversation}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="flex flex-col h-[calc(100vh-100px)] p-0">
              {/* Quick Suggestions */}
              <div className="p-4 border-b border-purple-500/10">
                <p className="text-purple-300 text-sm mb-3">Quick suggestions:</p>
                <div className="space-y-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickSuggestion(suggestion.text)}
                      className="w-full justify-start border-purple-500/20 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 text-xs h-8"
                    >
                      <suggestion.icon className={`h-3 w-3 mr-2 ${suggestion.color}`} />
                      {suggestion.text}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-4 py-3 group relative ${
                        message.isAI
                          ? 'bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/30 text-white'
                          : 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.isAI ? (
                          <Bot className="h-4 w-4 mt-1 flex-shrink-0 text-purple-400" />
                        ) : (
                          <User className="h-4 w-4 mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <div className="text-sm leading-relaxed">
                            {index === messages.length - 1 && message.isAI && !isTypingComplete && typingText ? (
                              <span>{typingText}<span className="animate-pulse">|</span></span>
                            ) : (
                              message.content
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <p className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                            {message.isAI && (
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  onClick={() => copyMessage(message.content)}
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-purple-300 hover:text-white"
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                                <Button
                                  onClick={() => bookmarkMessage(message.content)}
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-purple-300 hover:text-white"
                                >
                                  <Bookmark className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/30 rounded-lg px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 text-purple-400" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Container */}
              <div className="border-t border-purple-500/20 p-4">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about your career goals..."
                    className="flex-1 bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Powered by GPT-4o-mini • Career coaching & resume advice
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatInterface;
