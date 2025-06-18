
import { useState, useEffect } from 'react';
import { MousePointer2, User, Briefcase, GraduationCap, Award, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AnimatedResumeDemo = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const sections = [
    { id: 'header', name: 'Personal Info', x: 50, y: 15, icon: User },
    { id: 'summary', name: 'Summary', x: 50, y: 30, icon: Award },
    { id: 'experience', name: 'Experience', x: 50, y: 50, icon: Briefcase },
    { id: 'education', name: 'Education', x: 50, y: 70, icon: GraduationCap },
    { id: 'skills', name: 'Skills', x: 50, y: 85, icon: Award }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSection((prev) => {
        const next = (prev + 1) % sections.length;
        const section = sections[next];
        setMousePosition({ x: section.x, y: section.y });
        setIsHovering(true);
        
        // Remove hover effect after a delay
        setTimeout(() => setIsHovering(false), 1000);
        
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getSectionStyle = (index: number) => {
    const isActive = currentSection === index;
    return {
      transform: isActive ? 'scale(1.05)' : 'scale(1)',
      backgroundColor: isActive ? 'rgba(147, 51, 234, 0.2)' : 'rgba(255, 255, 255, 0.05)',
      borderColor: isActive ? '#9333ea' : 'rgba(255, 255, 255, 0.1)',
      transition: 'all 0.5s ease-in-out'
    };
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 relative overflow-hidden">
        {/* Animated Mouse Pointer */}
        <div 
          className="absolute z-20 pointer-events-none transition-all duration-1000 ease-in-out"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <MousePointer2 
            className={`h-6 w-6 text-purple-400 transition-all duration-300 ${
              isHovering ? 'scale-125 text-purple-300' : 'scale-100'
            }`}
          />
          {isHovering && (
            <div className="absolute -top-8 left-6 bg-purple-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap animate-fade-in">
              {sections[currentSection]?.name}
            </div>
          )}
        </div>

        <CardContent className="p-8 space-y-6">
          {/* Header Section */}
          <div 
            className="text-center p-6 rounded-lg border-2 transition-all duration-500"
            style={getSectionStyle(0)}
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mx-auto mb-4 flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Madhav S Baidya</h1>
            <div className="flex justify-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                madhavbaidya1@gmail.com
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                +91 6900541047
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                IIT(BHU) Varanasi, India
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div 
            className="p-4 rounded-lg border-2 transition-all duration-500"
            style={getSectionStyle(1)}
          >
            <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-400" />
              Professional Summary
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              AI/ML Engineer specializing in large language models (LLMs), agentic AI systems, and deep learning. Experienced in building and deploying intelligent systems capable of understanding, generating, and interacting with complex multimodal data.

              Proficient in designing agent-based architectures that autonomously reason and act using external tools and APIs. Skilled in developing retrieval-augmented generation (RAG) pipelines and multimodal systems that combine text and vision for applications such as document analysis and conversational AI.
            </p>
          </div>

          {/* Experience Section */}
          <div 
            className="p-4 rounded-lg border-2 transition-all duration-500"
            style={getSectionStyle(2)}
          >
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-purple-400" />
              Work Experience
            </h2>
            <div className="space-y-3">
              <div className="p-3 rounded bg-white/5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-white">ABCr</h3>
                    <p className="text-purple-300 text-sm">TechCorp Inc.</p>
                  </div>
                  <span className="text-gray-400 text-sm">2024 - Present</span>
                </div>
                <p className="text-gray-400 text-xs">
                  Led development of microservices architecture, improved system performance by 40%
                </p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-white">Full Stack Developer</h3>
                    <p className="text-purple-300 text-sm">StartupXYZ</p>
                  </div>
                  <span className="text-gray-400 text-sm">2019 - 2021</span>
                </div>
                <p className="text-gray-400 text-xs">
                  Built responsive web applications using React and Express.js
                </p>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div 
            className="p-4 rounded-lg border-2 transition-all duration-500"
            style={getSectionStyle(3)}
          >
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-purple-400" />
              Education
            </h2>
            <div className="p-3 rounded bg-white/5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-white">IDD</h3>
                  <p className="text-purple-300 text-sm">IIT(BHU) Varanasi, India</p>
                </div>
                <span className="text-gray-400 text-sm">2022-2027</span>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div 
            className="p-4 rounded-lg border-2 transition-all duration-500"
            style={getSectionStyle(4)}
          >
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-400" />
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {['Pandas', 'Numpy', 'Tensorflow', 'Python', 'AWS', 'Docker', 'GraphQL', 'SQL'].map((skill, index) => (
                <span
                  key={skill}
                  className={`px-3 py-1 text-xs rounded-full border transition-all duration-300 ${
                    currentSection === 4 && index < 4
                      ? 'bg-purple-600/30 border-purple-400 text-purple-200'
                      : 'bg-white/10 border-white/20 text-gray-300'
                  }`}
                  style={{ 
                    animationDelay: currentSection === 4 ? `${index * 0.1}s` : '0s'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </CardContent>

        {/* Floating particles for ambiance */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </Card>

      {/* Progress indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {sections.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSection === index 
                ? 'bg-purple-400 scale-125' 
                : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedResumeDemo;
