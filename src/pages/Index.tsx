
import React from 'react';
import { Heart } from 'lucide-react';
import BookingFlow from '@/components/BookingFlow';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-health-50 to-white">
      <header className="border-b border-health-100">
        <div className="container mx-auto py-4 px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-health-600" fill="#0ea5e9" />
            <h1 className="text-xl font-bold text-health-800">Health Time Scheduler</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-health-900 mb-4">Book Your Health Appointment</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Schedule your medical appointments easily and keep track of your upcoming visits.
            </p>
          </div>
          
          <BookingFlow />
        </div>
      </main>
      
      <footer className="border-t border-health-100 py-6 mt-16">
        <div className="container mx-auto px-4 md:px-6 text-center text-muted-foreground">
          <p>© 2025 Health Time Scheduler. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
