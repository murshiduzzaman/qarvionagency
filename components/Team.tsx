import React, { useEffect, useRef, useState } from 'react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  isFounder?: boolean;
  isPlaceholder?: boolean;
  socials?: {
    fb?: string;
    pinterest?: string;
    behance?: string;
    x?: string;
    ig?: string;
    email?: string;
  };
}

const team: TeamMember[] = [
  {
    id: 1,
    name: "Murshiduzzaman",
    role: "Founder & Creative Director",
    bio: "Founder, lead brand architect, and motion director. With 8+ years leading creative strategy, vector identity systems, 3D motion graphics, and UI/UX product engineering, Murshiduzzaman has directed 170+ high-impact digital systems for startups, venture platforms, and global brands.",
    image: "/Murshiduzzaman.png",
    isFounder: true,
    socials: {
      fb: "https://www.facebook.com/Qarvion",
      x: "https://x.com/Qarvion",
      pinterest: "https://www.pinterest.com/murshiduzzamanDm/",
      behance: "https://www.behance.net/murshiduzzaman",
      email: "mailto:qarviontech@gmail.com"
    }
  },
  {
    id: 2,
    name: "Tanjina Akter",
    role: "Creative Lead & Visual Identity",
    bio: "Translating brand values into high-impact visual identity systems, typography standards, and iconic brand marks.",
    image: "/images/team-member-2.png",
    isPlaceholder: false,
    socials: {
      behance: "https://www.behance.net/tanjinaakter38",
      ig: "https://www.instagram.com/designer_tanjina/"
    }
  },
  {
    id: 3,
    name: "Growth Strategist",
    role: "Performance Marketing",
    bio: "Data-driven strategist specializing in scaling premium brands through targeted digital outreach.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop",
    isPlaceholder: true
  }
];

