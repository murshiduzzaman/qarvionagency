import React, { useState, useEffect } from 'react';

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  serviceKey: string;
}

const pricingData: Record<string, PricingPlan[]> = {
  logo: [
    {
      name: "Starter",
      price: "49",
      serviceKey: "Brand Identity Design",
      features: ["2 Logo Concepts", "High-Res JPG/PNG", "2 Revisions", "Basic 3D Mockup", "2-3 Days Delivery"]
    },
    {
      name: "Growth",
      price: "99",
      serviceKey: "Brand Identity Design",
      isPopular: true,
      features: ["4 Logo Concepts", "All Source Vector Files (AI/SVG/EPS)", "5 Revisions", "Social Media Starter Kit", "5 Realistic 3D Mockups", "Priority Support"]
    },
    {
      name: "Premium",
      price: "179",
      serviceKey: "Brand Identity Design",
      features: ["6 Premium Concepts", "Brand Mini Style Guide", "Unlimited Revisions", "Stationery & Business Card Design", "Full Copyright Ownership", "Priority 24h Turnaround"]
    }
  ],
  brand: [
    {
      name: "Starter",
      price: "149",
      serviceKey: "Brand Identity Design",
      features: ["Brand Logo Suite", "Color Palette & WCAG Tokens", "Typography Pairings", "Brand Stationery Design", "Core Social Media Templates", "4 Revisions"]
    },
    {
      name: "Growth",
      price: "249",
      serviceKey: "Brand Identity Design",
      isPopular: true,
      features: ["Full Visual Identity System", "Messaging, Tone & Positioning", "25-Page Usage Guidelines PDF", "Business Stationery Suite", "Social Media Asset Kit", "Priority Support"]
    },
    {
      name: "Premium",
      price: "449",
      serviceKey: "Web & UI/UX Design",
      features: ["360 Brand & Digital System", "Brand Strategy Framework", "Comprehensive 35+ Page Guide", "Landing Page UI Mockup (Figma)", "Iconography System", "Ongoing Art Director Consultation"]
    }
  ],
  social: [
    {
      name: "Starter",
      price: "89",
      serviceKey: "Social Media Marketing",
      features: ["12 Custom Posts / Month", "Engaging Captions & Copy", "Hashtag & Audience Research", "Monthly Analytics Summary", "Story & Feed Formats", "Standard Support"]
    },
    {
      name: "Growth",
      price: "159",
      serviceKey: "Social Media Marketing",
      isPopular: true,
      features: ["20 Custom Branded Creatives", "Carousel Decks & Short Reels", "Community Engagement Strategy", "Paid Ads Setup & Split Testing", "Bi-weekly Strategy Review", "Priority Ad Creative Batches"]
    },
    {
      name: "Premium",
      price: "279",
      serviceKey: "Paid Performance Ads",
      features: ["30 Custom Branded Assets / Month", "Advanced Paid Funnel Campaigns", "Direct-Response Video Hooks", "Weekly Campaign Optimization", "Dedicated Performance Manager", "Full Asset Production"]
    }
  ],
  reels: [
    {
      name: "Starter Reels",
      price: "119",
      serviceKey: "Social Media Reels Editing",
      features: [
        "5 High-Retention Short Reels / TikToks",
        "Dynamic Hormozi-Style Captions & Emojis",
        "Trending Sound Design & SFX Audio Mix",
        "Smooth Motion Transitions & Punch-in Zooms",
        "Vertical 9:16 (IG Reels, TikTok, YT Shorts)",
        "2 Revisions per Reel • 3 Days Turnaround"
      ]
    },
    {
      name: "Viral Growth",
      price: "229",
      serviceKey: "Social Media Reels Editing",
      isPopular: true,
      features: [
        "12 High-Converting Reels & Motion Ads",
        "Viral Hook Strategy & 3-Second Pattern Interrupts",
        "Custom Kinetic Typography & Motion Graphics",
        "Cinematic Color Grading & Audio Restoration",
        "2 Ad Hook Variations for Meta & TikTok Split Testing",
        "Project Source Files (Premiere Pro / After Effects)",
        "Priority 48h Turnaround • 5 Revisions"
      ]
    },
    {
      name: "Commercial & Ads",
      price: "399",
      serviceKey: "Social Media Reels Editing",
      features: [
        "25 Premium Short-Form Reels & Paid Motion Ads",
        "Direct-Response Ad Script Review & Angles",
        "3D Product Mockup Overlays & Custom VFX",
        "3 Hook Iterations per Ad Creative (Meta & TikTok)",
        "Crisp 4K UHD Exports + Viral Cover Thumbnails",
        "Dedicated Motion Producer & Private Slack Support",
        "Unlimited Revisions • Priority 24h Turnaround"
      ]
    }
  ]
};

