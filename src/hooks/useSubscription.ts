import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Subscription {
  customer_id: string;
  subscription_id: string;
  subscription_status: string;
  price_id: string;
  current_period_start: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
  payment_method_brand: string;
  payment_method_last4: string;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
          throw error;
        }

        setSubscription(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch subscription');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  const getSubscriptionPlan = () => {
    if (!subscription?.price_id) return null;
    
    // Map price IDs to plan names
    const priceIdToPlan: Record<string, string> = {
      'price_1S7kjI9wDfAiVIZSGdd7hPVG': 'YOGI avd',
      'price_1S7kim9wDfAiVIZSQYhypnfc': 'Yogi Pre',
      'price_1S7khi9wDfAiVIZSc1j1C58H': 'Basic Yogi'
    };
    
    return priceIdToPlan[subscription.price_id] || 'Unknown Plan';
  };

  const isActive = subscription?.subscription_status === 'active';

  return {
    subscription,
    loading,
    error,
    isActive,
    planName: getSubscriptionPlan()
  };
};