import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Pricing } from './pages/Pricing';
import { Success } from './pages/Success';
import { Dashboard } from './pages/Dashboard';
import { Auth } from './pages/Auth';
import { Navigation } from './components/Navigation';
import Hero from './components/Hero';
import OnlineCourses from './components/OnlineCourses';
import LiveVideos from './components/LiveVideos';
import SubscriptionPlans from './components/SubscriptionPlans';
import PhotoCollage from './components/PhotoCollage';
import Footer from './components/Footer';
import LMSNavigation from './components/LMS/LMSNavigation';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SuccessPage from './components/SuccessPage';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Pricing } from './pages/Pricing';
import { Success } from './pages/Success';
import { Navbar } from './components/Navbar';

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
      <Navbar user={user} />
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/pricing" replace />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/success" element={<Success />} />
        <Route path="/" element={<Navigate to="/pricing" replace />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/success" element={<Success />} />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/auth" replace />} 
        />
      </div>
    </Router>
  );
}

export default App;
  )
}
  )
}