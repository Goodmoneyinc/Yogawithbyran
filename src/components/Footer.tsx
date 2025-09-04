import React from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-heading font-medium text-sage-300 mb-4 tracking-wide">
              <span className="text-sage-200">Yoga</span>
              <span className="text-sage-400 italic mx-2 font-script">with</span>
              <span className="text-sage-300 font-semibold">bw</span>
            </h3>
            <p className="font-body text-stone-300 mb-6 font-light">
              Transform your life through mindful yoga practice. Join thousands of students 
              on their wellness journey.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/share/17REGV9S8G/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="bg-stone-700 hover:bg-blue-600 text-stone-300 hover:text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/weems_bryan?igsh=MWVmdTJzMnphMndoaA==" target="_blank" rel="noopener noreferrer" className="bg-stone-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 text-stone-300 hover:text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://youtube.com/@yogawithbryan-h2x?si=BQoODmoxmpwxvC3M" target="_blank" rel="noopener noreferrer" className="bg-stone-700 hover:bg-red-600 text-stone-300 hover:text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="https://tiktok.com/@yogawithbryan" target="_blank" rel="noopener noreferrer" className="bg-stone-700 hover:bg-black text-stone-300 hover:text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#courses" className="font-body text-stone-300 hover:text-sage-300 transition-colors">Online Courses</a></li>
              <li><a href="#plans" className="font-body text-stone-300 hover:text-sage-300 transition-colors">Subscription Plans</a></li>
              <li><span className="font-body text-gray-500">Shop (Coming Soon)</span></li>
              <li><a href="#" className="font-body text-stone-300 hover:text-sage-300 transition-colors">About Bryan</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-heading font-medium mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="font-body text-stone-300 hover:text-sage-300 transition-colors">Help Center</a></li>
              <li><a href="#" className="font-body text-stone-300 hover:text-sage-300 transition-colors">Contact Us</a></li>
              <li><a href="#" className="font-body text-stone-300 hover:text-sage-300 transition-colors">FAQs</a></li>
              <li><a href="#" className="font-body text-stone-300 hover:text-sage-300 transition-colors">Refund Policy</a></li>
              <li><a href="#" className="font-body text-stone-300 hover:text-sage-300 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-heading font-medium mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-sage-300" />
                <span className="font-body text-stone-300">Brandon, MS</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-sage-300" />
                <span className="font-body text-stone-300">victorweems57@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-sage-300" />
                <span className="font-body text-stone-300">Available: 7am - 5pm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-body text-stone-400 text-sm">
              © 2025 Yoga with bw. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="font-body text-stone-400 hover:text-sage-300 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-body text-stone-400 hover:text-sage-300 text-sm transition-colors">
                Terms of Use
              </a>
              <a href="#" className="font-body text-stone-400 hover:text-sage-300 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}