import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { stripeProducts } from '../stripe-config';

export const Success: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Wait a moment for webhook to process
      setTimeout(() => {
        fetchSubscription();
      }, 2000);
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  const fetchSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .single();

      if (data) {
        setSubscription(data);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const product = subscription 
    ? stripeProducts.find(p => p.priceId === subscription.price_id)
    : null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600">
              Thank you for your subscription. Your yoga journey begins now!
            </p>
          </div>

          {loading ? (
            <div className="mb-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          ) : subscription && product ? (
            <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold text-indigo-900 mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-indigo-700">
                Your subscription is now active
              </p>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-700">
                Your payment is being processed. You'll receive a confirmation email shortly.
              </p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Questions? Contact our support team for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};