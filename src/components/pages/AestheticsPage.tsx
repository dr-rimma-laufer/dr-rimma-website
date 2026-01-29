'use client';
import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import aestheticTreatmentImage from '../../assets/a38fd388de0045bd0fff5058fc74fe267348645f_converted.jpg';
import { 
  CheckCircle,
  Clock,
  Users,
  Award,
  Calendar,
  Phone,
  ArrowRight,
  Sparkles,
  Heart,
  Zap,
  Shield,
  Star
} from 'lucide-react';

interface AestheticsPageProps {
  onNavigate?: (page: string) => void;
}

export function AestheticsPage({ onNavigate }: AestheticsPageProps) {
  const aestheticTreatments = [
    {
      title: 'חידוש העור',
      subtitle: 'טיפולי אנטי אייג\'ינג',
      description: 'טיפולים מתקדמים להחייאת העור, מתיחת פנים ללא ניתוח והקטנת קמטים',
      features: ['חידוש העור', 'מתיחת פנים', 'טיפול בקמטים'],
      image: aestheticTreatmentImage,
      color: 'border-[#905e26]/30 bg-[#905e26]/5'
    },
    {
      title: 'טיפולי בוטוקס',
      subtitle: 'הזרקות מקצועיות',
      description: 'הזרקות בוטוקס מדויקות לחלקת קמטים וקווי הבעה באזור הפנים',
      features: ['תוצאות מיידיות', 'טיפול בטוח', 'מראה טבעי'],
      image: aestheticTreatmentImage,
      color: 'border-[#101828]/30 bg-[#101828]/5'
    },
    {
      title: 'מילוי קמטים',
      subtitle: 'חומצה היאלורונית',
      description: 'מילוי קמטים ונפח לפנים עם חומצה היאלורונית איכותית',
      features: ['תוצאות טבעיות', 'ללא זמן החלמה', 'ביטחון גבוה'],
      image: aestheticTreatmentImage,
      color: 'border-[#0a0f1a]/30 bg-[#0a0f1a]/5'
    }
  ];

  const facialTreatments = [
    {
      title: 'טיפולי פנים מתקדמים',
      subtitle: 'הידרה פאשיאל ו-PRP',
      treatments: [
        'הידרה פאשיאל - ניקוי עמוק ולחות',
        'PRP - טיפול בפלזמה עשירה בטסיות דם',
        'RF - מתיחה באמצעות גלי רדיו',
        'IPL - טיפול בכתמי שמש ונימים'
      ],
      image: aestheticTreatmentImage
    },
    {
      title: 'טיפולי גוף',
      subtitle: 'עיצוב וחידוש',
      treatments: [
        'הרזה ללא ניתוח - קריולפוליזיס',
        'מתיחת עור - רדיופרקוונציה',
        'טיפול בצלוליטיס ועור רפוי',
        'שיפור מרקם העור והפגמים'
      ],
      image: aestheticTreatmentImage
    }
  ];

  const treatmentBenefits = [
    {
      icon: Sparkles,
      title: 'תוצאות מיידיות',
      description: 'רוב הטיפולים מספקים תוצאות נראות כבר מהטיפול הראשון'
    },
    {
      icon: Heart,
      title: 'בטיחות מקסימלית',
      description: 'כל הטיפולים מבוצעים בהתאם לסטנדרטים הרפואיים הגבוהים ביותר'
    },
    {
      icon: Zap,
      title: 'ללא זמן החלמה',
      description: 'טיפולים לא פולשניים המאפשרים חזרה מיידית לפעילות'
    },
    {
      icon: Shield,
      title: 'מעקב מקצועי',
      description: 'מעקב צמוד ותמיכה לאורך כל תהליך הטיפול'
    }
  ];

  const beforeAfterResults = [
    {
      title: 'טיפול בוטוקס',
      description: 'מטופלת בת 45 - טיפול בקמטים',
      beforeImage: aestheticTreatmentImage,
      afterImage: aestheticTreatmentImage
    },
    {
      title: 'מילוי קמטים',
      description: 'מטופלת בת 38 - חידוש נפח לפנים',
      beforeImage: aestheticTreatmentImage,
      afterImage: aestheticTreatmentImage
    },
    {
      title: 'הידרה פאשיאל',
      description: 'מטופלת בת 32 - החייאת העור',
      beforeImage: aestheticTreatmentImage,
      afterImage: aestheticTreatmentImage
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-l from-[#101828] to-[#0a0f1a] text-white pt-16 md:pt-18 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-white/20 text-white border-white/30 mb-6">
              אסתטיקה רפואית מתקדמת
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              טיפולי יופי ואסתטיקה רפואית
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-4xl mx-auto">
              חידוש ושיפור מראה הפנים והגוף עם טיפולים מתקדמים ובטוחים לתוצאות טבעיות ומרשימות
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg"
                className="bg-[#905e26] hover:bg-[#905e26]/90 text-white"
              >
                <Calendar className="ml-2 h-5 w-5" />
                ייעוץ אסתטיקה חינם
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#101828]"
              >
                <Phone className="ml-2 h-5 w-5" />
                03-1234567
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Aesthetic Treatments */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#101828] mb-4">
              טיפולי האסתטיקה המתקדמים שלנו
            </h2>
            <p className="text-xl text-[#101828]/70 max-w-3xl mx-auto">
              מגוון רחב של טיפולי יופי מתקדמים לפנים ולגוף, המבוצעים ברמה המקצועית הגבוהה ביותר
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aestheticTreatments.map((treatment, index) => (
              <Card key={index} className={`p-6 hover:shadow-xl transition-shadow ${treatment.color}`}>
                <ImageWithFallback
                  src={treatment.image}
                  alt={treatment.title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-[#101828] mb-2">
                    {treatment.title}
                  </h3>
                  <Badge variant="secondary" className="mb-4 bg-[#905e26]/10 text-[#905e26] border-[#905e26]/30">
                    {treatment.subtitle}
                  </Badge>
                </div>
                <p className="text-[#101828]/70 mb-6 text-center">
                  {treatment.description}
                </p>
                <div className="space-y-3 mb-6">
                  {treatment.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-reverse space-x-3">
                      <CheckCircle className="h-5 w-5 text-[#905e26]" />
                      <span className="text-[#101828]/80">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full bg-[#905e26] hover:bg-[#905e26]/90 text-white"
                >
                  למידע נוסף
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Categories */}
      <section className="py-20 bg-[#101828]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#101828] mb-4">
              קטגוריות טיפולים מיוחדות
            </h2>
            <p className="text-xl text-[#101828]/70 max-w-3xl mx-auto">
              טיפולים מותאמים לכל אזור בגוף עם טכנולוגיות מתקדמות ותוצאות מוכחות
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {facialTreatments.map((category, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-[#101828] mb-4">
                      {category.title}
                    </h3>
                    <Badge variant="outline" className="mb-6 border-[#905e26] text-[#905e26]">
                      {category.subtitle}
                    </Badge>
                    <div className="space-y-3">
                      {category.treatments.map((treatment, treatmentIndex) => (
                        <div key={treatmentIndex} className="flex items-center space-x-reverse space-x-3">
                          <CheckCircle className="h-5 w-5 text-[#905e26] flex-shrink-0" />
                          <span className="text-[#101828]/80">{treatment}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      className="mt-6 bg-[#905e26] hover:bg-[#905e26]/90 text-white"
                    >
                      קביעת טיפול
                    </Button>
                  </div>
                  <ImageWithFallback
                    src={category.image}
                    alt={category.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#101828] mb-4">
              היתרונות של הטיפולים שלנו
            </h2>
            <p className="text-xl text-[#101828]/70 max-w-3xl mx-auto">
              כל הטיפולים מבוצעים ברמה המקצועית הגבוהה ביותר עם מעקב רפואי צמוד
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {treatmentBenefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-[#905e26] to-[#101828] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-[#101828] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-[#101828]/70">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Results */}
      <section className="py-20 bg-[#101828]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#101828] mb-4">
              תוצאות מטופלות מרוצות
            </h2>
            <p className="text-xl text-[#101828]/70 max-w-3xl mx-auto">
              צפו בתוצאות האמיתיות של מטופלות שבחרו בטיפולי האסתטיקה שלנו
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beforeAfterResults.map((result, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <ImageWithFallback
                      src={result.beforeImage}
                      alt="לפני הטיפול"
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-[#101828] text-white text-xs px-2 py-1 rounded">
                      לפני
                    </div>
                  </div>
                  <div className="relative">
                    <ImageWithFallback
                      src={result.afterImage}
                      alt="אחרי הטיפול"
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-[#905e26] text-white text-xs px-2 py-1 rounded">
                      אחרי
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#101828] mb-2">
                    {result.title}
                  </h3>
                  <p className="text-sm text-[#101828]/70">
                    {result.description}
                  </p>
                  <div className="flex items-center mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-[#905e26] fill-current" />
                    ))}
                    <span className="text-sm text-[#101828]/70 mr-2">מטופלת מרוצה</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-l from-[#905e26] to-[#101828] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            מוכנות להתחיל את המסע ליופי חדש?
          </h2>
          <p className="text-xl mb-8 text-white/80">
            קבעו ייעוץ אישי ללא התחייבות ובואו לגלות איך נוכל לעזור לכן להרגיש יפות וביטחון עצמי
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-[#101828] hover:bg-white/90"
            >
              <Calendar className="ml-2 h-5 w-5" />
              ייעוץ אסתטיקה חינם
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-[#101828]"
            >
              <Phone className="ml-2 h-5 w-5" />
              03-1234567
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}