
import React, { useEffect } from 'react';

interface Step {
  id: string;
  title: string;
  description: string;
  number: string;
}

const steps: Step[] = [
  {
    id: 'discovery',
    number: '01',
    title: 'Discovery',
    description: 'We research your market and analyze your brand goals to build a solid foundation.'
  },
  {
    id: 'concept',
    number: '02',
    title: 'Concept',
    description: 'Creative brainstorming where we develop unique visual directions for your identity.'
  },
  {
    id: 'refinement',
    number: '03',
    title: 'Refinement',
    description: 'Iterative polishing of the chosen concept based on your feedback and professional standards.'
  },
  {
    id: 'delivery',
    number: '04',
    title: 'Delivery',
    description: 'Providing final high-res assets, source files, and brand guidelines for your team.'
  },
  {
    id: 'marketing',
    number: '05',
    title: 'Marketing',
    description: 'Amplifying your brand voice through strategic social media campaigns and targeted digital outreach.'
  }
];

const Workflow: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const revealElements = document.querySelectorAll('.workflow-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="workflow" className="relative py-6 sm:py-20 md:py-24 px-3.5 sm:px-6 md:px-12 overflow-hidden">
      {/* Decorative Floating Circle */}
      <div className="absolute -right-20 top-1/4 w-64 h-64 border border-[#00D2FF]/10 rounded-full animate-float opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="mb-4 sm:mb-16 text-center md:text-left space-y-1.5 sm:space-y-4">
          <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-['Montserrat'] font-extrabold text-white workflow-reveal scroll-reveal">
            Our Strategy <span className="text-gradient-brand">& Workflow</span>
          </h2>
          <div className="w-10 sm:w-20 h-1 bg-[#00D2FF] rounded-full workflow-reveal scroll-reveal [transition-delay:0.1s] mx-auto md:mx-0"></div>
          <p className="text-white/60 max-w-xl text-[11px] sm:text-base md:text-lg font-['Inter'] workflow-reveal scroll-reveal [transition-delay:0.2s]">
            From strategic discovery to global digital amplification. We ensure your brand doesn't just look good, but performs.
          </p>
        </div>

        {/* Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5 sm:gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`workflow-reveal scroll-reveal group relative p-3.5 sm:p-8 rounded-xl sm:rounded-[32px] bg-white/[0.03] border border-white/5 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/[0.06] hover:border-[#00D2FF]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_20px_rgba(0,210,255,0.1)] flex flex-col`}
              style={{ transitionDelay: `${0.1 * (index + 3)}s` }}
            >
              {/* Step Number Accent */}
              <div className="flex items-center justify-between mb-2 sm:mb-8">
                <span className="text-xl sm:text-4xl font-['Montserrat'] font-extrabold text-gradient-brand opacity-80 group-hover:opacity-100 transition-opacity">
                  {step.number}
                </span>
                <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#00D2FF]/40 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] animate-pulse"></div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-sm sm:text-2xl font-['Montserrat'] font-bold text-white mb-1 sm:mb-4 group-hover:text-[#00D2FF] transition-colors">
                {step.title}
              </h3>
              <p className="text-white/60 leading-relaxed font-['Inter'] text-[11px] sm:text-sm group-hover:text-white/80 transition-colors flex-grow">
                {step.description}
              </p>

              {/* Hover Radial Glow Effect */}
              <div className="absolute inset-0 rounded-xl sm:rounded-[32px] bg-gradient-to-br from-[#00D2FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Accent Lines */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-[#00D2FF]/5 to-transparent pointer-events-none opacity-50"></div>
    </section>
  );
};

export default Workflow;
