import React, { useState } from 'react';
import { Menu, X, CalendarCheck } from 'lucide-react';
import { Booking } from '../types';

interface HeaderProps {
  onBookClassClick: () => void;
  bookings: Booking[];
  onOpenMyBookings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onBookClassClick,
  bookings,
  onOpenMyBookings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#ECE7E1] transition-all">
      <div className="max-w-[1120px] mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-[72px]">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-[1.25rem] font-semibold tracking-[-0.02em] text-[#1F1D1B] hover:opacity-90 transition-opacity"
            id="brand-logo"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#E8543A] inline-block ring-2 ring-[#E8543A]/20"></span>
            <span>Pulse Studio</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#schedule"
              className="text-[#6E6A66] hover:text-[#1F1D1B] text-[0.95rem] transition-colors"
            >
              Schedule
            </a>
            <a
              href="#trainers"
              className="text-[#6E6A66] hover:text-[#1F1D1B] text-[0.95rem] transition-colors"
            >
              Trainers
            </a>
            <a
              href="#philosophy"
              className="text-[#6E6A66] hover:text-[#1F1D1B] text-[0.95rem] transition-colors"
            >
              Philosophy
            </a>

            {/* My Bookings Button (if any exist) */}
            {bookings.length > 0 && (
              <button
                type="button"
                onClick={onOpenMyBookings}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#FDEEEB] text-[#7D2819] hover:bg-[#F9CBC3] transition-colors cursor-pointer border border-[#E8543A]/20"
                id="my-bookings-btn"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-[#E8543A]" />
                <span>My Bookings ({bookings.length})</span>
              </button>
            )}

            {/* Main Book a Class CTA */}
            <button
              type="button"
              onClick={onBookClassClick}
              className="inline-flex items-center justify-center bg-[#E8543A] hover:bg-[#D4442B] text-white text-[0.9rem] font-medium px-[1.35rem] py-[0.65rem] rounded-[4px] border border-[#E8543A] transition-all cursor-pointer shadow-xs active:scale-[0.98]"
              id="header-book-btn"
            >
              Book a Class
            </button>
          </nav>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-3 md:hidden">
            {bookings.length > 0 && (
              <button
                type="button"
                onClick={onOpenMyBookings}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FDEEEB] text-[#7D2819]"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-[#E8543A]" />
                <span>{bookings.length}</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1F1D1B] hover:text-[#E8543A] transition-colors focus:outline-hidden"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#ECE7E1] px-6 py-4 space-y-3 animate-in fade-in duration-150">
          <a
            href="#schedule"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#6E6A66] hover:text-[#1F1D1B] py-2 text-base font-medium"
          >
            Schedule
          </a>
          <a
            href="#trainers"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#6E6A66] hover:text-[#1F1D1B] py-2 text-base font-medium"
          >
            Trainers
          </a>
          <a
            href="#philosophy"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#6E6A66] hover:text-[#1F1D1B] py-2 text-base font-medium"
          >
            Philosophy
          </a>
          {bookings.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyBookings();
              }}
              className="flex items-center gap-2 text-[#7D2819] py-2 text-base font-medium"
            >
              <CalendarCheck className="w-4 h-4 text-[#E8543A]" />
              <span>View Booked Sessions ({bookings.length})</span>
            </button>
          )}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClassClick();
              }}
              className="w-full text-center bg-[#E8543A] hover:bg-[#D4442B] text-white text-[0.9rem] font-medium py-3 rounded-[4px] transition-colors"
            >
              Book a Class
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
