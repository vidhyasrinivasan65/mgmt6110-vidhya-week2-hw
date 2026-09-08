import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#ECE7E1] py-16 mt-16 text-[0.85rem] text-[#6E6A66]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Footer Brand */}
          <div className="flex items-center gap-2 font-medium text-[#1F1D1B]">
            <span className="w-2 h-2 rounded-full bg-[#E8543A]"></span>
            <span>Pulse Studio &copy; 2025</span>
          </div>

          {/* Footer Meta */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-[#6E6A66]">
            <span>420 Mercer Street, New York</span>
            <span className="hidden sm:inline text-[#DCD5CD]">•</span>
            <span>Mon–Sun 6:30am – 8:00pm</span>
            <span className="hidden sm:inline text-[#DCD5CD]">•</span>
            <a
              href="mailto:hello@pulsestudio.fit"
              className="hover:text-[#1F1D1B] transition-colors hover:underline"
            >
              hello@pulsestudio.fit
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
