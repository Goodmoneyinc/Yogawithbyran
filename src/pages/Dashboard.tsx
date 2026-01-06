import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, TrendingUp, Award, Clock } from 'lucide-react';
import { supabase, getUserSubscription, UserSubscription } from '../lib/supabase';
import { stripeProducts, formatPrice } from '../stripe-config';

export const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }
      setUser(user);

      try {
        const userSub = await getUserSubscription();
        setSubscription(userSub);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const currentPlan = subscription 
    ? stripeProducts.find(p => p.priceId === subscription.price_id)
    : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-gray-600 mt-2">
            Continue your yoga journey with personalized guidance and tracking.
          </p>
        </div>

        {/* Subscription Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Subscription Status</h2>
          {subscription && subscription.subscription_status === 'active' ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-medium text-green-600">
                  {currentPlan?.name || 'Active Plan'}
                </p>
                <p className="text-gray-600">
                  {currentPlan ? formatPrice(currentPlan.price) : ''}/month
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Next billing: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">You don't have an active subscription</p>
              <button
                onClick={() => navigate('/pricing')}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Choose a Plan
              </button>
            </div>
          )}
        </div>

        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Sessions This Week</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Practice Time</p>
                <p className="text-2xl font-bold text-gray-900">12h</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Streak</p>
                <p className="text-2xl font-bold text-gray-900">7 days</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Achievements</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-900">Morning Flow Session</p>
                <p className="text-sm text-gray-600">45 minutes • Beginner Level</p>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-900">Meditation Practice</p>
                <p className="text-sm text-gray-600">20 minutes • Mindfulness</p>
              </div>
              <span className="text-sm text-gray-500">Yesterday</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Evening Relaxation</p>
                <p className="text-sm text-gray-600">30 minutes • Restorative</p>
              </div>
              <span className="text-sm text-gray-500">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};