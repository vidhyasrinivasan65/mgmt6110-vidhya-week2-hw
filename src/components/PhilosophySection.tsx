import React from 'react';
import { Activity, ShieldCheck, Wind } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  const pillars = [
    {
      icon: Activity,
      number: '01',
      title: 'Intentional Cadence',
      description:
        'High output does not require frenetic chaos. We monitor heart rate variance, eccentric tempo control, and strict rest intervals to calibrate maximum adaptation without nervous system exhaustion.',
    },
    {
      icon: ShieldCheck,
      number: '02',
      title: 'Biomechanical Longevity',
      description:
        'Joint mobility and core bracing precede load. Every movement pattern is taught with strict attention to orthopedic safety, protecting your joints while building formidable athletic resilience.',
    },
    {
      icon: Wind,
      number: '03',
      title: 'Sensory Sanctuary',
      description:
        'Zero flashing LED walls or blaring commercial tracks. Our space pairs natural lime-washed walls, acoustic soundscaping, and medical-grade HEPA ventilation for clear respiratory focus.',
    },
  ];

  return (
    <section id="philosophy" className="py-16 md:py-20 border-t border-[#ECE7E1]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="max-w-[680px] mb-12">
          <p className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-[#E8543A] mb-2">
            The Studio Standard
          </p>
          <h2 className="text-[1.75rem] sm:text-[2rem] font-normal tracking-[-0.02em] text-[#1F1D1B]">
            Movement rooted in restorative discipline.
          </h2>
          <p className="text-[0.95rem] text-[#6E6A66] mt-2 font-light leading-relaxed">
            We reject the dogma that every workout must leave you broken. Pulse Studio is designed around sustainable training cycles that leave you grounded, energized, and capable.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white border border-[#ECE7E1] rounded-[6px] p-8 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-[4px] bg-[#FAF8F5] border border-[#ECE7E1] flex items-center justify-center text-[#E8543A]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-[#9B9691]">{pillar.number}</span>
                  </div>
                  <h3 className="text-[1.15rem] font-medium text-[#1F1D1B] mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="text-[0.88rem] text-[#6E6A66] leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Facility Highlights Bar */}
        <div className="mt-10 bg-[#FAF8F5] border border-[#ECE7E1] rounded-[6px] p-6 flex flex-wrap items-center justify-between gap-6 text-xs text-[#6E6A66]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8543A]"></span>
            <span>16-Spot Maximum per Session</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8543A]"></span>
            <span>Finnish Cedar Recovery Sauna</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8543A]"></span>
            <span>Aesop Amenities &amp; Fresh Linen</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8543A]"></span>
            <span>Cold-Pressed House Electrolytes</span>
          </div>
        </div>
      </div>
    </section>
  );
};
