import React, { useState } from 'react';
import { 
  Download, 
  ExternalLink, 
  FolderCheck, 
  Copy, 
  Check, 
  Sparkles, 
  Search, 
  Layers, 
  Zap, 
  Film, 
  Type, 
  Sliders, 
  HardDrive, 
  ArrowRight, 
  Info,
  ChevronDown,
  ChevronUp,
  FileCode2,
  Clock,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface FreeToolsPageProps {
  onNavigate: (page: string, prefillService?: string, sectionId?: string) => void;
}

interface PluginItem {
  id: string;
  title: string;
  category: 'transitions' | 'color' | 'typography' | 'scripts';
  categoryLabel: string;
  version: string;
  format: string;
  fileSize: string;
  description: string;
  highlights: string[];
  installPath: {
    win: string;
    mac: string;
  };
  features: string[];
  popular?: boolean;
}

const DRIVE_FOLDER_URL = 'https://drive.google.com/drive/folders/10jFL2wQ8h23v3PWrLNUMqVprxfx9fUQb?usp=drive_link';

const pluginsList: PluginItem[] = [
  {
    id: 'seamless-transitions',
    title: 'Qarvion Seamless Transitions Suite',
    category: 'transitions',
    categoryLabel: 'Transitions & Zooms',
    version: 'v2.4',
    format: '.FFX Presets + .AEP Rig',
    fileSize: '42 MB',
    popular: true,
    description: 'Instant whip pans, smooth zoom-ins, directional pushes, and optical rotation wipes with mathematically curved easing curves built for high-retention reels.',
    highlights: [
      '14 pre-built dynamic motion transition presets',
      'Motion blur compensation & natural sub-frame shutter',
      '100% native AE effects — no third-party plugins required'
    ],
    installPath: {
      win: 'Documents\\Adobe\\After Effects <Version>\\User Presets\\Qarvion\\',
      mac: '~/Documents/Adobe/After Effects <Version>/User Presets/Qarvion/'
    },
    features: ['Zoom In/Out Curves', 'Whip Left/Right', 'Optical Twist', 'Glitch Push', '1080p & 4K Ready']
  },
  {
    id: 'film-emulation-lut',
    title: 'Cinematic 35mm Film Halation & Grain Matrix',
    category: 'color',
    categoryLabel: 'Color Science & LUTs',
    version: 'v1.8',
    format: '.AEP Project + .CUBE LUTs',
    fileSize: '88 MB',
    popular: true,
    description: 'Bespoke analog color matrix simulating Kodak 5207 stock with authentic red-channel edge halation, gate weave, and organic 35mm film grain overlays.',
    highlights: [
      'Authentic edge-halation rig with customizable luminance threshold',
      '6 curated editorial .CUBE LUTs for commercial and fashion reels',
      'Non-destructive adjustment layer workflow'
    ],
    installPath: {
      win: 'Program Files\\Adobe\\Common\\LUTs\\Creative\\',
      mac: '/Library/Application Support/Adobe/Common/LUTs/Creative/'
    },
    features: ['Kodak Tone Response', 'Edge Halation Rigger', 'Gate Weave Controller', 'Organic 4K Grain']
  },
  {
    id: 'kinetic-type-accelerator',
    title: 'Kinetic Type & Easing Accelerator',
    category: 'typography',
    categoryLabel: 'Kinetic Typography',
    version: 'v3.1',
    format: '.JSXBIN ScriptUI Panel',
    fileSize: '14 MB',
    popular: true,
    description: 'Dockable ScriptUI tool that rigs kinetic kinetic bounce, elastic overshoots, character stagger, and text-tracking snaps in a single click.',
    highlights: [
      'One-click overshoot & elastic spring expression generator',
      'Zero-keyframe procedural text animation',
      'Dockable ScriptUI panel compatible with AE 2022 through 2026'
    ],
    installPath: {
      win: 'Support Files\\Scripts\\ScriptUI Panels\\',
      mac: 'Scripts/ScriptUI Panels/'
    },
    features: ['Elastic Bounce', 'Stagger By Letter', 'Snap Tracking', 'Variable Weight Rigger']
  },
  {
    id: 'ae-clean-pipeline-script',
    title: 'Auto-Comp & Clean Pipeline Script',
    category: 'scripts',
    categoryLabel: 'Workflow Scripts',
    version: 'v2.0',
    format: '.JSX Script',
    fileSize: '6 MB',
    description: 'Production script that automatically structures your project bin into clean standard folders, purges unused assets, and creates optimized proxy toggles.',
    highlights: [
      'Standardizes messy project bins into 01_Comps, 02_Footage, 03_Audio',
      'One-click purge of duplicated comps and unused footage items',
      'Reduces RAM bloat and project load times by up to 40%'
    ],
    installPath: {
      win: 'Support Files\\Scripts\\ScriptUI Panels\\',
      mac: 'Scripts/ScriptUI Panels/'
    },
    features: ['Smart Auto-Folder Structure', 'Orphan Item Cleaner', 'Batch Proxy Switcher', 'Project Analyzer']
  },
  {
    id: 'handheld-camera-drift',
    title: 'Dynamic Handheld Camera & Drift Rig',
    category: 'transitions',
    categoryLabel: 'Transitions & Motion',
    version: 'v1.5',
    format: '.FFX Presets',
    fileSize: '18 MB',
    description: 'Procedural null camera controller simulating realistic documentary shoulder-mount shake, cinematic tripod drifting, and organic micro-jitters.',
    highlights: [
      'Frequency and amplitude controls on a single master slider',
      'Organic noise algorithms — eliminates repeating loop patterns',
      'Works with 2D comps, 3D camera layers, and adjustment layers'
    ],
    installPath: {
      win: 'Documents\\Adobe\\After Effects <Version>\\User Presets\\Qarvion\\',
      mac: '~/Documents/Adobe/After Effects <Version>/User Presets/Qarvion/'
    },
    features: ['Documentary Shoulder Shake', 'Subtle Drift', 'Action Cam Impact', 'Micro Jitter Sliders']
  },
  {
    id: 'chromatic-split-glitch',
    title: 'RGB Split & Analog Tape Distortion Module',
    category: 'color',
    categoryLabel: 'Distortion & FX',
    version: 'v2.2',
    format: '.FFX Presets + Texture Pack',
    fileSize: '65 MB',
    description: 'High-energy optical chromatic aberration, lens distortion, CRT scanline rastering, and magnetic tape glitch artifacts for modern trailer edits.',
    highlights: [
      'Independent Red, Green, and Blue channel offset controllers',
      'Custom glitch trigger via layer markers or audio peaks',
      'Includes 12 high-resolution 4K VHS and CRT scanline textures'
    ],
    installPath: {
      win: 'Documents\\Adobe\\After Effects <Version>\\User Presets\\Qarvion\\',
      mac: '~/Documents/Adobe/After Effects <Version>/User Presets/Qarvion/'
    },
    features: ['Prismatic RGB Offset', 'CRT Phosphor Scanlines', 'Tape Noise Emulation', 'Marker Triggered Glitch']
  }
];

const FreeToolsPage: React.FC<FreeToolsPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(DRIVE_FOLDER_URL);
    setCopiedLink(true);
    setTimeout(() => {
      setCopiedLink(false);
    }, 2400);
  };

  const filteredPlugins = pluginsList.filter((plugin) => {
    const matchesCategory = activeCategory === 'all' || plugin.category === activeCategory;
    const matchesSearch = 
      plugin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plugin.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-16 sm:pt-36 pb-12 sm:pb-32 bg-[#050505] text-white min-h-screen relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div 
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#00D2FF]/10 via-[#3A7BD5]/5 to-transparent blur-[140px] pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="container mx-auto px-3.5 sm:px-6 md:px-12 max-w-7xl">
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/[0.05] border border-white/10 mb-3 sm:mb-6 text-[10px] sm:text-xs font-mono font-medium tracking-wider text-[#00D2FF] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creative Resources · After Effects 2022–2026</span>
          </div>

          <h1 className="font-['Montserrat'] font-black text-2xl xs:text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.12] sm:leading-[1.1] mb-3 sm:mb-6 text-white">
            Motion Toolkit Vault & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#70A6FF] to-[#3A7BD5]">
              Free After Effects Plugins
            </span>
          </h1>

          <p className="text-xs sm:text-base md:text-lg text-white/70 leading-relaxed font-['Inter'] mb-4 sm:mb-8">
            Handcrafted by Qarvion's senior motion designers. Production-tested transition suites, 
            kinetic typography scripts, and analog color rigs built to accelerate your daily workflow. 
            Free for commercial and personal edits.
          </p>

          {/* Quick Unboxed Metadata */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-1.5 sm:gap-y-2 text-[11px] sm:text-sm text-white/50 font-mono">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00D2FF]" />
              <span>100% Free Forever</span>
            </div>
            <span aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00D2FF]" />
              <span>Commercial & Personal Use</span>
            </div>
            <span aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00D2FF]" />
              <span>Direct Google Drive Folder</span>
            </div>
          </div>
        </div>

        {/* Master Access Callout Banner */}
        <div className="relative mb-8 sm:mb-16 p-4 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0F1B38]/90 via-[#16213E]/60 to-[#0B132B]/90 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          <div 
            className="absolute -top-24 -right-24 w-72 h-72 bg-[#00D2FF]/15 rounded-full blur-[90px] pointer-events-none" 
            aria-hidden="true" 
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#00D2FF]">
                <FolderCheck className="w-4 h-4" />
                <span>Verified Cloud Drive Repository</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-['Montserrat'] text-white">
                Download the Complete After Effects Vault
              </h2>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed font-['Inter']">
                All 6 production toolkits, scripts, and preset packs are hosted in a high-speed, direct Google Drive folder. 
                Download individual packages or grab the entire library in one click without signing up or entering an email.
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-white/60 pt-1">
                <span>Folder Size: ~230 MB</span>
                <span aria-hidden="true">·</span>
                <span>Format: .FFX / .JSXBIN / .AEP</span>
                <span aria-hidden="true">·</span>
                <span>Updated: October 2026</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0 w-full sm:w-auto">
              <a
                href={DRIVE_FOLDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#3A7BD5] text-[#0B132B] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(0,210,255,0.4)] hover:shadow-[0_0_40px_rgba(0,210,255,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Access Google Drive Folder</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full sm:w-auto px-5 py-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-medium text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                title="Copy direct Google Drive folder link"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-white/70" />
                    <span>Copy Folder Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Segmented Filter Buttons (Buttons, not pills) */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/5 overflow-x-auto w-full md:w-auto">
            {[
              { id: 'all', label: 'All Toolkits' },
              { id: 'transitions', label: 'Transitions' },
              { id: 'color', label: 'Color & Looks' },
              { id: 'typography', label: 'Typography' },
              { id: 'scripts', label: 'Scripts' }
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#00D2FF] text-[#0B132B] font-bold shadow-[0_0_15px_rgba(0,210,255,0.35)]'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plugins & scripts..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#00D2FF]/60 focus:ring-1 focus:ring-[#00D2FF]/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Plugin Grid */}
        {filteredPlugins.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <Info className="w-8 h-8 text-white/40 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No matching tools found</h3>
            <p className="text-sm text-white/60 mb-4">
              Try searching for a different keyword or view the full Google Drive folder directly.
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-lg bg-white/10 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 mb-8 sm:mb-20">
            {filteredPlugins.map((plugin) => {
              const isExpanded = expandedCard === plugin.id;

              return (
                <div
                  key={plugin.id}
                  className="rounded-2xl bg-[#0B132B]/60 hover:bg-[#0F1B38]/80 border border-white/10 hover:border-[#00D2FF]/40 p-4 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] group relative overflow-hidden"
                >
                  {/* Category & Status Kicker */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-3">
                      <span className="text-[#00D2FF] font-semibold">{plugin.categoryLabel}</span>
                      <span>{plugin.version}</span>
                    </div>

                    <h3 className="text-xl font-bold font-['Montserrat'] text-white group-hover:text-[#00D2FF] transition-colors mb-2.5">
                      {plugin.title}
                    </h3>

                    {/* Unboxed Metadata with Dot Separators */}
                    <div className="flex items-center gap-2 text-xs text-white/50 font-mono mb-4">
                      <span>{plugin.format}</span>
                      <span aria-hidden="true">·</span>
                      <span>{plugin.fileSize}</span>
                    </div>

                    <p className="text-sm text-white/70 leading-relaxed font-['Inter'] mb-5">
                      {plugin.description}
                    </p>

                    {/* Key Highlights */}
                    <ul className="space-y-2 mb-6">
                      {plugin.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-white/80">
                          <Check className="w-3.5 h-3.5 text-[#00D2FF] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expandable Installation Path & Feature Tags */}
                  <div>
                    {isExpanded && (
                      <div className="mb-5 p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs font-mono space-y-2">
                        <div className="text-white/90 font-semibold mb-1">Installation Directory:</div>
                        <div className="text-white/60">
                          <span className="text-[#00D2FF]">Win:</span> {plugin.installPath.win}
                        </div>
                        <div className="text-white/60">
                          <span className="text-[#00D2FF]">Mac:</span> {plugin.installPath.mac}
                        </div>
                        <div className="pt-2 flex flex-wrap gap-1.5 border-t border-white/5 text-[11px] text-white/70">
                          {plugin.features.map((feat, idx) => (
                            <span key={idx} className="bg-white/5 px-2 py-0.5 rounded">
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                      <a
                        href={DRIVE_FOLDER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-[#00D2FF] text-white hover:text-[#0B132B] font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download via Drive</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => setExpandedCard(isExpanded ? null : plugin.id)}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs transition-colors cursor-pointer"
                        title={isExpanded ? "Hide install specs" : "Show install specs"}
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Installation Quick Guide Section */}
        <div className="mb-20 p-8 sm:p-12 rounded-3xl bg-[#0B132B]/70 border border-white/10">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-[#00D2FF] block mb-2">
              Setup Instructions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Montserrat'] text-white mb-3">
              How to Install in Adobe After Effects
            </h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-['Inter']">
              All tools use native After Effects architecture. Follow these 3 simple steps to load them into your workspace in under 60 seconds:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#00D2FF]/20 text-[#00D2FF] font-mono font-bold flex items-center justify-center text-sm">
                01
              </div>
              <h3 className="font-bold text-white text-base">Download & Extract</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Open the Google Drive folder and download the .ZIP or standalone .FFX / .JSXBIN files to your local drive.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#00D2FF]/20 text-[#00D2FF] font-mono font-bold flex items-center justify-center text-sm">
                02
              </div>
              <h3 className="font-bold text-white text-base">Paste in Adobe Folders</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Move presets to your <code className="text-[#00D2FF]">User Presets</code> directory, and dockable scripts to <code className="text-[#00D2FF]">ScriptUI Panels</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#00D2FF]/20 text-[#00D2FF] font-mono font-bold flex items-center justify-center text-sm">
                03
              </div>
              <h3 className="font-bold text-white text-base">Enable Script Access</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                In AE, open <code className="text-[#00D2FF]">Preferences &gt; Scripting &amp; Expressions</code> and check "Allow Scripts to Write Files and Access Network". Restart AE.
              </p>
            </div>
          </div>

          {/* Directory Cheatsheet Box */}
          <div className="p-4 sm:p-5 rounded-xl bg-black/50 border border-white/10 font-mono text-xs space-y-2">
            <div className="flex items-center gap-2 text-[#00D2FF] font-semibold text-xs mb-1">
              <FileCode2 className="w-4 h-4" />
              <span>Standard After Effects File Paths:</span>
            </div>
            <div className="text-white/75 truncate">
              <span className="text-white/40">Windows Presets:</span> C:\Users\&lt;You&gt;\Documents\Adobe\After Effects &lt;Version&gt;\User Presets
            </div>
            <div className="text-white/75 truncate">
              <span className="text-white/40">Windows Scripts:</span> C:\Program Files\Adobe\Adobe After Effects &lt;Version&gt;\Support Files\Scripts\ScriptUI Panels
            </div>
            <div className="text-white/75 truncate">
              <span className="text-white/40">macOS Presets:</span> ~/Documents/Adobe/After Effects &lt;Version&gt;/User Presets
            </div>
            <div className="text-white/75 truncate">
              <span className="text-white/40">macOS Scripts:</span> /Applications/Adobe After Effects &lt;Version&gt;/Scripts/ScriptUI Panels
            </div>
          </div>
        </div>

        {/* Agency Studio Brief CTA */}
        <div className="text-center p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#16213E] to-[#0B132B] border border-white/10 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00D2FF]">
              Bespoke Agency Production
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-['Montserrat'] text-white">
              Need Custom 3D Motion Graphics or Full Brand Identity?
            </h2>
            <p className="text-sm sm:text-base text-white/75 leading-relaxed font-['Inter']">
              While our free plugins speed up individual shots, Qarvion engineers end-to-end commercial campaigns, 
              viral SaaS launch films, and complete brand identity systems for global founders.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#00D2FF] hover:bg-[#3A7BD5] text-[#0B132B] hover:text-white font-extrabold text-sm sm:text-base transition-all duration-300 shadow-[0_0_25px_rgba(0,210,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Submit Your Project Brief</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('works')}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-medium text-sm transition-all cursor-pointer"
              >
                View Case Studies & Works
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeToolsPage;
