
import { useState } from 'react';
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
  const [email, setEmail] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [activeContactTab, setActiveContactTab] = useState('email');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

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
    { id: 'email', label: 'Email', icon: Mail, content: 'moodiedoodler29@gmail.com' },
    { id: 'phone', label: 'Phone', icon: Phone, content: '+91 6900541047' },
    { id: 'address', label: 'Address', icon: MapPin, content: 'H/NO- 94, Sribhumi Nagar, Guwahati, Assam- 781034, India' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900">
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

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
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
                    className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 w-full"
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-10 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center bg-purple-600/20 border border-purple-500/30 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-purple-300">
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
                  className="flex-1 bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 h-12"
                />
                <Button 
                  onClick={handleGetStarted}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 h-12 whitespace-nowrap"
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
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-gray-900 flex items-center justify-center text-white text-xs sm:text-sm font-bold">J</div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-gray-900 flex items-center justify-center text-white text-xs sm:text-sm font-bold">A</div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-400 border-2 border-gray-900 flex items-center justify-center text-white text-xs sm:text-sm font-bold">M</div>
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
            <div className="scale-75 sm:scale-90 lg:scale-100">
              <AnimatedResumeDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <Card className="bg-gray-800/50 border-purple-500/20 p-6 sm:p-8 text-center hover:scale-105 transition-transform">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 rounded-full bg-green-500/20 border border-green-500/30">
                <Camera className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Recruiter-Approved Resume</h3>
            <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
              We work with recruiters to design resume templates that format automatically.
            </p>
          </Card>

          <Card className="bg-gray-800/50 border-purple-500/20 p-6 sm:p-8 text-center hover:scale-105 transition-transform">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 rounded-full bg-blue-500/20 border border-blue-500/30">
                <Timer className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Finish Your Resume in 15 Minutes</h3>
            <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
              Resume Pro helps you tackle your work experience by reminding you what you did at your job.
            </p>
          </Card>

          <Card className="bg-gray-800/50 border-purple-500/20 p-6 sm:p-8 text-center hover:scale-105 transition-transform md:col-span-2 lg:col-span-1">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 rounded-full bg-orange-500/20 border border-orange-500/30">
                <Target className="h-6 w-6 sm:h-8 sm:w-8 text-orange-400" />
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Land an Interview</h3>
            <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
              We suggest the skills you should add. It helped over a million people get interviews.
            </p>
          </Card>
        </div>
      </section>

      {/* Expert Review Section */}
      <section className="container mx-auto px-4 py-16 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Our resume builder includes a review from one of our experts
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content - Visual */}
          <div className="relative order-last lg:order-first">
            <Card className="bg-gradient-to-br from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 p-6 sm:p-8">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 flex-shrink-0" />
                  <div className="h-2 sm:h-3 bg-green-400/50 rounded-full flex-1"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 flex-shrink-0" />
                  <div className="h-2 sm:h-3 bg-green-400/50 rounded-full flex-1"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-orange-400/50 border-2 border-orange-400 flex-shrink-0"></div>
                  <div className="h-2 sm:h-3 bg-orange-400/50 rounded-full flex-1"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-orange-400/50 border-2 border-orange-400 flex-shrink-0"></div>
                  <div className="h-2 sm:h-3 bg-orange-400/50 rounded-full flex-1"></div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Content - Features */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Real feedback from a Resume Analyst</h3>
              <p className="text-sm sm:text-base text-gray-300">We'll read your resume carefully and suggest improvements</p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Section-by-section suggestions</h3>
              <p className="text-sm sm:text-base text-gray-300">Get detailed feedback on your summary, skills, work history, and education sections</p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Get answers specific to your resume</h3>
              <p className="text-sm sm:text-base text-gray-300">Submit any questions you have for additional guidance</p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Quick turnaround</h3>
              <p className="text-sm sm:text-base text-gray-300">Get your review back in just 2-3 business days</p>
            </div>

            <Button 
              onClick={() => navigate('/auth')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg w-full sm:w-auto"
            >
              Choose a template
            </Button>
          </div>
        </div>

        {/* As seen in logos */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-gray-500 text-xs sm:text-sm mb-6 sm:mb-8">As seen in</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-12 opacity-60">
            <span className="text-gray-400 font-bold text-sm sm:text-lg">Forbes</span>
            <span className="text-gray-400 font-bold text-sm sm:text-lg">USA TODAY</span>
            <span className="text-gray-400 font-bold text-sm sm:text-lg">CNBC</span>
            <span className="text-gray-400 font-bold text-sm sm:text-lg">The New York Times</span>
            <span className="text-gray-400 font-bold text-sm sm:text-lg">CNET.com</span>
          </div>
        </div>
      </section>

      {/* Services Toggle Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <button
            onClick={() => setShowServices(!showServices)}
            className="inline-flex items-center bg-purple-600/20 border border-purple-500/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-purple-300 hover:bg-purple-600/30 transition-colors"
          >
            <span className="mr-2">More from us</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showServices ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showServices && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-fade-in">
            <Card className="bg-gray-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center text-white text-sm sm:text-base">
                  <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-purple-400" />
                  AI Resume Analyzer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs sm:text-sm text-gray-300">Upload + feedback</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center text-white text-sm sm:text-base">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-purple-400" />
                  Cover Letter Generator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs sm:text-sm text-gray-300">AI-tailored letters</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center text-white text-sm sm:text-base">
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-purple-400" />
                  Interview Prep Bot
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs sm:text-sm text-gray-300">Practice + scoring</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center text-white text-sm sm:text-base">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-purple-400" />
                  Career Path Finder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs sm:text-sm text-gray-300">Skills-based suggestions</p>
              </CardContent>
            </Card>
          </div>
        )}
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Choose Your Plan</h2>
          <p className="text-lg sm:text-xl text-gray-300">Start building your career today</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <Card className="bg-gray-800/50 border-purple-500/20 p-6 sm:p-8 hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-white">Professional</CardTitle>
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">₹499<span className="text-base sm:text-lg text-gray-400">/month</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {['Resume Builder', 'ATS Validation', 'Smart Suggestions', 'Unlimited Revisions'].map((feature) => (
                  <div key={feature} className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{feature}</span>
                  </div>
                ))}
              </div>
              <Button onClick={() => navigate('/auth')} className="w-full bg-purple-600 hover:bg-purple-700">Start Plan</Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-400/50 p-6 sm:p-8 relative hover:scale-105 transition-transform">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-purple-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium">Recommended</span>
            </div>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-white">Ultimate</CardTitle>
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">₹1299<span className="text-base sm:text-lg text-gray-400">/month</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {['All Professional features', 'Resume Analyzer', 'Career Path Generator', 'Priority Support', 'Multiple Downloads'].map((feature) => (
                  <div key={feature} className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{feature}</span>
                  </div>
                ))}
              </div>
              <Button onClick={() => navigate('/auth')} className="w-full bg-purple-600 hover:bg-purple-700">Start Plan</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Get in Touch</h2>
            <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8">Ready to accelerate your career? We're here to help.</p>
            
            <div className="space-y-4">
              <Input
                placeholder="Your Name"
                className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 h-12"
              />
              <Input
                type="email"
                placeholder="Your Email"
                className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 h-12"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full p-3 bg-gray-800/50 border border-purple-500/30 rounded-md text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none resize-none"
              />
              <Button className="w-full bg-purple-600 hover:bg-purple-700 h-12">Send Message</Button>
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
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
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
              <div className="bg-gray-800/50 border border-purple-500/30 rounded-lg p-4">
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

      {/* Footer */}
      <footer className="border-t border-purple-500/20 bg-gray-900/50">
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
