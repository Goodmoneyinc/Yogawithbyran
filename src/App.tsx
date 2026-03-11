import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Hero from './components/Hero';
import OnlineCourses from './components/OnlineCourses';
import LiveVideos from './components/LiveVideos';
import SubscriptionPlans from './components/SubscriptionPlans';
import PhotoCollage from './components/PhotoCollage';
import Footer from './components/Footer';
import Header from './components/Header';
import { Auth } from './pages/Auth';
import { StudentDashboard } from './pages/StudentDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { ResetPassword } from './pages/ResetPassword';
import SuccessPage from './components/SuccessPage';
import Membership from './pages/Membership';
import { AdminGuard } from './components/auth/AdminGuard';
import { SubscriptionGuard } from './components/auth/SubscriptionGuard';
import { useAuth } from './hooks/useAuth';

function HomePage() {
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

function App() {
  const { user, loading } = useAuth();
  const isOwner = user?.email === 'yogawithbw@proton.me';

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-sage-50 to-stone-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Studio...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={user ? <Navigate to={isOwner ? "/admin" : "/dashboard"} replace /> : <Auth />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/success" element={<SuccessPage />} />

        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminDashboard />
            </AdminGuard>
          }
        />

        <Route
          path="/dashboard"
          element={
            isOwner ? (
              <Navigate to="/admin" replace />
            ) : (
              <SubscriptionGuard>
                <StudentDashboard />
              </SubscriptionGuard>
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
