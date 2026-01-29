'use client';

import React, { useState, useEffect } from 'react';
import { DOCTOR_INFO } from '../../utils/constants';
import heroImageDesktop from '../../assets/7ee6505bd8c73b731b0d370613d5dd151ee99ec3_converted.jpg';
import heroImageMobile from '../../assets/7ee6505bd8c73b731b0d370613d5dd151ee99ec3_converted.jpg';

export function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const backgroundImage = isMobile ? heroImageMobile : heroImageDesktop;

  return (
    <section 
      className="relative flex flex-col justify-start overflow-hidden hebrew-text"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: isMobile ? '85vh' : '100vh'
      }}
    >
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 w-full pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 flex items-center" style={{ height: isMobile ? '85vh' : '100vh' }}>
        <div className="w-full px-4 sm:px-6 lg:pr-12 lg:pl-8 lg:self-end" style={{ marginBottom: isMobile ? '0' : '80px' }}>
          <div className="max-w-2xl text-right space-y-4 sm:space-y-8 lg:mr-0 lg:ml-auto pb-8 lg:pb-0" style={{ paddingTop: isMobile ? '50vh' : '0', marginTop: isMobile ? '0' : '200px', maxWidth: isMobile ? '100%' : '1100px' }}>
            {/* Main title - responsive sizes */}
            <h1 
              style={{ 
                fontSize: isMobile ? '32px' : '80px', 
                color: 'white', 
                marginBottom: '6px', 
                marginTop: '0',
                lineHeight: '1.1', 
                fontFamily: "'Bellefair', serif", 
                fontWeight: 'bold' 
              }} 
              className="text-right drop-shadow-2xl"
            >
                ד"ר רימה לאופר בריטבה
              <br />
            </h1>
            
            {/* Subtitle - responsive sizes */}
            <h2 
              style={{ 
                fontSize: isMobile ? '16px' : '28px',
                lineHeight: '1.3',
                fontWeight: 'bold'
              }}
              className="text-white drop-shadow-2xl text-right mb-4"
            >
                מומחית לרפואת עור, שיער ואסתטיקה רפואית
              <br />
            </h2>
            
            {/* Welcome text */}
            <div className="mb-4">
              <p 
                style={{ 
                  fontSize: isMobile ? '16px' : '28px',
                  lineHeight: '1.6',
                  maxWidth: isMobile ? '100%' : '900px'
                }}
                className="font-normal text-white/95 tracking-wide drop-shadow-xl text-right"
              >
                בעלת ניסיון קליני ומחקרי עשיר ברפואת עור ושיער,
                <br />
                עם הכשרה מתקדמת באירופה בהשתלות שיער, טריכולוגיה ואסתטיקה רפואית.
              </p>
            </div>
              
          </div>
        </div>
      </div>
    </section>
  );
}