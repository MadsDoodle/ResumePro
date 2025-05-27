
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm here to help you with your resume and career questions! How can I assist you today?",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="relative">
      {/* Purple halo effect */}
      <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-3xl -z-10"></div>
      
      <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm h-[500px] flex flex-col">
        <CardContent className="flex flex-col h-full p-4">
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
            {messages.length === 0 && (
              <div className="text-center text-purple-300 py-12">
                <Bot className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                <p>Start a conversation about your career goals!</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-100'
                  } animate-fade-in`}
                >
                  <div className="flex items-start gap-2">
                    {message.role === 'assistant' && (
                      <Bot className="h-4 w-4 mt-0.5 text-purple-400 flex-shrink-0" />
                    )}
                    {message.role === 'user' && (
                      <User className="h-4 w-4 mt-0.5 text-white flex-shrink-0" />
                    )}
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  </div>
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-100 rounded-lg p-3 animate-pulse">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-purple-400" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about resume tips, career advice, or anything else..."
              className="flex-1 min-h-[60px] max-h-[120px] bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 resize-none"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 self-end"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBox;
