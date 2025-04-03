
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TreatmentIcon } from './icons/TreatmentIcons';
import { useAppointment } from '@/context/AppointmentContext';

const TreatmentSelection = () => {
  const { treatments, selectedTreatment, setSelectedTreatment } = useAppointment();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-health-800">Select Treatment</h2>
      <p className="text-muted-foreground">What type of care do you need?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {treatments.map((treatment) => (
          <Card 
            key={treatment.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedTreatment?.id === treatment.id 
                ? 'border-health-500 bg-health-50' 
                : 'hover:border-health-200'
            }`}
            onClick={() => setSelectedTreatment(treatment)}
          >
            <CardContent className="p-6 flex items-start space-x-4">
              <div className={`p-3 rounded-full ${
                selectedTreatment?.id === treatment.id 
                  ? 'bg-health-100 text-health-700' 
                  : 'bg-gray-100 text-gray-500'
              }`}>
                <TreatmentIcon name={treatment.icon as any} size={24} />
              </div>
              <div>
                <h3 className="font-medium text-lg">{treatment.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{treatment.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TreatmentSelection;
