import React, { useState, useEffect } from 'react';
import { Play, Clock, X, Loader2, AlertCircle } from 'lucide-react';

interface YouTubeVideo {
  title: string;
  description: string;
  embedUrl: string;
  videoId: string;
  publishedAt: string;
  thumbnailUrl: string;
}

interface APIResponse {
  success: boolean;
  count: number;
  videos: YouTubeVideo[];
  error?: string;
}

export default function CourseOutline() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [playlistId, setPlaylistId] = useState('PL1Z9718vXb3jwQ0dF90z7C8mxPvf34COI');

  const playlists = [
    {
      id: 'PL1Z9718vXb3jwQ0dF90z7C8mxPvf34COI',
      name: 'Yoga for Absolute Beginners',
      description: 'Perfect introduction to yoga with gentle poses and breathing techniques'
    },
    {
      id: 'PL1Z9718vXb3gjKyoek6imDxfuNLbM7Iw9',
      name: 'Pre-Intermediate Flow Mastery',
      description: 'Advance your practice with flowing sequences and deeper poses'
    }
  ];

  useEffect(() => {
    fetchPlaylistVideos();
  }, [playlistId]);

  const fetchPlaylistVideos = async () => {
    if (!playlistId.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, replace with your actual Supabase URL
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
      const response = await fetch(`${supabaseUrl}/functions/v1/youtube-playlist?playlistId=${playlistId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: APIResponse = await response.json();
      
      if (data.success) {
        setVideos(data.videos);
      } else {
        setError(data.error || 'Failed to fetch videos');
      }
    } catch (err) {
      console.error('Error fetching playlist:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  };

  const openVideoModal = (video: YouTubeVideo) => {
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateDescription = (description: string, maxLength: number = 150) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-semibold text-stone-800 mb-4">
            Course Outline
          </h1>
          <p className="text-xl font-body font-light text-stone-600 max-w-3xl mx-auto mb-8">
            Follow along with our comprehensive yoga course. Each lesson builds upon the previous one 
            to guide you through your yoga journey.
          </p>
          
          {/* Playlist Selector */}
          <div className="max-w-md mx-auto mb-8">
            <label htmlFor="playlistSelector" className="block text-sm font-body font-medium text-stone-700 mb-2">
              Select Course
            </label>
            <select
              id="playlistSelector"
              value={playlistId}
              onChange={(e) => setPlaylistId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-body text-stone-700 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
            >
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
            <p className="mt-2 text-sm font-body text-stone-500">
              {playlists.find(p => p.id === playlistId)?.description}
            </p>
          </div>

          {/* Custom Playlist ID Input */}
          <div className="max-w-md mx-auto mb-8">
            <details className="group">
              <summary className="cursor-pointer text-sm font-body font-medium text-sage-600 hover:text-sage-700 mb-2">
                Or enter custom playlist ID
              </summary>
              <div className="flex space-x-2 mt-2">
                <input
                  type="text"
                  id="customPlaylistId"
                  value={playlistId}
                  onChange={(e) => setPlaylistId(e.target.value)}
                  placeholder="Enter YouTube Playlist ID"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-body text-stone-700 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                />
                <button
                  onClick={fetchPlaylistVideos}
                  disabled={loading || !playlistId.trim()}
                  className="bg-sage-600 text-white px-4 py-2 rounded-lg font-body font-medium hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Load
                </button>
              </div>
            </details>
          </div>
        </div>

        {/* Course Info */}
        {!loading && !error && videos.length > 0 && (
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <h2 className="text-2xl font-heading font-medium text-stone-800 mb-2">
              {playlists.find(p => p.id === playlistId)?.name || 'Custom Playlist'}
            </h2>
            <p className="font-body text-stone-600 mb-4">
              {playlists.find(p => p.id === playlistId)?.description || 'Custom yoga course playlist'}
            </p>
            <div className="bg-sage-50 rounded-lg p-4 inline-block">
              <span className="font-body font-medium text-sage-800">
                {videos.length} lessons available
              </span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-sage-600 animate-spin mr-3" />
            <span className="font-body text-stone-600">Loading course videos...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-body font-medium text-red-800">Error Loading Videos</h3>
                <p className="font-body text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Course Videos Grid */}
        {!loading && !error && videos.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div
                key={video.videoId}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => openVideoModal(video)}
              >
                {/* Lesson Number Badge */}
                <div className="relative">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-sage-600 text-white px-3 py-1 rounded-full text-sm font-body font-medium">
                    Lesson {index + 1}
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-white/90 text-gray-900 p-4 rounded-full hover:bg-white transition-colors">
                        <Play className="h-8 w-8" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-heading font-medium text-stone-800 mb-3 line-clamp-2">
                    {video.title}
                  </h3>
                  
                  <p className="font-body text-stone-600 mb-4 text-sm leading-relaxed">
                    {truncateDescription(video.description)}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm font-body text-stone-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Video Lesson</span>
                    </div>
                    <span>{formatDate(video.publishedAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && videos.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Play className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-heading font-medium text-stone-800 mb-2">
              No Videos Found
            </h3>
            <p className="font-body text-stone-600">
              Please check the playlist ID and try again.
            </p>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-heading font-semibold text-stone-800 pr-8">
                {selectedVideo.title}
              </h2>
              <button
                onClick={closeVideoModal}
                className="text-stone-500 hover:text-stone-700 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Video Player */}
            <div className="aspect-video">
              <iframe
                src={selectedVideo.embedUrl}
                title={selectedVideo.title}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
            
            {/* Video Description */}
            <div className="p-6 max-h-40 overflow-y-auto">
              <h3 className="font-heading font-medium text-stone-800 mb-2">About this lesson</h3>
              <p className="font-body text-stone-600 leading-relaxed">
                {selectedVideo.description || 'No description available.'}
              </p>
              <p className="font-body text-sm text-stone-500 mt-4">
                Published on {formatDate(selectedVideo.publishedAt)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
                value={playlistId}
                onChange={(e) => setPlaylistId(e.target.value)}
                placeholder="Enter YouTube Playlist ID"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-body text-stone-700 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              />
              <button
                onClick={fetchPlaylistVideos}
                disabled={loading || !playlistId.trim()}
                className="bg-sage-600 text-white px-4 py-2 rounded-lg font-body font-medium hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Load
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-sage-600 animate-spin mr-3" />
            <span className="font-body text-stone-600">Loading course videos...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-body font-medium text-red-800">Error Loading Videos</h3>
                <p className="font-body text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Course Videos Grid */}
        {!loading && !error && videos.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div
                key={video.videoId}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => openVideoModal(video)}
              >
                {/* Lesson Number Badge */}
                <div className="relative">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-sage-600 text-white px-3 py-1 rounded-full text-sm font-body font-medium">
                    Lesson {index + 1}
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-white/90 text-gray-900 p-4 rounded-full hover:bg-white transition-colors">
                        <Play className="h-8 w-8" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-heading font-medium text-stone-800 mb-3 line-clamp-2">
                    {video.title}
                  </h3>
                  
                  <p className="font-body text-stone-600 mb-4 text-sm leading-relaxed">
                    {truncateDescription(video.description)}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm font-body text-stone-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Video Lesson</span>
                    </div>
                    <span>{formatDate(video.publishedAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && videos.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Play className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-heading font-medium text-stone-800 mb-2">
              No Videos Found
            </h3>
            <p className="font-body text-stone-600">
              Please check the playlist ID and try again.
            </p>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-heading font-semibold text-stone-800 pr-8">
                {selectedVideo.title}
              </h2>
              <button
                onClick={closeVideoModal}
                className="text-stone-500 hover:text-stone-700 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Video Player */}
            <div className="aspect-video">
              <iframe
                src={selectedVideo.embedUrl}
                title={selectedVideo.title}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
            
            {/* Video Description */}
            <div className="p-6 max-h-40 overflow-y-auto">
              <h3 className="font-heading font-medium text-stone-800 mb-2">About this lesson</h3>
              <p className="font-body text-stone-600 leading-relaxed">
                {selectedVideo.description || 'No description available.'}
              </p>
              <p className="font-body text-sm text-stone-500 mt-4">
                Published on {formatDate(selectedVideo.publishedAt)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}