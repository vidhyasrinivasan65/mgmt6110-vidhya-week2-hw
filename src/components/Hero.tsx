import React from 'react';

interface HeroProps {
  onFirstClassClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onFirstClassClick }) => {
  return (
    <section className="pt-24 pb-16 md:pt-28 md:pb-20 text-center px-4 sm:px-6">
      <div className="max-w-[760px] mx-auto">
        {/* Eyebrow */}
        <p className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-[#E8543A] mb-5">
          Intentional Movement & Endurance
        </p>

        {/* Hero Title */}
        <h1 className="text-[2.6rem] sm:text-[3.25rem] md:text-[3.5rem] font-normal tracking-[-0.035em] leading-[1.15] text-[#1F1D1B] mb-5">
          Find your rhythm in mindful, high-intensity training.
        </h1>

        {/* Subtitle */}
        <p className="text-[1.05rem] sm:text-[1.15rem] text-[#6E6A66] max-w-[540px] mx-auto mb-10 font-light tracking-[-0.01em] leading-relaxed">
          A calm, distraction-free environment curated for strength, conditioning, and sustainable daily vitality.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
          <a
            href="#schedule"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#E8543A] hover:bg-[#D4442B] text-white text-[0.95rem] font-medium px-6 py-3 rounded-[4px] border border-[#E8543A] transition-all cursor-pointer shadow-xs active:scale-[0.98]"
            id="hero-explore-btn"
          >
            Explore Schedule
          </a>
          <button
            type="button"
            onClick={onFirstClassClick}
            className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent hover:bg-white text-[#1F1D1B] text-[0.95rem] font-medium px-6 py-3 rounded-[4px] border border-[#DCD5CD] hover:border-[#1F1D1B] transition-all cursor-pointer active:scale-[0.98]"
            id="hero-first-class-btn"
          >
            First Class On Us
          </button>
        </div>
      </div>
    </section>
  );
};
