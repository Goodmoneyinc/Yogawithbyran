import React, { useState } from 'react';
import { Award, Download, Share2, Calendar, User } from 'lucide-react';

interface Certificate {
  id: string;
  courseName: string;
  studentName: string;
  completionDate: string;
  instructor: string;
  certificateNumber: string;
  hours: number;
}

const sampleCertificate: Certificate = {
  id: '1',
  courseName: 'Yoga for Absolute Beginners',
  studentName: 'Student Name',
  completionDate: new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }),
  instructor: 'Bryan Weems',
  certificateNumber: 'YWB-2025-001',
  hours: 20
};

export default function CertificateGenerator() {
  const [certificate] = useState(sampleCertificate);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCertificate = async () => {
    setIsGenerating(true);
    // Simulate certificate generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    
    // In a real implementation, this would generate a PDF
    alert('Certificate generated! In a real implementation, this would download a PDF.');
  };

  const shareCertificate = () => {
    if (navigator.share) {
      navigator.share({
        title: `${certificate.courseName} Certificate`,
        text: `I just completed ${certificate.courseName} with Yoga with Bryan!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `I just completed ${certificate.courseName} with Yoga with Bryan!`;
      navigator.clipboard.writeText(text);
      alert('Certificate text copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
          <Award className="h-10 w-10 text-amber-600" />
        </div>
        <h1 className="text-3xl font-heading font-semibold text-stone-800 mb-2">
          Congratulations!
        </h1>
        <p className="font-body text-stone-600">
          You've successfully completed your yoga course. Here's your certificate of completion.
        </p>
      </div>

      {/* Certificate Preview */}
      <div className="bg-white rounded-2xl shadow-2xl p-12 mb-8 border-4 border-amber-200 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sage-400 via-amber-400 to-sage-400"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-sage-400 via-amber-400 to-sage-400"></div>
        
        {/* Certificate Content */}
        <div className="text-center">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-4xl font-heading font-bold text-stone-800 mb-2">
              Certificate of Completion
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
          </div>
          
          {/* Brand */}
          <div className="mb-8">
            <h3 className="text-2xl font-heading font-medium text-sage-700 tracking-wide">
              <span className="text-sage-800">Yoga</span>
              <span className="text-sage-600 italic mx-2 font-script">with</span>
              <span className="text-sage-700 font-semibold">Bryan</span>
            </h3>
          </div>
          
          {/* Main Text */}
          <div className="mb-8">
            <p className="font-body text-lg text-stone-600 mb-4">
              This is to certify that
            </p>
            <h4 className="text-3xl font-heading font-semibold text-stone-800 mb-4 border-b-2 border-stone-300 pb-2 inline-block">
              {certificate.studentName}
            </h4>
            <p className="font-body text-lg text-stone-600 mb-2">
              has successfully completed the course
            </p>
            <h5 className="text-2xl font-heading font-medium text-sage-700 mb-4">
              {certificate.courseName}
            </h5>
            <p className="font-body text-stone-600">
              comprising {certificate.hours} hours of instruction
            </p>
          </div>
          
          {/* Details */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <Calendar className="h-6 w-6 text-sage-600 mx-auto mb-2" />
              <p className="font-body text-sm text-stone-500 mb-1">Completion Date</p>
              <p className="font-body font-medium text-stone-700">{certificate.completionDate}</p>
            </div>
            <div className="text-center">
              <User className="h-6 w-6 text-sage-600 mx-auto mb-2" />
              <p className="font-body text-sm text-stone-500 mb-1">Instructor</p>
              <p className="font-body font-medium text-stone-700">{certificate.instructor}</p>
            </div>
            <div className="text-center">
              <Award className="h-6 w-6 text-sage-600 mx-auto mb-2" />
              <p className="font-body text-sm text-stone-500 mb-1">Certificate No.</p>
              <p className="font-body font-medium text-stone-700">{certificate.certificateNumber}</p>
            </div>
          </div>
          
          {/* Signature Line */}
          <div className="border-t border-stone-300 pt-6">
            <div className="w-48 mx-auto">
              <div className="border-b border-stone-400 mb-2 pb-2">
                <p className="font-script text-2xl text-stone-700">{certificate.instructor}</p>
              </div>
              <p className="font-body text-sm text-stone-500">Certified Yoga Instructor</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={generateCertificate}
          disabled={isGenerating}
          className="flex items-center justify-center space-x-2 bg-sage-600 text-white px-8 py-3 rounded-lg font-body font-medium hover:bg-sage-700 transition-colors disabled:opacity-50"
        >
          <Download className="h-5 w-5" />
          <span>{isGenerating ? 'Generating...' : 'Download PDF'}</span>
        </button>
        
        <button
          onClick={shareCertificate}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-body font-medium hover:bg-blue-700 transition-colors"
        >
          <Share2 className="h-5 w-5" />
          <span>Share Achievement</span>
        </button>
      </div>

      {/* Additional Info */}
      <div className="mt-12 bg-sage-50 rounded-xl p-6 text-center">
        <h3 className="text-lg font-heading font-semibold text-stone-800 mb-2">
          What's Next?
        </h3>
        <p className="font-body text-stone-600 mb-4">
          Continue your yoga journey with our intermediate courses or join our live sessions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-sage-600 text-white px-6 py-2 rounded-lg font-body font-medium hover:bg-sage-700 transition-colors">
            Browse More Courses
          </button>
          <button className="border border-sage-600 text-sage-600 px-6 py-2 rounded-lg font-body font-medium hover:bg-sage-50 transition-colors">
            Join Live Sessions
          </button>
        </div>
      </div>
    </div>
  );
}