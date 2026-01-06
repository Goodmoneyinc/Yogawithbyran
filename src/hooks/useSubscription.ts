import { useState, useEffect } from 'react';
import { getUserSubscription, UserSubscription } from '../lib/supabase';
import { getProductByPriceId } from '../stripe-config';
import { useAuth } from './useAuth';

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    const fetchSubscription = async () => {
      try {
        const data = await getUserSubscription();
        setSubscription(data);
      } catch (error) {
        console.error('Error fetching subscription:', error);
        setSubscription(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  const currentPlan = subscription?.price_id 
    ? getProductByPriceId(subscription.price_id)
    : null;

  const isActive = subscription?.subscription_status === 'active' || subscription?.subscription_status === 'trialing';

  return {
    subscription,
    currentPlan,
    isActive,
    loading
  };
}