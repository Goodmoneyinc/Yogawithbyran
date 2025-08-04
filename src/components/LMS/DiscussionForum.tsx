import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, Reply, Send, User, Clock, Pin } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  timestamp: string;
  likes: number;
  replies: number;
  isPinned?: boolean;
  category: string;
}

interface Reply {
  id: string;
  content: string;
  author: string;
  authorAvatar: string;
  timestamp: string;
  likes: number;
}

const forumPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Tips for maintaining balance in Tree Pose',
    content: 'I\'ve been struggling with Tree Pose lately. Any tips for maintaining balance? I can hold it for about 10 seconds before I start wobbling.',
    author: 'Sarah M.',
    authorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    timestamp: '2 hours ago',
    likes: 12,
    replies: 8,
    isPinned: true,
    category: 'Poses & Techniques'
  },
  {
    id: '2',
    title: 'Breathing techniques for anxiety',
    content: 'Can anyone recommend specific breathing exercises that help with anxiety? I\'ve heard yoga breathing can be really helpful.',
    author: 'Mike R.',
    authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    timestamp: '4 hours ago',
    likes: 18,
    replies: 15,
    category: 'Breathing & Meditation'
  },
  {
    id: '3',
    title: 'Morning routine suggestions',
    content: 'What\'s your favorite morning yoga routine? Looking for something energizing but not too intense for early mornings.',
    author: 'Emma L.',
    authorAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    timestamp: '1 day ago',
    likes: 25,
    replies: 22,
    category: 'Routines & Sequences'
  },
  {
    id: '4',
    title: 'Yoga mat recommendations',
    content: 'My old mat is getting worn out. What are your favorite yoga mats? Looking for something with good grip and cushioning.',
    author: 'David K.',
    authorAvatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=100',
    timestamp: '2 days ago',
    likes: 9,
    replies: 12,
    category: 'Equipment & Gear'
  }
];

const sampleReplies: Reply[] = [
  {
    id: '1',
    content: 'Focus on a fixed point in front of you (drishti) and engage your core. Also, try pressing your foot firmly into your standing leg - it creates more stability!',
    author: 'Bryan Weems',
    authorAvatar: '/IMG_0633.jpg',
    timestamp: '1 hour ago',
    likes: 15
  },
  {
    id: '2',
    content: 'Great advice! I also find that starting with my toe on the ground and gradually lifting helps build confidence.',
    author: 'Lisa P.',
    authorAvatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100',
    timestamp: '45 minutes ago',
    likes: 8
  }
];

const categories = [
  'All Discussions',
  'Poses & Techniques',
  'Breathing & Meditation',
  'Routines & Sequences',
  'Equipment & Gear',
  'Beginner Questions',
  'General Discussion'
];

