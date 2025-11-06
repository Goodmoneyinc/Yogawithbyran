import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';

export default function SuccessPage() {
  const [planName, setPlanName] = useState<string>('');

  useEffect(() => {
    // Get plan name from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    // In a real implementation, you would fetch the session details from Stripe
    // For now, we'll show a generic success message
    if (sessionId) {
      setPlanName('Your Subscription');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-stone-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-heading font-semibold text-stone-800 mb-4">
            Welcome to Your Yoga Journey!
          </h1>
          
          <p className="text-xl font-body text-stone-600 mb-8">
            {planName ? (
              <>Your subscription to <strong>{planName}</strong> has been activated successfully!</>
            ) : (
              'Your subscription has been activated successfully!'
            )}
          </p>

          {/* What's Next */}
          <div className="bg-sage-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-heading font-medium text-stone-800 mb-4">
              What's Next?
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-sage-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-body font-medium text-stone-800">Access Your Courses</h3>
                  <p className="font-body text-sm text-stone-600">Start with our beginner-friendly courses and progress at your own pace.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-sage-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-body font-medium text-stone-800">Join Live Sessions</h3>
                  <p className="font-body text-sm text-stone-600">Participate in live yoga sessions and connect with our community.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-sage-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-body font-medium text-stone-800">Track Your Progress</h3>
                  <p className="font-body text-sm text-stone-600">Monitor your journey and celebrate your achievements.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-sage-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-body font-medium text-stone-800">Get Support</h3>
                  <p className="font-body text-sm text-stone-600">Reach out anytime for guidance and support on your yoga journey.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#courses"
              className="inline-flex items-center justify-center space-x-2 bg-sage-600 text-white px-8 py-3 rounded-lg font-body font-medium hover:bg-sage-700 transition-colors"
            >
              <span>Start Learning</span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center space-x-2 border border-sage-600 text-sage-600 px-8 py-3 rounded-lg font-body font-medium hover:bg-sage-50 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>Go to Homepage</span>
            </a>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="font-body text-sm text-stone-500">
              Questions? Contact us at{' '}
              <a href="mailto:victorweems57@gmail.com" className="text-sage-600 hover:underline">
                victorweems57@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}