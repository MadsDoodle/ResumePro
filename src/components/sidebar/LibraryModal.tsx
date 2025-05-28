
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Plus, Edit, Download } from 'lucide-react';

interface Resume {
  id: number;
  title: string;
  description: string;
  lastModified: string;
}

interface LibraryModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  resumeLibrary: Resume[];
}

const LibraryModal = ({ isOpen, onOpenChange, resumeLibrary }: LibraryModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/70 backdrop-blur-xl border-purple-500/30 text-white max-w-4xl animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center">
            <FileText className="h-6 w-6 mr-2 text-purple-400" />
            My Resume Library
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Button className="bg-purple-600 hover:bg-purple-700 mb-4 transition-all duration-300 hover:scale-105">
            <Plus className="h-4 w-4 mr-2" />
            Create New Resume
          </Button>
          <div className="grid md:grid-cols-2 gap-4">
            {resumeLibrary.map((resume) => (
              <Card key={resume.id} className="bg-gray-800/50 border-purple-500/20 hover:scale-105 transition-all duration-300 cursor-pointer backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-lg">{resume.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-2">{resume.description}</p>
                  <p className="text-gray-500 text-xs mb-4">Last modified: {resume.lastModified}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 transition-all duration-300">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="border-green-500/30 text-green-400 hover:bg-green-500/10 transition-all duration-300">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LibraryModal;
