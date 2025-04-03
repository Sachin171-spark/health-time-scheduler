
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { TreatmentIcon } from './icons/TreatmentIcons';
import { useAppointment } from '@/context/AppointmentContext';

const AppointmentSummary = () => {
  const {
    selectedTreatment,
    selectedLocation,
    selectedDate,
    selectedTimeSlot,
    treatments,
    locations,
    bookAppointment
  } = useAppointment();

  // Format the time for display
  const formatTimeDisplay = (time: string) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    return `${hourNum % 12 || 12}:${minute} ${hourNum >= 12 ? 'PM' : 'AM'}`;
  };

  const isBookingComplete = 
    selectedTreatment && 
    selectedLocation && 
    selectedDate && 
    selectedTimeSlot;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-health-800">Appointment Summary</h2>
      <p className="text-muted-foreground">Review your appointment details</p>
      
      <Card className="shadow-sm">
        <CardContent className="p-6 space-y-6">
          {isBookingComplete ? (
            <>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-health-100 text-health-700 rounded-full">
                    <TreatmentIcon name={(selectedTreatment?.icon || 'stethoscope') as any} size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Treatment</h4>
                    <p className="font-medium">{selectedTreatment?.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-health-100 text-health-700 rounded-full">
                    <TreatmentIcon name="map-pin" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                    <p className="font-medium">{selectedLocation?.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedLocation?.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-health-100 text-health-700 rounded-full">
                    <TreatmentIcon name="calendar" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
                    <p className="font-medium">{format(selectedDate as Date, 'EEEE, MMMM d, yyyy')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-health-100 text-health-700 rounded-full">
                    <TreatmentIcon name="clock" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Time</h4>
                    <p className="font-medium">
                      {formatTimeDisplay(selectedTimeSlot?.startTime || '')} - {formatTimeDisplay(selectedTimeSlot?.endTime || '')}
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button 
                  onClick={bookAppointment}
                  className="bg-health-600 hover:bg-health-700"
                >
                  Confirm Booking
                </Button>
              </div>
            </>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="p-4 bg-muted rounded-full mb-4">
                <TreatmentIcon name="clipboard" size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Complete your booking</h3>
              <p className="text-muted-foreground max-w-md">
                Please complete all the required steps to see your appointment summary.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentSummary;
