
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import ModernNavigation from '@/components/ModernNavigation';
import CollapsibleSidebar from '@/components/CollapsibleSidebar';
import CreditDisplay from '@/components/CreditDisplay';
import { MessageSquare, BarChart3, FileText, Download, Check, Mail, Phone, MapPin } from 'lucide-react';
import { useCredits } from '@/hooks/useCredits';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { hasCredits } = useCredits();

  // Check for hash navigation
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  const dashboardOptions = [
    {
      id: 'chatbox',
      icon: MessageSquare,
      title: 'AI Chatbox',
      description: 'Get instant help and guidance for your resume',
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      route: '/chat'
    },
    {
      id: 'analyze',
      icon: BarChart3,
      title: 'Analyze Resume',
      description: 'Upload and get AI-powered analysis of your resume',
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700',
      route: '/analyze'
    },
    {
      id: 'create',
      icon: FileText,
      title: 'Create New Resume',
      description: 'Start building your professional resume from scratch',
      color: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700',
      route: '/create'
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for getting started',
      features: [
        '5 Resume downloads',
        'Basic templates',
        'AI chat support',
        'Resume analysis'
      ],
      buttonText: 'Current Plan',
      popular: false
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/month',
      description: 'Best for job seekers',
      features: [
        'Unlimited resume downloads',
        'Premium templates',
        'Priority AI support',
        'Advanced analytics',
        'Cover letter generation',
        'LinkedIn optimization'
      ],
      buttonText: 'Upgrade Now',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$49',
      period: '/month',
      description: 'For teams and organizations',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Custom branding',
        'API access',
        'Dedicated support',
        'Bulk operations'
      ],
      buttonText: 'Contact Sales',
      popular: false
    }
  ];

  const handleCardClick = async (route: string) => {
    // Check if action requires credits
    const creditRequiredRoutes = ['/create', '/analyze', '/chat'];
    
    if (creditRequiredRoutes.includes(route)) {
      const userHasCredits = await hasCredits();
      if (!userHasCredits) {
        navigate('/pricing');
        return;
      }
    }
    
    navigate(route);
  };

  const handleDownloadPDF = async () => {
    console.log('PDF download functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-[#060315] relative overflow-hidden">
      <AnimatedBackground />
      <ModernNavigation />
      
      <CollapsibleSidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main Content */}
      <div className="relative z-10 pt-24">
        <div className="container mx-auto px-4 py-12">
          {/* Welcome Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome back, {user?.user_metadata?.full_name || user?.email}!
            </h1>
            <p className="text-purple-300 text-lg">What would you like to do today?</p>
          </div>
          
          {/* Dashboard Options */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {dashboardOptions.map(option => (
              <Card 
                key={option.id} 
                className="bg-purple-900/20 border-purple-500/30 hover:bg-purple-900/30 transition-all duration-300 cursor-pointer group hover:scale-105 backdrop-blur-sm" 
                onClick={() => handleCardClick(option.route)}
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full ${option.color} group-hover:scale-110 transition-transform duration-300`}>
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-white text-xl">{option.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-300 text-center mb-4">{option.description}</p>
                  <Button className={`w-full ${option.color} ${option.hoverColor} text-white transition-all duration-300 hover:scale-105`}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* AI Resume Assistant Section */}
          <div className="max-w-4xl mx-auto mb-20">
            <Card className="bg-purple-900/20 border-purple-500/30 hover:scale-[1.02] transition-transform backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl text-center">AI Resume Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-purple-300 mb-6">
                  Chat with our AI assistant for personalized resume advice and tips.
                </div>
                <div className="bg-black/30 rounded-lg p-6 min-h-[200px] border border-purple-500/20 flex items-center justify-center">
                  <div className="flex flex-col items-center space-y-4">
                    <Button 
                      onClick={() => navigate('/chat')} 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
                    >
                      Start Chatting
                    </Button>
                    <Button 
                      onClick={handleDownloadPDF} 
                      variant="outline" 
                      className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 hover:scale-105"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Resume (PDF)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Section */}
          <section id="pricing" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Choose Your Plan</h2>
              <p className="text-purple-300 text-lg">Unlock more features with our premium plans</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <Card 
                  key={index}
                  className={`bg-purple-900/20 border-purple-500/30 hover:bg-purple-900/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm relative ${
                    plan.popular ? 'ring-2 ring-purple-400' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-white">{plan.price}</span>
                      <span className="text-purple-300">{plan.period}</span>
                    </div>
                    <p className="text-purple-300 mt-2">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-300">
                          <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-purple-600 hover:bg-purple-700' 
                          : 'bg-gray-600 hover:bg-gray-700'
                      } text-white transition-all duration-300 hover:scale-105`}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
              <p className="text-purple-300 text-lg">Have questions? We're here to help</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-purple-900/20 border-purple-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <Mail className="h-5 w-5 text-purple-400 mr-3" />
                    <span>support@resumepro.com</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone className="h-5 w-5 text-purple-400 mr-3" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-5 w-5 text-purple-400 mr-3" />
                    <span>San Francisco, CA</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-900/20 border-purple-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    />
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    ></textarea>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
