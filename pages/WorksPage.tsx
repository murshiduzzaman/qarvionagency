import React, { useState, useEffect } from 'react';
import { LogoIcon } from '../components/Logo';
import { 
  Briefcase, 
  ArrowRight, 
  ArrowUpRight, 
  Star, 
  X, 
  ExternalLink, 
  TrendingUp, 
  Check, 
  Filter, 
  Sparkles, 
  Layers, 
  Image as ImageIcon, 
  Play, 
  Film 
} from 'lucide-react';
import { projects as projectsList, ProjectDetail, ProjectProof } from '../src/data/projectsData';

interface WorksPageProps {
  onNavigate: (page: string, prefillService?: string) => void;
}

const categories = [
  { id: 'all', name: 'All Works' },
  { id: 'brand-identity', name: 'Brand Identity' },
  { id: 'web-design', name: 'Web & UI/UX' },
  { id: 'packaging', name: 'Packaging & Assets' },
  { id: 'motion-animation', name: 'Motion & Animation' },
  { id: 'social-media', name: 'Social & Growth' }
];

const clientReviews = [
  {
    quote: "Qarvion fundamentally reshaped our product positioning. Our CAC dropped by 45% immediately following the rebrand.",
    author: "Dean Campbell",
    role: "Founder, Omega Tech",
    stars: 5
  },
  {
    quote: "The quality of craftsmanship and adherence to deadlines was unlike any other creative agency we have contracted.",
    author: "Alex Vane",
    role: "CEO, Flux Media",
    stars: 5
  },
  {
    quote: "Their social media creative sprint delivered our highest-converting ad campaign of the entire year.",
    author: "Sarah Lindqvist",
    role: "Marketing Director, Nova Labs",
    stars: 5
  }
];

