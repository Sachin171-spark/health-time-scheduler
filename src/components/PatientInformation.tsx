
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAppointment } from '@/context/AppointmentContext';

const PatientInformation = () => {
  const { 
    patientName, setPatientName,
    patientEmail, setPatientEmail,
    patientPhone, setPatientPhone,
    patientNotes, setPatientNotes
  } = useAppointment();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-health-800">Your Information</h2>
      <p className="text-muted-foreground">Please provide your contact details</p>
      
      <Card className="shadow-sm">
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                value={patientName} 
                onChange={(e) => setPatientName(e.target.value)} 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john@example.com" 
                value={patientEmail} 
                onChange={(e) => setPatientEmail(e.target.value)} 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
              <Input 
                id="phone" 
                placeholder="(555) 123-4567" 
                value={patientPhone} 
                onChange={(e) => setPatientPhone(e.target.value)} 
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (optional)</Label>
            <Textarea 
              id="notes" 
              placeholder="Any additional information about your visit..." 
              value={patientNotes} 
              onChange={(e) => setPatientNotes(e.target.value)} 
              className="min-h-[120px]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientInformation;
