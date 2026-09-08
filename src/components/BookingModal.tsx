import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Calendar, Clock, User, AlertCircle, Sparkles } from 'lucide-react';
import { ClassSession, Booking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSession: ClassSession | null;
  allSessions: ClassSession[];
  onConfirmBooking: (booking: Omit<Booking, 'id' | 'bookedAt'>) => void;
  isFirstClassPromotion?: boolean;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedSession,
  allSessions,
  onConfirmBooking,
  isFirstClassPromotion = false,
}) => {
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [applyComplimentaryPass, setApplyComplimentaryPass] = useState(isFirstClassPromotion);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState<{
    reference: string;
    className: string;
    dayTime: string;
    trainer: string;
    isWaitlist: boolean;
  } | null>(null);

  useEffect(() => {
    if (selectedSession) {
      setCurrentSessionId(selectedSession.id);
    } else if (allSessions.length > 0 && !currentSessionId) {
      setCurrentSessionId(allSessions[0].id);
    }
    setApplyComplimentaryPass(isFirstClassPromotion);
    setIsSuccess(false);
  }, [selectedSession, isOpen, isFirstClassPromotion, allSessions]);

  if (!isOpen) return null;

  const currentSession = allSessions.find((s) => s.id === currentSessionId) || selectedSession;
  const isWaitlist = currentSession ? currentSession.capacity >= currentSession.maxCapacity : false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSession || !fullName.trim() || !email.trim()) return;

    const ref = `PLS-${Math.floor(100000 + Math.random() * 900000)}`;

    onConfirmBooking({
      sessionId: currentSession.id,
      className: currentSession.name,
      day: currentSession.day,
      time: currentSession.time,
      trainerName: currentSession.trainerName,
      userName: fullName.trim(),
      userEmail: email.trim(),
      isWaitlist,
    });

    setConfirmedBookingData({
      reference: ref,
      className: currentSession.name,
      dayTime: `${currentSession.day} at ${currentSession.time}`,
      trainer: currentSession.trainerName,
      isWaitlist,
    });

    setIsSuccess(true);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 bg-[#1F1D1B]/50 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity animate-in fade-in duration-200"
      id="booking-modal-overlay"
    >
      <div
        className="bg-white w-full max-w-[460px] rounded-[8px] p-6 sm:p-8 shadow-2xl relative border border-[#ECE7E1] animate-in zoom-in-95 duration-200"
        id="booking-modal-content"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-[#6E6A66] hover:text-[#1F1D1B] p-1.5 rounded-full hover:bg-[#FAF8F5] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-[1.35rem] font-medium text-[#1F1D1B]" id="modalClassTitle">
                {isWaitlist ? 'Join Priority Waitlist' : 'Reserve Spot'}
              </h3>
              <p className="text-[0.9rem] text-[#6E6A66] mt-1" id="modalClassMeta">
                {currentSession
                  ? `${currentSession.name} — ${currentSession.day} at ${currentSession.time}`
                  : 'Select your preferences to reserve your spot.'}
              </p>
            </div>

            {/* Session Detail Snapshot Card */}
            {currentSession && (
              <div
                className={`p-3.5 rounded-[6px] mb-5 border ${
                  isWaitlist
                    ? 'bg-[#FDEEEB] border-[#F9CBC3] text-[#7D2819]'
                    : 'bg-[#FAF8F5] border-[#ECE7E1] text-[#1F1D1B]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-medium mb-1">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#E8543A]" />
                    {currentSession.duration} with {currentSession.trainerName}
                  </span>
                  <span className="font-mono">
                    {currentSession.capacity}/{currentSession.maxCapacity}{' '}
                    {isWaitlist ? 'Full' : 'Spots'}
                  </span>
                </div>
                <div className="text-xs text-[#6E6A66] flex items-center justify-between">
                  <span>Category: {currentSession.category}</span>
                  {isWaitlist ? (
                    <span className="text-[#E8543A] font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Waitlist Position #{Math.floor(Math.random() * 3) + 1}
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-medium">
                      {currentSession.maxCapacity - currentSession.capacity} spots open
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Session Selector (if user wants to switch) */}
              <div>
                <label
                  htmlFor="classSelect"
                  className="block text-[0.8rem] font-medium text-[#6E6A66] mb-1.5 uppercase tracking-[0.04em]"
                >
                  Selected Session
                </label>
                <select
                  id="classSelect"
                  value={currentSessionId}
                  onChange={(e) => setCurrentSessionId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[4px] border border-[#ECE7E1] bg-[#FAF8F5] text-[#1F1D1B] text-[0.95rem] focus:bg-white focus:border-[#E8543A] outline-hidden transition-colors cursor-pointer"
                >
                  {allSessions.map((session) => (
                    <option key={session.id} value={session.id}>
                      {session.day} {session.time} — {session.name} ({session.trainerName})
                    </option>
                  ))}
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-[0.8rem] font-medium text-[#6E6A66] mb-1.5 uppercase tracking-[0.04em]"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  placeholder="Elena Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[4px] border border-[#ECE7E1] bg-[#FAF8F5] text-[#1F1D1B] text-[0.95rem] focus:bg-white focus:border-[#E8543A] outline-hidden transition-colors"
                />
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[0.8rem] font-medium text-[#6E6A66] mb-1.5 uppercase tracking-[0.04em]"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="elena@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[4px] border border-[#ECE7E1] bg-[#FAF8F5] text-[#1F1D1B] text-[0.95rem] focus:bg-white focus:border-[#E8543A] outline-hidden transition-colors"
                />
              </div>

              {/* Phone (Optional) */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-[0.8rem] font-medium text-[#6E6A66] mb-1.5 uppercase tracking-[0.04em]"
                >
                  Mobile (For SMS reminder, optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+1 (212) 555-0198"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[4px] border border-[#ECE7E1] bg-[#FAF8F5] text-[#1F1D1B] text-[0.95rem] focus:bg-white focus:border-[#E8543A] outline-hidden transition-colors"
                />
              </div>

              {/* Complimentary Pass Toggle */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#6E6A66]">
                  <input
                    type="checkbox"
                    checked={applyComplimentaryPass}
                    onChange={(e) => setApplyComplimentaryPass(e.target.checked)}
                    className="mt-0.5 rounded-xs text-[#E8543A] focus:ring-[#E8543A]"
                  />
                  <span>
                    Apply Complimentary First Visit Pass ($0 introductory fee for first-time guests)
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#E8543A] hover:bg-[#D4442B] text-white text-[0.95rem] font-medium rounded-[4px] transition-all duration-150 cursor-pointer shadow-xs active:scale-[0.99] flex items-center justify-center gap-2"
                  id="submit-booking-btn"
                >
                  {isWaitlist ? 'Confirm Waitlist Request' : 'Confirm Spot Reservation'}
                </button>
                <p className="text-[0.72rem] text-[#9B9691] text-center mt-2.5">
                  Cancellation permitted up to 6 hours before class without penalty.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-2 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-[1.3rem] font-medium text-[#1F1D1B] mb-1">
              {confirmedBookingData?.isWaitlist
                ? 'Waitlist Position Confirmed'
                : 'Reservation Confirmed'}
            </h3>
            <p className="text-xs text-[#6E6A66] mb-6">
              Confirmation and locker details have been sent to{' '}
              <strong className="text-[#1F1D1B]">{email}</strong>
            </p>

            {/* Receipt Card */}
            <div className="bg-[#FAF8F5] border border-[#ECE7E1] rounded-[6px] p-4 text-left text-xs mb-6 space-y-2">
              <div className="flex justify-between border-b border-[#ECE7E1] pb-2">
                <span className="text-[#6E6A66]">Reference</span>
                <span className="font-mono font-medium text-[#1F1D1B]">
                  {confirmedBookingData?.reference}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#ECE7E1] pb-2">
                <span className="text-[#6E6A66]">Session</span>
                <span className="font-medium text-[#1F1D1B]">
                  {confirmedBookingData?.className}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#ECE7E1] pb-2">
                <span className="text-[#6E6A66]">Schedule</span>
                <span className="text-[#1F1D1B] font-medium">
                  {confirmedBookingData?.dayTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E6A66]">Coach</span>
                <span className="text-[#1F1D1B] font-medium">
                  {confirmedBookingData?.trainer}
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-[#1F1D1B] hover:bg-black text-white text-[0.9rem] font-medium rounded-[4px] transition-colors cursor-pointer"
              >
                Back to Schedule
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
