
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingPlans = [
    {
      name: 'Basic',
      category: 'Starter',
      monthlyPrice: 9,
      annualPrice: 90,
      recommended: false,
      features: [
        '5 Resume Templates',
        'Basic AI Suggestions',
        'PDF Export',
        'Email Support',
        '1 User Account'
      ],
      cta: 'Start Free',
      popular: false
    },
    {
      name: 'Pro',
      category: 'Most Popular',
      monthlyPrice: 29,
      annualPrice: 290,
      recommended: true,
      features: [
        '50+ Premium Templates',
        'Advanced AI Analysis',
        'ATS Optimization',
        'Cover Letter Builder',
        'Priority Support',
        '3 User Accounts',
        'LinkedIn Optimization'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      category: 'Teams',
      monthlyPrice: 99,
      annualPrice: 990,
      recommended: false,
      features: [
        'Unlimited Templates',
        'Custom Branding',
        'Team Management',
        'Analytics Dashboard',
        'Dedicated Support',
        'Unlimited Users',
        'API Access',
        'Custom Integrations'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const faqs = [
    {
      question: 'Can I change my plan at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      question: 'Is there a free trial available?',
      answer: 'We offer a 14-day free trial for all Pro and Enterprise plans. No credit card required.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.'
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel your subscription at any time. You will retain access until the end of your billing period.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">AI Resume Pro</div>
            <div className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
              <a href="/pricing" className="text-blue-600 font-medium">Pricing</a>
              <a href="/contact" className="text-gray-600 hover:text-blue-600">Contact</a>
              <a href="/resources" className="text-gray-600 hover:text-blue-600">Resources</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Choose the perfect plan for your career goals. All plans include our core AI features.
          </p>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-16">
            <span className={`text-lg ${!isAnnual ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-blue-600"
            />
            <span className={`text-lg ${isAnnual ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              Annual
            </span>
            <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
              Save 17%
            </Badge>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  plan.recommended ? 'border-2 border-blue-500 scale-105' : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 text-sm font-medium">
                    <Star className="inline w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                )}
                
                <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">{plan.category}</div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-500 ml-1">
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                  </div>
                  {isAnnual && (
                    <div className="text-sm text-green-600 font-medium">
                      Save ${(plan.monthlyPrice * 12) - plan.annualPrice} annually
                    </div>
                  )}
                </CardHeader>

                <CardContent className="px-6 pb-6">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full py-3 ${
                      plan.recommended 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            For large organizations with specific requirements, we offer custom enterprise solutions.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            Request Custom Quote
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
