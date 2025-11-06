import React from 'react';
import { Play, Star, X } from 'lucide-react';
import { createCheckoutSession } from '../lib/stripe';

export default function Hero() {
  const [showVideoModal, setShowVideoModal] = React.useState(false);

  const handleStartJourney = async () => {
    try {
      await createCheckoutSession({
        priceId: 'price_1S7khi9wDfAiVIZSc1j1C58H', // Basic Yogi plan
        successUrl: `${window.location.origin}/success`,
        cancelUrl: window.location.href,
        mode: 'subscription'
      });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start checkout. Please try again.');
    }
  };
  return (
    <>
      <section id="home" className="relative bg-gradient-to-br from-sage-50 to-stone-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-amber-500 fill-current" />
                ))}
              </div>
              <span className="text-stone-600">Trusted by 10,000+ students</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-heading font-semibold text-stone-800 mb-6 leading-tight">
              Don't Quit Anything
              <span className="text-sage-700 block">Just Add Yoga to Your Resume</span>
            </h1>
            
            <p className="text-xl font-body text-stone-600 mb-8 leading-relaxed font-light">
              Join our comprehensive yoga journey with step-by-step video courses, 
              in-person classes, and a supportive community. From beginner to advanced, 
              we'll guide you every step of the way.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={handleStartJourney}
                className="bg-sage-600 text-white px-8 py-4 rounded-lg font-body font-medium hover:bg-sage-700 transition-colors shadow-lg"
              >
                Start Your Journey
              </button>
              <button 
                onClick={() => setShowVideoModal(true)}
                className="flex items-center justify-center space-x-2 bg-white text-stone-700 px-8 py-4 rounded-lg font-body font-medium hover:bg-stone-50 transition-colors border border-stone-200 shadow-sm"
              >
                <Play className="h-5 w-5" />
                <span>Watch Preview</span>
              </button>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="/IMG_2481.jpg"
              alt="Yoga instructor demonstrating pose"
              className="rounded-2xl shadow-2xl w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
      </section>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-heading font-semibold text-stone-800">
                Yoga with bw - Preview
              </h2>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-stone-500 hover:text-stone-700 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Video Player */}
            <div className="aspect-video">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/2cPhnat28Pw?si=43pK2bhRMBcAt7lG" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}