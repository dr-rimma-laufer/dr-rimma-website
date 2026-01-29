'use client';
import React from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { HAIR_DISEASES } from './hairDiseasesData';
import { 
  X,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Award,
  Calendar,
  Phone,
  Heart,
  Shield,
  Activity,
  Sparkles,
  Stethoscope,
  Brain,
  Target,
  User,
  Star,
  Droplets,
  Zap
} from 'lucide-react';

interface AlopeciaAreataPageProps {
  onNavigate?: (page: string) => void;
  onClose?: () => void;
}

export function AlopeciaAreataPage({ onNavigate, onClose }: AlopeciaAreataPageProps) {
  const isStandalonePage = !onClose;
  const [isMobile, setIsMobile] = React.useState(false);
  
  // נתוני המחלה הספציפיים - לוקח מהקובץ הראשי
  const diseaseData = HAIR_DISEASES.find(disease => disease.title === 'אלופציה אראטה') || HAIR_DISEASES[0];
  
  // Check if screen is mobile size
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Scroll handling is now managed by useNavigation hook
  // No need for manual scroll here as it's handled globally

  const handleBackClick = () => {
    if (onNavigate) {
      onNavigate('#hair-treatments');
    }
  };

  // Disease-specific content based on title
  const getSpecificContent = () => {
    // Common symptoms that vary by disease
    const commonSymptoms = [
      'נשירת שיער מוקדמת או פתאומית',
      'שינויים במרקם השיער',
      'גרד או כאב בקרקפת',
      'אדמומיות או דלקת בעור',
      'כתמים חלקים בקרקפת',
      'נגעים או פצעים בעור הקרקפת'
    ];

    const diagnosticSteps = [
      {
        step: 1,
        title: 'בדיקה קלינית מקיפה',
        description: 'בדיקת הקרקפת והשיער באמצעות דר直通车קופיה',
        icon: Stethoscope
      },
      {
        step: 2,
        title: 'אבחון דיפרנציאלי',
        description: 'זיהוי המחלה הספציפית ושלילת גורמים אחרים',
        icon: Brain
      },
      {
        step: 3,
        title: 'תכנון טיפול מותאם',
        description: 'בניית תוכנית טיפול אישית לפי סוג ומידת המחלה',
        icon: Target
      },
      {
        step: 4,
        title: 'מעקב ובקרה',
        description: 'מעקב שוטף אחר התקדמות הטיפול והתאמות',
        icon: Activity
      }
    ];

    // Treatment advantages specific to hair diseases
    const treatmentAdvantages = [
      {
        icon: Stethoscope,
        title: 'אבחון מדויק',
        description: 'שימוש בדר直通车קופיה ובדיקות מעבדה לאבחון מדויק'
      },
      {
        icon: Target,
        title: 'טיפול ממוקד',
        description: 'טיפולים ספציפיים המותאמים לסוג המחלה הספציפית'
      },
      {
        icon: Droplets,
        title: 'מניעת החמרה',
        description: 'גישה מקיפה למניעת החמרת המחלה והתקדמותה'
      },
      {
        icon: Shield,
        title: 'טיפול רב-תחומי',
        description: 'שילוב טיפולים מקומיים וסיסטמיים לפי הצורך'
      }
    ];

    return {
      symptoms: commonSymptoms,
      diagnosticSteps,
      treatmentAdvantages
    };
  };

  const { symptoms, diagnosticSteps, treatmentAdvantages } = getSpecificContent();

  return (
    <div className={`hebrew-text flex flex-col ${isStandalonePage ? 'min-h-screen' : 'h-full'}`} dir="rtl">
      {/* Hero Section with Floating Bubbles - Fixed Header for Overlay Mode */}
      <section className={`relative bg-gradient-to-l from-[#101828] to-[#0a0f1a] text-white ${isStandalonePage ? 'pt-16 md:pt-8 pb-8 md:pb-4' : 'pt-8 pb-4 flex-shrink-0'} overflow-hidden`}>
        {/* Close button positioned absolutely on the left for overlay mode */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 hover:scale-110 backdrop-blur-sm z-20"
            aria-label="סגור"
            style={{
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <X className="h-5 w-5 text-white" />
          </button>
        )}
        
        {/* Floating Bubbles Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large bubbles with slow movement */}
          <div className="bubble bubble-large animate-floatBubbles" style={{ left: '10%', animationDuration: '20s', animationDelay: '0s' }}></div>
          <div className="bubble bubble-extra-large animate-floatBubbles" style={{ left: '25%', animationDuration: '25s', animationDelay: '-5s' }}></div>
          <div className="bubble bubble-medium animate-floatBubbles " style={{ left: '45%', animationDuration: '18s', animationDelay: '-10s' }}></div>
          <div className="bubble bubble-large animate-floatBubbles" style={{ left: '65%', animationDuration: '22s', animationDelay: '-3s' }}></div>
          <div className="bubble bubble-small animate-floatBubbles " style={{ left: '80%', animationDuration: '15s', animationDelay: '-8s' }}></div>
          
          {/* Medium bubbles with moderate speed */}
          <div className="bubble bubble-medium animate-floatBubbles" style={{ left: '15%', animationDuration: '16s', animationDelay: '-12s' }}></div>
          <div className="bubble bubble-small animate-floatBubbles " style={{ left: '35%', animationDuration: '14s', animationDelay: '-6s' }}></div>
          <div className="bubble bubble-medium animate-floatBubbles " style={{ left: '55%', animationDuration: '19s', animationDelay: '-15s' }}></div>
          <div className="bubble bubble-small animate-floatBubbles" style={{ left: '75%', animationDuration: '13s', animationDelay: '-2s' }}></div>
          <div className="bubble bubble-large animate-floatBubbles animate-bubbleSway" style={{ left: '85%', top: '60%', animationDuration: '21s', animationDelay: '-9s' }}></div>
          
          {/* Small bubbles with flash movement */}
          <div className="bubble bubble-small animate-floatBubbles" style={{ left: '5%', animationDuration: '12s', animationDelay: '-4s' }}></div>
          <div className="bubble bubble-small animate-floatBubbles " style={{ left: '20%', animationDuration: '11s', animationDelay: '-7s' }}></div>
          <div className="bubble bubble-small animate-floatBubbles" style={{ left: '40%', animationDuration: '10s', animationDelay: '-11s' }}></div>
          <div className="bubble bubble-small animate-floatBubbles " style={{ left: '60%', animationDuration: '13s', animationDelay: '-1s' }}></div>
          <div className="bubble bubble-small animate-floatBubbles" style={{ left: '90%', animationDuration: '9s', animationDelay: '-14s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-2xl font-bold mb-4 md:mb-2 animate-heroTitlePulse">
              {diseaseData.titleEnglish}
              <br/>
              {diseaseData.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Scrollable Content - Flex Grow to Fill Remaining Space */}
      <div className={`flex-1 ${isStandalonePage ? 'overflow-visible' : 'overflow-y-auto min-h-0 modal-scroll'}`}>
        <main className="py-0">

        {/* Content Section */}
        <section className="bg-gradient-to-b from-white to-[#101828]/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Image - First on mobile, Right side on desktop */}
              <div className="relative order-1 lg:order-2">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <ImageWithFallback
                    src={diseaseData.image}
                    alt={diseaseData.title}
                    className="w-full h-80 object-cover bg-gray-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/20 to-transparent"></div>
                </div>
              </div>

              {/* Content - Second on mobile, Left side on desktop */}
              <div className="space-y-6 order-2 lg:order-1">
                <div>
                  <h2 className="text-4xl sm:text-3xl font-bold text-[#101828] mb-4">מהי {diseaseData.title}?</h2>
                  <p className="text-2xl sm:text-xl text-[#101828]/80 leading-relaxed">
                    {diseaseData.description}
                  </p>
                  
                  {/* Additional overview if available */}
                  {diseaseData.overview && (
                    <p className="text-2xl sm:text-xl text-[#101828]/70 leading-relaxed mt-4">
                      {diseaseData.overview}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Disease-specific content sections */}
        
        {/* Causes Section */}
        {diseaseData.causes && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Brain className="ml-2 h-6 w-6 text-[#905e26]" />
                  {diseaseData.causes.title}
                </h3>
                
                {/* Introduction paragraph without bullet */}
                {(diseaseData.causes as any).intro && (
                  <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mb-6 rich-content-display">
                    {(diseaseData.causes as any).intro}
                  </p>
                )}
                
                {/* Bulleted list items or regular content */}
                {Array.isArray((diseaseData.causes as any).content) ? (
                  <div className="space-y-4">
                    {(diseaseData.causes as any).content.map((cause: string, index: number) => (
                      <div key={index} className="flex items-start space-x-reverse space-x-3">
                        <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                        <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{cause}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed rich-content-display">
                    {(diseaseData.causes as any).content}
                  </p>
                )}
              </Card>
            </div>
          </section>
        )}

        {/* Symptoms Section - Enhanced for disease-specific content with images */}
        {diseaseData.symptoms && (
          <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <User className="ml-2 h-6 w-6 text-[#905e26]" />
                  {diseaseData.symptoms.title}
                </h3>
                
                {/* Mobile: Stack symptoms and images vertically */}
                <div className="block md:hidden">
                  {/* Symptoms list */}
                  <div className="space-y-4 mb-8">
                    {diseaseData.symptoms.content.map((symptom, index) => (
                      <div key={index} className="flex items-start space-x-reverse space-x-3">
                        <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                        <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{symptom}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Clinical images if available */}
                  {diseaseData.symptoms.images && diseaseData.symptoms.images.length > 0 && (
                    <div className="space-y-6">
                      <h4 className="text-xl font-semibold text-[#101828] mb-4">דוגמאות קליניות</h4>
                      <div className="space-y-4">
                        {diseaseData.symptoms.images.map((image, index) => (
                          <div key={index} className="relative overflow-hidden rounded-xl shadow-lg bg-white border border-[#101828]/10">
                            <ImageWithFallback
                              src={image.src}
                              alt={image.alt}
                              className="w-full h-80 object-cover"
                            />
                            <div className="p-4 text-center">
                              <p className="text-sm text-[#101828]/70 leading-relaxed">{image.caption}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Desktop: Symptoms first, then images side by side below */}
                <div className="hidden md:block">
                  {/* Symptoms list */}
                  <div className="space-y-4 mb-8">
                    {diseaseData.symptoms.content.map((symptom, index) => (
                      <div key={index} className="flex items-start space-x-reverse space-x-3">
                        <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                        <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{symptom}</span>
                      </div>
                    ))}
                  </div>
                  {/* Clinical images if available - side by side below text */}
                  {diseaseData.symptoms.images && diseaseData.symptoms.images.length > 0 && (
                    <div className="space-y-6">
                      <h4 className="text-xl font-semibold text-[#101828] mb-4">דוגמאות קליניות</h4>
                      <div className="flex gap-6 justify-center">
                        {diseaseData.symptoms.images.map((image, index) => (
                          <div key={index} className="relative overflow-hidden rounded-lg shadow-lg bg-white border border-[#101828]/10 inline-block">
                            <ImageWithFallback
                              src={image.src}
                              alt={image.alt}
                              className="h-80 object-cover"
                            />
                            <div className="p-4 text-center">
                              <p className="text-sm text-[#101828]/70 leading-relaxed">{image.caption}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Diagnosis & Treatment Options Section - Side by Side on Desktop */}
        {(diseaseData.diagnosis || diseaseData.treatment) && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Mobile: Stack vertically */}
              <div className="block lg:hidden space-y-8">
                {/* Diagnosis on mobile */}
                {diseaseData.diagnosis && (
                  <Card className="p-8 border-[#101828]/10 shadow-lg">
                    <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                      <Stethoscope className="ml-2 h-6 w-6 text-[#905e26]" />
                      {diseaseData.diagnosis.title}
                    </h3>
                    
                    {/* Introduction paragraph without bullet */}
                    {(diseaseData.diagnosis as any).intro && (
                      <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mb-6 rich-content-display">
                        {(diseaseData.diagnosis as any).intro}
                      </p>
                    )}
                    
                    {/* Bulleted list items */}
                    <div className="space-y-4">
                      {diseaseData.diagnosis.content.map((method, index) => (
                        <div key={index} className="flex items-start space-x-reverse space-x-3">
                          <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                          <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{method}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Treatment Options on mobile */}
                {diseaseData.treatment && (
                  <Card className="p-8 border-[#101828]/10 shadow-lg bg-gradient-to-b from-white to-[#101828]/5">
                    <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                      <Zap className="ml-2 h-6 w-6 text-[#905e26]" />
                      {diseaseData.treatment.title}
                    </h3>
                    <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mb-6 rich-content-display">
                      {diseaseData.treatment.content}
                    </p>
                    <div className="space-y-4">
                      {diseaseData.treatment.options.map((option, index) => (
                        <div key={index} className="flex items-start space-x-reverse space-x-3">
                          <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                          <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{option}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>

              {/* Desktop: Side by Side */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-8">
                {/* Diagnosis on desktop */}
                {diseaseData.diagnosis && (
                  <Card className="p-8 border-[#101828]/10 shadow-lg">
                    <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                      <Stethoscope className="ml-2 h-6 w-6 text-[#905e26]" />
                      {diseaseData.diagnosis.title}
                    </h3>
                    
                    {/* Introduction paragraph without bullet */}
                    {(diseaseData.diagnosis as any).intro && (
                      <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mb-6 rich-content-display">
                        {(diseaseData.diagnosis as any).intro}
                      </p>
                    )}
                    
                    {/* Bulleted list items */}
                    <div className="space-y-4">
                      {diseaseData.diagnosis.content.map((method, index) => (
                        <div key={index} className="flex items-start space-x-reverse space-x-3">
                          <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                          <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{method}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Treatment Options on desktop */}
                {diseaseData.treatment && (
                  <Card className="p-8 border-[#101828]/10 shadow-lg bg-gradient-to-b from-white to-[#101828]/5">
                    <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                      <Zap className="ml-2 h-6 w-6 text-[#905e26]" />
                      {diseaseData.treatment.title}
                    </h3>
                    <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mb-6 rich-content-display">
                      {diseaseData.treatment.content}
                    </p>
                    <div className="space-y-4">
                      {diseaseData.treatment.options.map((option, index) => (
                        <div key={index} className="flex items-start space-x-reverse space-x-3">
                          <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                          <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{option}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Prevention and Management Section */}
        {(diseaseData as any).prevention && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Shield className="ml-2 h-6 w-6 text-[#905e26]" />
                  {(diseaseData as any).prevention.title}
                </h3>
                
                {/* Introduction paragraph without bullet */}
                {(diseaseData as any).prevention.intro && (
                  <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mb-6 rich-content-display">
                    {(diseaseData as any).prevention.intro}
                  </p>
                )}
                
                {/* Bulleted list items */}
                <div className="space-y-4">
                  {(diseaseData as any).prevention.content.map((item: string, index: number) => (
                    <div key={index} className="flex items-start space-x-reverse space-x-3">
                      <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                      <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Prognosis & Related Conditions Section - Side by Side on Desktop */}
        {(diseaseData.prognosis || diseaseData.relatedConditions) && (
          <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Mobile: Stack vertically */}
              <div className="block lg:hidden space-y-8">
                {/* Prognosis on mobile */}
                {diseaseData.prognosis && (
                  <Card className="p-8 border-[#101828]/10 shadow-lg">
                    <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                      <Target className="ml-2 h-6 w-6 text-[#905e26]" />
                      {diseaseData.prognosis.title}
                    </h3>
                    <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed rich-content-display">
                      {diseaseData.prognosis.content}
                    </p>
                  </Card>
                )}

                {/* Related Conditions on mobile */}
                {diseaseData.relatedConditions && (
                  <Card className="p-8 border-[#101828]/10 shadow-lg">
                    <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                      <Shield className="ml-2 h-6 w-6 text-[#905e26]" />
                      {diseaseData.relatedConditions.title}
                    </h3>
                    <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed rich-content-display">
                      {diseaseData.relatedConditions.content}
                    </p>
                  </Card>
                )}
              </div>

              {/* Desktop: Side by Side */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-8">
                {/* Prognosis on desktop */}
                {diseaseData.prognosis && (
                  <Card className="p-8 border-[#101828]/10 shadow-lg">
                    <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                      <Target className="ml-2 h-6 w-6 text-[#905e26]" />
                      {diseaseData.prognosis.title}
                    </h3>
                    <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed rich-content-display">
                      {diseaseData.prognosis.content}
                    </p>
                  </Card>
                )}

                {/* Related Conditions on desktop */}
                {diseaseData.relatedConditions && (
                  <Card className="p-8 border-[#101828]/10 shadow-lg">
                    <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                      <Shield className="ml-2 h-6 w-6 text-[#905e26]" />
                      {diseaseData.relatedConditions.title}
                    </h3>
                    <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed rich-content-display">
                      {diseaseData.relatedConditions.content}
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Summary Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 border-[#905e26]/20 shadow-lg bg-gradient-to-br from-[#905e26]/5 to-white">
              <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                <Star className="ml-2 h-6 w-6 text-[#905e26]" />
                סיכום
              </h3>
              <p className="text-[#101828] leading-relaxed text-xl sm:text-lg">
                {diseaseData.title} היא מחלה הדורשת טיפול מקצועי ומותאם אישית. במרפאתנו אנו מספקים אבחון מדויק וטיפול מתקדם, תוך שמירה על בטיחות המטופל ומתן מעקב רפואי מתמיד לקבלת התוצאות הטובות ביותר.
              </p>
            </Card>
          </div>
        </section>

        {/* Back to treatments button for standalone page */}
        {isStandalonePage && (
          <section className="py-8 bg-gradient-to-b from-[#101828]/5 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Button
                onClick={() => {
                  console.log('🔘 Back button clicked - navigating to hair treatments');
                  if (onNavigate) {
                    onNavigate('#hair-treatments');
                  }
                }}
                className="bg-[#905e26] hover:bg-[#101828] text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                חזרה לטיפולי שיער
              </Button>
            </div>
          </section>
        )}

        {/* Contact CTA - Only show in overlay mode or if no onNavigate */}
        {(onClose || !onNavigate) && (
          <section className="py-20 bg-gradient-to-l from-[#101828] to-[#0a0f1a] text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Sparkles className="h-16 w-16 mx-auto mb-6 text-white" />
              <h2 className="text-3xl font-bold mb-6">
                זקוקים לייעוץ מקצועי?
              </h2>
              <p className="text-xl mb-8 text-green-100">
                פנו אלינו לקביעת ייעוץ מקצועי ומקיף עבור {diseaseData.title}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-[#905e26] hover:bg-[#101828] text-white"
                  onClick={() => onNavigate && onNavigate('#contact')}
                >
                  <Calendar className="ml-2 h-5 w-5" />
                  קביעת תור לייעוץ
                </Button>
                <Button 
                  variant="outline"
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-[#101828]"
                  onClick={() => {
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
        )}

        </main>
      </div>
    </div>
  );
}