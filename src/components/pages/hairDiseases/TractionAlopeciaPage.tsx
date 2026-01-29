'use client';
import React from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
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
// Using the new traction alopecia image
import tractionAlopeciaImage from '../../../assets/d4b4f03a8c2334d41e0deab3e73a945bb19ceb3c_converted.jpg';
// Card image from hair diseases data
import tractionAlopeciaCardImage from '../../../assets/12da00077223321c7bb35e261aa4315d5d7c4474_converted.jpg';

interface TractionAlopeciaPageProps {
  onNavigate?: (page: string) => void;
  onClose?: () => void;
}

export function TractionAlopeciaPage({ onNavigate, onClose }: TractionAlopeciaPageProps) {
  const isStandalonePage = !onClose;
  const [isMobile, setIsMobile] = React.useState(false);
  
  // נתוני המחלה הספציפיים
  const diseaseData = {
    title: 'אלופציה טראקציונית',
    titleEnglish: 'Traction Alopecia',
    subtitle: 'נשירת שיער הנגרמת בשל מתיחה כרונית',
    description: 'אלופציה טראקציונית היא סוג של נשירת שיער הנגרמת בשל מתיחה כרונית ומתמשכת של השיער. היא נובעת מלחץ מכני חוזר ונשנה על זקיקי השיער – לרוב כתוצאה מתסרוקות הדוקות כמו קוקו מתוח, צמות, הארכות שיער, שימוש קבוע בפאות, או אביזרים שמושכים את השיער לאורך זמן.',
    features: ['גורם ניתן למניעה', 'זיהוי מוקדם חיוני', 'טיפול מותאם שלב'],
    image: tractionAlopeciaImage,
    color: 'border-[#101828]-200 bg-[#101828]-50',
    duration: 'תלוי בשלב המחלה',
    sessions: 'מעקב וטיפול מתאים',
    results: 'שיפור תוך חודשים',
    overview: 'המתח הממושך מחליש את זקיקי השיער, גורם לדלקת מיקרוסקופית סביבם, ובסופו של דבר עלול להוביל לנשירה קבועה אם לא מטפלים בזמן.',
    causes: {
      title: 'גורמי סיכון',
      content: [
        'תסרוקות הדוקות: צמות, קוקו מתוח, "קוקו סוס גבוה", דדלוקים',
        'שימוש קבוע בהארכות שיער או תוספות',
        'הרגלי טיפוח הדוקים עם קליפסים, סיכות או סרטי ראש חזקים',
        'שימוש ממושך בפאות מודבקות או תפורות',
        'שכיחות גבוהה יותר בקרב נשים ובקרב אנשים המתרגלים תסרוקות תרבותיות או דתיות מסוימות'
      ]
    },
    symptoms: {
      title: 'סימנים ותסמינים',
      content: [
        'נסיגה הדרגתית של קו השיער – במיוחד באזור הרקות והמצח',
        'שיער שביר ודליל באזורים חשופים ללחץ',
        'אדמומיות, גרד או תחושת כאב בקרקפת במקומות בהם נמשכים השערות',
        'הופעת שערות קצרות או שבורות בשולי האזור',
        'בשלבים מוקדמים – השיער עדיין יכול לצמוח מחדש אם מפחיתים את הגורם הלוחץ',
        'בשלבים מתקדמים – עלול להיווצר נזק צלקתי לזקיקים (צלקת זעירה סביב זקיקי השיער), מה שמונע צמיחה מחודשת'
      ]
    },
    diagnosis: {
      title: 'אבחון',
      content: [
        'האבחון נעשה על ידי רופא עור באמצעות:',
        'שיחה והיסטוריה רפואית (הרגלי תסרוקות, משך הזמן)',
        'בדיקה קלינית ודרimotoקופית לאיתור סימנים של דלקת או צלקת',
        'לעיתים ביופסיה לאישור במקרים של חשד לנשירה צלקתית מתקדמת'
      ]
    },
    treatment: {
      title: 'טיפול',
      content: 'הטיפול תלוי בשלב המחלה ומידת הנזק שנגרם לזקיקי השיער.',
      options: [
        'בשלב מוקדם:',
        'הפסקת הגורם הלוחץ – מעבר לתסרוקות רפויות יותר',
        'טיפולים מקומיים לשימור וחיזוק זקיקים',
        'טיפולי PRP ומזותרפיה – עשויים לעודד צמיחה מחודשת ולשפר את בריאות הקרקפת',
        '',
        'בשלבים מתקדמים:',
        'אם נגרם נזק צלקתי – השיער לא יצמח מחדש באופן טבעי',
        'השתלת שיער הופכת לאפשרות טיפולית לשיקום האזור'
      ]
    },
    prognosis: {
      title: 'מניעה',
      content: `בחירה בתסרוקות רפויות ולא הדוקות מדי.
שינוי סגנון השיער לעיתים קרובות, כדי לא להפעיל לחץ חוזר על אותו אזור.
הימנעות משימוש ממושך או הדוק מדי בהארכות ופאות.
טיפול מוקדם בנשירה או באדמומיות בקרקפת.`
    },
    relatedConditions: {
      title: 'לסיכום',
      content: 'אלופציה טראקציונית היא מצב שניתן למניעה ברוב המקרים אם מזהים מוקדם את הסימנים ומפחיתים את גורמי הסיכון. טיפול מותאם אישית אצל רופא עור יכול לעצור את התהליך ולעיתים אף להפוך אותו. בשלב מתקדם, קיימות אפשרויות מתקדמות לשיקום אסתטי, כולל השתלות שיער.'
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
        description: 'בדיקת הקרקפת והשיער באמצעות דרimotoקופיה',
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
        description: 'שימוש בדרimotoקופיה ובדיקות מעבדה לאבחון מדויק'
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
              
              {/* Images - First on mobile, Right side on desktop */}
              <div className="relative order-1 lg:order-2">
                {/* Desktop: Two images side by side */}
                <div className="hidden lg:flex gap-4">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl flex-1">
                    <ImageWithFallback
                      src={diseaseData.image}
                      alt={`${diseaseData.title} - תמונה ראשית`}
                      className="w-full h-80 object-cover bg-gray-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/20 to-transparent"></div>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl flex-1">
                    <ImageWithFallback
                      src={tractionAlopeciaCardImage}
                      alt={`${diseaseData.title} - תמונה נוספת`}
                      className="w-full h-80 object-cover bg-gray-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/20 to-transparent"></div>
                  </div>
                </div>
                
                {/* Mobile: Single main image */}
                <div className="lg:hidden relative overflow-hidden rounded-2xl shadow-2xl">
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
                <div className="space-y-4">
                  {Array.isArray(diseaseData.causes.content) ? (
                    diseaseData.causes.content.map((cause, index) => (
                      <div key={index} className="flex items-start space-x-reverse space-x-3">
                        <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                        <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{cause}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-lg sm:text-base text-[#101828]/80 leading-relaxed rich-content-display whitespace-pre-line">
                      {diseaseData.causes.content}
                    </div>
                  )}
                </div>
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
        )}

        {/* Diagnosis Section */}
        {diseaseData.diagnosis && (
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
        )}

        {/* Treatment Options Section */}
        {diseaseData.treatment && (
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
                <div className="space-y-4">
                  {diseaseData.treatment.options.map((option, index) => {
                    // Skip empty lines
                    if (!option.trim()) {
                      return <div key={index} className="h-2"></div>;
                    }
                    
                    // Check if it's a header (ends with colon)
                    const isHeader = option.trim().endsWith(':');
                    
                    if (isHeader) {
                      return (
                        <div key={index} className="mt-6 first:mt-0">
                          <h4 className="text-xl sm:text-lg font-bold text-[#101828] mb-3">
                            {option}
                          </h4>
                        </div>
                      );
                    }
                    
                    return (
                      <div key={index} className="flex items-start space-x-reverse space-x-3 mr-4">
                        <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                        <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display whitespace-pre-line">{option}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Related Conditions Section */}
        {diseaseData.relatedConditions && (
          <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Shield className="ml-2 h-6 w-6 text-[#905e26]" />
                  {diseaseData.relatedConditions.title}
                </h3>
                <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed rich-content-display">
                  {diseaseData.relatedConditions.content}
                </p>
              </Card>
            </div>
          </section>
        )}

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