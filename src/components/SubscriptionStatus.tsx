import React from 'react';
import { Crown, AlertCircle, CheckCircle } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';

export const SubscriptionStatus: React.FC = () => {
  const { subscription, loading, isActive, planName } = useSubscription();

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="animate-pulse flex items-center">
          <div className="w-5 h-5 bg-gray-300 rounded mr-3"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
          <div>
            <p className="text-yellow-800 font-medium">No Active Subscription</p>
            <p className="text-yellow-700 text-sm">Subscribe to access premium features</p>
          </div>
        </div>
      </div>
    );
  }

  const statusColor = isActive ? 'green' : 'red';
  const StatusIcon = isActive ? CheckCircle : AlertCircle;

  return (
    <div className={`bg-${statusColor}-50 border border-${statusColor}-200 rounded-lg p-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <StatusIcon className={`w-5 h-5 text-${statusColor}-600 mr-3`} />
          <div>
            <div className="flex items-center">
              <Crown className="w-4 h-4 text-yellow-500 mr-2" />
              <p className={`text-${statusColor}-800 font-medium`}>{planName}</p>
            </div>
            <p className={`text-${statusColor}-700 text-sm capitalize`}>
              Status: {subscription.subscription_status}
            </p>
          </div>
        </div>
        
        {subscription.current_period_end && (
          <div className="text-right">
            <p className={`text-${statusColor}-700 text-sm`}>
              {subscription.cancel_at_period_end ? 'Expires' : 'Renews'}
            </p>
            <p className={`text-${statusColor}-800 font-medium text-sm`}>
              {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};