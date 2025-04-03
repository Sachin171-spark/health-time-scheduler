
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TreatmentSelection from './TreatmentSelection';
import LocationSelection from './LocationSelection';
import DateTimeSelection from './DateTimeSelection';
import PatientInformation from './PatientInformation';
import AppointmentSummary from './AppointmentSummary';
import AppointmentList from './AppointmentList';
import { useAppointment } from '@/context/AppointmentContext';
import { Button } from '@/components/ui/button';

const BookingFlow = () => {
  const [activeTab, setActiveTab] = useState('book');
  const [bookingStep, setBookingStep] = useState(1);
  
  const { 
    selectedTreatment, 
    selectedLocation, 
    selectedDate, 
    selectedTimeSlot,
    patientName,
    patientEmail,
    patientPhone
  } = useAppointment();
  
  const canProceedToStep2 = !!selectedTreatment;
  const canProceedToStep3 = canProceedToStep2 && !!selectedLocation;
  const canProceedToStep4 = canProceedToStep3 && !!selectedDate && !!selectedTimeSlot;
  const canProceedToStep5 = canProceedToStep4 && !!patientName && !!patientEmail && !!patientPhone;
  
  const getStepStatus = (step: number) => {
    if (step === 1) return true;
    if (step === 2) return canProceedToStep2;
    if (step === 3) return canProceedToStep3;
    if (step === 4) return canProceedToStep4;
    if (step === 5) return canProceedToStep5;
    return false;
  };
  
  const renderBookingStep = () => {
    switch (bookingStep) {
      case 1:
        return <TreatmentSelection />;
      case 2:
        return <LocationSelection />;
      case 3:
        return <DateTimeSelection />;
      case 4:
        return <PatientInformation />;
      case 5:
        return <AppointmentSummary />;
      default:
        return <TreatmentSelection />;
    }
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="book" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="book">Book Appointment</TabsTrigger>
          <TabsTrigger value="appointments">Your Appointments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="book">
          <div className="space-y-8 mt-6">
            {/* Progress Steps */}
            <div className="hidden sm:flex justify-between items-center">
              {[1, 2, 3, 4, 5].map((step) => (
                <div 
                  key={step}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => getStepStatus(step) && setBookingStep(step)}
                >
                  <div 
                    className={`rounded-full h-10 w-10 flex items-center justify-center text-sm font-medium ${
                      step === bookingStep
                        ? 'bg-health-600 text-white'
                        : getStepStatus(step)
                          ? 'bg-health-100 text-health-700 hover:bg-health-200'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {step}
                  </div>
                  <span 
                    className={`text-xs mt-2 ${
                      step === bookingStep
                        ? 'text-health-700 font-medium'
                        : getStepStatus(step)
                          ? 'text-health-600'
                          : 'text-gray-400'
                    }`}
                  >
                    {step === 1 && 'Treatment'}
                    {step === 2 && 'Location'}
                    {step === 3 && 'Date & Time'}
                    {step === 4 && 'Information'}
                    {step === 5 && 'Summary'}
                  </span>
                  
                  {step < 5 && (
                    <div className="w-full h-0.5 mt-4 hidden md:block">
                      <div 
                        className={getStepStatus(step + 1) ? 'bg-health-300' : 'bg-gray-200'} 
                        style={{ height: '1px', width: '100%' }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Current Step Content */}
            <div>
              {renderBookingStep()}
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setBookingStep(bookingStep - 1)}
                disabled={bookingStep === 1}
              >
                Previous
              </Button>
              
              <Button
                onClick={() => setBookingStep(bookingStep + 1)}
                disabled={
                  (bookingStep === 1 && !canProceedToStep2) ||
                  (bookingStep === 2 && !canProceedToStep3) ||
                  (bookingStep === 3 && !canProceedToStep4) ||
                  (bookingStep === 4 && !canProceedToStep5) ||
                  bookingStep === 5
                }
                className="bg-health-600 hover:bg-health-700"
              >
                {bookingStep < 5 ? 'Next' : 'Finish'}
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="appointments">
          <div className="mt-6">
            <AppointmentList />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingFlow;
