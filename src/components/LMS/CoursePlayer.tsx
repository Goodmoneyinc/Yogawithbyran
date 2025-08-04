import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, CheckCircle, BookOpen, MessageCircle, Download, Volume2 } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
  description: string;
  resources?: string[];
}

interface Course {
  id: string;
  title: string;
  lessons: Lesson[];
  currentLessonIndex: number;
}

const sampleCourse: Course = {
  id: '1',
  title: 'Yoga for Absolute Beginners',
  currentLessonIndex: 0,
  lessons: [
    {
      id: '1',
      title: 'Introduction to Yoga',
      duration: '15:30',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      completed: true,
      description: 'Welcome to your yoga journey! In this lesson, we\'ll cover the basics of yoga philosophy and what to expect in your practice.',
      resources: ['Beginner\'s Guide PDF', 'Yoga Mat Recommendations']
    },
    {
      id: '2',
      title: 'Basic Breathing Techniques',
      duration: '12:45',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      completed: true,
      description: 'Learn fundamental breathing techniques that will enhance your yoga practice and daily life.',
      resources: ['Breathing Exercise Guide']
    },
    {
      id: '3',
      title: 'Mountain Pose & Alignment',
      duration: '18:20',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      completed: false,
      description: 'Master the foundation of all standing poses with proper alignment and awareness.',
      resources: ['Alignment Checklist', 'Common Mistakes Guide']
    },
    {
      id: '4',
      title: 'Sun Salutation A',
      duration: '22:15',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      completed: false,
      description: 'Learn the classic Sun Salutation sequence that forms the basis of many yoga practices.'
    }
  ]
};

export default function CoursePlayer() {
  const [course, setCourse] = useState(sampleCourse);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');

  const currentLesson = course.lessons[course.currentLessonIndex];

  const markLessonComplete = () => {
    const updatedCourse = { ...course };
    updatedCourse.lessons[course.currentLessonIndex].completed = true;
    setCourse(updatedCourse);
  };

  const goToNextLesson = () => {
    if (course.currentLessonIndex < course.lessons.length - 1) {
      setCourse({
        ...course,
        currentLessonIndex: course.currentLessonIndex + 1
      });
    }
  };

  const goToPreviousLesson = () => {
    if (course.currentLessonIndex > 0) {
      setCourse({
        ...course,
        currentLessonIndex: course.currentLessonIndex - 1
      });
    }
  };

  const selectLesson = (index: number) => {
    setCourse({
      ...course,
      currentLessonIndex: index
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <div className="bg-black rounded-xl overflow-hidden shadow-lg">
            <div className="aspect-video relative">
              <iframe
                src={currentLesson.videoUrl}
                title={currentLesson.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
            
            {/* Video Controls */}
            <div className="bg-stone-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-sage-600 hover:bg-sage-700 text-white p-2 rounded-full transition-colors"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                  
                  <button
                    onClick={goToPreviousLesson}
                    disabled={course.currentLessonIndex === 0}
                    className="text-white hover:text-sage-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <SkipBack className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={goToNextLesson}
                    disabled={course.currentLessonIndex === course.lessons.length - 1}
                    className="text-white hover:text-sage-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <SkipForward className="h-5 w-5" />
                  </button>
                  
                  <Volume2 className="h-5 w-5 text-white" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm">{currentLesson.duration}</span>
                  {!currentLesson.completed && (
                    <button
                      onClick={markLessonComplete}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Lesson Info */}
          <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-heading font-semibold text-stone-800 mb-2">
                  {currentLesson.title}
                </h1>
                <p className="font-body text-stone-600">
                  {currentLesson.description}
                </p>
              </div>
              {currentLesson.completed && (
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
              )}
            </div>
            
            {/* Resources */}
            {currentLesson.resources && (
              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-lg font-heading font-medium text-stone-800 mb-3">
                  Lesson Resources
                </h3>
                <div className="space-y-2">
                  {currentLesson.resources.map((resource, index) => (
                    <button
                      key={index}
                      className="flex items-center space-x-2 text-sage-600 hover:text-sage-700 font-body"
                    >
                      <Download className="h-4 w-4" />
                      <span>{resource}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Notes Section */}
            <div className="border-t border-gray-100 pt-4 mt-4">
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="flex items-center space-x-2 text-stone-700 hover:text-sage-600 font-body font-medium mb-3"
              >
                <BookOpen className="h-4 w-4" />
                <span>My Notes</span>
              </button>
              
              {showNotes && (
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your notes about this lesson..."
                  className="w-full h-32 p-3 border border-gray-200 rounded-lg font-body text-stone-700 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                />
              )}
            </div>
          </div>
        </div>
        
        {/* Course Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-heading font-semibold text-stone-800 mb-2">
                {course.title}
              </h2>
              <div className="flex items-center space-x-4 text-sm font-body text-stone-500">
                <span>{course.lessons.filter(l => l.completed).length}/{course.lessons.length} completed</span>
                <span>•</span>
                <span>{course.lessons.length} lessons</span>
              </div>
            </div>
            
            {/* Lesson List */}
            <div className="max-h-96 overflow-y-auto">
              {course.lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  onClick={() => selectLesson(index)}
                  className={`w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index === course.currentLessonIndex ? 'bg-sage-50 border-l-4 border-l-sage-600' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-body font-medium text-stone-800 mb-1">
                        {lesson.title}
                      </h3>
                      <p className="text-sm font-body text-stone-500">
                        {lesson.duration}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {lesson.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                      )}
                      {index === course.currentLessonIndex && (
                        <Play className="h-4 w-4 text-sage-600" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Discussion */}
            <div className="p-4 border-t border-gray-100">
              <button className="w-full flex items-center justify-center space-x-2 bg-stone-100 hover:bg-stone-200 text-stone-700 py-2 px-4 rounded-lg font-body font-medium transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span>Join Discussion</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}