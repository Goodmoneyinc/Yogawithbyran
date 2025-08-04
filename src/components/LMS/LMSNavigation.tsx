import React, { useState } from 'react';
import { BookOpen, Play, Award, MessageCircle, BarChart3, User, Menu, X } from 'lucide-react';
import StudentDashboard from './StudentDashboard';
import CoursePlayer from './CoursePlayer';
import QuizSystem from './QuizSystem';
import CertificateGenerator from './CertificateGenerator';
import DiscussionForum from './DiscussionForum';

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'courses', label: 'My Courses', icon: BookOpen },
  { id: 'quiz', label: 'Quiz', icon: Award },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'forum', label: 'Forum', icon: MessageCircle },
];

export default function LMSNavigation() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <StudentDashboard />;
      case 'courses':
        return <CoursePlayer />;
      case 'quiz':
        return <QuizSystem />;
      case 'certificates':
        return <CertificateGenerator />;
      case 'forum':
        return <DiscussionForum />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-heading font-semibold text-stone-800">
                Learning Management System
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-sage-100 text-sage-700'
                      : 'text-stone-600 hover:text-stone-800 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-stone-800"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium transition-colors ${
                      activeSection === item.id
                        ? 'bg-sage-100 text-sage-700'
                        : 'text-stone-600 hover:text-stone-800 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main>
        {renderContent()}
      </main>
    </div>
  );
}