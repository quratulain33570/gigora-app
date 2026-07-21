import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  FileText, 
  UserCheck, 
  AlertCircle, 
  ArrowRight, 
  Play 
} from 'lucide-react';

// 🌟 Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-darkText font-sans overflow-hidden">
      
      {/* 1️⃣ NAVBAR */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50"
      >
        <div className="flex items-center gap-2 group cursor-pointer">
          <motion.div whileHover={{ rotate: 180, scale: 1.2 }} transition={{ duration: 0.3 }}>
            <Sparkles className="w-6 h-6 text-primary" />
          </motion.div>
          <span className="text-2xl font-bold text-navy tracking-tight">GIGORA</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 font-medium text-grayText">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
          <Link to="/login" className="hover:text-primary transition-colors">Login</Link>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link 
            to="/analyzer" 
            className="bg-primary hover:bg-navy text-white px-5 py-2.5 rounded-lg font-semibold transition shadow-sm inline-block"
          >
            Get Started
          </Link>
        </motion.div>
      </motion.nav>

      {/* 2️⃣ HERO SECTION */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.span 
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 bg-lightBlue text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6 shadow-sm border border-blue-100 cursor-default"
          >
            <Sparkles className="w-4 h-4 animate-pulse" /> AI-Powered Freelance Success
          </motion.span>

          {/* Heading */}
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-extrabold text-navy leading-tight mb-6"
          >
            Win Every Gig with <span className="text-primary bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">AI</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-grayText mb-8 max-w-2xl mx-auto"
          >
            Analyze your profile, optimize your gig SEO, and generate winning proposals in seconds with our AI engine.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link 
                to="/analyzer" 
                className="w-full sm:w-auto bg-primary hover:bg-navy text-white px-8 py-3.5 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 group"
              >
                Get Started Free 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.button 
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto border-2 border-gray-200 hover:border-navy text-navy px-8 py-3.5 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2 bg-white"
            >
              <Play className="w-5 h-5 fill-navy" /> Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* 3️⃣ PROBLEM SECTION */}
      <section className="py-16 bg-slate-50 border-y border-gray-100 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-navy mb-3">Struggling on Upwork & Fiverr?</h2>
            <p className="text-grayText">You're not alone. Most freelancers face these 3 giant roadblocks.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {/* Problem Card 1 */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white p-6 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-500 mb-4">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">No Clients</h3>
              <p className="text-grayText text-sm">Sending dozens of applications every week without receiving a single reply or interview invite.</p>
            </motion.div>

            {/* Problem Card 2 */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white p-6 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-500 mb-4">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Gig Not Ranking</h3>
              <p className="text-grayText text-sm">Your gigs are buried on page 10 where clients never scroll, missing out on organic impressions.</p>
            </motion.div>

            {/* Problem Card 3 */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white p-6 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-500 mb-4">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Proposals Rejected</h3>
              <p className="text-grayText text-sm">Generic proposals that get ignored by clients looking for tailor-made solutions.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4️⃣ SOLUTION SECTION */}
      <section id="features" className="py-20 px-6 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">The Solution</span>
          <h2 className="text-3xl font-bold text-navy mt-1">Supercharge Your Freelance Career</h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Solution 1 */}
          <motion.div variants={fadeInUp} whileHover={{ y: -8 }} transition={{ duration: 0.2 }}>
            <Link to="/analyzer" className="bg-lightBlue p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-all block group h-full">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Profile Analyzer</h3>
              <p className="text-grayText text-sm">Instant feedback on your profile strengths, weaknesses, and a score out of 10 to stand out.</p>
            </Link>
          </motion.div>

          {/* Solution 2 */}
          <motion.div variants={fadeInUp} whileHover={{ y: -8 }} transition={{ duration: 0.2 }}>
            <div className="bg-lightBlue p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-all h-full group">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Gig SEO</h3>
              <p className="text-grayText text-sm">Optimize your titles, tags, and descriptions with high-converting keywords to rank on page 1.</p>
            </div>
          </motion.div>

          {/* Solution 3 */}
          <motion.div variants={fadeInUp} whileHover={{ y: -8 }} transition={{ duration: 0.2 }}>
            <div className="bg-lightBlue p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-all h-full group">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Proposal Generator</h3>
              <p className="text-grayText text-sm">Craft compelling, tailored cover letters from job descriptions in under 10 seconds.</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 5️⃣ FOOTER */}
      <footer className="bg-navy text-white py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-700 pb-8 mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-2xl font-bold tracking-tight">GIGORA</span>
          </div>
          <div className="flex space-x-6 text-sm text-gray-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400">
          © Mufasa Developers 2026. All rights reserved.
        </div>
      </footer>

    </div>
  );
}