import React from 'react';
import { INSTRUCTORS } from '../data/scheduleData';
import { ArrowUpRight, Calendar } from 'lucide-react';

interface ResidentInstructorsProps {
  onFilterByTrainer: (trainerName: string) => void;
}

export const ResidentInstructors: React.FC<ResidentInstructorsProps> = ({
  onFilterByTrainer,
}) => {
  return (
    <section id="trainers" className="py-16 md:py-20 border-t border-[#ECE7E1]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="mb-11">
          <h2 className="text-[1.75rem] font-normal tracking-[-0.02em] text-[#1F1D1B]">
            Resident Instructors
          </h2>
          <p className="text-[0.95rem] text-[#6E6A66] mt-1.5">
            Knowledgeable coaching focused on biomechanics, longevity, and form.
          </p>
        </div>

        {/* Instructors 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {INSTRUCTORS.map((instructor) => (
            <div
              key={instructor.id}
              className="bg-white border border-[#ECE7E1] hover:border-[#DCD5CD] rounded-[6px] p-8 sm:p-9 transition-all duration-200 hover:-translate-y-1 shadow-xs flex flex-col justify-between group"
              id={`trainer-card-${instructor.id}`}
            >
              <div>
                {/* Monogram Avatar */}
                <div className="w-14 h-14 rounded-full bg-[#F3ECE4] border border-[#ECE7E1] flex items-center justify-center font-medium text-[1.1rem] text-[#1F1D1B] mb-6 select-none group-hover:scale-105 transition-transform">
                  {instructor.initials}
                </div>

                {/* Name */}
                <h3 className="text-[1.2rem] font-medium tracking-[-0.015em] text-[#1F1D1B] mb-1">
                  {instructor.name}
                </h3>

                {/* Specialty */}
                <div className="text-[0.82rem] font-medium text-[#E8543A] uppercase tracking-[0.05em] mb-3.5">
                  {instructor.specialty}
                </div>

                {/* Bio */}
                <p className="text-[0.9rem] text-[#6E6A66] leading-[1.6] font-light">
                  {instructor.bio}
                </p>
              </div>

              {/* View Classes Action */}
              <div className="mt-8 pt-5 border-t border-[#ECE7E1]/70 flex items-center justify-between">
                <span className="text-xs text-[#9B9691]">
                  {instructor.classesCount} sessions weekly
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onFilterByTrainer(instructor.name);
                    const scheduleEl = document.getElementById('schedule');
                    if (scheduleEl) {
                      scheduleEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#1F1D1B] hover:text-[#E8543A] transition-colors cursor-pointer group-hover:underline"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>View Schedule</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
