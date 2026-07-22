import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  Loader2, 
  AlertCircle, 
  Send,
  Award,
  FileText,
  Zap,
  Target,
  BarChart3
} from 'lucide-react';

// 🌐 Import backend API helper
import { analyzeProfileApi } from '../services/api';

const ProfileAnalyzer = () => {
  const [profileText, setProfileText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // 🎯 Handles form submission & triggers AI Profile evaluation
  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!profileText.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // 🚀 Call FastAPI / AI Backend
      const data = await analyzeProfileApi({ profile_text: profileText });
      
      setResult({
        score: data.score ?? 0,
        strengths: data.strengths || data.goods || [],
        weaknesses: data.weaknesses || data.improvements || [],
        suggestions: data.suggestions || data.recommendations || [],
      });
    } catch (err) {
      console.error('Profile Analyzer API Error:', err);
      setError(err.message || 'Could not reach the server. Make sure your FastAPI backend is running! 🚨');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 space-y-8 relative">
      
      {/* 1️⃣ TOP HEADER BANNER (Matching your screenshot design! 🎨) */}
      <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-200/50 relative overflow-hidden space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Profile Audit Engine
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              Profile Analyzer 🔍
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl">
              Get deep AI feedback on your profile bio, skills, and pricing strategy.
            </p>
          </div>

          {/* Quick Action Button */}
          <a 
            href="#audit-form"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-indigo-500/20 transition cursor-pointer shrink-0"
          >
            <Zap className="w-4 h-4 fill-current" /> Start Quick Audit
          </a>
        </div>

        {/* Feature Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 relative z-10">
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-800">Bio Optimization</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Analyzes readability and client conversion triggers.</p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-start gap-3">
            <Target className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-800">Skill Tag Alignment</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Matches high-demand keywords on Upwork & Fiverr.</p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-start gap-3">
            <BarChart3 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-800">Score Breakdown</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Generates an instant overall score out of 10.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2️⃣ CLICKABLE & INPUT-ABLE FORM CARD 📝 */}
      <div id="audit-form" className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-200/50 relative z-10 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <FileText className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base sm:text-lg font-bold text-slate-800">
            Paste Your Profile Details Below
          </h2>
        </div>

        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Profile URL or Full Bio / Overview Text <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={6}
              required
              value={profileText}
              onChange={(e) => setProfileText(e.target.value)}
              placeholder="Paste your Upwork bio, Fiverr gig overview, or profile link here..."
              className="w-full p-4 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none text-xs sm:text-sm font-medium transition cursor-text resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !profileText.trim()}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 transition-all duration-200 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI is analyzing your profile... 🔮</span>
              </>
            ) : (
              <>
                <span>Analyze Profile Now</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* 3️⃣ ERROR DISPLAY */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-3 shadow-2xs"
          >
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4️⃣ RESULTS DISPLAY */}
      <AnimatePresence>
        {result && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 relative z-10"
          >
            {/* Score Hero Card */}
            <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white p-6 sm:p-8 rounded-3xl shadow-xl text-center space-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Award className="w-36 h-36" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wider uppercase">
                Overall Assessment
              </span>
              <h3 className="text-sm sm:text-base font-medium opacity-90">Profile Quality Score</h3>
              <div className="flex items-baseline justify-center gap-1.5 pt-1">
                <span className="text-5xl sm:text-6xl font-black tracking-tight">{result.score}</span>
                <span className="text-2xl sm:text-3xl font-semibold opacity-70">/ 10</span>
              </div>
            </div>

            {/* Suggestions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Strengths */}
              <div className="bg-emerald-50/80 border border-emerald-200/80 p-5 rounded-3xl shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <div className="p-1.5 bg-emerald-100 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4>What is Good</h4>
                </div>
                <ul className="space-y-2.5 text-emerald-950 text-xs font-medium">
                  {(result.strengths || []).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-amber-50/80 border border-amber-200/80 p-5 rounded-3xl shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                  <div className="p-1.5 bg-amber-100 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  </div>
                  <h4>What to Improve</h4>
                </div>
                <ul className="space-y-2.5 text-amber-950 text-xs font-medium">
                  {(result.weaknesses || []).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggestions */}
              <div className="bg-sky-50/80 border border-sky-200/80 p-5 rounded-3xl shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-sky-800 font-bold text-sm">
                  <div className="p-1.5 bg-sky-100 rounded-lg">
                    <Lightbulb className="w-4 h-4 text-sky-600" />
                  </div>
                  <h4>Key Suggestions</h4>
                </div>
                <ul className="space-y-2.5 text-sky-950 text-xs font-medium">
                  {(result.suggestions || []).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ProfileAnalyzer;