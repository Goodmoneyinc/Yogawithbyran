import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LogOut, CheckCircle, Circle, Settings, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import MuxPlayer from '@mux/mux-player-react';

interface Module {
  id: number;
  title: string;
  description: string | null;
  order_index: number;
  published: boolean;
}

interface VideoItem {
  id: number;
  module_id: number;
  title: string;
  description: string | null;
  mux_playback_id: string;
  duration: number | null;
  order_index: number;
}

interface Progress {
  video_id: number;
  completed: boolean;
  last_position: number;
  completion_percentage: number;
}

export function StudentDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [modules, setModules] = useState<Module[]>([]);
  const [videos, setVideos] = useState<{ [moduleId: number]: VideoItem[] }>({});
  const [progress, setProgress] = useState<{ [videoId: number]: Progress }>({});
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      checkAccess();
      loadModulesAndVideos();
      loadProgress();
    }
  }, [user]);

  const checkAccess = async () => {
    try {
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (roleData && (roleData.role === 'admin' || roleData.role === 'owner')) {
        setIsAdmin(true);
        setHasAccess(true);
      } else if (roleData && roleData.role === 'student') {
        setHasAccess(true);
      }

      const { data: customerData } = await supabase
        .from('stripe_customers')
        .select('customer_id')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (customerData) {
        const { data: subData } = await supabase
          .from('stripe_subscriptions')
          .select('status')
          .eq('customer_id', customerData.customer_id)
          .maybeSingle();

        if (subData && ['active', 'trialing'].includes(subData.status)) {
          setHasAccess(true);
        }
      }
    } catch (error) {
      console.error('Error checking access:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadModulesAndVideos = async () => {
    try {
      const { data: modulesData, error: modulesError } = await supabase
        .from('modules')
        .select('*')
        .eq('published', true)
        .order('order_index', { ascending: true });

      if (modulesError) throw modulesError;

      setModules(modulesData || []);

      const videosByModule: { [key: number]: VideoItem[] } = {};

      for (const module of modulesData || []) {
        const { data: videosData, error: videosError } = await supabase
          .from('videos')
          .select('*')
          .eq('module_id', module.id)
          .eq('published', true)
          .order('order_index', { ascending: true });

        if (videosError) throw videosError;

        videosByModule[module.id] = videosData || [];
      }

      setVideos(videosByModule);

      const firstModule = modulesData?.[0];
      if (firstModule && videosByModule[firstModule.id]?.[0]) {
        setSelectedVideo(videosByModule[firstModule.id][0]);
      }
    } catch (error) {
      console.error('Error loading modules and videos:', error);
    }
  };

  const loadProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;

      const progressMap: { [key: number]: Progress } = {};
      data?.forEach((p) => {
        progressMap[p.video_id] = p;
      });

      setProgress(progressMap);
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const updateProgress = async (videoId: number, position: number, duration: number) => {
    if (!duration) return;

    const percentage = Math.floor((position / duration) * 100);
    const isCompleted = percentage >= 90;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user?.id,
          video_id: videoId,
          last_position: Math.floor(position),
          completion_percentage: percentage,
          completed: isCompleted,
          completed_at: isCompleted ? new Date().toISOString() : null,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,video_id'
        });

      if (error) throw error;

      setProgress((prev) => ({
        ...prev,
        [videoId]: {
          video_id: videoId,
          completed: isCompleted,
          last_position: Math.floor(position),
          completion_percentage: percentage
        }
      }));
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Required</h2>
          <p className="text-stone-600 mb-6">
            You need an active subscription to access the course content.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800"
          >
            View Subscription Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <nav className="bg-white shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Training Dashboard</h1>
            <div className="flex items-center gap-4">
              {isAdmin && (
                <button
                  onClick={() => navigate('/admin')}
                  className="flex items-center gap-2 px-4 py-2 text-stone-700 hover:text-stone-900 transition"
                >
                  <Settings className="w-5 h-5" />
                  Admin
                </button>
              )}
              <span className="text-stone-600">{user?.email}</span>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 text-stone-700 hover:text-stone-900 transition"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex">
        <div className="w-80 bg-white border-r border-stone-200 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Course Content</h2>
            <div className="space-y-4">
              {modules.map((module) => (
                <div key={module.id}>
                  <h3 className="font-semibold text-gray-900 mb-2">{module.title}</h3>
                  <div className="space-y-1 ml-2">
                    {videos[module.id]?.map((video) => {
                      const isCompleted = progress[video.id]?.completed || false;
                      const isSelected = selectedVideo?.id === video.id;

                      return (
                        <button
                          key={video.id}
                          onClick={() => setSelectedVideo(video)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition flex items-start gap-2 ${
                            isSelected
                              ? 'bg-stone-900 text-white'
                              : 'hover:bg-stone-100 text-stone-700'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isSelected ? 'text-green-400' : 'text-green-600'}`} />
                          ) : (
                            <Circle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isSelected ? 'text-white' : 'text-stone-400'}`} />
                          )}
                          <span className="text-sm flex-1">{video.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 bg-black">
          {selectedVideo ? (
            <div className="h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center bg-black">
                <MuxPlayer
                  playbackId={selectedVideo.mux_playback_id}
                  metadata={{
                    video_title: selectedVideo.title
                  }}
                  streamType="on-demand"
                  onTimeUpdate={(e: any) => {
                    const target = e.target as HTMLVideoElement;
                    if (selectedVideo.duration && target.currentTime) {
                      updateProgress(selectedVideo.id, target.currentTime, selectedVideo.duration);
                    }
                  }}
                  style={{ width: '100%', maxHeight: '100%' }}
                />
              </div>
              <div className="bg-white border-t border-stone-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedVideo.title}</h2>
                {selectedVideo.description && (
                  <p className="text-stone-600">{selectedVideo.description}</p>
                )}
                {progress[selectedVideo.id] && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-stone-600">
                    <div className="flex-1 bg-stone-200 rounded-full h-2">
                      <div
                        className="bg-stone-900 h-2 rounded-full transition-all"
                        style={{ width: `${progress[selectedVideo.id].completion_percentage}%` }}
                      />
                    </div>
                    <span>{progress[selectedVideo.id].completion_percentage}%</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Select a video to start learning</h3>
                <p className="text-stone-400">Choose from the course content on the left</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
