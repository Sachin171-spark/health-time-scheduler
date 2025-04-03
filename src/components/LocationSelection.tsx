
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TreatmentIcon } from './icons/TreatmentIcons';
import { useAppointment } from '@/context/AppointmentContext';

const LocationSelection = () => {
  const { locations, selectedLocation, setSelectedLocation } = useAppointment();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-health-800">Select Location</h2>
      <p className="text-muted-foreground">Choose a healthcare facility near you</p>
      
      <div className="grid grid-cols-1 gap-4 mt-4">
        {locations.map((location) => (
          <Card 
            key={location.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedLocation?.id === location.id 
                ? 'border-health-500 bg-health-50' 
                : 'hover:border-health-200'
            }`}
            onClick={() => setSelectedLocation(location)}
          >
            <CardContent className="p-6 flex items-start space-x-4">
              <div className={`p-3 rounded-full ${
                selectedLocation?.id === location.id 
                  ? 'bg-health-100 text-health-700' 
                  : 'bg-gray-100 text-gray-500'
              }`}>
                <TreatmentIcon name="map-pin" size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-lg">{location.name}</h3>
                  {location.distance && (
                    <span className="text-xs px-2 py-1 bg-mint-100 text-mint-700 rounded-full">
                      {location.distance}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{location.address}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LocationSelection;
