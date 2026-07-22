import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Logo from '../components/Logo'; // 👈 Exact app logo!
import { Eye, EyeOff, Mail, Lock, User, Check, X } from 'lucide-react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 🧹 Reset inputs and clear browser autofill credentials on refresh
  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
    setShowPassword(false);

    const clearAutofillTimer = setTimeout(() => {
      setName('');
      setEmail('');
      setPassword('');
    }, 100);

    return () => clearTimeout(clearAutofillTimer);
  }, []);

  // Password Strength Validation Rules
  const passwordConditions = [
    { label: 'At least 8 characters long', met: password.length >= 8 },
    { label: 'At least 1 uppercase letter (A-Z)', met: /[A-Z]/.test(password) },
    { label: 'At least 1 lowercase letter (a-z)', met: /[a-z]/.test(password) },
    { label: 'At least 1 number (0-9)', met: /[0-9]/.test(password) },
    { label: 'At least 1 special character (!@#$%^&*)', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  const isPasswordStrong = passwordConditions.every((condition) => condition.met);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isPasswordStrong) {
      setError('Please make sure your password meets all strength requirements! 🎯');
      return;
    }

    setLoading(true);
    setError(null);

    // Create user account in Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (data.user) {
      // Success! User account created 🎉
      navigate('/dashboard');
    }
  };

  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard',
      },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/60 flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Exact App Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10 mb-2">
        <div className="flex justify-center mb-4">
          <Logo size="lg" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Create your account 👋
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Start winning more freelance gigs today ✨
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-white border border-slate-200/80 py-8 px-4 shadow-xl shadow-slate-200/60 rounded-3xl sm:px-10">
          
          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs sm:text-sm font-medium">
              {error}
            </div>
          )}

          {/* Registration Form */}
          <form className="space-y-4" onSubmit={handleSignup} autoComplete="off">
            
            {/* Name Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="signup_full_name_fresh"
                  autoComplete="new-password"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none text-sm font-medium transition cursor-text"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  name="signup_email_fresh"
                  autoComplete="new-password"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none text-sm font-medium transition cursor-text"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="signup_password_fresh"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none text-sm font-medium transition cursor-text"
                />
                
                {/* Password Eye Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-600 transition cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Real-Time Password Requirements Box */}
              {password.length > 0 && (
                <div className="mt-3 p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-1.5 text-xs">
                  <p className="font-bold text-slate-700 mb-1">Password Requirements:</p>
                  {passwordConditions.map((condition, idx) => (
                    <div key={idx} className="flex items-center gap-2 transition-all">
                      {condition.met ? (
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 shrink-0" />
                      )}
                      <span className={condition.met ? 'text-emerald-700 font-semibold' : 'text-slate-400'}>
                        {condition.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-md shadow-indigo-500/20 transition duration-200 text-sm disabled:opacity-50 cursor-pointer active:scale-[0.98]"
            >
              {loading ? 'Creating Account...' : 'Sign Up 🚀'}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
              <span className="bg-white px-3 text-slate-400">Or continue with</span>
            </div>
          </div>

          {/* Google Signup Button */}
          <div className="mt-6">
            <button
              onClick={handleGoogleSignup}
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition duration-200 cursor-pointer shadow-xs active:scale-[0.98]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                />
              </svg>
              Sign up with Google
            </button>
          </div>

          {/* Already have an account link */}
          <div className="mt-6 text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700 underline-offset-2 hover:underline">
              Sign in
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}