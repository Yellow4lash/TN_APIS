import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Shield, Users, Zap, Crown, Gift } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { useXsollaPayment, PopupBlockerError } from '../hooks/useXsollaPayment';
import { xsollaPlans } from '../lib/xsolla';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SubscriptionStatus from '../components/ui/SubscriptionStatus';
import PopupBlockerWarning from '../components/ui/PopupBlockerWarning';

const Pricing: React.FC = () => {
  const { user } = useAuth();
  const { subscription, isActive } = useSubscription();
  const { initiatePayment, checkPopupBlocker, loading: paymentLoading, error: paymentError } = useXsollaPayment();
  const navigate = useNavigate();
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPopupWarning, setShowPopupWarning] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<typeof plans[0] | null>(null);

  const monthlyPlan = xsollaPlans.monthly;

  const plans = [
    {
      id: 'free',
      name: 'Free Trial',
      description: 'Perfect for trying out TinyNinza',
      price: 0,
      duration: '7 days free',
      features: [
        'Access to 5 featured games',
        'Basic progress tracking',
        'Safe, ad-free environment',
        'iOS and Android apps'
      ],
      popular: false,
      cta: 'Start Free Trial',
      color: 'from-gray-400 to-gray-600'
    },
    {
      id: 'monthly',
      name: monthlyPlan.name,
      description: monthlyPlan.description,
      price: monthlyPlan.amount,
      duration: 'per month',
      planId: monthlyPlan.planId,
      features: [
        'All 44 educational games',
        'Detailed progress reports',
        'Offline game access',
        'Priority customer support',
        'New games added monthly',
        'Parent dashboard'
      ],
      popular: true,
      cta: 'Subscribe Monthly',
      color: 'from-primary-400 to-primary-600'
    }
  ];

  const handleSubscribe = async (plan: typeof plans[0]) => {
    if (!user) {
      navigate('/auth/login');
      return;
    }

    if (isActive() && plan.id === 'monthly') {
      // User already has an active subscription
      return;
    }

    if (plan.id === 'free') {
      // For free trial, redirect to games page
      navigate('/games');
      return;
    }

    setProcessingPlan(plan.id);
    
    try {
      if (plan.planId) {
        console.log('Starting payment process for plan:', plan.planId);
        await initiatePayment(plan.planId, plan.price);
        
        // Payment successful, redirect to success page
        console.log('Payment successful, redirecting to success page');
        navigate('/success');
      }
    } catch (error) {
      console.error('Payment error:', error);
      
      if (error instanceof PopupBlockerError) {
        // Show popup blocker warning
        setPendingPlan(plan);
        setShowPopupWarning(true);
      } else {
        // Show generic error
        const errorMessage = error instanceof Error ? error.message : 'Payment failed';
        setError(errorMessage);
      }
    } finally {
      setProcessingPlan(null);
    }
  };

  const handleRetryPayment = async () => {
    setShowPopupWarning(false);
    if (pendingPlan) {
      await handleSubscribe(pendingPlan);
      setPendingPlan(null);
    }
  };

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Parent of 2",
      content: "TinyNinza has been worth every penny. My kids are learning so much while having fun!",
      rating: 5
    },
    {
      name: "Mike R.",
      role: "Elementary Teacher",
      content: "I recommend the monthly plan to all parents. The educational value is incredible.",
      rating: 5
    },
    {
      name: "Lisa K.",
      role: "Homeschool Mom",
      content: "The progress tracking helps me see exactly what my daughter is learning. Love it!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 pt-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-display font-bold text-primary-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Choose Your Learning Adventure
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Start with a free trial, then choose the plan that works best for your family. All plans include our complete library of educational games and child-safe environment.
          </motion.p>

          {/* Current Subscription Status */}
          {user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="max-w-md mx-auto mb-8"
            >
              <SubscriptionStatus />
            </motion.div>
          )}
        </div>
      </Section>

      {/* Pricing Plans */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-accent-400 to-accent-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                      <Crown className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}
                
                <Card className={`p-8 h-full ${plan.popular ? 'ring-2 ring-accent-400 shadow-xl' : ''}`}>
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white`}>
                      {plan.id === 'free' && <Gift className="w-8 h-8" />}
                      {plan.id === 'monthly' && <Crown className="w-8 h-8" />}
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold text-gray-800 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      {plan.id === 'free' ? (
                        <div>
                          <span className="text-4xl font-bold text-gray-800">Free</span>
                          <p className="text-gray-600">{plan.duration}</p>
                        </div>
                      ) : (
                        <div>
                          <span className="text-4xl font-bold text-gray-800">
                            ${plan.price}
                          </span>
                          <p className="text-gray-600">{plan.duration}</p>
                        </div>
                      )}
                    </div>
                    
                    <ul className="space-y-3 mb-8 text-left">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      color={plan.popular ? "accent" : "primary"}
                      size="lg"
                      className="w-full"
                      onClick={user ? () => handleSubscribe(plan) : undefined}
                      to={!user ? "/auth/login" : undefined}
                      disabled={processingPlan === plan.id || paymentLoading || (isActive() && plan.id === 'monthly')}
                    >
                      {processingPlan === plan.id || (paymentLoading && processingPlan === plan.id)
                        ? 'Processing...' 
                        : isActive() && plan.id === 'monthly'
                          ? 'Current Plan'
                          : !user
                            ? 'Sign In to Subscribe'
                          : plan.cta
                      }
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Payment Error Display */}
        {(paymentError || error) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto mt-8 bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg"
          >
            <p className="text-center">{paymentError || error}</p>
            <button 
              onClick={() => {
                setError(null);
              }}
              className="mt-2 text-sm text-error-600 hover:text-error-800 underline"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </Section>

      {/* Popup Blocker Warning */}
      <PopupBlockerWarning
        isVisible={showPopupWarning}
        onClose={() => {
          setShowPopupWarning(false);
          setPendingPlan(null);
        }}
        onRetry={handleRetryPayment}
      />

      {/* Features Comparison */}
      <Section 
        title="What's Included" 
        subtitle="Compare features across all plans"
        centered
        className="bg-gray-50"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 border-b">
              <div className="font-bold text-gray-800">Features</div>
              <div className="text-center font-bold text-gray-800">Free Trial</div>
              <div className="text-center font-bold text-gray-800">Monthly Plan</div>
            </div>
            
            {[
              { feature: 'Educational Games', free: '5 games', monthly: '44 games' },
              { feature: 'Progress Tracking', free: 'Basic', monthly: 'Detailed' },
              { feature: 'Offline Access', free: '✗', monthly: '✓' },
              { feature: 'Customer Support', free: 'Email', monthly: 'Priority' },
              { feature: 'New Games', free: '✗', monthly: 'Monthly' },
              { feature: 'Parent Dashboard', free: '✗', monthly: '✓' }
            ].map((row, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 p-4 border-b border-gray-100 last:border-b-0">
                <div className="font-medium text-gray-800">{row.feature}</div>
                <div className="text-center text-gray-600">{row.free}</div>
                <div className="text-center text-gray-600">{row.monthly}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section 
        title="What Parents Say" 
        subtitle="Real feedback from families using TinyNinza"
        centered
        className="bg-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full">
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-bold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section 
        title="Frequently Asked Questions" 
        centered
        className="bg-gray-50"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-600">Yes! You can cancel your subscription at any time through your account settings or app store.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Is it really ad-free?</h3>
                <p className="text-gray-600">Absolutely! TinyNinza is 100% ad-free with no in-app purchases or external links.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">What devices are supported?</h3>
                <p className="text-gray-600">TinyNinza works on iOS and Android tablets and phones, with offline access for most games.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Are there any hidden fees?</h3>
                <p className="text-gray-600">No hidden fees! The price you see is exactly what you pay, with no additional charges.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">What happens after the free trial?</h3>
                <p className="text-gray-600">You can choose to subscribe or continue with limited access to 5 featured games.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">How do I manage my subscription?</h3>
                <p className="text-gray-600">You can manage your subscription through your account dashboard or the app store where you subscribed.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Security & Trust */}
      <Section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Safe & Secure for Your Family
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Secure Payments</h3>
              <p className="opacity-90">All payments processed securely through Xsolla</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Privacy Protected</h3>
              <p className="opacity-90">COPPA compliant with no data collection</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Instant Access</h3>
              <p className="opacity-90">Start learning immediately after subscription</p>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Pricing;