
import React, { useEffect, useState } from 'react';
import Logo, { LogoIcon } from './Logo';

interface OverlayContent {
  title: string;
  body: React.ReactNode;
}

interface FooterProps {
  onNavigate?: (page: string, prefillService?: string, sectionId?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [overlay, setOverlay] = useState<OverlayContent | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const footerElement = document.querySelector('footer');
      if (footerElement) {
        const rect = footerElement.getBoundingClientRect();
        const footerHeight = rect.height;
        const viewportHeight = window.innerHeight;
        const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / footerHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks: { name: string; icon: React.ReactNode; url: string }[] = [
    { 
      name: 'Facebook', 
      url: 'https://www.facebook.com/Qarvion',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    { 
      name: 'X', 
      url: 'https://x.com/Qarvion',
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
        </svg>
      )
    },
    { 
      name: 'Pinterest', 
      url: 'https://www.pinterest.com/murshiduzzamanDm/',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
        </svg>
      )
    },
    { 
      name: 'Behance', 
      url: 'https://www.behance.net/murshiduzzaman',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.171 3-3.455 0-5.555-2.261-5.555-5.538 0-3.347 2.179-5.462 5.372-5.462 3.327 0 4.962 2.172 4.962 5.093 0 .426-.041.85-.097 1.207h-7.669c.105 1.547 1.144 2.454 2.778 2.454 1.357 0 2.227-.611 2.656-1.354l2.774.6zm-7.954-4.5h4.922c-.068-1.246-.948-2.025-2.385-2.025-1.458 0-2.392.793-2.537 2.025zm-9.772 7.5h-6v-16h6.721c3.084 0 5.279 1.487 5.279 4.417 0 1.761-1.062 3.111-2.483 3.691 1.736.574 2.762 2.183 2.762 4.148 0 3.344-2.544 3.744-6.279 3.744zm-3.455-6.553h2.895c1.47 0 2.56-.514 2.56-1.921 0-1.341-1.01-1.879-2.56-1.879h-2.895v3.8zm0-5.747h2.641c1.373 0 2.29-.441 2.29-1.688 0-1.229-.861-1.679-2.29-1.679h-2.641v3.367z"/>
        </svg>
      )
    }
  ];

  const services = [
    { name: "Brand Identity & Strategy", id: "brand-identity", page: "services" },
    { name: "Motion Graphics & 3D", id: "motion-3d", page: "services" },
    { name: "Web & Digital Product Design", id: "web-uiux", page: "services" },
    { name: "UI/UX & Product Design", id: "web-uiux", page: "services" },
    { name: "Social Media Strategy", id: "social-marketing", page: "services" },
    { name: "Paid Ads & Performance", id: "performance-ads", page: "services" },
    { name: "Packaging & Corporate Assets", id: "print-packaging", page: "services" }
  ];

  const quickLinks = [
    { name: "Home", page: "home", type: 'nav' },
    { name: "About Us", page: "about", type: 'nav' },
    { name: "Our Services", page: "services", type: 'nav' },
    { name: "Our Work", page: "works", type: 'nav' },
    { name: "Free AE Plugins & Tools", page: "free-tools", type: 'nav' },
    { name: "Contact Us", page: "contact", type: 'nav' },
    { name: "Careers", id: "careers", type: 'page' },
    { name: "FAQ", id: "faq", type: 'page' }
  ];

