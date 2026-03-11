import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SubscriptionPlans from '../components/SubscriptionPlans';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Membership() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-sage-600 hover:text-sage-700 transition-colors mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-body">Back to Home</span>
          </button>
        </div>
      </div>

      <SubscriptionPlans />
      <Footer />
    </div>
  );
}
