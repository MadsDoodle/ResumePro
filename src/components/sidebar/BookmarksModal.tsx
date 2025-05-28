
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bookmark } from 'lucide-react';

interface BookmarkedPath {
  id: number;
  title: string;
  industry: string;
  tags: string[];
  insight: string;
}

interface BookmarksModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  bookmarkedPaths: BookmarkedPath[];
}

const BookmarksModal = ({ isOpen, onOpenChange, bookmarkedPaths }: BookmarksModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/70 backdrop-blur-xl border-purple-500/30 text-white max-w-4xl animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center">
            <Bookmark className="h-6 w-6 mr-2 text-purple-400" />
            Bookmarked Career Paths
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {bookmarkedPaths.map((path) => (
            <Card key={path.id} className="bg-gray-800/50 border-purple-500/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{path.title}</h3>
                    <p className="text-purple-300">{path.industry}</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 transition-all duration-300">
                    View Details
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {path.tags.map((tag, index) => (
                    <span key={index} className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 text-sm">{path.insight}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookmarksModal;
