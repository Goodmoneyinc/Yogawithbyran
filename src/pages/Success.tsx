import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { getUserSubscription, UserSubscription } from '../lib/supabase';
import { stripeProducts } from '../stripe-config';

export const Success: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        // Wait a moment for webhook to process
        await new Promise(resolve => setTimeout(resolve, 2000));
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

  const subscribedPlan = subscription 
    ? stripeProducts.find(p => p.priceId === subscription.price_id)
    : null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Thank you for subscribing to our yoga program.
          </p>
        </div>

        {loading ? (
          <div className="mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="text-sm text-gray-500 mt-2">Loading your subscription details...</p>
          </div>
        ) : subscribedPlan ? (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-1">
              Welcome to {subscribedPlan.name}!
            </h3>
            <p className="text-sm text-gray-600">
              Your subscription is now active and ready to use.
            </p>
          </div>
        ) : (
          <div className="bg-yellow-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              Your payment was processed successfully. Your subscription details will be available shortly.
            </p>
          </div>
        )}

        {sessionId && (
          <div className="text-xs text-gray-400 mb-6">
            Session ID: {sessionId}
          </div>
        )}

        <div className="space-y-3">
          <Link
            to="/dashboard"
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
          >
            Go to Dashboard
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
          
          <Link
            to="/"
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@yogi.com" className="text-indigo-600 hover:underline">
              support@yogi.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};