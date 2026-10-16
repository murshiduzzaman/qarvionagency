import React from 'react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  textClassName?: string;
  iconOnly?: boolean;
  animated?: boolean;
}

export const LogoIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 48, 
  className = "" 
}) => {
  return (
    <svg 
      viewBox="230 190 520 580" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size }}
      className={`shrink-0 transition-transform duration-300 ${className}`}
      aria-label="Qarvion Emblem"
    >
      <defs>
        {/* Master Gradients */}
        <linearGradient id="qGradTopComp" x1="30%" y1="20%" x2="75%" y2="80%">
          <stop offset="0%" stopColor="#E84DF8" />
          <stop offset="35%" stopColor="#C026D3" />
          <stop offset="70%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>

        <linearGradient id="qGradLeftComp" x1="20%" y1="30%" x2="60%" y2="75%">
          <stop offset="0%" stopColor="#C026D3" />
          <stop offset="40%" stopColor="#9333EA" />
          <stop offset="80%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>

        <linearGradient id="qGradRightComp" x1="45%" y1="45%" x2="72%" y2="78%">
          <stop offset="0%" stopColor="#9333EA" />
          <stop offset="30%" stopColor="#7C3AED" />
          <stop offset="65%" stopColor="#6366F1" />
          <stop offset="90%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>

        <linearGradient id="qSpecularComp" x1="25%" y1="18%" x2="72%" y2="45%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#F5D0FE" stopOpacity="0.85" />
          <stop offset="75%" stopColor="#C084FC" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#818CF8" stopOpacity="0.1" />
        </linearGradient>

        <linearGradient id="qRimComp" x1="65%" y1="40%" x2="72%" y2="80%">
          <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#818CF8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.95" />
        </linearGradient>

        <filter id="qNeonGlowComp" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="16" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ambient Background Glow */}
      <g opacity="0.38" filter="url(#qNeonGlowComp)">
        <polygon points="344,318 485,226 708,430 612,465 485,348 402,380" fill="#C026D3" />
        <polygon points="274,350 376,415 376,492 560,655 485,712 274,525" fill="#9333EA" />
        <polygon points="448,508 535,465 615,540 615,465 708,430 708,745" fill="#4F46E5" />
      </g>

      {/* Piece 1: Top Chevron Hook */}
      <g>
        <polygon 
          points="344,318 485,226 708,430 612,465 485,348 402,380" 
          fill="url(#qGradTopComp)" 
        />
        <polyline 
          points="344,318 485,226 708,430" 
          fill="none" 
          stroke="url(#qSpecularComp)" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <polyline 
          points="402,380 485,348 612,465" 
          fill="none" 
          stroke="#FFFFFF" 
          strokeOpacity="0.3" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
        />
      </g>

      {/* Piece 2: Left Angular Band */}
      <g>
        <polygon 
          points="274,350 376,415 376,492 560,655 485,712 274,525" 
          fill="url(#qGradLeftComp)" 
        />
        <polyline 
          points="376,415 274,350 274,525 485,712" 
          fill="none" 
          stroke="url(#qSpecularComp)" 
          strokeWidth="5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <polyline 
          points="376,415 376,492 560,655" 
          fill="none" 
          stroke="#FFFFFF" 
          strokeOpacity="0.25" 
          strokeWidth="2.5" 
        />
      </g>

      {/* Piece 3: Right Q-Body & Tail */}
      <g>
        <polygon 
          points="448,508 535,465 615,540 615,465 708,430 708,745" 
          fill="url(#qGradRightComp)" 
        />
        <polyline 
          points="708,430 708,745" 
          fill="none" 
          stroke="url(#qRimComp)" 
          strokeWidth="5" 
          strokeLinecap="round" 
        />
        <polyline 
          points="448,508 535,465 615,540 615,465 708,430" 
          fill="none" 
          stroke="#FFFFFF" 
          strokeOpacity="0.35" 
          strokeWidth="3" 
          strokeLinejoin="round" 
        />
        <polyline 
          points="448,508 708,745" 
          fill="none" 
          stroke="#6366F1" 
          strokeOpacity="0.5" 
          strokeWidth="3" 
        />
      </g>
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  size = 38,
  showText = true,
  className = "",
  textClassName = "",
  iconOnly = false,
  animated = true,
}) => {
  return (
    <div 
      className={`inline-flex items-center gap-3 select-none group ${className}`}
    >
      <div className={`relative flex items-center justify-center ${animated ? 'group-hover:scale-105 transition-transform duration-300' : ''}`}>
        {/* Subtle dynamic glow ring on hover */}
        <div 
          className="absolute -inset-1 rounded-xl bg-gradient-to-r from-fuchsia-500/20 via-purple-500/20 to-cyan-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        />
        <LogoIcon size={size} />
      </div>

      {showText && !iconOnly && (
        <div className="flex items-center gap-1.5">
          <span 
            className={`font-['Montserrat'] font-extrabold tracking-tight text-white transition-colors duration-200 group-hover:text-white ${
              textClassName || 'text-2xl md:text-[26px]'
            }`}
          >
            Qarvion
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#C026D3] to-[#00D2FF] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_#00D2FF]" />
        </div>
      )}
    </div>
  );
};

export default Logo;
