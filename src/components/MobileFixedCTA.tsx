'use client';
import React from 'react';
import { Button } from './ui/button';
import { Phone, Calendar } from 'lucide-react';
import { AppointmentDialog } from './AppointmentDialog';

export function MobileFixedCTA() {
  const handlePhoneCall = () => {
    console.log('Phone call button clicked'); // Debug log
    // Updated to a more realistic Israeli phone number format
    try {
      window.open('tel:+972-50-123-4567', '_self');
    } catch (error) {
      console.error('Error making phone call:', error);
      // Fallback for browsers that don't support tel: protocol
      window.location.href = 'tel:+972-50-123-4567';
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 mobile-fixed-cta">
      <div className="flex bg-white border-t border-dark-blue/20">
        {/* Call Button - Gold */}
        <Button 
          className="flex-1 bg-gold text-white hover:bg-dark-blue hover:text-white font-bold text-sm py-4 h-14 rounded-none border-0 shadow-none transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          onClick={handlePhoneCall}
        >
          <Phone className="ml-2 h-4 w-4" />
          חייג עכשיו
        </Button>
        
        {/* Appointment Button - Dark Blue */}
        <AppointmentDialog>
          <Button 
            className="flex-1 bg-dark-blue text-white hover:bg-gold hover:text-white font-bold text-sm py-4 h-14 rounded-none border-0 shadow-none transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Calendar className="ml-2 h-4 w-4" />
            קביעת תור
          </Button>
        </AppointmentDialog>
      </div>
    </div>
  );
}