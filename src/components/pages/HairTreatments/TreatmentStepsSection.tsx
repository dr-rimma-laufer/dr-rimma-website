'use client';
import React, { useState, useEffect, useRef, useCallback } from "react";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import medicalConsultationImage from '../../../assets/16b8df6bf70f413ac77e5c54e5f658cb82e506bb_converted.jpg';
import labTestsImage from '../../../assets/51a988542617304ba599026775a89a97a51819f0_converted.jpg';
import dermatoscopeImage from '../../../assets/148c58626ab46e32161c79dee6143f87ac47c598_converted.jpg';
import treatmentPlanImage from '../../../assets/9024514165330b52a31ec3d3841fdfa1a6a28f8a_converted.jpg';

type TreatmentStep = {
  id: string;
  step: number;
  title: string;
  intro: string;
  bullets?: string[];
  image: string;
};

const treatmentSteps: TreatmentStep[] = [
  {
    id: '01',
    step: 1,
    title: 'שיחה רפואית מעמיקה',
    intro: 'הטיפול מתחיל בהכרת המטופל, זיהוי הגורמים האפשריים המשפיעים על מצב הקרקפת והשיער, תוך התאמה מלאה לפרופיל רפואי והאישי של המטופל/ת. אנו רואים בשיער חלק בלתי נפרד מהבריאות הכללית – לכן ניתוח מצב הקרקפת נעשה תוך הסתכלות רחבה, מערכתית ורגישה.',
    bullets: [
      'היסטוריה רפואית ומחלות רקע',
      'בדיקות דם עדכניות',
      'טיפול תרופתי קיים',
      'גורמים סביבתיים, תזונה והרגלי אורח חיים'
    ],
    image: medicalConsultationImage
  },
  {
    id: '02',
    step: 2,
    title: 'בדיקה קלינית ודרמטסקופית מדויקת בטכנולוגיה מתקדמת',
    intro: 'בהמשך, נערכת בדיקה קלינית יסודית של הקרקפת והשיער, לרוב באמצעות מערכת ההדמיה המתקדמת Fotofinder.',
    bullets: [
      'מדידה מדויקת של צפיפות השיער ובריאות זקיקי השיער',
      'איתור אזורים דלקתיים או מצולקים',
      'צילום תיעודי לצורך מעקב עתידי'
    ],
    image: dermatoscopeImage
  },
  {
    id: '03',
    step: 3,
    title: 'בדיקות מעבדה או ביופסיה',
    intro: 'בהתאם לצורך רפואי, מבצעים בדיקות מעבדה מקיפות או ביופסיה להשלמת האבחנה.',
    bullets: [
      'לפי הצורך'
    ],
    image: labTestsImage
  },
  {
    id: '04',
    step: 4,
    title: 'קביעת תוכנית טיפול משותפת',
    intro: 'מטרות הטיפול משתנות בהתאם לאבחנה, והן מותאמות אישית לכל מטופל/ת.',
    bullets: [
      'טיפול מקומי',
      'טיפול מערכתי',
      'עידוד צמיחה מחודשת של שיער',
      'עצירת תהליך ההחמרה ומניעת נשירה נוספת',
      'שיפור בריאות הקרקפת וצמצום השפעת גורמים מזיקים',
      'שימור התוצאה לאורך זמן'
    ],
    image: treatmentPlanImage
  },
];

