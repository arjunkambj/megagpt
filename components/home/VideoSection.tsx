"use client";
import React, { useState, useEffect } from "react";

const VideoBackground = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/public.mp4" type="video/mp4" />
    </video>
  );
};

const BackgroundSection = () => {
  return (
    <section
      aria-hidden="true"
      className="w-full h-screen fixed top-0 left-0 right-0 bottom-0 z-0 overflow-hidden"
    >
      <div className="h-screen w-full relative">
        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />

        {/* Video background */}
        <VideoBackground />

        {/* Dark overlay to reduce video brightness */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Base gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-gray-950/30 to-black/40" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Animated gradient orbs */}
        <div className="absolute inset-0">
          {/* Large emerald orb */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/6 rounded-full blur-3xl animate-pulse" />

          {/* Medium emerald orb */}
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-emerald-500/4 rounded-full blur-2xl animate-pulse delay-1000" />

          {/* Small accent orb */}
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-emerald-400/3 rounded-full blur-xl animate-pulse delay-2000" />
        </div>

        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.01] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0">
          <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-emerald-400/15 rounded-full animate-float-slow" />
          <div className="absolute top-[60%] left-[80%] w-1.5 h-1.5 bg-emerald-500/10 rounded-full animate-float-medium" />
          <div className="absolute top-[40%] left-[60%] w-0.5 h-0.5 bg-emerald-300/20 rounded-full animate-float-fast" />
          <div className="absolute top-[80%] left-[30%] w-1 h-1 bg-emerald-400/15 rounded-full animate-float-slow delay-1000" />
          <div className="absolute top-[25%] left-[70%] w-0.5 h-0.5 bg-emerald-500/10 rounded-full animate-float-medium delay-2000" />
        </div>

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40" />
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-15px) translateX(-8px);
          }
        }
        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-25px) translateX(5px);
          }
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 8s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 6s ease-in-out infinite;
        }
        .bg-gradient-radial {
          background: radial-gradient(
            circle,
            transparent 40%,
            rgba(0, 0, 0, 0.2) 100%
          );
        }
      `}</style>
    </section>
  );
};

export default BackgroundSection;
