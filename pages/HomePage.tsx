import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Projects from '../components/Projects';
import Pricing from '../components/Pricing';
import Workflow from '../components/Workflow';
import Team from '../components/Team';
import ReviewsAndContact from '../components/ReviewsAndContact';
import Marquee from '../components/Marquee';
import { ArrowRight, Sparkles, Layers, Briefcase, MessageSquare, Download } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string, prefillService?: string, sectionId?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  useEffect(() => {
    // Re-initialize intersection observers for animations on mount
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

    const revealElements = document.querySelectorAll(
      '.scroll-reveal, .workflow-reveal, .rev-reveal, .footer-reveal, .pricing-reveal, .team-reveal'
    );

    // Immediately mark visible any elements currently in viewport (or above fold)
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Hero onNavigate={onNavigate} />
      <Marquee />

      {/* Services Section with Quick Hub Link */}
      <div className="relative">
        <Services onNavigate={onNavigate} />
        <div className="container mx-auto px-3.5 sm:px-6 md:px-12 max-w-7xl mt-2 sm:-mt-12 mb-6 sm:mb-20 flex justify-center">
          <button
            onClick={() => onNavigate('services')}
            className="px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-white/5 hover:bg-[#00D2FF] text-white hover:text-[#0B132B] border border-white/10 font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 sm:gap-2.5 shadow-lg group hover:scale-105 hover:shadow-[0_0_25px_rgba(0,210,255,0.4)]"
          >
            <span>Explore All 6 Services & Deliverables</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* About & Why Choose Us Section with Quick Hub Link */}
      <div id="about" className="relative bg-[#050505]">
        <WhyChooseUs />
        <div className="container mx-auto px-3.5 sm:px-6 md:px-12 max-w-7xl pt-1 pb-4 sm:pb-12 flex justify-center">
          <button
            onClick={() => onNavigate('about')}
            className="px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-white/5 hover:bg-[#A3FF12] text-white hover:text-[#050810] border border-white/10 font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 sm:gap-2.5 shadow-lg group hover:scale-105 hover:shadow-[0_0_25px_rgba(163,255,18,0.4)] cursor-pointer"
          >
            <span>Read Agency Story & Core Standards</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Projects Section with Quick Hub Link */}
      <div className="relative">
        <Projects onNavigate={onNavigate} />
      </div>

      <Pricing onNavigate={onNavigate} />
      <Workflow />
      <Team />
      <ReviewsAndContact />

      {/* Free After Effects Toolkit Vault Spotlight */}
      <section className="py-6 sm:py-20 px-3.5 sm:px-6 md:px-12 bg-gradient-to-b from-[#050505] via-[#0B132B]/80 to-[#050505] relative border-y border-white/5 overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="p-4 sm:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#0F1B38]/90 via-[#16213E]/70 to-[#0B132B]/90 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-8">
            <div className="space-y-2.5 sm:space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#00D2FF]">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Free Community Resources · AE 2022–2026</span>
              </div>
              <h2 className="text-xl sm:text-4xl font-extrabold font-['Montserrat'] text-white">
                Download Our Free After Effects Plugins & Motion Vault
              </h2>
              <p className="text-xs sm:text-base text-white/70 font-['Inter'] leading-relaxed">
                We made our internal agency transition presets, 35mm film halation matrix, and kinetic typography scripts 100% free for video editors and creators. Direct access via Google Drive without any sign-up.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 text-[11px] sm:text-xs font-mono text-white/50">
                <span>6+ Curated Toolkits</span>
                <span aria-hidden="true">·</span>
                <span>No Email or Paywall</span>
                <span aria-hidden="true">·</span>
                <span>Commercial & Personal Use</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3.5 shrink-0 w-full sm:w-auto pt-1 sm:pt-0">
              <button
                type="button"
                onClick={() => onNavigate('free-tools')}
                className="w-full sm:w-auto px-5 py-3 sm:px-7 sm:py-4 rounded-xl bg-[#00D2FF] hover:bg-[#3A7BD5] text-[#0B132B] hover:text-white font-extrabold text-xs sm:text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,210,255,0.4)] transition-all cursor-pointer"
              >
                <span>Explore Free Tools Vault</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://drive.google.com/drive/folders/10jFL2wQ8h23v3PWrLNUMqVprxfx9fUQb?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 sm:px-5 sm:py-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00D2FF]" />
                <span>Direct Google Drive</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Page Destination Hub */}
      <section className="py-6 sm:py-20 px-3.5 sm:px-6 md:px-12 border-t border-white/5 bg-[#080E21]/60">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-4 sm:mb-12 space-y-1.5 sm:space-y-3">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#00D2FF]">EXPLORE QARVION</span>
            <h2 className="text-xl xs:text-3xl md:text-5xl font-extrabold font-['Montserrat'] text-white">
              Navigate All Agency Pages
            </h2>
            <p className="text-white/60 font-['Inter'] text-xs sm:text-base max-w-2xl mx-auto px-2">
              Jump directly to any section of our agency website for in-depth insights, case studies, and inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-5">
            <div
              onClick={() => onNavigate('about')}
              className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#00D2FF] hover:bg-white/[0.06] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between"
            >
              <div className="space-y-2.5 sm:space-y-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00D2FF]/10 text-[#00D2FF] flex items-center justify-center group-hover:bg-[#00D2FF] group-hover:text-[#0B132B] transition-colors">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-['Montserrat'] text-white">About Page</h3>
                <p className="text-xs text-white/60 font-['Inter'] leading-relaxed">
                  Our manifesto, comparison matrix against other agencies, and leadership profiles.
                </p>
              </div>
              <div className="pt-4 sm:pt-6 flex items-center gap-1 text-xs font-bold text-[#00D2FF]">
                <span>Open About Page</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onNavigate('services')}
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#3A7BD5] hover:bg-white/[0.06] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between"
            >
              <div className="space-y-2 sm:space-y-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#3A7BD5]/10 text-[#3A7BD5] flex items-center justify-center group-hover:bg-[#3A7BD5] group-hover:text-white transition-colors">
                  <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-['Montserrat'] text-white">Services Page</h3>
                <p className="text-xs text-white/60 font-['Inter'] leading-relaxed">
                  Deep dive on all 6 capabilities, deliverables breakdown, and package calculator.
                </p>
              </div>
              <div className="pt-3 sm:pt-6 flex items-center gap-1 text-xs font-bold text-[#3A7BD5]">
                <span>Open Services Page</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onNavigate('works')}
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#A3FF12] hover:bg-white/[0.06] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between"
            >
              <div className="space-y-2 sm:space-y-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#A3FF12]/10 text-[#A3FF12] flex items-center justify-center group-hover:bg-[#A3FF12] group-hover:text-[#050810] transition-colors">
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-['Montserrat'] text-white">Works Page</h3>
                <p className="text-xs text-white/60 font-['Inter'] leading-relaxed">
                  Interactive case studies, verified ROI metrics, client reviews, and category filters.
                </p>
              </div>
              <div className="pt-3 sm:pt-6 flex items-center gap-1 text-xs font-bold text-[#A3FF12]">
                <span>Open Works Page</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onNavigate('free-tools')}
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-[#00D2FF]/30 hover:border-[#00D2FF] hover:bg-white/[0.06] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between shadow-[0_0_20px_rgba(0,210,255,0.1)]"
            >
              <div className="space-y-2 sm:space-y-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00D2FF]/15 text-[#00D2FF] flex items-center justify-center group-hover:bg-[#00D2FF] group-hover:text-[#0B132B] transition-colors">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-['Montserrat'] text-white">Free Tools</h3>
                <p className="text-xs text-white/60 font-['Inter'] leading-relaxed">
                  Free After Effects plugins, transition suites, and direct Google Drive download vault.
                </p>
              </div>
              <div className="pt-3 sm:pt-6 flex items-center gap-1 text-xs font-bold text-[#00D2FF]">
                <span>Open Free Tools Vault</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onNavigate('contact')}
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white hover:bg-white/[0.06] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between"
            >
              <div className="space-y-2 sm:space-y-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#0B132B] transition-colors">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-['Montserrat'] text-white">Contact Page</h3>
                <p className="text-xs text-white/60 font-['Inter'] leading-relaxed">
                  Interactive project brief builder, budget selectors, and direct studio contacts.
                </p>
              </div>
              <div className="pt-3 sm:pt-6 flex items-center gap-1 text-xs font-bold text-white">
                <span>Open Contact Page</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
