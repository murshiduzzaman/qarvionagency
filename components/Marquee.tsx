import React from 'react';

interface BrandLeader {
  id: string;
  name: string;
  category: string;
  color: string;
  icon: React.ReactNode;
}

const brandLeaders: BrandLeader[] = [
  {
    id: 'techflow',
    name: 'TechFlow AI',
    category: 'Enterprise SaaS',
    color: '#00D2FF',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    )
  },
  {
    id: 'stellar',
    name: 'Stellar Ventures',
    category: 'Venture Capital',
    color: '#60A5FA',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  },
  {
    id: 'nexgen',
    name: 'NexGen Labs',
    category: 'Fintech & Web3',
    color: '#34D399',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" />
        <polyline points="12 22 12 12 21 7" />
        <polyline points="3 7 12 12" />
      </svg>
    )
  },
  {
    id: 'lumina',
    name: 'Lumina Health',
    category: 'BioTech & Health',
    color: '#A78BFA',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    )
  },
  {
    id: 'zenith',
    name: 'Zenith Dynamics',
    category: 'Robotics & AI',
    color: '#F59E0B',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20" />
        <path d="m17 5-5-3-5 3" />
        <path d="m17 19-5 3-5-3" />
        <path d="M2 12h20" />
      </svg>
    )
  },
  {
    id: 'omni',
    name: 'Omni Creative',
    category: 'Media & Production',
    color: '#38BDF8',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="12" r="4" />
        <circle cx="16" cy="12" r="4" />
        <path d="M8 8c4 4 4 4 8 8" />
      </svg>
    )
  },
  {
    id: 'pulse',
    name: 'Pulse Audio',
    category: 'Acoustic AI & Hardware',
    color: '#F43F5E',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 10v4" />
        <path d="M6 6v12" />
        <path d="M10 3v18" />
        <path d="M14 8v8" />
        <path d="M18 5v14" />
        <path d="M22 10v4" />
      </svg>
    )
  },
  {
    id: 'vortex',
    name: 'Vortex Studio',
    category: '3D Gaming & XR',
    color: '#818CF8',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    )
  }
];

const Marquee: React.FC = () => {
  // Duplicate list exactly once for seamless infinite right-to-left loop
  const loopItems = [...brandLeaders, ...brandLeaders];

  return (
    <section className="relative py-2.5 sm:py-12 md:py-16 overflow-hidden bg-transparent">
      {/* Delicate hairline divider connecting seamlessly from Hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85vw] max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-[#00D2FF]/25 to-transparent pointer-events-none"></div>

      {/* Organic ambient lighting aura matching the site's midnight navy and cyan palette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[220px] bg-gradient-to-r from-[#00D2FF]/10 via-[#3A7BD5]/10 to-[#00D2FF]/5 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Header Label: Trusted by Industry Leaders */}
      <div className="container mx-auto px-4 max-w-7xl mb-2.5 sm:mb-9 text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:px-4 sm:py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-[0_2px_15px_rgba(0,0,0,0.2)]">
          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D2FF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#00D2FF]"></span>
          </span>
          <span className="text-[9px] sm:text-xs font-bold tracking-[0.18em] sm:tracking-[0.25em] text-white/80 uppercase font-['Montserrat']">
            Trusted by Industry Leaders
          </span>
          <span className="text-white/20">•</span>
          <span className="text-[9px] sm:text-xs font-medium text-white/50 tracking-wider">
            170+ Brands
          </span>
        </div>
      </div>

      {/* Seamless Infinite Right-to-Left Brand Marquee with True CSS Alpha Mask */}
      <div 
        className="relative w-full overflow-hidden py-1 sm:py-3"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
        }}
      >
        {/* Marquee Track (Right to Left loop, smoothly pauses on hover) */}
        <div className="logo-track flex items-center gap-2.5 sm:gap-7 md:gap-8 px-4">
          {loopItems.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="group flex-shrink-0 flex items-center gap-2 sm:gap-3.5 px-3 py-1.5 sm:px-6 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#00D2FF]/40 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] hover:scale-[1.03] cursor-default"
            >
              {/* Brand Vector Icon in glowing container */}
              <div 
                className="w-6 h-6 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 border border-white/10 transition-transform duration-300 group-hover:scale-110"
                style={{ 
                  backgroundColor: `${brand.color}15`,
                  color: brand.color 
                }}
              >
                {brand.icon}
              </div>

              {/* Brand Typography & Category */}
              <div className="flex flex-col text-left">
                <span className="text-white/90 group-hover:text-white font-['Montserrat'] font-bold text-[11px] sm:text-base tracking-tight whitespace-nowrap transition-colors">
                  {brand.name}
                </span>
                <span className="text-[8px] sm:text-[11px] text-white/45 group-hover:text-[#00D2FF] font-medium tracking-wide whitespace-nowrap transition-colors">
                  {brand.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle bottom transition line easing smoothly into the Services section */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85vw] max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Marquee;
