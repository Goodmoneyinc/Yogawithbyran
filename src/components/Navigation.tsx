@@ .. @@
 import React, { useState, useEffect } from 'react';
-import { Link } from 'react-router-dom';
+import { Link, useNavigate } from 'react-router-dom';
 import { Menu, X, User, LogOut } from 'lucide-react';
 import { supabase } from '../lib/supabase';
 import type { User } from '@supabase/supabase-js';
 
 export const Navigation: React.FC = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [user, setUser] = useState<User | null>(null);
+  const navigate = useNavigate();
 
   useEffect(() => {
@@ .. @@
   const handleSignOut = async () => {
     await supabase.auth.signOut();
     setUser(null);
+    navigate('/');
   };
 
   return (
@@ .. @@
           <div className="hidden md:flex items-center space-x-8">
             <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors">
               Home
             </Link>
+            <Link to="/pricing" className="text-gray-700 hover:text-indigo-600 transition-colors">
+              Pricing
+            </Link>
             {user ? (
               <div className="flex items-center space-x-4">
+                <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 transition-colors">
+                  Dashboard
+                </Link>
                 <div className="flex items-center space-x-2">
@@ .. @@
           <div className="md:hidden">
             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
               <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">
                 Home
               </Link>
+              <Link to="/pricing" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">
+                Pricing
+              </Link>
               {user ? (
                 <>
+                  <Link to="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">
+                    Dashboard
+                  </Link>
                   <div className="px-3 py-2 text-sm text-gray-600">
                     {user.email}
                   </div>