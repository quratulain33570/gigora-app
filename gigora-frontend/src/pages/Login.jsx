import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Sparkles, 
  AlertCircle, 
  ArrowRight, 
  Loader2 
} from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard',
      },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-slate-50 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* 🔮 Ambient Glowing Background Blur Effects */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -right-20 w-80 h-80 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.25, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-24 -left-20 w-80 h-80 sm:w-96 sm:h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" 
      />

      {/* 1️⃣ HEADER / LOGO SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10"
      >
        <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group cursor-pointer">
          <motion.div 
            whileHover={{ rotate: 180, scale: 1.15 }} 
            transition={{ duration: 0.4 }}
            className="p-2 bg-primary/10 rounded-2xl border border-primary/20 shadow-xs"
          >
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
          </motion.div>
          <span className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">GIGORA</span>
        </Link>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
          Welcome back! 👋
        </h2>
        <p className="mt-2 text-sm text-grayText font-medium max-w-xs sm:max-w-none mx-auto">
          Sign in to manage your freelance growth & client gigs
        </p>
      </motion.div>

      {/* 2️⃣ MAIN LOGIN CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="mt-6 sm:mt-8 sm:mx-auto w-full sm:max-w-md z-10"
      >
        <div className="bg-white/90 backdrop-blur-md py-8 px-5 sm:px-10 shadow-xl shadow-slate-200/60 rounded-3xl border border-white/80">
          
          {/* Animated Error Alert */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden mb-5"
              >
                <div className="p-3.5 bg-red-50/90 border border-red-200/80 text-red-600 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 shadow-2xs">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                  <span>{error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email & Password Form */}
          <form className="space-y-4 sm:space-y-5" onSubmit={handleEmailLogin}>
            
            {/* Email Input */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-navy mb-1.5">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-medium transition-all shadow-2xs placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs sm:text-sm font-bold text-navy">
                  Password
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-xs font-semibold text-primary hover:text-navy hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 bg-slate-50/80 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-medium transition-all shadow-2xs placeholder:text-gray-400"
                />
                
                {/* Toggle Password Eye Displayer */}
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-navy transition cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-primary hover:bg-navy text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl transition-all duration-200 text-sm disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2 pt-3.5 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Or Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200/80" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-gray-400 font-bold tracking-wider">Or continue with</span>
            </div>
          </div>

          {/* Google Login Button */}
          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.015, backgroundColor: '#f8fafc' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogin}
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-2xl bg-white text-sm font-bold text-navy transition duration-200 cursor-pointer shadow-2xs hover:border-slate-300"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Continue with Google
            </motion.button>
          </div>

          {/* Registration Redirect Link */}
          <div className="mt-6 text-center text-xs sm:text-sm text-grayText font-medium">
            No account?{' '}
            <Link to="/signup" className="font-bold text-primary hover:text-navy hover:underline transition-colors">
              Register here
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
}