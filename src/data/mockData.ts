
import { Treatment, Location, TimeSlot, Appointment } from '../types';

export const treatments: Treatment[] = [
  {
    id: '1',
    name: 'General Checkup',
    icon: 'stethoscope',
    description: 'Regular medical examination to assess your overall health.'
  },
  {
    id: '2',
    name: 'Dental Care',
    icon: 'tooth',
    description: 'Dental cleaning, filling, crown, or other dental procedures.'
  },
  {
    id: '3',
    name: 'Eye Examination',
    icon: 'eye',
    description: 'Comprehensive eye exam and vision testing.'
  },
  {
    id: '4',
    name: 'Dermatology',
    icon: 'hand',
    description: 'Skin problems, rashes, acne, and other dermatological issues.'
  },
  {
    id: '5',
    name: 'Orthopedics',
    icon: 'bone',
    description: 'Bone and joint problems, fractures, and sports injuries.'
  },
  {
    id: '6',
    name: 'Cardiology',
    icon: 'heart',
    description: 'Heart and blood vessel-related issues and checkups.'
  },
];

export const locations: Location[] = [
  {
    id: '1',
    name: 'Central Hospital',
    address: '123 Medical Drive, Healthville, HV 12345',
    distance: '2.3 miles'
  },
  {
    id: '2',
    name: 'Riverside Clinic',
    address: '456 Healing Blvd, Welltown, WT 67890',
    distance: '4.1 miles'
  },
  {
    id: '3',
    name: 'Metro Health Center',
    address: '789 Care Street, Medford, MF 45678',
    distance: '5.8 miles'
  },
  {
    id: '4',
    name: 'Oakwood Medical',
    address: '101 Wellness Road, Oakville, OV 23456',
    distance: '7.2 miles'
  },
];

export const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 8; // 8 AM
  const endHour = 17; // 5 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    // Add :00 slot
    slots.push({
      id: `${hour}-00`,
      startTime: `${hour}:00`,
      endTime: `${hour}:30`,
      available: Math.random() > 0.3 // 70% chance of being available
    });
    
    // Add :30 slot
    slots.push({
      id: `${hour}-30`,
      startTime: `${hour}:30`,
      endTime: `${hour + 1}:00`,
      available: Math.random() > 0.3 // 70% chance of being available
    });
  }
  
  return slots;
};

export const sampleAppointments: Appointment[] = [
  {
    id: '1',
    treatmentId: '1',
    locationId: '1',
    date: new Date(new Date().setDate(new Date().getDate() + 2)), // 2 days from now
    timeSlotId: '9-00', // 9:00 AM
    status: 'scheduled',
    patientName: 'John Doe',
    patientEmail: 'john@example.com',
    patientPhone: '(555) 123-4567',
    notes: 'First time visit'
  },
  {
    id: '2',
    treatmentId: '3',
    locationId: '2',
    date: new Date(new Date().setDate(new Date().getDate() + 5)), // 5 days from now
    timeSlotId: '14-30', // 2:30 PM
    status: 'scheduled',
    patientName: 'Jane Smith',
    patientEmail: 'jane@example.com',
    patientPhone: '(555) 987-6543',
    notes: 'Follow-up appointment'
  }
];
