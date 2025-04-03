
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Treatment, Location, TimeSlot, Appointment } from '../types';
import { treatments, locations, generateTimeSlots, sampleAppointments } from '../data/mockData';
import { format, isSameDay } from 'date-fns';
import { toast } from 'sonner';

interface AppointmentContextType {
  // Data
  treatments: Treatment[];
  locations: Location[];
  appointments: Appointment[];
  timeSlots: TimeSlot[];
  
  // Selected values
  selectedTreatment: Treatment | null;
  selectedLocation: Location | null;
  selectedDate: Date | null;
  selectedTimeSlot: TimeSlot | null;
  
  // Patient info
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientNotes: string;
  
  // Actions
  setSelectedTreatment: (treatment: Treatment | null) => void;
  setSelectedLocation: (location: Location | null) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedTimeSlot: (timeSlot: TimeSlot | null) => void;
  setPatientName: (name: string) => void;
  setPatientEmail: (email: string) => void;
  setPatientPhone: (phone: string) => void;
  setPatientNotes: (notes: string) => void;
  
  // Methods
  bookAppointment: () => void;
  cancelAppointment: (id: string) => void;
  getAvailableTimeSlots: (date: Date) => TimeSlot[];
  clearSelections: () => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Data state
  const [allTimeSlots] = useState<TimeSlot[]>(generateTimeSlots());
  const [appointments, setAppointments] = useState<Appointment[]>(sampleAppointments);
  
  // Selection state
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  
  // Patient info state
  const [patientName, setPatientName] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientNotes, setPatientNotes] = useState<string>('');
  
  // Filter available time slots based on selected date and existing appointments
  const getAvailableTimeSlots = (date: Date): TimeSlot[] => {
    if (!date) return [];
    
    // Get existing appointments for this date
    const existingAppointments = appointments.filter(
      app => app.status === 'scheduled' && isSameDay(app.date, date)
    );
    
    // Create a copy of all time slots
    const availableSlots = [...allTimeSlots];
    
    // Mark slots as unavailable if they are already booked
    existingAppointments.forEach(app => {
      const index = availableSlots.findIndex(slot => slot.id === app.timeSlotId);
      if (index !== -1) {
        availableSlots[index] = { ...availableSlots[index], available: false };
      }
    });
    
    return availableSlots;
  };
  
  // Book a new appointment
  const bookAppointment = () => {
    if (!selectedTreatment || !selectedLocation || !selectedDate || !selectedTimeSlot) {
      toast.error('Please complete all required fields');
      return;
    }
    
    if (!patientName || !patientEmail || !patientPhone) {
      toast.error('Please provide your contact information');
      return;
    }
    
    const newAppointment: Appointment = {
      id: `app-${Date.now()}`,
      treatmentId: selectedTreatment.id,
      locationId: selectedLocation.id,
      date: selectedDate,
      timeSlotId: selectedTimeSlot.id,
      status: 'scheduled',
      patientName,
      patientEmail,
      patientPhone,
      notes: patientNotes
    };
    
    setAppointments([...appointments, newAppointment]);
    
    toast.success('Appointment booked successfully!');
    clearSelections();
  };
  
  // Cancel an existing appointment
  const cancelAppointment = (id: string) => {
    const updatedAppointments = appointments.map(app => 
      app.id === id ? { ...app, status: 'cancelled' } : app
    );
    
    setAppointments(updatedAppointments);
    toast.success('Appointment cancelled successfully!');
  };
  
  // Clear all selections
  const clearSelections = () => {
    setSelectedTreatment(null);
    setSelectedLocation(null);
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setPatientName('');
    setPatientEmail('');
    setPatientPhone('');
    setPatientNotes('');
  };
  
  const value = {
    // Data
    treatments,
    locations,
    appointments,
    timeSlots: selectedDate ? getAvailableTimeSlots(selectedDate) : [],
    
    // Selected values
    selectedTreatment,
    selectedLocation,
    selectedDate,
    selectedTimeSlot,
    
    // Patient info
    patientName,
    patientEmail,
    patientPhone,
    patientNotes,
    
    // Set methods
    setSelectedTreatment,
    setSelectedLocation,
    setSelectedDate,
    setSelectedTimeSlot,
    setPatientName,
    setPatientEmail,
    setPatientPhone,
    setPatientNotes,
    
    // Action methods
    bookAppointment,
    cancelAppointment,
    getAvailableTimeSlots,
    clearSelections
  };
  
  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  return context;
};
