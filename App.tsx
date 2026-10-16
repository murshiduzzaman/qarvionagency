
import React, { useState, useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import WorksPage from './pages/WorksPage';
import ContactPage from './pages/ContactPage';
import FreeToolsPage from './pages/FreeToolsPage';

const validPages = ['home', 'about', 'services', 'works', 'contact', 'free-tools'];
const knownServiceIds = ['brand-identity', 'web-uiux', 'social-marketing', 'performance-ads', 'motion-3d', 'print-packaging'];

const parseUrlHash = () => {
  const rawHash = window.location.hash.replace(/^#/, '').toLowerCase();
  if (!rawHash) return { page: 'home', sectionId: null, serviceId: null };

  let page = rawHash.split('#')[0].split('?')[0];
  let sectionId = rawHash.includes('#') ? rawHash.split('#')[1] : null;
  let serviceId: string | null = null;

  if (rawHash.includes('service=')) {
    const match = rawHash.match(/service=([^&]+)/);
    if (match) serviceId = match[1];
  }

  // Direct service id in hash (e.g., #motion-3d)
  if (knownServiceIds.includes(page)) {
    serviceId = page;
    sectionId = page;
    page = 'services';
  } else if (page === 'services' && sectionId) {
    serviceId = sectionId;
  }

  // Aliases support
  if (serviceId === 'motion' || serviceId === '3d') serviceId = 'motion-3d';
  if (serviceId === 'branding' || serviceId === 'identity') serviceId = 'brand-identity';
  if (serviceId === 'web' || serviceId === 'uiux' || serviceId === 'ux') serviceId = 'web-uiux';
  if (serviceId === 'social') serviceId = 'social-marketing';
  if (serviceId === 'ads' || serviceId === 'paid-ads') serviceId = 'performance-ads';
  if (serviceId === 'packaging' || serviceId === 'print') serviceId = 'print-packaging';

  // Common routing aliases
  if (page === 'free-tools' || page === 'plugins' || page === 'ae-plugins' || page === 'tools' || page === 'freetools') {
    page = 'free-tools';
  } else if (page === 'why-choose-us' || page === 'team' || page === 'about-us') {
    page = 'about';
  } else if (page === 'pricing') {
    page = 'home';
    sectionId = 'pricing';
  } else if (page === 'works' || page === 'work' || page === 'projects' || page === 'portfolio' || page === 'case-studies') {
    page = 'works';
  } else if (page === 'contact-us' || page === 'book' || page === 'hire') {
    page = 'contact';
  } else if (page === 'our-services') {
    page = 'services';
  } else if (!validPages.includes(page)) {
    page = 'home';
  }

  return { page, sectionId, serviceId };
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>(() => {
    return parseUrlHash().page;
  });

  const [activeServiceId, setActiveServiceId] = useState<string | null>(() => {
    return parseUrlHash().serviceId;
  });

  const [contactPrefill, setContactPrefill] = useState<string | undefined>(undefined);

  // Guarantee that when a visitor opens the website, it handles top scroll or anchor scroll
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      const parsed = parseUrlHash();
      // If landing on home or without an explicit section anchor, ensure top scroll position
      if (parsed.page === 'home' && !parsed.sectionId) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      } else if (parsed.sectionId && parsed.page === 'home') {
        setTimeout(() => {
          const el = document.getElementById(parsed.sectionId!);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 220);
      }
    }
  }, []);

  // Synchronize with browser hash changes for back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseUrlHash();

      if (parsed.page === 'pricing' || (parsed.page === 'home' && parsed.sectionId === 'pricing')) {
        setCurrentPage('home');
        setActiveServiceId(null);
        setTimeout(() => {
          const el = document.getElementById('pricing');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
        return;
      }

      if (validPages.includes(parsed.page)) {
        setCurrentPage(parsed.page);
        if (parsed.page === 'services') {
          setActiveServiceId(parsed.serviceId);
        } else {
          setActiveServiceId(null);
        }

        if (parsed.sectionId && parsed.page !== 'services') {
          setTimeout(() => {
            const el = document.getElementById(parsed.sectionId!);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 120);
        }
      } else {
        setCurrentPage('home');
        setActiveServiceId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update dynamic page title, meta description, keywords, canonical, and OpenGraph social cards for modern SEO
  useEffect(() => {
    const pageMetaMap: Record<string, { title: string; desc: string; keywords: string; canonical: string }> = {
      home: {
        title: "Qarvion | Global Brand Identity, Motion Graphics & Web Design Agency",
        desc: "Engineering iconic brand identities, viral motion graphics, UI/UX web development, and ROI-driven social growth founded by Murshiduzzaman. 170+ projects completed.",
        keywords: "Murshiduzzaman, Qarvion, digital agency, brand identity design, motion graphics agency, UI UX design, website development, social media marketing, logo design, packaging design, short form video editing, Reels video editing, SaaS 3D animation, performance marketing",
        canonical: "https://qarvion.com/"
      },
      about: {
        title: "About Qarvion & Founder Murshiduzzaman | Creative Leadership & Agency Story",
        desc: "Meet founder Murshiduzzaman and the creative directors behind Qarvion. 8+ years leading iconic brand identity, 3D motion graphics, and UI/UX engineering with 170+ global projects.",
        keywords: "Murshiduzzaman, Murshiduzzaman Sheikh, Murshiduzzaman founder, Murshiduzzaman creative director, Qarvion founder, brand strategist, creative agency leadership",
        canonical: "https://qarvion.com/#about"
      },
      services: {
        title: "Services & Deliverables | Brand Identity, Web, Reels, Packaging & 3D | Qarvion",
        desc: "Explore Qarvion's full scope of capabilities: Brand Identity & Strategy ($149), Web & UI/UX ($249), Reels & Video Editing ($119), 3D Product Mockups, and Paid Ads Growth.",
        keywords: "Qarvion services, brand strategy, logo design services, Reels video editing, UI UX web design, 3D product mockups, paid social performance ads, packaging design",
        canonical: "https://qarvion.com/#services"
      },
      works: {
        title: "Portfolio & Verified Case Studies | Motion, 3D & Brand Systems | Qarvion",
        desc: "Explore verified client case studies, live motion reels, 3D product renders, and measurable CAC reduction metrics achieved across 170+ completed projects.",
        keywords: "Qarvion portfolio, case studies, brand identity case study, 3D motion reel, UI UX design portfolio, e-commerce brand transformation",
        canonical: "https://qarvion.com/#works"
      },
      contact: {
        title: "Start Your Project Brief | Direct Studio Inquiries | Qarvion",
        desc: "Get in touch directly with founder Murshiduzzaman and Qarvion's creative directors for custom proposals, milestone timelines, and 24-hour turnaround.",
        keywords: "hire Qarvion, contact Murshiduzzaman, branding inquiry, web design agency quote, video editing retainer, book creative consultation",
        canonical: "https://qarvion.com/#contact"
      },
      'free-tools': {
        title: "Free After Effects Plugins & Motion Presets | Qarvion Creative Vault",
        desc: "Download free production-grade After Effects plugins, kinetic typography scripts, and transition presets curated by Qarvion motion studio.",
        keywords: "free After Effects plugins, AE scripts, motion graphics presets, kinetic text animator, smooth easing preset, glitch FX script",
        canonical: "https://qarvion.com/#free-tools"
      }
    };

    const serviceMetaMap: Record<string, { title: string; desc: string; keywords: string; canonical: string }> = {
      'brand-identity': {
        title: "Brand Identity Design & Strategy Services ($149) | Qarvion Creative Agency",
        desc: "Transform your company with iconic vector logomarks, typography tokens, complete visual systems, and comprehensive 30+ page brand guideline books.",
        keywords: "brand identity design, corporate identity system, vector logo mark, visual brand guidelines, WCAG color system, brand strategy agency",
        canonical: "https://qarvion.com/#services#brand-identity"
      },
      'web-uiux': {
        title: "Web & UI/UX Product Design & Development ($249) | Qarvion Digital Studio",
        desc: "Bespoke high-converting website design, responsive Figma prototypes, atomic design systems, and modern frontend web applications with fast loading.",
        keywords: "UI UX web design, Figma design system, SaaS web application, responsive website development, conversion rate optimization",
        canonical: "https://qarvion.com/#services#web-uiux"
      },
      'social-marketing': {
        title: "Social Media Growth & Marketing Strategy ($89) | Qarvion Agency",
        desc: "Drive organic reach and conversions with branded content calendars, viral carousel decks, community engagement, and growth strategies.",
        keywords: "social media growth, carousel design, Instagram content strategy, LinkedIn company branding, organic engagement growth",
        canonical: "https://qarvion.com/#services#social-marketing"
      },
      'performance-ads': {
        title: "Paid Performance Ads & Direct-Response Creatives ($279) | Qarvion",
        desc: "Scale acquisition with high-converting Meta, Google, and TikTok ad creatives, split-tested hooks, and data-backed funnel optimization.",
        keywords: "paid social ads, Meta performance ads, TikTok ad creatives, direct response video ads, ROAS optimization, acquisition marketing",
        canonical: "https://qarvion.com/#services#performance-ads"
      },
      'motion-3d': {
        title: "Social Media Reels Editing ($119) & 3D Motion Graphics | Qarvion Studio",
        desc: "Viral Hormozi-style short-form video editing, kinetic typography, retention sound design, and 3D product animation for TikTok, IG Reels, and YouTube Shorts.",
        keywords: "Reels video editing, TikTok video editor, short form video editing, Hormozi style captions, 3D product animation, motion graphics studio",
        canonical: "https://qarvion.com/#services#motion-3d"
      },
      'print-packaging': {
        title: "Packaging Design & Corporate Print Collateral ($179) | Qarvion Agency",
        desc: "Tactile retail packaging dielines, 3D product renders, luxury unboxing experiences, corporate stationery, and print collateral.",
        keywords: "packaging design, retail box dieline, label design, luxury unboxing packaging, 3D product packaging mockup, print design agency",
        canonical: "https://qarvion.com/#services#print-packaging"
      }
    };

    let currentMeta = pageMetaMap[currentPage] || pageMetaMap.home;
    if (currentPage === 'services' && activeServiceId && serviceMetaMap[activeServiceId]) {
      currentMeta = serviceMetaMap[activeServiceId];
    }

    document.title = currentMeta.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', currentMeta.desc);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && currentMeta.keywords) {
      metaKeywords.setAttribute('content', currentMeta.keywords);
    }

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl && currentMeta.canonical) {
      canonicalEl.setAttribute('href', currentMeta.canonical);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', currentMeta.title);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', currentMeta.desc);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl && currentMeta.canonical) {
      ogUrl.setAttribute('content', currentMeta.canonical);
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', currentMeta.title);
    }

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) {
      twitterDesc.setAttribute('content', currentMeta.desc);
    }
  }, [currentPage, activeServiceId]);

  const navigateTo = (page: string, prefillService?: string, sectionId?: string) => {
    if (page === 'pricing') {
      setCurrentPage('home');
      setActiveServiceId(null);
      window.location.hash = 'pricing';
      setTimeout(() => {
        const el = document.getElementById('pricing');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const targetPage = validPages.includes(page) ? page : 'home';
    setCurrentPage(targetPage);
    if (prefillService) {
      setContactPrefill(prefillService);
    }

    if (targetPage === 'services') {
      const svcId = sectionId || (prefillService && knownServiceIds.includes(prefillService.toLowerCase()) ? prefillService.toLowerCase() : null);
      setActiveServiceId(svcId);
      window.location.hash = svcId ? `services#${svcId}` : 'services';
      if (!svcId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (sectionId) {
      setActiveServiceId(null);
      window.location.hash = `${targetPage}#${sectionId}`;
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      setActiveServiceId(null);
      window.location.hash = targetPage === 'home' ? '' : targetPage;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-['Inter'] relative text-white selection:bg-[#00D2FF] selection:text-[#0B132B]">
      <Header currentPage={currentPage} onNavigate={navigateTo} />
      
      <main className="min-h-[80vh]">
        {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
        {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}
        {currentPage === 'services' && (
          <ServicesPage 
            onNavigate={navigateTo} 
            activeServiceId={activeServiceId}
            onClearActiveService={() => setActiveServiceId(null)}
          />
        )}
        {currentPage === 'works' && <WorksPage onNavigate={navigateTo} />}
        {currentPage === 'free-tools' && <FreeToolsPage onNavigate={navigateTo} />}
        {currentPage === 'contact' && (
          <ContactPage initialService={contactPrefill} onNavigate={navigateTo} />
        )}
      </main>

      <Footer onNavigate={navigateTo} />
      <BackToTop />
      <SpeedInsights />
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        {/* Main Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B132B] via-[#1C2541] to-[#3A506B]"></div>
        
        {/* Radial Glow at bottom center - with pulse animation */}
        <div className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[140%] h-[600px] bg-[#00D2FF]/15 blur-[160px] rounded-full animate-glow-pulse"></div>
        
        {/* Animated Floating Shapes */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] border border-white/5 rounded-full animate-float opacity-30 blur-[2px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] border border-[#00D2FF]/10 rounded-full animate-float opacity-20 blur-[1px] [animation-delay:-5s]"></div>
        
        {/* Mesh Overlay */}
        <div className="absolute inset-0 bg-mesh opacity-40"></div>
        
        {/* Subtle Noise Texture Simulation via CSS */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
      </div>
    </div>
  );
};

export default App;
