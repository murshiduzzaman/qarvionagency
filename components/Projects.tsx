
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Sparkles, Check, Play, Film, X, ExternalLink } from 'lucide-react';
import { projects, Project, ProjectProof } from '../src/data/projectsData';

const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'brand-identity', label: 'Brand Identity' },
  { id: 'web-design', label: 'Web & UI/UX' },
  { id: 'packaging', label: 'Packaging & Assets' },
  { id: 'motion-animation', label: 'Motion & Animation' },
  { id: 'social-media', label: 'Social Media' }
];

export { projects };
export type { Project, ProjectProof };

interface ProjectsProps {
  onNavigate?: (page: string, prefillService?: string, sectionId?: string) => void;
}

const ProjectCard: React.FC<{ 
  project: Project; 
  index: number; 
  onNavigate?: (page: string, prefillService?: string, sectionId?: string) => void;
  onPlayVideo?: (project: Project) => void;
}> = ({ project, index, onNavigate, onPlayVideo }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeProofIndex, setActiveProofIndex] = useState(0);
  const currentProof = project.proofImages[activeProofIndex] || project.proofImages[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 24;
    const rotateY = (centerX - x) / 24;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  const selectProof = (e: React.MouseEvent, pIdx: number) => {
    e.stopPropagation();
    setActiveProofIndex(pIdx);
  };

  const handleCardClick = () => {
    if (project.youtubeId && onPlayVideo) {
      onPlayVideo(project);
    } else if (onNavigate) {
      onNavigate('works');
    } else {
      window.location.hash = '#works';
    }
  };

  return (
    <div 
      className="scroll-reveal group perspective-container"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
        className="tilt-card relative h-[210px] xs:h-[240px] sm:h-auto sm:aspect-square rounded-xl sm:rounded-[32px] overflow-hidden bg-[#0B132B] border border-white/10 cursor-pointer shadow-xl flex flex-col justify-between"
      >
        {/* Active Project Proof Image */}
        <img 
          src={currentProof.image} 
          alt={currentProof.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        />

        {/* Ambient Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-black/40 to-transparent"></div>

        {/* Top Floating Badge & Interactive Proof Selector */}
        <div className="absolute top-2 left-2 right-2 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between z-20">
          <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#0B132B]/85 backdrop-blur-md border border-white/15 text-[8px] sm:text-xs font-bold text-[#A3FF12] tracking-wide shadow-md flex items-center gap-1">
            {project.youtubeId ? <Film className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <span>✦</span>}
            <span className="truncate max-w-[100px] sm:max-w-none">{currentProof.tag}</span>
          </span>

          {/* Miniature Proof Switcher Tabs */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-[#050810]/80 backdrop-blur-md p-0.5 sm:p-1 rounded-md sm:rounded-xl border border-white/15">
            {project.proofImages.map((proof, pIdx) => {
              const isActive = activeProofIndex === pIdx;
              return (
                <button
                  key={proof.id}
                  onClick={(e) => selectProof(e, pIdx)}
                  title={proof.title}
                  className={`px-1.5 py-0.5 sm:px-2 rounded text-[7px] sm:text-[10px] font-mono font-bold transition-all ${
                    isActive 
                      ? 'bg-[#A3FF12] text-[#050810] scale-105 shadow-sm' 
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  0{pIdx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Video Play Button Overlay if Project has YouTube Video */}
        {project.youtubeId && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="w-9 h-9 sm:w-16 sm:h-16 rounded-full bg-[#A3FF12] text-[#050810] flex items-center justify-center shadow-[0_0_20px_rgba(163,255,18,0.7)] group-hover:scale-115 transition-transform duration-300">
              <Play className="w-3.5 h-3.5 sm:w-7 sm:h-7 fill-current ml-0.5 sm:ml-1" />
            </div>
          </div>
        )}

        {/* Bottom Content Area */}
        <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-8 z-20 flex flex-col justify-end">
          <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
            <span className="text-[#A3FF12] text-[8px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest">
              {project.category}
            </span>
            <span className="text-[7px] sm:text-[10px] font-bold px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full bg-white/10 text-white/90 border border-white/15">
              {project.metric} {project.metricLabel}
            </span>
          </div>

          <h3 className="text-white text-xs xs:text-sm sm:text-2xl font-bold font-['Montserrat'] flex items-center justify-between group-hover:text-[#A3FF12] transition-colors leading-tight">
            <span className="truncate pr-1 sm:pr-2">{project.title}</span>
            <ArrowUpRight className="w-3 h-3 sm:w-5 sm:h-5 text-[#A3FF12] shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </h3>

          <p className="text-white/70 text-[10px] sm:text-sm mt-0.5 sm:mt-1 line-clamp-1 font-['Inter'] leading-tight sm:leading-normal">
            {project.description}
          </p>

          {/* Quick Deliverables Chips or Watch Video Action */}
          <div className="flex items-center justify-between mt-1 sm:mt-4 pt-1 sm:pt-4 border-t border-white/10">
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {project.deliverables.slice(0, 2).map((item, dIdx) => (
                <span key={dIdx} className="text-[7px] sm:text-[10px] text-white/60 bg-black/40 px-1 py-0.2 sm:px-2 rounded border border-white/5 truncate max-w-[85px] sm:max-w-none">
                  {item}
                </span>
              ))}
            </div>

            {project.youtubeId && (
              <span className="text-[8px] sm:text-[11px] text-[#A3FF12] font-bold flex items-center gap-1 bg-[#A3FF12]/10 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-[#A3FF12]/20 shrink-0">
                <Play className="w-2 h-2 sm:w-3 sm:h-3 fill-current" /> Watch
              </span>
            )}
          </div>
        </div>

        {/* Hover Border Glow */}
        <div className="absolute inset-0 border-[2px] border-[#A3FF12]/0 group-hover:border-[#A3FF12]/50 rounded-2xl sm:rounded-[32px] transition-all duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
};

const Projects: React.FC<ProjectsProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [activeVideoProject, setActiveVideoProject] = useState<Project | null>(null);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.tag === activeFilter));
    }
  }, [activeFilter]);

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
  }, [filteredProjects]);

  // Manage body scroll locking and Escape key for active video modal
  useEffect(() => {
    if (activeVideoProject) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setActiveVideoProject(null);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeVideoProject]);

  return (
    <section id="works" className="relative pt-5 sm:pt-20 pb-6 sm:pb-32 px-3.5 sm:px-6 md:px-12 bg-[#050810]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A3FF12]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-4 sm:mb-16 space-y-1 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#A3FF12]/10 border border-[#A3FF12]/20 text-[#A3FF12] text-[9px] sm:text-xs font-bold uppercase tracking-widest scroll-reveal">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Verified Client Work</span>
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-5xl md:text-7xl font-['Montserrat'] font-extrabold text-white scroll-reveal [transition-delay:0.1s] leading-tight">
            Selected <span className="text-gradient-lime">Projects</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-[11px] sm:text-base font-['Inter'] scroll-reveal [transition-delay:0.15s] px-1 sm:px-0 leading-relaxed">
            Explore high-impact motion reels, SaaS 3D animations, design systems, and performance marketing case studies featuring verified deliverable proofs.
          </p>
          <div className="w-10 sm:w-24 h-1 sm:h-1.5 bg-[#A3FF12] mx-auto rounded-full mt-1.5 sm:mt-4 scroll-reveal [transition-delay:0.2s]"></div>
        </div>

        {/* Filter Tabs - Native App horizontal pill scroll on mobile */}
        <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap justify-start sm:justify-center gap-1 sm:gap-3 mb-4 sm:mb-16 pb-0.5 sm:pb-0 px-0.5 -mx-0.5 scroll-reveal [transition-delay:0.25s]">
          {categories.map((cat) => {
            const count = cat.id === 'all' ? projects.length : projects.filter(p => p.tag === cat.id).length;
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-2.5 py-1 sm:px-6 sm:py-3 rounded-full text-[10px] sm:text-sm font-bold transition-all duration-300 border border-white/10 active:scale-95 cursor-pointer flex items-center gap-1 sm:gap-2 shrink-0 sm:shrink whitespace-nowrap ${
                  isActive 
                  ? 'bg-[#A3FF12] text-black shadow-[0_0_20px_rgba(163,255,18,0.4)] animate-pulse-lime' 
                  : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 hover:border-[#A3FF12]/30'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[7px] sm:text-[10px] px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded-full font-mono font-bold transition-colors ${
                  isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-white/70'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid - Showing only 9 projects on Home Page */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.slice(0, 9).map((project, idx) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={idx} 
                onNavigate={onNavigate}
                onPlayVideo={(p) => setActiveVideoProject(p)}
              />
            ))
          ) : (
            <div className="col-span-full py-16 text-center">
              <p className="text-white/40 italic">New projects coming soon...</p>
            </div>
          )}
        </div>

        {/* View Full Portfolio CTA */}
        <div className="mt-5 sm:mt-20 text-center scroll-reveal flex flex-col items-center gap-2 sm:gap-3">
          <button 
            onClick={() => onNavigate ? onNavigate('works') : (window.location.hash = '#works')}
            className="group relative px-5 sm:px-10 py-3 sm:py-5 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(163,255,18,0.3)] flex items-center gap-2 sm:gap-3 cursor-pointer"
          >
            <span className="relative z-10 font-bold text-black font-['Montserrat'] text-[11px] sm:text-base">
              View Full Portfolio & Case Studies
            </span>
            <ArrowRight className="relative z-10 w-3 h-3 sm:w-4 sm:h-4 text-black group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-[#A3FF12]"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
          <p className="text-white/50 text-[10px] sm:text-xs font-['Inter'] px-2">
            Showing top 9 curated projects on home page • Click above to explore all {projects.length}+ case studies in Portfolio.
          </p>
        </div>
      </div>

      {/* Embedded YouTube Video Player Modal */}
      {activeVideoProject && activeVideoProject.youtubeId && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200">
          <div className="bg-[#0B132B] border border-white/20 rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 md:p-8 relative shadow-2xl space-y-4 sm:space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A3FF12]">
                  {activeVideoProject.category} • {activeVideoProject.metric} {activeVideoProject.metricLabel}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-['Montserrat'] text-white mt-1">
                  {activeVideoProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideoProject(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Responsive 16:9 YouTube Player */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideoProject.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideoProject.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Modal Footer Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2">
                <a
                  href={activeVideoProject.videoUrl || `https://youtu.be/${activeVideoProject.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 transition-all"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => {
                    setActiveVideoProject(null);
                    if (onNavigate) onNavigate('works');
                  }}
                  className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/80 text-xs font-bold transition-all"
                >
                  View Case Study
                </button>
              </div>

              <button
                onClick={() => {
                  const category = activeVideoProject.category;
                  setActiveVideoProject(null);
                  if (onNavigate) onNavigate('contact', category);
                }}
                className="px-6 py-2.5 rounded-full bg-[#A3FF12] text-[#050810] font-bold text-xs hover:shadow-[0_0_20px_rgba(163,255,18,0.5)] transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
              >
                Inquire Motion Service
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
