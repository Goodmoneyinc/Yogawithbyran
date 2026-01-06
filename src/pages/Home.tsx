@@ .. @@
 import React from 'react';
+import { useNavigate } from 'react-router-dom';
+import { ArrowRight, Star, Users, Award } from 'lucide-react';
 
 export const Home: React.FC = () => {
 }
+  const navigate = useNavigate();
+
   return (
   )
-    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
-      <p>Start prompting (or editing) to see magic happen :)</p>
+    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
+      {/* Hero Section */}
+      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
+        <div className="text-center mb-16">
+          <h1 className="text-5xl font-bold text-gray-900 mb-6">
+            Transform Your Life with
+            <span className="text-indigo-600 block">Mindful Yoga Practice</span>
+          </h1>
+          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
+            Join thousands of practitioners on a journey to wellness, strength, and inner peace. 
+            Our expert-guided programs adapt to your level and goals.
+          </p>
+          <div className="flex flex-col sm:flex-row gap-4 justify-center">
+            <button
+              onClick={() => navigate('/pricing')}
+              className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
+            >
+              Start Your Journey
+              <ArrowRight className="w-5 h-5 ml-2" />
+            </button>
+            <button
+              onClick={() => navigate('/dashboard')}
+              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
+            >
+              View Dashboard
+            </button>
+          </div>
+        </div>
+
+        {/* Features */}
+        <div className="grid md:grid-cols-3 gap-8 mb-16">
+          <div className="text-center p-6">
+            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
+              <Star className="w-8 h-8 text-indigo-600" />
+            </div>
+            <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Guidance</h3>
+            <p className="text-gray-600">
+              Learn from certified instructors with personalized feedback and progressive programs.
+            </p>
+          </div>
+          
+          <div className="text-center p-6">
+            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
+              <Users className="w-8 h-8 text-indigo-600" />
+            </div>
+            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Support</h3>
+            <p className="text-gray-600">
+              Connect with like-minded practitioners and share your journey in our supportive community.
+            </p>
+          </div>
+          
+          <div className="text-center p-6">
+            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
+              <Award className="w-8 h-8 text-indigo-600" />
+            </div>
+            <h3 className="text-xl font-semibold text-gray-900 mb-2">Proven Results</h3>
+            <p className="text-gray-600">
+              Track your progress with detailed analytics and celebrate milestones along the way.
+            </p>
+          </div>
+        </div>

+        {/* CTA Section */}
+        <div className="bg-indigo-600 rounded-2xl p-8 text-center text-white">
+          <h2 className="text-3xl font-bold mb-4">Ready to Begin?</h2>
+          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
+            Choose from our flexible subscription plans and start your transformation today. 
+            All plans include a 7-day free trial.
+          </p>
+          <button
+            onClick={() => navigate('/pricing')}
+            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
+          >
+            View Pricing Plans
+          </button>
+        </div>
+      </div>
     </div>
   );
 };