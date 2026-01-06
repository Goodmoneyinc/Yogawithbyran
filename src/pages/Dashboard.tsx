import React from 'react';
import { SubscriptionStatus } from '../components/SubscriptionStatus';
import { Activity, Calendar, Target, TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Track your yoga journey and progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subscription Status */}
          <div className="lg:col-span-1">
            <SubscriptionStatus />
          </div>

          {/* Stats Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Sessions This Week</h3>
                  <Activity className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">12</p>
                <p className="text-sm text-green-600 mt-1">+3 from last week</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Total Practice Time</h3>
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">8.5h</p>
                <p className="text-sm text-green-600 mt-1">+1.2h from last week</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Goals Achieved</h3>
                  <Target className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">7/10</p>
                <p className="text-sm text-gray-600 mt-1">This month</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Streak</h3>
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">15 days</p>
                <p className="text-sm text-green-600 mt-1">Personal best!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
            <div className="space-y-4">
              {[
                { name: 'Morning Flow', duration: '45 min', date: 'Today' },
                { name: 'Evening Relaxation', duration: '30 min', date: 'Yesterday' },
                { name: 'Power Yoga', duration: '60 min', date: '2 days ago' },
              ].map((session, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">{session.name}</p>
                    <p className="text-sm text-gray-600">{session.date}</p>
                  </div>
                  <span className="text-sm text-indigo-600 font-medium">{session.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};