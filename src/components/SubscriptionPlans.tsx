import React from 'react';
import { Check, Star, Crown, Calendar, Loader2 } from 'lucide-react';
import { products } from '../stripe-config';
import { supabase } from '../lib/supabase';

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
    "Access to beginner courses",
    "Basic breathing techniques",
    "Community forum access",
    "Email support",
    "Progress tracking",
    "Mobile app access"
  ],
  adv: [
    "Access to beginner courses",
    "Basic breathing techniques",
    "Community forum access",
    "Email support",
    "Progress tracking",
    "Mobile app access"
  ]
};

export default function SubscriptionPlans() {
  const [loadingPlan, setLoadingPlan] = React.useState<string | null>(null);

  const handleSubscribe = async (priceId: string, planName: string) => {
    setLoadingPlan(priceId);

    try {
      console.log('Creating checkout session for price:', priceId);

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: priceId,
          success_url: `${window.location.origin}/success`,
          cancel_url: window.location.href,
        }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Checkout error:', errorData);
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const data = await response.json();
      console.log('Checkout session created:', data);

      if (data?.url) {
        console.log('Redirecting to Stripe checkout...');
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Unable to process checkout: ${errorMessage}\n\nPlease check the console for more details.`);
    } finally {
      setLoadingPlan(null);
    }
  };

  const getFeatures = (productName: string) => {
    return planFeatures.basic;
  };

  const isPopular = (product: any) => product.price === '$99';

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
            const popular = isPopular(product);
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
                    ${product.price}
                  </span>
                  <span className="font-body text-stone-600 ml-2 text-lg">
                    per month
                  </span>
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
              <a href="mailto:victorweems57@gmail.com" className="text-sage-600 hover:underline ml-1">Contact us</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}