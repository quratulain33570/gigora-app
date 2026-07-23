import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';
import Logo from '../components/Logo'; // 👈 Exact app logo!

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // 🧹 Reset inputs and bypass browser password autofill on refresh
  useEffect(() => {
    setEmail('');
    setPassword('');
    setShowPassword(false);

    const clearAutofillTimer = setTimeout(() => {
      setEmail('');
      setPassword('');
    }, 100);

    return () => clearTimeout(clearAutofillTimer);
  }, []);

  // 1️⃣ Email & Password Sign In Event 🔑
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Logged in successfully! Redirecting... 🎉' });
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to sign in' });
    } finally {
      setLoading(false);
    }
  };

  // 2️⃣ Continue with Google OAuth Event 🌐
  const handleGoogleLogin = async () => {
    setMessage({ type: '', text: '' });
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Google sign-in failed' });
    }
  };

  // 3️⃣ Forgot Password Reset Event 📧
  const handleForgotPassword = async () => {
    if (!email) {
      setMessage({
        type: 'error',
        text: 'Please enter your email address above first to reset your password! 🎯',
      });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setMessage({
        type: 'success',
        text: 'Password reset link sent to your email! 📩 Check your inbox.',
      });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to send reset link' });
    } finally {
      setLoading(false);
    }
  };

  // 4️⃣ Register Here Event 🚀
  const handleRegisterRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-slate-50 via-indigo-50/40 to-violet-50 relative overflow-hidden">
      
      {/* Centered Clean Card (Dashboard Light Theme) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md bg-white/95 border border-white rounded-3xl p-6 sm:p-9 shadow-2xl shadow-indigo-900/10 z-20"
      >
        {/* Soft Ambient Background Glows */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-200/40 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-200/40 rounded-full blur-2xl pointer-events-none"></div>

        {/* Header with Exact App Logo */}
        <div className="text-center mb-6 relative z-10">
          <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-700">Secure workspace</span>
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back! 👋
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Sign in to manage your freelance growth & client gigs
          </p>
        </div>

        {/* Dynamic Alert Banner */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 p-3 rounded-xl text-xs sm:text-sm font-medium border ${
              message.type === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-700'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}
          >
            {message.text}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} autoComplete="off" className="space-y-4 relative z-10">
          
          {/* Email Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">
              Email Address
            </label>
            <div className="relative">
              <input 
                type="email"
                name="user_email_fresh"
                autoComplete="new-password"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-4 pr-10 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all cursor-text"
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5 ml-1">
              <label className="text-xs font-bold text-slate-700">
                Password
              </label>
              
              <button 
                type="button"
                onClick={handleForgotPassword}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer transition-colors"
              >
                Forgot password?
              </button>
            </div>
            
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                name="user_password_fresh"
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all cursor-text"
                required
              />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer rounded-lg focus:outline-none"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.025 10.025 0 013.98-.863c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/25 transform transition-all active:scale-[0.98] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? 'Signing in...' : 'Sign In 🚀'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <span className="relative bg-white px-3 text-[10px] uppercase font-bold tracking-wider text-slate-400">
            OR CONTINUE WITH
          </span>
        </div>

        {/* Google OAuth Button */}
        <button 
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.98]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"/>
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
            <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"/>
            <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
          </svg>
          Continue with Google
        </button>

        {/* Register Redirect */}
        <p className="text-center text-xs text-slate-500 mt-6">
          No account?{' '}
          <button 
            type="button" 
            onClick={handleRegisterRedirect}
            className="text-indigo-600 hover:text-indigo-700 font-bold cursor-pointer underline-offset-2 hover:underline"
          >
            Register here
          </button>
        </p>
      </motion.div>

    </div>
  );
}
