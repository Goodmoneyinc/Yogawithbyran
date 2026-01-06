import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { StripeProduct, formatPrice } from '../stripe-config';

interface PricingCardProps {
  product: StripeProduct;
  isPopular?: boolean;
  onSubscribe: (priceId: string) => Promise<void>;
}

export const PricingCard: React.FC<PricingCardProps> = ({ 
  product, 
  isPopular = false, 
  onSubscribe 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      await onSubscribe(product.priceId);
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const features = getFeaturesByPlan(product.name);

  return (
    <div className={`relative bg-white rounded-2xl shadow-xl p-8 ${
      isPopular ? 'ring-2 ring-indigo-600 scale-105' : ''
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-6">{product.description}</p>
        
        <div className="mb-8">
          <span className="text-4xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <span className="text-gray-600 ml-2">/month</span>
        </div>
        
        <button
          onClick={handleSubscribe}
          disabled={isLoading}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            isPopular
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Subscribe Now'
          )}
        </button>
      </div>
      
      <div className="mt-8">
        <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const getFeaturesByPlan = (planName: string): string[] => {
  switch (planName) {
    case 'Basic Yogi':
      return [
        'Access to basic yoga poses',
        'Breathing technique guides',
        'Weekly practice sessions',
        'Mobile app access',
        'Community forum access'
      ];
    case 'Yogi Pre':
      return [
        'Everything in Basic Yogi',
        'Intermediate pose library',
        'Personalized practice plans',
        'Live monthly sessions',
        'Progress tracking',
        'Nutrition guidance'
      ];
    case 'YOGI avd':
      return [
        'Everything in Yogi Pre',
        'Advanced pose sequences',
        'One-on-one coaching sessions',
        'Custom meal plans',
        'Priority support',
        'Exclusive workshops',
        'Retreat discounts'
      ];
    default:
      return [];
  }
};