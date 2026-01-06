import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PricingCard } from '../components/PricingCard';
import { stripeProducts } from '../stripe-config';

export const Pricing: React.FC = () => {
  const navigate = useNavigate();

  const handleSubscribe = async (priceId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout process. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Yoga Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your practice with our comprehensive yoga programs. 
            From beginner-friendly basics to advanced techniques, find the perfect plan for your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stripeProducts.map((product, index) => (
            <PricingCard
              key={product.id}
              product={product}
              isPopular={index === 1} // Make Yogi Pre the popular option
              onSubscribe={handleSubscribe}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include a 7-day free trial. Cancel anytime.
          </p>
          <p className="text-sm text-gray-500">
            Secure payments powered by Stripe. Your data is protected with enterprise-grade security.
          </p>
        </div>
      </div>
    </div>
  );
};