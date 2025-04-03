
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TreatmentIcon } from './icons/TreatmentIcons';
import { format, isAfter, isBefore, addMinutes } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAppointment } from '@/context/AppointmentContext';
import AppointmentTimer from './AppointmentTimer';
import { Appointment } from '@/types';

const AppointmentList = () => {
  const { appointments, treatments, locations, cancelAppointment } = useAppointment();
  const [activeTimer, setActiveTimer] = useState<Appointment | null>(null);

  // Helper function to format time slot
  const formatTimeDisplay = (timeSlotId: string) => {
    const [hour, minute] = timeSlotId.split('-');
    const hourNum = parseInt(hour);
    return `${hourNum % 12 || 12}:${minute === '30' ? '30' : '00'} ${hourNum >= 12 ? 'PM' : 'AM'}`;
  };
  
  // Get appointment date with time
  const getAppointmentDateTime = (appointment: Appointment) => {
    const appDate = new Date(appointment.date);
    const [hour, minute] = appointment.timeSlotId.split('-');
    appDate.setHours(parseInt(hour), parseInt(minute) === 30 ? 30 : 0, 0, 0);
    return appDate;
  };
  
  // Filter active appointments (scheduled and not in the past)
  const activeAppointments = appointments.filter(app => {
    if (app.status !== 'scheduled') return false;
    
    const appDateTime = getAppointmentDateTime(app);
    const now = new Date();
    
    // Consider appointments up to 30 minutes after their start time as "active"
    const endTime = addMinutes(appDateTime, 30);
    return !isBefore(endTime, now);
  });
  
  // Filter past appointments
  const pastAppointments = appointments.filter(app => {
    const appDateTime = getAppointmentDateTime(app);
    const now = new Date();
    
    // If the appointment was more than 30 minutes ago or cancelled, it's past
    const endTime = addMinutes(appDateTime, 30);
    return app.status === 'cancelled' || isBefore(endTime, now);
  });
  
  const getTreatmentName = (treatmentId: string) => {
    const treatment = treatments.find(t => t.id === treatmentId);
    return treatment?.name || 'Unknown Treatment';
  };
  
  const getLocationName = (locationId: string) => {
    const location = locations.find(l => l.id === locationId);
    return location?.name || 'Unknown Location';
  };

  return (
    <div className="space-y-6">
      {activeTimer && (
        <div className="mb-8">
          <AppointmentTimer 
            appointment={activeTimer} 
            onDismiss={() => setActiveTimer(null)} 
          />
        </div>
      )}
      
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-health-800">Your Appointments</h2>
        
        {/* Upcoming appointments */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl text-health-800">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {activeAppointments.length > 0 ? (
              <div className="space-y-4 divide-y">
                {activeAppointments.map(appointment => {
                  const appointmentDateTime = getAppointmentDateTime(appointment);
                  const isToday = format(appointmentDateTime, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
                  
                  return (
                    <div key={appointment.id} className="pt-4 first:pt-0">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="font-medium">{getTreatmentName(appointment.treatmentId)}</h3>
                            {isToday && (
                              <Badge className="ml-2 bg-health-500">Today</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {getLocationName(appointment.locationId)}
                          </p>
                          <p className="text-sm mt-2">
                            <span className="text-muted-foreground">Date:</span>{' '}
                            {format(appointmentDateTime, 'EEEE, MMMM d, yyyy')}
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">Time:</span>{' '}
                            {formatTimeDisplay(appointment.timeSlotId)}
                          </p>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Button 
                            variant="outline" 
                            className="text-sm border-health-200 hover:border-health-300"
                            onClick={() => setActiveTimer(appointment)}
                          >
                            <TreatmentIcon name="timer" size={16} className="mr-1" />
                            Start Timer
                          </Button>
                          <Button 
                            variant="outline" 
                            className="text-sm border-red-200 hover:border-red-300 text-red-600 hover:text-red-700"
                            onClick={() => cancelAppointment(appointment.id)}
                          >
                            <TreatmentIcon name="x-circle" size={16} className="mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <div className="p-4 bg-muted rounded-full mb-4">
                  <TreatmentIcon name="calendar" size={24} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No upcoming appointments</h3>
                <p className="text-muted-foreground max-w-md">
                  You don't have any scheduled appointments at the moment.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Past appointments */}
        {pastAppointments.length > 0 && (
          <Card className="shadow-sm mt-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-muted-foreground">Past Appointments</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4 divide-y">
                {pastAppointments.map(appointment => (
                  <div key={appointment.id} className="pt-4 first:pt-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{getTreatmentName(appointment.treatmentId)}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {getLocationName(appointment.locationId)}
                        </p>
                        <p className="text-sm mt-2">
                          <span className="text-muted-foreground">Date:</span>{' '}
                          {format(getAppointmentDateTime(appointment), 'MMMM d, yyyy')}
                        </p>
                        <p className="text-sm">
                          <span className="text-muted-foreground">Time:</span>{' '}
                          {formatTimeDisplay(appointment.timeSlotId)}
                        </p>
                      </div>
                      
                      <Badge 
                        variant="outline" 
                        className={appointment.status === 'cancelled' ? 'border-red-200 text-red-500' : 'border-green-200 text-green-500'}
                      >
                        {appointment.status === 'cancelled' ? 'Cancelled' : 'Completed'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;
