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
  FileText
} from 'lucide-react';

const ProfileAnalyzer = () => {
  const [profileText, setProfileText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!profileText.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profile_text: profileText }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze profile. Please try again!');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 relative overflow-hidden">
      
      {/* 🔮 Ambient Glowing Background Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.45, 0.25]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.25, 1],
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" 
      />

      {/* 1️⃣ TITLE & HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center space-y-3 z-10 relative"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider shadow-2xs">
          <Sparkles className="w-4 h-4" /> AI Powered Feedback
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
          Profile Analyzer 🔍✨
        </h1>
        <p className="text-slate-600 font-medium text-sm sm:text-base max-w-xl mx-auto">
          Paste your Fiverr or Upwork profile URL or description to get instant AI recommendations and score higher with clients!
        </p>
      </motion.div>

      {/* 2️⃣ PROFILE INPUT FORM CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="z-10 relative"
      >
        <form 
          onSubmit={handleAnalyze} 
          className="bg-white/90 backdrop-blur-md p-5 sm:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-5"
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700">
              <FileText className="w-4 h-4 text-indigo-500" />
              Profile URL or Full Description
            </label>
            <div className="relative group">
              <textarea
                rows="5"
                className="w-full p-4 sm:p-5 bg-slate-50/80 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-800 text-sm font-medium transition-all shadow-2xs placeholder:text-slate-400"
                placeholder="Paste your Fiverr profile description, Upwork overview, or direct profile link here..."
                value={profileText}
                onChange={(e) => setProfileText(e.target.value)}
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl transition-all duration-200 text-sm sm:text-base disabled:opacity-60 cursor-pointer flex justify-center items-center gap-2.5"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>AI is analyzing your profile...</span>
              </>
            ) : (
              <>
                <span>Analyze Profile</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* 3️⃣ LOADING ANIMATED STATE */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center py-10 space-y-4 text-center"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
              <Sparkles className="w-6 h-6 text-indigo-600 absolute" />
            </div>
            <p className="text-indigo-600 font-bold text-base sm:text-lg animate-pulse">
              Evaluating strengths, keywords & suggestions... 🔮
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4️⃣ ERROR MESSAGE ALERT */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-50/90 border border-red-200 text-red-600 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-3 shadow-2xs"
          >
            <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5️⃣ RESULTS DISPLAY */}
      <AnimatePresence>
        {result && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-6 sm:space-y-8 z-10 relative"
          >
            {/* SCORE HERO CARD */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-indigo-200/50 text-center space-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Award className="w-36 h-36" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wider uppercase">
                Overall Strength Assessment
              </span>
              <h3 className="text-base sm:text-lg font-medium opacity-90">Profile Quality Score</h3>
              <div className="flex items-baseline justify-center gap-1.5 pt-1">
                <span className="text-5xl sm:text-6xl font-black tracking-tight">{result.score}</span>
                <span className="text-2xl sm:text-3xl font-semibold opacity-70">/ 10</span>
              </div>
            </motion.div>

            {/* SUGGESTIONS CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              
              {/* WHAT IS GOOD */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-emerald-50/80 border border-emerald-200/80 p-5 sm:p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex items-center gap-2.5 text-emerald-800 font-extrabold text-base sm:text-lg mb-4">
                  <div className="p-2 bg-emerald-100 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h4>What is Good</h4>
                </div>
                <ul className="space-y-3 text-emerald-950 text-xs sm:text-sm font-medium flex-1">
                  {result.strengths?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* WHAT TO IMPROVE */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ y: -4 }}
                className="bg-amber-50/80 border border-amber-200/80 p-5 sm:p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex items-center gap-2.5 text-amber-800 font-extrabold text-base sm:text-lg mb-4">
                  <div className="p-2 bg-amber-100 rounded-xl">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  </div>
                  <h4>What to Improve</h4>
                </div>
                <ul className="space-y-3 text-amber-950 text-xs sm:text-sm font-medium flex-1">
                  {result.weaknesses?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* ACTIONABLE SUGGESTIONS */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ y: -4 }}
                className="bg-sky-50/80 border border-sky-200/80 p-5 sm:p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex items-center gap-2.5 text-sky-800 font-extrabold text-base sm:text-lg mb-4">
                  <div className="p-2 bg-sky-100 rounded-xl">
                    <Lightbulb className="w-5 h-5 text-sky-600" />
                  </div>
                  <h4>Key Suggestions</h4>
                </div>
                <ul className="space-y-3 text-sky-950 text-xs sm:text-sm font-medium flex-1">
                  {result.suggestions?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ProfileAnalyzer;