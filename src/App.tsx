import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HeatmapSchedule } from './components/HeatmapSchedule';
import { ResidentInstructors } from './components/ResidentInstructors';
import { PhilosophySection } from './components/PhilosophySection';
import { BookingModal } from './components/BookingModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { Footer } from './components/Footer';
import { INITIAL_SESSIONS } from './data/scheduleData';
import { ClassSession, Booking } from './types';

export default function App() {
  const [sessions, setSessions] = useState<ClassSession[]>(INITIAL_SESSIONS);
  const [selectedSessionForModal, setSelectedSessionForModal] = useState<ClassSession | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isFirstClassPromo, setIsFirstClassPromo] = useState<boolean>(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState<boolean>(false);
  const [selectedTrainerFilter, setSelectedTrainerFilter] = useState<string>('All');
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger toast
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Open modal from general "Book a Class"
  const handleOpenGeneralBooking = () => {
    setSelectedSessionForModal(null);
    setIsFirstClassPromo(false);
    setIsBookingModalOpen(true);
  };

  // Open modal from "First Class On Us"
  const handleOpenFirstClassPromo = () => {
    setSelectedSessionForModal(null);
    setIsFirstClassPromo(true);
    setIsBookingModalOpen(true);
  };

  // Open modal from heatmap slot click
  const handleSelectSession = (session: ClassSession) => {
    setSelectedSessionForModal(session);
    setIsFirstClassPromo(false);
    setIsBookingModalOpen(true);
  };

  // Confirm booking
  const handleConfirmBooking = (bookingData: Omit<Booking, 'id' | 'bookedAt'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      bookedAt: new Date().toISOString(),
    };

    // Add to user bookings
    setUserBookings((prev) => [newBooking, ...prev]);

    // If not full, increment capacity by 1
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === bookingData.sessionId && s.capacity < s.maxCapacity) {
          return { ...s, capacity: s.capacity + 1 };
        }
        return s;
      })
    );

    showToast(
      bookingData.isWaitlist
        ? `Added to waitlist for ${bookingData.className}`
        : `Spot reserved for ${bookingData.className}!`
    );
  };

  // Cancel booking
  const handleCancelBooking = (bookingId: string, sessionId: string) => {
    setUserBookings((prev) => prev.filter((b) => b.id !== bookingId));

    // Decrement capacity
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId && s.capacity > 0) {
          return { ...s, capacity: s.capacity - 1 };
        }
        return s;
      })
    );

    showToast('Reservation cancelled. The spot has been released.');
  };

  // Filter schedule from instructor card click
  const handleFilterByTrainer = (trainerName: string) => {
    setSelectedTrainerFilter(trainerName);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1F1D1B] selection:bg-[#E8543A]/20">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F1D1B] text-white px-4 py-3 rounded-[6px] text-xs shadow-xl border border-white/10 animate-in slide-in-from-bottom-3 duration-200 flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#E8543A]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Header
        onBookClassClick={handleOpenGeneralBooking}
        bookings={userBookings}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
      />

      <main className="grow">
        {/* Hero Section */}
        <Hero onFirstClassClick={handleOpenFirstClassPromo} />

        {/* Weekly Heatmap Schedule & Capacity */}
        <HeatmapSchedule
          sessions={sessions}
          onSelectSession={handleSelectSession}
          userBookings={userBookings}
          selectedTrainerFilter={selectedTrainerFilter}
          onClearTrainerFilter={() => setSelectedTrainerFilter('All')}
        />

        {/* Resident Instructors */}
        <ResidentInstructors onFilterByTrainer={handleFilterByTrainer} />

        {/* Philosophy */}
        <PhilosophySection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Dialog Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedSession={selectedSessionForModal}
        allSessions={sessions}
        onConfirmBooking={handleConfirmBooking}
        isFirstClassPromotion={isFirstClassPromo}
      />

      {/* My Bookings Modal */}
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={userBookings}
        onCancelBooking={handleCancelBooking}
      />
    </div>
  );
}
