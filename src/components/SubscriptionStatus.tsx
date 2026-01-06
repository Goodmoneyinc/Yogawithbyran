import React, { useEffect, useState } from 'react';
import { Crown, Calendar, CreditCard } from 'lucide-react';
import { getUserSubscription, UserSubscription } from '../lib/supabase';
import { getProductByPriceId, formatPrice } from '../stripe-config';

export const SubscriptionStatus: React.FC = () => {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const data = await getUserSubscription();
        setSubscription(data);
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
        <Crown className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Subscription</h3>
        <p className="text-gray-600">Subscribe to a plan to start your yoga journey</p>
      </div>
    );
  }

  const product = getProductByPriceId(subscription.price_id);
  const periodEnd = new Date(subscription.current_period_end * 1000);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <Crown className="w-8 h-8 text-indigo-600 mr-3" />
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {product?.name || 'Active Subscription'}
            </h3>
            <p className="text-indigo-600 font-semibold capitalize">
              {subscription.subscription_status}
            </p>
          </div>
        </div>
        {product && (
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </div>
            <div className="text-sm text-gray-600">/month</div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="flex items-center text-gray-700">
          <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
          <div>
            <div className="text-sm text-gray-600">Next billing date</div>
            <div className="font-semibold">{periodEnd.toLocaleDateString()}</div>
          </div>
        </div>
        
        {subscription.payment_method_brand && subscription.payment_method_last4 && (
          <div className="flex items-center text-gray-700">
            <CreditCard className="w-5 h-5 mr-2 text-indigo-600" />
            <div>
              <div className="text-sm text-gray-600">Payment method</div>
              <div className="font-semibold capitalize">
                {subscription.payment_method_brand} •••• {subscription.payment_method_last4}
              </div>
            </div>
          </div>
        )}
      </div>

      {subscription.cancel_at_period_end && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            Your subscription will cancel at the end of the current billing period.
          </p>
        </div>
      )}
    </div>
  );
};