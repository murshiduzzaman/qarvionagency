import React, { useEffect, useRef, useState, useMemo } from 'react';
import { LogoIcon } from './Logo';
import { Play, Pause } from 'lucide-react';
import { heroConfig, parseHeroVideoUrl, VideoSourceDetails } from '../src/data/heroConfig';

interface HeroProps {
  onNavigate?: (page: string) => void;
  customVideoUrl?: string;
  customPosterUrl?: string;
}

const Hero: React.FC<HeroProps> = ({ onNavigate, customVideoUrl, customPosterUrl }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Directly play the hero reel video
  const activeUrl = customVideoUrl || heroConfig.videoUrl;

  // Clear any previous test overrides from localStorage so file changes take effect immediately
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('qarvion_hero_video_url');
    }
  }, []);

  // Parsed video details (Direct local MP4, YouTube, Vimeo, or Drive)
  const sourceInfo: VideoSourceDetails = useMemo(() => {
    return parseHeroVideoUrl(activeUrl);
  }, [activeUrl]);

  const posterUrl = customPosterUrl || heroConfig.posterUrl;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05 }
    );

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Ambient video pause/play toggle
  const togglePlay = () => {
    if (sourceInfo.type === 'direct') {
      if (!videoRef.current) return;
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Autoplay guarantee for background video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const playVideo = () => {
      setIsVideoLoaded(true);
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Browser policy fallback: still muted
            video.muted = true;
            video.play().catch(() => {});
          });
      }
    };

    video.addEventListener('loadeddata', playVideo);
    video.addEventListener('canplay', playVideo);

    if (video.readyState >= 2) {
      playVideo();
    }

    return () => {
      video.removeEventListener('loadeddata', playVideo);
      video.removeEventListener('canplay', playVideo);
    };
  }, [sourceInfo.rawUrl]);

  return (
    <section 
      id="home"
      ref={heroRef}
      className="relative min-h-[75vh] xs:min-h-[80vh] sm:min-h-screen flex flex-col items-center justify-center text-center px-3.5 sm:px-6 pt-16 sm:pt-32 pb-5 sm:pb-24 overflow-hidden bg-[#050505]"
    >
      {/* ========================================================= */}
      {/* CINEMATIC VIDEO BACKGROUND LAYER                          */}
      {/* Always plays public/videos/hero-reel.mp4                  */}
      {/* ========================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        
        {/* State A: Paused on iframe stream -> display high quality poster */}
        {!isPlaying && (sourceInfo.type === 'youtube' || sourceInfo.type === 'vimeo' || sourceInfo.type === 'drive') ? (
          <img
            src={posterUrl}
            alt="Hero Reel Poster"
            className="w-full h-full object-cover object-center scale-105 opacity-80 transition-opacity duration-700"
          />
        ) : sourceInfo.type === 'youtube' || sourceInfo.type === 'vimeo' || sourceInfo.type === 'drive' ? (
          /* State B: YouTube, Vimeo, or Google Drive Ambient Stream */
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
            <iframe
              key={sourceInfo.embedUrl}
              src={sourceInfo.embedUrl}
              title="Ambient Hero Video Reel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full pointer-events-none scale-125 sm:scale-110 object-cover transition-opacity duration-1000 opacity-85"
              style={{ border: 0 }}
            />
          </div>
        ) : (
          /* State C: Direct Local Reel with hardware-accelerated playback */
          <video
            ref={videoRef}
            src={sourceInfo.rawUrl || '/videos/hero-reel.mp4'}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={posterUrl}
            onLoadedData={() => setIsVideoLoaded(true)}
            className="w-full h-full object-cover object-center scale-100 opacity-100"
          >
            <source src={sourceInfo.rawUrl || '/videos/hero-reel.mp4'} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Floating Orb Accent */}
      <div className="absolute top-24 right-6 sm:right-10 md:right-20 lg:right-32 w-14 h-14 sm:w-20 sm:h-20 md:w-[120px] md:h-[120px] border border-[#00D2FF]/30 rounded-full animate-orb pointer-events-none z-10 opacity-30 sm:opacity-75"></div>

      {/* ========================================================= */}
      {/* FOREGROUND HERO CONTENT (100% Clear view, no background pods) */}
      {/* ========================================================= */}
      <div className="relative z-10 max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto space-y-2 xs:space-y-2.5 sm:space-y-6 w-full">
        {/* Eyebrow Badge (Compact & refined for mobile) */}
        <div className="scroll-reveal flex justify-center [transition-delay:0.1s] mb-0 sm:mb-1">
          <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-[2px] sm:px-3.5 sm:py-1 rounded-full text-[7px] xs:text-[7.5px] sm:text-[11px] leading-tight font-medium bg-[#0B132B]/80 border border-white/10 backdrop-blur-md text-white/80 tracking-normal sm:tracking-wider uppercase shadow-xs sm:shadow-sm">
            <span className="relative flex h-1 w-1 sm:h-1.5 sm:w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D2FF] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-1 w-1 sm:h-1.5 sm:w-1.5 bg-[#00D2FF]"></span>
            </span>
            <LogoIcon size={12} className="hidden sm:inline-block sm:w-3 sm:h-3 opacity-70" />
            <span className="font-medium text-white/85">{heroConfig.projectsCount}</span>
            <span className="text-white/30 text-[5px] sm:text-[9px] leading-none">•</span>
            <span className="text-emerald-400 font-semibold">{heroConfig.badgeText}</span>
          </div>
        </div>

        {/* Headline (Bigger on PC version, mobile completely unchanged) */}
        <h1 className="scroll-reveal text-[30px] xs:text-[34px] sm:text-7xl md:text-8xl lg:text-[96px] xl:text-[108px] 2xl:text-[118px] font-['Montserrat'] font-extrabold leading-[1.08] sm:leading-[1.05] md:leading-[1.02] lg:leading-[1.0] [transition-delay:0.2s] tracking-tight max-w-[340px] xs:max-w-md sm:max-w-none mx-auto text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
          {heroConfig.headlineLead} <br className="hidden md:block" />
          <span className="text-gradient-brand">{heroConfig.headlineHighlight}</span> {heroConfig.headlineTail}
        </h1>

        {/* Subheadline (Smaller on mobile to take up less vertical space than the headline) */}
        <p className="scroll-reveal text-[10px] xs:text-[11px] sm:text-lg md:text-xl text-white/70 sm:text-white/90 font-['Inter'] leading-normal sm:leading-relaxed max-w-[280px] xs:max-w-[320px] sm:max-w-2xl mx-auto [transition-delay:0.3s] px-1 sm:px-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)] font-normal">
          {heroConfig.subheadline}
        </p>

        {/* Trust Rating Proof */}
        <div className="scroll-reveal flex justify-center [transition-delay:0.4s]">
          {/* Mobile Social Proof Pill */}
          <div className="sm:hidden flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0B132B]/85 border border-white/15 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
            <div className="flex -space-x-1 items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#00D2FF] to-[#3A7BD5] border border-[#0B132B] flex items-center justify-center text-[6px] font-bold text-[#0B132B]">Q</div>
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 border border-[#0B132B] flex items-center justify-center text-[6px] font-bold text-white">S</div>
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 border border-[#0B132B] flex items-center justify-center text-[6px] font-bold text-[#0B132B]">★</div>
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-2.5 h-2.5 text-[#00D2FF] fill-current drop-shadow-[0_0_6px_rgba(0,210,255,0.6)]" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="text-[9px] font-semibold text-white">
              <strong className="text-white font-bold">{heroConfig.ratingScore}/5</strong> ({heroConfig.clientsCount})
            </span>
          </div>

          {/* Desktop Rating */}
          <div className="hidden sm:flex flex-row items-center justify-center gap-2.5 px-5 py-2 rounded-full bg-[#0B132B]/75 border border-white/10 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.4)]">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-[#00D2FF] fill-current drop-shadow-[0_0_8px_rgba(0,210,255,0.7)]" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <p className="text-sm font-medium text-white/95">
              <span className="font-bold text-white">{heroConfig.ratingScore} Rating</span> based on {heroConfig.clientsCount}
            </p>
          </div>
        </div>

        {/* CTA Button Section */}
        <div className="scroll-reveal [transition-delay:0.5s] pt-0.5 sm:pt-0">
          {/* Mobile Actions */}
          <div className="sm:hidden flex flex-col w-full max-w-[215px] xs:max-w-[230px] mx-auto gap-1.5">
            <a 
              href="#contact" 
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('contact');
                }
              }}
              className="group relative w-full flex items-center justify-center px-3 py-2 bg-gradient-to-r from-[#00D2FF] to-[#3A7BD5] text-[#0B132B] text-[10.5px] xs:text-[11px] font-extrabold rounded-full shadow-[0_0_20px_rgba(0,210,255,0.4)] active:scale-95 transition-all whitespace-nowrap"
            >
              <span className="flex items-center gap-1.5">
                {heroConfig.primaryCtaText}
                <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>

            <a
              href="#projects"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('works');
                }
              }}
              className="w-full flex items-center justify-center px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white text-[10.5px] xs:text-[11px] font-bold rounded-full border border-white/20 backdrop-blur-md active:scale-95 transition-all whitespace-nowrap"
            >
              <span>{heroConfig.secondaryCtaText}</span>
            </a>

            <div className="flex items-center justify-center gap-1.5 text-[8.5px] text-white/60 pt-0.5 whitespace-nowrap">
              <span>✓ 24h Turnaround</span>
              <span>•</span>
              <span>✓ Free Consultation</span>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden sm:flex items-center justify-center gap-4">
            <a 
              href="#contact" 
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('contact');
                }
              }}
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00D2FF] to-[#3A7BD5] text-[#0B132B] text-base font-extrabold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(0,210,255,0.6)] border border-[#00D2FF]/40 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(0,210,255,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                {heroConfig.primaryCtaText}
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>

            <a
              href="#projects"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('works');
                }
              }}
              className="inline-flex items-center px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white text-base font-bold border border-white/20 backdrop-blur-md hover:border-white/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{heroConfig.secondaryCtaText}</span>
            </a>
          </div>
        </div>

        {/* Mobile Agency Trust Metrics */}
        <div className="sm:hidden grid grid-cols-3 gap-1.5 w-full max-w-[270px] mx-auto pt-0.5">
          <div className="p-1.5 rounded-lg bg-[#0B132B]/85 border border-white/10 backdrop-blur-md text-center">
            <div className="text-xs font-extrabold font-['Montserrat'] text-white">170+</div>
            <div className="text-[8px] text-white/70 font-medium leading-tight">Projects</div>
          </div>
          <div className="p-1.5 rounded-lg bg-[#0B132B]/85 border border-white/10 backdrop-blur-md text-center">
            <div className="text-xs font-extrabold font-['Montserrat'] text-[#00D2FF]">99%</div>
            <div className="text-[8px] text-white/70 font-medium leading-tight">Satisfaction</div>
          </div>
          <div className="p-1.5 rounded-lg bg-[#0B132B]/85 border border-white/10 backdrop-blur-md text-center">
            <div className="text-xs font-extrabold font-['Montserrat'] text-emerald-400">24h</div>
            <div className="text-[8px] text-white/70 font-medium leading-tight">Fast Kickoff</div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* FLOATING AMBIENT REEL CONTROLS (Pause/Play + Video Switcher) */}
      {/* ========================================================= */}
      {heroConfig.enableAmbientControls && (
        <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 z-20 flex items-center gap-2">
          
          {/* Play/Pause Ambient Toggle */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause background video reel' : 'Play background video reel'}
            className="group flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#0B132B]/80 hover:bg-[#0B132B] border border-white/15 hover:border-[#00D2FF]/50 backdrop-blur-lg text-white/80 hover:text-white transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer text-[11px] sm:text-xs font-medium"
          >
            {isPlaying ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <Pause className="w-3 h-3 text-[#00D2FF]" />
                <span className="hidden xs:inline text-white/70 group-hover:text-white">Pause Ambient</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-[#00D2FF]" />
                <span className="hidden xs:inline text-white/70 group-hover:text-white">Play Reel</span>
              </>
            )}
          </button>

        </div>
      )}

      {/* Hero Visual Accent Divider */}
      <div className="scroll-reveal absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[1px] bg-gradient-to-r from-transparent via-[#00D2FF]/30 to-transparent [transition-delay:0.8s]"></div>

    </section>
  );
};

export default Hero;