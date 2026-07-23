import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

export default function Navbar() {
  const { user } = useAuth();
  const displayName = user?.user_metadata?.username || user?.email || 'Guest';
  const isPro = user?.user_metadata?.plan?.toLowerCase() === 'pro';

  return (
    <nav className="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Static Non-Clickable Logo with Full Gradient */}
        <Logo size="md" />

        {/* User Status / Auth */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-slate-300">
                Welcome, <span className="font-bold text-indigo-300">{displayName}</span>! ✨
              </span>
              {isPro && <span className="rounded-full bg-emerald-400 px-2 py-0.5 text-[10px] font-black tracking-wide text-emerald-950">PRO</span>}
            </div>
          ) : (
            <span className="text-xs sm:text-sm text-slate-400 font-medium bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-800">
              Not Logged In 👤
            </span>
          )}
        </div>

      </div>
    </nav>
  );
}
