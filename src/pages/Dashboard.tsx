import React from 'react';
import { SubscriptionStatus } from '../components/SubscriptionStatus';
import { Activity, Calendar, Target, TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Track your yoga journey and manage your subscription</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subscription Status */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Subscription Status</h2>
            <SubscriptionStatus />
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center">
                    <Activity className="w-8 h-8 text-indigo-600 mr-3" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">12</div>
                      <div className="text-sm text-gray-600">Sessions this month</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center">
                    <Calendar className="w-8 h-8 text-green-600 mr-3" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">5</div>
                      <div className="text-sm text-gray-600">Day streak</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center">
                    <Target className="w-8 h-8 text-purple-600 mr-3" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">8/10</div>
                      <div className="text-sm text-gray-600">Weekly goal</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center">
                    <TrendingUp className="w-8 h-8 text-orange-600 mr-3" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">+15%</div>
                      <div className="text-sm text-gray-600">Flexibility improvement</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { date: 'Today', activity: 'Morning Flow', duration: '30 min', type: 'Vinyasa' },
                  { date: 'Yesterday', activity: 'Evening Relaxation', duration: '20 min', type: 'Restorative' },
                  { date: '2 days ago', activity: 'Power Yoga', duration: '45 min', type: 'Ashtanga' },
                  { date: '3 days ago', activity: 'Gentle Stretch', duration: '25 min', type: 'Hatha' },
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <div className="font-semibold text-gray-900">{session.activity}</div>
                      <div className="text-sm text-gray-600">{session.date} • {session.type}</div>
                    </div>
                    <div className="text-sm font-medium text-indigo-600">
                      {session.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};