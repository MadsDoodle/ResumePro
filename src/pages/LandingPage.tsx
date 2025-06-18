import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AnimatedResumeDemo from '@/components/AnimatedResumeDemo';
import { 
  FileText, 
  BarChart3, 
  MessageSquare, 
  BookOpen, 
  ChevronDown, 
  Star,
  Check,
  Users,
  Award,
  Target,
  Zap,
  Mail,
  Phone,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  Camera,
  Timer,
  Menu,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LandingPage = () => {
  const [email, setEmail] = useState('madhavsukla.baidya.chy22@itbhu.ac.in');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [activeContactTab, setActiveContactTab] = useState('email');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mouse tracking for wave animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleGetStarted = () => {
    if (!agreedToTerms) {
      alert('Please accept the Terms and Conditions to continue.');
      return;
    }
    navigate('/auth');
  };

  const handlePricingClick = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    setAgreedToTerms(checked === true);
  };

  const contactTabs = [
    { id: 'email', label: 'Email', icon: Mail, content: 'madhavsukla.baidya.chy22@itbhu.ac.in' },
    { id: 'phone', label: 'Phone', icon: Phone, content: '+91 6900541047' },
    { id: 'address', label: 'Address', icon: MapPin, content: 'IIT(BHU) Varanasi, Uttar Pradesh, India' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 relative overflow-hidden">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-full h-full opacity-10"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 25%, transparent 50%)`,
            transform: `translateY(${scrollY * 0.1}px)`,
            transition: 'background 0.3s ease-out'
          }}
        />
        <svg 
          className="absolute bottom-0 w-full h-64 opacity-20"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
        >
          <path
            d={`M0,100 Q300,${50 + Math.sin(mousePosition.x * 0.01) * 20} 600,100 T1200,100 L1200,200 L0,200 Z`}
            fill="rgba(255,255,255,0.1)"
            className="transition-all duration-500"
          />
          <path
            d={`M0,120 Q300,${70 + Math.cos(mousePosition.x * 0.01) * 15} 600,120 T1200,120 L1200,200 L0,200 Z`}
            fill="rgba(255,255,255,0.05)"
            className="transition-all duration-700"
          />
        </svg>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-purple-600/20 border border-purple-500/30">
                <FileText className="h-4 w-4 sm:h-6 sm:w-6 text-purple-400" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">ResumePro</span>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-300 hover:text-white transition-colors">
                  Platform <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800/95 backdrop-blur-sm border-purple-500/30 text-white">
                  <DropdownMenuItem onClick={() => navigate('/auth')} className="hover:bg-purple-600/20 focus:bg-purple-600/20">Resume Builder</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/auth')} className="hover:bg-purple-600/20 focus:bg-purple-600/20">Resume Analyzer</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/auth')} className="hover:bg-purple-600/20 focus:bg-purple-600/20">AI Career Advisor</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-300 hover:text-white transition-colors">
                  Features <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800/95 backdrop-blur-sm border-purple-500/30 text-white">
                  <DropdownMenuItem onClick={() => navigate('/auth')} className="hover:bg-purple-600/20 focus:bg-purple-600/20">ATS Optimized Templates</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/auth')} className="hover:bg-purple-600/20 focus:bg-purple-600/20">Chat-Based Editing</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/auth')} className="hover:bg-purple-600/20 focus:bg-purple-600/20">Smart Suggestions</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/auth')} className="hover:bg-purple-600/20 focus:bg-purple-600/20">Version History</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-300 hover:text-white transition-colors">
                  Resources <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800/95 backdrop-blur-sm border-purple-500/30 text-white">
                  <DropdownMenuItem onClick={() => navigate('/resources')} className="hover:bg-purple-600/20 focus:bg-purple-600/20">Resume Tips</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/resources')} className="hover:bg-purple-600/20 focus:bg-purple-600/20">Career Paths</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/resources')} className="hover:bg-purple-600/20 focus:bg-purple-600/20">Blog</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <button onClick={() => navigate('/pricing')} className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </button>
              <button onClick={() => navigate('/contact')} className="text-gray-300 hover:text-white transition-colors">
                Contact
              </button>
            </div>

            {/* Desktop CTA Buttons - Enhanced Auth Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 shadow-lg"
                onClick={() => navigate('/auth')}
              >
                Sign in
              </Button>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25"
                onClick={handleGetStarted}
              >
                Start for free
              </Button>
            </div>
          </nav>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-purple-500/20">
              <div className="flex flex-col space-y-4 mt-4">
                <button onClick={() => navigate('/auth')} className="text-left text-gray-300 hover:text-white transition-colors">
                  Resume Builder
                </button>
                <button onClick={() => navigate('/auth')} className="text-left text-gray-300 hover:text-white transition-colors">
                  Resume Analyzer
                </button>
                <button onClick={() => navigate('/resources')} className="text-left text-gray-300 hover:text-white transition-colors">
                  Resources
                </button>
                <button onClick={() => navigate('/pricing')} className="text-left text-gray-300 hover:text-white transition-colors">
                  Pricing
                </button>
                <button onClick={() => navigate('/contact')} className="text-left text-gray-300 hover:text-white transition-colors">
                  Contact
                </button>
                <div className="flex flex-col space-y-2 pt-4 border-t border-purple-500/20">
                  <Button 
                    variant="outline" 
                    className="border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 w-full"
                    onClick={() => navigate('/auth')}
                  >
                    Sign in
                  </Button>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25 w-full"
                    onClick={handleGetStarted}
                  >
                    Start for free
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section with Zoom Effect */}
      <section 
        className="container mx-auto px-4 py-10 sm:py-20 relative z-10"
        style={{
          transform: `scale(${1 + scrollY * 0.0001})`,
          opacity: Math.max(0.3, 1 - scrollY * 0.001)
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center bg-purple-600/20 border border-purple-500/30 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-purple-300 backdrop-blur-sm">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              AI-driven resume builder for professionals
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Create a Resume 
              <span className="text-purple-400"> That Gets Results</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
              Build a professional resume that lands interviews with our AI-powered tools and expert guidance.
            </p>

            {/* Email Form */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 h-12 backdrop-blur-sm"
                />
                <Button 
                  onClick={handleGetStarted}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 h-12 whitespace-nowrap transform hover:scale-105 transition-all duration-300"
                  disabled={!agreedToTerms}
                >
                  Choose a template
                </Button>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                  className="border-purple-500/30 mt-0.5"
                />
                <span className="text-xs sm:text-sm text-gray-400">
                  I accept the <a href="/terms" className="text-purple-400 hover:underline">Terms and Conditions</a>
                </span>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-6 sm:pt-8">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-gray-900 flex items-center justify-center text-white text-xs sm:text-sm font-bold">M</div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-gray-900 flex items-center justify-center text-white text-xs sm:text-sm font-bold">S</div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-400 border-2 border-gray-900 flex items-center justify-center text-white text-xs sm:text-sm font-bold">B</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start text-yellow-400">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                  <span className="ml-1 text-white font-semibold text-sm sm:text-base">4.9</span>
                  <span className="ml-2 text-gray-400 text-sm">2M+ users</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400">One Platform for Career Success</p>
              </div>
            </div>
          </div>

          {/* Right Content - Animated Resume Demo */}
          <div className="relative order-first lg:order-last">
            <div 
              className="scale-75 sm:scale-90 lg:scale-100 transform transition-all duration-1000"
              style={{
                transform: `scale(${0.75 + scrollY * 0.0002}) rotateY(${scrollY * 0.05}deg)`,
              }}
            >
              <AnimatedResumeDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Scroll Animations */}
      <section 
        className="container mx-auto px-4 py-16 sm:py-20 relative z-10"
        style={{
          transform: `translateY(${Math.max(0, scrollY * 0.1 - 100)}px)`,
          opacity: scrollY > 100 ? Math.min(1, (scrollY - 100) * 0.01) : 0
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {[
            { icon: Camera, color: 'green', title: 'Recruiter-Approved Resume', desc: 'We work with recruiters to design resume templates that format automatically.' },
            { icon: Timer, color: 'blue', title: 'Finish Your Resume in 15 Minutes', desc: 'Resume Pro helps you tackle your work experience by reminding you what you did at your job.' },
            { icon: Target, color: 'orange', title: 'Land an Interview', desc: 'We suggest the skills you should add. It helped over a million people get interviews.' }
          ].map((feature, index) => (
            <Card 
              key={index}
              className="bg-gray-800/50 border-purple-500/20 p-6 sm:p-8 text-center hover:scale-105 transition-all duration-500 backdrop-blur-sm"
              style={{
                transform: `translateY(${Math.max(0, scrollY * 0.05 - index * 50)}px)`,
                opacity: scrollY > 200 + index * 100 ? 1 : 0.3
              }}
            >
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className={`p-3 sm:p-4 rounded-full bg-${feature.color}-500/20 border border-${feature.color}-500/30`}>
                  <feature.icon className={`h-6 w-6 sm:h-8 sm:w-8 text-${feature.color}-400`} />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section with Updated Details */}
      <section 
        id="contact" 
        className="container mx-auto px-4 py-12 sm:py-16 relative z-10"
        style={{
          transform: `translateY(${Math.max(0, scrollY * 0.02 - 200)}px)`,
          opacity: scrollY > 800 ? 1 : 0.5
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Get in Touch</h2>
            <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8">Ready to accelerate your career? We're here to help.</p>
            
            <div className="space-y-4">
              <Input
                placeholder="Your Name"
                className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 h-12 backdrop-blur-sm"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value="madhavsukla.baidya.chy22@itbhu.ac.in"
                className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 h-12 backdrop-blur-sm"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full p-3 bg-gray-800/50 border border-purple-500/30 rounded-md text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none resize-none backdrop-blur-sm"
              />
              <Button className="w-full bg-purple-600 hover:bg-purple-700 h-12 transform hover:scale-105 transition-all duration-300">Send Message</Button>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {/* Contact Tabs */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Contact Information</h3>
              <div className="flex flex-wrap gap-1 mb-4">
                {contactTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveContactTab(tab.id)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors backdrop-blur-sm ${
                      activeContactTab === tab.id 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-800/50 text-gray-400 hover:text-white'
                    }`}
                  >
                    <tab.icon className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="bg-gray-800/50 border border-purple-500/30 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-xs sm:text-sm text-gray-300 break-words">
                  {contactTabs.find(tab => tab.id === activeContactTab)?.content}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-purple-600/20 border border-purple-500/30 rounded-lg flex items-center justify-center text-purple-400 hover:bg-purple-600/30 transition-colors hover:scale-105">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-purple-600/20 border border-purple-500/30 rounded-lg flex items-center justify-center text-purple-400 hover:bg-purple-600/30 transition-colors hover:scale-105">
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-purple-600/20 border border-purple-500/30 rounded-lg flex items-center justify-center text-purple-400 hover:bg-purple-600/30 transition-colors hover:scale-105">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Enhanced Glass Effect */}
      <footer className="border-t border-purple-500/20 bg-gray-900/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className="p-1.5 sm:p-2 rounded-lg bg-purple-600/20 border border-purple-500/30">
                  <FileText className="h-4 w-4 sm:h-6 sm:w-6 text-purple-400" />
                </div>
                <span className="text-lg sm:text-xl font-bold text-white">ResumePro</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400">Building careers with AI-powered tools.</p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Platform</h4>
              <div className="space-y-2">
                <a href="#" className="block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">Resume Builder</a>
                <a href="#" className="block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">Resume Analyzer</a>
                <a href="#" className="block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">AI Career Advisor</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Resources</h4>
              <div className="space-y-2">
                <a href="/resources" className="block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">Resume Tips</a>
                <a href="/resources" className="block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">Career Paths</a>
                <a href="/resources" className="block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">Blog</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Legal</h4>
              <div className="space-y-2">
                <a href="/terms" className="block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
                <a href="/privacy" className="block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-500/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-500">© 2024 ResumePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
