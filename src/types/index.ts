
export interface Treatment {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  distance?: string;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  treatmentId: string;
  locationId: string;
  date: Date;
  timeSlotId: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  notes?: string;
}
