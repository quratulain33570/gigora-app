import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Logo({ size = 'md', href = null, showBadge = false }) {
  // Size presets
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
  };

  const containerPadding = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
  };

  const content = (
    <div className="inline-flex items-center gap-2.5 group select-none">
      {/* Glowing Icon Badge */}
      <div className="relative flex items-center justify-center">
        {/* Ambient Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur-xs opacity-70 group-hover:opacity-100 transition duration-300"></div>
        
        {/* Icon Container */}
        <div className={`relative ${containerPadding[size] || containerPadding.md} bg-slate-900 border border-slate-700/80 rounded-xl text-indigo-400 group-hover:text-indigo-300 transition duration-300 shadow-md`}>
          <Sparkles className={`${iconSizes[size] || iconSizes.md}`} />
        </div>
      </div>

      {/* Full Gradient Typography across ALL letters */}
      <div className="flex items-center gap-2">
        <span className={`font-black tracking-tight ${textSizes[size] || textSizes.md} bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent`}>
          Gigora
        </span>

        {showBadge && (
          <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full">
            AI
          </span>
        )}
      </div>
    </div>
  );

  // Only wrap in a link if href is explicitly provided!
  if (href) {
    return <Link to={href} className="cursor-pointer">{content}</Link>;
  }

  return content;
}