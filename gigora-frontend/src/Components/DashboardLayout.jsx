import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { 
  UserCheck, 
  Search, 
  FileText, 
  Home, 
  LogOut, 
  Sparkles, 
  Menu, 
  X 
} from 'lucide-react';

export default function DashboardLayout({ children, activeTab, setActiveTab, userName = "Freelancer" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Handle Sign Out & Redirect
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const menuItems = [
    { id: 'home', label: 'Dashboard Home', icon: Home },
    { id: 'profile', label: 'Profile Analyzer', icon: UserCheck },
    { id: 'seo', label: 'Gig SEO', icon: Search },
    { id: 'proposal', label: 'Proposal Generator', icon: FileText },
  ];

  return (
    <div className="min-h-screen min-h-[100dvh] bg-slate-50 flex flex-col lg:flex-row overflow-x-hidden">
      
      {/* 1️⃣ MOBILE BACKDROP OVERLAY */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden" 
            onClick={() => setSidebarOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* 2️⃣ SIDEBAR NAVIGATION (RESPONSIVE DRAWER) */}
      <aside 
        className={`
          fixed lg:sticky top-0 inset-y-0 left-0 z-50 
          w-72 sm:w-64 h-screen h-[100dvh] bg-white border-r border-gray-100 
          flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0
          ${sidebarOpen ? 'translate-x-0 shadow-2xl lg:shadow-none' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Top Header & Scrollable Nav */}
        <div className="flex flex-col h-full overflow-y-auto min-h-0">
          
          {/* Logo Header */}
          <div className="p-4 sm:p-6 flex items-center justify-between border-b border-gray-100 shrink-0">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <motion.div whileHover={{ rotate: 180, scale: 1.15 }} transition={{ duration: 0.3 }}>
                <Sparkles className="w-7 h-7 text-primary" />
              </motion.div>
              <span className="text-2xl font-extrabold text-navy tracking-tight">GIGORA</span>
            </motion.div>

            {/* Mobile Close Button */}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="lg:hidden text-gray-400 hover:text-navy p-1.5 rounded-lg hover:bg-slate-100 transition"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 sm:p-4 space-y-1.5 relative flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    relative w-full flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm 
                    transition-colors duration-200 z-10 cursor-pointer select-none
                    ${isActive ? 'text-primary font-semibold' : 'text-gray-600 hover:text-navy'}
                  `}
                >
                  {/* Sliding Background Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  <Icon className={`w-5 h-5 shrink-0 transition-colors duration-200 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                  <span className="relative z-10 truncate">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* User Profile Footer */}
          <div className="p-3 sm:p-4 border-t border-gray-100 shrink-0 bg-white">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 mb-2 border border-slate-100/80"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0"
              >
                {userName.charAt(0).toUpperCase()}
              </motion.div>
              <div className="overflow-hidden min-w-0 flex-1">
                <p className="text-sm font-semibold text-navy truncate">{userName}</p>
                <p className="text-xs text-grayText font-medium truncate">Pro Freelancer</p>
              </div>
            </motion.div>

            <motion.button 
              whileHover={{ scale: 1.01, x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span className="truncate">Sign Out</span>
            </motion.button>
          </div>

        </div>
      </aside>

      {/* 3️⃣ MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Mobile Sticky Header */}
        <header className="lg:hidden bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-navy tracking-tight">GIGORA</span>
          </div>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-navy hover:bg-slate-50 rounded-lg transition focus:outline-hidden"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        </header>

        {/* Dynamic Animated Page Content */}
        <AnimatePresence mode="wait">
          <motion.main 
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl w-full mx-auto"
          >
            {children}
          </motion.main>
        </AnimatePresence>

      </div>
    </div>
  );
}