import React from "react";

interface SectionDividerProps {
  className?: string;
}

const SectionDivider = ({ className = "" }: SectionDividerProps) => {
  return (
    <div className={`w-full mx-auto px-4 my-12 sm:my-16 ${className}`}>
      <div className="relative max-w-6xl mx-auto">
        {/* Main prominent line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Center accent with glow effect */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Glow effect */}
          <div className="absolute inset-0 w-32 h-[2px] bg-emerald-600/30 blur-sm rounded-full" />

          {/* Main accent line */}
          <div className="relative w-32 h-[2px] bg-gradient-to-r from-emerald-600/80 via-emerald-600 to-emerald-600/80 rounded-full shadow-[0_0_8px_rgba(22,163,74,0.4)]" />

          {/* Center highlight */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-600 rounded-full shadow-[0_0_8px_rgba(22,163,74,0.6)]" />
        </div>
      </div>
    </div>
  );
};

export default SectionDivider;
