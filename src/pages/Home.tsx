@@ .. @@
 import React from 'react';
-import { ArrowRight, Heart, Users, Star } from 'lucide-react';
+import { ArrowRight, Heart, Users, Star, CreditCard } from 'lucide-react';
+import { Link } from 'react-router-dom';
 
 export const Home: React.FC = () => {
   return (
@@ .. @@
           <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
             Transform your mind, body, and spirit with our comprehensive yoga platform designed for practitioners of all levels.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
-            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
+            <Link 
+              to="/pricing"
+              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
+            >
               Start Your Journey
               <ArrowRight className="ml-2 w-5 h-5" />
-            </button>
+            </Link>
             <button className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-lg font-semibold transition-colors">
               Learn More
             </button>
@@ .. @@
             <Star className="w-12 h-12 text-indigo-600 mb-4" />
             <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
             <p className="text-gray-600">Learn from certified instructors with years of experience in various yoga traditions.</p>
+          </div>
+          <div className="text-center">
+            <CreditCard className="w-12 h-12 text-indigo-600 mb-4 mx-auto" />
+            <h3 className="text-xl font-semibold mb-2">Flexible Plans</h3>
+            <p className="text-gray-600">Choose from multiple subscription options that fit your lifestyle and budget.</p>
           </div>
         </div>
       </div>