const WorksPage: React.FC<WorksPageProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectDetail | null>(null);
  const [activeCardProofMap, setActiveCardProofMap] = useState<Record<number, number>>({});
  const [activeModalProofIndex, setActiveModalProofIndex] = useState<number>(0);
  const [modalViewMode, setModalViewMode] = useState<'video' | 'stills'>('video');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Lock body scroll and handle Escape key for case study modal
  useEffect(() => {
    if (selectedCaseStudy) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSelectedCaseStudy(null);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedCaseStudy]);

  const filteredProjects = activeFilter === 'all'
    ? projectsList
    : projectsList.filter(p => p.tag === activeFilter);

  const handleCardProofSelect = (e: React.MouseEvent, projectId: number, proofIndex: number) => {
    e.stopPropagation();
    setActiveCardProofMap(prev => ({ ...prev, [projectId]: proofIndex }));
  };

  const openCaseStudy = (project: ProjectDetail, forceMode?: 'video' | 'stills') => {
    setSelectedCaseStudy(project);
    setActiveModalProofIndex(activeCardProofMap[project.id] || 0);
    setModalViewMode(forceMode || (project.youtubeId ? 'video' : 'stills'));
  };

  return (
    <div className="pt-16 sm:pt-28 pb-8 sm:pb-24 text-white">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-3.5 sm:px-6 md:px-12 mb-3 sm:mb-8">
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-white/50 font-['Inter']">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-[#00D2FF] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-white font-medium">Our Works</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-3.5 sm:px-6 md:px-12 mb-6 sm:mb-20">
        <div className="max-w-4xl space-y-2 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/20 text-[#00D2FF] text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            <LogoIcon size={14} className="sm:w-4 sm:h-4" />
            <span>Selected Portfolio & Case Studies</span>
          </div>
          <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-['Montserrat'] tracking-tight leading-[1.12] sm:leading-[1.1]">
            Work That Delivers <br />
            <span className="text-gradient-lime">Measurable Business Impact</span>
          </h1>
          <p className="text-xs sm:text-base md:text-xl text-white/70 font-['Inter'] leading-relaxed max-w-3xl">
            Explore how we partner with ambitious startups and modern brands to engineer award-winning visual systems, 
            high-converting digital products, and ROI-driven marketing campaigns.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 pt-3 sm:pt-12 mt-3 sm:mt-8 border-t border-white/10">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/40 mr-1 sm:mr-2 flex items-center gap-1">
            <Filter className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Filter:
          </span>
          {categories.map((cat) => {
            const count = cat.id === 'all' ? projectsList.length : projectsList.filter(p => p.tag === cat.id).length;
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#A3FF12] text-[#050810] shadow-[0_0_20px_rgba(163,255,18,0.4)]'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold transition-colors ${
                  isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-white/60'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-3.5 sm:px-6 md:px-12 mb-8 sm:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {filteredProjects.map((project) => {
            const currentProofIndex = activeCardProofMap[project.id] || 0;
            const currentProof = project.proofImages[currentProofIndex] || project.proofImages[0];

            return (
              <div
                key={project.id}
                onClick={() => openCaseStudy(project)}
                className="group rounded-2xl sm:rounded-3xl bg-[#0B132B]/80 border border-white/10 overflow-hidden cursor-pointer hover:border-[#A3FF12]/50 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between shadow-xl"
              >
                <div className="relative aspect-video overflow-hidden bg-[#050810]">
                  <img
                    src={currentProof.image}
                    alt={currentProof.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-black/40"></div>

                  {/* Top Bar: Proof Tag & Switcher */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 sm:top-3 sm:left-3 sm:right-3 flex items-center justify-between z-20">
                    <span className="px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0B132B]/90 backdrop-blur-md text-[#A3FF12] border border-white/10 flex items-center gap-1.5">
                      {project.youtubeId ? <Film className="w-3 h-3" /> : <span>✦</span>}
                      <span>{currentProof.tag}</span>
                    </span>

                    {/* Miniature Proof Switcher */}
                    <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md p-0.5 sm:p-1 rounded-lg border border-white/10">
                      {project.proofImages.map((proof, pIdx) => {
                        const isActive = currentProofIndex === pIdx;
                        return (
                          <button
                            key={proof.id}
                            onClick={(e) => handleCardProofSelect(e, project.id, pIdx)}
                            title={proof.title}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                              isActive 
                                ? 'bg-[#A3FF12] text-[#050810] scale-105' 
                                : 'text-white/60 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            0{pIdx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Center Play Button Overlay for Video Projects */}
                  {project.youtubeId && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#A3FF12] text-[#050810] flex items-center justify-center shadow-[0_0_25px_rgba(163,255,18,0.7)] group-hover:scale-115 transition-transform duration-300">
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Metric Badge */}
                  <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-white z-20">
                    <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#A3FF12]" />
                    <span>{project.metric}</span>
                  </div>
                </div>

                <div className="p-4 sm:p-6 md:p-7 space-y-3 sm:space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#A3FF12] uppercase tracking-wider block mb-0.5 sm:mb-1">
                      {project.category}
                    </span>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-['Montserrat'] text-white group-hover:text-[#A3FF12] transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/30 group-hover:text-[#A3FF12] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                    </h3>
                    <p className="text-xs sm:text-sm text-white/65 font-['Inter'] mt-1.5 sm:mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50 font-['Inter']">
                    <span>{project.client}</span>
                    <span className="text-[#A3FF12] font-semibold group-hover:underline flex items-center gap-1">
                      {project.youtubeId ? (
                        <>
                          <Play className="w-3 h-3 fill-current" /> Watch Video & Case Study
                        </>
                      ) : (
                        <>
                          Read Case Study <ArrowRight className="w-3 h-3" />
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Case Study Modal Preview with Multi-Image Proof Gallery */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto">
          <div className="bg-[#0B132B] border border-white/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 relative shadow-2xl space-y-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCaseStudy(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A3FF12]/10 border border-[#A3FF12]/20 text-[#A3FF12] text-xs font-bold uppercase tracking-wider mb-2">
                <span>{selectedCaseStudy.category}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold font-['Montserrat'] text-white">
                {selectedCaseStudy.title}
              </h2>
              <p className="text-sm text-white/60 mt-1">{selectedCaseStudy.client} • Timeline: {selectedCaseStudy.timeline}</p>
            </div>

            {/* Video vs Stills View Mode Switcher (if project has YouTube video) */}
            {selectedCaseStudy.youtubeId && (
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 w-full sm:w-fit">
                <button
                  onClick={() => setModalViewMode('video')}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    modalViewMode === 'video'
                      ? 'bg-[#A3FF12] text-[#050810] shadow-[0_0_15px_rgba(163,255,18,0.3)]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Video</span>
                </button>
                <button
                  onClick={() => setModalViewMode('stills')}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    modalViewMode === 'stills'
                      ? 'bg-[#A3FF12] text-[#050810] shadow-[0_0_15px_rgba(163,255,18,0.3)]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Deliverable Stills ({selectedCaseStudy.proofImages.length})</span>
                </button>
              </div>
            )}

            {/* Main Media Display Area: Video Player OR Still Image */}
            {selectedCaseStudy.youtubeId && modalViewMode === 'video' ? (
              <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/15 bg-black shadow-2xl">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${selectedCaseStudy.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={selectedCaseStudy.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span className="flex items-center gap-1.5 text-[#A3FF12] font-semibold">
                    <Film className="w-3.5 h-3.5" /> Full HD YouTube Stream
                  </span>
                  <a
                    href={selectedCaseStudy.videoUrl || `https://youtu.be/${selectedCaseStudy.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white flex items-center gap-1 text-[#A3FF12] hover:underline"
                  >
                    Open on YouTube <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/15 bg-black/40 shadow-xl">
                <img
                  src={selectedCaseStudy.proofImages[activeModalProofIndex]?.image || selectedCaseStudy.image}
                  alt={selectedCaseStudy.proofImages[activeModalProofIndex]?.title || selectedCaseStudy.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0B132B]/90 backdrop-blur-md text-[#A3FF12] border border-white/15 shadow-lg">
                    ✦ {selectedCaseStudy.proofImages[activeModalProofIndex]?.tag || 'Primary Asset'}
                  </span>
                </div>
              </div>
            )}

            {/* Interactive Proof Deliverables Gallery Strip */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white/70">
                <div className="flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#A3FF12]" />
                  <span>Deliverable Proof Gallery ({selectedCaseStudy.proofImages.length} verified assets)</span>
                </div>
                <span className="text-[#A3FF12]">Click thumbnail to inspect</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedCaseStudy.proofImages.map((proof, idx) => {
                  const isSelected = activeModalProofIndex === idx && modalViewMode === 'stills';
                  return (
                    <button
                      key={proof.id}
                      onClick={() => {
                        setActiveModalProofIndex(idx);
                        setModalViewMode('stills');
                      }}
                      className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                        isSelected
                          ? 'bg-[#A3FF12]/15 border-[#A3FF12] shadow-[0_0_15px_rgba(163,255,18,0.2)]'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <img
                        src={proof.image}
                        alt={proof.title}
                        referrerPolicy="no-referrer"
                        className="w-14 h-12 rounded-lg object-cover shrink-0 border border-white/10"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono text-[#A3FF12] font-bold block">
                          PROOF 0{idx + 1}
                        </span>
                        <div className="text-xs font-bold text-white truncate">
                          {proof.tag}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Result Metric Banner */}
            <div className="p-6 rounded-2xl bg-[#A3FF12]/10 border border-[#A3FF12]/30 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#A3FF12] font-['Inter']">Key Result Achieved</div>
                <div className="text-sm text-white/80 font-['Inter']">{selectedCaseStudy.metricLabel}</div>
              </div>
              <div className="text-3xl md:text-4xl font-extrabold font-['Montserrat'] text-[#A3FF12]">
                {selectedCaseStudy.metric}
              </div>
            </div>

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-['Inter']">
              <div className="space-y-2 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider">The Challenge</h4>
                <p className="text-white/70 leading-relaxed">{selectedCaseStudy.challenge}</p>
              </div>
              <div className="space-y-2 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <h4 className="font-bold text-[#A3FF12] uppercase text-xs tracking-wider">Our Solution</h4>
                <p className="text-white/70 leading-relaxed">{selectedCaseStudy.solution}</p>
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-3">Delivered Scope</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedCaseStudy.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-white/70 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <Check className="w-3.5 h-3.5 text-[#A3FF12] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => {
                  setSelectedCaseStudy(null);
                  onNavigate('contact', selectedCaseStudy.category);
                }}
                className="px-6 py-3 rounded-full bg-[#A3FF12] text-[#050810] font-bold text-sm hover:shadow-[0_0_20px_rgba(163,255,18,0.5)] transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
              >
                Inquire About Similar Project
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="px-6 py-3 rounded-full bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-all cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Client Quotes */}
      <section className="container mx-auto px-4 sm:px-6 md:px-12 mb-12 sm:mb-32">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16 space-y-2 sm:space-y-4">
          <span className="text-[#00D2FF] text-[10px] sm:text-xs font-extrabold tracking-[0.3em] uppercase">CLIENT ADVOCATES</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-['Montserrat']">
            Validated by Growth Leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          {clientReviews.map((review, idx) => (
            <div key={idx} className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/10 space-y-3 sm:space-y-6">
              <div className="flex gap-1 text-[#00D2FF]">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-white/70 italic font-['Inter'] leading-relaxed">
                "{review.quote}"
              </p>
              <div className="pt-3 sm:pt-4 border-t border-white/5">
                <div className="font-bold text-white text-xs sm:text-sm font-['Montserrat']">{review.author}</div>
                <div className="text-[11px] sm:text-xs text-white/50 font-['Inter']">{review.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inter-Page Links Navigation Bar */}
      <section className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="p-5 sm:p-10 md:p-14 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#1B2A49] via-[#0F3460] to-[#0B132B] border border-white/10 text-center space-y-5 sm:space-y-8">
          <div className="max-w-2xl mx-auto space-y-2 sm:space-y-3">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold font-['Montserrat'] text-white">
              Inspired by what you see?
            </h2>
            <p className="text-white/70 text-xs sm:text-sm md:text-base font-['Inter']">
              Let's create your next breakthrough case study together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 max-w-4xl mx-auto text-left">
            <div 
              onClick={() => onNavigate('contact')}
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#A3FF12] hover:bg-white/[0.08] cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-[10px] sm:text-xs font-bold uppercase text-[#A3FF12] tracking-wider">Start Now</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A3FF12] group-hover:translate-x-1.5 transition-transform" />
              </div>
              <h3 className="text-base sm:text-xl font-bold font-['Montserrat'] text-white mb-1 sm:mb-2">Get a Project Quote</h3>
              <p className="text-[11px] sm:text-xs text-white/60 font-['Inter']">Share your vision and receive a custom roadmap and proposal.</p>
            </div>

            <div 
              onClick={() => onNavigate('services')}
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#00D2FF] hover:bg-white/[0.08] cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-[10px] sm:text-xs font-bold uppercase text-[#00D2FF] tracking-wider">Capabilities</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00D2FF] group-hover:translate-x-1.5 transition-transform" />
              </div>
              <h3 className="text-base sm:text-xl font-bold font-['Montserrat'] text-white mb-1 sm:mb-2">Explore All Services</h3>
              <p className="text-[11px] sm:text-xs text-white/60 font-['Inter']">Review full deliverables, design packages, and pricing tiers.</p>
            </div>

            <div 
              onClick={() => onNavigate('about')}
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white hover:bg-white/[0.08] cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-[10px] sm:text-xs font-bold uppercase text-white/70 tracking-wider">Our Standards</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:translate-x-1.5 transition-transform" />
              </div>
              <h3 className="text-base sm:text-xl font-bold font-['Montserrat'] text-white mb-1 sm:mb-2">Agency Philosophy</h3>
              <p className="text-[11px] sm:text-xs text-white/60 font-['Inter']">Learn how our senior team delivers without traditional agency bloat.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorksPage;
