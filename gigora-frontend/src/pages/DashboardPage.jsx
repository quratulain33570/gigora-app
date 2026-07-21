import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserCheck, 
  Search, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  Wand2, 
  CheckCircle2, 
  Clock, 
  Zap 
} from 'lucide-react';

import DashboardLayout from '../Components/DashboardLayout';
import DashboardHome from '../Components/DashboardHome';

// 🎭 Animation Variants
const tabContentVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' } 
  },
  exit: { 
    opacity: 0, 
    y: -15, 
    scale: 0.98,
    transition: { duration: 0.2, ease: 'easeIn' } 
  }
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = React.useState('home');

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab} userName="Quratulain">
      <AnimatePresence mode="wait">
        
        {/* 1️⃣ DASHBOARD HOME */}
        {activeTab === 'home' && (
          <motion.div
            key="home"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <DashboardHome setActiveTab={setActiveTab} userName="Quratulain" />
          </motion.div>
        )}

        {/* 2️⃣ PROFILE ANALYZER TAB */}
        {activeTab === 'profile' && (
          <motion.div
            key="profile"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                    <UserCheck className="w-3.5 h-3.5" /> Profile Audit Engine
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">Profile Analyzer</h2>
                  <p className="text-grayText text-sm sm:text-base mt-1">
                    Get deep AI feedback on your profile bio, skills, and pricing strategy.
                  </p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-primary hover:bg-navy text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <Wand2 className="w-4 h-4" /> Start Quick Audit
                </motion.button>
              </div>

              {/* Interactive Preview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-navy text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Bio Optimization
                  </div>
                  <p className="text-xs text-grayText">Analyzes readability and client conversion triggers.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-navy text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Skill Tag Alignment
                  </div>
                  <p className="text-xs text-grayText">Matches high-demand keywords on Upwork & Fiverr.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-navy text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Score Breakdown
                  </div>
                  <p className="text-xs text-grayText">Generates an instant overall score out of 10.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3️⃣ GIG SEO OPTIMIZER TAB */}
        {activeTab === 'seo' && (
          <motion.div
            key="seo"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                    <Search className="w-3.5 h-3.5" /> Rank booster
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">Gig SEO Optimizer</h2>
                  <p className="text-grayText text-sm sm:text-base mt-1">
                    Rank on page #1 with high-volume search terms and tags.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100 self-start sm:self-auto">
                  <Clock className="w-4 h-4" /> Next Update
                </div>
              </div>

              {/* Placeholder Micro-card */}
              <div className="bg-gradient-to-br from-slate-50 to-emerald-50/30 p-6 rounded-2xl border border-emerald-100/60 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-3">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-navy text-base mb-1">Keywords Generator Coming Live</h3>
                <p className="text-xs text-grayText max-w-md mb-4">
                  We're fine-tuning the search algorithm to fetch live impression metrics from top marketplace search bars.
                </p>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab('home')}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                >
                  Back to Dashboard <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 4️⃣ PROPOSAL GENERATOR TAB */}
        {activeTab === 'proposal' && (
          <motion.div
            key="proposal"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                    <FileText className="w-3.5 h-3.5" /> Cover Letter AI
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">Proposal Generator</h2>
                  <p className="text-grayText text-sm sm:text-base mt-1">
                    Paste any job description and generate a custom winning cover letter in 10 seconds.
                  </p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" /> Create Proposal
                </motion.button>
              </div>

              <div className="p-6 rounded-2xl border border-dashed border-gray-200 bg-slate-50/50 text-center">
                <p className="text-sm font-semibold text-navy mb-1">Tailored for Upwork & Direct Client Pitches</p>
                <p className="text-xs text-grayText">Click "Create Proposal" above to test the draft generator setup!</p>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </DashboardLayout>
  );
}