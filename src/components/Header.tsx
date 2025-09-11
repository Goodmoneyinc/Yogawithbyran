import React, { useState } from 'react';
import { Menu, X, User, ShoppingCart, Heart, LogOut, Facebook, Instagram, Youtube } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { currentPlan } = useSubscription();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img 
                  src="/IMG_0633.jpg" 
                  alt="Yoga with Bryan Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-3xl font-heading font-medium text-sage-700 tracking-wide transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                <span className="text-sage-800">Yoga</span>
                <span className="text-sage-600 italic mx-2 font-script">with</span>
                <span className="text-sage-700 font-semibold">bw</span>
              </h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 font-body">
            <a href="#home" className="text-stone-700 hover:text-sage-600 transition-colors">Home</a>
            <a href="#courses" className="text-stone-700 hover:text-sage-600 transition-colors">Online Courses</a>
            <a href="#course-outline" className="text-stone-700 hover:text-sage-600 transition-colors">Course Outline</a>
            <a href="#live-videos" className="text-stone-700 hover:text-sage-600 transition-colors">Live Videos</a>
            <a href="#plans" className="text-stone-700 hover:text-sage-600 transition-colors">Subscription</a>
            <a href="#lms" className="text-stone-700 hover:text-sage-600 transition-colors">Yogi Progress</a>
            <a href="#shop" className="text-gray-400 cursor-not-allowed">Shop (Coming Soon)</a>
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
              <a 
                href="https://www.facebook.com/share/17REGV9S8G/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-stone-600 hover:text-blue-600 transition-colors"
                title="Follow on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/weems_bryan?igsh=MWVmdTJzMnphMndoaA==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-stone-600 hover:text-pink-600 transition-colors"
                title="Follow on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com/@yogawithbryan-h2x?si=BQoODmoxmpwxvC3M" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-stone-600 hover:text-red-600 transition-colors"
                title="Subscribe on YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a 
                href="https://tiktok.com/@yogawithbryan" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-stone-600 hover:text-black transition-colors"
                title="Follow on TikTok"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {currentPlan && (
                  <span className="text-sm font-body text-sage-600 bg-sage-50 px-3 py-1 rounded-full">
                    {currentPlan.name}
                  </span>
                )}
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-stone-700" />
                  <span className="text-sm font-body text-stone-700">{user.email}</span>
                </div>
                <button 
                  onClick={signOut}
                  className="text-stone-700 hover:text-sage-600 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <a 
                  href="/login" 
                  className="text-stone-700 hover:text-sage-600 transition-colors font-body"
                >
                  Sign In
                </a>
                <a 
                  href="/signup" 
                  className="bg-sage-600 text-white px-4 py-2 rounded-lg font-body font-medium hover:bg-sage-700 transition-colors"
                >
                  Sign Up
                </a>
              </div>
            )}
            <button className="text-stone-700 hover:text-sage-600 transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-sage-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-stone-700 hover:text-sage-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user && currentPlan && (
                <div className="px-3 py-2 text-sm font-body text-sage-600 bg-sage-50 rounded">
                  Current Plan: {currentPlan.name}
                </div>
              )}
              <a href="#home" className="block px-3 py-2 text-stone-700 hover:text-sage-600 transition-colors">Home</a>
              <a href="#courses" className="block px-3 py-2 text-stone-700 hover:text-sage-600 transition-colors">Online Courses</a>
              <a href="#course-outline" className="block px-3 py-2 text-stone-700 hover:text-sage-600 transition-colors">Course Outline</a>
              <a href="#live-videos" className="block px-3 py-2 text-stone-700 hover:text-sage-600 transition-colors">Live Videos</a>
              <a href="#plans" className="block px-3 py-2 text-stone-700 hover:text-sage-600 transition-colors">Subscription</a>
              <a href="#lms" className="block px-3 py-2 text-stone-700 hover:text-sage-600 transition-colors">Yogi Progress</a>
              <a href="#shop" className="block px-3 py-2 text-gray-400 cursor-not-allowed">Shop (Coming Soon)</a>
              
              {/* Mobile Social Icons */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <p className="px-3 py-2 text-sm font-medium text-stone-600">Follow Us</p>
                <div className="flex justify-center space-x-6 px-3 py-2">
                  <a 
                    href="https://www.facebook.com/share/17REGV9S8G/?mibextid=wwXIfr" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-stone-600 hover:text-blue-600 transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a 
                    href="https://www.instagram.com/weems_bryan?igsh=MWVmdTJzMnphMndoaA==" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-stone-600 hover:text-pink-600 transition-colors"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a 
                    href="https://youtube.com/@yogawithbryan-h2x?si=BQoODmoxmpwxvC3M" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-stone-600 hover:text-red-600 transition-colors"
                  >
                    <Youtube className="h-6 w-6" />
                  </a>
                  <a 
                    href="https://tiktok.com/@yogawithbryan" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-stone-600 hover:text-black transition-colors"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              {user ? (
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="px-3 py-2 text-sm font-body text-stone-600">
                    {user.email}
                  </div>
                  <button 
                    onClick={signOut}
                    className="block w-full text-left px-3 py-2 text-stone-700 hover:text-sage-600 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-2 mt-2 space-y-1">
                  <a href="/login" className="block px-3 py-2 text-stone-700 hover:text-sage-600 transition-colors">
                    Sign In
                  </a>
                  <a href="/signup" className="block px-3 py-2 bg-sage-600 text-white rounded mx-3 text-center hover:bg-sage-700 transition-colors">
                    Sign Up
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}