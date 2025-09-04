import React from 'react';
import { Check, Star, Crown, Calendar, Loader2 } from 'lucide-react';
import { products } from '../stripe-config';
import { useAuth } from '../hooks/useAuth';
import { createCheckoutSession } from '../lib/stripe';

const planFeatures = {
  basic: [
    "Access to beginner courses",
    "Basic breathing techniques",
    "Community forum access",
    "Email support",
    "Progress tracking",
    "Mobile app access"
  ],
  pre: [
    "Access to ALL courses",
    "Intermediate & advanced content",
    "Premium community access",
    "Priority email support",
    "Downloadable resources",
    "Progress tracking",
    "Live Q&A sessions",
    "Personalized practice plans"
  ],
  adv: [
    "Access to ALL courses",
    "Advanced techniques & inversions",
    "Premium community access",
    "One-on-one consultations",
    "Priority support",
    "Downloadable resources",
    "Progress tracking",
    "Live Q&A sessions",
    "Personalized practice plans",
    "Workshop early access",
    "Exclusive merchandise discounts",
    "Annual retreat discounts"
  ]
};

export default function SubscriptionPlans() {
  const { user } = useAuth();
  const [loadingPlan, setLoadingPlan] = React.useState<string | null>(null);

  const handleSubscribe = async (priceId: string, planName: string) => {
    if (!user) {
      // Redirect to login
      window.location.href = '/login';
      return;
    }

    setLoadingPlan(priceId);
    
    try {
      const successUrl = `${window.location.origin}/success?plan=${encodeURIComponent(planName)}`;
      const cancelUrl = window.location.href;
      
      await createCheckoutSession({
        priceId,
        successUrl,
        cancelUrl,
        mode: 'subscription'
      });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

  const getFeatures = (productName: string) => {
    if (productName.includes('basic')) return planFeatures.basic;
    if (productName.includes('PRE')) return planFeatures.pre;
    if (productName.includes('ADV')) return planFeatures.adv;
    return planFeatures.basic;
  };

  const isPopular = (productName: string) => productName.includes('PRE');

  return (
    <section id="plans" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-medium text-stone-800 mb-4">Choose Your Journey</h2>
          <p className="text-xl font-body font-light text-stone-600 max-w-3xl mx-auto">
            Select the perfect subscription plan for your yoga practice. All plans include access to courses 
            and exclusive member benefits.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => {
            const popular = isPopular(product.name);
            const features = getFeatures(product.name);
            const isLoading = loadingPlan === product.priceId;
            
            return (
            <div
              key={product.id}
              className={`relative rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                popular
                  ? 'bg-gradient-to-br from-sage-50 to-stone-50 border-2 border-sage-500 transform scale-105'
                  : 'bg-white border border-gray-200 hover:border-sage-300'
              }`}
            >
              {popular && (
                <div className="absolute top-0 left-0 right-0 bg-sage-600 text-white text-center py-3 text-sm font-medium">
                  <div className="flex items-center justify-center space-x-1">
                    <Crown className="h-4 w-4" />
                    <span className="font-body">Most Popular</span>
                  </div>
                </div>
              )}
              
              <div className={`p-8 ${popular ? 'pt-16' : ''}`}>
                <h3 className="text-2xl font-heading font-medium text-stone-800 mb-2 text-center">
                  {product.name}
                </h3>
                <p className="font-body text-stone-600 mb-6 text-center text-sm">
                  {product.description}
                </p>
                
                <div className="mb-8 text-center">
                  <span className="text-4xl font-heading font-semibold text-stone-800">
                    {product.price}
                  </span>
                  {product.name === 'YOGI PRE' ? (
                    <div>
                      <span className="font-body text-stone-600 ml-2 text-lg">
                        per six months
                      </span>
                      <div className="mt-2">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          Save $21 for six months
                        </span>
                      </div>
                    </div>
                  ) : product.name === 'YOGI ADV' ? (
                    <div>
                      <span className="font-body text-stone-600 ml-2 text-lg">
                        for the year
                      </span>
                      <div className="mt-2">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          Save $50 for the year
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="font-body text-stone-600 ml-2 text-lg">
                      per month
                    </span>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-sage-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className={`font-body text-stone-700 text-sm ${
                        feature.startsWith('Bonus:') ? 'font-medium text-sage-700' : ''
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => handleSubscribe(product.priceId, product.name)}
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-lg font-body font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                  popular
                    ? 'bg-sage-600 text-white hover:bg-sage-700'
                    : 'bg-stone-600 text-white hover:bg-stone-700'
                }`}>
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : `Subscribe to ${product.name}`}
                </button>
              </div>
            </div>
          )})}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-sage-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="h-5 w-5 text-sage-600" />
                <span className="font-body text-stone-700">Cancel anytime</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Star className="h-5 w-5 text-sage-600" />
                <span className="font-body text-stone-700">No commitment</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Check className="h-5 w-5 text-sage-600" />
                <span className="font-body text-stone-700">30-day guarantee</span>
              </div>
            </div>
            <p className="text-sm font-body text-stone-600">
              Need a custom plan for your business or organization? 
              <a href="#contact" className="text-sage-600 hover:underline ml-1">Contact us</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}