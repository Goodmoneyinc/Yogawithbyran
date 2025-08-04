import React, { useState } from 'react';
import { BookOpen, Play, CheckCircle, Clock, Award, MessageCircle, User, BarChart3 } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  nextLesson: string;
  image: string;
  instructor: string;
  duration: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

const enrolledCourses: Course[] = [
  {
    id: '1',
    title: 'Yoga for Absolute Beginners',
    progress: 75,
    totalLessons: 12,
    completedLessons: 9,
    nextLesson: 'Standing Balance Poses',
    image: '/images/IMG_0633(1).jpg',
    instructor: 'Bryan Weems',
    duration: '4 weeks'
  },
  {
    id: '2',
    title: 'Pre-Intermediate Flow Mastery',
    progress: 30,
    totalLessons: 16,
    completedLessons: 5,
    nextLesson: 'Sun Salutation Variations',
    image: '/images/IMG_0633(3).jpg',
    instructor: 'Bryan Weems',
    duration: '6 weeks'
  },
  {
    id: '3',
    title: 'Restorative & Yin Yoga',
    progress: 100,
    totalLessons: 10,
    completedLessons: 10,
    nextLesson: 'Course Completed!',
    image: 'https://images.pexels.com/photos/3822501/pexels-photo-3822501.jpeg?auto=compress&cs=tinysrgb&w=400',
    instructor: 'Bryan Weems',
    duration: '5 weeks'
  }
];

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Completed your first yoga lesson',
    icon: '🎯',
    earned: true,
    earnedDate: '2024-01-15'
  },
  {
    id: '2',
    title: 'Consistency Champion',
    description: 'Practiced yoga for 7 days in a row',
    icon: '🔥',
    earned: true,
    earnedDate: '2024-01-22'
  },
  {
    id: '3',
    title: 'Course Completion',
    description: 'Finished your first complete course',
    icon: '🏆',
    earned: true,
    earnedDate: '2024-02-01'
  },
  {
    id: '4',
    title: 'Advanced Practitioner',
    description: 'Complete 3 intermediate courses',
    icon: '⭐',
    earned: false
  }
];

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const totalProgress = Math.round(
    enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length
  );

  const totalCompletedLessons = enrolledCourses.reduce((acc, course) => acc + course.completedLessons, 0);
  const totalLessons = enrolledCourses.reduce((acc, course) => acc + course.totalLessons, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-semibold text-stone-800 mb-2">
          Welcome back, Student!
        </h1>
        <p className="font-body text-stone-600">
          Continue your yoga journey and track your progress
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-body text-stone-500">Overall Progress</p>
              <p className="text-2xl font-heading font-semibold text-stone-800">{totalProgress}%</p>
            </div>
            <BarChart3 className="h-8 w-8 text-sage-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-body text-stone-500">Lessons Completed</p>
              <p className="text-2xl font-heading font-semibold text-stone-800">{totalCompletedLessons}/{totalLessons}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-body text-stone-500">Active Courses</p>
              <p className="text-2xl font-heading font-semibold text-stone-800">{enrolledCourses.filter(c => c.progress < 100).length}</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-body text-stone-500">Achievements</p>
              <p className="text-2xl font-heading font-semibold text-stone-800">{achievements.filter(a => a.earned).length}</p>
            </div>
            <Award className="h-8 w-8 text-amber-600" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'My Courses', icon: BookOpen },
            { id: 'achievements', label: 'Achievements', icon: Award },
            { id: 'progress', label: 'Progress', icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-body font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-sage-600 text-sage-600'
                  : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-heading font-medium text-stone-800">My Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-heading font-medium text-stone-800 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm font-body text-stone-500 mb-4">
                    by {course.instructor} • {course.duration}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm font-body text-stone-600 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-sage-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm font-body text-stone-500 mb-4">
                    <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{course.duration}</span>
                    </span>
                  </div>
                  
                  {course.progress < 100 ? (
                    <button className="w-full bg-sage-600 text-white py-2 px-4 rounded-lg font-body font-medium hover:bg-sage-700 transition-colors flex items-center justify-center space-x-2">
                      <Play className="h-4 w-4" />
                      <span>Continue: {course.nextLesson}</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-center space-x-2 text-green-600 font-body font-medium">
                      <CheckCircle className="h-4 w-4" />
                      <span>Course Completed!</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-heading font-medium text-stone-800">Achievements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`bg-white rounded-xl p-6 shadow-sm border transition-all ${
                  achievement.earned
                    ? 'border-sage-200 bg-sage-50'
                    : 'border-gray-100 opacity-60'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h3 className="text-lg font-heading font-medium text-stone-800 mb-2">
                    {achievement.title}
                  </h3>
                  <p className="font-body text-stone-600 text-sm mb-3">
                    {achievement.description}
                  </p>
                  {achievement.earned && achievement.earnedDate && (
                    <p className="text-xs font-body text-sage-600">
                      Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                    </p>
                  )}
                  {!achievement.earned && (
                    <p className="text-xs font-body text-stone-400">Not earned yet</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-heading font-medium text-stone-800">Learning Progress</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-heading font-medium text-stone-800 mb-4">Course Progress</h3>
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="flex items-center space-x-4">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-body font-medium text-stone-800">{course.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-sage-600 h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-body text-stone-600">{course.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}