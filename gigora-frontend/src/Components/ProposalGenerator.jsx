import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  FileText, 
  Copy, 
  Check, 
  Zap, 
  RefreshCw, 
  Briefcase, 
  MessageSquare,
  Flame,
  Award,
  AlertCircle
} from 'lucide-react';

// 🌐 Import backend API helper
import { generateProposalApi } from '../services/api';
import { toast } from 'react-hot-toast';

export default function ProposalGenerator({ onRateLimit, onComplete }) {
  const [jobDescription, setJobDescription] = useState('');
  const [clientName, setClientName] = useState('');
  const [tone, setTone] = useState('Professional');
  const [mySkillHighlight, setMySkillHighlight] = useState('');
  const [platform, setPlatform] = useState('Fiverr');
  const [loading, setLoading] = useState(false);
  const [proposalResult, setProposalResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  // 📜 Ref for auto-scrolling to output on mobile
  const resultsRef = useRef(null);

  // 🎯 Handles form submission and triggers real AI Proposal generation
  const handleGenerate = async (e) => {
    e?.preventDefault();
    if (!jobDescription.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // 🚀 Call FastAPI / Gemini backend
      const data = await generateProposalApi({
        job_description: jobDescription,
        client_name: clientName,
        tone: tone,
        skill_highlight: mySkillHighlight,
      });

      // Map backend response fields safely to UI state
      setProposalResult({
        matchScore: data.match_score ?? data.matchScore ?? 98,
        estimatedReadTime: data.estimated_read_time || data.estimatedReadTime || '45 seconds',
        coverLetter: data.cover_letter || data.coverLetter || data.proposal || '',
        keyPoints: Array.isArray(data.key_points) ? data.key_points : [],
      });
      onComplete?.();

      // 📱 Smooth scroll to proposal output on mobile devices
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);

    } catch (err) {
      if (err.status === 429) onRateLimit?.();
      setError(err.message || 'Could not connect to backend server. Make sure FastAPI is running! 🚨');
    } finally {
      setLoading(false);
    }
  };

  // 📋 Copy Proposal (Grabs live edited content)
  const handleCopy = async () => {
    if (!proposalResult?.coverLetter) return;
    try {
      await navigator.clipboard.writeText(proposalResult.coverLetter);
      setCopied(true);
      toast.success('Copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Unable to copy.');
    }
  };

  const handleDownload = () => {
    if (!proposalResult?.coverLetter) return;
    const date = new Date().toISOString().slice(0, 10);
    const blob = new Blob([proposalResult.coverLetter], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `proposal-${date}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* 🌟 Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-200/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 border border-purple-100 rounded-full text-purple-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Gigora Pitch AI
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Proposal Generator 📝✨
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl">
            Turn job posts into personalized, high-converting client pitches that land interviews and close high-paying freelance gigs!
          </p>
        </div>

        {/* Quick Win Stat Pill */}
        <div className="relative z-10 flex items-center gap-3 bg-slate-50 border border-slate-200/80 p-4 rounded-2xl shrink-0">
          <div className="p-3 bg-purple-600 text-white rounded-xl shadow-md shadow-purple-500/20">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Win Rate Multiplier</div>
            <div className="text-lg font-black text-slate-800">3x More Replies 🔥</div>
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

      {/* 🧱 Main Dual-Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 1️⃣ Job Input Form Card (5 cols on desktop) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 p-6 sm:p-7 rounded-3xl shadow-xl shadow-slate-200/50 relative">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            Job Details & Client Post
          </h2>

          <form onSubmit={handleGenerate} className="space-y-4">
            
            {/* Job Description Textarea */}
            <div>
              <div className="flex justify-between items-center mb-1.5 ml-1">
                <label className="text-xs font-bold text-slate-700">
                  Client Job Post <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] text-slate-400 font-semibold">
                  {jobDescription.length} chars
                </span>
              </div>
              <textarea
                rows={6}
                required
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the client's Upwork, Fiverr, or LinkedIn job description here..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none text-sm font-medium transition resize-none cursor-text"
              />
            </div>

            {/* Optional Client Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">
                Client's Name <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g., Alex or Sarah (adds personal touch!)"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none text-sm font-medium transition cursor-text"
              />
            </div>

            {/* Select Proposal Tone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">
                Pitch Tone
              </label>
              <div className="grid grid-cols-3 gap-2" role="group" aria-label="Proposal tone">
                {['Professional', 'Friendly', 'Confident'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setTone(option)}
                    className={`min-h-12 rounded-xl px-2 text-xs font-bold transition ${tone === option ? 'bg-purple-600 text-white shadow-md shadow-purple-200' : 'bg-slate-50 text-slate-600 hover:bg-purple-50 border border-slate-200'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Skill / Portfolio Hook */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">
                Key Skill to Highlight
              </label>
              <select
                value={mySkillHighlight}
                onChange={(e) => setMySkillHighlight(e.target.value)}
                className="w-full min-h-12 px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none text-sm font-medium transition"
              >
                <option value="">Select a skill</option>
                {['Web Development', 'Graphic Design', 'Writing', 'Marketing', 'Mobile Development', 'AI/ML', 'Other'].map((skill) => <option key={skill}>{skill}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Platform</label>
              <div className="grid grid-cols-2 gap-2" role="group" aria-label="Freelance platform">
                {['Fiverr', 'Upwork'].map((option) => (
                  <button key={option} type="button" onClick={() => setPlatform(option)} className={`min-h-12 rounded-xl text-sm font-bold transition ${platform === option ? 'bg-purple-600 text-white' : 'bg-slate-50 border border-slate-200 text-slate-600'}`}>
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={loading || !jobDescription.trim()}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing Client Requirements...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-current" />
                  Generate Winning Proposal 🚀
                </>
              )}
            </button>
          </form>
        </div>

        {/* 2️⃣ Output Cover Letter Card (7 cols on desktop) */}
        <div 
          ref={resultsRef}
          className="lg:col-span-7 bg-white border border-slate-200/80 p-6 sm:p-7 rounded-3xl shadow-xl shadow-slate-200/50 min-h-[540px] flex flex-col justify-between relative overflow-hidden"
        >
          
          <AnimatePresence mode="wait">
            {!proposalResult && !loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="my-auto text-center py-12 px-4 space-y-3"
              >
                <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto border border-purple-100 shadow-sm">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Your Proposal Preview Will Appear Here</h3>
                <p className="text-slate-400 text-xs max-w-sm mx-auto">
                  Paste the job posting details on the left and click <span className="font-semibold text-purple-600">Generate Winning Proposal</span> to create your tailored cover letter!
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
                  <div className="absolute inset-0 rounded-full border-4 border-purple-100 border-t-purple-600 animate-spin"></div>
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Drafting Personalized Pitch...</h3>
                  <p className="text-slate-400 text-xs mt-1">Extracting client pain points & optimizing tone</p>
                </div>
              </motion.div>
            )}

            {proposalResult && !loading && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Match Strength Header */}
                <div className="flex items-center justify-between p-4 bg-indigo-50/80 border border-indigo-200/80 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 text-white font-black rounded-xl flex items-center justify-center text-sm shadow-sm">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-indigo-950 uppercase tracking-wide">
                        {proposalResult.matchScore}% Job Match Score 🎉
                      </h4>
                      <p className="text-xs text-indigo-700 font-medium">
                        Optimized tone: <span className="font-bold">{tone}</span>
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block px-3 py-1 bg-white text-indigo-700 border border-indigo-200 font-bold text-xs rounded-full shadow-2xs">
                    ⚡ {proposalResult.estimatedReadTime} read
                  </span>
                </div>

                {/* Generated Proposal Content */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-purple-600" /> Ready-to-Send Proposal (Editable)
                    </label>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1 cursor-pointer transition"
                    >
                      {copied ? (
                        <><Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!</>
                      ) : (
                        <><Copy className="w-3.5 h-3.5" /> Copy Pitch</>
                      )}
                    </button>
                  </div>
                  
                  <textarea
                    rows={12}
                    value={proposalResult.coverLetter}
                    onChange={(e) => setProposalResult({ ...proposalResult, coverLetter: e.target.value })}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs sm:text-sm font-sans leading-relaxed focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none resize-none cursor-text"
                  />
                </div>

                {proposalResult.keyPoints.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-slate-700">Key points</h5>
                    <div className="flex flex-wrap gap-2">
                      {proposalResult.keyPoints.map((point, index) => (
                        <span key={`${point}-${index}`} className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">{point}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <button type="button" onClick={() => handleGenerate()} disabled={loading} className="min-h-12 rounded-xl border border-indigo-200 px-4 text-sm font-bold text-indigo-700 hover:bg-indigo-50 disabled:opacity-50">
                    <RefreshCw className="mr-1 inline h-4 w-4" /> Regenerate
                  </button>
                  <button type="button" onClick={handleDownload} className="min-h-12 rounded-xl bg-slate-900 px-4 text-sm font-bold text-white hover:bg-slate-800">
                    Download
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Footer Info */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 font-medium">
              💡 Pro Tip: Customizing the first 2 lines increases client response rates by 40%!
            </span>
            <span className="font-bold text-purple-600 hidden sm:inline">Gigora Pitch AI v2.4</span>
          </div>

        </div>

      </div>

    </div>
  );
}
