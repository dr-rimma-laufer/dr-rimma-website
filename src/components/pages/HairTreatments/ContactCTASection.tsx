'use client';
import React from 'react';
import { Button } from '../../ui/button';
import { Sparkles, Calendar, Phone } from 'lucide-react';

interface ContactCTASectionProps {
  onNavigate?: (page: string) => void;
}

export function ContactCTASection({ onNavigate }: ContactCTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-l from-[#101828] to-[#0a0f1a] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Sparkles className="h-16 w-16 mx-auto mb-6 text-white" />
        <h2 className="text-3xl font-bold mb-6">
          מוכנים להתחיל את המסע לשיער חזק יותר?
        </h2>
        <p className="text-xl mb-8 text-green-100">
          קבעו ייעוץ אישי ללא התחייבות ובואו לגלות איך נוכל לעזור לכם לחזק את השיער שלכם
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-[#101828] hover:bg-[#0a0f1a] text-white"
            onClick={() => {
              console.log('Hair treatments consultation button clicked');
              if (onNavigate) {
                onNavigate('#contact');
              } else {
                console.warn('onNavigate function not provided to ContactCTASection');
              }
            }}
          >
            <Calendar className="ml-2 h-5 w-5" />
            ייעוץ חינם עכשיו
          </Button>
          <Button 
            variant="outline"
            size="lg" 
            className="border-white text-white hover:bg-white hover:text-[#101828]"
            onClick={() => {
              console.log('Hair treatments phone button clicked');
              try {
                window.open('tel:+972-3-1234567', '_self');
              } catch (error) {
                console.error('Error making phone call:', error);
                window.location.href = 'tel:+972-3-1234567';
              }
            }}
          >
            <Phone className="ml-2 h-5 w-5" />
            03-1234567
          </Button>
        </div>
      </div>
    </section>
  );
}
