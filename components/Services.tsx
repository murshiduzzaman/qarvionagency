
import React, { useState, useEffect, useRef } from 'react';
import brandIdentityProof from '../src/assets/images/brand_identity_proof_1788945110423.jpg';
import uiuxDesignProof from '../src/assets/images/uiux_design_proof_1788945136312.jpg';
import socialCampaignProof from '../src/assets/images/social_campaign_proof_1788945151464.jpg';
import packagingMotionProof from '../src/assets/images/packaging_motion_proof_1788945174897.jpg';
import { ArrowRight, ArrowUpRight, Check, Sparkles } from 'lucide-react';

interface ProofImage {
  id: string;
  title: string;
  tag: string;
  metric: string;
  image: string;
}

interface Service {
  id: number;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
  proofImages: ProofImage[];
}

const services: Service[] = [
  {
    id: 1,
    title: "Brand Identity & Strategy",
    category: "Branding",
    description: "We craft cohesive visual systems that command market authority. From typography and responsive logomarks to complete brand guidelines and color theory tokens.",
    deliverables: ["Vector Logo Suite", "Brand Guidelines Book", "WCAG Color Tokens", "Typography Hierarchy"],
    proofImages: [
      {
        id: "bi-1",
        title: "Master Identity & Guidelines",
        tag: "Brand Architecture",
        metric: "100% Brand Cohesion",
        image: brandIdentityProof
      },
      {
        id: "bi-2",
        title: "Responsive Logomarks",
        tag: "Vector Logo Suite",
        metric: "+140% Brand Recall",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "bi-3",
        title: "Executive Stationery Collateral",
        tag: "Print & Tactile Assets",
        metric: "Luxury Letterpress",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop"
      }
    ]
  },
  {
    id: 2,
    title: "Web & Digital Product Design",
    category: "UI/UX & Web",
    description: "Bespoke digital platforms engineered for conversion. We combine clean aesthetics with atomic component libraries, responsive micro-interactions, and intuitive UX flows.",
    deliverables: ["Figma UI Prototypes", "Design System Library", "Conversion Landing Pages", "Responsive Dev Handoff"],
    proofImages: [
      {
        id: "ui-1",
        title: "SaaS Analytics Cloud Platform",
        tag: "SaaS Dashboard UI",
        metric: "+64% User Activation",
        image: uiuxDesignProof
      },
      {
        id: "ui-2",
        title: "Fintech Mobile App Experience",
        tag: "Mobile UX Flow",
        metric: "4.9 App Store Rating",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "ui-3",
        title: "Component Architecture & Tokens",
        tag: "Design System",
        metric: "140+ Atomic Assets",
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop"
      }
    ]
  },
  {
    id: 3,
    title: "Social Media & Performance Ads",
    category: "Marketing",
    description: "Drive verifiable client acquisition with scroll-stopping static and motion creatives, viral short-form storytelling, and high-ROAS advertising split-tests.",
    deliverables: ["Content Narrative Pillars", "Short-Form Video Reels", "Carousel Ad Templates", "Conversion Copywriting"],
    proofImages: [
      {
        id: "sm-1",
        title: "Omnichannel Social Campaigns",
        tag: "Viral Motion Reels",
        metric: "+340% Audience Reach",
        image: socialCampaignProof
      },
      {
        id: "sm-2",
        title: "High-Engagement Carousel Decks",
        tag: "Content Strategy",
        metric: "18.4% Save Rate",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "sm-3",
        title: "Direct-Response Ad Variations",
        tag: "Paid Ads Suite",
        metric: "4.2x Average ROAS",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
      }
    ]
  },
  {
    id: 4,
    title: "Packaging & Tactile 3D Assets",
    category: "Packaging & 3D",
    description: "Bridge the digital and physical realms with premium luxury packaging, foil-embossed unboxing experiences, die-cut finishes, and photorealistic 3D product renders.",
    deliverables: ["Die-Cut Box Packaging", "Spot UV & Foil Specs", "Photorealistic 3D Renders", "CMYK Print Ready"],
    proofImages: [
      {
        id: "pk-1",
        title: "Luxury Unboxing Packaging",
        tag: "Embossed Foil Box",
        metric: "Award-Winning Unbox",
        image: packagingMotionProof
      },
      {
        id: "pk-2",
        title: "Retail Packaging & Die-Cut Labels",
        tag: "Die-Cut Print Ready",
        metric: "High-Precision Print",
        image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "pk-3",
        title: "3D Product CGI Visualizations",
        tag: "Photorealistic 3D",
        metric: "8K CGI Render",
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop"
      }
    ]
  }
];

