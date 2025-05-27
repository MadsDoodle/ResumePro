
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import { Eye, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const TemplateSelection = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    layout: 'all',
    photo: 'all',
    style: 'all',
    color: '#8B5CF6'
  });

  const templates = [
    {
      id: 'modern-1',
      name: 'Modern Professional',
      layout: '2-column',
      photo: 'without',
      style: 'modern',
      isRecommended: true,
      preview: '/placeholder.svg'
    },
    {
      id: 'classic-1',
      name: 'Classic Executive',
      layout: '1-column',
      photo: 'with',
      style: 'classic',
      isRecommended: false,
      preview: '/placeholder.svg'
    },
    {
      id: 'creative-1',
      name: 'Creative Designer',
      layout: '2-column',
      photo: 'with',
      style: 'creative',
      isRecommended: true,
      preview: '/placeholder.svg'
    },
    {
      id: 'modern-2',
      name: 'Minimal Clean',
      layout: '1-column',
      photo: 'without',
      style: 'modern',
      isRecommended: false,
      preview: '/placeholder.svg'
    },
    {
      id: 'creative-2',
      name: 'Bold Creative',
      layout: '2-column',
      photo: 'without',
      style: 'creative',
      isRecommended: false,
      preview: '/placeholder.svg'
    },
    {
      id: 'classic-2',
      name: 'Traditional Format',
      layout: '1-column',
      photo: 'without',
      style: 'classic',
      isRecommended: false,
      preview: '/placeholder.svg'
    }
  ];

  const colorOptions = [
    '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#6366F1', '#14B8A6'
  ];

  const filteredTemplates = templates.filter(template => {
    return (filters.layout === 'all' || template.layout === filters.layout) &&
           (filters.photo === 'all' || template.photo === filters.photo) &&
           (filters.style === 'all' || template.style === filters.style);
  });

  const handleChooseTemplate = (templateId: string) => {
    localStorage.setItem('selectedTemplate', templateId);
    navigate('/resume-builder');
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <AnimatedBackground />
      <Header />
      
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Templates recommended for you</h1>
            <p className="text-purple-300 text-lg">You can always change your template later</p>
          </div>
          
          {/* Filter Section */}
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Layout</label>
                <Select value={filters.layout} onValueChange={(value) => setFilters(prev => ({ ...prev, layout: value }))}>
                  <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Layouts</SelectItem>
                    <SelectItem value="1-column">1 Column</SelectItem>
                    <SelectItem value="2-column">2 Column</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Photo</label>
                <Select value={filters.photo} onValueChange={(value) => setFilters(prev => ({ ...prev, photo: value }))}>
                  <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="with">With Photo</SelectItem>
                    <SelectItem value="without">Without Photo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Style</label>
                <Select value={filters.style} onValueChange={(value) => setFilters(prev => ({ ...prev, style: value }))}>
                  <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Styles</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Theme Color</label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setFilters(prev => ({ ...prev, color }))}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                        filters.color === color 
                          ? 'border-white scale-110 shadow-lg' 
                          : 'border-purple-500/30 hover:border-white/50'
                      }`}
                      style={{ 
                        backgroundColor: color,
                        boxShadow: filters.color === color ? `0 0 20px ${color}50` : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <Card 
                key={template.id}
                className="bg-purple-900/20 border-purple-500/30 hover:bg-purple-900/30 transition-all duration-300 hover:scale-[1.02] group overflow-hidden"
              >
                <div className="relative">
                  {template.isRecommended && (
                    <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                      Recommended
                    </Badge>
                  )}
                  
                  {/* Template Preview */}
                  <div className="aspect-[1.4/1] bg-gradient-to-br from-purple-900/30 to-purple-700/20 p-6 relative overflow-hidden">
                    <div className="w-full h-full bg-white rounded-lg shadow-lg p-4 relative">
                      {/* Mock resume content */}
                      <div className="h-3 bg-gray-300 rounded mb-2" style={{ backgroundColor: filters.color, opacity: 0.8 }}></div>
                      <div className="space-y-1 mb-4">
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-1.5 bg-gray-100 rounded"></div>
                        <div className="h-1.5 bg-gray-100 rounded w-5/6"></div>
                        <div className="h-1.5 bg-gray-100 rounded w-4/5"></div>
                      </div>
                      
                      {template.photo === 'with' && (
                        <div className="absolute top-4 right-4 w-12 h-12 bg-gray-300 rounded-full"></div>
                      )}
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewTemplate(template.id)}
                        className="border-white text-white hover:bg-white hover:text-black"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold text-lg mb-2">{template.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="text-purple-300 border-purple-500/30">
                      {template.layout}
                    </Badge>
                    <Badge variant="outline" className="text-purple-300 border-purple-500/30">
                      {template.style}
                    </Badge>
                    <Badge variant="outline" className="text-purple-300 border-purple-500/30">
                      {template.photo}
                    </Badge>
                  </div>
                  <Button 
                    onClick={() => handleChooseTemplate(template.id)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300 hover:shadow-lg"
                    style={{ 
                      boxShadow: `0 4px 20px ${filters.color}30`
                    }}
                  >
                    Choose Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Preview Modal */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-4xl bg-purple-900/20 border-purple-500/30 text-white">
          <DialogHeader>
            <DialogTitle>Template Preview</DialogTitle>
          </DialogHeader>
          <div className="aspect-[1.4/1] bg-white rounded-lg p-8">
            <p className="text-black text-center">Full template preview would be displayed here</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplateSelection;
