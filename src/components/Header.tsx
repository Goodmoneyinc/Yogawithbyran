import React, { useState } from 'react';
import { Menu, X, User, ShoppingCart, Heart, LogOut, Facebook, Instagram, Youtube } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      }
      setShowAuthModal(false);
      setEmail('');
      setPassword('');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex flex-col items-start">
              <div className="flex items-center space-x-2 mb-2">
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
              
              {/* Social Media Icons under logo */}
              <div className="flex items-center space-x-3 ml-2">
                <a 
                  href="https://www.facebook.com/share/17REGV9S8G/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                  title="Follow on Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.instagram.com/weems_bryan?igsh=MWVmdTJzMnphMndoaA==" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-pink-500 hover:text-pink-600 transition-colors"
                  title="Follow on Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a 
                  href="https://youtube.com/@yogawithbryan-h2x?si=BQoODmoxmpwxvC3M" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-red-600 hover:text-red-700 transition-colors"
                  title="Subscribe on YouTube"
                >
                  <Youtube className="h-6 w-6" />
                </a>
                <a 
                  href="https://tiktok.com/@yogawithbryan" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-800 hover:text-black transition-colors"
                  title="Follow on TikTok"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.10z"/>
                  </svg>
                </a>
              </div>
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
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-stone-700 font-body">Welcome, {user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="text-stone-700 hover:text-sage-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-sage-600 text-white px-4 py-2 rounded-lg font-body font-medium hover:bg-sage-700 transition-colors"
              >
                Sign In
              </button>
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
              <a href="#home" className="block px-3 py-2 text-stone-700 hover:text-sage-600 transition-colors">Home</a>
              <a href="#courses" className="block px-3 py-2 text-stone-700 hover:text-sage-600 transition-colors">Online Courses</a>
              <a href="#course-outline" className="block px-3 py-2 text-stone-700 hover:text-sage-600 transition-colors">Course Outline</a>
              <a href="#live-videos" className="block px-3 py-2 text-stone-700 hover:text-sage-600 transition-colors">Live Videos</a>
              <a href="#plans" className="block px-3 py-2 text-stone-700 hover:text-sage-600 transition-colors">Subscription</a>
              <a href="#lms" className="block px-3 py-2 text-stone-700 hover:text-sage-600 transition-colors">Yogi Progress</a>
              <a href="#shop" className="block px-3 py-2 text-gray-400 cursor-not-allowed">Shop (Coming Soon)</a>
              
              {/* Mobile Auth */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                {user ? (
                  <div className="px-3 py-2">
                    <p className="text-sm font-body text-stone-600 mb-2">Welcome, {user.email}</p>
                    <button
                      onClick={handleSignOut}
                      className="text-stone-700 hover:text-sage-600 transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="block w-full text-left px-3 py-2 bg-sage-600 text-white rounded-lg font-body font-medium hover:bg-sage-700 transition-colors"
                  >
                    Sign In
                  </button>
                )}
              </div>
              
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
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.10z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-2 mt-2">
                <p className="px-3 py-2 text-sm font-body text-stone-600">
                  Ready to start your yoga journey?
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>

    {/* Auth Modal */}
    {showAuthModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-semibold text-stone-800">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </h2>
            <button
              onClick={() => setShowAuthModal(false)}
              className="text-stone-500 hover:text-stone-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-stone-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-stone-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sage-600 text-white py-2 px-4 rounded-lg font-body font-medium hover:bg-sage-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sage-600 hover:text-sage-700 font-body"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}