  const handleLinkClick = (e: React.MouseEvent, page: string, prefill?: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page, prefill);
    }
  };

  const handleServiceClick = (e: React.MouseEvent, serviceId: string, serviceTitle: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('services', serviceTitle, serviceId);
    }
  };

  const openPage = (id: string) => {
    const pages: Record<string, OverlayContent> = {
      careers: {
        title: "Join the Qarvion Team",
        body: (
          <div className="space-y-6 text-white/70">
            <p>We're always looking for talented designers, strategists, and performance marketers to join our mission of scaling brands globally.</p>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-white font-bold">Creative Lead</h4>
                <p className="text-sm">Remote • Full-time</p>
                <p className="text-xs text-blue-400 mt-1">Apply Now →</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-white font-bold">Social Media Strategist</h4>
                <p className="text-sm">Dhaka, Bangladesh • Hybrid / Remote</p>
                <p className="text-xs text-blue-400 mt-1">Apply Now →</p>
              </div>
            </div>
            <p className="text-sm">Send your portfolio or CV to our <span className="text-blue-400 font-bold">Creative Talent Desk</span></p>
          </div>
        )
      },
      faq: {
        title: "Frequently Asked Questions",
        body: (
          <div className="space-y-8 text-white/70">
            <div>
              <h4 className="text-white font-bold mb-2">How long does a branding project take?</h4>
              <p className="text-sm leading-relaxed">Typically 2-4 weeks depending on the scope of work and refinement rounds. We prioritize both quality and speed.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Do you provide ongoing social media management?</h4>
              <p className="text-sm leading-relaxed">Yes, we offer monthly retainer packages for content creation, community management, and paid ad optimization.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">What industries do you specialize in?</h4>
              <p className="text-sm leading-relaxed">We work extensively with Tech startups, E-commerce brands, Luxury fashion, and High-growth digital businesses.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Do I get the source files?</h4>
              <p className="text-sm leading-relaxed">Absolutely. Upon final payment, you receive full ownership and all high-resolution source files (AI, PSD, Figma, etc.).</p>
            </div>
          </div>
        )
      },
      terms: {
        title: "Terms & Conditions",
        body: (
          <div className="space-y-4 text-white/60 text-sm leading-relaxed">
            <p>1. <strong className="text-white">Service Agreement:</strong> By hiring Qarvion, you agree to our project workflow and communication standards.</p>
            <p>2. <strong className="text-white">Intellectual Property:</strong> Clients receive full copyright ownership of final designs upon completion and final payment.</p>
            <p>3. <strong className="text-white">Revision Policy:</strong> Each project includes a set number of revision rounds as defined in your specific package.</p>
            <p>4. <strong className="text-white">Payment Terms:</strong> Projects require a 50% non-refundable retainer to begin work, with the balance due upon completion.</p>
          </div>
        )
      },
      privacy: {
        title: "Privacy Policy",
        body: (
          <div className="space-y-4 text-white/60 text-sm leading-relaxed">
            <p>Your privacy is paramount to us. Qarvion collects basic contact information solely for the purpose of project coordination and business communication.</p>
            <p>We do not sell, trade, or share your personal data with third parties. Any assets or internal information shared during a project are protected under our standard NDA guidelines.</p>
            <p>Cookies used on our site are strictly for performance monitoring and improving your browsing experience.</p>
          </div>
        )
      }
    };

    if (pages[id]) {
      setOverlay(pages[id]);
      document.body.style.overflow = 'hidden';
    }
  };

  useEffect(() => {
    if (overlay) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeOverlay();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [overlay]);

  const closeOverlay = () => {
    setOverlay(null);
    document.body.style.overflow = '';
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#050810] to-black pt-8 sm:pt-32 pb-0 px-3.5 sm:px-6 md:px-12 overflow-hidden border-t border-white/5">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[120%] h-[500px] bg-gradient-to-t from-blue-500/20 to-transparent blur-[120px] rounded-full opacity-40"></div>
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full animate-float-slow"></div>
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-16 lg:gap-8 mb-6 sm:mb-24">
          
          {/* Column 1: Brand */}
          <div className="space-y-3.5 sm:space-y-8 footer-reveal visible">
            <div className="flex items-center">
              <Logo size={36} textClassName="text-xl sm:text-3xl font-extrabold tracking-tight" />
            </div>
            <p className="text-white/40 leading-relaxed font-['Inter'] text-xs sm:text-sm max-w-xs">
              We build powerful digital brands through strategy, design, motion, and high-performing social media marketing that drives real growth.
            </p>
            <div className="flex flex-wrap gap-2.5 sm:gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name} 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/50 hover:text-[#00D2FF] hover:border-[#00D2FF]/50 hover:bg-[#00D2FF]/5 hover:scale-110 transition-all duration-400 group relative overflow-hidden"
                  aria-label={social.name}
                >
                  <span className="relative z-10 flex items-center justify-center">{social.icon}</span>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="footer-reveal visible [transition-delay:0.1s]">
            <h4 className="text-white font-bold font-['Montserrat'] mb-2.5 sm:mb-10 uppercase tracking-[0.3em] text-[10px]">SERVICES</h4>
            <ul className="space-y-2 sm:space-y-5">
              {services.map((item) => (
                <li key={item.name}>
                  <a 
                    href={`#services#${item.id}`}
                    onClick={(e) => handleServiceClick(e, item.id, item.name)} 
                    className="text-white/40 hover:text-[#00D2FF] transition-all text-sm font-['Inter'] relative group inline-block text-left cursor-pointer"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00D2FF] transition-all duration-500 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="footer-reveal visible [transition-delay:0.2s]">
            <h4 className="text-white font-bold font-['Montserrat'] mb-2.5 sm:mb-10 uppercase tracking-[0.3em] text-[10px]">QUICK LINKS</h4>
            <ul className="space-y-2 sm:space-y-5">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  {item.type === 'nav' ? (
                    <button 
                      onClick={(e) => handleLinkClick(e, item.page!)} 
                      className="text-white/40 hover:text-[#00D2FF] transition-all text-xs sm:text-sm font-['Inter'] relative group inline-block text-left cursor-pointer"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00D2FF] transition-all duration-500 group-hover:w-full"></span>
                    </button>
                  ) : (
                    <button 
                      onClick={() => openPage(item.id!)}
                      className="text-white/40 hover:text-[#00D2FF] transition-all text-xs sm:text-sm font-['Inter'] relative group inline-block text-left cursor-pointer"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00D2FF] transition-all duration-500 group-hover:w-full"></span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-reveal visible [transition-delay:0.3s]">
            <h4 className="text-white font-bold font-['Montserrat'] mb-2.5 sm:mb-10 uppercase tracking-[0.3em] text-[10px]">CONTACT</h4>
            <div className="space-y-3 sm:space-y-8">
              <div>
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-1 sm:mb-2">Agency Email</span>
                <a href="mailto:qarviontech@gmail.com" className="text-white/70 hover:text-[#00D2FF] text-sm sm:text-base font-['Montserrat'] font-bold transition-all group block">
                  Official Studio Mailbox
                  <span className="block h-[1px] w-10 sm:w-12 bg-[#00D2FF] mt-1.5 sm:mt-2 group-hover:w-24 transition-all"></span>
                </a>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">WhatsApp & Phone</span>
                <a 
                  href="https://wa.me/8801725129901" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/70 font-semibold text-xs sm:text-sm font-['Inter'] block hover:text-emerald-400 transition-colors"
                >
                  +880 1725-129901
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Footer Bar */}
        <div className="relative pt-5 sm:pt-12 pb-6 sm:pb-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-8 text-center md:text-left">
          <button 
            onClick={() => openPage('terms')}
            className="text-white/20 hover:text-white text-[10px] transition-colors uppercase tracking-widest font-bold cursor-pointer"
          >
            Terms & Conditions
          </button>
          <p className="text-white/30 text-[10px] font-['Montserrat'] font-medium uppercase tracking-[0.2em]">
            © 2026 QARVION. All rights reserved.
          </p>
          <button 
            onClick={() => openPage('privacy')}
            className="text-white/20 hover:text-white text-[10px] transition-colors uppercase tracking-widest font-bold cursor-pointer"
          >
            Privacy Policy
          </button>
        </div>
      </div>

      {/* Page Overlay / Modal Simulation */}
      {overlay && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-2xl animate-fade-in" 
            onClick={closeOverlay}
          ></div>
          <div className="relative w-full max-w-2xl bg-[#0B1224] border border-white/10 rounded-[24px] sm:rounded-[40px] p-6 sm:p-8 md:p-12 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent"></div>
            <button 
              className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white/40 hover:text-white transition-colors p-2 cursor-pointer"
              onClick={closeOverlay}
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-['Montserrat'] font-bold text-white mb-6 sm:mb-8 pr-10 sm:pr-12">{overlay.title}</h3>
            <div className="max-h-[60vh] overflow-y-auto pr-2 sm:pr-4 scrollbar-thin scrollbar-thumb-white/10">
              <div className="font-['Inter']">{overlay.body}</div>
            </div>
            <div className="mt-8 sm:mt-12 flex justify-center">
              <button 
                className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#00D2FF] text-[#0B1224] font-bold text-sm sm:text-base transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,210,255,0.3)] cursor-pointer"
                onClick={closeOverlay}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MASSIVE BACKGROUND LOGO SECTION */}
      <div className="relative w-full overflow-hidden select-none pointer-events-none pb-8 sm:pb-20">
        <div className="absolute inset-0 z-20 flex flex-col justify-around py-6 sm:py-10 opacity-30">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent backdrop-blur-sm"></div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent backdrop-blur-sm"></div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent backdrop-blur-sm"></div>
        </div>

        <div 
          className="text-[13vw] sm:text-[18vw] md:text-[22vw] font-['Montserrat'] font-extrabold text-white/[0.04] leading-none text-center tracking-tighter whitespace-nowrap transition-transform duration-[1.5s] ease-out flex justify-center items-center gap-3 sm:gap-6 md:gap-12"
          style={{ 
            transform: `translateX(${(scrollProgress - 0.5) * -150}px)`,
            filter: `blur(${Math.max(0, 5 - scrollProgress * 10)}px)`
          }}
        >
          <div className="opacity-20 scale-90 md:scale-100 flex items-center">
            <LogoIcon size={120} className="w-[9vw] h-[9vw] sm:w-[12vw] sm:h-[12vw] max-w-[160px] max-h-[160px]" />
          </div>
          <span>QARVION</span>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-30"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-[#00D2FF]/5 to-transparent animate-shine-slow"></div>
      </div>
    </footer>
  );
};

export default Footer;
