
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

interface ChatHistory {
  id: number;
  topic: string;
  date: string;
  lastMessage: string;
}

interface ChatModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  chatHistory: ChatHistory[];
}

const ChatModal = ({ isOpen, onOpenChange, chatHistory }: ChatModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/70 backdrop-blur-xl border-purple-500/30 text-white max-w-4xl animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center">
            <MessageSquare className="h-6 w-6 mr-2 text-purple-400" />
            Chat History
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {chatHistory.map((chat) => (
            <Card key={chat.id} className="bg-gray-800/50 border-purple-500/20 hover:scale-105 transition-all duration-300 cursor-pointer backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-semibold">{chat.topic}</h3>
                    <p className="text-gray-300 text-sm mt-1">{chat.lastMessage}</p>
                    <p className="text-gray-500 text-xs mt-2">{chat.date}</p>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:scale-105">
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
