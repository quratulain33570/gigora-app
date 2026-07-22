import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 1️⃣ Main Layout & Home (imported from components folder)
import DashboardLayout from '../components/DashboardLayout';
import DashboardHome from '../components/DashboardHome';

// 2️⃣ Proposal Generator (imported from components folder)
import ProposalGenerator from '../components/ProposalGenerator';

// 3️⃣ Profile Analyzer & SEO Optimizer (Exact file casing from disk! 🎯)
import ProfileAnalyzer from './ProfileAnalyzer';
import SeoOptimizer from './SeoOptimizer'; // 👈 Fixed case to match SeoOptimizer.jsx!

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
            <ProfileAnalyzer />
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
            <SeoOptimizer />
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
            <ProposalGenerator />
          </motion.div>
        )}

      </AnimatePresence>
    </DashboardLayout>
  );
}