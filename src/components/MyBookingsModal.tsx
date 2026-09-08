import React from 'react';
import { X, Calendar, Clock, User, Trash2 } from 'lucide-react';
import { Booking } from '../types';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (bookingId: string, sessionId: string) => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-[#1F1D1B]/50 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity animate-in fade-in duration-200"
    >
      <div className="bg-white w-full max-w-[480px] rounded-[8px] p-6 sm:p-7 shadow-2xl relative border border-[#ECE7E1] animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-[#6E6A66] hover:text-[#1F1D1B] p-1.5 rounded-full hover:bg-[#FAF8F5] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h3 className="text-[1.3rem] font-medium text-[#1F1D1B] mb-1">
          Your Studio Reservations
        </h3>
        <p className="text-xs text-[#6E6A66] mb-5">
          Manage your registered sessions and waitlist positions.
        </p>

        {bookings.length === 0 ? (
          <div className="text-center py-8 text-[#9B9691] text-xs">
            No active reservations. Browse the weekly schedule to book a spot!
          </div>
        ) : (
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="p-3.5 rounded-[6px] border border-[#ECE7E1] bg-[#FAF8F5] flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#1F1D1B] text-[0.88rem]">
                      {b.className}
                    </span>
                    <span
                      className={`text-[0.68rem] px-2 py-0.5 rounded-full font-medium ${
                        b.isWaitlist
                          ? 'bg-[#FDEEEB] text-[#7D2819]'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {b.isWaitlist ? 'Waitlist' : 'Confirmed'}
                    </span>
                  </div>
                  <div className="text-[#6E6A66] flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#E8543A]" />
                      {b.day}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#E8543A]" />
                      {b.time}
                    </span>
                    <span>with {b.trainerName}</span>
                  </div>
                  <div className="text-[0.68rem] text-[#9B9691]">Guest: {b.userName}</div>
                </div>

                <button
                  type="button"
                  onClick={() => onCancelBooking(b.id, b.sessionId)}
                  className="p-2 text-[#9B9691] hover:text-red-600 hover:bg-red-50 rounded-[4px] transition-colors cursor-pointer shrink-0"
                  title="Cancel reservation"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#ECE7E1] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#1F1D1B] hover:bg-black text-white text-xs font-medium rounded-[4px] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
