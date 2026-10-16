import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Logo from './Logo';
import { X, ArrowRight, Phone, Mail, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentPage?: string;
  onNavigate?: (page: string, prefillService?: string, sectionId?: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage = 'home', onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll cleanly without position:fixed jump on mobile
  useEffect(() => {
    if (isMenuOpen) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Home', id: 'home', href: '#home' },
    { name: 'Services', id: 'services', href: '#services' },
    { name: 'Work', id: 'works', href: '#works' },
    { name: 'Free Tools', id: 'free-tools', href: '#free-tools' },
    { name: 'Pricing', id: 'pricing', href: '#pricing' },
    { name: 'About', id: 'about', href: '#about' },
    { name: 'Contact', id: 'contact', href: '#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent, pageId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (onNavigate) {
      if (pageId === 'pricing') {
        onNavigate('home', undefined, 'pricing');
      } else {
        onNavigate(pageId);
      }
    } else {
      if (pageId === 'pricing') {
        window.location.hash = '#pricing';
      } else {
        window.location.hash = `#${pageId}`;
      }
    }
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-[60] transition-all duration-300 pointer-events-none"
      >
        {/* Background Bar */}
        <div 
          className={`absolute inset-0 transition-all duration-300 pointer-events-auto ${
            isScrolled 
              ? 'bg-[#0B132B]/95 backdrop-blur-xl shadow-xl border-b border-white/5' 
              : 'bg-transparent'
          }`} 
        />

        <div className={`container mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between relative z-10 pointer-events-auto transition-all duration-300 ${
          isScrolled ? 'py-3 sm:py-4' : 'py-4 sm:py-6'
        }`}>
          {/* Logo with Brand Name */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, 'home')}
            className="flex items-center gap-2.5 -ml-1 p-1 rounded-xl transition-all duration-300 hover:scale-105 focus:outline-none cursor-pointer group"
            aria-label="Qarvion Home"
          >
            <Logo 
              size={isScrolled ? 34 : 40} 
              showText={false}
              iconOnly={true}
            />
            <span className="font-['Montserrat'] font-extrabold text-lg sm:text-xl tracking-wider text-white group-hover:text-[#00D2FF] transition-colors">
              QARVION
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <a 
                  key={item.name} 
                  href={item.href} 
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`text-sm font-medium transition-all relative py-1 group ${
                    isActive ? 'text-[#00D2FF] font-semibold' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.name}
                  <span 
                    className={`absolute -bottom-1 left-0 h-[2px] bg-[#00D2FF] transition-all duration-300 ${
                      isActive ? 'w-full shadow-[0_0_10px_#00D2FF]' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-4 md:gap-6">
            <button 
              type="button"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="hidden md:block px-6 lg:px-7 py-2.5 lg:py-3 rounded-full bg-gradient-to-r from-[#1B2A49] to-[#0F3460] text-white text-xs lg:text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] border border-white/10 active:scale-95 text-center cursor-pointer"
            >
              Start Project
            </button>

            {/* Mobile Menu Toggle Button */}
            <button 
              type="button"
              onClick={toggleMenu}
              className="lg:hidden min-w-[44px] min-h-[44px] w-[44px] h-[44px] flex flex-col items-center justify-center gap-1.5 cursor-pointer rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 active:bg-white/25 transition-all touch-manipulation shadow-md select-none"
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isMenuOpen}
            >
              <span className={`w-5 h-0.5 bg-white transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-2 bg-[#00D2FF]' : ''}`}></span>
              <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : ''}`}></span>
              <span className={`w-5 h-0.5 bg-white transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-2 bg-[#00D2FF]' : ''}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - 100% Solid Opaque Background (Zero transparency) */}
      {mounted && createPortal(
        <div 
          className={`fixed inset-0 w-full h-full h-[100dvh] z-[99999] lg:hidden flex flex-col bg-[#070D1E] transition-all duration-300 ${
            isMenuOpen 
              ? 'opacity-100 pointer-events-auto visible' 
              : 'opacity-0 pointer-events-none invisible'
          }`}
          style={{ 
            backgroundColor: '#070D1E',
            overscrollBehavior: 'contain'
          }}
          aria-hidden={!isMenuOpen}
        >
          {/* Solid Opaque Background Panel covering full screen so nothing shows through */}
          <div 
            className="absolute inset-0 bg-[#070D1E] pointer-events-none"
            style={{ 
              backgroundColor: '#070D1E',
              background: 'linear-gradient(180deg, #070D1E 0%, #0B132B 55%, #050814 100%)'
            }}
          />

          {/* Ambient Lighting Orbs for Modern Depth */}
          <div className="absolute top-10 right-10 w-72 h-72 bg-[#00D2FF]/15 blur-[90px] rounded-full pointer-events-none" />
          <div className="absolute bottom-20 left-6 w-60 h-60 bg-[#A3FF12]/10 blur-[80px] rounded-full pointer-events-none" />

          {/* Menu Inner Content Container */}
          <div className="relative z-10 flex flex-col h-full max-h-[100dvh] overflow-y-auto overscroll-contain px-4 py-3.5 sm:px-8 sm:py-6">
            
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between pb-3 sm:pb-5 border-b border-white/10 shrink-0">
              <a 
                href="#home" 
                onClick={(e) => handleNavClick(e, 'home')}
                className="flex items-center gap-2.5 active:scale-95 transition-transform"
              >
                <Logo size={32} showText={false} iconOnly={true} />
                <div className="flex flex-col">
                  <span className="font-['Montserrat'] font-extrabold text-base sm:text-lg text-white tracking-wider">
                    QARVION
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-[#00D2FF] uppercase -mt-0.5">
                    DIGITAL AGENCY
                  </span>
                </div>
              </a>

              {/* Close Button with generous touch target */}
              <button 
                type="button"
                onClick={closeMenu}
                className="min-w-[40px] min-h-[40px] w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white active:scale-95 transition-all cursor-pointer shadow-md"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Navigation Links with High Contrast Solid Styling */}
            <nav className="flex flex-col py-3 sm:py-6 space-y-1.5 sm:space-y-2 flex-grow justify-center">
              {navItems.map((item, index) => {
                const isActive = currentPage === item.id;
                return (
                  <a 
                    key={item.name} 
                    href={item.href} 
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl transition-all duration-200 active:scale-98 ${
                      isActive 
                        ? 'bg-[#00D2FF]/20 border border-[#00D2FF]/50 text-[#00D2FF] font-bold shadow-[0_0_20px_rgba(0,210,255,0.25)]' 
                        : 'text-white/85 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3.5">
                      <span className={`text-[10px] sm:text-[11px] font-mono font-bold ${isActive ? 'text-[#00D2FF]' : 'text-white/40'}`}>
                        0{index + 1}
                      </span>
                      <span className="text-base sm:text-xl font-['Montserrat'] font-bold tracking-tight">
                        {item.name}
                      </span>
                    </div>
                    {isActive ? (
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#00D2FF] shadow-[0_0_10px_#00D2FF]"></span>
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-white/40" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Mobile Actions & Direct Contact Footer */}
            <div className="pt-3 pb-1 border-t border-white/10 flex flex-col gap-2 sm:gap-3 shrink-0">
              <button 
                type="button"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="w-full py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#00D2FF] to-[#3A7BD5] text-[#0B132B] font-extrabold text-xs sm:text-sm text-center active:scale-95 transition-all shadow-[0_0_25px_rgba(0,210,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Start Your Project</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://wa.me/8801725129901"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-xs text-center flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">WhatsApp Chat</span>
                </a>
                <a
                  href="mailto:qarviontech@gmail.com"
                  className="py-3 px-3 rounded-xl bg-white/10 border border-white/15 text-white/90 font-bold text-xs text-center flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Email Studio</span>
                </a>
              </div>

              {/* Social Channels in Mobile Menu */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <a 
                  href="https://www.facebook.com/Qarvion" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00D2FF] transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a 
                  href="https://x.com/Qarvion" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="X"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00D2FF] transition-all"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
                </a>
                <a 
                  href="https://www.pinterest.com/murshiduzzamanDm/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Pinterest"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-red-400 transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                </a>
                <a 
                  href="https://www.behance.net/murshiduzzaman" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Behance"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00D2FF] transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.171 3-3.455 0-5.555-2.261-5.555-5.538 0-3.347 2.179-5.462 5.372-5.462 3.327 0 4.962 2.172 4.962 5.093 0 .426-.041.85-.097 1.207h-7.669c.105 1.547 1.144 2.454 2.778 2.454 1.357 0 2.227-.611 2.656-1.354l2.774.6zm-7.954-4.5h4.922c-.068-1.246-.948-2.025-2.385-2.025-1.458 0-2.392.793-2.537 2.025zm-9.772 7.5h-6v-16h6.721c3.084 0 5.279 1.487 5.279 4.417 0 1.761-1.062 3.111-2.483 3.691 1.736.574 2.762 2.183 2.762 4.148 0 3.344-2.544 3.744-6.279 3.744zm-3.455-6.553h2.895c1.47 0 2.56-.514 2.56-1.921 0-1.341-1.01-1.879-2.56-1.879h-2.895v3.8zm0-5.747h2.641c1.373 0 2.29-.441 2.29-1.688 0-1.229-.861-1.679-2.29-1.679h-2.641v3.367z"/></svg>
                </a>
              </div>

              <p className="text-center text-[10px] text-white/40 pt-1">
                Dhaka, Bangladesh • 170+ Global Client Projects
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Header;
