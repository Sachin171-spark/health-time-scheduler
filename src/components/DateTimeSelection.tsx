
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppointment } from '@/context/AppointmentContext';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const DateTimeSelection = () => {
  const { 
    selectedDate, 
    setSelectedDate, 
    selectedTimeSlot, 
    setSelectedTimeSlot,
    getAvailableTimeSlots
  } = useAppointment();
  
  // Get available time slots for the selected date
  const timeSlots = selectedDate ? getAvailableTimeSlots(selectedDate) : [];
  
  // Group time slots by morning/afternoon
  const morningSlots = timeSlots.filter(slot => {
    const hour = parseInt(slot.startTime.split(':')[0]);
    return hour < 12;
  });
  
  const afternoonSlots = timeSlots.filter(slot => {
    const hour = parseInt(slot.startTime.split(':')[0]);
    return hour >= 12;
  });
  
  const formatTimeDisplay = (time: string) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    return `${hourNum % 12 || 12}:${minute} ${hourNum >= 12 ? 'PM' : 'AM'}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-health-800">Select Date & Time</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Date selection */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate || undefined}
              onSelect={(date) => setSelectedDate(date)}
              disabled={(date) => {
                // Disable dates in the past and more than 30 days in the future
                const now = new Date();
                now.setHours(0, 0, 0, 0);
                const maxDate = new Date();
                maxDate.setDate(maxDate.getDate() + 30);
                return date < now || date > maxDate;
              }}
              className={cn("p-3 pointer-events-auto rounded-md")}
            />
          </CardContent>
        </Card>
        
        {/* Time selection */}
        <Card className="lg:col-span-3 shadow-sm">
          <CardContent className="p-6">
            {selectedDate ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Available Times</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </p>
                </div>
                
                <div className="space-y-6">
                  {/* Morning slots */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Morning</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {morningSlots.length > 0 ? (
                        morningSlots.map(slot => (
                          <Button
                            key={slot.id}
                            variant={selectedTimeSlot?.id === slot.id ? "default" : "outline"}
                            className={cn(
                              !slot.available && "opacity-50 cursor-not-allowed",
                              selectedTimeSlot?.id === slot.id && "bg-health-600 hover:bg-health-700"
                            )}
                            onClick={() => slot.available && setSelectedTimeSlot(slot)}
                            disabled={!slot.available}
                          >
                            {formatTimeDisplay(slot.startTime)}
                          </Button>
                        ))
                      ) : (
                        <p className="col-span-4 text-sm text-muted-foreground">No morning slots available</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Afternoon slots */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Afternoon</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {afternoonSlots.length > 0 ? (
                        afternoonSlots.map(slot => (
                          <Button
                            key={slot.id}
                            variant={selectedTimeSlot?.id === slot.id ? "default" : "outline"}
                            className={cn(
                              !slot.available && "opacity-50 cursor-not-allowed",
                              selectedTimeSlot?.id === slot.id && "bg-health-600 hover:bg-health-700"
                            )}
                            onClick={() => slot.available && setSelectedTimeSlot(slot)}
                            disabled={!slot.available}
                          >
                            {formatTimeDisplay(slot.startTime)}
                          </Button>
                        ))
                      ) : (
                        <p className="col-span-4 text-sm text-muted-foreground">No afternoon slots available</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Please select a date to view available time slots
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DateTimeSelection;
