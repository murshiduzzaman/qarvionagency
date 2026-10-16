import projectBrandIdentityProof from '../assets/images/project_brand_identity_proof_1788946433474.jpg';
import projectUiuxWebProof from '../assets/images/project_uiux_web_proof_1788946453718.jpg';
import projectSocialGrowthProof from '../assets/images/project_social_growth_proof_1788946475061.jpg';
import projectPackagingLuxuryProof from '../assets/images/project_packaging_luxury_proof_1788946497483.jpg';
import brandIdentityProof2 from '../assets/images/brand_identity_proof_1788945110423.jpg';
import packagingMotionProof2 from '../assets/images/packaging_motion_proof_1788945174897.jpg';
import uiuxDesignProof2 from '../assets/images/uiux_design_proof_1788945136312.jpg';
import socialCampaignProof2 from '../assets/images/social_campaign_proof_1788945151464.jpg';

export interface ProjectProof {
  id: string;
  title: string;
  tag: string;
  image: string;
}

export interface ProjectDetail {
  id: number;
  title: string;
  category: string;
  tag: 'motion-animation' | 'brand-identity' | 'web-design' | 'social-media' | 'packaging';
  metric: string;
  metricLabel: string;
  description: string;
  image: string;
  proofImages: ProjectProof[];
  challenge: string;
  solution: string;
  deliverables: string[];
  client: string;
  timeline: string;
  youtubeId?: string;
  videoUrl?: string;
}

export type Project = ProjectDetail;

