'use client';
import React, { useState, useEffect, useRef } from 'react';

const MedicalApproachComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [line1Visible, setLine1Visible] = useState(false);
  const [line2Visible, setLine2Visible] = useState(false);
  const [line3Visible, setLine3Visible] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (componentRef.current) {
        const elementTop = componentRef.current.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < window.innerHeight - elementVisible) {
          setIsVisible(true);
          setTimeout(() => setTitleVisible(true), 200);
          setTimeout(() => setLine1Visible(true), 600);
          setTimeout(() => setLine2Visible(true), 1000);
          setTimeout(() => setLine3Visible(true), 1400);
        }
      }
    };

    // בדיקה מיידית
    setTimeout(handleScroll, 100);
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [hovered, setHovered] = useState(false);

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gray-50 flex items-center justify-center min-h-[400px]">
      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-20px, -20px) rotate(120deg); }
          66% { transform: translate(20px, -10px) rotate(240deg); }
        }
        
        .rotating-bg {
          animation: rotate 15s linear infinite;
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }

        .medical-approach-gradient {
          background: linear-gradient(135deg, 
            #0a0f1a 0%,
            #101828 25%, 
            #1e293b 50%, 
            #0f172a 75%,
            #0a0f1a 100%
          );
        }

        @media (max-width: 640px) {
          .medical-approach-gradient {
            background: linear-gradient(135deg, 
              #000000 0%,
              #101828 20%, 
              #1e293b 40%,
              #2d3748 60%,
              #101828 80%,
              #000000 100%
            );
          }
        }
      `}</style>
      
      <div 
        ref={componentRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="medical-approach-gradient relative overflow-hidden mx-4 sm:mx-8 border border-gray-800/20"
        style={{
          borderRadius: '15px',
          padding: '40px 24px',
          margin: '16px auto',
          maxWidth: '900px',
          width: '100%',
          minHeight: '300px',
          position: 'relative',
          transition: 'all 0.8s ease-out',
          opacity: 1,
          transform: `scale(${hovered ? '1.02' : '1'})`,
          cursor: 'pointer',
          textAlign: 'center',
          color: 'white',
          textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* רקע מסתובב ונע - מוגבר למובייל */}
        <div 
          className="rotating-bg"
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: `
              radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 20% 70%, rgba(255, 255, 255, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.3) 0%, transparent 70%)
            `,
            pointerEvents: 'none',
          }}
        />
        
        {/* שכבת הדגשה נוספת למובייל */}
        <div 
          className="block sm:hidden absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, rgba(16, 24, 40, 0.2) 0%, transparent 50%, rgba(10, 15, 26, 0.3) 100%)',
            borderRadius: '15px',
          }}
        />
        
        {/* תוכן */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 
            className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-5 text-center"
            style={{
              transition: 'all 1s ease-out',
              opacity: 1,
              textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.1)',
            }}
          >
            הגישה הרפואית במרפאה
          </h2>
          
          <div className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-4xl mx-auto text-center">
            <div 
              className="mb-3 sm:mb-4"
              style={{
                transition: 'all 0.8s ease-out',
                opacity: 1,
                textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)',
              }}
            >
              <strong style={{ color: 'rgba(255, 255, 255, 0.95)' }}>טיפול איכותי</strong> מתחיל בהבנה עמוקה של המטופל או המטופלת
            </div>
            <div 
              className="mb-3 sm:mb-4"
              style={{
                transition: 'all 0.8s ease-out',
                opacity: 1,
                textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)',
              }}
            >
              לא רק מהבחינה הרפואית, אלא גם מההיבט האסתטי, הנפשי והאישי.
            </div>
            <div 
              style={{
                transition: 'all 0.8s ease-out',
                opacity: 1,
                textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)',
              }}
            >
              כל טיפול מתחיל באבחון מקיף ונבנה בהתאמה מלאה לצרכים ולמטרות הייחודיים של כל אחד ואחת.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalApproachComponent;