
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useChatHistory } from '@/hooks/useChatHistory';
import AnimatedBackground from '@/components/AnimatedBackground';
import ModernNavigation from '@/components/ModernNavigation';
import CollapsibleSidebar from '@/components/CollapsibleSidebar';
import { MessageSquare, Calendar, User, Bot } from 'lucide-react';

const ChatHistoryPage = () => {
  const { user } = useAuth();
  const { getChatHistory } = useChatHistory();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState<any>(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (user) {
        setLoading(true);
        const history = await getChatHistory();
        setChatHistory(history);
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, [user, getChatHistory]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const groupChatsBySession = (chats: any[]) => {
    const grouped = chats.reduce((acc, chat) => {
      const sessionId = chat.session_id;
      if (!acc[sessionId]) {
        acc[sessionId] = {
          session_id: sessionId,
          messages: [],
          created_at: chat.created_at,
          last_message: ''
        };
      }
      acc[sessionId].messages.push(chat);
      acc[sessionId].last_message = chat.message_content.substring(0, 100) + '...';
      return acc;
    }, {});

    return Object.values(grouped).sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  };

  const groupedChats = groupChatsBySession(chatHistory);

  return (
    <div className="min-h-screen bg-[#060315] relative overflow-hidden">
      <AnimatedBackground />
      <ModernNavigation />
      
      <CollapsibleSidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main Content */}
      <div className="relative z-10 pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              AI Chat History
            </h1>
            <p className="text-purple-300 text-lg">View and continue your conversations with our AI assistant</p>
          </div>
          
          <Tabs defaultValue="all" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 bg-purple-900/20 border border-purple-500/30">
              <TabsTrigger value="all" className="text-white data-[state=active]:bg-purple-600">
                All Conversations
              </TabsTrigger>
              <TabsTrigger value="recent" className="text-white data-[state=active]:bg-purple-600">
                Recent
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-8">
              {loading ? (
                <div className="text-center text-white">Loading your chat history...</div>
              ) : groupedChats.length === 0 ? (
                <Card className="bg-purple-900/20 border-purple-500/30 text-center py-12">
                  <CardContent>
                    <MessageSquare className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Chat History Yet</h3>
                    <p className="text-purple-300 mb-4">Start a conversation with our AI assistant</p>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Start Chatting
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid lg:grid-cols-2 gap-6">
                  {groupedChats.map((session: any) => (
                    <Card 
                      key={session.session_id} 
                      className="bg-purple-900/20 border-purple-500/30 hover:bg-purple-900/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm cursor-pointer"
                      onClick={() => setSelectedChat(session)}
                    >
                      <CardHeader>
                        <CardTitle className="text-white text-lg flex items-center">
                          <MessageSquare className="h-5 w-5 mr-2 text-purple-400" />
                          Chat Session
                        </CardTitle>
                        <div className="flex items-center text-sm text-purple-300">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(session.created_at)}
                          <span className="ml-4 text-xs bg-purple-600/20 px-2 py-1 rounded">
                            {session.messages.length} messages
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 text-sm mb-4">{session.last_message}</p>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                        >
                          View Conversation
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="recent" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-6">
                {groupedChats.slice(0, 4).map((session: any) => (
                  <Card 
                    key={session.session_id} 
                    className="bg-purple-900/20 border-purple-500/30 hover:bg-purple-900/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm cursor-pointer"
                    onClick={() => setSelectedChat(session)}
                  >
                    <CardHeader>
                      <CardTitle className="text-white text-lg flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2 text-purple-400" />
                        Recent Chat
                      </CardTitle>
                      <div className="flex items-center text-sm text-purple-300">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(session.created_at)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-sm mb-4">{session.last_message}</p>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                      >
                        Continue Chat
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Chat Detail Modal */}
      {selectedChat && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E0E0E] rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-hidden border border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Chat Session</h2>
              <Button 
                onClick={() => setSelectedChat(null)}
                variant="outline"
                className="border-gray-600 text-gray-300"
              >
                Close
              </Button>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg p-4 max-h-[500px] overflow-y-auto">
              {selectedChat.messages.map((message: any, index: number) => (
                <div key={index} className="mb-4 flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    message.message_type === 'user' 
                      ? 'bg-purple-600/20 text-purple-400' 
                      : 'bg-blue-600/20 text-blue-400'
                  }`}>
                    {message.message_type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-400 mb-1">
                      {message.message_type === 'user' ? 'You' : 'AI Assistant'} • {formatDate(message.created_at)}
                    </div>
                    <div className="text-white bg-gray-800/50 rounded-lg p-3">
                      {message.message_content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHistoryPage;
