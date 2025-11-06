import React from 'react';
import { Clock, Users, Star, Play, Loader2 } from 'lucide-react';
import { createCheckoutSession } from '../lib/stripe';

const courses = [
  {
    id: 1,
    title: "Beginner 1",
    priceId: "price_1S7khi9wDfAiVIZSc1j1C58H",
    level: "Beginner",
    duration: "4 weeks",
    students: "2,340",
    rating: 4.9,
    price: "$20",
    image: "/images/IMG_0633(1).jpg",
    
    description: "Perfect introduction to yoga with gentle poses and breathing techniques.",
    lessons: 4,
    videoDuration: "15-30 min",
    instructor: "bw"
  },
  {
    id: 2,
    title: "Beginner 2",
    priceId: "price_1S7kim9wDfAiVIZSQYhypnfc",
    level: "Beginner",
    duration: "6 weeks",
    students: "1,890",
    rating: 4.8,
    price: "$20",
    image: "/images/IMG_0633(3).jpg",
    description: "Continue building your foundation with flowing sequences and deeper poses.",
    lessons: 4,
    videoDuration: "15-30 min",
    instructor: "bw"
  },
  {
    id: 3,
    title: "Beginner 3",
    priceId: "price_1S7kim9wDfAiVIZSQYhypnfc",
    level: "Beginner",
    duration: "7 weeks",
    students: "1,156",
    rating: 4.9,
    price: "$20",
    image: "/images/IMG_0633(4).jpg",
    description: "Develop strength and flexibility with more challenging beginner poses and techniques.",
    lessons: 4,
    videoDuration: "15-30 min",
    instructor: "bw"
  },
  {
    id: 4,
    title: "Beginner 4",
    priceId: "price_1S7kjI9wDfAiVIZSGdd7hPVG",
    level: "Beginner",
    duration: "8 weeks",
    students: "956",
    rating: 4.9,
    price: "$20",
    image: "/images/IMG_0633(2).jpg",
    description: "Complete your beginner journey with confidence-building poses and breathing techniques.",
    lessons: 4,
    videoDuration: "15-30 min",
    instructor: "bw"
  },
];

const levelColors = {
  "Beginner": "bg-green-100 text-green-800",
  "Intermediate": "bg-blue-100 text-blue-800",
  "Advanced": "bg-purple-100 text-purple-800",
  "All Levels": "bg-gray-100 text-gray-800"
};

export default function OnlineCourses() {
  const [loadingCourse, setLoadingCourse] = React.useState<number | null>(null);

  const handleEnroll = async (courseId: number, priceId: string, courseName: string) => {
    setLoadingCourse(courseId);
    
    try {
      await createCheckoutSession({
        priceId: priceId,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: window.location.href,
        mode: 'payment'
      });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoadingCourse(null);
    }
  };

  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-medium text-stone-800 mb-4">Online Yoga Courses</h2>
          <p className="text-xl font-body font-light text-stone-600 max-w-3xl mx-auto">
            Learn at your own pace with our comprehensive video courses. 
            Each course includes step-by-step instructions, modifications, and lifetime access.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const isLoading = loadingCourse === course.id;
            
            return (
            <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${levelColors[course.level as keyof typeof levelColors]}`}>
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white/90 text-gray-900 p-3 rounded-full hover:bg-white transition-colors">
                      <Play className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-heading font-medium text-stone-800 mb-2">{course.title}</h3>
                <p className="font-body text-stone-600 mb-4">{course.description}</p>
                
                <div className="flex items-center space-x-4 text-sm font-body text-stone-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Play className="h-4 w-4" />
                      <span>{course.lessons} videos ({course.videoDuration})</span>
                    </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-amber-500 fill-current" />
                      <span className="text-sm font-body font-medium">{course.rating}</span>
                    </div>
                    <span className="text-2xl font-heading font-semibold text-sage-700">{course.price}</span>
                  </div>
                  <button 
                    onClick={() => handleEnroll(course.id, course.priceId, course.title)}
                    disabled={isLoading}
                    className="bg-sage-600 text-white px-6 py-2 rounded-lg font-body font-medium hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>Enroll Now</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}