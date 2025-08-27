import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OnlineCourses from './components/OnlineCourses';
import LiveVideos from './components/LiveVideos';
import SubscriptionPlans from './components/SubscriptionPlans';
import PhotoCollage from './components/PhotoCollage';
import Footer from './components/Footer';
import LMSNavigation from './components/LMS/LMSNavigation';
import CourseOutline from './components/CourseOutline';

function App() {
  // For demo purposes, you can toggle between the main site and LMS
  // In a real implementation, this would be handled by routing
  const showLMS = window.location.hash === '#lms';
  const showCourseOutline = window.location.hash === '#course-outline';

  if (showLMS) {
    return <LMSNavigation />;
  }

  if (showCourseOutline) {
    return <CourseOutline />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <OnlineCourses />
      <LiveVideos />
      <SubscriptionPlans />
      <PhotoCollage />
      <Footer />
    </div>
  );
}

export default App;