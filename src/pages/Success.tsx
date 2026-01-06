import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Loader2, ArrowRight } from 'lucide-react';

export const Success: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      navigate('/pricing');
      return;
    }

    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
      setSessionData({
        sessionId,
        customerEmail: 'user@example.com', // This would come from the actual session
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchParams, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Processing your subscription...
          </h2>
          <p className="text-gray-600">
            Please wait while we set up your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to Your Yoga Journey!
            </h1>
            <p className="text-gray-600">
              Your subscription has been successfully activated.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
            <ul className="text-sm text-green-700 space-y-1 text-left">
              <li>• Check your email for welcome instructions</li>
              <li>• Access your personalized dashboard</li>
              <li>• Start your first yoga session</li>
              <li>• Join our community forum</li>
            </ul>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Return Home
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Session ID: {sessionData?.sessionId?.slice(-8)}
          </p>
        </div>
      </div>
    </div>
  );
};