
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ModernNavigation from '@/components/ModernNavigation';
import { Mail, Phone, MapPin, Send, Clock, Users, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
  gdprConsent: boolean;
}

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
    gdprConsent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.gdprConsent) {
      toast({
        title: "Consent Required",
        description: "Please accept our privacy policy to proceed.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: '',
        gdprConsent: false
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181818] via-[#232046] to-[#15152e]">
      <ModernNavigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-purple-300 text-lg max-w-2xl mx-auto">
            Ready to take your career to the next level? Contact our team of resume experts today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-purple-900/20 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-purple-300 text-sm font-medium mb-2">
                      First Name *
                    </label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="bg-purple-900/30 border-purple-500/30 text-white placeholder-purple-400"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-purple-300 text-sm font-medium mb-2">
                      Last Name *
                    </label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="bg-purple-900/30 border-purple-500/30 text-white placeholder-purple-400"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-purple-300 text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-purple-900/30 border-purple-500/30 text-white placeholder-purple-400"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-purple-300 text-sm font-medium mb-2">
                    Company (Optional)
                  </label>
                  <Input
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="bg-purple-900/30 border-purple-500/30 text-white placeholder-purple-400"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="block text-purple-300 text-sm font-medium mb-2">
                    Message *
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="bg-purple-900/30 border-purple-500/30 text-white placeholder-purple-400 min-h-[120px]"
                    placeholder="Tell us about your resume needs..."
                    required
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    checked={formData.gdprConsent}
                    onCheckedChange={(checked) => handleInputChange('gdprConsent', !!checked)}
                    className="border-purple-500/30"
                  />
                  <label className="text-purple-300 text-sm leading-relaxed">
                    I agree to the privacy policy and terms of service *
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Tabs defaultValue="contact" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-purple-900/20 border-purple-500/30">
                <TabsTrigger value="contact" className="data-[state=active]:bg-purple-600">Contact</TabsTrigger>
                <TabsTrigger value="hours" className="data-[state=active]:bg-purple-600">Hours</TabsTrigger>
                <TabsTrigger value="team" className="data-[state=active]:bg-purple-600">Team</TabsTrigger>
              </TabsList>
              
              <TabsContent value="contact" className="mt-6">
                <div className="space-y-4">
                  <Card className="bg-purple-900/20 border-purple-500/30 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <Mail className="h-6 w-6 text-purple-400" />
                        <div>
                          <h3 className="text-white font-medium">Email Address</h3>
                          <p className="text-purple-300">madhavsukla.baidya.chy22@itbhu.ac.in</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-purple-900/20 border-purple-500/30 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <Phone className="h-6 w-6 text-purple-400" />
                        <div>
                          <h3 className="text-white font-medium">Phone Number</h3>
                          <p className="text-purple-300">+91 6900541047</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-purple-900/20 border-purple-500/30 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <MapPin className="h-6 w-6 text-purple-400" />
                        <div>
                          <h3 className="text-white font-medium">Office Address</h3>
                          <p className="text-purple-300">IIT(BHU) Varanasi, India</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="hours" className="mt-6">
                <Card className="bg-purple-900/20 border-purple-500/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-purple-400 mt-1" />
                      <div className="space-y-2">
                        <h3 className="text-white font-medium">Business Hours</h3>
                        <div className="text-purple-300 space-y-1">
                          <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                          <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                          <p>Sunday: Closed</p>
                        </div>
                        <Badge variant="outline" className="border-green-500/30 text-green-400">
                          Currently Open
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="team" className="mt-6">
                <Card className="bg-purple-900/20 border-purple-500/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Users className="h-6 w-6 text-purple-400 mt-1" />
                      <div className="space-y-3">
                        <h3 className="text-white font-medium">Our Expert Team</h3>
                        <div className="text-purple-300 space-y-2">
                          <div className="flex items-center space-x-2">
                            <Award className="h-4 w-4 text-yellow-400" />
                            <span>15+ Certified Resume Writers</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Award className="h-4 w-4 text-yellow-400" />
                            <span>Career Coaching Specialists</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Award className="h-4 w-4 text-yellow-400" />
                            <span>Industry-Specific Experts</span>
                          </div>
                        </div>
                        <p className="text-purple-400 text-sm">
                          We are assisting out clients acheive their career goals with personalized resume solutions.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
