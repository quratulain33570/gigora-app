import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Header / Logo */}
          <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-primary" />
              <span className="text-2xl font-extrabold text-navy tracking-tight">GIGORA</span>
            </div>
            <button 
              className="lg:hidden text-gray-400 hover:text-navy"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200
                    ${isActive 
                      ? 'bg-primary/10 text-primary font-semibold shadow-xs' 
                      : 'text-gray-600 hover:bg-slate-50 hover:text-navy'}
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 mb-2">
            <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-navy truncate">{userName}</p>
              <p className="text-xs text-grayText">Pro Freelancer</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar for Mobile */}
        <header className="lg:hidden bg-white border-b border-gray-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-navy">GIGORA</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-navy hover:bg-slate-50 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}