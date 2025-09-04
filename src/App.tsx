import React from 'react';
import { useAuth } from './hooks/useAuth';
import Header from './components/Header';
import Hero from './components/Hero';
import OnlineCourses from './components/OnlineCourses';
import LiveVideos from './components/LiveVideos';
import SubscriptionPlans from './components/SubscriptionPlans';
import PhotoCollage from './components/PhotoCollage';
import Footer from './components/Footer';
import LMSNavigation from './components/LMS/LMSNavigation';
import CourseOutline from './components/CourseOutline';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';
import SuccessPage from './components/SuccessPage';

function App() {
  const { loading } = useAuth();
  
  // For demo purposes, you can toggle between the main site and LMS
  // In a real implementation, this would be handled by routing
  const currentPath = window.location.pathname;
  const showLMS = window.location.hash === '#lms';
  const showCourseOutline = window.location.hash === '#course-outline';

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sage-200 border-t-sage-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-body text-stone-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Handle different routes
  if (currentPath === '/login') {
    return <LoginPage />;
  }

  if (currentPath === '/signup') {
    return <SignupPage />;
  }

  if (currentPath === '/success') {
    return <SuccessPage />;
  }

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