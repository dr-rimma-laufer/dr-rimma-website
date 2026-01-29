'use client';
import React from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { CheckCircle, Clock, Activity, Award, User, Shield, Star, Heart, X, Droplets, Zap, Target } from 'lucide-react';
import prpTreatmentImage from '../../../assets/1ddb91ad4cad3ffe1727dd3e9dda1124ff85c389_converted.jpg';

interface PRPTreatmentPageProps {
  onNavigate: (page: string) => void;
  onClose?: () => void;
}

export function PRPTreatmentPage({ onNavigate, onClose }: PRPTreatmentPageProps) {
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
              PRP - Platelet-Rich Plasma <br/>
              ביוסטימולציה 
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
                    src={prpTreatmentImage}
                    alt="טיפול PRP לשיער - הזרקת פלזמה עשירה בטסיות דם"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/20 to-transparent"></div>
                </div>
              </div>

              {/* Content - Second on mobile, Left side on desktop */}
              <div className="space-y-6 order-2 lg:order-1">
                <div>
                  <h2 className="text-4xl sm:text-3xl font-bold text-[#101828] mb-4">מהו PRP לשיער ?</h2>
                  <p className="text-2xl sm:text-xl text-[#101828]/80 leading-relaxed">
                    טיפול PRP הוא שיטה מתקדמת בתחום רפואת השיער, המבוססת על שימוש בדם של המטופל עצמו לצורך עידוד צמיחה מחודשת של שיער. במהלך הטיפול נשאב דם מהמטופל, עובר תהליך סרכוז (צנטריפוגה) המאפשר להפריד את מרכיבי הדם ולקבל פלזמה מרוכזת במיוחד בטסיות דם (Platelets). לאחר מכן מוזרקת הפלזמה אל הקרקפת בהזרקות שטחיות ועדינות.
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
              <h2 className="text-4xl sm:text-3xl font-bold text-[#101828] mb-4">הייחוד של טיפול  PRP</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center border-[#101828]/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Target className="h-8 w-8 mx-auto mb-3 text-[#905e26]" />
                <h3 className="text-lg sm:text-base font-bold text-[#101828] mb-3">הפעלת תאי גזע</h3>
                <p className="text-[#101828]/80 text-base sm:text-sm leading-relaxed">
                  להפעיל תאי גזע רדומים בזקיקי השיער
                </p>
              </Card>
              
              <Card className="p-6 text-center border-[#101828]/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Droplets className="h-8 w-8 mx-auto mb-3 text-[#905e26]" />
                <h3 className="text-lg sm:text-base font-bold text-[#101828] mb-3">שיפור זרימת הדם</h3>
                <p className="text-[#101828]/80 text-base sm:text-sm leading-relaxed">
                  לשפר את זרימת הדם לאזור הקרקפת ולעודד יצירת כלי דם חדשים
                </p>
              </Card>
              
              <Card className="p-6 text-center border-[#101828]/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Clock className="h-8 w-8 mx-auto mb-3 text-[#905e26]" />
                <h3 className="text-lg sm:text-base font-bold text-[#101828] mb-3">הארכת שלב הצמיחה</h3>
                <p className="text-[#101828]/80 text-base sm:text-sm leading-relaxed">
                  להאריך את שלב ה"אנגן" – שלב הצמיחה הפעילה במחזור חיי השערה
                </p>
              </Card>
              
              <Card className="p-6 text-center border-[#101828]/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Zap className="h-8 w-8 mx-auto mb-3 text-[#905e26]" />
                <h3 className="text-lg sm:text-base font-bold text-[#101828] mb-3">חיזוק השיער הקיים</h3>
                <p className="text-[#101828]/80 text-base sm:text-sm leading-relaxed">
                  לחזק את השיערות הקיימות ולהעלות את צפיפותן ועוביין
                </p>
              </Card>
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
                    הטיפול נמצא יעיל במיוחד במצבים של אלופציה אנדרוגנטית (התקרחות תבניתית בגברים ובנשים). מחקרים רבים, כולל מחקרים קליניים מבוקרים וסקירות מטה-אנליזה בינלאומיות, מצאו כי טיפול ב-PRP משפר באופן מובהק את:
                  </p>
                  <div className="space-y-4">
                    {[
                      'צפיפות השיער',
                      'עובי השיערות',
                      'מספר השערות הפעילות'
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-reverse space-x-3">
                        <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                        <span className="text-lg sm:text-base text-[#101828]/80">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mt-6">
                    מעבר לכך, ברוב המחקרים נרשמה שביעות רצון גבוהה מאוד מצד המטופלים, הן מבחינת התוצאות האסתטיות והן מבחינת הבטיחות.
                  </p>
                </Card>
              </div>

              {/* Left Column - Process and Frequency */}
              <div className="space-y-8">
                <Card className="p-8 border-[#101828]/10 shadow-lg">
                  <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                    <Activity className="ml-2 h-6 w-6 text-[#905e26]" />
                    אופן ביצוע ותדירות הטיפולים
                  </h3>
                  <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed">
                    הטיפול מתבצע לרוב בסדרה של 3–4 מפגשים חודשיים, ולאחר מכן בהזרקות תחזוקה אחת ל-3 עד 6 חודשים – בהתאם לצורך ולתגובה האישית של כל מטופל/ת.
                  </p>
                </Card>

                {/* Side Effects and Safety */}
                <Card className="p-8 border-[#101828]/10 shadow-lg">
                  <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                    <Shield className="ml-2 h-6 w-6 text-[#905e26]" />
                    תופעות לוואי ובטיחות
                  </h3>
                  <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mb-6">
                    טיפול PRP נחשב בטוח מאוד, שכן מדובר במוצר אוטולוגי – מהדם של המטופל עצמו. תופעות הלוואי לרוב קלות וחולפות, וכוללות:
                  </p>
                  <div className="space-y-4">
                    {[
                      'כאב מקומי קל',
                      'נפיחות או אודם עדין באזור ההזרקה',
                      'לעיתים נדירות – גרד קל או שטף דם קטן'
                    ].map((sideEffect, index) => (
                      <div key={index} className="flex items-start space-x-reverse space-x-3">
                        <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                        <span className="text-lg sm:text-base text-[#101828]/80">{sideEffect}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mt-6">
                    אלו תופעות זמניות שנעלמות בדרך כלל בתוך שעות עד ימים ספורים.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Combined Treatments Section */}
        <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 border-[#101828]/10 shadow-lg">
              <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                <Heart className="ml-2 h-6 w-6 text-[#905e26]" />
                שילוב עם טיפולים נוספים
              </h3>
              <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed">
                ישנם מחקרים המצביעים על כך ששילוב טיפול PRP עם מינוקסידיל, השתלה או עם פרוטוקולים נוספים עשוי להעצים את היעילות, אולם נכון להיום אין עדיין פרוטוקול סטנדרטי ברור, וההתאמה נעשית אישית לכל מטופל.
              </p>
            </Card>
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
                טיפול ב-PRP מציע פתרון חדשני, טבעי ובטוח להתמודדות עם נשירת שיער – במיוחד במצבים של אלופציה אנדרוגנטית. בעזרת גורמי הגדילה של הגוף עצמו, ניתן לעורר מחדש את זקיקי השיער, לשפר את בריאות הקרקפת, ולהחזיר לשיער מראה חזק, מלא ובריא יותר.
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
