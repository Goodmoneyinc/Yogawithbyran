import React, { useEffect, useState } from 'react';
import { Crown, Calendar, CreditCard } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { stripeProducts } from '../stripe-config';

interface SubscriptionData {
  subscription_status: string;
  price_id: string;
  current_period_end: number;
  payment_method_brand?: string;
  payment_method_last4?: string;
}

export const SubscriptionStatus: React.FC = () => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
        return;
      }

      setSubscription(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!subscription || subscription.subscription_status !== 'active') {
    return (
      <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
        <Crown className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600">No active subscription</p>
      </div>
    );
  }

  const product = stripeProducts.find(p => p.priceId === subscription.price_id);
  const planName = product?.name || 'Unknown Plan';
  const endDate = new Date(subscription.current_period_end * 1000);

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Crown className="w-6 h-6 mr-2" />
          <h3 className="text-lg font-semibold">Active Subscription</h3>
        </div>
        <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
          {subscription.subscription_status}
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-indigo-100 text-sm">Current Plan</p>
          <p className="text-xl font-bold">{planName}</p>
        </div>

        <div className="flex items-center text-indigo-100">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">
            Renews on {endDate.toLocaleDateString()}
          </span>
        </div>

        {subscription.payment_method_brand && subscription.payment_method_last4 && (
          <div className="flex items-center text-indigo-100">
            <CreditCard className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {subscription.payment_method_brand} •••• {subscription.payment_method_last4}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};