import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { StripeProduct, formatPrice } from '../stripe-config';
import { supabase } from '../lib/supabase';

interface PricingCardProps {
  product: StripeProduct;
  isPopular?: boolean;
  currentPlan?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({ 
  product, 
  isPopular = false,
  currentPlan 
}) => {
  const [loading, setLoading] = useState(false);
  const isCurrentPlan = currentPlan === product.priceId;

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Redirect to login
        window.location.href = '/login';
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: product.priceId,
          mode: product.mode,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFeatures = (planName: string) => {
    switch (planName) {
      case 'YOGI basic':
        return [
          'Basic yoga poses and sequences',
          'Beginner-friendly tutorials',
          'Weekly progress tracking',
          'Community access',
          'Mobile app access'
        ];
      case 'YOGI PRE':
        return [
          'Everything in Basic',
          'Advanced pose variations',
          'Personalized workout plans',
          'Live monthly sessions',
          'Priority support',
          'Nutrition guidance'
        ];
      case 'YOGI ADV':
        return [
          'Everything in Premium',
          'One-on-one coaching sessions',
          'Custom meditation programs',
          'Advanced analytics',
          'Exclusive masterclasses',
          'Retreat discounts',
          'VIP community access'
        ];
      default:
        return [];
    }
  };

  return (
    <div className={`relative bg-white rounded-2xl shadow-lg p-8 ${
      isPopular ? 'ring-2 ring-indigo-600 scale-105' : ''
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex items-baseline justify-center">
          <span className="text-4xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <span className="text-gray-600 ml-2">/month</span>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {getFeatures(product.name).map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubscribe}
        disabled={loading || isCurrentPlan}
        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
          isCurrentPlan
            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
            : isPopular
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-gray-900 text-white hover:bg-gray-800'
        } ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Processing...
          </div>
        ) : isCurrentPlan ? (
          'Current Plan'
        ) : (
          'Get Started'
        )}
      </button>
    </div>
  );
};