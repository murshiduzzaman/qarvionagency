import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Show button after scrolling down 300px
      if (currentScrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate percentage progress (0 to 100)
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (currentScrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // SVG circular progress calculation
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 transition-all duration-500 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-8 scale-75 pointer-events-none'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip on hover */}
      <div
        className={`absolute bottom-full right-0 mb-3 px-3 py-1.5 rounded-lg bg-[#0B132B]/95 text-xs font-medium text-white/90 border border-white/10 shadow-lg backdrop-blur-md whitespace-nowrap transition-all duration-300 pointer-events-none flex items-center gap-1.5 ${
          isHovered && isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
        }`}
      >
        <span className="text-[#00D2FF] font-semibold">{Math.round(scrollProgress)}%</span>
        <span className="text-white/40">•</span>
        <span>Back to top</span>
      </div>

      {/* Button */}
      <button
        id="back-to-top-btn"
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className={`relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#0B132B]/85 backdrop-blur-xl border border-white/10 text-white shadow-[0_8px_30px_rgba(0,0,0,0.45)] hover:shadow-[0_0_25px_rgba(0,210,255,0.45)] hover:border-[#00D2FF]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF] transition-all duration-300 transform active:scale-90 hover:-translate-y-1 ${
          isClicked ? 'scale-90 shadow-[0_0_35px_rgba(0,210,255,0.7)]' : ''
        }`}
      >
        {/* Circular Progress Bar SVG */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 52 52"
        >
          {/* Background circle track */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            className="stroke-white/10"
            strokeWidth="2.5"
            fill="transparent"
          />
          {/* Animated fill circle */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            className="transition-all duration-150 ease-out"
            stroke="url(#progress-gradient)"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
          <defs>
            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3A7BD5" />
              <stop offset="100%" stopColor="#00D2FF" />
            </linearGradient>
          </defs>
        </svg>

        {/* Glow ambient background on hover */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-[#3A7BD5]/20 to-[#00D2FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />

        {/* Arrow Icon */}
        <ArrowUp
          className={`w-5 h-5 text-white/80 group-hover:text-[#00D2FF] transition-all duration-300 transform group-hover:-translate-y-0.5 ${
            isClicked ? '-translate-y-1 text-[#00D2FF]' : ''
          }`}
          strokeWidth={2.5}
        />
      </button>
    </div>
  );
};

export default BackToTop;
