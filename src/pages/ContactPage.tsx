
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Mail, Phone, Calendar, Loader2 } from 'lucide-react';

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
    gdprConsent: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters long';
    }

    if (!formData.gdprConsent) {
      newErrors.gdprConsent = 'You must agree to the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: '',
        gdprConsent: false
      });
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error sending message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">AI Resume Pro</div>
            <div className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
              <a href="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</a>
              <a href="/contact" className="text-blue-600 font-medium">Contact</a>
              <a href="/resources" className="text-gray-600 hover:text-blue-600">Resources</a>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our AI resume platform? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Form - 60% */}
          <div className="lg:col-span-3">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={errors.firstName ? 'border-red-500' : ''}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={errors.lastName ? 'border-red-500' : ''}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Business Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={errors.message ? 'border-red-500' : ''}
                      placeholder="Tell us about your needs..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.message.length}/20 characters minimum
                    </p>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="gdpr"
                      checked={formData.gdprConsent}
                      onCheckedChange={(checked) => handleInputChange('gdprConsent', !!checked)}
                    />
                    <Label htmlFor="gdpr" className="text-sm leading-5">
                      I agree to the{' '}
                      <a href="#" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>{' '}
                      and consent to the processing of my personal data. *
                    </Label>
                  </div>
                  {errors.gdprConsent && (
                    <p className="text-red-500 text-sm">{errors.gdprConsent}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Details - 40% */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">moodiedoodler29@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">+91 6900541047</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600">
                      H/NO- 94, Sribhumi Nagar<br />
                      Guwahati, Assam- 781034<br />
                      India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Demo */}
            <Card className="shadow-xl">
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Enterprise Demo</h3>
                <p className="text-gray-600 mb-4">
                  Schedule a personalized demo for your team
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Schedule Demo
                </Button>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="shadow-xl">
              <CardContent className="p-6">
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive Map</p>
                    <p className="text-sm">Guwahati, Assam, India</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
