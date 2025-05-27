
import { Card } from '@/components/ui/card';
import { Upload, FileText, Download, ArrowRight } from 'lucide-react';

const ProcessFlow = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Resume",
      description: "Upload your existing resume or start from scratch"
    },
    {
      icon: FileText,
      title: "AI Analysis",
      description: "Our AI analyzes and provides improvement suggestions"
    },
    {
      icon: FileText,
      title: "Create & Edit",
      description: "Use our templates and editor to perfect your resume"
    },
    {
      icon: Download,
      title: "Download",
      description: "Export your professional resume in multiple formats"
    }
  ];

  return (
    <section className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-purple-300 text-lg">Simple steps to create your perfect resume</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <Card className="bg-purple-900/20 border-purple-500/30 p-6 text-center hover:bg-purple-900/30 transition-all duration-300 w-64">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-purple-600/20 border border-purple-500/30">
                    <step.icon className="h-8 w-8 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-purple-300 text-sm">{step.description}</p>
              </Card>
              
              {index < steps.length - 1 && (
                <ArrowRight className="h-6 w-6 text-purple-400 mx-4 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;
