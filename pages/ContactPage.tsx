import React, { useState, useEffect } from 'react';
import { LogoIcon } from '../components/Logo';
import { 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Send, 
  Check, 
  Copy, 
  ExternalLink,
  MessageCircle,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { saveBrief, sendBriefToEmail, isValidEmail, ProjectBrief } from '../utils/inquiries';
import { SuccessToast } from '../components/SuccessToast';

interface ContactPageProps {
  initialService?: string;
  onNavigate: (page: string) => void;
}

const serviceTags = [
  'Brand Identity',
  'Motion & 3D',
  'Reels & Video Editing',
  'Web & UI/UX',
  'Social Media Growth',
  'Packaging Design'
];

const budgetRanges = [
  '< $100',
  '$100 – $250',
  '$250 – $500',
  '$500+'
];

const faqs = [
  {
    q: 'How quickly will Qarvion respond to my inquiry?',
    a: 'Every inquiry is reviewed directly by our founders and creative directors within 24 business hours. We reply with initial thoughts, scope alignment, and scheduling options.'
  },
  {
    q: 'Can we combine multiple services into a single sprint?',
    a: 'Yes. Many clients combine Brand Identity with Reels Editing and UI/UX design. We structure multidisciplinary projects into clear milestones with cohesive art direction.'
  },
  {
    q: 'Do I own all source files and commercial intellectual property?',
    a: '100%. Upon completion and sign-off, you receive full commercial IP ownership, open vector files (AI, SVG, EPS), Figma workspaces, and editable project assets with zero ongoing licensing fees.'
  },
  {
    q: 'How does communication work during the project?',
    a: 'We keep communication direct and transparent via WhatsApp, Slack, or Google Meet, alongside collaborative Figma boards so you can track progress in real time.'
  }
];

export const ContactPage: React.FC<ContactPageProps> = ({ initialService, onNavigate }) => {
  const mapInitialService = (svc?: string) => {
    if (!svc) return ['Brand Identity'];
    if (svc.includes('Brand')) return ['Brand Identity'];
    if (svc.includes('3D') || svc.includes('Motion')) return ['Motion & 3D'];
    if (svc.includes('Reels') || svc.includes('Video')) return ['Reels & Video Editing'];
    if (svc.includes('UI') || svc.includes('Web') || svc.includes('Digital')) return ['Web & UI/UX'];
    if (svc.includes('Social') || svc.includes('Ads') || svc.includes('Paid')) return ['Social Media Growth'];
    if (svc.includes('Packaging') || svc.includes('Print')) return ['Packaging Design'];
    return ['Brand Identity'];
  };

  const [selectedServices, setSelectedServices] = useState<string[]>(() => mapInitialService(initialService));
  const [selectedBudget, setSelectedBudget] = useState<string>('$100 – $250');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    details: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [submittedBrief, setSubmittedBrief] = useState<ProjectBrief | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [botTrap, setBotTrap] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [dhakaTime, setDhakaTime] = useState('');

  // Live Studio Clock (Dhaka Time GMT+6)
  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        setDhakaTime(formatter.format(new Date()));
      } catch {
        setDhakaTime('');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (initialService) {
      const mapped = mapInitialService(initialService);
      setSelectedServices(mapped);
    }
  }, [initialService]);

  const toggleService = (tag: string) => {
    setSelectedServices(prev => {
      if (prev.includes(tag)) {
        if (prev.length === 1) return prev; // keep at least one
        return prev.filter(t => t !== tag);
      }
      return [...prev, tag];
    });
  };

  const copyPhone = () => {
    navigator.clipboard.writeText('+8801725129901');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (botTrap) {
      setIsSuccess(true);
      return;
    }

    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim();
    const cleanDetails = formData.details.trim();

    if (!cleanName || !cleanEmail || !cleanDetails) {
      setFormError('Please provide your name, email, and project details.');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const briefPayload = {
        name: cleanName,
        email: cleanEmail,
        company: formData.company.trim() || undefined,
        services: selectedServices,
        budget: selectedBudget,
        timeline: '2-4 Weeks',
        details: `${cleanDetails}${formData.phone ? `\n\n[Client Phone/WhatsApp: ${formData.phone.trim()}]` : ''}`,
        source: 'contact-page' as const
      };

      const saved = saveBrief(briefPayload);
      const result = await sendBriefToEmail(saved);

      if (!result.success) {
        console.warn('Project inquiry email submission failed:', result.error);
        setFormError('We could not send your inquiry. Please try again or email qarviontech@gmail.com directly.');
        return;
      }

      setSubmittedBrief(saved);
      setIsSuccess(true);
      setShowToast(true);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    } catch (error) {
      console.error('Unexpected project inquiry submission error:', error);
      setFormError('We could not send your inquiry. Please try again or email qarviontech@gmail.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppUrl = () => {
    const text = `Hi Qarvion! I'm ${formData.name || 'reaching out'} regarding ${selectedServices.join(', ')} (budget: ${selectedBudget}). Let's talk!`;
    return `https://wa.me/8801725129901?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="pt-16 sm:pt-28 pb-8 sm:pb-24 text-white">
      <div className="container mx-auto px-3.5 sm:px-6 md:px-12 max-w-6xl">
        
        {/* Page Header (Desktop PC View) */}
        <div className="hidden lg:block max-w-2xl mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#00D2FF] mb-3">
            Contact & Inquiries
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold font-['Montserrat'] tracking-tight leading-[1.1] mb-4">
            Let's talk about your project.
          </h1>
          <p className="text-white/60 text-base font-['Inter'] leading-relaxed">
            Tell us about your brand vision, requirements, or upcoming launch. Every message is reviewed directly by our studio team within 24 hours.
          </p>
        </div>

        {/* 2-Column Clean Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-start">
          
          {/* Direct Studio Channels & Info: order-2 on mobile (shown after Project Brief), order-1 on PC (left 5 cols) */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-8 order-2 lg:order-1 w-full pt-4 lg:pt-0 border-t border-white/10 lg:border-t-0">
            
            {/* Mobile Header: "Let's talk about your project." shown AFTER Project Brief on mobile */}
            <div className="lg:hidden space-y-1 mb-2">
              <div className="text-[10px] font-semibold tracking-wider uppercase text-[#00D2FF]">
                Direct Channels & Studio Info
              </div>
              <h2 className="text-xl xs:text-2xl font-extrabold font-['Montserrat'] text-white tracking-tight leading-tight">
                Let's talk about your project.
              </h2>
              <p className="text-white/60 text-xs font-['Inter'] leading-relaxed">
                Prefer direct communication? Reach our founders and creative directors through official studio channels or WhatsApp.
              </p>
            </div>
            
            {/* Direct Channels */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-white/40">
                Direct Channels
              </div>
              
              <div className="space-y-3">
                {/* Email */}
                <div className="group">
                  <div className="text-[11px] text-white/50 mb-0.5">Email the studio</div>
                  <a 
                    href="mailto:qarviontech@gmail.com"
                    className="text-white hover:text-[#00D2FF] font-medium text-sm sm:text-base transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>qarviontech@gmail.com</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="group">
                  <div className="text-[11px] text-white/50 mb-0.5">Direct phone & WhatsApp</div>
                  <div className="flex items-center gap-2">
                    <a 
                      href="https://wa.me/8801725129901"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-emerald-400 font-medium text-sm sm:text-base transition-colors"
                    >
                      +880 1725-129901
                    </a>
                    <button
                      type="button"
                      onClick={copyPhone}
                      className="p-1 rounded text-white/40 hover:text-white transition-colors cursor-pointer"
                      title="Copy phone number"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Location & Time */}
                <div>
                  <div className="text-[11px] text-white/50 mb-0.5">Location & timezone</div>
                  <div className="text-white text-xs sm:text-sm font-medium">
                    Dhaka, Bangladesh · Global Remote
                  </div>
                  {dhakaTime && (
                    <div className="text-[11px] text-white/50 mt-0.5 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#00D2FF]" />
                      <span>{dhakaTime} local time (GMT+6)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <MessageCircle className="w-4 h-4" />
                <span>Prefer a quick conversation?</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed font-['Inter']">
                Start a direct chat with our founders on WhatsApp for instant feedback, questions, or ballpark scope estimates.
              </p>
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-black font-bold text-xs transition-all border border-emerald-500/30"
              >
                <span>Chat on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quality Standard */}
            <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs text-white/60">
              <div className="text-[11px] font-bold uppercase tracking-wider text-white/40">Our Commitment</div>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2 text-white/70">
                  <span className="text-[#00D2FF]">·</span>
                  <span>Guaranteed 24-hour turnaround on inquiries</span>
                </li>
                <li className="flex items-center gap-2 text-white/70">
                  <span className="text-[#00D2FF]">·</span>
                  <span>100% vector master files & commercial IP ownership</span>
                </li>
                <li className="flex items-center gap-2 text-white/70">
                  <span className="text-[#00D2FF]">·</span>
                  <span>Transparent milestone-based pricing</span>
                </li>
                <li className="flex items-center gap-2 text-white/70">
                  <span className="text-[#00D2FF]">·</span>
                  <span>Strict confidentiality & NDA protection</span>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="pt-2 border-t border-white/10">
              <div className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-2">Connect</div>
              <div className="flex items-center gap-3">
                <a 
                  href="https://www.facebook.com/Qarvion" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-white/60 hover:text-[#00D2FF] transition-colors"
                >
                  Facebook
                </a>
                <span className="text-white/20">·</span>
                <a 
                  href="https://x.com/Qarvion" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-white/60 hover:text-[#00D2FF] transition-colors"
                >
                  X (Twitter)
                </a>
                <span className="text-white/20">·</span>
                <a 
                  href="https://www.behance.net/murshiduzzaman" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-white/60 hover:text-[#00D2FF] transition-colors"
                >
                  Behance
                </a>
                <span className="text-white/20">·</span>
                <a 
                  href="https://www.pinterest.com/murshiduzzamanDm/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-white/60 hover:text-[#00D2FF] transition-colors"
                >
                  Pinterest
                </a>
              </div>
            </div>

          </div>

          {/* Project Brief Inquiry Form: order-1 on mobile (shown FIRST), order-2 on PC (right 7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2 w-full">
            
            {/* Mobile Header for Project Brief (shown FIRST in mobile view) */}
            <div className="lg:hidden mb-3.5 space-y-1">
              <div className="text-[10px] font-semibold tracking-wider uppercase text-[#00D2FF]">
                Start Your Project
              </div>
              <h1 className="text-2xl xs:text-3xl font-extrabold font-['Montserrat'] text-white tracking-tight leading-tight">
                Project Brief
              </h1>
              <p className="text-white/60 text-xs font-['Inter'] leading-relaxed">
                Tell us about your brand vision, requirements, or upcoming launch. Every message is reviewed directly by our studio team within 24 hours.
              </p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl bg-[#080E21] border border-white/10 p-3.5 sm:p-8 md:p-10 shadow-2xl">
              
              {isSuccess ? (
                /* Success View - Serene & Direct */
                <div className="py-6 sm:py-12 text-center space-y-4 sm:space-y-5 animate-in fade-in duration-300">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>

                  <div className="space-y-1.5 sm:space-y-2 max-w-md mx-auto">
                    <h3 className="text-lg sm:text-2xl font-bold font-['Montserrat'] text-white">
                      Inquiry received.
                    </h3>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-['Inter']">
                      Thank you, <strong className="text-white">{formData.name}</strong>. We've received your note and will review it with our creative team. Expect a response at <span className="text-[#00D2FF] font-medium">{formData.email}</span> within 24 hours.
                    </p>
                  </div>

                  <div className="pt-2 sm:pt-3 flex flex-wrap justify-center gap-2.5 sm:gap-3">
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => onNavigate('works')}
                      className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
                    >
                      <span>Explore Our Works</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({ name: '', email: '', phone: '', company: '', details: '' });
                      }}
                      className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-white/50 hover:text-white text-xs transition-colors"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* The Clean Form */
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-7">
                  
                  {/* Honeypot for bots */}
                  <input
                    type="text"
                    name="bot_field_trap"
                    value={botTrap}
                    onChange={(e) => setBotTrap(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden opacity-0 absolute -z-50 pointer-events-none"
                    aria-hidden="true"
                  />

                  {formError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
                      {formError}
                    </div>
                  )}

                  {/* 1. Services Interests */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-semibold text-white/70">
                      What can we help you build?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {serviceTags.map((tag) => {
                        const isSelected = selectedServices.includes(tag);
                        return (
                          <button
                            type="button"
                            key={tag}
                            onClick={() => toggleService(tag)}
                            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-[#00D2FF] text-[#080E21] font-semibold border-[#00D2FF] shadow-[0_0_15px_rgba(0,210,255,0.25)]'
                                : 'bg-white/[0.04] text-white/70 border-white/10 hover:bg-white/[0.08] hover:text-white'
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Budget Segment */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-semibold text-white/70">
                      Approximate budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetRanges.map((range) => {
                        const isSelected = selectedBudget === range;
                        return (
                          <button
                            type="button"
                            key={range}
                            onClick={() => setSelectedBudget(range)}
                            className={`py-2 px-3 rounded-xl text-xs font-medium transition-all text-center border cursor-pointer ${
                              isSelected
                                ? 'bg-white text-[#080E21] font-bold border-white shadow-sm'
                                : 'bg-white/[0.04] text-white/70 border-white/10 hover:bg-white/[0.08] hover:text-white'
                            }`}
                          >
                            {range}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Contact Coordinates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-white/70">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/25 text-xs sm:text-sm focus:outline-none focus:border-[#00D2FF] transition-colors font-['Inter']"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-white/70">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        maxLength={120}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/25 text-xs sm:text-sm focus:outline-none focus:border-[#00D2FF] transition-colors font-['Inter']"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-white/70">
                        WhatsApp / Phone <span className="text-white/30 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        maxLength={50}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 555-0199 or WhatsApp number"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/25 text-xs sm:text-sm focus:outline-none focus:border-[#00D2FF] transition-colors font-['Inter']"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-white/70">
                        Company or Project <span className="text-white/30 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        maxLength={100}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Inc. / Personal Brand"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/25 text-xs sm:text-sm focus:outline-none focus:border-[#00D2FF] transition-colors font-['Inter']"
                      />
                    </div>
                  </div>

                  {/* 4. Project Vision & Goals */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-white/70">
                      Tell us about your project *
                    </label>
                    <textarea
                      required
                      maxLength={3000}
                      rows={4}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="What are your goals, timeline, key deliverables, or links to references..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/25 text-xs sm:text-sm focus:outline-none focus:border-[#00D2FF] transition-colors font-['Inter'] resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#00D2FF] text-[#080E21] font-bold text-xs sm:text-sm hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg active:scale-98"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#080E21] border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Inquiry</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-white/40 text-center mt-2.5">
                      Direct review by creative directors · 24-hour turnaround · Strictly confidential
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

        {/* Quiet, Minimalist FAQ Accordion */}
        <div className="mt-16 sm:mt-24 pt-10 sm:pt-14 border-t border-white/10 max-w-3xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold font-['Montserrat'] text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={faq.q}
                  className="rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-white/90 font-['Inter']">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${isOpen ? 'rotate-180 text-[#00D2FF]' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-white/60 font-['Inter'] leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <SuccessToast
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        clientName={submittedBrief?.name || formData.name}
        title="Inquiry Sent"
        message={`Thank you, ${submittedBrief?.name || formData.name}. We will review your message and reply within 24 hours.`}
      />
    </div>
  );
};

export default ContactPage;
