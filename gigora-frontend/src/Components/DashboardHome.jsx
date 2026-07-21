import React from 'react';
import { UserCheck, Search, FileText, ArrowRight, Zap } from 'lucide-react';

export default function DashboardHome({ setActiveTab, userName = "Freelancer" }) {
  const featureCards = [
    {
      id: 'profile',
      title: 'Profile Analyzer',
      description: 'Get AI feedback on your freelance profile to boost conversion rates and attract high-paying clients.',
      icon: UserCheck,
      color: 'bg-blue-50 text-blue-600',
      badge: 'Profile Boost'
    },
    {
      id: 'seo',
      title: 'Gig SEO Optimizer',
      description: 'Optimize your titles, tags, and descriptions to rank on the first page of search results.',
      icon: Search,
      color: 'bg-emerald-50 text-emerald-600',
      badge: 'Rank Higher'
    },
    {
      id: 'proposal',
      title: 'Proposal Generator',
      description: 'Generate tailored, compelling client proposals in seconds using Claude AI.',
      icon: FileText,
      color: 'bg-purple-50 text-purple-600',
      badge: 'Win Clients'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-navy via-slate-800 to-navy text-white rounded-2xl p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-4 text-emerald-300 border border-white/10">
            <Zap className="w-3.5 h-3.5 fill-current" /> AI Engine Active
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Ready to supercharge your freelancing career today? Pick an AI tool below to start winning more client work!
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 3 Feature Cards */}
      <div>
        <h2 className="text-xl font-bold text-navy mb-4">AI Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <div 
                key={card.id}
                onClick={() => setActiveTab(card.id)}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-grayText">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-grayText text-sm leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>
                
                <div className="flex items-center text-sm font-bold text-primary group-hover:gap-2 transition-all">
                  <span>Open Tool</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}