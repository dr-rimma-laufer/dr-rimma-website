'use client';
import React from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { CheckCircle, Activity, Award, User, Shield, Star, Heart, X, Pill, Leaf, TrendingUp } from 'lucide-react';
import mesotherapyImage from '../../../assets/881ad7d1767f92cdc6c8eb868e2442a107a155c0_converted.jpg';

interface MesotherapyTreatmentPageProps {
  onNavigate: (page: string) => void;
  onClose?: () => void;
}

export function MesotherapyTreatmentPage({ onNavigate, onClose }: MesotherapyTreatmentPageProps) {
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
              Hair Mesotherapy <br/>
              מזותרפיה לשיער
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
                    src={mesotherapyImage}
                    alt="טיפול מזותרפיה לשיער - הזרקות מיקרוסקופיות לקרקפת"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/20 to-transparent"></div>
                </div>
              </div>

              {/* Content - Second on mobile, Left side on desktop */}
              <div className="space-y-6 order-2 lg:order-1">
                <div>
                  <h2 className="text-4xl sm:text-3xl font-bold text-[#101828] mb-4">מהי מזותרפיה לשיער?</h2>
                  <p className="text-2xl sm:text-xl text-[#101828]/80 leading-relaxed">
מזותרפיה לשיער היא טכניקה רפואית לא-ניתוחית, המבוססת על סדרת מיקרו-הזרקות שטחיות ישירות אל שכבת הדרמיס בקרקפת. במהלך הטיפול מוחדרים קוקטיילים ייעודיים של חומרים פעילים, לרבות ויטמינים, מינרלים, חומצות אמינו, פפטידים ותרופות, במטרה להזין באופן ממוקד את זקיקי השיער. גישה זו מאפשרת העברה מדויקת של המרכיבים החיוניים ישירות לאזור בו מתרחש תהליך הגדילה והשיקום של השיער, ובכך מתגברת על המגבלות של תכשירים חיצוניים שאינם חודרים ביעילות לעור.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Materials Section - Enhanced */}
        <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-3xl font-bold text-[#101828] mb-4">החומרים הנפוצים בטיפול</h2>
              <p className="text-xl sm:text-lg text-[#101828]/70 mb-8">
                שילוב חומרים פעילים המוחדרים ישירות לאזור המטרה לתוצאות מיטביות
              </p>
            </div>
            
            {/* Single unified card for all materials */}
            <Card className="p-8 text-center border-[#905e26]/20 shadow-xl bg-gradient-to-br from-[#905e26]/5 to-white">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                <div className="text-center">
                  <Pill className="h-12 w-12 mx-auto mb-4 text-[#905e26]" />
                  <h3 className="text-xl font-bold text-[#101828] mb-3">מינוקסידיל</h3>
                  <p className="text-[#101828]/80 leading-relaxed">
                    תרופה המעודדת זרימת דם מקומית ומאריכה את שלב הצמיחה (אנגן)
                  </p>
                </div>
                
                <div className="text-center">
                  <Pill className="h-12 w-12 mx-auto mb-4 text-[#905e26]" />
                  <h3 className="text-xl font-bold text-[#101828] mb-3">דוטסטריד</h3>
                  <p className="text-[#101828]/80 leading-relaxed">
                    תרופה החוסמת את האנזים 5α-רדוקטאז ובכך מפחיתה את השפעת ההורמון DHT
                  </p>
                </div>
                
                <div className="text-center">
                  <Leaf className="h-12 w-12 mx-auto mb-4 text-[#905e26]" />
                  <h3 className="text-xl font-bold text-[#101828] mb-3">ויטמינים ומינרלים</h3>
                  <p className="text-[#101828]/80 leading-relaxed">
                    חומרים ביואקטיביים המספקים תמיכה מטבולית לזקיקי השיער
                  </p>
                </div>
                
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-[#905e26]" />
                  <h3 className="text-xl font-bold text-[#101828] mb-3">גורמי גדילה</h3>
                  <p className="text-[#101828]/80 leading-relaxed">
                    פפטידים וחלבונים הממריצים חידוש רקמות והפעלת תאי גזע
                  </p>
                </div>
              </div>
            </Card>
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
                    מזותרפיה מתאימה לגברים ולנשים הסובלים מבעיות שיער בשלבים שונים:
                  </p>
                  <div className="space-y-4">
                    {[
                      'נשירה תורשתית (אלופציה אנדרוגנטית) – בשלבים מוקדמים ובינוניים',
                      'דלילות מפושטת עקב סטרס, חוסר איזון הורמונלי או תזונתי',
                      'שיער שביר ודק הנוטה להישבר ולהיחלש',
                      'קשקשים או קרקפת שומנית/יבשה המשפיעים על בריאות השיער',
                      'מניעה ושימור – עבור מטופלים המעוניינים לשמור על צפיפות השיער ולמנוע הידרדרות',
                      'לאחר השתלת שיער – לשיפור קליטת הזקיקים ותהליך ההחלמה'
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-reverse space-x-3">
                        <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                        <span className="text-lg sm:text-base text-[#101828]/80">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Research Evidence - Moved here to be closer to "Who is it for" */}
                <Card className="p-8 bg-white border-[#101828]/10 shadow-lg">
                  <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                    <Shield className="ml-2 h-6 w-6 text-[#905e26]" />
                    עדויות מחקריות
                  </h3>
                  <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed">
                    מחקרים עדכניים מראים יעילות מוכחת של מזותרפיה עם דוטסטריד ומינוקסידיל 
                    לטיפול באלופציה אנדרוגנטית, עם שיפור במדדי צפיפות השיער ואיכותו.
                  </p>
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
                      'הכנת תמיסה מותאמת אישית לפי צרכי המטופל',
                      'מיקרו-הזרקות שטחיותשל חומרים פעילים לקרקפת',
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
                      'האטה או עצירה של נשירת שיער',
                      'שיפור צפיפות ועובי השיער',
                      'חיזוק שיער שביר, יבש או דליל',
                      'החזרת איזון ולחות לקרקפת',
                      'שדרוג תוצאות של טיפולים משלימים'
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-reverse space-x-3">
                        <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                        <span className="text-lg sm:text-base text-[#101828]/80">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Summary Section - Moved up */}
        <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 border-[#905e26]/20 shadow-lg bg-gradient-to-br from-[#905e26]/5 to-white">
              <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                <Star className="ml-2 h-6 w-6 text-[#905e26]" />
                סיכום
              </h3>
              <p className="text-[#101828] leading-relaxed text-xl sm:text-lg">
                מזותרפיה לשיער מציעה גישה רפואית מתקדמת להתמודדות עם נשירת שיער, במיוחד באלופציה אנדרוגנטית. 
                על ידי החדרת חומרים פעילים ישירות לקרקפת, הטכניקה מאפשרת ריכוז גבוה של תרופות באזור המטרה 
                תוך מזעור תופעות לוואי מערכתיות, ובכך מציעה פתרון יעיל ובטוח לטיפול בנשירת שיער.
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
                  // Navigate to hair treatments page
                  onNavigate('#hair-treatments');
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
