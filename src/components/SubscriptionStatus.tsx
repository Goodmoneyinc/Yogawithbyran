import React, { useEffect, useState } from 'react';
import { Crown, AlertCircle } from 'lucide-react';
import { getUserSubscription, UserSubscription } from '../lib/supabase';
import { stripeProducts } from '../stripe-config';

export const SubscriptionStatus: React.FC = () => {
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
      <div className="animate-pulse bg-gray-200 h-6 w-32 rounded"></div>
    );
  }

  if (!subscription || subscription.subscription_status !== 'active') {
    return (
      <div className="flex items-center text-sm text-gray-600">
        <AlertCircle className="h-4 w-4 mr-1" />
        No active subscription
      </div>
    );
  }

  const plan = stripeProducts.find(p => p.priceId === subscription.price_id);

  return (
    <div className="flex items-center text-sm">
      <Crown className="h-4 w-4 mr-1 text-yellow-500" />
      <span className="font-medium text-gray-900">
        {plan?.name || 'Active Plan'}
      </span>
    </div>
  );
};