import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, CreditCard, LogOut } from 'lucide-react';
import { SubscriptionStatus } from '../components/SubscriptionStatus';
import { supabase } from '../lib/supabase';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your yoga journey and subscription</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Subscription Status */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Subscription Status</h2>
              <SubscriptionStatus />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <h3 className="font-medium text-gray-900 mb-2">Start Practice</h3>
                  <p className="text-sm text-gray-600">Begin your daily yoga session</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <h3 className="font-medium text-gray-900 mb-2">View Progress</h3>
                  <p className="text-sm text-gray-600">Track your yoga journey</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <h3 className="font-medium text-gray-900 mb-2">Browse Library</h3>
                  <p className="text-sm text-gray-600">Explore pose collections</p>
                </button>
                <button 
                  onClick={() => navigate('/pricing')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <h3 className="font-medium text-gray-900 mb-2">Upgrade Plan</h3>
                  <p className="text-sm text-gray-600">Unlock more features</p>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Welcome back!</h3>
                  <p className="text-sm text-gray-600">Yoga Practitioner</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  <Settings className="w-4 h-4 mr-3" />
                  Account Settings
                </button>
                <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  <CreditCard className="w-4 h-4 mr-3" />
                  Billing & Payments
                </button>
                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-medium text-gray-900 mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Sessions this month</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Total practice time</span>
                    <span className="font-medium">8.5 hrs</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};