interface ServicesProps {
  onNavigate?: (page: string, prefillService?: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeProofIndices, setActiveProofIndices] = useState<Record<number, number>>({
    0: 0,
    1: 0,
    2: 0,
    3: 0
  });

  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Only auto-observe on desktop screens. On mobile (width < 768), auto-expansion during scrolling causes erratic layout jumps (CLS).
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return;
    }

    const observerOptions = {
      root: null,
      threshold: 0.4,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          setActiveIndex(index);
        }
      });
    }, observerOptions);

    panelRefs.current.forEach((panel) => {
      if (panel) observer.observe(panel);
    });

    return () => observer.disconnect();
  }, []);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  const selectProof = (e: React.MouseEvent, serviceIndex: number, proofIndex: number) => {
    e.stopPropagation();
    setActiveProofIndices((prev) => ({
      ...prev,
      [serviceIndex]: proofIndex
    }));
  };

  return (
    <section 
      id="services"
      ref={sectionRef}
      className="py-6 sm:py-20 md:py-24 px-3.5 sm:px-6 md:px-12 max-w-7xl mx-auto"
    >
      <div className="mb-4 sm:mb-14 space-y-1.5 sm:space-y-4">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/20 text-[#00D2FF] text-[9px] sm:text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>Core Capabilities & Proof</span>
        </div>
        <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-['Montserrat'] font-extrabold text-white">
          Our <span className="text-gradient-brand">Services</span> & Deliverables
        </h2>
        <p className="text-white/60 max-w-2xl text-[11px] sm:text-base md:text-lg font-['Inter'] leading-relaxed">
          Explore our signature disciplines backed by verified project proof, real deliverable mockups, and client performance metrics.
        </p>
      </div>

      <div className="space-y-2.5 sm:space-y-4">
        {services.map((service, serviceIndex) => {
          const activeProofIndex = activeProofIndices[serviceIndex] || 0;
          const currentProof = service.proofImages[activeProofIndex] || service.proofImages[0];
          const isActive = activeIndex === serviceIndex;

          return (
            <div
              key={service.id}
              ref={(el) => { panelRefs.current[serviceIndex] = el; }}
              data-index={serviceIndex}
              onMouseEnter={() => handleInteraction(serviceIndex)}
              onClick={() => handleInteraction(serviceIndex)}
              className={`service-panel cursor-pointer rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/5 relative group flex items-center transition-all duration-500 ease-in-out ${
                isActive ? 'active-panel border-[#00D2FF]/30' : 'hover:border-white/20'
              }`}
            >
              {/* Collapsed View Label */}
              <div className={`absolute left-3.5 sm:left-8 top-1/2 -translate-y-1/2 transition-opacity duration-300 flex items-center justify-between w-[calc(100%-1.75rem)] sm:w-[calc(100%-4rem)] ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="text-[10px] sm:text-xs font-bold text-[#00D2FF]/60 font-mono">0{service.id}</span>
                  <h3 className="text-xs sm:text-xl md:text-2xl font-bold font-['Montserrat'] text-white/70 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                </div>
                <span className="text-[9px] sm:text-xs font-semibold text-white/40 hidden xs:inline-block">
                  {service.proofImages.length} Proofs
                </span>
              </div>

              {/* Expanded Content */}
              <div className="w-full min-h-full md:h-full flex flex-col md:flex-row items-center justify-between px-3 sm:px-8 md:px-10 py-3 sm:py-6 md:py-0 gap-2.5 sm:gap-8 overflow-hidden">
                {/* Left Side: Text & Actions */}
                <div className="panel-content flex-1 max-w-xl py-0.5 sm:py-4 md:py-8 space-y-1.5 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-[10px] sm:text-xs font-bold text-[#00D2FF] tracking-widest uppercase font-mono">
                      Service 0{service.id} • {service.category}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {currentProof.metric}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-extrabold font-['Montserrat'] text-white">
                    {service.title}
                  </h3>

                  <p className="text-white/70 leading-relaxed text-[11px] sm:text-sm md:text-base font-['Inter']">
                    {service.description}
                  </p>

                  {/* Key Deliverable Tags */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 pt-0.5 sm:pt-1">
                    {service.deliverables.map((item, idx) => (
                      <span 
                        key={idx} 
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-white/5 border border-white/10 text-[9px] sm:text-xs text-white/80 font-medium"
                      >
                        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#00D2FF]" />
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Interactive Action Hub */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 pt-1 sm:pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onNavigate) {
                          onNavigate('contact', service.title);
                        } else {
                          window.location.hash = '#contact';
                        }
                      }}
                      className="px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-[#00D2FF] hover:bg-[#3A7BD5] text-[#0B132B] hover:text-white font-bold text-[11px] sm:text-sm transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(0,210,255,0.3)] active:scale-95"
                    >
                      <span>Inquire This Service</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onNavigate) {
                          onNavigate('works');
                        } else {
                          window.location.hash = '#projects';
                        }
                      }}
                      className="px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white font-medium text-[11px] sm:text-sm border border-white/10 transition-all flex items-center gap-1.5 active:scale-95"
                    >
                      <span>View Case Studies</span>
                      <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right Side: Enhanced Proof Image & Thumbnail Switcher */}
                <div className="panel-image-mask flex-1 h-[150px] xs:h-[180px] sm:h-[250px] md:h-[340px] w-full relative flex flex-col justify-end">
                  <div className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden relative shadow-2xl border border-white/10 group/img">
                    {/* Main Showcase Proof Image */}
                    <img 
                      src={currentProof.image} 
                      alt={currentProof.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-all duration-700 group-hover/img:scale-105"
                    />

                    {/* Gradient Depth Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/90 via-[#0B132B]/30 to-transparent"></div>

                    {/* Floating Proof Tag Badge */}
                    <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex items-center gap-2">
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full bg-[#0B132B]/80 backdrop-blur-md border border-white/15 text-[8px] sm:text-xs font-bold text-[#00D2FF] tracking-wide shadow-md">
                        ✦ {currentProof.tag}
                      </span>
                    </div>

                    {/* Proof Title & Thumbnails Bar at Bottom of Image */}
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-2.5 sm:left-2.5 sm:right-2.5 flex flex-col sm:flex-row sm:items-end justify-between gap-1 sm:gap-1.5 z-10">
                      <div>
                        <p className="text-[9px] sm:text-xs font-bold text-white drop-shadow-md">
                          {currentProof.title}
                        </p>
                        <p className="text-[8px] sm:text-[10px] text-white/60 font-['Inter']">
                          Verified Deliverable Proof
                        </p>
                      </div>

                      {/* Interactive Proof Selector Thumbnails */}
                      <div className="flex items-center gap-1 bg-[#0B132B]/75 backdrop-blur-md p-0.5 sm:p-1 rounded-lg sm:rounded-xl border border-white/10 shrink-0">
                        {service.proofImages.map((proof, pIdx) => {
                          const isProofActive = activeProofIndex === pIdx;
                          return (
                            <button
                              key={proof.id}
                              onClick={(e) => selectProof(e, serviceIndex, pIdx)}
                              title={proof.title}
                              className={`relative w-7 h-7 sm:w-11 sm:h-11 rounded-md sm:rounded-lg overflow-hidden transition-all duration-200 border ${
                                isProofActive 
                                  ? 'border-[#00D2FF] ring-2 ring-[#00D2FF]/40 scale-105' 
                                  : 'border-white/20 opacity-60 hover:opacity-100'
                              }`}
                            >
                              <img 
                                src={proof.image} 
                                alt={proof.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute bottom-0.5 right-0.5 text-[6px] sm:text-[8px] font-bold bg-black/70 text-white px-0.5 sm:px-1 rounded font-mono">
                                0{pIdx + 1}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
