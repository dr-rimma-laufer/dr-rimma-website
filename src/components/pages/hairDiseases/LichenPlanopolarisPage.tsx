'use client';
import React from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import lichenPlanopolarisImage from '../../../assets/054105cd258812a6c3cd42bddc6e8626a84936cb_converted.jpg';
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

interface LichenPlanopolarisPageProps {
  onNavigate?: (page: string) => void;
  onClose?: () => void;
}

export function LichenPlanopolarisPage({ onNavigate, onClose }: LichenPlanopolarisPageProps) {
  const isStandalonePage = !onClose;
  const [isMobile, setIsMobile] = React.useState(false);
  
  // נתוני המחלה הספציפיים
  const diseaseData = {
    title: 'ליכן פלנופילאריס',
    titleEnglish: 'Lichen Planopilaris',
    subtitle: 'מחלת עור דלקתית נדירה',
    description: 'ליכן פלנופילאריס (LPP) היא מחלת עור דלקתית נדירה שגורמת לנשירה צלקתית של שיער. משמעות הדבר היא שהשיער שנשר לא יצמח מחדש, משום שהזיהום הדלקתי פוגע בתאי הגזע שבזקיקי השערה ומחליף אותם ברקמת צלקת.',
    features: ['אבחון מוקדם', 'עצירת התקדמות', 'טיפול מותאם אישית'],
    image: lichenPlanopolarisImage,
    color: 'border-[#101828]-200 bg-[#101828]-50',
    duration: 'טיפול ארוך טווח',
    sessions: 'מעקב מתמיד',
    results: 'ייצוב מצב',
    overview: 'המחלה נחשבת לווריאנט של ליכן פלאנוס (lichen planus), מצב אוטואימוני שבו מערכת החיסון תוקפת בטעות את תאי הגוף.',
    variants: {
      title: 'שלוש צורות עיקריות',
      content: [
        'LPP קלאסי – אובדן שיער לא סדיר, לרוב במרכז הקרקפת או באזורים צדדיים',
        'אלופציה פרונטלית פיבрозינג (Frontal Fibrosing Alopecia) – אובדן שיער בקו השיער הקדמי והרקות, לרוב עם נשירת גבות',
        'תסמונת גרהם־ליטל־פיקארדי־לסואר (GLPLS) – נשירת שיער צלקתית בקרקפת בשילוב נשירה לא צלקתית בבית השחי ובמפשעה, ולעיתים הופעת נגעים עוריים נוספים'
      ]
    },
    demographics: {
      title: 'מי חולה בליכן פלנופיל蕊ס?',
      content: [
        'שכיח בעיקר אצל נשים בגילאי 40–60, אך עלול להופיע גם אצל גברים ואף אצל צעירים יותר',
        'לעיתים מתלווה למחלת עור, בציפורניים או בריריות (פה, אברי מין)',
        'נמצא קשר עם תת־פעילות של בלוטת התריס ומחלות אוטואימוניות נוספות'
      ]
    },
    causes: {
      title: 'מה גורם למחלה?',
      description: 'הסיבה המדויקת אינה ידועה, אך רוב החוקרים סבורים שמדובר במחלה אוטואימונית שבה תאי T של מערכת החיסון תוקפים אנטיגנים בזקיק השיער. כתוצאה מכך תאי הגזע באזור נהרסים והשיער לא מסוגל לצמוח מחדש.',
      subtitle: 'גורמים אפשריים נוספים:',
      factors: [
        'נטייה גנטית',
        'תגובה לתרופות',
        'טריגרים סביבתיים או זיהומיים',
        'חוסר בחלבון PPAR-γ המשפיע על תפקוד בלוטות החלב'
      ]
    },
    symptoms: {
      title: 'מהם הסימפטומים?',
      content: [
        'נשירת שיער צלקתית - קרחות לא סדירות וחלקים ללא זקיקים נראים לעין',
        'תסמינים נלווים - גרד, צריבה, כאב, רגישות או תחושת אי נוחות בקרקפת',
        'ממצאים קליניים - אדמומיות וקשקשת סביב זקיקים פעילים; לעיתים חוטי שיער רופפים הנשלפים בקלות',
        'אזורים שכיחים: קדמת הקרקפת, הרקות והעורף; ב־ FFA – קו שיער קדמי; בתסמונת GLS – גם בית שחי ומפשעה'
      ]
    },
    diagnosis: {
      title: 'אבחון',
      content: [
        'בדיקה קלינית ודרamosקופיה - מראה אופייני של היעדר פתחי זקיקים, נקודות לבנות וצלקות',
        'ביופסיה של הקרקפת - בדיקת רקמה שמדגימה דלקת לימפוציטרית סביב הזקיק, ניוון תאי בסיס ופיבрозיס פרפיליקולרי',
        'אבחנה מבדלת כוללת מצבים אחרים של אלופציה צלקתית כגון לופוס דיסקואידי, CCCA, פוליקוליטיס דקלבנס ועוד'
      ]
    },
    treatment: {
      title: 'טיפול',
      content: 'אין טיפול שמחזיר שיער שאבד, לכן המטרה היא לעצור את התקדמות המחלה ולהפחית תסמינים.',
      options: [
        'סטרואידים – מקומיים, בהזרקה או פומיים',
        'תרופות אנטי מלריות',
        'מדכאי חיסון',
        'טיפולים נוספים',
        'בשלב מתקדם, ניתן לשקול פתרונות אסתטיים כמו פאות, הדמיית שיער, או השתלות שיער (רק לאחר רגיעה מלאה של המחלה)'
      ]
    },
    prognosis: {
      title: 'פרוגנוזה',
      content: [
        'המחלה מתקדמת בקצב משתנה – לעיתים מהיר ולעיתים איטי לאורך שנים',
        'חלק מהחולים חווים תקופות הפוגה, אך הצלקות נשארות',
        'טיפול מוקדם מעלה את הסיכוי לייצוב המחלה ולשמירה על זקיקים בריאים'
      ]
    }
  };
  
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
        
        {/* Variants Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 border-[#101828]/10 shadow-lg">
              <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                <Activity className="ml-2 h-6 w-6 text-[#905e26]" />
                {diseaseData.variants.title}
              </h3>
              <div className="space-y-4">
                {diseaseData.variants.content.map((variant, index) => (
                  <div key={index} className="flex items-start space-x-reverse space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                    <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{variant}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Demographics Section */}
        <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 border-[#101828]/10 shadow-lg">
              <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                <Users className="ml-2 h-6 w-6 text-[#905e26]" />
                {diseaseData.demographics.title}
              </h3>
              <div className="space-y-4">
                {diseaseData.demographics.content.map((demographic, index) => (
                  <div key={index} className="flex items-start space-x-reverse space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                    <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{demographic}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Causes Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 border-[#101828]/10 shadow-lg">
              <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                <Brain className="ml-2 h-6 w-6 text-[#905e26]" />
                {diseaseData.causes.title}
              </h3>
              <div className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mb-6">
                {diseaseData.causes.description}
              </div>
              
              <h4 className="text-xl font-semibold text-[#101828] mb-4">{diseaseData.causes.subtitle}</h4>
              <div className="space-y-4">
                {diseaseData.causes.factors.map((factor, index) => (
                  <div key={index} className="flex items-start space-x-reverse space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                    <span className="text-lg sm:text-base text-[#101828]/80">{factor}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Symptoms Section */}
        <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 border-[#101828]/10 shadow-lg">
              <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                <User className="ml-2 h-6 w-6 text-[#905e26]" />
                {diseaseData.symptoms.title}
              </h3>
              
              {/* Symptoms list */}
              <div className="space-y-4">
                {diseaseData.symptoms.content.map((symptom, index) => (
                  <div key={index} className="flex items-start space-x-reverse space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                    <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{symptom}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Diagnosis Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 border-[#101828]/10 shadow-lg">
              <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                <Stethoscope className="ml-2 h-6 w-6 text-[#905e26]" />
                {diseaseData.diagnosis.title}
              </h3>
              <div className="space-y-4">
                {diseaseData.diagnosis.content.map((method, index) => (
                  <div key={index} className="flex items-start space-x-reverse space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                    <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{method}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Treatment Options Section */}
        <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 border-[#101828]/10 shadow-lg">
              <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                <Zap className="ml-2 h-6 w-6 text-[#905e26]" />
                {diseaseData.treatment.title}
              </h3>
              <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mb-6 rich-content-display">
                {diseaseData.treatment.content}
              </p>
              <h4 className="text-xl font-semibold text-[#101828] mb-4">טיפולים אפשריים:</h4>
              <div className="space-y-4">
                {diseaseData.treatment.options.map((option, index) => (
                  <div key={index} className="flex items-start space-x-reverse space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                    <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{option}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Prognosis Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 border-[#101828]/10 shadow-lg">
              <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                <Target className="ml-2 h-6 w-6 text-[#905e26]" />
                {diseaseData.prognosis.title}
              </h3>
              <div className="space-y-4">
                {diseaseData.prognosis.content.map((prognosisItem, index) => (
                  <div key={index} className="flex items-start space-x-reverse space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                    <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{prognosisItem}</span>
                  </div>
                ))}
              </div>
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

        {/* Contact CTA */}
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