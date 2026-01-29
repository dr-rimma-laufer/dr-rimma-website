'use client';
import React from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import seborrheicImage from '../../../assets/c937a8936157e51d33ce3b5a1c82bc112ad8c962_converted.jpg';
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

interface SeborrheicDermatitisPageProps {
  onNavigate?: (page: string) => void;
  onClose?: () => void;
}

export function SeborrheicDermatitisPage({ onNavigate, onClose }: SeborrheicDermatitisPageProps) {
  const isStandalonePage = !onClose;
  const [isMobile, setIsMobile] = React.useState(false);
  
  // נתוני המחלה הספציפיים
  const diseaseData = {
    title: 'סבוריאה דרמטיטיס וקשקשת',
    titleEnglish: 'Seborrheic Dermatitis',
    subtitle: 'קשקשת ודלקת סבוריאית',
    description: 'סבוריאה דרמטיטיס היא אחת ממחלות העור הכרוניות השכיחות ביותר, המאופיינת בדלקת עורית, קשקשת, ואודם באזורים עתירי בלוטות חלב – בעיקר בקרקפת, הפנים, החזה העליון והגב. המחלה נחשבת לבעיה רפואית ואסתטית גם יחד, שכן מעבר לאי־נוחות הפיזית כמו גרד, צריבה ויובש היא עלולה להשפיע משמעותית על איכות החיים, הביטחון העצמי והתפקוד החברתי של המטופלים.',
    features: ['טיפול מקצועי', 'שליטה בתסמינים', 'מניעת הישנויות'],
    image: seborrheicImage,
    color: 'border-[#101828]-200 bg-[#101828]-50',
    duration: 'טיפול מתמשך',
    sessions: 'לפי צורך',
    results: 'הקלה מהירה',
    overview: 'מדובר במחלה רב־גורמית המתפתחת כתוצאה משילוב בין פעילות יתר של בלוטות החֵלֶב, נוכחות ותגובה דלקתית לפטרייה Malassezia וגורמים סביבתיים והורמונליים שונים. המחלה מופיעה בכל גיל – מתינוקות ועד מבוגרים, עם שיא שכיחות בקרב מתבגרים ובוגרים צעירים.',
    causes: {
      title: 'גורמים ופתוגנזה',
      content: [
        'הסיבה המדויקת אינה אחת, אך משלבת:',
        'ריבוי שמן בעור והפרשת חֵלֶב מוגברת',
        'תגובת־יתר דלקתית לפטריית שמר Malassezia הגדל בסביבה שומנית',
        'גורמי סביבה ולחץ נפשי',
        'גורמים גנטיים - נטייה משפחתית',
        'בינקות ייתכן טריגר הורמונלי שמקורו בהיריון/לידה',
        'קור ויובש עונתי',
        'דטרגנטים/כימיקלים חריפים',
        'תכשירי שיער מסוימים ותרופות (ליתיום, פויסוראלן)',
        'מחלות נוירולוגיות כמו פרקינסון'
      ]
    },
    symptoms: {
      title: 'תסמינים – איך זה נראה והיכן מופיע?',
      content: [
        'קשקשים צהבהבים או לבנים בקרקפת',
        'אדמומיות ודלקת של עור הקרקפת',
        'גרד רב ולעיתים תחושת צריבה',
        'עור יבש ומתקלף באזורים הפגועים',
        'בתינוקות: "כובע הערש" - קשקשים עבים וצהובים',
        'במקרים חמורים: נשירת שיער זמנית',
        'אתרים שכיחים: קרקפת וקו שיער, גבות, צידי אף, אוזניים, זקן, חזה עליון/גב וקפלי עור'
      ]
    },
    diagnosis: {
      title: 'אבחון ואבחנה מבדלת',
      content: [
        'בדיקה קלינית על ידי רופא עור',
        'זיהוי הסימנים האופייניים - קשקשים ואדמומיות',
        'היסטוריה מפורטת של התסמינים',
        'בדיקה דרtoMatchקופית לזיהוי דלקת',
        'שלילת מחלות דומות כמו פسورיאזיס, רוזציאה, טינאה ורסיקולור, קנדידיאזיס, אימפטיגו, לופוס',
        'במקרים נדירים: בדיקה מיקרוסקופית של הקשקשים'
      ]
    },
    treatment: {
      title: 'טיפול – לפי חומרה ומיקום',
      content: 'קרקפת:',
      options: [
        'שמפואים ללא מרשם ',
        'טיפול במרשם: שמפואים אנטיפטרייתיים מרוכזים, סטרואידים מקומיים, ולעיתים פוטותרפיה UVB או טיפול סיסטמי'
      ],
      facebody: {
        title: 'פנים וגוף:',
        options: [
          'קרמים אנטיפטרייתיים',
          'סטרואידים חלשים לקורס קצר',
          'מעכבי קלצינאורין כחלופה סטרואידלית',
          'במקרים קשים: רופלומילאסט קצף, פוטותרפיה'
        ]
      }
    },
    relatedConditions: {
      title: 'מניעה וניהול לטווח ארוך',
      content: [
        'לשמירה על שליטה במחלה:',
        'שימוש קבוע בשמפו מתאים גם בתקופות ללא תסמינים',
        'הימנעות ממוצרי טיפוח אגרסיביים',
        'שמירה על היגיינה טובה של הקרקפת',
        'הפחתת לחץ ושמירה על שינה מספקת',
        'הגנה מפני מזג אוויר קשה',
        'התייעצות עם רופא בכל החמרה',
        'התאמת הטיפול לפי עונות השנה'
      ]
    },
    frequency: {
      title: 'שכיחות ומי בקבוצת סיכון?',
      content: `סבוריאה דרמטיטיס היא מחלת עור נפוצה מאוד. הצורה הקלה ביותר היא קשקשת בקרקפת, מופיעה אצל עד כ־50% מהאוכלוסייה הבוגרת במהלך החיים. המחלה עצמה מאובחנת בכ־1%–3% מהאוכלוסייה הכללית, עם שיא שכיחות בין גילאי 20–40, ובשכיחות גבוהה יותר אצל גברים.
בקרב תינוקות, המחלה נפוצה במיוחד בשנה הראשונה לחיים ("קרקפת חלב"), עם שכיחות שנעה בין 10% ל־70%. בנוסף, היא מופיעה בשיעור מוגבר אצל חולים עם מחלות נוירולוגיות כגון פרקינסון או במצבי דיכוי חיסוני כגון  HIV.`
    },
    prognosis: {
      title: 'קשר לנשירת שיער',
      content: `בדרך כלל סבוריאה אינה גורמת לנשירת שיער ישירה, אך גרד ממושך ודלקת עלולים לגרום להשירון זמני או לדילול שיער עד שוך הדלקת.`
    },
    whenToSeeDoctor: {
      title: 'מתי לפנות לרופא?',
      content: [
        'היעדר שיפור לאחר שימוש בשמפו מתאים',
        'נגעים אדומים, כואבים או עם הפרשות',
        'מעורבות נרחבת, פגיעה באיכות חיים',
        'אצל תינוקות עם פיזור נרחב'
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
        
        {/* Frequency Section */}
        <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 border-[#101828]/10 shadow-lg">
              <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                <Users className="ml-2 h-6 w-6 text-[#905e26]" />
                {diseaseData.frequency.title}
              </h3>
              <div className="text-lg sm:text-base text-[#101828]/80 leading-relaxed rich-content-display whitespace-pre-line">
                {diseaseData.frequency.content}
              </div>
            </Card>
          </div>
        </section>
        
        {/* Causes & Risk Factors with Symptoms Side by Side Section - Desktop Only */}
        <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Desktop Layout - Side by Side */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-8">
              
              {/* Causes & Risk Factors Section */}
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Brain className="ml-2 h-6 w-6 text-[#905e26]" />
                  גורמים וגורמי סיכון
                </h3>
                <div className="space-y-4">
                  {diseaseData.causes.content.map((cause, index) => (
                    <div key={index} className={`${index === 0 ? 'mb-4' : ''}`}>
                      {index === 0 ? (
                        <span className="text-lg sm:text-base text-[#101828]/80 font-semibold rich-content-display">{cause}</span>
                      ) : (
                        <div className="relative pr-6">
                          <span className="absolute right-0 top-0 text-[#905e26] font-bold">•</span>
                          <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{cause}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Symptoms & Signs Section */}
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <User className="ml-2 h-6 w-6 text-[#905e26]" />
                  תסמינים וסימנים
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

            {/* Mobile Layout - Stacked */}
            <div className="lg:hidden space-y-8">
              
              {/* Causes & Risk Factors Section */}
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Brain className="ml-2 h-6 w-6 text-[#905e26]" />
                  גורמים וגורמי סיכון
                </h3>
                <div className="space-y-4">
                  {diseaseData.causes.content.map((cause, index) => (
                    <div key={index} className={`${index === 0 ? 'mb-4' : ''}`}>
                      {index === 0 ? (
                        <span className="text-lg sm:text-base text-[#101828]/80 font-semibold rich-content-display">{cause}</span>
                      ) : (
                        <div className="relative pr-6">
                          <span className="absolute right-0 top-0 text-[#905e26] font-bold">•</span>
                          <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{cause}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Symptoms & Signs Section */}
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <User className="ml-2 h-6 w-6 text-[#905e26]" />
                  תסמינים וסימנים
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
          </div>
        </section>

        {/* Diagnosis & Treatment Section - Closely Connected Two Columns on Desktop */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Desktop Layout - Side by Side with Smaller Gap */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-6">
              
              {/* Diagnosis Section */}
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

              {/* Treatment Options Section */}
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Zap className="ml-2 h-6 w-6 text-[#905e26]" />
                  {diseaseData.treatment.title}
                </h3>
                
                {/* קרקפת */}
                <div className="mb-8">
                  <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mb-6 rich-content-display">
                    {diseaseData.treatment.content}
                  </p>
                  <div className="space-y-4">
                    {diseaseData.treatment.options.map((option, index) => (
                      <div key={index} className="flex items-start space-x-reverse space-x-3">
                        <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                        <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display whitespace-pre-line">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* פנים וגוף */}
                <div>
                  <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mb-6 rich-content-display">
                    {diseaseData.treatment.facebody.title}
                  </p>
                  <div className="space-y-4">
                    {diseaseData.treatment.facebody.options.map((option, index) => (
                      <div key={index} className="flex items-start space-x-reverse space-x-3">
                        <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                        <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display whitespace-pre-line">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Mobile Layout - Stacked */}
            <div className="lg:hidden space-y-8">
              
              {/* Diagnosis Section */}
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

              {/* Treatment Options Section */}
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Zap className="ml-2 h-6 w-6 text-[#905e26]" />
                  {diseaseData.treatment.title}
                </h3>
                
                {/* קרקפת */}
                <div className="mb-8">
                  <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mb-6 rich-content-display">
                    {diseaseData.treatment.content}
                  </p>
                  <div className="space-y-4">
                    {diseaseData.treatment.options.map((option, index) => (
                      <div key={index} className="flex items-start space-x-reverse space-x-3">
                        <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                        <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display whitespace-pre-line">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* פנים וגוף */}
                <div>
                  <p className="text-lg sm:text-base text-[#101828]/80 leading-relaxed mb-6 rich-content-display">
                    {diseaseData.treatment.facebody.title}
                  </p>
                  <div className="space-y-4">
                    {diseaseData.treatment.facebody.options.map((option, index) => (
                      <div key={index} className="flex items-start space-x-reverse space-x-3">
                        <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                        <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display whitespace-pre-line">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Conditions & When to See Doctor Sections Side by Side */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Prevention & Long-term Management Section */}
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Shield className="ml-2 h-6 w-6 text-[#905e26]" />
                  {diseaseData.relatedConditions.title}
                </h3>
                <div className="space-y-4">
                  {diseaseData.relatedConditions.content.map((item, index) => (
                    <div key={index} className={`${index === 0 ? 'mb-4' : ''}`}>
                      {index === 0 ? (
                        <span className="text-lg sm:text-base text-[#101828]/80 font-semibold rich-content-display">{item}</span>
                      ) : (
                        <div className="relative pr-6">
                          <span className="absolute right-0 top-0 text-[#905e26] font-bold">•</span>
                          <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{item}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* When to See Doctor Section */}
              <Card className="p-8 border-[#101828]/10 shadow-lg">
                <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Stethoscope className="ml-2 h-6 w-6 text-[#905e26]" />
                  {diseaseData.whenToSeeDoctor.title}
                </h3>
                <div className="space-y-4">
                  {diseaseData.whenToSeeDoctor.content.map((item, index) => (
                    <div key={index} className="flex items-start space-x-reverse space-x-3">
                      <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0 mt-0.5" />
                      <span className="text-lg sm:text-base text-[#101828]/80 rich-content-display">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Hair Loss Relation Section */}
        <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 border-[#101828]/10 shadow-lg">
              <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                <Target className="ml-2 h-6 w-6 text-[#905e26]" />
                {diseaseData.prognosis.title}
              </h3>
              <div className="text-lg sm:text-base text-[#101828]/80 leading-relaxed rich-content-display whitespace-pre-line">
                {diseaseData.prognosis.content}
              </div>
            </Card>
          </div>
        </section>

        {/* Summary Section */}
        <section className="py-16 bg-gradient-to-b from-white to-[#101828]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 border-[#905e26]/20 shadow-lg bg-gradient-to-br from-[#905e26]/5 to-white">
              <h3 className="text-3xl sm:text-2xl font-bold text-[#101828] mb-6 flex items-center">
                <Star className="ml-2 h-6 w-6 text-[#905e26]" />
                סיכום
              </h3>
              <div className="text-[#101828] leading-relaxed text-xl sm:text-lg space-y-4">
                <p>
                  סבוריאה דרמטיטיס וקשקשת היא מחלה הדורשת טיפול מקצועי ומותאם אישית.
                </p>
                <p className="font-semibold">
                  במרפאתנו אנו מספקים אבחון מדויק וטיפול מתקדם, תוך שמירה על בטיחות המטופל ומתן מעקב רפואי מתמיד לקבלת התוצאות הטובות ביותר.
                </p>
              </div>
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