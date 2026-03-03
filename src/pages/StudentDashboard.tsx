import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LogOut, CheckCircle, PlayCircle, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import MuxPlayer from '@mux/mux-player-react';

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  mux_playback_id: string;
  module_name: string;
  level: string;
  order_index: number;
  published: boolean;
}

interface ModuleGroup {
  [moduleName: string]: Lesson[];
}

interface Progress {
  lesson_id: string;
  completed: boolean;
  last_position: number;
  completion_percentage: number;
}

export function StudentDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [modules, setModules] = useState<ModuleGroup>({});
  const [progress, setProgress] = useState<{ [lessonId: string]: Progress }>({});
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [expandedModules, setExpandedModules] = useState<{ [moduleName: string]: boolean }>({});
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
      loadCurriculum();
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

  const loadCurriculum = async () => {
    try {
      const { data: lessonsData, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('published', true)
        .order('level', { ascending: true })
        .order('order_index', { ascending: true });

      if (error) throw error;

      const grouped = (lessonsData || []).reduce((acc: ModuleGroup, lesson: Lesson) => {
        const key = lesson.module_name || 'Introduction';
        if (!acc[key]) acc[key] = [];
        acc[key].push(lesson);
        return acc;
      }, {});

      setModules(grouped);

      if (lessonsData && lessonsData.length > 0) {
        setSelectedLesson(lessonsData[0]);
      }
    } catch (error) {
      console.error('Error loading curriculum:', error);
    }
  };

  const loadProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;

      const progressMap: { [key: string]: Progress } = {};
      data?.forEach((p) => {
        progressMap[p.lesson_id] = p;
      });

      setProgress(progressMap);
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const toggleModule = (moduleName: string) => {
    setExpandedModules(prev => ({ ...prev, [moduleName]: !prev[moduleName] }));
  };

  const updateProgress = async (lessonId: string, position: number, duration: number) => {
    if (!duration) return;

    const percentage = Math.floor((position / duration) * 100);
    const isCompleted = percentage >= 90;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user?.id,
          lesson_id: lessonId,
          last_position: Math.floor(position),
          completion_percentage: percentage,
          completed: isCompleted,
          completed_at: isCompleted ? new Date().toISOString() : null,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,lesson_id'
        });

      if (error) throw error;

      setProgress((prev) => ({
        ...prev,
        [lessonId]: {
          lesson_id: lessonId,
          completed: isCompleted,
          last_position: Math.floor(position),
          completion_percentage: percentage
        }
      }));
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const markLessonComplete = async () => {
    if (!selectedLesson) return;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user?.id,
          lesson_id: selectedLesson.id,
          completed: true,
          completion_percentage: 100,
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,lesson_id'
        });

      if (error) throw error;

      setProgress((prev) => ({
        ...prev,
        [selectedLesson.id]: {
          lesson_id: selectedLesson.id,
          completed: true,
          last_position: 0,
          completion_percentage: 100
        }
      }));
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  };

  const handleVideoEnd = () => {
    if (!selectedLesson) return;

    const flatLessons = Object.values(modules).flat();
    const currentIndex = flatLessons.findIndex(l => l.id === selectedLesson.id);

    if (currentIndex < flatLessons.length - 1) {
      const nextLesson = flatLessons[currentIndex + 1];
      setSelectedLesson(nextLesson);
      console.log(`Auto-advancing to: ${nextLesson.title}`);
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
    <div className="flex h-screen bg-stone-50">
      <div className="w-96 bg-white border-r border-stone-200 flex flex-col">
        <div className="p-6 border-b border-stone-100">
          <h2 className="text-xl font-bold text-stone-800">Your Practice</h2>
          <p className="text-sm text-stone-500">Progress: Beginner Levels 1-4</p>
          <div className="flex items-center gap-4 mt-4">
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-stone-700 hover:text-stone-900 transition border border-stone-200 rounded-lg"
              >
                <Settings className="w-4 h-4" />
                Admin
              </button>
            )}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-stone-700 hover:text-stone-900 transition border border-stone-200 rounded-lg"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {Object.entries(modules).map(([moduleName, lessons]) => (
            <div key={moduleName} className="border border-stone-100 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleModule(moduleName)}
                className="w-full flex items-center justify-between p-4 bg-stone-50 hover:bg-stone-100 transition"
              >
                <span className="font-semibold text-stone-700">{moduleName}</span>
                {expandedModules[moduleName] ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
              </button>

              {!expandedModules[moduleName] && (
                <div className="bg-white">
                  {lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lesson)}
                      className={`w-full flex items-center gap-3 p-4 text-left border-t border-stone-50 hover:bg-stone-50 transition ${
                        selectedLesson?.id === lesson.id ? 'bg-stone-100 border-l-4 border-l-stone-800' : ''
                      }`}
                    >
                      <PlayCircle size={18} className={selectedLesson?.id === lesson.id ? 'text-stone-800' : 'text-stone-400'} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-stone-800">{lesson.title}</p>
                        {lesson.level && (
                          <span className="text-[10px] uppercase tracking-widest text-stone-600 font-bold">
                            Level {lesson.level}
                          </span>
                        )}
                      </div>
                      {progress[lesson.id]?.completed && (
                        <CheckCircle size={18} className="text-green-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-10 flex flex-col items-center">
        {selectedLesson ? (
          <div className="w-full max-w-5xl">
            <div className="shadow-2xl rounded-3xl overflow-hidden bg-black aspect-video border-8 border-white">
              <MuxPlayer
                playbackId={selectedLesson.mux_playback_id}
                metadata={{ video_title: selectedLesson.title }}
                accentColor="#1c1917"
                primaryColor="#FFFFFF"
                streamType="on-demand"
                onEnded={handleVideoEnd}
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            <div className="mt-8 flex justify-between items-start">
              <div>
                {selectedLesson.level && (
                  <span className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-xs font-bold uppercase tracking-tight">
                    {selectedLesson.level} Level
                  </span>
                )}
                <h1 className="text-3xl font-bold text-stone-800 mt-3">
                  {selectedLesson.title}
                </h1>
                {selectedLesson.description && (
                  <p className="text-stone-600 mt-2 max-w-2xl">{selectedLesson.description}</p>
                )}
              </div>

              <button
                onClick={markLessonComplete}
                className="flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-full font-bold hover:bg-stone-800 transition shadow-lg"
              >
                <CheckCircle size={20} />
                Mark Complete
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-stone-400">
            <PlayCircle size={64} className="mb-4 opacity-20" />
            <p className="text-xl">Ready to begin? Select a lesson.</p>
          </div>
        )}
      </div>
    </div>
  );
}
