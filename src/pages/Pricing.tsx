import React, { useEffect, useState } from 'react';
import { PricingCard } from '../components/PricingCard';
import { stripeProducts } from '../stripe-config';
import { getUserSubscription, UserSubscription } from '../lib/supabase';

export const Pricing: React.FC = () => {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const userSub = await getUserSubscription();
        setSubscription(userSub);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Yoga Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your practice with our comprehensive yoga programs. 
            From beginner basics to advanced techniques, find the perfect plan for your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stripeProducts.map((product, index) => (
            <PricingCard
              key={product.id}
              product={product}
              isPopular={index === 1} // Make YOGI PRE popular
              currentPlan={subscription?.price_id}
            />
          ))}
        </div>

        {subscription && (
          <div className="mt-12 text-center">
            <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Current Subscription
              </h3>
              <p className="text-gray-600">
                You're currently subscribed to{' '}
                <span className="font-medium">
                  {stripeProducts.find(p => p.priceId === subscription.price_id)?.name || 'Unknown Plan'}
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Status: <span className="capitalize">{subscription.subscription_status}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};