export const projects: ProjectDetail[] = [
  // --- MOTION & ANIMATION ---
  {
    id: 1,
    title: "Personal Branding Reels & Motion Graphics",
    category: "Motion & Animation",
    tag: "motion-animation",
    metric: "2.4M+",
    metricLabel: "Total Reach & Engagements",
    description: "High-impact personal branding reel edit featuring kinetic typography, custom sound design, pacing cuts, and retention-focused visual hooks.",
    image: "https://img.youtube.com/vi/9F5moHSza9o/hqdefault.jpg",
    youtubeId: "9F5moHSza9o",
    videoUrl: "https://youtu.be/9F5moHSza9o",
    proofImages: [
      {
        id: "pb-1",
        title: "Personal Brand Reel Feature Cut",
        tag: "YouTube Showcase Video",
        image: "https://img.youtube.com/vi/9F5moHSza9o/hqdefault.jpg"
      },
      {
        id: "pb-2",
        title: "Motion Hook & Pacing Flow",
        tag: "Motion Architecture",
        image: "https://img.youtube.com/vi/9F5moHSza9o/maxresdefault.jpg"
      },
      {
        id: "pb-3",
        title: "Social Growth Reel Variations",
        tag: "Viral Creative Suite",
        image: projectSocialGrowthProof
      }
    ],
    challenge: "Personal brands in competitive creator ecosystems struggle to cut through feed noise, sustain 70%+ audience retention, and build memorable executive authority.",
    solution: "Structured a high-energy storytelling rhythm with sub-second visual hooks, kinetic subtitle typography, custom SFX risers, and branded motion framing that drives follower conversions.",
    deliverables: ["Personal Branding Reel Edits", "Kinetic Hook Typography", "Sound Design & Sub-Bass SFX", "Storytelling Pacing & Color Grade"],
    client: "Creator Executive & Personal Brand Sprint",
    timeline: "1.5 Weeks"
  },
  {
    id: 2,
    title: "Motion Reels Edit & Kinetic Hooks",
    category: "Motion & Animation",
    tag: "motion-animation",
    metric: "+480k",
    metricLabel: "Average Viral Views",
    description: "High-paced viral motion editing, kinetic typography, dynamic SFX sound design, and custom pace-cutting for brand creators.",
    image: "https://img.youtube.com/vi/DKXCyFprxoU/hqdefault.jpg",
    youtubeId: "DKXCyFprxoU",
    videoUrl: "https://youtu.be/DKXCyFprxoU?si=swof7yOWnhCc0i-e",
    proofImages: [
      {
        id: "mr-1",
        title: "Motion Reel Video Frame",
        tag: "YouTube Showcase Video",
        image: "https://img.youtube.com/vi/DKXCyFprxoU/hqdefault.jpg"
      },
      {
        id: "mr-2",
        title: "Kinetic Hooks & Pacing Timeline",
        tag: "Motion Architecture",
        image: "https://img.youtube.com/vi/DKXCyFprxoU/maxresdefault.jpg"
      },
      {
        id: "mr-3",
        title: "Multi-Platform Social Reels Grid",
        tag: "Creative Suite",
        image: projectSocialGrowthProof
      }
    ],
    challenge: "Attention spans on Instagram Reels and TikTok require hook optimization in the first 1.5 seconds, rapid-fire cuts, and kinetic typography that retains 80%+ watch-through rates.",
    solution: "Engineered high-energy motion pacing, stylized sound design with sub-bass impacts, dynamic zoom cuts, and custom typography overlays that boost retention and algorithmic reach.",
    deliverables: ["Viral Reel Motion Edits", "Kinetic Typography Animations", "Custom Sound Design & SFX", "Multi-Ratio Exports (9:16, 1:1, 16:9)"],
    client: "Creator Studio & Agency Sprints",
    timeline: "2 Weeks"
  },
  {
    id: 3,
    title: "SaaS Product 3D Animation",
    category: "Motion & Animation",
    tag: "motion-animation",
    metric: "3.8x",
    metricLabel: "Demo Signup Conversion",
    description: "Sleek SaaS product demo animation, 3D UI perspective extrusions, feature walkthroughs, and kinetic vector motion.",
    image: "https://img.youtube.com/vi/QuUecyAzKr8/hqdefault.jpg",
    youtubeId: "QuUecyAzKr8",
    videoUrl: "https://youtu.be/QuUecyAzKr8?si=tznPmdh8hp-Bn6j1",
    proofImages: [
      {
        id: "sa-1",
        title: "SaaS 3D Motion Video Frame",
        tag: "YouTube Showcase Video",
        image: "https://img.youtube.com/vi/QuUecyAzKr8/hqdefault.jpg"
      },
      {
        id: "sa-2",
        title: "Interactive UI Feature Walkthrough",
        tag: "Feature Animation",
        image: "https://img.youtube.com/vi/QuUecyAzKr8/maxresdefault.jpg"
      },
      {
        id: "sa-3",
        title: "Isometric Cloud Dashboard Model",
        tag: "3D Product Render",
        image: projectUiuxWebProof
      }
    ],
    challenge: "Explaining sophisticated multi-tier cloud software without boring prospective enterprise buyers with static screenshots or long text.",
    solution: "Created an immersive 3D animation breaking down UI micro-interactions, isometric workflow illustrations, and kinetic feature highlights synchronized to modern ambient audio.",
    deliverables: ["3D UI Interactions", "SaaS Feature Walkthrough", "Isometric UI Perspectives", "Custom Kinetic Icons & Audio Mix"],
    client: "NextGen SaaS Cloud Platform",
    timeline: "3 Weeks"
  },

  // --- BRAND IDENTITY ---
  {
    id: 4,
    title: "Cuddle Care",
    category: "Brand Identity",
    tag: "brand-identity",
    metric: "+240%",
    metricLabel: "Brand Recall Uplift",
    description: "Holistic visual identity & brand system for modern parental wellness products.",
    image: projectBrandIdentityProof,
    proofImages: [
      {
        id: "cc-1",
        title: "Travertine Stone Brand Suite",
        tag: "Master Identity Suite",
        image: projectBrandIdentityProof
      },
      {
        id: "cc-2",
        title: "Vector Logomark & Grid Architecture",
        tag: "Logo Architecture",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "cc-3",
        title: "Letterpress Stationery & Packaging",
        tag: "Luxury Collateral",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    challenge: "The baby care market is flooded with generic pastel designs that lack premium credibility and emotional resonance.",
    solution: "We engineered a warm, typographic logomark combined with an earthy, gender-neutral color system and tactile packaging guidelines.",
    deliverables: ["Visual Identity System", "Custom Monogram", "Guidelines Book", "Eco-friendly Packaging"],
    client: "Cuddle Care Inc. (London)",
    timeline: "3 Weeks"
  },
  {
    id: 5,
    title: "Aura Pay & NeoCard",
    category: "Brand Identity",
    tag: "brand-identity",
    metric: "+310%",
    metricLabel: "Brand Valuation Uplift",
    description: "Sovereign global fintech identity, modernist geometric wordmark, matte-black metallic card specs, and executive design tokens.",
    image: brandIdentityProof2,
    proofImages: [
      {
        id: "ap-1",
        title: "Matte-Black Metal FinTech Card & Hologram",
        tag: "Fintech Card Engineering",
        image: brandIdentityProof2
      },
      {
        id: "ap-2",
        title: "Geometric Monogram Grid & Ratio Guide",
        tag: "Vector Logo Architecture",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "ap-3",
        title: "Executive Iridescent Stationery & Folders",
        tag: "Luxury Corporate Suite",
        image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    challenge: "Legacy banking visuals failed to convey the security and high-net-worth exclusivity required by next-generation cross-border entrepreneurs.",
    solution: "Engineered a razor-sharp modernist monogram, laser-etched stainless steel card specifications with holographic anti-counterfeit foils, and an authoritative dark-mode corporate design language.",
    deliverables: ["Bespoke Logomark Architecture", "Matte-Black Metal Card Specs", "Dark-Mode Brand Standards", "Executive Stationery Suite"],
    client: "Aura Financial Group (Singapore & Zurich)",
    timeline: "4 Weeks"
  },
  {
    id: 6,
    title: "Verve Architectural Atelier",
    category: "Brand Identity",
    tag: "brand-identity",
    metric: "+180%",
    metricLabel: "High-Ticket Inbound Inquiries",
    description: "Haute-couture spatial design identity, monolithic typography, blind-debossed letterpress stationery, and travertine-inspired branding.",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop",
    proofImages: [
      {
        id: "va-1",
        title: "Travertine Identity Book & Blind Deboss",
        tag: "Editorial Brand System",
        image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "va-2",
        title: "Tactile Heavyweight Cotton Stationery",
        tag: "Letterpress Collateral",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "va-3",
        title: "Architectural Bronze Wayfinding & Monogram",
        tag: "Spatial Signage Specs",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    challenge: "An internationally acclaimed interior architecture studio needed an uncompromising identity that mirrored the natural stone restraint and spatial scale of their physical work.",
    solution: "Crafted a neoclassical high-contrast serif wordmark, custom blind-debossed letterpress business suites on 700gsm cotton stock, and architectural bronze signage standards.",
    deliverables: ["Editorial Brand Identity", "Blind Deboss Stationery", "Architectural Signage Wayfinding", "Monogram Vector System"],
    client: "Verve Atelier (Milano & New York)",
    timeline: "3.5 Weeks"
  },
  {
    id: 7,
    title: "Aether Robotics Systems",
    category: "Brand Identity",
    tag: "brand-identity",
    metric: "+265%",
    metricLabel: "Enterprise Deal Velocity",
    description: "Cybernetic visual identity, precision hardware badges, custom monospace typography, and enterprise industrial brand guidelines.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
    proofImages: [
      {
        id: "ar-1",
        title: "Anodized Aluminum Hardware Badges & Grid",
        tag: "Industrial Hardware Branding",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "ar-2",
        title: "Kinetic Vector Monogram Architecture",
        tag: "Logo Geometry",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "ar-3",
        title: "Deep-Tech Brand Manual & Guidelines",
        tag: "Enterprise Brand Suite",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    challenge: "Cutting-edge autonomous robotics startup needed an industrial identity commanding immediate enterprise trust among Fortune 500 supply chain leaders.",
    solution: "Developed a precision vector geometric mark, anodized aluminum hardware badge specs, high-contrast monospace typographic scale, and technical brand manuals.",
    deliverables: ["Kinetic Brand Mark", "Hardware Laser-Etched Badges", "Design Token Guidelines", "Enterprise Pitch Architecture"],
    client: "Aether Dynamics (Tokyo & Boston)",
    timeline: "4 Weeks"
  },
  {
    id: 8,
    title: "Moringa Organic Elixirs",
    category: "Brand Identity",
    tag: "brand-identity",
    metric: "+210%",
    metricLabel: "DTC First-Month Sales",
    description: "Clean organic branding and high-energy DTC launch strategy for superfood wellness beverages.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
    proofImages: [
      {
        id: "mo-1",
        title: "Botanical Can Packaging System",
        tag: "DTC Packaging Suite",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "mo-2",
        title: "Organic Palette & Typography System",
        tag: "Brand Architecture",
        image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "mo-3",
        title: "Minimalist Retail Display Bottles",
        tag: "Retail Display Mockups",
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    challenge: "Standing out in health food stores while conveying verified organic certifications without appearing clinical or drab.",
    solution: "Designed vibrant minimalist typography, vivid fruit botanical palettes, and lifestyle marketing collateral that doubled retail sell-through.",
    deliverables: ["Can Packaging System", "E-Commerce Shopify Theme", "Social Launch Campaign", "Merch Designs"],
    client: "Moringa Life (Melbourne)",
    timeline: "3.5 Weeks"
  },

  // --- WEB & UI/UX DESIGN ---
  {
    id: 9,
    title: "Wive Digital Platform",
    category: "Web & UI/UX Design",
    tag: "web-design",
    metric: "+185%",
    metricLabel: "Free-to-Paid Conversion",
    description: "Intuitive SaaS interface and design system for next-gen collaboration and real-time team synchronization.",
    image: projectUiuxWebProof,
    proofImages: [
      {
        id: "wv-1",
        title: "Dark-Mode Cloud Analytics Dashboard",
        tag: "SaaS Dashboard Platform",
        image: projectUiuxWebProof
      },
      {
        id: "wv-2",
        title: "Mobile App Flow & Micro-Interactions",
        tag: "Mobile UX Flow",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "wv-3",
        title: "Atomic UI Tokens & Component System",
        tag: "Design System",
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    challenge: "Complex product workflows were causing high churn during user onboarding and free trial conversions.",
    solution: "Redesigned the entire onboarding flow with streamlined micro-interactions, responsive typography, and a dark-mode first design system.",
    deliverables: ["Full SaaS UI/UX Suite", "Design Tokens & Components", "Interactive Prototypes", "Developer Specifications"],
    client: "Wive Workspace (Berlin)",
    timeline: "5 Weeks"
  },
  {
    id: 10,
    title: "Zenith AI Copilot Workspace",
    category: "Web & UI/UX Design",
    tag: "web-design",
    metric: "+215%",
    metricLabel: "Daily Active User Retention",
    description: "Next-gen enterprise generative AI workspace, infinite multi-window canvas interface, interactive node graph UI, and Figma token system.",
    image: uiuxDesignProof2,
    proofImages: [
      {
        id: "zc-1",
        title: "Dark-Mode Infinite AI Canvas Interface",
        tag: "SaaS Canvas Interface",
        image: uiuxDesignProof2
      },
      {
        id: "zc-2",
        title: "Interactive Node Editor & Micro-Interactions",
        tag: "Workflow Architecture",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "zc-3",
        title: "Design Tokens & Atomic Component Library",
        tag: "Design System Tokens",
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    challenge: "Complex AI model chains and multi-modal prompt workflows overwhelmed power users with cluttered panels and high cognitive load.",
    solution: "Architected a fluid infinite canvas with snap-to-grid nodes, keyboard-driven command palette, contextual floating inspectors, and dark-mode glassmorphic styling.",
    deliverables: ["Infinite Canvas Interface", "Multi-Window Dock System", "250+ Figma Atomic Tokens", "WCAG AAA Micro-Interactions"],
    client: "Zenith Cognitive Systems (San Francisco)",
    timeline: "5 Weeks"
  },
  {
    id: 11,
    title: "Kroma Pay Neobank & Mobile OS",
    category: "Web & UI/UX Design",
    tag: "web-design",
    metric: "+195%",
    metricLabel: "Onboarding Flow Completion",
    description: "Ultra-fluid iOS & Android banking suite, biometric vault flows, interactive investment switchers, and dark-glass financial charts.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop",
    proofImages: [
      {
        id: "kp-1",
        title: "Glassmorphic Mobile Neobank App UI",
        tag: "Mobile App Suite",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "kp-2",
        title: "Interactive Asset Analytics & Chart Flows",
        tag: "Financial Dashboard",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "kp-3",
        title: "KYC Onboarding & Biometrics UX Flow",
        tag: "UX Architecture",
        image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    challenge: "Traditional mobile finance applications suffered high drop-off rates during multi-step KYC verification and multi-currency exchange.",
    solution: "Designed a 3-tap verification flow with haptic feedback, real-time interactive balance curves, custom gesture navigation, and biometric authorization.",
    deliverables: ["Native Mobile iOS/Android UX", "Biometric Vault Flows", "Interactive Investment Charting", "High-Converting Web Lander"],
    client: "Kroma Financial Group (London)",
    timeline: "4.5 Weeks"
  },
  {
    id: 12,
    title: "PulseHealth Clinical Platform",
    category: "Web & UI/UX Design",
    tag: "web-design",
    metric: "-42%",
    metricLabel: "Patient Booking & Intake Time",
    description: "HIPAA-compliant telehealth & clinical diagnostics web platform, responsive practitioner consultation portals, and real-time scheduling.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    proofImages: [
      {
        id: "ph-1",
        title: "Clinical Telehealth Diagnostics Portal",
        tag: "Clinical Web Platform",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "ph-2",
        title: "Real-Time Patient Timeline & Intake Charts",
        tag: "Health Data Visuals",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "ph-3",
        title: "Cross-Device Patient Consultation UX",
        tag: "Responsive Web App",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    challenge: "Healthcare practitioners wasted hours daily navigating clunky legacy EHR systems while patients abandoned cumbersome intake forms.",
    solution: "Built a human-centric clinical portal with color-coded diagnostic timelines, one-click telehealth launch, automated triage questionnaires, and high-contrast typography.",
    deliverables: ["Practitioner Clinical Portal", "Patient Telehealth Web App", "HIPAA-Compliant Design System", "Interactive Intake Flow"],
    client: "PulseHealth HealthTech (Stockholm)",
    timeline: "4 Weeks"
  },

  // --- PACKAGING & ASSETS ---
  {
    id: 13,
    title: "King Almond Confections",
    category: "Packaging & Assets",
    tag: "packaging",
    metric: "+35%",
    metricLabel: "Retail Shelf Velocity Boost",
    description: "Artisanal confectionery packaging with gold-foil accents and bespoke illustrations.",
    image: projectPackagingLuxuryProof,
    proofImages: [
      {
        id: "ka-1",
        title: "Rigid Gold-Foil Embossed Gift Box",
        tag: "Luxury Rigid Packaging",
        image: projectPackagingLuxuryProof
      },
      {
        id: "ka-2",
        title: "Botanical Labeling & Die-Line Specs",
        tag: "Die-Cut Print Specs",
        image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "ka-3",
        title: "Retail Presentation & Unboxing Flow",
        tag: "Retail Shelf Experience",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    challenge: "Securing placement in upscale specialty grocery stores required luxury aesthetic elevation.",
    solution: "Constructed rigid box structures with metallic foil stamping and custom botanical illustrations depicting orchard harvests.",
    deliverables: ["Die-Line Engineering", "Foil Stamping Specs", "Barcode & FDA Layouts", "Retail Display Units"],
    client: "King Almond Foods (Dubai)",
    timeline: "4 Weeks"
  },
  {
    id: 14,
    title: "Nordic Botanical Roasters",
    category: "Packaging & Assets",
    tag: "packaging",
    metric: "+160%",
    metricLabel: "Specialty Retail Placement",
    description: "Artisanal single-origin coffee packaging with matte cylinder canisters, holographic roast profile labels, and sensory unboxing cards.",
    image: packagingMotionProof2,
    proofImages: [
      {
        id: "nr-1",
        title: "Matte-Black Aluminum Canister & Hologram",
        tag: "Artisanal Canister Suite",
        image: packagingMotionProof2
      },
      {
        id: "nr-2",
        title: "Botanical Tasting Cards & Die-Cut Specs",
        tag: "Die-Cut Print Specs",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "nr-3",
        title: "Retail Boutique Shelf POS Display",
        tag: "Retail Presentation",
        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    challenge: "Entering competitive specialty Scandinavian grocery and boutique cafes required an unboxing experience that justified super-premium price points.",
    solution: "Engineered airtight matte-black aluminum canisters sealed with holographic diffraction tamper stickers, color-coded sensory altitude cards, and recyclable craft shippers.",
    deliverables: ["Matte Cylinder Tube Specs", "Holographic Roast Profile Labels", "Die-Cut Tasting Note Cards", "Retail Point-of-Sale Display"],
    client: "Nordic Botanical Roasters (Oslo)",
    timeline: "3.5 Weeks"
  },
  {
    id: 15,
    title: "Velvet Botanics Skincare",
    category: "Packaging & Assets",
    tag: "packaging",
    metric: "+88%",
    metricLabel: "Unboxing Social Share Rate",
    description: "Ultra-luxury amber glass cosmetics packaging, tactile debossed soft-touch cartons, sustainable sugarcane paper, and 3D CGI product renders.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop",
    proofImages: [
      {
        id: "vb-1",
        title: "Amber Glass Dropper & Tactile Outer Box",
        tag: "Luxury Cosmetic Packaging",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "vb-2",
        title: "FSC Sugarcane Embossed Carton Engineering",
        tag: "Sustainable Packaging Specs",
        image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "vb-3",
        title: "Photorealistic 3D CGI Product Renders",
        tag: "3D Digital Assets",
        image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    challenge: "Clean-beauty DTC brand needed packaging that conveyed botanical purity and pharmaceutical-grade potency without sterile clinical tropes.",
    solution: "Created custom amber apothecary dropper bottles with matte gold caps, housed in soft-touch embossed cartons crafted from FSC-certified sugarcane waste.",
    deliverables: ["Amber Glass Dropper Vials", "Tactile Embossed Cartons", "Sugarcane Bio-Paper Specs", "3D Product Renders & CGI Assets"],
    client: "Velvet Botanics Laboratories (Paris)",
    timeline: "4 Weeks"
  },
  {
    id: 16,
    title: "Vanguard Reserve 1888",
    category: "Packaging & Assets",
    tag: "packaging",
    metric: "+220%",
    metricLabel: "Collectors Reserve Sell-Out",
    description: "Small-batch craft bourbon whiskey packaging, heavy-bottomed fluted glass bottle, antiqued gold-foil letterpress label, and handcrafted wooden box.",
    image: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=1200&auto=format&fit=crop",
    proofImages: [
      {
        id: "vr-1",
        title: "Fluted Whiskey Bottle & Gold-Foil Label",
        tag: "Heritage Spirits Packaging",
        image: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "vr-2",
        title: "Wax-Dipped Cork & Engraved Neck Band",
        tag: "Bespoke Packaging Details",
        image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "vr-3",
        title: "Laser-Engraved Walnut Gift Box Case",
        tag: "Luxury Unboxing Experience",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    challenge: "A heritage small-batch distillery needed a celebratory 1888 reserve release package commanding $250+ bottle valuation among spirits collectors.",
    solution: "Engineered a bespoke fluted glass vessel, hand-numbered letterpress labels on cotton stock with multi-level embossing, crimson sealing wax, and a laser-engraved walnut presentation box.",
    deliverables: ["Fluted Glass Bottle Engineering", "Embossed Foil Neck Band", "Wax Dipped Cork Seal", "Wooden Keepsake Presentation Case"],
    client: "Vanguard Distilling Co. (Kentucky)",
    timeline: "4.5 Weeks"
  },

  // --- SOCIAL MEDIA MARKETING ---
  {
    id: 17,
    title: "NeoWear",
    category: "Social Media & Growth",
    tag: "social-media",
    metric: "4.2x",
    metricLabel: "Return on Ad Spend (ROAS)",
    description: "Paid social advertising sprint & viral content framework for luxury smart accessories.",
    image: projectSocialGrowthProof,
    proofImages: [
      {
        id: "nw-1",
        title: "Viral Mobile Reels & Carousel Grid",
        tag: "Campaign Creative Suite",
        image: projectSocialGrowthProof
      },
      {
        id: "nw-2",
        title: "3D Product Motion Hooks",
        tag: "3D Video Creatives",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "nw-3",
        title: "Performance Ad Split-Tests",
        tag: "Paid Social Decks",
        image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    challenge: "High customer acquisition costs on Meta and saturated competition in consumer wearable technology.",
    solution: "Designed high-contrast 3D motion hooks and direct-response carousel formats emphasizing craftsmanship and health sensors.",
    deliverables: ["Meta & TikTok Ad Suite", "3D Motion Renders", "High-Converting Landers", "Copywriting Playbook"],
    client: "NeoWear Tech (San Francisco)",
    timeline: "Ongoing Retainer"
  },
  {
    id: 18,
    title: "FutureTech Systems",
    category: "Social Media & Growth",
    tag: "social-media",
    metric: "+320k",
    metricLabel: "Organic Impressions / Mo",
    description: "Full-funnel digital branding and organic social media content architecture.",
    image: socialCampaignProof2,
    proofImages: [
      {
        id: "ft-1",
        title: "Thought-Leadership Carousel Decks",
        tag: "B2B Carousel Strategy",
        image: socialCampaignProof2
      },
      {
        id: "ft-2",
        title: "Deep-Tech Visual Identity & Renders",
        tag: "Tech Creative Suite",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "ft-3",
        title: "High-ROAS Ad Variations & Analytics",
        tag: "Growth Marketing",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
      }
    ],
    challenge: "Deep-tech B2B software often appears dry and inaccessible to prospective enterprise buyers.",
    solution: "Introduced dynamic infographic reels and thought-leadership carousels translating complex AI capabilities into clear business value.",
    deliverables: ["Monthly Content Retainer", "Data Visualizations", "LinkedIn Growth Sprints", "Video Reel Editing"],
    client: "FutureTech AI (Toronto)",
    timeline: "6 Month Campaign"
  }
];

export const portfolioCategories = [
  { id: 'all', label: 'All Works', count: projects.length },
  { id: 'brand-identity', label: 'Brand Identity', count: projects.filter(p => p.tag === 'brand-identity').length },
  { id: 'web-design', label: 'Web & UI/UX', count: projects.filter(p => p.tag === 'web-design').length },
  { id: 'packaging', label: 'Packaging & Assets', count: projects.filter(p => p.tag === 'packaging').length },
  { id: 'motion-animation', label: 'Motion & Animation', count: projects.filter(p => p.tag === 'motion-animation').length },
  { id: 'social-media', label: 'Social & Growth', count: projects.filter(p => p.tag === 'social-media').length }
];