const tabs = [
  { id: 'logo', label: 'Logo Design', mobileLabel: 'Logo Design' },
  { id: 'brand', label: 'Brand Identity', mobileLabel: 'Brand Identity' },
  { id: 'social', label: 'Social Media Marketing', mobileLabel: 'Social Marketing' },
  { id: 'reels', label: 'Social Media Reels Editing', mobileLabel: 'Reels Video Editing' }
];

interface PricingProps {
  onNavigate?: (page: string, prefillService?: string) => void;
}

const Pricing: React.FC<PricingProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('logo');
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.pricing-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleTabChange = (tab: string) => {
    setAnimate(false);
    setTimeout(() => {
      setActiveTab(tab);
      setAnimate(true);
    }, 50);
  };

  return (
    <section id="pricing" className="relative py-6 sm:py-24 md:py-32 px-3.5 sm:px-6 md:px-12 bg-gradient-to-b from-[#060B1A] via-[#0B1224] to-[#0E1A35] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[160px] rounded-full pointer-events-none"></div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-4 sm:mb-16 space-y-1 sm:space-y-4">
          <span className="text-blue-500 text-[9px] sm:text-xs font-extrabold tracking-[0.25em] sm:tracking-[0.4em] uppercase pricing-reveal scroll-reveal">
            PRICING
          </span>
          <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-6xl font-['Montserrat'] font-extrabold text-white pricing-reveal scroll-reveal [transition-delay:0.1s] leading-tight">
            Premium Quality <br />
            <span className="font-serif-italic text-blue-400">Affordable Pricing</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-[11px] sm:text-base md:text-lg font-['Inter'] pricing-reveal scroll-reveal [transition-delay:0.2s] px-2 sm:px-0 leading-relaxed">
            Elevate your brand with premium creative, viral short-form reels, and marketing solutions at transparent market rates.
          </p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-4 sm:mb-16 pricing-reveal scroll-reveal [transition-delay:0.3s]">
          {/* Mobile View: 2x2 Grid (Untouched, all 4 services visible on phone screens) */}
          <div className="sm:hidden relative p-1 bg-[#0A1121] rounded-2xl border border-white/10 grid grid-cols-2 shadow-2xl gap-1 w-full max-w-sm mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative w-full px-2 py-2 rounded-xl text-[10.5px] xs:text-xs font-bold transition-all duration-300 z-10 active:scale-95 cursor-pointer text-center whitespace-normal shrink-0 ${
                  activeTab === tab.id ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                <span>{tab.mobileLabel}</span>
                {activeTab === tab.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] -z-10 animate-pulse-slow"></div>
                )}
              </button>
            ))}
          </div>

          {/* Desktop PC View: Pristine Centered Horizontal Pill Bar (Fixed position and placement) */}
          <div className="hidden sm:inline-flex relative p-1.5 bg-[#0A1121] rounded-full border border-white/10 items-center justify-center shadow-2xl gap-1 mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative px-5 md:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 z-10 active:scale-95 cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === tab.id ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] -z-10 animate-pulse-slow"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Grid: Starter & Growth side-by-side (2 columns) on mobile, Premium spanning full-width below; 3 columns on PC */}
        <div className={`grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 xs:gap-3 sm:gap-8 transition-all duration-500 ${animate ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
          {pricingData[activeTab].map((plan, idx) => {
            const isPremium = idx === 2;
            return (
              <div 
                key={`${activeTab}-${plan.name}`}
                className={`group relative ${isPremium ? 'col-span-2 md:col-span-1 p-3.5 sm:p-8 md:p-10' : 'col-span-1 p-2.5 xs:p-3 sm:p-8 md:p-10'} rounded-xl sm:rounded-[32px] bg-white/[0.03] border border-white/5 backdrop-blur-xl transition-all duration-500 flex flex-col hover:border-blue-500/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(37,99,235,0.15)] md:hover:-translate-y-4 ${
                  plan.isPopular ? 'border-blue-500/40 lg:scale-105 bg-white/[0.05] shadow-[0_10px_30px_rgba(0,0,0,0.3)] sm:shadow-[0_20px_50px_rgba(0,0,0,0.4)] ring-1 ring-blue-500/30 sm:ring-0' : ''
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-700 to-blue-500 text-white text-[6.5px] xs:text-[7.5px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-4 sm:py-1.5 rounded-full uppercase tracking-wider sm:tracking-widest shadow-lg overflow-hidden whitespace-nowrap z-20">
                    Most Popular
                    <div className="absolute inset-0 bg-white/20 animate-shine"></div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-2 sm:mb-8">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className={`${isPremium ? 'text-xs xs:text-sm sm:text-xl' : 'text-[11px] xs:text-xs sm:text-xl'} font-bold font-['Montserrat'] text-white mb-0.5 sm:mb-2 truncate`}>
                      {plan.name}
                    </h3>
                    {isPremium && (
                      <span className="sm:hidden text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        Full Suite
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-0.5 sm:gap-1">
                    <span className={`${isPremium ? 'text-xl sm:text-4xl md:text-5xl' : 'text-base xs:text-lg sm:text-4xl md:text-5xl'} font-extrabold text-white font-['Montserrat'] group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-500`}>
                      ${plan.price}
                    </span>
                    {activeTab === 'social' && <span className="text-white/40 text-[8px] xs:text-[9px] sm:text-sm">/mo</span>}
                    {activeTab === 'reels' && <span className="text-white/40 text-[8px] xs:text-[9px] sm:text-sm">/pack</span>}
                  </div>
                </div>

                {/* Features List: 2-column on mobile for full-width Premium; single column for Starter & Growth */}
                <ul className={`${isPremium ? 'grid grid-cols-2 md:grid-cols-1 gap-x-2.5 gap-y-1 sm:gap-y-0 sm:space-y-4' : 'space-y-1 sm:space-y-4'} mb-2.5 sm:mb-10 flex-grow`}>
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-1 sm:gap-3 text-white/70 text-[8.5px] xs:text-[9.5px] sm:text-sm md:text-base group-hover:text-white/90 transition-colors leading-tight">
                      <svg className="w-2.5 h-2.5 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`${isPremium ? 'line-clamp-2' : 'line-clamp-2 sm:line-clamp-none'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Action Button */}
                <button 
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('contact', plan.serviceKey);
                    } else {
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`relative w-full ${isPremium ? 'py-2 sm:py-4 rounded-xl sm:rounded-full text-[10px] xs:text-xs sm:text-sm' : 'py-1.5 xs:py-2 sm:py-4 rounded-lg sm:rounded-full text-[9px] xs:text-[10px] sm:text-sm'} font-bold font-['Montserrat'] text-white overflow-hidden group/btn transition-all duration-300 text-center block cursor-pointer`}
                >
                  <span className="relative z-10">
                    <span className="sm:hidden">{isPremium ? `Select ${plan.name} Package` : `Choose ${plan.name.split(' ')[0]}`}</span>
                    <span className="hidden sm:inline">Select {plan.name} Package</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] group-hover/btn:brightness-125 transition-all"></div>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 animate-shine transition-opacity"></div>
                </button>

                <div className="absolute inset-0 rounded-xl sm:rounded-[32px] overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-[-25deg] transition-all duration-1000 group-hover:left-[150%]"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
