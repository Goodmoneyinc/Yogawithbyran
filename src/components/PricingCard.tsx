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

  const features = getFeaturesByProduct(product.name);

  return (
    <div className={`relative rounded-2xl p-8 ${
      isPopular 
        ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 shadow-xl' 
        : 'bg-white border border-gray-200 shadow-lg'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
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
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
            isPopular
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg'
              : 'bg-gray-900 hover:bg-gray-800 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Start Subscription'
          )}
        </button>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const getFeaturesByProduct = (productName: string): string[] => {
  switch (productName) {
    case 'YOGI avd':
      return [
        'Advanced yoga sequences',
        'Personalized practice plans',
        'One-on-one instructor sessions',
        'Premium meditation library',
        'Advanced progress tracking',
        'Priority customer support',
        'Exclusive workshops and retreats'
      ];
    case 'Yogi Pre':
      return [
        'Intermediate yoga programs',
        'Community access and forums',
        'Group virtual classes',
        'Progress tracking dashboard',
        'Meditation and mindfulness content',
        'Email support'
      ];
    case 'Basic Yogi':
      return [
        'Essential yoga poses library',
        'Basic breathing exercises',
        'Beginner-friendly sequences',
        'Mobile app access',
        'Basic progress tracking'
      ];
    default:
      return [];
  }
};