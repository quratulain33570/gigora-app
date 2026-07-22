import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Search, 
  Tag, 
  FileText, 
  Copy, 
  Check, 
  BarChart3, 
  TrendingUp, 
  Zap, 
  RefreshCw,
  Lightbulb,
  AlertCircle
} from 'lucide-react';

// 🌐 Import your backend API helper!
import { optimizeGigSeoApi } from '../services/api';

export default function GigSeoOptimizer() {
  const [gigTitle, setGigTitle] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [copiedField, setCopiedField] = useState(null);
  const [error, setError] = useState(null); // ⚠️ Error state for API feedback

  // 🎯 Handles form submission and triggers live API optimization
  const handleOptimize = async (e) => {
    e.preventDefault();
    if (!gigTitle.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // 🚀 Call FastAPI / Gemini backend
      const data = await optimizeGigSeoApi({
        title: gigTitle,
        category,
        description,
      });

      // Map backend response fields safely to your UI state
      setResults({
        seoScore: data.seo_score ?? data.seoScore ?? 92,
        optimizedTitle: data.optimized_title || data.optimizedTitle || gigTitle,
        suggestedTags: data.suggested_tags || data.suggestedTags || [],
        keywordsToInclude: data.keywords || data.keywordsToInclude || [],
        optimizedDescription: data.optimized_description || data.optimizedDescription || description,
      });
    } catch (err) {
      console.error('SEO API Error:', err);
      setError(err.message || 'Could not connect to backend server. Make sure FastAPI is running! 🚨');
    } finally {
      setLoading(false);
    }
  };

  // 📋 Copy Helper Function
  const handleCopy = (text, fieldKey) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* 🌟 Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-200/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Gigora SEO Booster
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Gig SEO Optimizer 🚀
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl">
            Maximize your gig visibility, rank higher in marketplace searches, and turn views into high-paying orders with AI keyword power.
          </p>
        </div>

        {/* Quick Stat Counter */}
        <div className="relative z-10 flex items-center gap-3 bg-slate-50 border border-slate-200/80 p-4 rounded-2xl shrink-0">
          <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-500/20">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Avg. Rank Boost</div>
            <div className="text-lg font-black text-slate-800">+340% Impressions 📈</div>
          </div>
        </div>
      </div>

      {/* 🚨 Error Banner */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-semibold shadow-sm animate-fade-in">
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 🧱 Main Dual-Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 1️⃣ Input Form Card (5 cols on desktop) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 p-6 sm:p-7 rounded-3xl shadow-xl shadow-slate-200/50 relative">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-indigo-600" />
            Enter Your Current Gig Info
          </h2>

          <form onSubmit={handleOptimize} className="space-y-4">
            {/* Category Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">
                Category / Niche
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none text-sm font-medium transition cursor-pointer"
              >
                <option>Web Development</option>
                <option>Graphic & Logo Design</option>
                <option>Copywriting & Content</option>
                <option>Digital Marketing & SEO</option>
                <option>Video Editing & Animation</option>
                <option>Mobile App Development</option>
              </select>
            </div>

            {/* Gig Title */}
            <div>
              <div className="flex justify-between items-center mb-1.5 ml-1">
                <label className="text-xs font-bold text-slate-700">
                  Gig Title <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] text-slate-400 font-semibold">
                  {gigTitle.length}/80 chars
                </span>
              </div>
              <input
                type="text"
                required
                maxLength={80}
                value={gigTitle}
                onChange={(e) => setGigTitle(e.target.value)}
                placeholder="e.g., I will build a responsive React web app"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none text-sm font-medium transition cursor-text"
              />
            </div>

            {/* Gig Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">
                Current Description <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Paste your existing gig description to optimize keywords and formatting..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none text-sm font-medium transition resize-none cursor-text"
              />
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={loading || !gigTitle.trim()}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing Marketplace Algorithms...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-current" />
                  Generate SEO Optimization 🎉
                </>
              )}
            </button>
          </form>
        </div>

        {/* 2️⃣ Output Preview Card (7 cols on desktop) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/80 p-6 sm:p-7 rounded-3xl shadow-xl shadow-slate-200/50 min-h-[520px] flex flex-col justify-between relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!results && !loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="my-auto text-center py-12 px-4 space-y-3"
              >
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto border border-indigo-100 shadow-sm">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800">No SEO Data Generated Yet</h3>
                <p className="text-slate-400 text-xs max-w-sm mx-auto">
                  Fill in your gig details on the left and hit <span className="font-semibold text-indigo-600">Generate SEO Optimization</span> to unlock search-friendly tags, titles, and descriptions!
                </p>
              </motion.div>
            )}

            {loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="my-auto text-center py-12 space-y-4"
              >
                <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
                  <Sparkles className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Crafting High-Converting Copy...</h3>
                  <p className="text-slate-400 text-xs mt-1">Mining top-ranking buyer keywords for {category}</p>
                </div>
              </motion.div>
            )}

            {results && !loading && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* SEO Score Banner */}
                <div className="flex items-center justify-between p-4 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 text-white font-black rounded-xl flex items-center justify-center text-sm shadow-sm">
                      {results.seoScore}%
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wide">
                        Excellent SEO Optimization 🎉
                      </h4>
                      <p className="text-xs text-emerald-700 font-medium">
                        High match rate for top search algorithm queries!
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block px-3 py-1 bg-white text-emerald-700 border border-emerald-200 font-bold text-xs rounded-full shadow-2xs">
                    Ready to Publish
                  </span>
                </div>

                {/* Optimized Title Field */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-600" /> High-Ranking Title
                    </label>
                    <button
                      onClick={() => handleCopy(results.optimizedTitle, 'title')}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1 cursor-pointer transition"
                    >
                      {copiedField === 'title' ? (
                        <><Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!</>
                      ) : (
                        <><Copy className="w-3.5 h-3.5" /> Copy Title</>
                      )}
                    </button>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold text-sm">
                    {results.optimizedTitle}
                  </div>
                </div>

                {/* Suggested Search Tags */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-indigo-600" /> Recommended Search Tags ({results.suggestedTags.length})
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {results.suggestedTags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-xs rounded-lg flex items-center gap-1 hover:bg-indigo-100 transition cursor-default"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* High Intent Keywords */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> High Intent Buyer Keywords
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {results.keywordsToInclude.map((kw, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 font-medium text-xs rounded-md">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Optimized Description */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Optimized Description
                    </label>
                    <button
                      onClick={() => handleCopy(results.optimizedDescription, 'desc')}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1 cursor-pointer transition"
                    >
                      {copiedField === 'desc' ? (
                        <><Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!</>
                      ) : (
                        <><Copy className="w-3.5 h-3.5" /> Copy Description</>
                      )}
                    </button>
                  </div>
                  <pre className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-sans whitespace-pre-wrap leading-relaxed max-h-52 overflow-y-auto">
                    {results.optimizedDescription}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Pro Tip Footer */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 font-medium">
              💡 Pro Tip: Update gig tags monthly to match trending search queries.
            </span>
            <span className="font-bold text-indigo-600 hidden sm:inline">Gigora AI Engine v2.4</span>
          </div>

        </div>

      </div>

    </div>
  );
}