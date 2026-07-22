import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Search, FileText, ArrowRight, Zap, Sparkles } from 'lucide-react';

// 🎭 Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function DashboardHome({ setActiveTab, userName = "Freelancer" }) {
  // 🛡️ Fallback for safe display name
  const safeName = userName?.trim() || "Freelancer";

  const featureCards = [
    {
      id: 'profile',
      title: 'Profile Analyzer',
      description: 'Get AI feedback on your freelance profile to boost conversion rates and attract high-paying clients.',
      icon: UserCheck,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      badge: 'Profile Boost'
    },
    {
      id: 'seo',
      title: 'Gig SEO Optimizer',
      description: 'Optimize your titles, tags, and descriptions to rank on the first page of search results.',
      icon: Search,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      badge: 'Rank Higher'
    },
    {
      id: 'proposal',
      title: 'Proposal Generator',
      description: 'Generate tailored, compelling client proposals in seconds using AI power.',
      icon: FileText,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      badge: 'Win Clients'
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* 1️⃣ WELCOME BANNER WITH AI GLOW */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-gradient-to-r from-navy via-slate-800 to-navy text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden border border-slate-700/50"
      >
        <div className="relative z-10 max-w-2xl">
          {/* Active Badge */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-4 text-emerald-300 border border-white/10 shadow-xs"
          >
            <Zap className="w-3.5 h-3.5 fill-current animate-pulse text-emerald-400" /> 
            <span>AI Engine Active</span>
          </motion.div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 text-white">
            Welcome back, <span className="bg-gradient-to-r from-blue-300 via-indigo-200 to-emerald-300 bg-clip-text text-transparent">{safeName}</span>! 👋
          </h1>

          {/* Description */}
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
            Ready to supercharge your freelancing career today? Pick an AI tool below to start winning more client work! 🚀
          </p>
        </div>

        {/* Ambient Glowing Background Effect ✨ */}
        <motion.div 
          animate={{ 
            scale: [1, 1.25, 1],
            opacity: [0.25, 0.45, 0.25]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-12 -bottom-12 w-64 h-64 sm:w-80 sm:h-80 bg-primary/30 rounded-full blur-3xl pointer-events-none" 
        />
        <div className="absolute right-1/3 -top-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      </motion.div>

      {/* 2️⃣ AI FEATURE CARDS */}
      <div>
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-lg sm:text-xl font-bold text-navy">AI Power Tools</h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div 
                key={card.id}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(card.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveTab(card.id);
                  }
                }}
                role="button"
                tabIndex={0}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:border-primary/20 relative overflow-hidden select-none focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border ${card.color} shadow-xs transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-grayText border border-slate-200/60">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-navy mb-2 group-hover:text-primary transition-colors flex items-center gap-1.5">
                    {card.title}
                  </h3>

                  <p className="text-grayText text-xs sm:text-sm leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>
                
                <div className="flex items-center text-xs sm:text-sm font-bold text-primary transition-all pt-3 border-t border-slate-50">
                  <span>Open Tool</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

    </div>
  );
}