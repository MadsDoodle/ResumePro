import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, Download, Save, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { useCredits } from '@/hooks/useCredits';
import { useResumeStorage } from '@/hooks/useResumeStorage';
import { resumeTemplates, ResumeTemplate } from '@/data/resumeTemplates';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import SummaryForm from '@/components/forms/SummaryForm';
import ExperienceForm from '@/components/forms/ExperienceForm';
import EducationForm from '@/components/forms/EducationForm';
import SkillsForm from '@/components/forms/SkillsForm';
import ResumePreview from '@/components/ResumePreview';
import PageTransition from '@/components/PageTransition';

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate | null>(null);
  const [formData, setFormData] = useState({
    personalInfo: {},
    summary: '',
    experience: [],
    education: [],
    skills: [],
    additionalSections: {}
  });
  const { toast } = useToast();
  const { credits, deductCredit } = useCredits();
  const { saveResumeToDatabase, uploading } = useResumeStorage();

  // Load selected template and initialize form data
  useEffect(() => {
    const savedTemplate = localStorage.getItem('selectedTemplate');
    if (savedTemplate) {
      try {
        const template = JSON.parse(savedTemplate);
        setSelectedTemplate(template);
        // Initialize form data with template structure including additionalSections
        setFormData({
          ...template.structure,
          additionalSections: template.structure.additionalSections || {}
        });
        toast({
          title: "Template Loaded",
          description: `${template.name} template has been applied to your resume.`,
        });
      } catch (error) {
        console.error('Failed to load template:', error);
        // Load default template if parsing fails
        const defaultTemplate = resumeTemplates[0];
        setSelectedTemplate(defaultTemplate);
        setFormData({
          ...defaultTemplate.structure,
          additionalSections: defaultTemplate.structure.additionalSections || {}
        });
      }
    } else {
      // Load default template if none selected
      const defaultTemplate = resumeTemplates[0];
      setSelectedTemplate(defaultTemplate);
      setFormData({
        ...defaultTemplate.structure,
        additionalSections: defaultTemplate.structure.additionalSections || {}
      });
    }
  }, []);

  // Auto-save functionality
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      localStorage.setItem('resumeBuilderData', JSON.stringify(formData));
    }, 1000);

    return () => clearTimeout(saveTimer);
  }, [formData]);

  const steps = [
    {
      title: 'Personal Information',
      component: PersonalInfoForm,
      tip: 'Include your full name, professional email, and phone number. Make sure your email sounds professional.'
    },
    {
      title: 'Professional Summary',
      component: SummaryForm,
      tip: 'Write 2-3 sentences highlighting your key achievements and career goals. Keep it concise and impactful.'
    },
    {
      title: 'Work Experience',
      component: ExperienceForm,
      tip: 'List your most recent job first. Use action verbs and quantify your achievements with numbers when possible.'
    },
    {
      title: 'Education',
      component: EducationForm,
      tip: 'Include your highest degree first. Add relevant coursework, honors, or GPA if it strengthens your application.'
    },
    {
      title: 'Skills & Certifications',
      component: SkillsForm,
      tip: 'Focus on skills relevant to your target job. Group them by category (technical, language, soft skills).'
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection('forward');
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection('backward');
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataUpdate = (stepData: any) => {
    setFormData(prev => ({
      ...prev,
      ...stepData
    }));
  };

  const handleSaveDraft = () => {
    localStorage.setItem('resumeBuilderData', JSON.stringify(formData));
    toast({
      title: "Draft Saved",
      description: "Your resume has been saved locally.",
    });
  };

  const handleDownloadPDF = async () => {
    // Check if user has credits
    if (credits < 1) {
      toast({
        title: "Insufficient Credits",
        description: "You need at least 1 credit to generate a PDF. Please upgrade your plan.",
        variant: "destructive"
      });
      return;
    }

    // Deduct credit for PDF generation
    const creditDeducted = await deductCredit('pdf_generation', 'Resume PDF download');
    if (!creditDeducted) {
      return;
    }

    try {
      // Generate PDF and save to database
      const resumeTitle = (formData.personalInfo as any)?.fullName || 'Resume';
      
      // Save to database with template info
      const resumeDataWithTemplate = {
        ...formData,
        template: selectedTemplate
      };
      
      await saveResumeToDatabase(resumeDataWithTemplate, `${resumeTitle} - ${new Date().toLocaleDateString()}`);

      // Create downloadable file
      const resumeContent = JSON.stringify(resumeDataWithTemplate, null, 2);
      const blob = new Blob([resumeContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeTitle}-resume.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Resume Generated",
        description: "Your resume has been generated and saved to your library.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate resume PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <TooltipProvider>
      <div className="max-w-7xl mx-auto relative">
        {/* Template Info */}
        {selectedTemplate && (
          <div className="mb-6 p-4 rounded-lg border" style={{ 
            borderColor: selectedTemplate.primaryColor + '40',
            backgroundColor: selectedTemplate.primaryColor + '10'
          }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">
                  Using Template: {selectedTemplate.name}
                </h3>
                <p className="text-purple-300 text-sm">
                  {selectedTemplate.layout} • {selectedTemplate.style} • {selectedTemplate.photo}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = '/templates'}
                className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
              >
                Change Template
              </Button>
            </div>
          </div>
        )}

        {/* Credit warning */}
        {credits < 1 && (
          <div className="mb-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">
              ⚠️ You have no credits remaining. Upgrade your plan to continue using ResumePro features.
            </p>
          </div>
        )}

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Resume Builder</h2>
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-slate-300 mb-2">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section with Animation */}
          <div className="space-y-6 relative">
            <PageTransition currentStep={currentStep} direction={direction}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {steps[currentStep].title}
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-purple-400 hover:text-purple-300" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">{steps[currentStep].tip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span className="text-sm font-normal text-slate-300">
                      {currentStep + 1}/{steps.length}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CurrentStepComponent data={formData} onUpdate={handleDataUpdate} />
                </CardContent>
              </Card>
            </PageTransition>

            {/* Navigation */}
            <div className="flex justify-between mt-12">
              <Button 
                variant="outline" 
                onClick={handlePrevious} 
                disabled={currentStep === 0} 
                className="border-white/30 text-zinc-900 bg-zinc-50"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleSaveDraft}
                  className="border-white/30 text-zinc-900 bg-zinc-50"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
                
                {currentStep === steps.length - 1 ? (
                  <Button 
                    onClick={handleDownloadPDF}
                    disabled={uploading}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {uploading ? 'Generating...' : 'Generate PDF'}
                  </Button>
                ) : (
                  <Button 
                    onClick={handleNext} 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Eye className="mr-2 h-5 w-5" />
                  Live Preview
                  <span className="ml-auto text-xs bg-green-600 px-2 py-1 rounded">
                    ATS-Friendly
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResumePreview data={formData} template={selectedTemplate} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ResumeBuilder;
