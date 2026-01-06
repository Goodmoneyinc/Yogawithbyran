import React from 'react';
import Header from './components/Header';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Pricing } from './pages/Pricing';
import { Success } from './pages/Success';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import Hero from './components/Hero';
import OnlineCourses from './components/OnlineCourses';
import LiveVideos from './components/LiveVideos';
import SubscriptionPlans from './components/SubscriptionPlans';
import PhotoCollage from './components/PhotoCollage';
import Footer from './components/Footer';
import LMSNavigation from './components/LMS/LMSNavigation';
import CourseOutline from './components/CourseOutline';
import { SuccessPage } from './pages/SuccessPage';

function App() {
  const currentPath = window.location.pathname;
  const showLMS = window.location.hash === '#lms';
  const showCourseOutline = window.location.hash === '#course-outline';

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
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/success" element={<Success />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
  )
}