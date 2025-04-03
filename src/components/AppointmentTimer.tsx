
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TreatmentIcon } from './icons/TreatmentIcons';
import { Button } from '@/components/ui/button';
import { format, formatDistanceToNow, differenceInMilliseconds } from 'date-fns';
import { toast } from 'sonner';
import { Appointment } from '@/types';

interface AppointmentTimerProps {
  appointment: Appointment;
  onDismiss: () => void;
}

const AppointmentTimer: React.FC<AppointmentTimerProps> = ({ appointment, onDismiss }) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [progress, setProgress] = useState<number>(100);
  
  // Helper function to format time slot
  const formatTimeDisplay = (time: string) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    return `${hourNum % 12 || 12}:${minute} ${hourNum >= 12 ? 'PM' : 'AM'}`;
  };
  
  // Calculate appointment date with time
  const getAppointmentDateTime = () => {
    const appDate = new Date(appointment.date);
    
    // Extract hour and minute from timeSlot
    const [startHour, startMinute] = appointment.timeSlotId.split('-');
    
    // Set hours and minutes
    appDate.setHours(parseInt(startHour), parseInt(startMinute) === 30 ? 30 : 0, 0, 0);
    
    return appDate;
  };
  
  const appointmentDateTime = getAppointmentDateTime();
  
  useEffect(() => {
    // Calculate total duration for the progress bar
    const totalDuration = 60 * 60 * 1000; // 1 hour in milliseconds
    
    const updateTimer = () => {
      const now = new Date();
      const diff = differenceInMilliseconds(appointmentDateTime, now);
      
      if (diff <= 0) {
        setTimeRemaining('Appointment time!');
        setProgress(0);
        toast.info('Your appointment is starting now!');
        return;
      }
      
      setTimeRemaining(formatDistanceToNow(appointmentDateTime, { addSuffix: true }));
      
      // Calculate progress percentage (capped at 100%)
      const progressPercentage = Math.min(100, (diff / totalDuration) * 100);
      setProgress(progressPercentage);
    };
    
    // Update immediately
    updateTimer();
    
    // Set interval to update every minute
    const intervalId = setInterval(updateTimer, 60000);
    
    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, [appointmentDateTime]);
  
  return (
    <Card className="shadow-md border-health-100">
      <CardHeader className="bg-health-50 border-b border-health-100">
        <CardTitle className="text-health-800 flex items-center gap-2">
          <TreatmentIcon name="timer" className="text-health-600" />
          Appointment Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Appointment Date</p>
          <p className="font-medium">{format(appointmentDateTime, 'EEEE, MMMM d, yyyy')}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Appointment Time</p>
          <p className="font-medium">
            {formatTimeDisplay(appointment.timeSlotId.split('-').join(':'))}
          </p>
        </div>
        
        <div className="h-2 bg-gray-100 rounded-full mt-4 overflow-hidden">
          <div 
            className="h-full bg-health-500 transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-2 text-center">
          <p className="text-lg font-bold text-health-800 animate-pulse-gentle">
            {timeRemaining}
          </p>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onDismiss}>
            Dismiss
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentTimer;
