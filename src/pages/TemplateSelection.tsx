
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
import { resumeTemplates, ResumeTemplate } from '@/data/resumeTemplates';
import TemplatePreview from '@/components/TemplatePreview';

const TemplateSelection = () => {
  const navigate = useNavigate();
  const [previewTemplate, setPreviewTemplate] = useState<ResumeTemplate | null>(null);
  const [filters, setFilters] = useState({
    layout: 'all',
    photo: 'all',
    style: 'all'
  });

  const filteredTemplates = resumeTemplates.filter(template => {
    return (filters.layout === 'all' || template.layout === filters.layout) &&
           (filters.photo === 'all' || template.photo === filters.photo) &&
           (filters.style === 'all' || template.style === filters.style);
  });

  const handleChooseTemplate = (template: ResumeTemplate) => {
    // Save the selected template to localStorage
    localStorage.setItem('selectedTemplate', JSON.stringify(template));
    // Navigate to create page where ResumeBuilder will load the template
    navigate('/create');
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <TemplatePreview template={template} />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewTemplate(template)}
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
                    onClick={() => handleChooseTemplate(template)}
                    className="w-full bg-gradient-to-r hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300 hover:shadow-lg"
                    style={{ 
                      background: `linear-gradient(to right, ${template.primaryColor}, ${template.secondaryColor})`,
                      boxShadow: `0 4px 20px ${template.primaryColor}30`
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
      
      {/* Full Preview Modal */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-purple-900/20 border-purple-500/30 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{previewTemplate?.name} - Full Preview</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (previewTemplate) {
                    handleChooseTemplate(previewTemplate);
                  }
                }}
                className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
              >
                Use This Template
              </Button>
            </DialogTitle>
          </DialogHeader>
          {previewTemplate && (
            <div className="mt-4">
              <TemplatePreview template={previewTemplate} isFullPreview={true} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplateSelection;