export default function DiscussionForum() {
  const [selectedCategory, setSelectedCategory] = useState('All Discussions');
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newReply, setNewReply] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const filteredPosts = selectedCategory === 'All Discussions' 
    ? forumPosts 
    : forumPosts.filter(post => post.category === selectedCategory);

  const handleNewPost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      // In a real implementation, this would save to a database
      console.log('New post:', { title: newPostTitle, content: newPostContent });
      setNewPostTitle('');
      setNewPostContent('');
      setShowNewPostForm(false);
    }
  };

  const handleReply = () => {
    if (newReply.trim()) {
      // In a real implementation, this would save to a database
      console.log('New reply:', newReply);
      setNewReply('');
    }
  };

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => setSelectedPost(null)}
          className="mb-6 text-sage-600 hover:text-sage-700 font-body font-medium"
        >
          ← Back to Forum
        </button>

        {/* Post Detail */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-start space-x-4">
            <img
              src={selectedPost.authorAvatar}
              alt={selectedPost.author}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                {selectedPost.isPinned && (
                  <Pin className="h-4 w-4 text-amber-500" />
                )}
                <h1 className="text-2xl font-heading font-semibold text-stone-800">
                  {selectedPost.title}
                </h1>
              </div>
              <div className="flex items-center space-x-4 text-sm font-body text-stone-500 mb-4">
                <span>{selectedPost.author}</span>
                <span>•</span>
                <span>{selectedPost.timestamp}</span>
                <span>•</span>
                <span className="bg-sage-100 text-sage-700 px-2 py-1 rounded-full text-xs">
                  {selectedPost.category}
                </span>
              </div>
              <p className="font-body text-stone-700 mb-4">{selectedPost.content}</p>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-stone-500 hover:text-sage-600">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-sm">{selectedPost.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-stone-500 hover:text-sage-600">
                  <Reply className="h-4 w-4" />
                  <span className="text-sm">Reply</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Replies */}
        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-heading font-semibold text-stone-800">
            Replies ({sampleReplies.length})
          </h2>
          {sampleReplies.map((reply) => (
            <div key={reply.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={reply.authorAvatar}
                  alt={reply.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-body font-medium text-stone-800">{reply.author}</span>
                    <span className="text-sm font-body text-stone-500">{reply.timestamp}</span>
                  </div>
                  <p className="font-body text-stone-700 mb-3">{reply.content}</p>
                  <button className="flex items-center space-x-1 text-stone-500 hover:text-sage-600">
                    <ThumbsUp className="h-3 w-3" />
                    <span className="text-sm">{reply.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reply Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-heading font-semibold text-stone-800 mb-4">Add a Reply</h3>
          <textarea
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Share your thoughts or advice..."
            className="w-full h-32 p-3 border border-gray-200 rounded-lg font-body text-stone-700 focus:ring-2 focus:ring-sage-500 focus:border-transparent mb-4"
          />
          <div className="flex justify-end">
            <button
              onClick={handleReply}
              className="flex items-center space-x-2 bg-sage-600 text-white px-6 py-2 rounded-lg font-body font-medium hover:bg-sage-700 transition-colors"
            >
              <Send className="h-4 w-4" />
              <span>Post Reply</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-stone-800 mb-2">
            Community Forum
          </h1>
          <p className="font-body text-stone-600">
            Connect with fellow yogis, ask questions, and share your journey
          </p>
        </div>
        <button
          onClick={() => setShowNewPostForm(true)}
          className="mt-4 sm:mt-0 bg-sage-600 text-white px-6 py-3 rounded-lg font-body font-medium hover:bg-sage-700 transition-colors"
        >
          Start New Discussion
        </button>
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-heading font-semibold text-stone-800 mb-4">
            Start a New Discussion
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="Discussion title..."
              className="w-full p-3 border border-gray-200 rounded-lg font-body text-stone-700 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
            />
            <select className="w-full p-3 border border-gray-200 rounded-lg font-body text-stone-700 focus:ring-2 focus:ring-sage-500 focus:border-transparent">
              {categories.slice(1).map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="What would you like to discuss?"
              className="w-full h-32 p-3 border border-gray-200 rounded-lg font-body text-stone-700 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
            />
            <div className="flex space-x-4">
              <button
                onClick={handleNewPost}
                className="bg-sage-600 text-white px-6 py-2 rounded-lg font-body font-medium hover:bg-sage-700 transition-colors"
              >
                Post Discussion
              </button>
              <button
                onClick={() => setShowNewPostForm(false)}
                className="border border-gray-300 text-stone-700 px-6 py-2 rounded-lg font-body font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
            <h2 className="text-lg font-heading font-semibold text-stone-800 mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left p-2 rounded-lg font-body transition-colors ${
                    selectedCategory === category
                      ? 'bg-sage-100 text-sage-700'
                      : 'text-stone-600 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Forum Posts */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {post.isPinned && (
                        <Pin className="h-4 w-4 text-amber-500" />
                      )}
                      <h3 className="text-lg font-heading font-semibold text-stone-800 hover:text-sage-600">
                        {post.title}
                      </h3>
                    </div>
                    <p className="font-body text-stone-600 mb-3 line-clamp-2">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm font-body text-stone-500">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.timestamp}</span>
                        <span>•</span>
                        <span className="bg-sage-100 text-sage-700 px-2 py-1 rounded-full text-xs">
                          {post.category}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm font-body text-stone-500">
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.replies}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}