
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Download, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import SummaryForm from '@/components/forms/SummaryForm';
import ExperienceForm from '@/components/forms/ExperienceForm';
import EducationForm from '@/components/forms/EducationForm';
import SkillsForm from '@/components/forms/SkillsForm';
import ResumePreview from '@/components/ResumePreview';

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: {},
    summary: '',
    experience: [],
    education: [],
    skills: [],
    additionalSections: {}
  });

  const steps = [
    { title: 'Personal Information', component: PersonalInfoForm },
    { title: 'Professional Summary', component: SummaryForm },
    { title: 'Work Experience', component: ExperienceForm },
    { title: 'Education', component: EducationForm },
    { title: 'Skills & Certifications', component: SkillsForm },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataUpdate = (stepData: any) => {
    setFormData(prev => ({
      ...prev,
      ...stepData
    }));
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="max-w-7xl mx-auto">
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
        {/* Form Section */}
        <div className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                {steps[currentStep].title}
                <span className="text-sm font-normal text-slate-300">
                  {currentStep + 1}/{steps.length}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CurrentStepComponent 
                data={formData}
                onUpdate={handleDataUpdate}
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="border-white/30 text-white hover:bg-white/10"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              
              {currentStep === steps.length - 1 ? (
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <Download className="mr-2 h-4 w-4" />
                  Generate PDF
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
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResumePreview data={formData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
