import React, { useState, useEffect } from 'react';
import { LogoIcon } from '../components/Logo';
import brandIdentityProof from '../src/assets/images/brand_identity_proof_1788945110423.jpg';
import uiuxDesignProof from '../src/assets/images/uiux_design_proof_1788945136312.jpg';
import socialCampaignProof from '../src/assets/images/social_campaign_proof_1788945151464.jpg';
import packagingMotionProof from '../src/assets/images/packaging_motion_proof_1788945174897.jpg';
import { 
  Sparkles, 
  Layers, 
  Palette, 
  TrendingUp, 
  Monitor, 
  Box, 
  ArrowRight, 
  ArrowUpRight, 
  Check, 
  Clock, 
  FileText, 
  ChevronDown, 
  HelpCircle,
  Zap,
  PhoneCall,
  Play,
  Film,
  X,
  ExternalLink,
  Image as ImageIcon,
  Filter,
  Link2,
  Share2,
  ShieldCheck,
  CheckCheck,
  ChevronRight,
  Sparkle
} from 'lucide-react';
import { projects as allProjects, ProjectDetail } from '../src/data/projectsData';

interface ServicesPageProps {
  onNavigate: (page: string, prefillService?: string, sectionId?: string) => void;
  activeServiceId?: string | null;
  onClearActiveService?: () => void;
}

interface ServiceProofItem {
  title: string;
  tag: string;
  image: string;
}

interface DetailedService {
  id: string;
  title: string;
  tagline: string;
  icon: React.ElementType;
  accent: string;
  proofImages: ServiceProofItem[];
  deliverables: string[];
  timeline: string;
  idealFor: string;
}

