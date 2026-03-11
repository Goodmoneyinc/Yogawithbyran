import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { Upload, Video, Plus, CreditCard as Edit, Trash2, Save, X, Eye, EyeOff } from 'lucide-react';

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
  mux_asset_id: string;
  duration: number | null;
  order_index: number;
  published: boolean;
}

export function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState<Module[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [showVideoUpload, setShowVideoUpload] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);

  const [moduleForm, setModuleForm] = useState({ title: '', description: '' });
  const [videoForm, setVideoForm] = useState({ title: '', description: '' });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    loadModules();
  }, []);

  useEffect(() => {
    if (selectedModule) {
      loadVideos(selectedModule);
    }
  }, [selectedModule]);

  const checkAdminStatus = async () => {
    if (!user?.id) {
      console.error('No user ID available');
      navigate('/auth');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error checking admin status:', error);
        navigate('/dashboard');
        return;
      }

      if (data && (data.role === 'admin' || data.role === 'owner')) {
        setIsAdmin(true);
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const loadModules = async () => {
    try {
      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setModules(data || []);
    } catch (error) {
      console.error('Error loading modules:', error);
    }
  };

  const loadVideos = async (moduleId: number) => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('module_id', moduleId)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error loading videos:', error);
    }
  };

  const handleCreateModule = async () => {
    if (!moduleForm.title) return;

    try {
      const maxOrder = modules.length > 0 ? Math.max(...modules.map(m => m.order_index)) : 0;

      const { error } = await supabase
        .from('modules')
        .insert([{
          title: moduleForm.title,
          description: moduleForm.description || null,
          order_index: maxOrder + 1,
          published: false
        }]);

      if (error) throw error;

      setModuleForm({ title: '', description: '' });
      setShowModuleForm(false);
      loadModules();
    } catch (error) {
      console.error('Error creating module:', error);
      alert('Failed to create module');
    }
  };

  const handleUpdateModule = async () => {
    if (!editingModule) return;

    try {
      const { error } = await supabase
        .from('modules')
        .update({
          title: moduleForm.title,
          description: moduleForm.description || null
        })
        .eq('id', editingModule.id);

      if (error) throw error;

      setEditingModule(null);
      setModuleForm({ title: '', description: '' });
      loadModules();
    } catch (error) {
      console.error('Error updating module:', error);
      alert('Failed to update module');
    }
  };

  const handleToggleModulePublish = async (module: Module) => {
    try {
      const { error } = await supabase
        .from('modules')
        .update({ published: !module.published })
        .eq('id', module.id);

      if (error) throw error;
      loadModules();
    } catch (error) {
      console.error('Error toggling module publish:', error);
    }
  };

  const handleDeleteModule = async (moduleId: number) => {
    if (!confirm('Are you sure you want to delete this module? This will also delete all videos in it.')) return;

    try {
      const { error } = await supabase
        .from('modules')
        .delete()
        .eq('id', moduleId);

      if (error) throw error;

      if (selectedModule === moduleId) {
        setSelectedModule(null);
        setVideos([]);
      }
      loadModules();
    } catch (error) {
      console.error('Error deleting module:', error);
      alert('Failed to delete module');
    }
  };

  const handleVideoUpload = async (file: File) => {
    if (!selectedModule || !videoForm.title) {
      alert('Please select a module and enter a video title');
      return;
    }

    try {
      setUploadStatus('Creating upload URL...');
      setUploadProgress(10);

      const { data: uploadData, error: uploadError } = await supabase.functions.invoke('mux-create-upload', {
        body: { corsOrigin: window.location.origin }
      });

      if (uploadError) throw uploadError;

      const { upload_url, upload_id, asset_id } = uploadData;

      setUploadStatus('Uploading video...');
      setUploadProgress(30);

      const uploadResponse = await fetch(upload_url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      if (!uploadResponse.ok) throw new Error('Upload failed');

      setUploadStatus('Processing video...');
      setUploadProgress(60);

      const { data: assetData, error: assetError } = await supabase.functions.invoke('mux-get-asset', {
        body: { asset_id }
      });

      if (assetError) throw assetError;

      const playbackId = assetData.playback_ids?.[0]?.id;
      const duration = assetData.duration || null;

      if (!playbackId) throw new Error('No playback ID received');

      setUploadStatus('Saving video...');
      setUploadProgress(80);

      const maxOrder = videos.length > 0 ? Math.max(...videos.map(v => v.order_index)) : 0;

      const { error: dbError } = await supabase
        .from('videos')
        .insert([{
          module_id: selectedModule,
          title: videoForm.title,
          description: videoForm.description || null,
          mux_playback_id: playbackId,
          mux_asset_id: asset_id,
          duration: duration,
          order_index: maxOrder + 1,
          published: false
        }]);

      if (dbError) throw dbError;

      setUploadProgress(100);
      setUploadStatus('Upload complete!');
      setVideoForm({ title: '', description: '' });
      setShowVideoUpload(false);
      setUploadProgress(0);
      setUploadStatus('');
      loadVideos(selectedModule);
    } catch (error) {
      console.error('Error uploading video:', error);
      setUploadStatus('Upload failed');
      alert('Failed to upload video. Please try again.');
    }
  };

  const handleToggleVideoPublish = async (video: VideoItem) => {
    try {
      const { error } = await supabase
        .from('videos')
        .update({ published: !video.published })
        .eq('id', video.id);

      if (error) throw error;
      loadVideos(selectedModule!);
    } catch (error) {
      console.error('Error toggling video publish:', error);
    }
  };

  const handleDeleteVideo = async (videoId: number) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', videoId);

      if (error) throw error;
      loadVideos(selectedModule!);
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Failed to delete video');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <h1 className="text-4xl font-bold text-red-600 p-8">Admin Test</h1>
      <div className="bg-white shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-sm text-stone-600 hover:text-stone-900"
            >
              View Student Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Modules</h2>
                <button
                  onClick={() => {
                    setShowModuleForm(true);
                    setEditingModule(null);
                    setModuleForm({ title: '', description: '' });
                  }}
                  className="p-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {showModuleForm && (
                <div className="mb-6 p-4 bg-stone-50 rounded-lg">
                  <h3 className="font-semibold mb-3">{editingModule ? 'Edit Module' : 'New Module'}</h3>
                  <input
                    type="text"
                    placeholder="Module Title"
                    value={moduleForm.title}
                    onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded mb-2"
                  />
                  <textarea
                    placeholder="Description (optional)"
                    value={moduleForm.description}
                    onChange={(e) => setModuleForm({ ...moduleForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded mb-3"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={editingModule ? handleUpdateModule : handleCreateModule}
                      className="flex-1 px-4 py-2 bg-stone-900 text-white rounded hover:bg-stone-800"
                    >
                      <Save className="w-4 h-4 inline mr-2" />
                      {editingModule ? 'Update' : 'Create'}
                    </button>
                    <button
                      onClick={() => {
                        setShowModuleForm(false);
                        setEditingModule(null);
                        setModuleForm({ title: '', description: '' });
                      }}
                      className="px-4 py-2 bg-stone-200 text-stone-800 rounded hover:bg-stone-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {modules.map((module) => (
                  <div
                    key={module.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                      selectedModule === module.id
                        ? 'border-stone-900 bg-stone-50'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                    onClick={() => setSelectedModule(module.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{module.title}</h3>
                        {module.description && (
                          <p className="text-sm text-stone-600 mt-1">{module.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleModulePublish(module);
                          }}
                          className={`p-1 rounded ${
                            module.published ? 'text-green-600 hover:bg-green-50' : 'text-stone-400 hover:bg-stone-100'
                          }`}
                          title={module.published ? 'Published' : 'Unpublished'}
                        >
                          {module.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingModule(module);
                            setModuleForm({ title: module.title, description: module.description || '' });
                            setShowModuleForm(true);
                          }}
                          className="p-1 text-stone-600 hover:bg-stone-100 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteModule(module.id);
                          }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedModule ? (
              <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Videos</h2>
                  <button
                    onClick={() => setShowVideoUpload(!showVideoUpload)}
                    className="px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 flex items-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Upload Video
                  </button>
                </div>

                {showVideoUpload && (
                  <div className="mb-6 p-6 bg-stone-50 rounded-lg">
                    <h3 className="font-semibold mb-4">Upload New Video</h3>
                    <input
                      type="text"
                      placeholder="Video Title"
                      value={videoForm.title}
                      onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded mb-3"
                    />
                    <textarea
                      placeholder="Description (optional)"
                      value={videoForm.description}
                      onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded mb-3"
                      rows={3}
                    />
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => e.target.files?.[0] && handleVideoUpload(e.target.files[0])}
                      className="w-full px-3 py-2 border border-stone-300 rounded mb-3"
                    />
                    {uploadStatus && (
                      <div className="mt-3">
                        <div className="text-sm text-stone-600 mb-2">{uploadStatus}</div>
                        <div className="w-full bg-stone-200 rounded-full h-2">
                          <div
                            className="bg-stone-900 h-2 rounded-full transition-all"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-3">
                  {videos.map((video) => (
                    <div key={video.id} className="p-4 border border-stone-200 rounded-lg hover:border-stone-300">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-stone-100 rounded flex items-center justify-center flex-shrink-0">
                            <Video className="w-6 h-6 text-stone-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{video.title}</h4>
                            {video.description && (
                              <p className="text-sm text-stone-600 mt-1">{video.description}</p>
                            )}
                            <div className="text-xs text-stone-500 mt-2">
                              Playback ID: {video.mux_playback_id}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleVideoPublish(video)}
                            className={`p-2 rounded ${
                              video.published ? 'text-green-600 hover:bg-green-50' : 'text-stone-400 hover:bg-stone-100'
                            }`}
                            title={video.published ? 'Published' : 'Unpublished'}
                          >
                            {video.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleDeleteVideo(video.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {videos.length === 0 && (
                    <div className="text-center py-12 text-stone-500">
                      No videos yet. Upload your first video to get started!
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-12 text-center">
                <Video className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-stone-600">Select a module to manage videos</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