function TreatmentStepCard({ step, isActive, onClick, isMobile = false, isHovered = false }: { 
  step: TreatmentStep; 
  isActive: boolean;
  onClick: () => void;
  isMobile?: boolean;
  isHovered?: boolean;
}) {
  return (
    <div className={`${
      isMobile ? 'w-full' : 'w-[90%] mx-auto'
    } transform transition-all duration-700 ease-in-out`}>
      {/* Step Number with Line */}
      <div className="text-right mb-4">
        <div className="flex items-center justify-start -mt-2">
          <div className={`text-2xl font-bold mr-4 transition-colors duration-300 ${
            isHovered ? 'text-[#101828]' : 'text-[#101828]/70'
          }`}>
            {step.id}
          </div>
          <div className={`w-32 h-px transition-all duration-300 ${
            isHovered ? 'bg-[#101828]' : 'bg-[#101828]/50'
          }`}></div>
        </div>
      </div>

      {/* Step Card - Enhanced hover effects for desktop */}
      <div 
        className={`relative flex flex-col ${
          isMobile ? 'h-[520px]' : 'h-[500px]'
        } rounded-2xl bg-white overflow-hidden transition-all duration-300 cursor-pointer group ${
          isMobile
            ? 'shadow-md ring-1 ring-[#101828]/5'
            : isHovered
              ? 'scale-[1.11] shadow-xl ring-1 ring-[#101828]/15'
              : 'shadow-md ring-1 ring-[#101828]/5 hover:shadow-lg hover:scale-105 hover:ring-[#101828]/10'
        }`}
        onClick={onClick}
      >
        {/* Hover Highlight Effect for Desktop - only on hover */}
        {!isMobile && isHovered && (
          <div className="absolute inset-0 rounded-2xl">
            <div 
              className="absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-15"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(16, 24, 40, 0.1) 0%, 
                  rgba(16, 24, 40, 0.05) 25%, 
                  rgba(16, 24, 40, 0.1) 50%, 
                  rgba(16, 24, 40, 0.05) 75%, 
                  rgba(16, 24, 40, 0.1) 100%)`
              }}
            />
          </div>
        )}
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Image - Fixed Height */}
          <div className="overflow-hidden flex-shrink-0">
            <ImageWithFallback
              src={step.image}
              alt={step.title}
              className={`w-full h-60 object-cover transition-transform duration-500 ${
                !isMobile ? 'group-hover:scale-105' : ''
              }`}
            />
          </div>
          
          {/* Content - Flexible with proper spacing */}
          <div className="flex flex-col flex-grow px-4 py-3">
            <div className="flex-shrink-0 mb-1">
              <h3 className={`text-lg font-semibold tracking-tight mb-1 transition-colors duration-300 ${
                isHovered ? 'text-[#101828]' : 'text-[#101828]/90'
              }`}>{step.title}</h3>
              <p className={`leading-relaxed text-sm line-clamp-3 transition-colors duration-300 ${
                isHovered ? 'text-[#101828]/70' : 'text-[#101828]/60'
              }`}>{step.intro}</p>
            </div>
            
            {/* Bullets - Fixed area */}
            <div className="flex-grow flex items-start">
              {step.bullets ? (
                <ul className="space-y-0.5 w-full">
                  {step.bullets.slice(0, 4).map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-right">
                      <CheckCircle className={`mt-0.5 h-3 w-3 flex-none transition-colors duration-300 ${
                        isHovered ? 'text-[#905e26]' : 'text-[#905e26]/70'
                      }`} />
                      <span className={`text-xs line-clamp-1 transition-colors duration-300 ${
                        isHovered ? 'text-[#101828]/80' : 'text-[#101828]/70'
                      }`}>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="w-full h-8 flex items-center justify-center text-[#101828]/50 text-xs">
                  לפי הצורך הרפואי
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TreatmentStepsSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const [swipeProgress, setSwipeProgress] = useState(0);
  
  // Mobile swipe functionality with enhanced sensitivity
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [touchCurrent, setTouchCurrent] = useState<number | null>(null);
  const minSwipeDistance = 25; // Reduced from 50 for better sensitivity

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Function to get visible steps based on screen size and current step - NO WRAPAROUND
  const getVisibleSteps = useCallback(() => {
    if (isMobile) {
      // Mobile: show only current step
      return [treatmentSteps[currentStep]];
    } else {
      // Desktop: show current step first (rightmost), then next steps - NO WRAPAROUND
      const totalSteps = treatmentSteps.length;
      const visibleSteps: TreatmentStep[] = [];
      
      // Add current step first (will be rightmost)
      visibleSteps.push(treatmentSteps[currentStep]);
      
      // Add next steps (up to 3 more for 4 total cards) - but don't wraparound
      for (let i = 1; i <= 3; i++) {
        const nextIndex = currentStep + i;
        if (nextIndex < totalSteps) {
          visibleSteps.push(treatmentSteps[nextIndex]);
        }
      }
      
      return visibleSteps;
    }
  }, [isMobile, currentStep]);

  const handleStepChange = useCallback((stepIndex: number) => {
    if (stepIndex !== currentStep && stepIndex >= 0 && stepIndex < treatmentSteps.length) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(stepIndex);
        setIsTransitioning(false);
      }, 300);
    }
  }, [currentStep]);

  const handleCardClick = (stepIndex: number) => {
    handleStepChange(stepIndex);
  };

  // Enhanced mobile swipe handlers with visual feedback
  const onTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchEnd(null);
    setTouchCurrent(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwipeActive(true);
    setSwipeProgress(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !touchStart) return;
    const currentX = e.targetTouches[0].clientX;
    setTouchEnd(currentX);
    setTouchCurrent(currentX);
    
    // Calculate swipe progress for visual feedback
    const distance = touchStart - currentX;
    const maxDistance = 100; // Maximum distance for full progress
    const progress = Math.min(Math.abs(distance) / maxDistance, 1);
    setSwipeProgress(progress);
  };

  const onTouchEnd = () => {
    if (!isMobile || !touchStart || !touchEnd) {
      setIsSwipeActive(false);
      setSwipeProgress(0);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentStep < treatmentSteps.length - 1) {
      handleStepChange(currentStep + 1);
    } else if (isRightSwipe && currentStep > 0) {
      handleStepChange(currentStep - 1);
    }
    
    setIsSwipeActive(false);
    setSwipeProgress(0);
    setTouchStart(null);
    setTouchEnd(null);
    setTouchCurrent(null);
  };

  // Desktop hover handlers
  const handleMouseEnter = (stepIndex: number) => {
    if (!isMobile) {
      setHoveredCard(stepIndex);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoveredCard(null);
    }
  };

  return (
    <div dir="rtl" className="bg-white pb-20 pt-0 hebrew-text">
      {/* Summary section - Full Width on Desktop, Rounded on Mobile */}
      <div className="py-2 sm:py-4 md:py-0 flex items-center justify-center">
        <style>{`
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes shine {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
            100% { transform: translateX(100%); }
          }

          .treatment-summary-gradient {
            background: linear-gradient(135deg, 
              #0a0f1a 0%,
              #101828 25%, 
              #1e293b 50%, 
              #0f172a 75%,
              #0a0f1a 100%
            );
          }

          @media (max-width: 640px) {
            .treatment-summary-gradient {
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
          className="treatment-summary-gradient relative overflow-hidden w-full md:mx-0 border-none"
          style={{
            borderRadius: '0',
            padding: window.innerWidth >= 768 ? '40px 16px' : '20px 16px',
            margin: '0',
            maxWidth: '100%',
            width: '100%',
            position: 'relative',
            transition: 'all 0.8s ease-out',
            color: 'white',
            boxShadow: 'none'
          }}
        >
          {/* רקע מסתובב ונע */}
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
              animation: 'rotate 15s linear infinite',
            }}
          />
          
          {/* רקע נוסף עם אפקט גלים */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `
                linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.08) 50%, transparent 70%)
              `,
              transform: 'translateX(-100%)',
              animation: 'shine 6s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />

          {/* שכבת הדגשה נוספת למובייל */}
          <div 
            className="block sm:hidden absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(45deg, rgba(16, 24, 40, 0.2) 0%, transparent 50%, rgba(10, 15, 26, 0.3) 100%)',
            }}
          />
          
          {/* תוכן */}
          <div style={{ position: 'relative', zIndex: 1 }} className="mx-auto max-w-[1800px] px-8 md:px-16">
            {/* Mobile: Centered layout */}
            <div className="md:hidden text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                טיפול מקצועי בבעיות שיער וקרקפת
              </h1>
              
              {/* Slogan - under title (mobile) */}
              <div className="text-center mb-6">
                <p className="text-xl sm:text-2xl font-bold text-white animate-scaleLineUp" style={{ textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.1)' }}>
                  אבחון מדויק 
                </p>
                <p className="text-xl sm:text-2xl font-bold text-white animate-scaleLineUp-delay-1" style={{ textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.1)' }}>
                  הינו
                </p>
                <p className="text-xl sm:text-2xl font-bold text-white animate-scaleLineUp-delay-2" style={{ textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.1)' }}>
                   הבסיס להצלחת הטיפול
                </p>
              </div>
              
              <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed text-right">
במרפאתנו אנו מאמינים שהצעד הראשון להצלחה בטיפול הוא הבנה עמוקה של מקור הבעיה. לפני שנציע כל פתרון או תוכנית טיפול, אנו מבצעים אבחון מקיף ומדויק, הכולל בדיקה קלינית, אנמנזה מפורטת ובדיקות מתקדמות לאיתור כל הגורמים המשפיעים על מצב הקרקפת והשיער.
גישה זו מאפשרת לנו להתאים את הטיפול בצורה אישית ומדויקת, ולהבטיח למטופלים את הפתרון הנכון ביותר עבורם – כזה לא רק מטפל בבעיה הנראית לעין, אלא מתמודד עם שורש הבעיה לשיפור תוצאות לטווח הארוך.
              </p>
            </div>
            
            {/* Desktop: Two column layout with title on right, text on left */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-16 md:items-start">
              {/* Right side: Title + Slogan */}
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white">
                  טיפול מקצועי בבעיות שיער וקרקפת
                </h1>
                
                {/* Slogan - under title (desktop) */}
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold text-white animate-scaleLineUp - 1" style={{ textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.1)' }}>
                    אבחון מדויק 
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-white" style={{ textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.1)' }}>
                    הינו
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-white animate-scaleLineUp-delay-1" style={{ textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.1)' }}>
                     הבסיס להצלחת הטיפול
                  </p>
                </div>
              </div>
              
              {/* Left side: Description text */}
              <div className="text-right">
                <p className="text-xl text-white/90 leading-relaxed">
במרפאתנו אנו מאמינים שהצעד הראשון להצלחה בטיפול הוא הבנה עמוקה של מקור הבעיה. לפני שנציע כל פתרון או תוכנית טיפול, אנו מבצעים אבחון מקיף ומדויק, הכולל בדיקה קלינית, אנמנזה מפורטת ובדיקות מתקדמות לאיתור כל הגורמים המשפיעים על מצב הקרקפת והשיער.
גישה זו מאפשרת לנו להתאים את הטיפול בצורה אישית ומדויקת, ולהבטיח למטופלים את הפתרון הנכון ביותר עבורם – כזה לא רק מטפל בבעיה הנראית לעין, אלא מתמודד עם שורש הבעיה לשיפור תוצאות לטווח הארוך.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12 mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#101828]">
            תהליך יעוץ השיער
          </h2>
        </div>

        {/* Steps with transition animation */}
        <div 
          ref={containerRef}
          className="relative overflow-hidden mb-16 pb-12 pt-4"
          onTouchStart={isMobile ? onTouchStart : undefined}
          onTouchMove={isMobile ? onTouchMove : undefined}
          onTouchEnd={isMobile ? onTouchEnd : undefined}
        >
          <div 
            className={`transition-all duration-700 ease-in-out transform ${
              isTransitioning 
                ? 'opacity-0 translate-x-8' 
                : 'opacity-100 translate-x-0'
            }`}
          >
            {isMobile ? (
              // Mobile: Single card view with enhanced swipe feedback
              <div className="w-full relative">
                {/* Swipe visual feedback */}
                {isSwipeActive && swipeProgress > 0 && (
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    <div 
                      className="absolute inset-0 bg-[#101828]/10 rounded-2xl transition-opacity duration-150"
                      style={{ opacity: swipeProgress * 0.5 }}
                    />
                    {touchCurrent && touchStart && (
                      <div 
                        className="absolute top-1/2 transform -translate-y-1/2 text-[#101828] font-bold text-lg transition-all duration-150"
                        style={{
                          left: touchCurrent < touchStart ? 'auto' : '50%',
                          right: touchCurrent < touchStart ? '50%' : 'auto',
                          transform: 'translateY(-50%)',
                          opacity: swipeProgress
                        }}
                      >
                        {touchCurrent < touchStart ? 
                          (currentStep < treatmentSteps.length - 1 ? 'הבא ←' : '') :
                          (currentStep > 0 ? '→ הקודם' : '')
                        }
                      </div>
                    )}
                  </div>
                )}
                
                <div 
                  className="transform transition-transform duration-200"
                  style={{
                    transform: isSwipeActive && touchCurrent && touchStart 
                      ? `translateX(${(touchCurrent - touchStart) * 0.1}px)` 
                      : 'translateX(0)'
                  }}
                >
                  <TreatmentStepCard 
                    key={`mobile-${currentStep}`}
                    step={treatmentSteps[currentStep]} 
                    isActive={true}
                    onClick={() => {}}
                    isMobile={true}
                  />
                </div>
              </div>
            ) : (
              // Desktop: Multiple cards view with hover effects - NO WRAPAROUND
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch px-4">
                {getVisibleSteps().map((step, index) => {
                  const stepIndex = treatmentSteps.findIndex(s => s.id === step.id);
                  return (
                    <div
                      key={`desktop-${step.id}`}
                      onMouseEnter={() => handleMouseEnter(stepIndex)}
                      onMouseLeave={handleMouseLeave}
                      className="relative"
                      style={{
                        filter: hoveredCard === stepIndex 
                          ? 'drop-shadow(0 25px 50px rgba(16, 24, 40, 0.25)) drop-shadow(0 10px 20px rgba(16, 24, 40, 0.15))' 
                          : 'drop-shadow(0 10px 25px rgba(16, 24, 40, 0.12)) drop-shadow(0 4px 10px rgba(16, 24, 40, 0.08))',
                        transition: 'filter 0.3s ease-in-out'
                      }}
                    >
                      {/* Shading overlay - subtle gradient shadow effect */}
                      <div 
                        className="absolute -inset-2 rounded-3xl opacity-0 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle at 50% 120%, rgba(16, 24, 40, 0.15) 0%, transparent 70%)',
                          opacity: hoveredCard === stepIndex ? 0.6 : 0.3,
                          zIndex: -1
                        }}
                      />
                      
                      <TreatmentStepCard 
                        step={step} 
                        isActive={stepIndex === currentStep}
                        onClick={() => handleCardClick(stepIndex)}
                        isMobile={false}
                        isHovered={hoveredCard === stepIndex}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Step Navigation - Arrow Controls - Hide when all cards are visible */}
        {(() => {
          const visibleSteps = getVisibleSteps();
          const allCardsVisible = visibleSteps.length === treatmentSteps.length;
          
          // Hide arrows if all cards are visible (typically on large screens)
          if (allCardsVisible && !isMobile) {
            return null;
          }
          
          return (
            <div className="flex justify-center items-center gap-6 mb-8">
              {/* Left Arrow (Previous) - Disabled when at start */}
              <button
                onClick={() => handleStepChange(currentStep - 1)}
                disabled={currentStep === 0}
                className={`transition-all duration-300 rounded-full p-3 flex items-center justify-center ${
                  currentStep === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50' 
                    : 'bg-[#101828] text-white hover:bg-[#101828]/80 hover:scale-110 shadow-lg'
                }`}
                aria-label="שלב קודם"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Right Arrow (Next) - Disabled when at end OR when last step is visible */}
              <button
                onClick={() => handleStepChange(currentStep + 1)}
                disabled={currentStep === treatmentSteps.length - 1 || (() => {
                  if (isMobile) return currentStep === treatmentSteps.length - 1; // Mobile only disables at end
                  const visibleSteps = getVisibleSteps();
                  const isLastStepVisible = visibleSteps.some(step => 
                    treatmentSteps.findIndex(s => s.id === step.id) === treatmentSteps.length - 1
                  );
                  return isLastStepVisible;
                })()}
                className={`transition-all duration-300 rounded-full p-3 flex items-center justify-center ${
                  currentStep === treatmentSteps.length - 1 || (() => {
                    if (isMobile) return currentStep === treatmentSteps.length - 1;
                    const visibleSteps = getVisibleSteps();
                    const isLastStepVisible = visibleSteps.some(step => 
                      treatmentSteps.findIndex(s => s.id === step.id) === treatmentSteps.length - 1
                    );
                    return isLastStepVisible;
                  })()
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50' 
                    : 'bg-[#101828] text-white hover:bg-[#101828]/80 hover:scale-110 shadow-lg'
                }`}
                aria-label="שלב הבא"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
          );
        })()}
        

      </div>
    </div>
  );
}