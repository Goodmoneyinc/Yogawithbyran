import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import OnlineCourses from './components/OnlineCourses';
import LiveVideos from './components/LiveVideos';
import SubscriptionPlans from './components/SubscriptionPlans';
import PhotoCollage from './components/PhotoCollage';
import Footer from './components/Footer';
import Header from './components/Header';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import SuccessPage from './components/SuccessPage';

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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
