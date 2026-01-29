import React from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ArrowRight, CheckCircle, Clock, Activity, Award, User, Calendar, TrendingUp, Shield, Star, Heart, ArrowLeft } from 'lucide-react';
import { CONSERVATIVE_TREATMENTS } from '../../utils/treatmentData';

type TreatmentType = 'prp' | 'mesotherapy' | 'medication' | 'laser';

interface ConservativeTreatmentPageProps {
  treatmentType: TreatmentType;
  onNavigate: (page: string) => void;
}

export function ConservativeTreatmentPage({ treatmentType, onNavigate }: ConservativeTreatmentPageProps) {
  // Get treatment data based on type
  const getTreatmentData = () => {
    const treatmentMap = {
      'prp': 0,
      'mesotherapy': 1,
      'medication': 2,
      'laser': 3
    };
    
    const index = treatmentMap[treatmentType];
    return CONSERVATIVE_TREATMENTS[index];
  };

  // Get detailed information for each treatment
  const getTreatmentDetails = (treatmentTitle: string) => {
    const detailsMap: { [key: string]: any } = {
      'PRP לשיער': {
        process: [
          'שאיבת דם מהמטופל (כ-30 מ"ל)',
          'הפרדת הפלזמה בצנטריפוגה מיוחדת',
          'הכנת הפלזמה העשירה בטסיות דם',
          'הזרקת הפלזמה לקרקפת באזורים המטופלים',
          'העברת גורמי גדילה ישירות לזקיקי השיער'
        ],
        benefits: [
          'עידוד צמיחת שיער חדש ובריא',
          'חיזוק השיער הקיים ומניעת נשירה',
          'שיפור איכות השיער וצפיפותו',
          'טיפול טבעי 100% מגוף המטופל',
          'אין סיכון לתגובות אלרגיות'
        ],
        suitableFor: [
          'נשירת שיער בשלבים מוקדמים',
          'דלילות שיער כללית',
          'אלופציה אנדרוגנטית קלה עד בינונית',
          'רצון לחזק שיער קיים',
          'מטופלים המעוניינים בטיפול טבעי'
        ],
        expectations: 'תוצאות ראשונות נראות לאחר 2-3 טיפולים. השיפור המלא מתפתח במשך 6-12 חודשים מסיום סדרת הטיפולים.',
        beforeAfter: 'לפני הטיפול חשוב להימנע מנטילת תרופות נוגדות קרישה במשך שבוע. לאחר הטיפול יש להימנע מגירוי הקרקפת במשך 24 שעות.',
        cost: 'עלות הטיפול נקבעת בהתאם למספר האזורים המטופלים ומספר הטיפולים הנדרש.',
        maintenance: 'לשמירה על התוצאות מומלץ טיפול תחזוקה אחת לשנה.'
      },
      'מזותרפיה לשיער': {
        process: [
          'ניקוי וחיטוי הקרקפת',
          'הכנת קוקטייל ויטמינים אישי',
          'הזרקות מיקרוסקופיות לקרקפת',
          'חדירה ישירה של חומרי הזנה לזקיקי השיער',
          'עיסוי קל להפצת החומרים'
        ],
        benefits: [
          'הזנה ישירה של זקיקי השיער',
          'חיזוק השיער ומניעת שבירה',
          'שיפור מיקרוצירקולציה בקרקפת',
          'הגברת מטבוליזם הזקיקים',
          'הפחתת דלקת בקרקפת'
        ],
        suitableFor: [
          'שיער חלש ושביר',
          'דלילות שיער כללית',
          'בעיות קרקפת כמו קשקשים',
          'נשירת שיער עונתית',
          'רצון לשפר איכות השיער'
        ],
        expectations: 'שיפור ברואה השיער נראה כבר לאחר 2-3 טיפולים. התוצאות המלאות מתפתחות במשך 4-6 חודשים.',
        beforeAfter: 'לפני הטיפול יש להימנע מטיפוחי שיער כימיים במשך 48 שעות. לאחר הטיפול מומלץ להימנע מרחיצת השיער במשך 12 שעות.',
        cost: 'עלות הטיפול נקבעת לפי סוג הקוקטייל הנבחר ומספר האזורים המטופלים.',
        maintenance: 'מומלץ לחזור על הטיפול כל 3-4 חודשים לשמירה על התוצאות.'
      },
      'טיפול לייזר LLLT': {
        process: [
          'הכנת הקרקפת והסרת שיירי מוצרים',
          'הנחת מכשיר הלייזר על הקרקפת',
          'חשיפה לאור לייזר בתדירות מדויקת',
          'גירוי ביולוגי של זקיקי השיער',
          'הגברת זרימת דם באזור המטופל'
        ],
        benefits: [
          'עיכוב נשירת שיער נוספת',
          'עידוד צמיחה של שיער חדש',
          'הגברת זרימת דם בקרקפת',
          'חיזוק זקיקי השיער הקיימים',
          'שיפור איכות השיער הצומח'
        ],
        suitableFor: [
          'נשירת שיער אנדרוגנטית',
          'דלילות שיער כללית',
          'מטופלים הרגישים להזרקות',
          'רצון בטיפול ללא מגע',
          'משלים לטיפולים אחרים'
        ],
        expectations: 'הקטנה בנשירה נראית לאחר 6-8 טיפולים. צמיחת שיער חדש מתחילה לאחר 3-4 חודשים של טיפול סדיר.',
        beforeAfter: 'לא נדרשת הכנה מיוחדת לפני הטיפול. לאחר הטיפול ניתן לחזור לפעילות רגילה מיד.',
        cost: 'עלות הטיפול נקבעת לפי מספר הטיפולים בחבילה ואזור הטיפול.',
        maintenance: 'מומלץ לחזור על הטיפול אחת לחודשיים לשמירה על התוצאות.'
      },
      'טיפול תרופתי לשיער': {
        process: [
          'בדיקה רפואית מקיפה ואבחון מדויק',
          'קביעת סוג התרופה המתאימה למטופל',
          'הסבר מפורט על אופן הנטילה והשימוש',
          'מעקב רפואי שוטף ובדיקות תקופתיות',
          'התאמת הטיפול בהתאם להתקדמות'
        ],
        benefits: [
          'עצירה יעילה של נשירת השיער',
          'חיזוק זקיקי השיער הקיימים',
          'שיפור באיכות ובמרקם השיער',
          'פתרון רפואי מוכח ומאושר',
          'תוצאות ארוכות טווח'
        ],
        suitableFor: [
          'נשירת שיער אנדרוגנטית',
          'התקרחות גברית ונשית',
          'דלילות שיער הורמונלית',
          'מטופלים המחפשים פתרון יעיל',
          'רצון בטיפול רפואי מוכח'
        ],
        expectations: 'תוצאות ראשונות נראות לאחר 3-4 חודשי טיפול סדיר. השיפור המשמעותי מתפתח במשך 6-12 חודשים של שימוש מתמיד.',
        beforeAfter: 'חשוב לעקוב אחר הוראות הרופא בקפדנות ולא להפסיק את הטיפול ללא התייעצות. יש ליידע את הרופא על תרופות נוספות הנלקחות.',
        cost: 'עלות הטיפול התרופתי נקבעת לפי סוג התרופה ותדירות המעקב הנדרש.',
        maintenance: 'הטיפול התרופתי דורש המשכיות לשמירה על התוצאות. מעקב רפואי נדרש מדי תקופה.'
      }
    };

    return detailsMap[treatmentTitle] || {
      process: ['מידע מפורט יתווסף בקרוב'],
      benefits: ['יתרונות הטיפול יפורטו בהמשך'],
      suitableFor: ['התאמת הטיפול תיבדק במהלך הייעוץ'],
      expectations: 'פרטי התוצאות הצפויות יסופקו במהלך הייעוץ האישי.',
      beforeAfter: 'הוראות לפני ואחרי הטיפול יינתנו בייעוץ אישי.',
      cost: 'מחירון מפורט יסופק בייעוץ אישי.',
      maintenance: 'תוכנית תחזוקה אישית תיקבע בהתאם לצרכים.'
    };
  };

  const treatment = getTreatmentData();
  const details = getTreatmentDetails(treatment.title);

  if (!treatment) {
    return (
      <div className="min-h-screen bg-white hebrew-text" dir="rtl">
        <Header currentPage="hair-treatments" onNavigate={onNavigate} />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-[#101828] mb-4">טיפול לא נמצא</h1>
            <Button onClick={() => onNavigate('#hair-treatments')} className="bg-[#101828] hover:bg-[#905e26] text-white">
              <ArrowLeft className="ml-2 h-4 w-4" />
              חזרה לטיפולי שיער
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white hebrew-text" dir="rtl">
      <Header currentPage="hair-treatments" onNavigate={onNavigate} />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#101828]/5 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <div className="mb-8">
              <Button 
                variant="outline" 
                onClick={() => onNavigate('#hair-treatments')}
                className="border-[#101828] text-[#101828] hover:bg-[#101828] hover:text-white"
              >
                <ArrowLeft className="ml-2 h-4 w-4" />
                חזרה לטיפולי שיער
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-8">
                <div>
                  <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
                    {treatment.subtitle}
                  </Badge>
                  <h1 className="text-4xl lg:text-5xl font-bold text-[#101828] mb-6">
                    {treatment.title}
                  </h1>
                  <p className="text-xl text-[#101828]/80 leading-relaxed">
                    {treatment.description}
                  </p>
                </div>

                {/* Treatment Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white border border-[#101828]/10 p-4 rounded-lg text-center shadow-sm">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-[#101828]" />
                    <div className="text-sm text-[#101828]/70">משך טיפול</div>
                    <div className="font-bold text-[#101828]">{treatment.duration}</div>
                  </div>
                  <div className="bg-white border border-[#101828]/10 p-4 rounded-lg text-center shadow-sm">
                    <Activity className="h-6 w-6 mx-auto mb-2 text-[#101828]" />
                    <div className="text-sm text-[#101828]/70">מספר טיפולים</div>
                    <div className="font-bold text-[#101828]">{treatment.sessions}</div>
                  </div>
                  <div className="bg-white border border-[#101828]/10 p-4 rounded-lg text-center shadow-sm">
                    <Award className="h-6 w-6 mx-auto mb-2 text-[#101828]" />
                    <div className="text-sm text-[#101828]/70">תוצאות</div>
                    <div className="font-bold text-[#101828]">{treatment.results}</div>
                  </div>
                </div>

                {/* Quick CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-[#101828] hover:bg-[#905e26] text-white flex-1">
                    <Calendar className="ml-2 h-5 w-5" />
                    קביעת ייעוץ חינם
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-[#101828] text-[#101828] hover:bg-[#101828] hover:text-white flex-1"
                  >
                    לפרטים נוספים: 03-1234567
                  </Button>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <ImageWithFallback
                    src={treatment.image}
                    alt={treatment.title}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Information */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Right Column - Features and Process */}
              <div className="space-y-12">
                {/* Basic Features */}
                <Card className="p-8 border-[#101828]/10 shadow-lg">
                  <h3 className="text-2xl font-bold text-[#101828] mb-6 flex items-center">
                    <Star className="ml-2 h-6 w-6 text-[#905e26]" />
                    יתרונות עיקריים
                  </h3>
                  <div className="space-y-4">
                    {treatment.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-reverse space-x-3">
                        <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0" />
                        <span className="text-[#101828]/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Treatment Process */}
                <Card className="p-8 border-[#101828]/10 shadow-lg">
                  <h3 className="text-2xl font-bold text-[#101828] mb-6 flex items-center">
                    <Activity className="ml-2 h-6 w-6 text-[#905e26]" />
                    תהליך הטיפול
                  </h3>
                  <div className="space-y-4">
                    {details.process.map((step: string, index: number) => (
                      <div key={index} className="flex items-start space-x-reverse space-x-4">
                        <div className="bg-[#101828] text-white text-sm w-6 h-6 rounded-full flex items-center justify-center mt-1 flex-shrink-0 font-bold">
                          {index + 1}
                        </div>
                        <span className="text-[#101828]/80 leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Left Column - Benefits and Suitability */}
              <div className="space-y-12">
                {/* Benefits */}
                <Card className="p-8 border-[#101828]/10 shadow-lg">
                  <h3 className="text-2xl font-bold text-[#101828] mb-6 flex items-center">
                    <Heart className="ml-2 h-6 w-6 text-[#905e26]" />
                    יתרונות הטיפול
                  </h3>
                  <div className="space-y-4">
                    {details.benefits.map((benefit: string, index: number) => (
                      <div key={index} className="flex items-center space-x-reverse space-x-3">
                        <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0" />
                        <span className="text-[#101828]/80">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Suitable For */}
                <Card className="p-8 border-[#101828]/10 shadow-lg">
                  <h3 className="text-2xl font-bold text-[#101828] mb-6 flex items-center">
                    <User className="ml-2 h-6 w-6 text-[#905e26]" />
                    מתאים עבור
                  </h3>
                  <div className="space-y-4">
                    {details.suitableFor.map((condition: string, index: number) => (
                      <div key={index} className="flex items-center space-x-reverse space-x-3">
                        <Shield className="h-5 w-5 text-[#101828] flex-shrink-0" />
                        <span className="text-[#101828]/80">{condition}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Expectations and Additional Info */}
        <section className="py-16 bg-[#101828]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Expectations */}
              <Card className="p-8 bg-[#905e26]/10 border-[#905e26]/20">
                <h3 className="text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <TrendingUp className="ml-2 h-6 w-6 text-[#905e26]" />
                  מה לצפות מהטיפול
                </h3>
                <p className="text-[#101828]/80 leading-relaxed text-lg">
                  {details.expectations}
                </p>
              </Card>

              {/* Before/After Care */}
              <Card className="p-8 bg-white border-[#101828]/10">
                <h3 className="text-2xl font-bold text-[#101828] mb-6 flex items-center">
                  <Shield className="ml-2 h-6 w-6 text-[#905e26]" />
                  הוראות לפני ואחרי
                </h3>
                <p className="text-[#101828]/80 leading-relaxed text-lg">
                  {details.beforeAfter}
                </p>
              </Card>

            </div>

            {/* Cost and Maintenance - Full Width */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <Card className="p-8 bg-white border-[#101828]/10">
                <h3 className="text-xl font-bold text-[#101828] mb-4">עלות הטיפול</h3>
                <p className="text-[#101828]/80 leading-relaxed">
                  {details.cost}
                </p>
              </Card>

              <Card className="p-8 bg-white border-[#101828]/10">
                <h3 className="text-xl font-bold text-[#101828] mb-4">טיפולי תחזוקה</h3>
                <p className="text-[#101828]/80 leading-relaxed">
                  {details.maintenance}
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#101828] mb-6">
              מוכנים להתחיל את המסע לשיער בריא יותר?
            </h2>
            <p className="text-xl text-[#101828]/70 mb-8">
              קבעו ייעוץ אישי עם ד"ר רימה לאופר ותגלו את הטיפול המתאים לכם
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <Button size="lg" className="bg-[#101828] hover:bg-[#905e26] text-white flex-1">
                <Calendar className="ml-2 h-5 w-5" />
                קביעת ייעוץ חינם
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-[#101828] text-[#101828] hover:bg-[#101828] hover:text-white flex-1"
              >
                WhatsApp: 050-1234567
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}