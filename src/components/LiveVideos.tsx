import React, { useState } from 'react';
import { Play, Calendar, Users, Clock, ExternalLink, Youtube } from 'lucide-react';

const liveVideos = [
  {
    id: 1,
    title: "All Levels Open Flow",
    description: "Join our welcoming live session where practitioners of every level can flow together. Modifications and variations provided for all abilities.",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube video IDs
    thumbnail: "/images/IMG_0633(5).jpg",
    duration: "45 min",
    level: "All Levels",
    date: "Today, 7:00 AM",
    viewers: "234 watching",
    isLive: true
  },
  {
    id: 2,
    title: "Power Yoga Challenge",
    description: "High-intensity yoga flow to build strength and endurance. Bring your water!",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube video IDs
    thumbnail: "https://images.pexels.com/photos/3822507/pexels-photo-3822507.jpeg?auto=compress&cs=tinysrgb&w=600",
    duration: "60 min",
    level: "Advanced",
    date: "Yesterday",
    viewers: "1.2K views",
    isLive: false,
  },
  {
    id: 3,
    title: "Prenatal Yoga & Meditation",
    description: "Gentle movements and breathing techniques designed specifically for expecting mothers.",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube video IDs
    thumbnail: "https://images.pexels.com/photos/396133/pexels-photo-396133.jpeg?auto=compress&cs=tinysrgb&w=600",
    duration: "40 min",
    level: "All Levels",
    date: "2 days ago",
    viewers: "892 views",
    isLive: false,
  },
  {
    id: 4,
    title: "Beginner's Fundamentals",
    description: "Learn the basics of yoga with proper alignment and breathing techniques.",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube video IDs
    thumbnail: "https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=600",
    duration: "35 min",
    level: "Beginner",
    date: "3 days ago",
    viewers: "2.1K views",
    isLive: false,
  },
  {
    id: 5,
    title: "Weekend Warrior Flow",
    description: "Energizing weekend practice to boost your mood and prepare for the week ahead.",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube video IDs
    thumbnail: "https://images.pexels.com/photos/3822702/pexels-photo-3822702.jpeg?auto=compress&cs=tinysrgb&w=600",
    duration: "50 min",
    level: "Intermediate",
    date: "1 week ago",
    viewers: "3.4K views",
    isLive: false,
  }
];

const levelColors = {
  "Beginner": "bg-green-100 text-green-800",
  "Intermediate": "bg-blue-100 text-blue-800",
  "Advanced": "bg-purple-100 text-purple-800",
  "All Levels": "bg-gray-100 text-gray-800"
};

export default function LiveVideos() {
  const [selectedVideo, setSelectedVideo] = useState<typeof liveVideos[0] | null>(null);

  const openVideo = (video: typeof liveVideos[0]) => {
    // Open YouTube video in new tab
    window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank');
  };

  return (
    <section id="live-videos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-medium text-stone-800 mb-4">Live & Recent Videos</h2>
          <p className="text-xl font-body font-light text-stone-600 max-w-3xl mx-auto">
            Join our live yoga sessions or catch up on recent classes. All videos are streamed 
            directly from our YouTube channel with interactive community features.
          </p>
        </div>

        {/* Live/Upcoming Videos Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-heading font-medium text-stone-800 mb-6">Live Now</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {liveVideos.filter(video => video.isLive).map((video) => (
              <div key={video.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group relative">
                {video.isLive && (
                  <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                    🔴 LIVE
                  </div>
                )}
                
                <div className="relative cursor-pointer" onClick={() => openVideo(video)}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-white/90 text-gray-900 p-4 rounded-full hover:bg-white transition-colors">
                        <Play className="h-8 w-8" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${levelColors[video.level as keyof typeof levelColors]}`}>
                      {video.level}
                    </span>
                    <div className="flex items-center space-x-1 text-sm text-stone-500">
                      <Clock className="h-4 w-4" />
                      <span>{video.duration}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-heading font-medium text-stone-800 mb-2">{video.title}</h3>
                  <p className="font-body text-stone-600 mb-4">{video.description}</p>
                  
                  <div className="flex items-center justify-between text-sm font-body text-stone-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{video.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{video.viewers}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => openVideo(video)}
                    className="w-full mt-4 bg-sage-600 text-white px-6 py-3 rounded-lg font-body font-medium hover:bg-sage-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Join Live</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>



        {/* YouTube Channel Link */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-heading font-medium text-stone-800 mb-4">
              Subscribe to Our YouTube Channel
            </h3>
            <p className="font-body text-stone-600 mb-6">
              Never miss a live session! Subscribe to get notifications for all our yoga classes, 
              tutorials, and special events.
            </p>
            <button 
              onClick={() => window.open('https://youtube.com/@yogawithbryan-h2x?si=BQoODmoxmpwxvC3M', '_blank')}
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-body font-medium hover:bg-red-700 transition-colors inline-flex items-center space-x-2"
            >
              <Youtube className="h-5 w-5" />
              <span>Subscribe on YouTube</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}