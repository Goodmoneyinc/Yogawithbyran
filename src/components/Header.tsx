import React, { useState } from 'react';
import { Menu, X, User, ShoppingCart, Heart } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img 
                  src="/IMG_0633.jpg" 
                  alt="Yoga with Bryan Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-heading font-medium text-sage-700 tracking-wide transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                <span className="text-sage-800">Yoga</span>
                <span className="text-sage-600 italic mx-2 font-script">with</span>
                <span className="text-sage-700 font-semibold">Bryan</span>
              </h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 font-body">
            <a href="#home" className="text-stone-700 hover:text-sage-600 transition-colors">Home</a>
            <a href="#courses" className="text-stone-700 hover:text-sage-600 transition-colors">Online Courses</a>
            <a href="#live-videos" className="text-stone-700 hover:text-sage-600 transition-colors">Live Videos</a>
            <a href="#plans" className="text-stone-700 hover:text-sage-600 transition-colors">Subscription</a>
            <a href="#lms" className="text-stone-700 hover:text-sage-600 transition-colors">Yogi Progress</a>
            <a href="#shop" className="text-gray-400 cursor-not-allowed">Shop (Coming Soon)</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-stone-700 hover:text-sage-600 transition-colors">
              <User className="h-5 w-5" />
            </button>
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
              <a href="#home" className="block px-3 py-2 text-stone-700 hover:text-sage-600 transition-colors">Home</a>
              <a href="#courses" className="block px-3 py-2 text-stone-700 hover:text-sage-600 transition-colors">Online Courses</a>
              <a href="#live-videos" className="block px-3 py-2 text-stone-700 hover:text-sage-600 transition-colors">Live Videos</a>
              <a href="#plans" className="block px-3 py-2 text-stone-700 hover:text-sage-600 transition-colors">Subscription</a>
              <a href="#lms" className="block px-3 py-2 text-stone-700 hover:text-sage-600 transition-colors">Yogi Progress</a>
              <a href="#shop" className="block px-3 py-2 text-gray-400 cursor-not-allowed">Shop (Coming Soon)</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}