'use client';
import React from 'react';
import heroImage from '../../../assets/58082b36b3f9adc93768c0fbd570c6d77ea193ad_converted.jpg';

export function DermatologyHero() {
  return (
    <div className="relative h-[50vh] md:h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage.src})` }}
      />
      
      {/* Content */}
      <div className="relative h-full flex items-end md:items-start justify-start px-8 md:px-16 lg:px-20 pt-20 md:pt-32">
        {/* Main Title - Top Right on Desktop */}
        <div className="max-w-2xl text-right pr-6 pl-10 py-10 md:absolute md:top-48 md:right-0 md:pr-8" dir="rtl">
          <h1 className="font-['Bellefair'] text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            דרמטולוגיה רפואית
          </h1>
          <p className="font-['Assistant'] text-xl md:text-2xl text-white leading-relaxed mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            טיפול מקצועי ומקיף במחלות עור, שיער וציפורניים
          </p>
        </div>      
      </div>
    </div>
  );
}