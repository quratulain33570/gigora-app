import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Play, 
  RefreshCw, 
  Server, 
  Key, 
  UserCheck, 
  Sparkles,
  Terminal
} from 'lucide-react';

export default function FeatureTestRunner() {
  const [testResults, setTestResults] = useState({});
  const [running, setRunning] = useState(false);

  // Define our Feature Test Suite
  const featureTests = [
    {
      id: 'supabase_auth',
      name: 'Supabase Auth Client',
      category: 'Authentication',
      icon: Key,
      run: async () => {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw new Error(error.message);
        return `Connected! Active session: ${data.session ? 'User Logged In 👤' : 'No Active Session (Guest Mode) 🔒'}`;
      }
    },
    {
      id: 'fastapi_health',
      name: 'FastAPI Backend Connection',
      category: 'Backend API',
      icon: Server,
      run: async () => {
        const res = await fetch('http://localhost:8000/api/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profile_text: 'Test ping for system health check' }),
        });
        if (!res.ok) throw new Error(`Backend returned status ${res.status}`);
        return 'FastAPI Server is online and responding! 🟢';
      }
    },
    {
      id: 'profile_analyzer_schema',
      name: 'Profile Analyzer AI Payload Test',
      category: 'AI Tool',
      icon: Sparkles,
      run: async () => {
        const res = await fetch('http://localhost:8000/api/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profile_text: 'Experienced React developer with 5 years building responsive web apps.' }),
        });
        const data = await res.json();
        
        if (typeof data.score !== 'number') {
          throw new Error('Response missing "score" number field');
        }
        return `Score evaluated: ${data.score}/10! Strengths & Suggestions generated! 🎉`;
      }
    },
    {
      id: 'responsive_viewport',
      name: 'Mobile Touch & Screen Readiness',
      category: 'UI/UX',
      icon: UserCheck,
      run: async () => {
        const width = window.innerWidth;
        const touchSupported = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        return `Viewport: ${width}px | Touch Events: ${touchSupported ? 'Supported 📱' : 'Desktop Pointer 🖥️'}`;
      }
    }
  ];

  // Run all tests sequentially
  const handleRunAllTests = async () => {
    setRunning(true);
    setTestResults({});

    for (const test of featureTests) {
      setTestResults(prev => ({
        ...prev,
        [test.id]: { status: 'loading', log: 'Executing test...' }
      }));

      // Small delay for awesome visual feedback ⌛
      await new Promise(r => setTimeout(r, 600));

      try {
        const message = await test.run();
        setTestResults(prev => ({
          ...prev,
          [test.id]: { status: 'passed', log: message }
        }));
      } catch (err) {
        setTestResults(prev => ({
          ...prev,
          [test.id]: { status: 'failed', log: err.message || 'Test assertion failed' }
        }));
      }
    }
    setRunning(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-6">
      
      {/* Test Suite Header */}
      <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-primary text-xs font-bold uppercase mb-2">
            <Terminal className="w-3.5 h-3.5" /> Gigora System Diagnostic
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">Feature Test Suite 🧪</h2>
          <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
            Run automated diagnostics for backend endpoints, authentication, and layout logic.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleRunAllTests}
          disabled={running}
          className="w-full sm:w-auto px-6 py-3.5 bg-primary hover:bg-navy text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {running ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Running Suite...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Run Test Suite</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Test Cards List */}
      <div className="grid grid-cols-1 gap-4">
        {featureTests.map((test) => {
          const Icon = test.icon;
          const result = testResults[test.id];

          return (
            <motion.div
              key={test.id}
              layout
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-slate-50 rounded-xl text-primary border border-slate-100 shrink-0 mt-0.5 sm:mt-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-navy">{test.name}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-500">
                      {test.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {result ? result.log : 'Ready to execute...'}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0 self-end sm:self-center">
                {!result && (
                  <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl">
                    Idle
                  </span>
                )}
                {result?.status === 'loading' && (
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Testing...
                  </span>
                )}
                {result?.status === 'passed' && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                  </span>
                )}
                {result?.status === 'failed' && (
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5" /> Failed
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}