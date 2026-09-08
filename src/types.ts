export interface ClassSession {
  id: string;
  name: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  time: '7:00 AM' | '9:00 AM' | '12:00 PM' | '4:30 PM' | '6:00 PM' | '7:15 PM';
  capacity: number;
  maxCapacity: number;
  trainerId: string;
  trainerName: string;
  category: 'Strength' | 'HIIT' | 'Mobility & Recovery' | 'Vinyasa';
  duration: string;
  description: string;
  intensity: 'Medium' | 'High' | 'Restorative';
}

export interface Instructor {
  id: string;
  initials: string;
  name: string;
  specialty: string;
  bio: string;
  classesCount: number;
}

export interface Booking {
  id: string;
  sessionId: string;
  className: string;
  day: string;
  time: string;
  trainerName: string;
  userName: string;
  userEmail: string;
  isWaitlist: boolean;
  bookedAt: string;
}
