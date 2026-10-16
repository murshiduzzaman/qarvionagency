
import React, { useEffect, useRef } from 'react';

interface Feature {
  id: number;
  title: string;
  category: string;
  text: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    id: 1,
    title: "Unique Concepts",
    category: "Creative Strategy",
    text: "No templates used. Every strategy and creative is crafted from scratch to match your brand’s identity.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Fast Delivery",
    category: "Execution Speed",
    text: "We respect your time. Campaigns and creatives delivered within agreed timelines without compromising quality.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Full Ownership",
    category: "Transparency",
    text: "You get complete ownership of all assets, campaigns, source files, and creative systems.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Unlimited Support",
    category: "Partnership",
    text: "From launch to scaling, our team supports your brand growth with ongoing optimization and consultation.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  }
];

const FeatureCard: React.FC<{ feature: Feature; index: number }> = ({ feature, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  return (
    <div 
      className="scroll-reveal group perspective-container"
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="tilt-card relative h-full p-3.5 sm:p-8 rounded-xl sm:rounded-[32px] bg-white/[0.03] border border-white/5 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.07] hover:border-[#A3FF12]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(163,255,18,0.1)]"
      >
        <span className="text-[#A3FF12] text-[8px] sm:text-[10px] font-extrabold uppercase tracking-[0.2em] mb-2 sm:mb-6 block opacity-60 group-hover:opacity-100 transition-opacity">
          {feature.category}
        </span>
        <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl bg-white/5 flex items-center justify-center text-white mb-2.5 sm:mb-8 group-hover:bg-[#A3FF12] group-hover:text-black group-hover:rotate-[5deg] transition-all duration-500">
          {feature.icon}
        </div>
        <h3 className="text-base sm:text-2xl font-['Montserrat'] font-bold text-white mb-1 sm:mb-4 group-hover:text-[#A3FF12] transition-colors duration-400">
          {feature.title}
        </h3>
        <p className="text-white/60 sm:text-white/50 leading-relaxed font-['Inter'] text-[11px] sm:text-sm group-hover:text-white/80 transition-colors duration-400">
          {feature.text}
        </p>
        <div className="absolute inset-0 rounded-xl sm:rounded-[32px] overflow-hidden pointer-events-none">
          <div className="absolute top-[-100%] left-[-100%] w-[300%] h-[300%] bg-gradient-to-br from-[#A3FF12]/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:top-0 group-hover:left-0 transition-all duration-700"></div>
        </div>
      </div>
    </div>
  );
};

const WhyChooseUs: React.FC = () => {
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

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-choose-us" className="relative pt-6 sm:pt-32 pb-4 sm:pb-16 px-3.5 sm:px-6 md:px-12 bg-[#050505] overflow-hidden">
      <div className="vignette-overlay absolute inset-0 z-0"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#A3FF12]/5 blur-[150px] rounded-full pointer-events-none z-0 opacity-40 animate-orb"></div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-4 sm:mb-16 space-y-1 sm:space-y-4">
          <span className="text-[#A3FF12] text-[9px] sm:text-xs font-extrabold tracking-[0.25em] sm:tracking-[0.4em] uppercase scroll-reveal">
            WHY QARVION
          </span>
          <h2 className="text-xl xs:text-2xl sm:text-5xl md:text-7xl font-['Montserrat'] font-extrabold text-white scroll-reveal [transition-delay:0.1s]">
            Why <span className="font-serif-italic">Choose Us?</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-8 mb-5 sm:mb-28">
          {features.map((feature, idx) => (
            <FeatureCard key={feature.id} feature={feature} index={idx} />
          ))}
        </div>
        <div className="max-w-4xl mx-auto border border-white/10 rounded-xl sm:rounded-[40px] overflow-hidden bg-white/[0.02] backdrop-blur-md scroll-reveal">
            <div className="p-3.5 sm:p-10 md:p-16">
                <h3 className="text-base xs:text-lg sm:text-3xl md:text-5xl font-['Montserrat'] font-bold text-white text-center mb-3.5 sm:mb-14">
                    Why Qarvion <span className="font-serif-italic">Beats Others</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 relative">
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2"></div>
                    <div className="space-y-2.5 sm:space-y-8 pr-0 md:pr-12 opacity-50">
                        <h4 className="text-sm sm:text-xl font-bold text-white uppercase tracking-wider mb-2 sm:mb-6">Others</h4>
                        <ul className="space-y-2 sm:space-y-6">
                            {["Generic templates", "Delayed communication", "Limited revisions", "No long-term support"].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2 sm:gap-4 text-white/70 font-['Inter'] text-[11px] sm:text-base">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2.5 sm:space-y-8 pl-0 md:pl-12 relative group">
                        <div className="absolute inset-0 bg-[#A3FF12]/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h4 className="text-sm sm:text-xl font-bold text-[#A3FF12] uppercase tracking-wider mb-2 sm:mb-6 flex items-center gap-2">
                            Qarvion
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#A3FF12] animate-pulse"></div>
                        </h4>
                        <ul className="space-y-2 sm:space-y-6 relative">
                            {["Custom brand systems", "Dedicated team", "Data-driven marketing", "Long-term scaling partner"].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2 sm:gap-4 text-white font-['Inter'] font-medium text-[11px] sm:text-base">
                                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#A3FF12] shadow-[0_0_10px_#A3FF12]"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
