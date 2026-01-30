'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { TrueFocus } from '../../utils/TrueFocus';
import conservativeTreatmentImage from '../../assets/1ddb91ad4cad3ffe1727dd3e9dda1124ff85c389_converted.jpg';
import hairTransplantImage from '../../assets/0aaf0c6bf51ca38c17c9c8d2c63f8e3118794ea4_converted.jpg';
import aestheticsImage from '../../assets/8382a5d3e5b69e8395f8f50a7d43a96bb04a1d8a_converted.jpg';
import dermatologyImage from '../../assets/58082b36b3f9adc93768c0fbd570c6d77ea193ad_converted.jpg';
import hairConsultationImage from '../../assets/cb5f1b8f1f445785f9304568d6c2eb94aa08c4ca_converted.jpg';

const servicesData = [
  {
    title: "השתלת שיער",
    image: hairTransplantImage,
    page: "/hair-transplant"
  },
  {
    title: "יעוצי שיער",
    image: hairConsultationImage,
    page: "/contact"
  },
  {
    title: "טיפולי שיער שמרניים",
    image: conservativeTreatmentImage,
    page: "/hair-treatments"
  },
  {
    title: "רפואת עור",
    image: dermatologyImage,
    page: "/dermatology"
  },
  {
    title: "אסתטיקה רפואית",
    image: aestheticsImage,
    page: "/aesthetics"
  }
];

interface ServicesCardsSectionProps {
  onNavigate?: (page: string) => void;
}

export function ServicesCardsSection({ onNavigate }: ServicesCardsSectionProps) {
  return (
    <section className="min-h-screen lg:min-h-0 bg-white py-20 lg:py-12 hebrew-text">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-4 lg:px-6">
        {/* Header Section - מוצג רק במובייל וטאבלט */}
        <div className="text-center mb-16 lg:hidden">
          <h2 className="text-4xl md:text-5xl font-black text-[#101828] mb-6">
            השירותים שלנו
          </h2>
          <p className="text-lg md:text-xl text-[#101828]/80 max-w-3xl mx-auto leading-relaxed">
            מגוון רחב של טיפולים מתקדמים ומקצועיים בתחומי השיער, רפואת העור ואסתטיקה רפואית
            עם טכנולוגיות מתקדמות ביותר
          </p>
        </div>

        {/* Header Section Desktop - רק כותרת */}
        <div className="text-center mb-16 hidden lg:block">
          <h2 className="text-4xl md:text-5xl font-black text-[#101828] mb-6">
            השירותים שלנו
          </h2>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {/* קלף טקסט - מוצג רק בדסקטופ כקלף ראשון */}
          <div 
            className="treatment-summary-gradient hidden lg:flex items-center justify-center relative overflow-hidden border border-gray-800/20"
            style={{
              borderRadius: '12px',
              padding: '20px 24px',
              margin: '0 0 8px 0',
              maxWidth: '1024px',
              width: '100%',
              height: '420px',
              position: 'relative',
              transition: 'all 0.8s ease-out',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <style>{`
              @keyframes rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
            
            {/* רקע מסתובב ונע */}
            <div 
              className="rotating-bg"
              style={{
                position: 'absolute',
                top: '-40%',
                left: '15%',
                width: '70%',
                height: '180%',
                background: `
                  radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
                  radial-gradient(circle at 20% 70%, rgba(255, 255, 255, 0.12) 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.3) 0%, transparent 70%)
                `,
                pointerEvents: 'none',
                animation: 'rotate 15s linear infinite',
              }}
            />

            <div 
              className="text-xl lg:text-2xl font-bold text-white text-right leading-relaxed"
              style={{ 
                position: 'relative', 
                zIndex: 1,
              }}
            >
              <h3 style={{ textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.1)' }}>
                בקליניקה מוצע
              </h3>
              <h3 style={{ textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.1)' }}>
                מגוון רחב של טיפולים מתקדמים
              </h3>
              <div style={{ height: '1.5rem' }}></div>
              <div className="flex flex-col items-end gap-2 w-full">
                <TrueFocus 
                  sentence="השתלות השיער|יעוצי שיער|טיפולי שיער שמרניים|רפואת העור|אסתטיקה הרפואית"
                  separator="|"
                  direction="vertical"
                  lineOffsets={[20, 60, 100, 140,180]}
                  manualMode={false}
                  blurAmount={4}
                  borderColor="#ffffff"
                  glowColor="rgba(255, 255, 255, 0.8)"
                  animationDuration={0.8}
                  pauseBetweenAnimations={1.5}
                  className="text-xl sm:text-2xl font-bold w-full"
                />
              </div>
              <div style={{ height: '1.5rem' }}></div>
              <h3 style={{ textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.1)' }}>
                כולם מבוססים על הטכנולוגיות החדשניות והיעילות ביותר.
              </h3>
            </div>
          </div>

          {servicesData.map((service, index) => (
            <Link
              key={`service-card-${index}-v2`}
              href={service.page}
              className="relative h-72 sm:h-80 lg:h-[420px] rounded-2xl overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-105 shadow-2xl block"
            >
              {/* Background Image */}
              <img
                src={typeof service.image === 'string' ? service.image : service.image.src}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* גרדיאנט כהה */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="text-right space-y-2">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight drop-shadow-lg">
                    {service.title}
                  </h3>
                </div>

                {/* Arrow icon */}
                <div className="absolute bottom-6 left-6">
                  <div className="w-12 h-12 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300">
                    <ArrowLeft className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#905e26]/0 to-[#905e26]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          ))}
        </div>      
      </div>
    </section>
  );
}