const TeamCard: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentSrc, setCurrentSrc] = useState<string>(member.image);
  const [loadFailed, setLoadFailed] = useState(false);

  const candidateMap: Record<string, string[]> = {
    "Murshiduzzaman": [
      "/Murshiduzzaman.png",
      "/murshiduzzaman.png",
      "/images/Murshiduzzaman.png",
      "/images/murshiduzzaman.png",
      "/Murshiduzzaman.jpg"
    ],
    "Tanjina Akter": [
      "/images/team-member-2.png",
      "/team-member-2.png"
    ]
  };

  const handleImageError = () => {
    const candidates = candidateMap[member.name];
    if (candidates) {
      const currentIndex = candidates.indexOf(currentSrc);
      if (currentIndex !== -1 && currentIndex < candidates.length - 1) {
        setCurrentSrc(candidates[currentIndex + 1]);
        return;
      }
    }
    setLoadFailed(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  return (
    <div 
      itemScope 
      itemType="https://schema.org/Person"
      className={`team-reveal scroll-reveal group perspective-container ${member.isFounder ? 'lg:col-span-1' : ''}`}
      style={{ transitionDelay: `${index * 0.2}s` }}
    >
      <meta itemProp="worksFor" content="Qarvion" />
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`tilt-card relative p-3.5 sm:p-8 md:p-10 rounded-xl sm:rounded-[32px] bg-white/[0.03] border border-white/5 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.07] ${
          member.isFounder 
            ? 'border-blue-500/30 shadow-[0_30px_60px_rgba(0,0,0,0.6),0_0_20px_rgba(37,99,235,0.15)]' 
            : 'hover:border-blue-500/20'
        }`}
      >
        <div className="relative mb-2.5 sm:mb-8 flex justify-center">
          <div className={`relative ${member.isFounder ? 'w-24 h-24 sm:w-48 sm:h-48 md:w-56 md:h-56' : 'w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40'} rounded-full p-1 bg-gradient-to-tr from-blue-600 to-blue-400 group-hover:scale-105 transition-transform duration-700 shadow-2xl`}>
            <div className="w-full h-full rounded-full overflow-hidden border-2 sm:border-4 border-[#0B1224] bg-[#1C2541] flex items-center justify-center">
              {!loadFailed ? (
                <img 
                  src={currentSrc} 
                  alt={member.name}
                  itemProp="image"
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105" 
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1224] to-[#1C2541] text-white p-2 sm:p-4 text-center">
                  <span className="text-xl sm:text-3xl md:text-4xl font-extrabold text-blue-400 font-['Montserrat']">
                    {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                  <span className="text-[9px] text-white/50 tracking-wider uppercase mt-0.5 sm:mt-1">{member.name}</span>
                </div>
              )}
              {member.isPlaceholder && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                  <span className="text-white/60 text-[9px] font-bold uppercase tracking-widest">Team</span>
                </div>
              )}
            </div>
            {member.isFounder && (
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl sm:blur-3xl -z-10 animate-pulse-slow"></div>
            )}
          </div>
        </div>

        <div className="text-center">
          <h3 itemProp="name" className="text-base sm:text-2xl md:text-3xl font-['Montserrat'] font-extrabold text-white mb-0.5 sm:mb-2 group-hover:text-blue-400 transition-colors duration-400">
            {member.name}
          </h3>
          <p itemProp="jobTitle" className="text-blue-500 text-[9px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] mb-2 sm:mb-6">
            {member.role}
          </p>
          <p itemProp="description" className="text-white/50 font-['Inter'] text-[11px] sm:text-sm leading-relaxed mb-3 sm:mb-8 max-w-xs mx-auto group-hover:text-white/80 transition-colors">
            {member.bio}
          </p>

          <div className="flex justify-center flex-wrap gap-2 sm:gap-2.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500">
            {member.socials?.fb && (
              <a 
                href={member.socials.fb} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook Profile"
                title="Facebook"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-blue-400 hover:bg-white/10 transition-all border border-white/5 hover:border-blue-500/50 hover:scale-110 active:scale-95"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            )}
            {member.socials?.x && (
              <a 
                href={member.socials.x} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="X Profile"
                title="X (Twitter)"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-blue-400 hover:bg-white/10 transition-all border border-white/5 hover:border-blue-500/50 hover:scale-110 active:scale-95"
              >
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
              </a>
            )}
            {member.socials?.pinterest && (
              <a 
                href={member.socials.pinterest} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Pinterest Profile"
                title="Pinterest"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-red-400 hover:bg-white/10 transition-all border border-white/5 hover:border-red-500/50 hover:scale-110 active:scale-95"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
              </a>
            )}
            {member.socials?.behance && (
              <a 
                href={member.socials.behance} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Behance Portfolio"
                title="Behance"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-blue-400 hover:bg-white/10 transition-all border border-white/5 hover:border-blue-500/50 hover:scale-110 active:scale-95"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.171 3-3.455 0-5.555-2.261-5.555-5.538 0-3.347 2.179-5.462 5.372-5.462 3.327 0 4.962 2.172 4.962 5.093 0 .426-.041.85-.097 1.207h-7.669c.105 1.547 1.144 2.454 2.778 2.454 1.357 0 2.227-.611 2.656-1.354l2.774.6zm-7.954-4.5h4.922c-.068-1.246-.948-2.025-2.385-2.025-1.458 0-2.392.793-2.537 2.025zm-9.772 7.5h-6v-16h6.721c3.084 0 5.279 1.487 5.279 4.417 0 1.761-1.062 3.111-2.483 3.691 1.736.574 2.762 2.183 2.762 4.148 0 3.344-2.544 3.744-6.279 3.744zm-3.455-6.553h2.895c1.47 0 2.56-.514 2.56-1.921 0-1.341-1.01-1.879-2.56-1.879h-2.895v3.8zm0-5.747h2.641c1.373 0 2.29-.441 2.29-1.688 0-1.229-.861-1.679-2.29-1.679h-2.641v3.367z"/></svg>
              </a>
            )}
            {member.socials?.ig && (
              <a 
                href={member.socials.ig} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram Profile"
                title="Instagram"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-pink-400 hover:bg-white/10 transition-all border border-white/5 hover:border-pink-500/50 hover:scale-110 active:scale-95"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            )}
            {member.socials?.email && (
              <a 
                href={member.socials.email} 
                aria-label="Direct Email"
                title="Email"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-[#00D2FF] hover:bg-white/10 transition-all border border-white/5 hover:border-[#00D2FF]/50 hover:scale-110 active:scale-95"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </a>
            )}
          </div>
        </div>

        <div className="absolute inset-0 rounded-2xl sm:rounded-[32px] overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

const Team: React.FC = () => {
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

    document.querySelectorAll('.team-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="team" className="relative py-6 sm:py-24 md:py-32 px-3.5 sm:px-6 md:px-12 bg-[#060B1A] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/5 blur-[180px] rounded-full pointer-events-none z-0"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-4 sm:mb-20 space-y-1.5 sm:space-y-4 team-reveal scroll-reveal">
          <span className="text-blue-500 text-[9px] sm:text-xs font-extrabold tracking-[0.25em] sm:tracking-[0.4em] uppercase">OUR TEAM</span>
          <h2 className="text-xl xs:text-2xl sm:text-5xl md:text-7xl font-['Montserrat'] font-extrabold text-white">
            Meet Our <span className="font-serif-italic text-blue-400">Creative</span> Team
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-[11px] sm:text-base md:text-lg font-['Inter']">
            The strategic minds behind Qarvion’s branding and marketing success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-10 lg:gap-14">
          {team.map((member, idx) => (
            <TeamCard key={member.id} member={member} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;