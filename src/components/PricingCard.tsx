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
    <div className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
      isPopular ? 'border-indigo-500 scale-105' : 'border-gray-200'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-6">{product.description}</p>
        
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <span className="text-gray-600 ml-2">/month</span>
        </div>

        <button
          onClick={handleSubscribe}
          disabled={isLoading}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
            isPopular
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-gray-900 hover:bg-gray-800 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Start Subscription'
          )}
        </button>

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
    </div>
  );
};

const getFeaturesByPlan = (planName: string): string[] => {
  switch (planName) {
    case 'Basic Yogi':
      return [
        'Access to basic yoga poses',
        'Breathing technique guides',
        'Weekly progress tracking',
        'Mobile app access',
        'Community forum access'
      ];
    case 'Yogi Pre':
      return [
        'Everything in Basic Yogi',
        'Intermediate pose library',
        'Personalized workout plans',
        'Video tutorials',
        'Monthly live sessions',
        'Priority support'
      ];
    case 'YOGI avd':
      return [
        'Everything in Yogi Pre',
        'Advanced pose sequences',
        'One-on-one coaching sessions',
        'Custom meal planning',
        'Unlimited live classes',
        'Premium content library',
        'VIP community access'
      ];
    default:
      return [];
  }
};