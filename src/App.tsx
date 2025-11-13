import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/auth';
import { AuthPage } from './components/auth/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProductsPage } from './pages/ProductsPage';
import { SuccessPage } from './pages/SuccessPage';
import { Loader2 } from 'lucide-react';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route 
        path="/auth" 
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/products" 
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/success" 
        element={
          <ProtectedRoute>
            <SuccessPage />
          </ProtectedRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
import Hero from './components/Hero';
import OnlineCourses from './components/OnlineCourses';
import LiveVideos from './components/LiveVideos';
import SubscriptionPlans from './components/SubscriptionPlans';
import PhotoCollage from './components/PhotoCollage';
import Footer from './components/Footer';
import LMSNavigation from './components/LMS/LMSNavigation';
import CourseOutline from './components/CourseOutline';
import SuccessPage from './components/SuccessPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;