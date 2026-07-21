import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  FileText, 
  UserCheck, 
  AlertCircle, 
  ArrowRight, 
  Play 
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-darkText font-sans">
      
      {/* 1️⃣ NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="text-2xl font-bold text-navy tracking-tight">GIGORA</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 font-medium text-grayText">
          <a href="#features" className="hover:text-primary transition">Features</a>
          <a href="#pricing" className="hover:text-primary transition">Pricing</a>
          <a href="#login" className="hover:text-primary transition">Login</a>
        </div>

        <button className="bg-primary hover:bg-navy text-white px-5 py-2.5 rounded-lg font-semibold transition shadow-sm">
          Get Started
        </button>
      </nav>

      {/* 2️⃣ HERO SECTION */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-2 bg-lightBlue text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4" /> AI-Powered Freelance Success
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-navy leading-tight mb-6">
          Win Every Gig with <span className="text-primary">AI</span>
        </h1>
        <p className="text-lg md:text-xl text-grayText mb-8 max-w-2xl mx-auto">
          Analyze your profile, optimize your gig SEO, and generate winning proposals in seconds with our AI engine.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-primary hover:bg-navy text-white px-8 py-3.5 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2 shadow-lg">
            Get Started Free <ArrowRight className="w-5 h-5" />
          </button>
          <button className="w-full sm:w-auto border-2 border-gray-200 hover:border-navy text-navy px-8 py-3.5 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2">
            <Play className="w-5 h-5 fill-navy" /> Watch Demo
          </button>
        </div>
      </section>

      {/* 3️⃣ PROBLEM SECTION */}
      <section className="py-16 bg-slate-50 border-y border-gray-100 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-3">Struggling on Upwork & Fiverr?</h2>
            <p className="text-grayText">You're not alone. Most freelancers face these 3 giant roadblocks.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-500 mb-4">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">No Clients</h3>
              <p className="text-grayText text-sm">Sending dozens of applications every week without receiving a single reply or interview invite.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-500 mb-4">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Gig Not Ranking</h3>
              <p className="text-grayText text-sm">Your gigs are buried on page 10 where clients never scroll, missing out on organic impressions.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-500 mb-4">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Proposals Rejected</h3>
              <p className="text-grayText text-sm">Generic proposals that get ignored by clients looking for tailor-made solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4️⃣ SOLUTION SECTION */}
      <section id="features" className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">The Solution</span>
          <h2 className="text-3xl font-bold text-navy mt-1">Supercharge Your Freelance Career</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-lightBlue p-8 rounded-2xl border border-blue-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mb-6">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">Profile Analyzer</h3>
            <p className="text-grayText text-sm">Instant feedback on your profile strengths, weaknesses, and a score out of 10 to stand out.</p>
          </div>

          <div className="bg-lightBlue p-8 rounded-2xl border border-blue-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mb-6">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">Gig SEO</h3>
            <p className="text-grayText text-sm">Optimize your titles, tags, and descriptions with high-converting keywords to rank on page 1.</p>
          </div>

          <div className="bg-lightBlue p-8 rounded-2xl border border-blue-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mb-6">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">Proposal Generator</h3>
            <p className="text-grayText text-sm">Craft compelling, tailored cover letters from job descriptions in under 10 seconds.</p>
          </div>
        </div>
      </section>

      {/* 5️⃣ FOOTER */}
      <footer className="bg-navy text-white py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-700 pb-8 mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-2xl font-bold tracking-tight">GIGORA</span>
          </div>
          <div className="flex space-x-6 text-sm text-gray-300">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400">
          © Mufsa Developers 2026. All rights reserved.
        </div>
      </footer>

    </div>
  );
}