'use client';
import React from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { CheckCircle, Clock, Activity, Award, User, Shield, Star, Heart, X, Droplets, Zap, Target } from 'lucide-react';
import lowLevelLaserTreatmentImage from '../../../assets/c6187059fb58c3bc2ec62f71362f4002baefa4bc_converted.jpg';

interface LaserTreatmentPageProps {
  onNavigate: (page: string) => void;
  onClose?: () => void;
}

export function LaserTreatmentPage({ onNavigate, onClose }: LaserTreatmentPageProps) {
  const isStandalonePage = !onClose;
  const [isMobile, setIsMobile] = React.useState(false);
  
  // Check if screen is mobile size
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
          
          {/* Small bubbles with fast movement */}
          <div className="bubble bubble-small animate-floatBubbles" style={{ left: '5%', animationDuration: '12s', animationDelay: '-4s' }}></div>
          <div className="bubble bubble-small animate-floatBubbles " style={{ left: '20%', animationDuration: '11s', animationDelay: '-7s' }}></div>
          <div className="bubble bubble-small animate-floatBubbles" style={{ left: '40%', animationDuration: '10s', animationDelay: '-11s' }}></div>
          <div className="bubble bubble-small animate-floatBubbles " style={{ left: '60%', animationDuration: '13s', animationDelay: '-1s' }}></div>
          <div className="bubble bubble-small animate-floatBubbles" style={{ left: '90%', animationDuration: '9s', animationDelay: '-14s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-2xl font-bold mb-4 md:mb-2 animate-heroTitlePulse">
              טיפול לייזר <br/>
              LLLT - Low Level Laset Theraphy <br/>
              לייזר רך לעידוד צמיחה
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
                    src={lowLevelLaserTreatmentImage}
                    alt="טיפול לייזר LLLT לשיער - טכנולוגיה מתקדמת ללא מגע"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/20 to-transparent"></div>
                </div>
              </div>

              {/* Content - Second on mobile, Left side on desktop */}
              <div className="space-y-6 order-2 lg:order-1">
                <div>
                  <p className="text-2xl sm:text-xl text-[#101828]/80 leading-relaxed">
                    טכנולוגיית לייזר רך (LLLT - Low Level Laser Therapy) המעוררת את זקיקי השיער ומשפרת את זרימת הדם בקרקפת. 
                    טיפול ללא מגע המבוסס על חשיפה לאור לייזר בתדירות מדויקת המגרה תהליכים ביולוגיים טבעיים בזקיקי השיער.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Treatment Uniqueness Section */}
        <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-3xl font-bold text-[#101828] mb-4">יתרונות עיקריים</h2>
              <p className="text-xl sm:text-lg text-[#101828]/70 mb-8">
                הטיפול בלייזר LLLT מציע מגוון יתרונות ייחודיים:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 text-center border-[#101828]/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Heart className="h-8 w-8 mx-auto mb-3 text-[#905e26]" />
                <h3 className="text-lg sm:text-base font-bold text-[#101828] mb-3">ללא כאב</h3>
                <p className="text-[#101828]/80 text-base sm:text-sm leading-relaxed">
                  טיפול נעים וללא תחושה של כאב או אי נוחות
                </p>
              </Card>
              
              <Card className="p-6 text-center border-[#101828]/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Clock className="h-8 w-8 mx-auto mb-3 text-[#905e26]" />
                <h3 className="text-lg sm:text-base font-bold text-[#101828] mb-3">אין זמן חלמה</h3>
                <p className="text-[#101828]/80 text-base sm:text-sm leading-relaxed">
                  חזרה מיידית לפעילות יומיומית ללא הגבלות
                </p>
              </Card>
              
              <Card className="p-6 text-center border-[#101828]/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Shield className="h-8 w-8 mx-auto mb-3 text-[#905e26]" />
                <h3 className="text-lg sm:text-base font-bold text-[#101828] mb-3">מתאים לכל סוגי העור</h3>
                <p className="text-[#101828]/80 text-base sm:text-sm leading-relaxed">
                  בטוח לכל גוני העור וסוגי הקרקפת
                </p>
              </Card>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-2xl sm:text-xl text-[#101828] font-semibold">
                הטיפול מגרה את זקיקי השיער ללא פגיעה ברקמות, ומעודד תהליכי ריפוי והתחדשות טבעיים.
              </p>
            </div>
          </div>
        </section>

        {/* Who is it for Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Right Column - Who is it for */}
              <div className="space-y-8">
                <Card className="p-8 border-[#101828]/10 shadow-lg">
                  <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                    <User className="ml-2 h-6 w-6 text-[#905e26]" />
                    למי מיועד הטיפול?
                  </h3>
                  <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mb-6">
                    הטיפול מתאים במיוחד עבור:
                  </p>
                  <div className="space-y-4">
                    {[
                      'נשירת שיער אנדרוגנטית',
                      'דלילות שיער כללית',
                      'מטופלים הרגישים להזרקות',
                      'רצון בטיפול ללא מגע',
                      'משלים לטיפולים אחרים'
                    ].map((condition, index) => (
                      <div key={index} className="flex items-center space-x-reverse space-x-3">
                        <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0" />
                        <span className="text-lg sm:text-base text-[#101828]/80">{condition}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Left Column - Process and Benefits */}
              <div className="space-y-8">
                <Card className="p-8 border-[#101828]/10 shadow-lg">
                  <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                    <Activity className="ml-2 h-6 w-6 text-[#905e26]" />
                    תהליך הטיפול
                  </h3>
                  <div className="space-y-4">
                    {[
                      'הכנת הקרקפת והסרת שיירי מוצרים',
                      'הנחת מכשיר הלייזר על הקרקפת',
                      'חשיפה לאור לייזר בתדירות מדויקת',
                      'גירוי ביולוגי של Zikaikiי השיער',
                      'הגברת זרימת דם באזור המטופל'
                    ].map((step, index) => (
                      <div key={index} className="flex items-start space-x-reverse space-x-4">
                        <div className="bg-[#101828] text-white text-sm w-6 h-6 rounded-full flex items-center justify-center mt-1 flex-shrink-0 font-bold">
                          {index + 1}
                        </div>
                        <span className="text-lg sm:text-base text-[#101828]/80 leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Benefits */}
                <Card className="p-8 border-[#101828]/10 shadow-lg">
                  <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                    <Heart className="ml-2 h-6 w-6 text-[#905e26]" />
                    יתרונות הטיפול
                  </h3>
                  <div className="space-y-4">
                    {[
                      'עיכוב נשירת שיער נוספת',
                      'עידוד צמיחה של שיער חדש',
                      'הגברת זרימת דם בקרקפת',
                      'חיזוק Zikaikiי השיער הקיימים',
                      'שיפור איכות השיער הצומח'
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-reverse space-x-3">
                        <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0" />
                        <span className="text-lg sm:text-base text-[#101828]/80">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Treatment Schedule Section */}
        <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Expectations */}
              <Card className="p-8 bg-[#905e26]/10 border-[#905e26]/20">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Target className="ml-2 h-6 w-6 text-[#905e26]" />
                  מה לצפות מהטיפול
                </h3>
                <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed">
                  הקטנה בנשירה נראית לאחר 6-8 טיפולים. צמיחת שיער חדש מתחילה לאחר 3-4 חודשים של טיפול סדיר. 
                  התוצאות הטובות ביותר מושגות עם 10-15 טיפולים ברצף.
                </p>
              </Card>

              {/* Treatment Info */}
              <Card className="p-8 bg-white border-[#101828]/10">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Clock className="ml-2 h-6 w-6 text-[#905e26]" />
                  פרטי הטיפול
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#101828]/80">משך טיפול:</span>
                    <span className="font-bold text-[#101828]">20 דקות</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#101828]/80">מספר טיפולים:</span>
                    <span className="font-bold text-[#101828]">10-15 טיפולים</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#101828]/80">תוצאות:</span>
                    <span className="font-bold text-[#101828]">4-8 חודשים</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#101828]/80">טיפולי תחזוקה:</span>
                    <span className="font-bold text-[#101828]">אחת לחודשיים</span>
                  </div>
                </div>
              </Card>

            </div>
          </div>
        </section>

        {/* Summary Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 border-[#905e26]/20 shadow-lg bg-gradient-to-br from-[#905e26]/5 to-white">
              <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                <Star className="ml-2 h-6 w-6 text-[#905e26]" />
                סיכום
              </h3>
              <p className="text-[#101828] leading-relaxed text-xl sm:text-lg">
                טיפול לייזר LLLT מציע פתרון חדשני ובטוח להתמודדות עם נשירת שיער, ללא כאב ועם זמן חלמה אפסי. 
                הטכנולוגיה מגרה את Zikaikiי השיער באופן טבעי ומעודדת תהליכי התחדשות, ומתאימה לכל המחפשים 
                טיפול יעיל ונוח ללא הזרקות או פרוצדורות פולשניות.
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
                  // Go back in history if possible, otherwise navigate to hair treatments
                  if (window.history.state?.previousPage) {
                    window.history.back();
                  } else {
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

        </main>
      </div>
    </div>
  );
}
