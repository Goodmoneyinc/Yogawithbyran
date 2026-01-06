import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LogOut, Play, Lock } from 'lucide-react';

export function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      navigate('/auth');
      return;
    }

    setUser(user);

    const { data: customerData } = await supabase
      .from('stripe_customers')
      .select('customer_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (customerData) {
      const { data: subData } = await supabase
        .from('stripe_subscriptions')
        .select('*')
        .eq('customer_id', customerData.customer_id)
        .maybeSingle();

      setSubscription(subData);
    }

    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const videos = [
    {
      id: 1,
      title: 'Introduction to Combat Training',
      description: 'Learn the fundamentals of combat techniques',
      thumbnail: '/images/IMG_6672.jpg',
      duration: '45:30',
      level: 'Beginner'
    },
    {
      id: 2,
      title: 'Advanced Striking Techniques',
      description: 'Master advanced striking combinations',
      thumbnail: '/images/IMG_6673.jpg',
      duration: '52:15',
      level: 'Advanced'
    },
    {
      id: 3,
      title: 'Defensive Tactics',
      description: 'Essential defensive maneuvers and counters',
      thumbnail: '/images/IMG_6674.jpg',
      duration: '38:45',
      level: 'Intermediate'
    },
    {
      id: 4,
      title: 'Conditioning & Fitness',
      description: 'Build strength and endurance for combat',
      thumbnail: '/images/IMG_7465.PNG',
      duration: '60:00',
      level: 'All Levels'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const hasActiveSubscription = subscription &&
    ['active', 'trialing'].includes(subscription.status);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">My Training Videos</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">{user?.email}</span>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!hasActiveSubscription && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <Lock className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  You need an active subscription to access videos.{' '}
                  <button
                    onClick={() => navigate('/')}
                    className="font-medium underline hover:text-yellow-600"
                  >
                    View subscription plans
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className={`bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg ${
                !hasActiveSubscription ? 'opacity-60' : ''
              }`}
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
                <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                  {video.level}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {video.title}
                </h3>
                <p className="text-gray-600 mb-4">{video.description}</p>
                <button
                  disabled={!hasActiveSubscription}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="w-5 h-5" />
                  {hasActiveSubscription ? 'Watch Now' : 'Locked'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
