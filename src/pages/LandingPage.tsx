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
  MapPin
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
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-purple-600/20 border border-purple-500/30">
                <FileText className="h-6 w-6 text-purple-400" />
              </div>
              <span className="text-xl font-bold text-white">ResumePro</span>
            </div>

            {/* Navigation */}
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
              
              <button onClick={() => navigate('/resources')} className="text-gray-300 hover:text-white transition-colors">
                Resources
              </button>
              <button onClick={() => navigate('/pricing')} className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </button>
              <button onClick={() => navigate('/contact')} className="text-gray-300 hover:text-white transition-colors">
                Contact
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center bg-purple-600/20 border border-purple-500/30 rounded-full px-4 py-2 text-sm text-purple-300">
              <Zap className="h-4 w-4 mr-2" />
              AI-driven resume builder for professionals
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Build Your Resume 
              <span className="text-purple-400"> Smarter, Faster,</span>
              <br />
              With AI
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              Create standout resumes in minutes using our AI-powered builder and career tools. 
              Perfect for professionals seeking their next opportunity.
            </p>

            {/* Email Form */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400"
                />
                <Button 
                  onClick={handleGetStarted}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8"
                  disabled={!agreedToTerms}
                >
                  Get started
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                  className="border-purple-500/30"
                />
                <span className="text-sm text-gray-400">
                  I accept the <a href="/terms" className="text-purple-400 hover:underline">Terms and Conditions</a>
                </span>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-4 pt-8">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-gray-900 flex items-center justify-center text-white text-sm font-bold">J</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-gray-900 flex items-center justify-center text-white text-sm font-bold">A</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-400 border-2 border-gray-900 flex items-center justify-center text-white text-sm font-bold">M</div>
              </div>
              <div>
                <div className="flex items-center text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-white font-semibold">4.9</span>
                  <span className="ml-2 text-gray-400">2M+ users</span>
                </div>
                <p className="text-sm text-gray-400">One Platform for Career Success</p>
              </div>
            </div>
          </div>

          {/* Right Content - Animated Resume Demo */}
          <div className="relative">
            <AnimatedResumeDemo />
          </div>
        </div>
      </section>

      {/* Services Toggle Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <button
            onClick={() => setShowServices(!showServices)}
            className="inline-flex items-center bg-purple-600/20 border border-purple-500/30 rounded-full px-6 py-3 text-purple-300 hover:bg-purple-600/30 transition-colors"
          >
            <span className="mr-2">More from us</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showServices ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showServices && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            <Card className="bg-gray-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <BarChart3 className="h-5 w-5 mr-2 text-purple-400" />
                  AI Resume Analyzer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Upload + feedback</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <FileText className="h-5 w-5 mr-2 text-purple-400" />
                  Cover Letter Generator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">AI-tailored letters</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <MessageSquare className="h-5 w-5 mr-2 text-purple-400" />
                  Interview Prep Bot
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Practice + scoring</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Target className="h-5 w-5 mr-2 text-purple-400" />
                  Career Path Finder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Skills-based suggestions</p>
              </CardContent>
            </Card>
          </div>
        )}
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
          <p className="text-xl text-gray-300">Start building your career today</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-gray-800/50 border-purple-500/20 p-8 hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Professional</CardTitle>
              <div className="text-3xl font-bold text-purple-400">₹499<span className="text-lg text-gray-400">/month</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {['Resume Builder', 'ATS Validation', 'Smart Suggestions', 'Unlimited Revisions'].map((feature) => (
                  <div key={feature} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    {feature}
                  </div>
                ))}
              </div>
              <Button onClick={() => navigate('/auth')} className="w-full bg-purple-600 hover:bg-purple-700">Start Plan</Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-400/50 p-8 relative hover:scale-105 transition-transform">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">Recommended</span>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl text-white">Ultimate</CardTitle>
              <div className="text-3xl font-bold text-purple-400">₹1299<span className="text-lg text-gray-400">/month</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {['All Professional features', 'Resume Analyzer', 'Career Path Generator', 'Priority Support', 'Multiple Downloads'].map((feature) => (
                  <div key={feature} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    {feature}
                  </div>
                ))}
              </div>
              <Button onClick={() => navigate('/auth')} className="w-full bg-purple-600 hover:bg-purple-700">Start Plan</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
            <p className="text-gray-300 mb-8">Ready to accelerate your career? We're here to help.</p>
            
            <div className="space-y-4">
              <Input
                placeholder="Your Name"
                className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400"
              />
              <Input
                type="email"
                placeholder="Your Email"
                className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full p-3 bg-gray-800/50 border border-purple-500/30 rounded-md text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none"
              />
              <Button className="w-full bg-purple-600 hover:bg-purple-700">Send Message</Button>
            </div>
          </div>

          <div className="space-y-8">
            {/* Contact Tabs */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
              <div className="flex space-x-1 mb-4">
                {contactTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveContactTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeContactTab === tab.id 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-800/50 text-gray-400 hover:text-white'
                    }`}
                  >
                    <tab.icon className="h-4 w-4 inline mr-1" />
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="bg-gray-800/50 border border-purple-500/30 rounded-lg p-4">
                <p className="text-gray-300">
                  {contactTabs.find(tab => tab.id === activeContactTab)?.content}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-purple-600/20 border border-purple-500/30 rounded-lg flex items-center justify-center text-purple-400 hover:bg-purple-600/30 transition-colors hover:scale-105">
                  <Users className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-purple-600/20 border border-purple-500/30 rounded-lg flex items-center justify-center text-purple-400 hover:bg-purple-600/30 transition-colors hover:scale-105">
                  <MessageSquare className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-purple-600/20 border border-purple-500/30 rounded-lg flex items-center justify-center text-purple-400 hover:bg-purple-600/30 transition-colors hover:scale-105">
                  <BookOpen className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 bg-gray-900/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-600/20 border border-purple-500/30">
                  <FileText className="h-6 w-6 text-purple-400" />
                </div>
                <span className="text-xl font-bold text-white">ResumePro</span>
              </div>
              <p className="text-gray-400">Building careers with AI-powered tools.</p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Resume Builder</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Resume Analyzer</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">AI Career Advisor</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <div className="space-y-2">
                <a href="/resources" className="block text-gray-400 hover:text-white transition-colors">Resume Tips</a>
                <a href="/resources" className="block text-gray-400 hover:text-white transition-colors">Career Paths</a>
                <a href="/resources" className="block text-gray-400 hover:text-white transition-colors">Blog</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <div className="space-y-2">
                <a href="/terms" className="block text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
                <a href="/privacy" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-500/20 mt-8 pt-8 text-center">
            <p className="text-gray-500">© 2024 ResumePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
