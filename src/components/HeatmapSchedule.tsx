import React, { useState } from 'react';
import { ClassSession, Booking } from '../types';
import { DAYS, TIME_SLOTS, INSTRUCTORS } from '../data/scheduleData';
import { Filter, UserCheck, Clock, Sparkles } from 'lucide-react';

interface HeatmapScheduleProps {
  sessions: ClassSession[];
  onSelectSession: (session: ClassSession) => void;
  userBookings: Booking[];
  selectedTrainerFilter?: string;
  onClearTrainerFilter?: () => void;
}

export const HeatmapSchedule: React.FC<HeatmapScheduleProps> = ({
  sessions,
  onSelectSession,
  userBookings,
  selectedTrainerFilter,
  onClearTrainerFilter,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [trainerFilter, setTrainerFilter] = useState<string>(selectedTrainerFilter || 'All');
  const [hoveredSession, setHoveredSession] = useState<{
    session: ClassSession;
    x: number;
    y: number;
  } | null>(null);

  // Sync with prop if it changes
  React.useEffect(() => {
    if (selectedTrainerFilter) {
      setTrainerFilter(selectedTrainerFilter);
    }
  }, [selectedTrainerFilter]);

  // Categories list
  const categories = ['All', 'Strength', 'HIIT', 'Mobility & Recovery', 'Vinyasa'];

  // Heat map color determination
  const getHeatStyle = (capacity: number, max: number) => {
    const ratio = capacity / max;
    if (ratio >= 0.93) {
      // 15/16 or 16/16 - Deep coral
      return {
        bg: 'bg-[#E8543A]',
        text: 'text-white',
        subText: 'text-white/90',
        border: 'border-[#E8543A]',
        hoverBorder: 'hover:border-[#C43820]',
      };
    } else if (ratio >= 0.70) {
      // 12-14/16 - High coral
      return {
        bg: 'bg-[#F49D8E]',
        text: 'text-[#4D1208]',
        subText: 'text-[#4D1208]/85',
        border: 'border-[#F49D8E]',
        hoverBorder: 'hover:border-[#E8543A]',
      };
    } else if (ratio >= 0.45) {
      // 8-11/16 - Medium coral
      return {
        bg: 'bg-[#F9CBC3]',
        text: 'text-[#611D12]',
        subText: 'text-[#611D12]/85',
        border: 'border-[#F9CBC3]',
        hoverBorder: 'hover:border-[#F49D8E]',
      };
    } else {
      // < 45% - Low coral
      return {
        bg: 'bg-[#FDEEEB]',
        text: 'text-[#7D2819]',
        subText: 'text-[#7D2819]/85',
        border: 'border-[#FDEEEB]',
        hoverBorder: 'hover:border-[#F9CBC3]',
      };
    }
  };

  const handleMouseEnter = (e: React.MouseEvent, session: ClassSession) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredSession({
      session,
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
  };

  const handleMouseLeave = () => {
    setHoveredSession(null);
  };

  const isUserBooked = (sessionId: string) => {
    return userBookings.some((b) => b.sessionId === sessionId);
  };

  return (
    <section id="schedule" className="py-16 md:py-20">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-[1.75rem] font-normal tracking-[-0.02em] text-[#1F1D1B]">
              Weekly Schedule &amp; Live Capacity
            </h2>
            <p className="text-[0.95rem] text-[#6E6A66] mt-1.5">
              Interactive heatmap indicating class demand. Darker coral denotes near-capacity sessions.
            </p>
          </div>

          {/* Heatmap Legend */}
          <div className="flex items-center gap-2 text-[0.8rem] text-[#6E6A66] self-start md:self-auto bg-white md:bg-transparent px-3 py-2 md:p-0 rounded-md border md:border-none border-[#ECE7E1]">
            <span>Available</span>
            <div className="flex gap-[3px] mx-1.5">
              <span
                className="w-3.5 h-3.5 rounded-[2px] bg-[#FDEEEB] border border-[#F9CBC3]"
                title="Low demand (20-40%)"
              />
              <span
                className="w-3.5 h-3.5 rounded-[2px] bg-[#F9CBC3]"
                title="Moderate demand (40-70%)"
              />
              <span
                className="w-3.5 h-3.5 rounded-[2px] bg-[#F49D8E]"
                title="High demand (70-90%)"
              />
              <span
                className="w-3.5 h-3.5 rounded-[2px] bg-[#E8543A]"
                title="Waitlist / Near capacity (90-100%)"
              />
            </div>
            <span>Fully Booked</span>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Category filter pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[#6E6A66] mr-1 hidden sm:inline flex items-center gap-1">
              <Filter className="w-3 h-3" /> Focus:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-[4px] font-medium transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-[#1F1D1B] text-white'
                    : 'bg-white text-[#6E6A66] border border-[#ECE7E1] hover:text-[#1F1D1B] hover:border-[#DCD5CD]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Trainer Filter dropdown & Active filters badge */}
          <div className="flex items-center gap-2">
            <label htmlFor="trainer-select" className="text-[#6E6A66] hidden sm:inline">
              Trainer:
            </label>
            <select
              id="trainer-select"
              value={trainerFilter}
              onChange={(e) => {
                setTrainerFilter(e.target.value);
                if (e.target.value === 'All' && onClearTrainerFilter) {
                  onClearTrainerFilter();
                }
              }}
              className="bg-white border border-[#ECE7E1] text-[#1F1D1B] rounded-[4px] px-2.5 py-1.5 outline-hidden focus:border-[#E8543A] cursor-pointer"
            >
              <option value="All">All Instructors</option>
              {INSTRUCTORS.map((inst) => (
                <option key={inst.id} value={inst.name}>
                  {inst.name}
                </option>
              ))}
            </select>

            {(categoryFilter !== 'All' || trainerFilter !== 'All') && (
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter('All');
                  setTrainerFilter('All');
                  if (onClearTrainerFilter) onClearTrainerFilter();
                }}
                className="text-[#E8543A] hover:underline font-medium ml-1"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Schedule Wrapper Card */}
        <div className="bg-white border border-[#ECE7E1] rounded-[8px] p-4 sm:p-6 md:p-8 shadow-xs relative">
          <div className="overflow-x-auto custom-scrollbar pb-2">
            <div className="min-w-[840px] grid grid-cols-[80px_repeat(7,1fr)] gap-2">
              {/* Top Left Empty Corner */}
              <div className="h-9" />

              {/* Day Headers */}
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="text-center py-2 text-[0.85rem] font-medium text-[#6E6A66] tracking-[0.02em]"
                >
                  {day}
                </div>
              ))}

              {/* Schedule Rows */}
              {TIME_SLOTS.map((time) => {
                return (
                  <React.Fragment key={time}>
                    {/* Time Label Column */}
                    <div className="flex items-center text-[0.8rem] text-[#9B9691] font-mono tabular-nums pr-2">
                      {time}
                    </div>

                    {/* 7 Days Cells for this time */}
                    {DAYS.map((day) => {
                      const session = sessions.find(
                        (s) => s.day === day && s.time === time
                      );

                      if (!session) {
                        return (
                          <div
                            key={`${day}-${time}-empty`}
                            className="h-[72px] rounded-[4px] bg-[#F8F6F2] border border-dashed border-[#ECE7E1] flex items-center justify-center text-[#9B9691] text-xs font-light select-none"
                          >
                            <span>—</span>
                          </div>
                        );
                      }

                      // Check filters
                      const matchesCategory =
                        categoryFilter === 'All' || session.category === categoryFilter;
                      const matchesTrainer =
                        trainerFilter === 'All' || session.trainerName === trainerFilter;
                      const isDimmed = !matchesCategory || !matchesTrainer;

                      const heat = getHeatStyle(session.capacity, session.maxCapacity);
                      const isFull = session.capacity >= session.maxCapacity;
                      const userHasBooked = isUserBooked(session.id);

                      return (
                        <div
                          key={session.id}
                          onClick={() => onSelectSession(session)}
                          onMouseEnter={(e) => handleMouseEnter(e, session)}
                          onMouseLeave={handleMouseLeave}
                          className={`h-[72px] rounded-[4px] p-2 flex flex-col justify-between cursor-pointer transition-all duration-150 relative border ${
                            heat.bg
                          } ${heat.border} ${heat.hoverBorder} select-none ${
                            isDimmed ? 'opacity-25 grayscale' : 'hover:-translate-y-[2px] hover:shadow-md'
                          } ${userHasBooked ? 'ring-2 ring-offset-1 ring-[#1F1D1B]' : ''}`}
                          id={`slot-${session.id}`}
                        >
                          {/* Class Title */}
                          <div className="flex items-start justify-between gap-1">
                            <span
                              className={`text-[0.75rem] font-medium leading-[1.2] line-clamp-2 ${heat.text}`}
                            >
                              {session.name}
                            </span>
                            {userHasBooked && (
                              <span
                                title="You are registered for this session"
                                className="shrink-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white"
                              />
                            )}
                          </div>

                          {/* Capacity Status */}
                          <div
                            className={`text-[0.7rem] font-mono tabular-nums flex items-baseline justify-between ${heat.subText}`}
                          >
                            <span>
                              {session.capacity}/{session.maxCapacity}
                            </span>
                            <span className="font-sans font-medium text-[0.68rem]">
                              {isFull ? 'Waitlist' : 'Spots'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Heatmap helper note */}
          <div className="mt-4 pt-3 border-t border-[#ECE7E1] flex flex-col sm:flex-row items-center justify-between text-xs text-[#9B9691] gap-2">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E8543A]" />
              Click any session to reserve your spot or join the priority waitlist.
            </span>
            <span>All sessions capped at 16 spots for personalized coaching</span>
          </div>
        </div>
      </div>

      {/* Floating Detailed Tooltip */}
      {hoveredSession && (
        <div
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full mb-3"
          style={{
            left: `${hoveredSession.x}px`,
            top: `${hoveredSession.y}px`,
          }}
        >
          <div className="bg-[#1F1D1B] text-white rounded-md p-3 shadow-xl text-xs max-w-[260px] border border-white/10 animate-in fade-in duration-150">
            <div className="font-semibold text-white text-[0.85rem] mb-0.5">
              {hoveredSession.session.name}
            </div>
            <div className="text-white/70 text-[0.75rem] mb-2 flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-[#E8543A]" />
              <span>
                {hoveredSession.session.day} at {hoveredSession.session.time} ({hoveredSession.session.duration})
              </span>
            </div>
            <div className="text-white/85 text-[0.75rem] mb-1.5">
              <span className="text-white/50">Coach: </span>
              {hoveredSession.session.trainerName}
            </div>
            <div className="text-white/70 text-[0.72rem] line-clamp-2 mb-2 italic">
              &ldquo;{hoveredSession.session.description}&rdquo;
            </div>
            <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[0.75rem]">
              <span className="text-[#F49D8E]">
                {Math.round(
                  (hoveredSession.session.capacity / hoveredSession.session.maxCapacity) * 100
                )}
                % Capacity
              </span>
              <span className="text-white/60">Click to book</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