const detailedServices: DetailedService[] = [
  {
    id: "brand-identity",
    title: "Brand Identity & Strategy",
    tagline: "Unmistakable visual recognition that commands higher pricing.",
    icon: Palette,
    accent: "#00D2FF",
    proofImages: [
      {
        title: "Brand Guidelines & System",
        tag: "Guidelines Book",
        image: brandIdentityProof
      },
      {
        title: "Responsive Logomarks Suite",
        tag: "Vector Suite",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop"
      },
      {
        title: "Executive Stationery & Print",
        tag: "Luxury Collateral",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    deliverables: [
      "Primary & secondary logomark suite (Vector, SVG, PNG)",
      "Bespoke brand typography & font hierarchy",
      "Signature brand color palette & WCAG accessibility tokens",
      "Comprehensive 30+ page Brand Guidelines PDF",
      "Brand messaging, voice & positioning framework"
    ],
    timeline: "2 - 3 Weeks",
    idealFor: "Startups launching or established companies rebranding."
  },
  {
    id: "web-uiux",
    title: "Web & Digital Product Design",
    tagline: "Bespoke digital experiences that convert passive visitors into buyers.",
    icon: Monitor,
    accent: "#3A7BD5",
    proofImages: [
      {
        title: "SaaS Analytics Dashboard UI",
        tag: "Dashboard Platform",
        image: uiuxDesignProof
      },
      {
        title: "FinTech Mobile UX Flow",
        tag: "Mobile App UX",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
      },
      {
        title: "Design System Component Tokens",
        tag: "Atomic UI Kit",
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    deliverables: [
      "High-fidelity responsive UI/UX prototypes in Figma",
      "Custom responsive design system & component library",
      "Conversion-optimized landing pages & funnels",
      "Micro-interactions & fluid motion specifications",
      "Production-ready developer handoff & asset exports"
    ],
    timeline: "3 - 5 Weeks",
    idealFor: "SaaS products, e-commerce brands, and agency portfolios."
  },
  {
    id: "social-marketing",
    title: "Social Media Strategy & Creatives",
    tagline: "Scroll-stopping static & motion creatives that build devoted audiences.",
    icon: TrendingUp,
    accent: "#A3FF12",
    proofImages: [
      {
        title: "Omnichannel Viral Social Reels",
        tag: "Motion Video Reels",
        image: socialCampaignProof
      },
      {
        title: "High-Engagement Carousel Decks",
        tag: "Carousel Strategy",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop"
      },
      {
        title: "Social Feed Overhaul & Branding",
        tag: "Profile Brand Suite",
        image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    deliverables: [
      "Monthly custom content calendar & narrative pillars",
      "High-engagement carousel decks & static feed posts",
      "Short-form video concepts & motion reel templates",
      "Profile overhaul: Bio, highlights & banner branding",
      "Community engagement playbook & caption copywriting"
    ],
    timeline: "Ongoing Retainer",
    idealFor: "Brands looking to grow organic reach and social authority."
  },
  {
    id: "performance-ads",
    title: "Paid Ads & Performance Creatives",
    tagline: "High-CTR advertising creatives engineered to lower customer acquisition costs.",
    icon: Zap,
    accent: "#FFB800",
    proofImages: [
      {
        title: "High-CTR Meta & TikTok Ad Creatives",
        tag: "Performance Ads",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
      },
      {
        title: "Direct-Response Split Tests",
        tag: "ROAS Variations",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop"
      },
      {
        title: "Landing Page Conversion Funnels",
        tag: "Funnel Alignment",
        image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    deliverables: [
      "Direct-response visual hooks & split-testing variations",
      "Ad creatives formatted for Meta, TikTok & Google Display",
      "Compelling sales copywriting tailored for cold & warm traffic",
      "Landing page conversion alignment audit",
      "Bi-weekly creative iteration based on ROAS analytics"
    ],
    timeline: "Monthly Sprint",
    idealFor: "D2C brands and scaling software businesses running paid traffic."
  },
  {
    id: "motion-3d",
    title: "Motion Graphics & 3D Animation",
    tagline: "Dynamic visual storytelling that breathes life into products.",
    icon: Layers,
    accent: "#00D2FF",
    proofImages: [
      {
        title: "3D Kinetic Motion & Digital Art",
        tag: "3D Simulation",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
      },
      {
        title: "Exploded Product Anatomy Render",
        tag: "CGI Showcase",
        image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop"
      },
      {
        title: "Animated Brand Stingers & Lottie",
        tag: "Motion Identity",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    deliverables: [
      "Animated logo intros & digital stingers",
      "Product showcase 3D renders & explode views",
      "Explainer motion graphics & workflow visualizations",
      "Lottie / JSON vector animations for web performance",
      "Custom UI walkthroughs & onboarding animations"
    ],
    timeline: "2 - 4 Weeks",
    idealFor: "Hardware companies, fin-tech, and cutting-edge digital platforms."
  },
  {
    id: "print-packaging",
    title: "Packaging & Corporate Assets",
    tagline: "Tactile luxury assets that create unforgettable unboxing experiences.",
    icon: Box,
    accent: "#A3FF12",
    proofImages: [
      {
        title: "Luxury Foil Holographic Packaging",
        tag: "Embossed Box",
        image: packagingMotionProof
      },
      {
        title: "Corporate Stationery & Embossing",
        tag: "Print Collateral",
        image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=1200&auto=format&fit=crop"
      },
      {
        title: "Minimalist Retail Bottle & Labeling",
        tag: "Retail Display",
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    deliverables: [
      "Die-cut product packaging & label designs",
      "Luxury business cards & embossed stationery sets",
      "Investor pitch decks & corporate presentation templates",
      "Merchandise, apparel & event display graphics",
      "CMYK print-ready files with spot UV & foil specifications"
    ],
    timeline: "2 - 3 Weeks",
    idealFor: "Consumer products, luxury retail, and executive events."
  }
];

const workflowSteps = [
  {
    num: "01",
    title: "Strategic Discovery",
    desc: "We analyze your audience, dissect your competitors, and clarify your brand's unique market position."
  },
  {
    num: "02",
    title: "Concept Prototyping",
    desc: "We generate bold, distinct visual directions, presenting realistic mockups in real-world contexts."
  },
  {
    num: "03",
    title: "Iterative Refinement",
    desc: "Collaborative feedback rounds where we sculpt every nuance to perfection with your direct input."
  },
  {
    num: "04",
    title: "Production & Delivery",
    desc: "We export pixel-perfect source files, comprehensive guidelines, and complete asset kits."
  },
  {
    num: "05",
    title: "Scaling & Amplification",
    desc: "We help deploy your new assets across digital channels, ensuring maximum impact from day one."
  }
];

interface ServicePricingTier {
  name: string;
  price: string;
  period?: string;
  desc: string;
  badge?: string;
  features: string[];
  popular?: boolean;
  serviceKey: string;
}

const pricingCategoryTabs = [
  { id: 'brand', label: 'Brand & Identity' },
  { id: 'motion', label: 'Motion & Reels' },
  { id: 'web', label: 'Web & UI/UX' },
  { id: 'retainer', label: 'Growth Retainers' }
] as const;

type PricingTabKey = typeof pricingCategoryTabs[number]['id'];

const categorizedPricing: Record<PricingTabKey, ServicePricingTier[]> = {
  brand: [
    {
      name: "Starter Identity",
      price: "$99",
      desc: "Essential foundational branding crafted for emerging startups and creators.",
      features: [
        "3 Unique Custom Logo Concepts",
        "Vector & High-Res Formats (AI, SVG, EPS, PNG)",
        "Curated Color Palette & Typography Hierarchy",
        "3 Comprehensive Revision Rounds",
        "Digital Brand Style Sheet",
        "3-5 Business Days Delivery"
      ],
      popular: false,
      serviceKey: "Brand Identity"
    },
    {
      name: "Complete Brand Suite",
      price: "$249",
      badge: "Most Popular",
      desc: "Comprehensive 360 visual identity system for market-leading positioning.",
      features: [
        "Full Visual Identity & Logo System",
        "30-Page Brand Guidelines & Usage Rules",
        "Social Media Starter Kit (20+ Templates)",
        "Business Stationery Suite & Pitch Decks",
        "Open Vector Source Files & 100% Commercial IP",
        "7-10 Business Days Delivery • Priority Support"
      ],
      popular: true,
      serviceKey: "Brand Identity"
    },
    {
      name: "Enterprise Brand System",
      price: "$449",
      badge: "Full Scale",
      desc: "Complete enterprise identity, design tokens, and multi-channel asset rollout.",
      features: [
        "Everything in Complete Brand Suite",
        "Brand Strategy, Tone of Voice & Positioning",
        "Design System Tokens for Web & Mobile",
        "Custom 3D Brand Mark & Animated Logo Reveal",
        "Packaging / Merch Guidelines & Collateral",
        "Direct 1-on-1 Creative Director Consultation"
      ],
      popular: false,
      serviceKey: "Brand Identity"
    }
  ],
  motion: [
    {
      name: "Starter Reels Sprint",
      price: "$119",
      desc: "High-retention vertical reels designed to stop the scroll and build audience.",
      features: [
        "5 High-Retention Short Reels / TikToks (9:16)",
        "Dynamic Captions, Emojis & Kinetic Zoom Cuts",
        "Trending Audio Curation & Sound Effects Mix",
        "Color Correction & Resolution Enhancement",
        "2 Revision Rounds per Video",
        "3-4 Business Days Turnaround"
      ],
      popular: false,
      serviceKey: "Reels & Video Editing"
    },
    {
      name: "Viral Growth Package",
      price: "$229",
      badge: "High ROI",
      desc: "Direct-response video hooks and kinetic editing for rapid social scaling.",
      features: [
        "12 High-Converting Reels & Motion Video Ads",
        "3-Second Viral Hook Strategy & Pattern Interrupts",
        "Custom Kinetic Typography & After Effects Graphics",
        "2 Split-Testing Hook Variations for Meta & TikTok",
        "Raw Source Files (Premiere Pro & After Effects)",
        "Priority 48-Hour Batch Turnaround"
      ],
      popular: true,
      serviceKey: "Reels & Video Editing"
    },
    {
      name: "Commercial 3D & Ads",
      price: "$399",
      badge: "Premium Craft",
      desc: "Cinematic 3D product motion graphics and multi-platform advertising suites.",
      features: [
        "25 Premium Short-Form Creatives & Motion Ads",
        "Photorealistic 3D Product Mockup Overlays",
        "Multi-Hook Iterations for Paid Meta/TikTok Ads",
        "4K UHD Master Exports + High-CTR Thumbnails",
        "Dedicated Motion Producer & Private Slack Channel",
        "Unlimited Revision Sprints • 24h Turnaround"
      ],
      popular: false,
      serviceKey: "Motion & 3D"
    }
  ],
  web: [
    {
      name: "Landing Page Sprint",
      price: "$199",
      desc: "Conversion-optimized single-page web UI/UX for product launches & campaigns.",
      features: [
        "Bespoke High-Converting Landing Page UI/UX",
        "Fully Responsive Desktop & Mobile Breakpoints",
        "Interactive Clickable Prototype in Figma",
        "Conversion-Engineered Wireframes & Copy Layout",
        "Organized Components & Developer Handoff Specs",
        "5-7 Business Days Delivery"
      ],
      popular: false,
      serviceKey: "Web & UI/UX"
    },
    {
      name: "Full Marketing Website",
      price: "$399",
      badge: "Best Value",
      desc: "Complete 5 to 8-page custom web experience designed for high conversion.",
      features: [
        "5-8 Custom Page Designs (Home, About, Services, etc.)",
        "Comprehensive Figma Design System & Typography Tokens",
        "Custom Micro-Interactions, Hover States & Hero Elements",
        "Conversion Rate Optimization (CRO) Best Practices",
        "Ready-to-Develop Tailwind/CSS Asset Package",
        "10-14 Business Days Delivery • 4 Revisions"
      ],
      popular: true,
      serviceKey: "Web & UI/UX"
    },
    {
      name: "Product UI/UX & App",
      price: "$649",
      badge: "Enterprise",
      desc: "End-to-end digital product design for web applications, SaaS, and mobile apps.",
      features: [
        "Full User Journey Mapping & Information Architecture",
        "25+ Custom App Screen Flows & Modals",
        "Production-Ready Design System with Auto-Layout",
        "Interactive Micro-Prototype with Animations",
        "Engineering Handoff & Icon System",
        "Dedicated UI/UX Lead & Bi-Weekly Sprints"
      ],
      popular: false,
      serviceKey: "Web & UI/UX"
    }
  ],
  retainer: [
    {
      name: "Content Engine Sprint",
      price: "$249",
      period: "/month",
      desc: "Continuous monthly social media graphics and content production.",
      features: [
        "15 Branded Social Creatives & Carousel Decks",
        "Audience & Competitor Content Analysis",
        "Optimized Captions, Copywriting & Tag Sets",
        "Bi-Weekly Performance Check-in",
        "48-Hour Turnaround on Ad-Hoc Assets",
        "Pause or Cancel Anytime"
      ],
      popular: false,
      serviceKey: "Social Media Growth"
    },
    {
      name: "Dedicated Creative Lead",
      price: "$499",
      period: "/month",
      badge: "Partner Tier",
      desc: "An entire senior design department in your pocket with zero agency overhead.",
      features: [
        "Dedicated Senior Art Director & Motion Designer",
        "Unlimited Creative Requests (1 Active Task at a Time)",
        "Covers Brand, Web, Social, Ads, and Reels",
        "Private Slack or WhatsApp Workspace",
        "24-48 Hour Typical Delivery per Sprint",
        "Pause or Cancel Anytime with Zero Lock-in"
      ],
      popular: true,
      serviceKey: "Brand Identity"
    },
    {
      name: "Scale & Growth Partner",
      price: "$899",
      period: "/month",
      badge: "Maximum Speed",
      desc: "High-velocity creative output with multiple parallel streams for scaling brands.",
      features: [
        "Multi-Disciplinary Team (Branding + Motion + Web)",
        "2 Active Concurrent Requests Simultaneously",
        "Weekly Conversion Rate Testing & Ad Variations",
        "Priority 24-Hour Express Turnaround",
        "Daily Async Standups & Direct Founder Access",
        "Full Source File Ownership on Every Sprint"
      ],
      popular: false,
      serviceKey: "Social Media Growth"
    }
  ]
};

const faqs = [
  {
    q: "How long does a typical branding or design project take?",
    a: "Standard brand identity suites take between 2 to 3 weeks. Comprehensive web UI/UX builds take 3 to 5 weeks. We establish concrete milestones at kickoff and deliver consistently on schedule."
  },
  {
    q: "What file formats will I receive upon completion?",
    a: "You receive all original, editable vector source files (Figma, Adobe Illustrator .AI, .EPS), print-ready CMYK PDFs, and optimized digital assets (SVG, PNG, WebP) structured in an organized cloud drive."
  },
  {
    q: "How do revisions work?",
    a: "Every project includes dedicated iterative feedback cycles. Because our discovery phase is extremely thorough, our initial concept presentations typically hit the target closely, saving time on endless revisions."
  },
  {
    q: "Can you design a custom package for our unique requirements?",
    a: "Yes! While our standard tiers cover most client needs, we regularly assemble customized scopes for enterprise brands, complex SaaS platforms, and multi-channel campaigns."
  }
];

const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, activeServiceId, onClearActiveService }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<string>(detailedServices[0].id);
  const [activeProofMap, setActiveProofMap] = useState<Record<string, number>>({});

  // Pricing Category Tab state
  const [pricingTab, setPricingTab] = useState<PricingTabKey>(() => {
    if (activeServiceId?.includes('motion') || activeServiceId?.includes('3d')) return 'motion';
    if (activeServiceId?.includes('web') || activeServiceId?.includes('ui')) return 'web';
    if (activeServiceId?.includes('social') || activeServiceId?.includes('ads')) return 'retainer';
    return 'brand';
  });

  // Spotlight Drawer State
  const [spotlightServiceId, setSpotlightServiceId] = useState<string | null>(null);
  const [highlightedCardId, setHighlightedCardId] = useState<string | null>(null);
  const [copiedDeepLink, setCopiedDeepLink] = useState(false);

  // Full Portfolio state
  const [portfolioFilter, setPortfolioFilter] = useState<string>('all');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectDetail | null>(null);
  const [activeProjectProofMap, setActiveProjectProofMap] = useState<Record<number, number>>({});
  const [activeModalProofIndex, setActiveModalProofIndex] = useState<number>(0);
  const [modalViewMode, setModalViewMode] = useState<'video' | 'stills'>('video');

  // Synchronize pricing tab when activeServiceId changes
  useEffect(() => {
    if (activeServiceId?.includes('motion') || activeServiceId?.includes('3d')) {
      setPricingTab('motion');
    } else if (activeServiceId?.includes('web') || activeServiceId?.includes('ui')) {
      setPricingTab('web');
    } else if (activeServiceId?.includes('social') || activeServiceId?.includes('ads')) {
      setPricingTab('retainer');
    } else if (activeServiceId?.includes('brand') || activeServiceId?.includes('print') || activeServiceId?.includes('packaging')) {
      setPricingTab('brand');
    }
  }, [activeServiceId]);

  // Manage body scroll lock and Escape key for modals
  useEffect(() => {
    if (selectedCaseStudy || spotlightServiceId) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          if (selectedCaseStudy) setSelectedCaseStudy(null);
          if (spotlightServiceId) setSpotlightServiceId(null);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedCaseStudy, spotlightServiceId]);

  // Helper to map service ID to matching case studies
  const getProjectsForService = (serviceId: string): ProjectDetail[] => {
    switch (serviceId) {
      case 'brand-identity':
        return allProjects.filter(p => p.tag === 'brand-identity');
      case 'web-uiux':
        return allProjects.filter(p => p.tag === 'web-design');
      case 'social-marketing':
        return allProjects.filter(p => p.tag === 'social-media');
      case 'performance-ads':
        return allProjects.filter(p => p.tag === 'social-media' || p.category.includes('Social') || p.category.includes('Ads'));
      case 'motion-3d':
        return allProjects.filter(p => p.tag === 'motion-animation');
      case 'print-packaging':
        return allProjects.filter(p => p.tag === 'packaging');
      default:
        return allProjects.slice(0, 3);
    }
  };

  // Helper to map service title to ContactPage tag
  const mapServiceToContactTag = (title: string): string => {
    if (title.includes('Reels') || title.includes('Video')) return 'Reels & Video Editing';
    if (title.includes('Motion') || title.includes('3D')) return 'Motion & 3D';
    if (title.includes('Web') || title.includes('UI') || title.includes('Digital') || title.includes('Landing') || title.includes('Product')) return 'Web & UI/UX';
    if (title.includes('Social') || title.includes('Growth') || title.includes('Retainer') || title.includes('Ads') || title.includes('Paid')) return 'Social Media Growth';
    if (title.includes('Packaging') || title.includes('Print')) return 'Packaging Design';
    if (title.includes('Brand')) return 'Brand Identity';
    return 'Brand Identity';
  };

  // Open & Close Spotlight Drawer
  const openSpotlight = (serviceId: string) => {
    setSelectedService(serviceId);
    setSpotlightServiceId(serviceId);
    setHighlightedCardId(serviceId);

    // Update URL hash for shareable deep-linking without layout shift
    window.history.replaceState(null, '', `#services#${serviceId}`);
  };

  // Dynamic header offset calculator accounting for sticky header height + breathing room
  const calculateHeaderOffset = (): number => {
    const header = document.querySelector('header');
    const headerHeight = header ? header.getBoundingClientRect().height : (window.innerWidth < 640 ? 76 : 96);
    // Buffer space so top border, glow ring, and spotlight badge are completely clear of the header
    const extraGutter = window.innerWidth < 640 ? 18 : 28;
    return Math.round(headerHeight + extraGutter);
  };

  // Precise scrolling to the exact top of the selected service element with calculated header offset
  const scrollToService = (serviceId: string, smooth = true): boolean => {
    const el = document.getElementById(`service-${serviceId}`);
    if (!el) return false;

    const navOffset = calculateHeaderOffset();
    const elementRect = el.getBoundingClientRect();
    const currentScrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
    const targetTop = elementRect.top + currentScrollY - navOffset;

    window.scrollTo({
      top: Math.max(0, Math.round(targetTop)),
      behavior: smooth ? 'smooth' : 'auto'
    });
    return true;
  };

  const closeSpotlight = () => {
    const currentId = spotlightServiceId || selectedService;
    setSpotlightServiceId(null);
    document.body.style.overflow = '';
    window.history.replaceState(null, '', '#services');
    if (onClearActiveService) {
      onClearActiveService();
    }
    if (currentId) {
      setTimeout(() => {
        scrollToService(currentId, true);
      }, 50);
    }
  };

  const copyDeepLink = (serviceId: string) => {
    const fullUrl = `${window.location.origin}${window.location.pathname}#services#${serviceId}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedDeepLink(true);
      setTimeout(() => setCopiedDeepLink(false), 2500);
    }).catch(() => {
      // Fallback
      setCopiedDeepLink(true);
      setTimeout(() => setCopiedDeepLink(false), 2500);
    });
  };

  const handleStartBrief = (serviceTitle: string) => {
    const mapped = mapServiceToContactTag(serviceTitle);
    setSpotlightServiceId(null);
    onNavigate('contact', mapped);
  };

  const handleServiceInquiry = (serviceTitle: string, tierName?: string) => {
    handleStartBrief(serviceTitle || tierName || 'Brand Identity');
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Resolve deep link from activeServiceId or window.location.hash
  useEffect(() => {
    const resolveTarget = () => {
      if (activeServiceId) return activeServiceId;
      const rawHash = window.location.hash.replace(/^#/, '').toLowerCase();
      if (rawHash.includes('#')) {
        return rawHash.split('#')[1] || null;
      }
      if (rawHash.includes('service=')) {
        const match = rawHash.match(/service=([^&]+)/);
        return match ? match[1] : null;
      }
      const known = ['brand-identity', 'web-uiux', 'social-marketing', 'performance-ads', 'motion-3d', 'print-packaging'];
      if (known.includes(rawHash)) return rawHash;
      return null;
    };

    const targetId = resolveTarget();

    if (targetId === 'portfolio' || window.location.hash.includes('portfolio')) {
      const timer = setTimeout(() => {
        const el = document.getElementById('portfolio');
        if (el) {
          const navOffset = calculateHeaderOffset();
          const currentScrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
          const y = el.getBoundingClientRect().top + currentScrollY - navOffset;
          window.scrollTo({ top: Math.max(0, Math.round(y)), behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else if (targetId) {
      const matched = detailedServices.find(s => 
        s.id === targetId || 
        s.id.includes(targetId) || 
        targetId.includes(s.id) ||
        (targetId.includes('motion') && s.id === 'motion-3d') ||
        (targetId.includes('brand') && s.id === 'brand-identity') ||
        ((targetId.includes('web') || targetId.includes('ui')) && s.id === 'web-uiux') ||
        (targetId.includes('social') && s.id === 'social-marketing') ||
        (targetId.includes('ads') && s.id === 'performance-ads') ||
        ((targetId.includes('packaging') || targetId.includes('print')) && s.id === 'print-packaging')
      );

      if (matched) {
        setSelectedService(matched.id);
        setSpotlightServiceId(matched.id);
        setHighlightedCardId(matched.id);

        // Stage 1: Quick scroll alignment
        const timer1 = setTimeout(() => {
          scrollToService(matched.id, true);
        }, 60);

        // Stage 2: Second verification pass to account for any layout shifts
        const timer2 = setTimeout(() => {
          scrollToService(matched.id, true);
        }, 260);

        const highlightTimer = setTimeout(() => {
          setHighlightedCardId(null);
        }, 4500);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
          clearTimeout(highlightTimer);
        };
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeServiceId]);

  // Handle ESC key for Spotlight Drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && spotlightServiceId) {
        closeSpotlight();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [spotlightServiceId]);

  // Lock body overflow when spotlight drawer is active with safety delay for smooth scrolling
  useEffect(() => {
    if (spotlightServiceId) {
      const timer = setTimeout(() => {
        document.body.style.overflow = 'hidden';
      }, 500);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [spotlightServiceId]);

  const handleProofChange = (e: React.MouseEvent, serviceId: string, proofIndex: number) => {
    e.stopPropagation();
    setActiveProofMap((prev) => ({
      ...prev,
      [serviceId]: proofIndex
    }));
  };

  const portfolioCategoriesList = [
    { id: 'all', label: 'All Works' },
    { id: 'brand-identity', label: 'Brand Identity' },
    { id: 'web-design', label: 'Web & UI/UX' },
    { id: 'packaging', label: 'Packaging & Assets' },
    { id: 'motion-animation', label: 'Motion & Animation' },
    { id: 'social-media', label: 'Social & Growth' }
  ];

  const filteredPortfolio = portfolioFilter === 'all'
    ? allProjects
    : allProjects.filter(p => p.tag === portfolioFilter);

  const handleProjectProofChange = (e: React.MouseEvent, projectId: number, proofIndex: number) => {
    e.stopPropagation();
    setActiveProjectProofMap(prev => ({
      ...prev,
      [projectId]: proofIndex
    }));
  };

  const openProjectCaseStudy = (project: ProjectDetail, forceMode?: 'video' | 'stills') => {
    setSelectedCaseStudy(project);
    setActiveModalProofIndex(activeProjectProofMap[project.id] || 0);
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
          <span className="text-white font-medium">Services</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-3.5 sm:px-6 md:px-12 mb-6 sm:mb-24">
        <div className="max-w-4xl space-y-2 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/20 text-[#00D2FF] text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            <LogoIcon size={14} className="sm:w-4 sm:h-4" />
            <span>Capabilities & Deliverables</span>
          </div>
          <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-['Montserrat'] tracking-tight leading-[1.12] sm:leading-[1.1]">
            Transforming Ambition Into <br />
            <span className="text-gradient-brand">High-Converting Reality</span>
          </h1>
          <p className="text-xs sm:text-base md:text-xl text-white/70 font-['Inter'] leading-relaxed max-w-3xl">
            From strategic visual identities to high-converting UI/UX and ROI-driven social growth, 
            explore the complete scope of services we offer to help your business outpace the competition.
          </p>
        </div>
      </section>

      {/* Interactive Detailed Services Grid */}
      <section className="container mx-auto px-3.5 sm:px-6 md:px-12 mb-8 sm:mb-32">
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-16 space-y-1.5 sm:space-y-4">
          <span className="text-[#00D2FF] text-[10px] sm:text-xs font-extrabold tracking-[0.3em] uppercase">FULL SERVICE SUITE</span>
          <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-extrabold font-['Montserrat']">
            Our Core Competencies
          </h2>
          <p className="text-white/60 font-['Inter'] text-xs sm:text-base">
            Every service is executed by senior specialists with transparent deliverables and zero bloat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {detailedServices.map((service) => {
            const Icon = service.icon;
            const isSelected = selectedService === service.id;
            const isHighlighted = highlightedCardId === service.id;
            const activeProofIndex = activeProofMap[service.id] || 0;
            const currentProof = service.proofImages[activeProofIndex] || service.proofImages[0];

            return (
              <div
                id={`service-${service.id}`}
                key={service.id}
                itemScope
                itemType="https://schema.org/Service"
                onClick={() => openSpotlight(service.id)}
                className={`scroll-mt-24 sm:scroll-mt-32 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border transition-all duration-500 flex flex-col justify-between cursor-pointer relative overflow-hidden group ${
                  isHighlighted
                    ? 'bg-gradient-to-b from-[#15254A] to-[#0B132B] border-[#00D2FF] shadow-[0_0_40px_rgba(0,210,255,0.45)] ring-2 ring-[#00D2FF] scale-[1.015]'
                    : isSelected 
                      ? 'bg-gradient-to-b from-[#101B3A] to-[#0B132B] border-[#00D2FF]/50 shadow-[0_0_30px_rgba(0,210,255,0.2)]'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <meta itemProp="serviceType" content={service.title} />
                <meta itemProp="provider" content="Qarvion" />
                {/* Active Spotlight Highlight Badge */}
                {isHighlighted && (
                  <div className="absolute top-3.5 right-3.5 z-20">
                    <span className="px-3 py-1 rounded-full bg-[#00D2FF] text-[#0B132B] text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1 animate-pulse">
                      <Sparkles className="w-3 h-3" />
                      Spotlight Active
                    </span>
                  </div>
                )}

                <div className="space-y-5">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00D2FF]">
                      <Icon className="w-6 h-6" />
                    </div>
                    {!isHighlighted && (
                      <span className="text-xs font-bold text-white/40 flex items-center gap-1.5 font-['Inter']">
                        <Clock className="w-3.5 h-3.5" />
                        {service.timeline}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 itemProp="name" className="text-xl sm:text-2xl font-bold font-['Montserrat'] text-white mb-1.5 group-hover:text-[#00D2FF] transition-colors">{service.title}</h3>
                    <p itemProp="description" className="text-xs sm:text-sm text-white/60 font-['Inter'] leading-relaxed">{service.tagline}</p>
                  </div>

                  {/* Visual Proof Showcase with Interactive Switcher */}
                  <div className="rounded-2xl overflow-hidden relative border border-white/10 h-44 sm:h-48 group/proof bg-black/40">
                    <img 
                      src={currentProof.image} 
                      alt={currentProof.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/proof:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-transparent"></div>

                    {/* Proof Tag Pill */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0B132B]/80 backdrop-blur-md border border-white/15 text-[10px] font-bold text-[#00D2FF]">
                        ✦ {currentProof.tag}
                      </span>
                    </div>

                    {/* Proof Caption & Number Switcher */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between gap-2">
                      <p className="text-[11px] font-semibold text-white truncate max-w-[170px] drop-shadow-md">
                        {currentProof.title}
                      </p>

                      {/* Proof Selector Tabs */}
                      <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md p-0.5 rounded-lg border border-white/10 shrink-0">
                        {service.proofImages.map((pItem, pIdx) => {
                          const isProofActive = activeProofIndex === pIdx;
                          return (
                            <button
                              key={pIdx}
                              onClick={(e) => handleProofChange(e, service.id, pIdx)}
                              title={pItem.title}
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                                isProofActive
                                  ? 'bg-[#00D2FF] text-[#0B132B]'
                                  : 'text-white/60 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              0{pIdx + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="text-[11px] font-bold text-white/70 uppercase tracking-wider font-['Inter']">Key Deliverables:</div>
                    {service.deliverables.slice(0, 4).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-white/70 font-['Inter']">
                        <Check className="w-3.5 h-3.5 text-[#00D2FF] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Spotlight Trigger Pill */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openSpotlight(service.id);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-[#00D2FF]/15 border border-white/10 hover:border-[#00D2FF]/40 text-[#00D2FF] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Explore Spotlight & Case Studies</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-white/40 font-['Inter'] truncate max-w-[130px] sm:max-w-none">{service.idealFor}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openSpotlight(service.id);
                      }}
                      className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-medium border border-white/10 transition-all cursor-pointer"
                    >
                      Cases
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartBrief(service.title);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-[#00D2FF] text-[#0B132B] hover:bg-[#3A7BD5] hover:text-white font-bold text-xs transition-all flex items-center gap-1 shadow-[0_0_15px_rgba(0,210,255,0.25)] active:scale-95 cursor-pointer"
                    >
                      <span>Inquire</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Complete Portfolio & Case Studies Section */}
      <section id="portfolio" className="container mx-auto px-4 sm:px-6 md:px-12 mb-12 sm:mb-32 pt-4 sm:pt-6">
        <div className="rounded-2xl sm:rounded-3xl bg-[#070D1E]/80 border border-white/10 p-4 sm:p-10 md:p-14 relative overflow-hidden shadow-2xl">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#A3FF12]/5 rounded-full blur-[140px] pointer-events-none"></div>

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-2.5 sm:space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#A3FF12]/10 border border-[#A3FF12]/20 text-[#A3FF12] text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Full Portfolio & Verified Case Studies</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-extrabold font-['Montserrat'] text-white">
              All Client Projects & <span className="text-gradient-lime">Deliverables</span>
            </h2>
            <p className="text-white/70 font-['Inter'] text-xs sm:text-base leading-relaxed">
              Explore our full verified catalog of client projects across Brand Identity, Web & UI/UX, Packaging, Motion Reels, and Growth Marketing with multi-asset proof galleries and ROI metrics.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 mb-8 sm:mb-16 relative z-10">
            {portfolioCategoriesList.map((cat) => {
              const count = cat.id === 'all' ? allProjects.length : allProjects.filter(p => p.tag === cat.id).length;
              const isActive = portfolioFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setPortfolioFilter(cat.id)}
                  className={`px-3 sm:px-6 py-1.5 sm:py-3 rounded-full text-[11px] sm:text-sm font-bold transition-all duration-300 border flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#A3FF12] text-[#050810] border-[#A3FF12] shadow-[0_0_20px_rgba(163,255,18,0.4)]'
                      : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border-white/10'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold transition-colors ${
                    isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-white/60'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Full Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 relative z-10">
            {filteredPortfolio.map((project) => {
              const currentProofIndex = activeProjectProofMap[project.id] || 0;
              const currentProof = project.proofImages[currentProofIndex] || project.proofImages[0];

              return (
                <div
                  key={project.id}
                  onClick={() => openProjectCaseStudy(project)}
                  className="group rounded-2xl sm:rounded-3xl bg-[#0B132B]/85 border border-white/10 overflow-hidden cursor-pointer hover:border-[#A3FF12]/50 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between shadow-xl"
                >
                  <div className="relative aspect-video overflow-hidden bg-[#050810]">
                    <img
                      src={currentProof.image}
                      alt={currentProof.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-black/40"></div>

                    {/* Top Proof Tag & Switcher */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0B132B]/90 backdrop-blur-md text-[#A3FF12] border border-white/10 flex items-center gap-1.5">
                        {project.youtubeId ? <Film className="w-3 h-3" /> : <span>✦</span>}
                        <span>{currentProof.tag}</span>
                      </span>

                      {/* Proof Selector Switcher */}
                      <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-lg border border-white/10">
                        {project.proofImages.map((proof, pIdx) => {
                          const isActive = currentProofIndex === pIdx;
                          return (
                            <button
                              key={proof.id}
                              onClick={(e) => handleProjectProofChange(e, project.id, pIdx)}
                              title={proof.title}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                                isActive 
                                  ? 'bg-[#A3FF12] text-[#050810] shadow-sm' 
                                  : 'text-white/60 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              0{pIdx + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Video Play Overlay */}
                    {project.youtubeId && (
                      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <div className="w-12 h-12 rounded-full bg-[#A3FF12] text-[#050810] flex items-center justify-center shadow-[0_0_20px_rgba(163,255,18,0.7)] group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#A3FF12]">
                          {project.category}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">
                          {project.metric} {project.metricLabel}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold font-['Montserrat'] text-white group-hover:text-[#A3FF12] transition-colors flex items-center justify-between">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-[#A3FF12] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </h3>

                      <p className="text-xs text-white/70 font-['Inter'] line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {project.deliverables.slice(0, 2).map((del, dIdx) => (
                          <span key={dIdx} className="text-[10px] text-white/60 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                            {del}
                          </span>
                        ))}
                      </div>

                      <span className="text-xs font-bold text-[#A3FF12] flex items-center gap-1 group-hover:underline">
                        <span>Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Embedded Case Study Modal in ServicesPage */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200">
          <div className="bg-[#0B132B] border border-white/20 rounded-3xl max-w-4xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#A3FF12]">
                    {selectedCaseStudy.category}
                  </span>
                  <span className="text-xs text-white/40">•</span>
                  <span className="text-xs text-white/60 font-['Inter']">{selectedCaseStudy.client}</span>
                  <span className="text-xs text-white/40">•</span>
                  <span className="text-xs text-white/60 font-['Inter']">{selectedCaseStudy.timeline}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-['Montserrat'] text-white">
                  {selectedCaseStudy.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedCaseStudy(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video vs Stills Mode Switcher if Project has Video */}
            {selectedCaseStudy.youtubeId && (
              <div className="flex items-center gap-2 p-1.5 bg-black/60 rounded-xl border border-white/10 w-fit">
                <button
                  onClick={() => setModalViewMode('video')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    modalViewMode === 'video'
                      ? 'bg-[#A3FF12] text-[#050810] shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Watch Video Reel
                </button>
                <button
                  onClick={() => setModalViewMode('stills')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    modalViewMode === 'stills'
                      ? 'bg-[#A3FF12] text-[#050810] shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" /> Deliverable Stills ({selectedCaseStudy.proofImages.length})
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
                    <Film className="w-3.5 h-3.5" /> Full HD Video Stream
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

      {/* 5-Step Agency Workflow */}
      <section className="container mx-auto px-4 sm:px-6 md:px-12 mb-12 sm:mb-32">
        <div className="rounded-2xl sm:rounded-3xl bg-[#060A16] border border-white/10 p-5 sm:p-8 md:p-16 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16 space-y-2 sm:space-y-4">
            <span className="text-[#A3FF12] text-[10px] sm:text-xs font-extrabold tracking-[0.3em] uppercase">HOW IT WORKS</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-['Montserrat']">
              Our 5-Stage Precision Workflow
            </h2>
            <p className="text-white/60 font-['Inter'] text-xs sm:text-sm md:text-base">
              Predictable, milestone-driven execution designed to eliminate guesswork and scope creep.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 sm:gap-6 relative">
            {workflowSteps.map((step, idx) => (
              <div 
                key={idx} 
                className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 sm:space-y-4 relative group hover:border-[#A3FF12]/40 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-extrabold font-['Montserrat'] text-white/20 group-hover:text-[#A3FF12] transition-colors">
                  {step.num}
                </div>
                <h3 className="text-base sm:text-lg font-bold font-['Montserrat'] text-white">{step.title}</h3>
                <p className="text-xs text-white/60 font-['Inter'] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparent Pricing Packages */}
      <section id="investment-tiers" className="container mx-auto px-4 sm:px-6 md:px-12 mb-12 sm:mb-32">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-4">
          <span className="text-[#00D2FF] text-[10px] sm:text-xs font-extrabold tracking-[0.3em] uppercase">INVESTMENT TIERS</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-['Montserrat']">
            Clear, Transparent Pricing
          </h2>
          <p className="text-white/60 font-['Inter'] text-xs sm:text-sm md:text-base">
            No hidden retainers, surprise invoices, or agency bloat. Choose the sprint or tier that matches your current growth stage.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {pricingCategoryTabs.map((tab) => {
            const isActive = pricingTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setPricingTab(tab.id)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#00D2FF] text-[#0B132B] font-bold shadow-[0_0_20px_rgba(0,210,255,0.4)] scale-105'
                    : 'bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          {categorizedPricing[pricingTab].map((tier, idx) => (
            <div 
              key={`${pricingTab}-${idx}`}
              className={`rounded-2xl sm:rounded-3xl p-5 sm:p-8 border flex flex-col justify-between relative transition-all duration-300 hover:scale-[1.01] ${
                tier.popular 
                  ? 'bg-gradient-to-b from-[#16213E] to-[#0B132B] border-[#00D2FF] shadow-[0_0_35px_rgba(0,210,255,0.25)] md:-translate-y-2'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]'
              }`}
            >
              {(tier.popular || tier.badge) && (
                <div className={`absolute top-0 right-6 sm:right-8 -translate-y-1/2 px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider ${
                  tier.popular
                    ? 'bg-[#00D2FF] text-[#0B132B] shadow-md shadow-[#00D2FF]/20'
                    : 'bg-white/15 text-white/90 border border-white/20'
                }`}>
                  {tier.badge || 'Most Popular'}
                </div>
              )}

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-['Montserrat'] text-white">{tier.name}</h3>
                  <p className="text-xs sm:text-sm text-white/50 font-['Inter'] mt-1 leading-relaxed">{tier.desc}</p>
                </div>

                <div className="flex items-baseline gap-1.5 pt-1">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Montserrat'] text-white tracking-tight">{tier.price}</span>
                  {tier.period ? (
                    <span className="text-xs sm:text-sm text-white/50 font-['Inter']">{tier.period}</span>
                  ) : (
                    <span className="text-[10px] sm:text-xs text-white/40 font-['Inter'] uppercase tracking-wider">/ sprint</span>
                  )}
                </div>

                <div className="space-y-2.5 sm:space-y-3 pt-4 sm:pt-6 border-t border-white/10">
                  {tier.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-white/80 font-['Inter'] leading-snug">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00D2FF] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-white/5">
                <button
                  onClick={() => handleServiceInquiry(tier.serviceKey, tier.name)}
                  className={`w-full py-3 sm:py-3.5 rounded-xl sm:rounded-full font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    tier.popular
                      ? 'bg-[#00D2FF] text-[#0B132B] hover:shadow-[0_0_25px_rgba(0,210,255,0.5)] hover:scale-[1.02]'
                      : 'bg-white/10 text-white hover:bg-white/20 hover:scale-[1.02]'
                  }`}
                >
                  <span>Choose {tier.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Agency Guarantees Strip */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-8 text-xs text-white/60">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>100% Commercial IP & Source Files</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Milestone Delivery & Escrow Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Direct Creative Lead Communication</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/50">Need a bespoke scope?</span>
            <button
              onClick={() => onNavigate('contact')}
              className="text-xs font-bold text-[#00D2FF] hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              Start Custom Brief <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="container mx-auto px-4 sm:px-6 md:px-12 mb-12 sm:mb-32 max-w-4xl">
        <div className="text-center mb-8 sm:mb-16 space-y-2 sm:space-y-4">
          <span className="text-[#A3FF12] text-[10px] sm:text-xs font-extrabold tracking-[0.3em] uppercase">CLARITY</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-['Montserrat']">
            Frequently Asked Questions
          </h2>
          <p className="text-white/60 font-['Inter'] text-xs sm:text-base">
            Everything you need to know about working with Qarvion.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base md:text-lg font-['Montserrat'] text-white">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-[#00D2FF] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-6 sm:pb-6 text-xs sm:text-sm text-white/70 font-['Inter'] leading-relaxed border-t border-white/5 pt-3 sm:pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Inter-Page Links Navigation Bar */}
      <section className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="p-5 sm:p-10 md:p-14 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#1B2A49] via-[#0F3460] to-[#0B132B] border border-white/10 text-center space-y-5 sm:space-y-8">
          <div className="max-w-2xl mx-auto space-y-2 sm:space-y-3">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold font-['Montserrat'] text-white">
              Ready to see our services in practice?
            </h2>
            <p className="text-white/70 text-xs sm:text-sm md:text-base font-['Inter']">
              Discover real-world results in our portfolio or reach out for an instant project estimate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 max-w-4xl mx-auto text-left">
            <div 
              onClick={() => onNavigate('works')}
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#A3FF12] hover:bg-white/[0.08] cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-[10px] sm:text-xs font-bold uppercase text-[#A3FF12] tracking-wider">Proof of Craft</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A3FF12] group-hover:translate-x-1.5 transition-transform" />
              </div>
              <h3 className="text-base sm:text-xl font-bold font-['Montserrat'] text-white mb-1 sm:mb-2">Our Works & Cases</h3>
              <p className="text-[11px] sm:text-xs text-white/60 font-['Inter']">Browse 6+ in-depth case studies with measurable business metrics.</p>
            </div>

            <div 
              onClick={() => onNavigate('about')}
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#00D2FF] hover:bg-white/[0.08] cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-[10px] sm:text-xs font-bold uppercase text-[#00D2FF] tracking-wider">The Agency</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00D2FF] group-hover:translate-x-1.5 transition-transform" />
              </div>
              <h3 className="text-base sm:text-xl font-bold font-['Montserrat'] text-white mb-1 sm:mb-2">About Us</h3>
              <p className="text-[11px] sm:text-xs text-white/60 font-['Inter']">Read our story, agency manifesto, and leadership bios.</p>
            </div>

            <div 
              onClick={() => onNavigate('contact')}
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white hover:bg-white/[0.08] cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-[10px] sm:text-xs font-bold uppercase text-white/70 tracking-wider">Next Step</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:translate-x-1.5 transition-transform" />
              </div>
              <h3 className="text-base sm:text-xl font-bold font-['Montserrat'] text-white mb-1 sm:mb-2">Start a Project</h3>
              <p className="text-[11px] sm:text-xs text-white/60 font-['Inter']">Fill out our brief form or request a custom proposal today.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Spotlight Drawer */}
      {spotlightServiceId && (() => {
        const currentService = detailedServices.find(s => s.id === spotlightServiceId) || detailedServices[0];
        const matchingProjects = getProjectsForService(currentService.id);
        const activeProofIndex = activeProofMap[currentService.id] || 0;
        const currentProof = currentService.proofImages[activeProofIndex] || currentService.proofImages[0];

        return (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8 animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="spotlight-title"
          >
            {/* Backdrop Blur */}
            <div 
              onClick={closeSpotlight}
              className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 cursor-pointer"
            />

            {/* Centered Spotlight Modal Card with Perfect Top & Bottom Margins */}
            <div className="relative w-full max-w-4xl max-h-[92vh] md:max-h-[88vh] bg-[#070D1E] border border-white/20 rounded-2xl sm:rounded-3xl shadow-[0_0_80px_rgba(0,210,255,0.25)] flex flex-col z-10 overflow-hidden animate-in zoom-in-95 duration-200">
              
              {/* Sticky Top Header */}
              <div className="p-4 sm:p-6 border-b border-white/10 bg-[#0B132B]/95 backdrop-blur-md shrink-0 flex items-start justify-between gap-4">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#00D2FF]/15 border border-[#00D2FF]/30 text-[#00D2FF] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Capability Spotlight
                    </span>
                    <span className="text-xs font-semibold text-white/50 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-[#00D2FF]" />
                      {currentService.timeline}
                    </span>
                    <span className="hidden sm:inline-block text-[11px] font-semibold text-[#A3FF12] bg-[#A3FF12]/10 px-2 py-0.5 rounded border border-[#A3FF12]/20 font-mono">
                      {currentService.idealFor}
                    </span>
                  </div>
                  <h2 id="spotlight-title" className="text-xl sm:text-2xl md:text-3xl font-extrabold font-['Montserrat'] text-white">
                    {currentService.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/60 font-['Inter'] leading-relaxed max-w-2xl">
                    {currentService.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Share Deep Link */}
                  <button
                    onClick={() => copyDeepLink(currentService.id)}
                    className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-[#00D2FF] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Copy shareable deep link to this service"
                  >
                    {copiedDeepLink ? (
                      <>
                        <CheckCheck className="w-4 h-4 text-[#A3FF12]" />
                        <span className="hidden sm:inline text-[#A3FF12] font-bold">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="w-4 h-4 text-[#00D2FF]" />
                        <span className="hidden sm:inline">Share Link</span>
                      </>
                    )}
                  </button>

                  {/* Close Button */}
                  <button
                    onClick={closeSpotlight}
                    aria-label="Close spotlight modal"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Drawer Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
                {/* Proof Showcase Banner */}
                <div className="rounded-2xl overflow-hidden border border-white/15 bg-black/50 relative">
                  <div className="h-52 sm:h-72 w-full relative">
                    <img 
                      src={currentProof.image} 
                      alt={currentProof.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E] via-transparent to-transparent"></div>
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-[#0B132B]/90 backdrop-blur-md border border-white/20 text-xs font-bold text-[#00D2FF]">
                        ✦ {currentProof.tag}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
                      <span className="text-xs sm:text-sm font-semibold text-white drop-shadow-md truncate max-w-[200px] sm:max-w-none">
                        {currentProof.title}
                      </span>
                      <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md p-1 rounded-lg border border-white/15 shrink-0">
                        {currentService.proofImages.map((pItem, pIdx) => (
                          <button
                            key={pIdx}
                            onClick={(e) => handleProofChange(e, currentService.id, pIdx)}
                            className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                              activeProofIndex === pIdx
                                ? 'bg-[#00D2FF] text-[#0B132B]'
                                : 'text-white/60 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            0{pIdx + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scope & High-Level Summary Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/50 block">Target Timeline</span>
                    <span className="text-sm font-extrabold text-white flex items-center gap-1.5 font-['Montserrat']">
                      <Clock className="w-3.5 h-3.5 text-[#00D2FF]" />
                      {currentService.timeline}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/50 block">Lead Oversight</span>
                    <span className="text-sm font-extrabold text-[#A3FF12] flex items-center gap-1.5 font-['Montserrat']">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#A3FF12]" />
                      Senior Director
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 col-span-2 sm:col-span-1 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/50 block">Ideal Match</span>
                    <span className="text-xs font-semibold text-white/80 block truncate">
                      {currentService.idealFor}
                    </span>
                  </div>
                </div>

                {/* Scope & Full Deliverables Checklist */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-bold font-['Montserrat'] text-white flex items-center gap-2">
                      <CheckCheck className="w-4 h-4 text-[#00D2FF]" />
                      <span>Guaranteed Scope of Deliverables</span>
                    </h3>
                    <span className="text-[10px] font-mono text-[#00D2FF]">100% Commercial IP</span>
                  </div>

                  <div className="space-y-2 rounded-2xl bg-white/[0.02] border border-white/10 p-4">
                    {currentService.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80 font-['Inter']">
                        <Check className="w-4 h-4 text-[#00D2FF] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Matching Case Studies */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-bold font-['Montserrat'] text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#A3FF12]" />
                      <span>Verified Client Case Studies ({matchingProjects.length})</span>
                    </h3>
                    <span className="text-[10px] text-white/50">Real client metrics</span>
                  </div>

                  <div className="space-y-3">
                    {matchingProjects.map((proj) => (
                      <div 
                        key={proj.id}
                        className="rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 p-4 transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <img 
                            src={proj.image} 
                            alt={proj.title}
                            referrerPolicy="no-referrer"
                            className="w-16 h-14 rounded-xl object-cover shrink-0 border border-white/10"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] uppercase font-bold text-[#A3FF12] tracking-wider block">
                              {proj.category} • {proj.client}
                            </span>
                            <h4 className="text-sm font-bold text-white truncate max-w-xs sm:max-w-sm">
                              {proj.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-mono font-bold text-[#00D2FF] bg-[#00D2FF]/10 px-2 py-0.5 rounded">
                                {proj.metric} {proj.metricLabel}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                          {proj.youtubeId && (
                            <button
                              onClick={() => openProjectCaseStudy(proj, 'video')}
                              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#A3FF12] text-white hover:text-[#050810] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Reel</span>
                            </button>
                          )}
                          <button
                            onClick={() => openProjectCaseStudy(proj, 'stills')}
                            className="px-3 py-1.5 rounded-lg bg-[#00D2FF]/20 hover:bg-[#00D2FF] text-[#00D2FF] hover:text-[#0B132B] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <span>Inspect</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5-Step Sprint Roadmap Preview */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                  <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider block">
                    Execution Workflow
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="font-mono text-[#00D2FF] text-[10px] block font-bold">01 DISCOVERY</span>
                      <span className="text-white font-semibold">Scope & Audit</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="font-mono text-[#00D2FF] text-[10px] block font-bold">02 DRAFTING</span>
                      <span className="text-white font-semibold">Concept Hooks</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="font-mono text-[#00D2FF] text-[10px] block font-bold">03 REFINING</span>
                      <span className="text-white font-semibold">Client Sprint</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="font-mono text-[#A3FF12] text-[10px] block font-bold">04 HANDOFF</span>
                      <span className="text-white font-semibold">Source Files</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Footer Action Bar with Prefilled Project Brief CTA */}
              <div className="p-4 sm:p-5 bg-[#0B132B]/95 backdrop-blur-md border-t border-white/10 shrink-0 space-y-2.5">
                <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3">
                  <button
                    onClick={() => handleStartBrief(currentService.title)}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#00D2FF] to-[#3A7BD5] text-[#0B132B] hover:text-white font-extrabold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,210,255,0.35)] hover:shadow-[0_0_35px_rgba(0,210,255,0.5)] active:scale-95 cursor-pointer"
                  >
                    <span>Start Project Brief with {currentService.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      closeSpotlight();
                      setTimeout(() => {
                        const el = document.getElementById('portfolio');
                        if (el) {
                          const navOffset = calculateHeaderOffset();
                          const currentScrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
                          const y = el.getBoundingClientRect().top + currentScrollY - navOffset;
                          window.scrollTo({ top: Math.max(0, Math.round(y)), behavior: 'smooth' });
                        }
                      }, 60);
                    }}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-all border border-white/10 cursor-pointer"
                  >
                    View All Cases
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-white/50 px-1">
                  <span>⚡ 24h brief response guarantee</span>
                  <span className="text-white/40">Zero agency bloat • 100% IP ownership</span>
                </div>
              </div>

            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default ServicesPage;
