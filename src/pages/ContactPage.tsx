
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FileText, Mail, Phone, MapPin, Clock, Send, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
    gdprConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters long';
    }
    if (!formData.gdprConsent) {
      newErrors.gdprConsent = 'GDPR consent is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      message: '',
      gdprConsent: false
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-purple-600/20 border border-purple-500/30">
                <FileText className="h-6 w-6 text-purple-400" />
              </div>
              <span className="text-xl font-bold text-white">ResumePro</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <button onClick={() => navigate('/')} className="text-gray-300 hover:text-white transition-colors">Home</button>
              <button onClick={() => navigate('/pricing')} className="text-gray-300 hover:text-white transition-colors">Pricing</button>
              <button onClick={() => navigate('/contact')} className="text-purple-400 font-medium">Contact</button>
              <button onClick={() => navigate('/resources')} className="text-gray-300 hover:text-white transition-colors">Resources</button>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                onClick={() => navigate('/auth')}
              >
                Sign in
              </Button>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => navigate('/auth')}
              >
                Start for free
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions about our AI resume platform? We're here to help you succeed in your career journey.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
            {/* Contact Form - 60% */}
            <div className="lg:col-span-3">
              <Card className="bg-gray-800/50 border-purple-500/20 p-8">
                <CardHeader>
                  <CardTitle className="text-2xl text-white mb-2">Send us a message</CardTitle>
                  <p className="text-gray-400">Fill out the form below and we'll get back to you within 24 hours.</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-white">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400"
                          placeholder="John"
                        />
                        {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-white">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400"
                          placeholder="Doe"
                        />
                        {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-white">Business Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400"
                        placeholder="john.doe@company.com"
                      />
                      {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <Label htmlFor="company" className="text-white">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="bg-gray-700/50 border-purple-500/30 text-white placeholder:text-gray-400"
                        placeholder="Your Company"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-white">Message *</Label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full p-3 bg-gray-700/50 border border-purple-500/30 rounded-md text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none"
                        placeholder="Tell us about your needs and how we can help..."
                      />
                      {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                      <p className="text-gray-500 text-sm mt-1">
                        {formData.message.length}/20 minimum characters
                      </p>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="gdprConsent"
                        checked={formData.gdprConsent}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, gdprConsent: checked }))}
                        className="border-purple-500/30 mt-1"
                      />
                      <div>
                        <Label htmlFor="gdprConsent" className="text-sm text-gray-400 leading-relaxed">
                          I consent to the processing of my personal data in accordance with your Privacy Policy and agree to receive communications from ResumePro.
                        </Label>
                        {errors.gdprConsent && <p className="text-red-400 text-sm mt-1">{errors.gdprConsent}</p>}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Details - 40% */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <Card className="bg-gray-800/50 border-purple-500/20 p-6">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Contact Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-purple-600/20 rounded-lg">
                      <Mail className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Email</h4>
                      <p className="text-gray-400">moodiedoodler29@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-purple-600/20 rounded-lg">
                      <Phone className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Phone</h4>
                      <p className="text-gray-400">+91 6900541047</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-purple-600/20 rounded-lg">
                      <MapPin className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Address</h4>
                      <p className="text-gray-400">
                        H/NO- 94, Sribhumi Nagar,<br />
                        Guwahati, Assam- 781034,<br />
                        India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-purple-600/20 rounded-lg">
                      <Clock className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Business Hours</h4>
                      <p className="text-gray-400">
                        Mon - Fri: 9:00 AM - 6:00 PM IST<br />
                        Sat: 10:00 AM - 4:00 PM IST
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Interactive Map Placeholder */}
              <Card className="bg-gray-800/50 border-purple-500/20 p-6">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Find Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-700/50 rounded-lg flex items-center justify-center border border-purple-500/20">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                      <p className="text-gray-400">Interactive Map</p>
                      <p className="text-sm text-gray-500">Guwahati, Assam</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enterprise Demo */}
              <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-400/50 p-6">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Enterprise Solutions</CardTitle>
                  <p className="text-gray-300">Need a custom solution for your organization?</p>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule Demo
                  </Button>
                </CardContent>
              </Card>
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

export default ContactPage;
