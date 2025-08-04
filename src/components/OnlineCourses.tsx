import React from 'react';
import { Clock, Users, Star, Play } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: "Yoga for Absolute Beginners",
    level: "Beginner",
    duration: "4 weeks",
    students: "2,340",
    rating: 4.9,
    price: "$20",
    image: "/images/IMG_0633(1).jpg",
    
    description: "Perfect introduction to yoga with gentle poses and breathing techniques.",
    lessons: 4,
    videoDuration: "15-30 min"
  },
  {
    id: 2,
    title: "Intermediate Flow Mastery",
    level: "Intermediate",
    duration: "6 weeks",
    students: "1,890",
    rating: 4.8,
    price: "$20",
    image: "https://images.pexels.com/photos/3822702/pexels-photo-3822702.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Advance your practice with flowing sequences and deeper poses.",
    lessons: 4,
    videoDuration: "15-30 min"
  },
  {
    id: 3,
    title: "Advanced Yoga Techniques",
    level: "Advanced",
    duration: "8 weeks",
    students: "956",
    rating: 4.9,
    price: "$20",
    image: "/images/IMG_0633(2).jpg",
    description: "Master challenging poses, inversions, and advanced breathing.",
    lessons: 4,
    videoDuration: "15-30 min"
  },
  {
    id: 4,
    title: "Prenatal Yoga Journey",
    level: "All Levels",
    duration: "10 weeks",
    students: "1,234",
    rating: 5.0,
    price: "$20",
    image: "https://images.pexels.com/photos/396133/pexels-photo-396133.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Safe and nurturing yoga practice for expecting mothers.",
    lessons: 4,
    videoDuration: "15-30 min"
  },
  {
    id: 5,
    title: "Restorative & Yin Yoga",
    level: "All Levels",
    duration: "5 weeks",
    students: "1,567",
    rating: 4.8,
    price: "$20",
    image: "https://images.pexels.com/photos/3822501/pexels-photo-3822501.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Deep relaxation and stress relief through gentle, supported poses.",
    lessons: 4,
    videoDuration: "15-30 min"
  },
  {
    id: 6,
    title: "Power Yoga Intensive",
    level: "Intermediate",
    duration: "6 weeks",
    students: "1,045",
    rating: 4.7,
    price: "$20",
    image: "https://images.pexels.com/photos/3822507/pexels-photo-3822507.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Build strength and endurance with dynamic, challenging sequences.",
    lessons: 4,
    videoDuration: "15-30 min"
  }
];

const levelColors = {
  "Beginner": "bg-green-100 text-green-800",
  "Intermediate": "bg-blue-100 text-blue-800",
  "Advanced": "bg-purple-100 text-purple-800",
  "All Levels": "bg-gray-100 text-gray-800"
};

export default function OnlineCourses() {
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
          {courses.map((course) => (
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
                  <button className="bg-sage-600 text-white px-6 py-2 rounded-lg font-body font-medium hover:bg-sage-700 transition-colors">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}