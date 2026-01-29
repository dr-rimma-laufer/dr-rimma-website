'use client';
import React, { useState, useEffect } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { 
  Search, 
  Filter, 
  HelpCircle, 
  Phone, 
  Mail, 
  Calendar,
  ArrowLeft,
  MessageCircle
} from 'lucide-react';
import { contentAPI } from '../../utils/supabase/client';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQPageProps {
  onNavigate: (page: string) => void;
}

export function FAQPage({ onNavigate }: FAQPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Ensure page starts at top when component mounts
  React.useEffect(() => {
    console.log('📖 FAQ Page mounted - ensuring scroll to top');
    console.log('📍 Current scroll position on FAQ page mount:', window.pageYOffset || document.documentElement.scrollTop);
    
    // Immediate scroll to top on mount
    try {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Additional attempts with delays
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        console.log('📍 Scroll position after first FAQ page scroll attempt:', window.pageYOffset || document.documentElement.scrollTop);
      }, 50);
      
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        console.log('📍 Final scroll position after FAQ page mount:', window.pageYOffset || document.documentElement.scrollTop);
      }, 200);
    } catch (error) {
      console.error('❌ Error scrolling to top on FAQ page mount:', error);
    }
  }, []); // Empty dependency array - runs only on mount

  // Load FAQs from CMS with improved fallback handling
  useEffect(() => {
    const loadFAQs = async () => {
      try {
        console.log('FAQPage - Loading FAQs from CMS...');
        const response = await contentAPI.getFAQs();
        console.log('FAQPage - FAQ response:', response);
        
        if (response && response.faqs && response.faqs.length > 0) {
          setFaqs(response.faqs);
          console.log('FAQPage - Successfully loaded FAQs from CMS');
        } else {
          // Use fallback data if no FAQs found in CMS
          console.log('FAQPage - No FAQs found in CMS, using fallback data');
          setFaqs(fallbackFAQs);
        }
      } catch (error) {
        console.error('FAQPage - Error loading FAQs:', error);
        
        // Check if this requires fallback data
        const { shouldUseFallbackData } = await import('../../utils/fallbackData');
        if (shouldUseFallbackData(error)) {
          console.log('FAQPage - Using fallback FAQs due to server unavailability');
        } else {
          console.log('FAQPage - Unexpected error, using fallback FAQs');
        }
        
        // Use fallback data on any error
        setFaqs(fallbackFAQs);
      } finally {
        setLoading(false);
        
        // Ensure scroll to top after loading completes
        setTimeout(() => {
          console.log('📖 FAQ data loading completed - final scroll to top check');
          const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
          if (currentPosition > 10) {
            console.log('🔄 FAQ page still scrolled after loading, correcting...');
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
          }
        }, 100);
      }
    };

    loadFAQs();
  }, []);

  // Static FAQ data - fallback
  const fallbackFAQs: FAQItem[] = [
          {
            id: '1',
            question: "כמה זמן לוקח תהליך השתלת השיער?",
            answer: "תהליך השתלת השיער בטכניקת FUE לוקח בדרך כלל בין 6-8 שעות, תלוי בהיקף ההשתלה. הטיפול מתבצע תחת הרדמה מקומית ללא כאב. המטופל יכול לחזור לפעילות רגילה תוך מספר ימים. התוצאות הסופיות נראות לאחר 12-15 חודשים.",
            category: "השתלות שיער"
          },
          {
            id: '2',
            question: "האם הטיפולים בטוחים ומאושרים?",
            answer: "כל הטיפולים המוצעים במרפאה מאושרים על ידי משרד הבריאות ועומדים בתקנים הבינלאומיים הגבוהים ביותר. אנו משתמשים אך ורק בציוד מתקדם ובחומרים איכותיים. ד״ר לאופר בעלת הסמכות מקצועיות מהמובילות בתחום ומתעדכנת באופן קבוע בטכנולוגיות החדשות.",
            category: "כללי"
          },
          {
            id: '3',
            question: "מה ההבדל בין טכניקת FUE ל-FUT?",
            answer: "טכניקת FUE מבוססת על הוצאת זקיקי שיער בודדים ללא צורך בחתך או תפירה, מה שמותיר צלקות מינימליות. טכניקת FUT כוללת הוצאת רצועת עור מהחלק האחורי של הראש. FUE מועדפת כיום בשל הפחתת הכאב וזמן ההחלמה הקצר יותר.",
            category: "השתלות שיער"
          },
          {
            id: '4',
            question: "מהם טיפולי PRP ואיך הם עובדים?",
            answer: "PRP (Platelet Rich Plasma) הוא טיפול המבוסס על הזרקת פלזמה עשירה בטסיות דם אל הקרקפת. הטסיות משחררות גורמי גדילה שמחזקים את זקיקי השיער הקיימים ועוזרים לצמיחת שיער חדש. הטיפול טבעי לחלוטין ובטוח, ללא תופעות לוואי.",
            category: "טיפולי שיער"
          },
          {
            id: '5',
            question: "איך מתכוננים לטיפול השתלת שיער?",
            answer: "לפני הטיפול יש להימנע מעישון לפחות שבועיים, להפסיק נטילת תרופות מדללות דם (בהתאם להוראות הרופא), להימנע מאלכוהול 48 שעות לפני ולשטוף היטב את השיער בבוקר הטיפול. במהלך הייעוץ תקבלו הוראות מפורטות.",
            category: "השתלות שיער"
          },
          {
            id: '6',
            question: "מה זה בוטוקס ולאילו אזורים מתאים?",
            answer: "בוטוקס הוא חלבון המשתק זמנית את שרירי הפנים, ובכך מחליק קמטי הבעה. הוא מתאים לטיפול בקמטים בחלק העליון של הפנים - מצח, בין הגבות ורגלי עורב. ההשפעה נמשכת 4-6 חודשים והטיפול בטוח ויעיל.",
            category: "אסתטיקה רפואית"
          },
          {
            id: '7',
            question: "מה ההבדל בין מילוי חומצה היאלורונית לבוטוקס?",
            answer: "בוטוקס משתק שרירים ומונע יצירת קמטי הבעה, בעוד מילוי חומצה היאלורונית מוסיף נפח ומחליק קמטים קיימים. חומצה היאלורונית מתאימה לשפתיים, לחיים וקמטים עמוקים, בעוד בוטוקס לקמטי מצח ועיניים.",
            category: "אסתטיקה רפואית"
          },
          {
            id: '8',
            question: "האם יש תופעות לוואי לטיפולי אסתטיקה?",
            answer: "רוב הטיפולים האסתטיים שלנו בטוחים עם תופעות לוואי מינימליות. ייתכנו נפיחות או חבורות קלות שחולפות תוך מספר ימים. אנו מקפידים על הסבר מפורט של כל התופעות האפשריות במהלך הייעוץ ומספקים הוראות טיפול לאחר הטיפול.",
            category: "אסתטיקה רפואית"
          },
          {
            id: '9',
            question: "מהו הגיל המומלץ להתחיל בטיפולי שיער?",
            answer: "אין גיל קבוע להתחלת טיפולי שיער. הכל תלוי במידת נשירת השיער ובגורמים הגנטיים. חשוב להתחיל בטיפול כשמזהים את תחילת הבעיה - ככל שמתחילים מוקדם יותר, התוצאות טובות יותר. במהלך הייעוץ נעריך את המצב ונמליץ על הטיפול המתאים.",
            category: "טיפולי שיער"
          },
          {
            id: '10',
            question: "מה עלות הטיפולים השונים?",
            answer: "עלות הטיפולים משתנה בהתאם לסוג הטיפול והיקפו. אנו מציעים ייעוץ ראשוני חינם שבו נבחן את המקרה ונציג הצעת מחיר מפורטת. במרפאה שלנו מאמינים בשקיפות מלאה ובהצגת כל העלויות מראש, כולל אפשרויות תשלום נוחות.",
            category: "כללי"
          },
          {
            id: '11',
            question: "איך קובעים תור לטיפול?",
            answer: "ניתן לקבוע תור בכמה דרכים: טלפונית, דרך האתר שלנו או בהודעת WhatsApp. אנו מציעים גמישות בזמנים ומתאמים את התורים לנוחותכם. הייעוץ הראשוני חינם וללא התחייבות, במהלכו נבחן את המקרה ונציע פתרון מותאם אישית.",
            category: "כללי"
          },
          {
            id: '12',
            question: "האם ישנה אחריות על הטיפולים?",
            answer: "אנו עומדים מאחורי איכות הטיפולים שלנו ומספקים מעקב צמוד לאחר כל טיפול. במקרה של השתלת שיער, אנו מספקים אחריות על התוצאה בהתאם לתנאים הרפואיים. במהלך הייעוץ נסביר על התוצאות הצפויות ונתחייב להן.",
            category: "כללי"
          }
        ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white" dir="rtl">
        <Header currentPage="faq" onNavigate={onNavigate} />
        <main className="pt-16 md:pt-18">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-8"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get unique categories
  const categories = [
    { id: "all", name: "כל הקטגוריות", count: faqs.length },
    ...Array.from(new Set(faqs.map(faq => faq.category))).map(cat => ({
      id: cat,
      name: cat,
      count: faqs.filter(faq => faq.category === cat).length
    }))
  ];

  // Filter FAQs
  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });



  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Header currentPage="faq" onNavigate={onNavigate} />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-l from-[#101828] to-[#0a0f1a] text-white pt-16 md:pt-18 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <HelpCircle className="h-16 w-16 text-[#905e26] mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              שאלות נפוצות
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              מצאו תשובות לשאלות הנפוצות ביותר על הטיפולים שלנו
            </p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="space-y-6">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="חפשו במה שמעניין אתכם..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 text-right border-[#101828] focus:ring-[#905e26] focus:border-[#905e26]"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.id)}
                      size="sm"
                      className={`${
                        selectedCategory === category.id
                          ? "bg-[#101828] text-white hover:bg-[#0a0f1a]"
                          : "text-[#101828] border-[#101828] hover:bg-[#101828] hover:text-white"
                      }`}
                    >
                      {category.name}
                      <Badge variant="secondary" className="mr-2 bg-[#905e26] text-white">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredFAQs.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.map((faq, index) => (
                    <AccordionItem key={faq.id} value={`item-${index}`} className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-right hover:no-underline py-6 group">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center space-x-reverse space-x-3">
                            <Badge className="bg-[#905e26] text-white">
                              {faq.category}
                            </Badge>
                          </div>
                          <span className="text-lg font-semibold text-[#101828] text-right group-hover:text-[#905e26] transition-colors">
                            {faq.question}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-right pb-6">
                        <div className="text-gray-700 leading-relaxed text-lg">
                          <div 
                            className="rich-content-display"
                            dangerouslySetInnerHTML={{ __html: faq.answer.includes('<') ? faq.answer : `<p>${faq.answer.split('\n').join('</p><p>')}</p>` }}
                            style={{ 
                              unicodeBidi: 'plaintext',
                              direction: 'inherit',
                              textAlign: 'inherit'
                            }}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">לא נמצאו תוצאות</h3>
                <p className="text-gray-500 mb-6">נסו לשנות את מילות החיפוש או הקטגוריה</p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  variant="outline"
                  className="border-[#101828] text-[#101828] hover:bg-[#101828] hover:text-white"
                >
                  נקה סינון
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-l from-[#101828] to-[#0a0f1a] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">לא מצאתם את מה שחיפשתם?</h2>
            <p className="text-xl text-gray-300 mb-8">
              אנו כאן כדי לענות על כל שאלה ולתת לכם את המידע הכי מדויק
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#905e26] hover:bg-[#7a4e20] text-white"
                onClick={() => onNavigate('#contact')}
              >
                <Calendar className="ml-2 h-5 w-5" />
                קביעת ייעוץ חינם
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#101828]"
              >
                <Phone className="ml-2 h-5 w-5" />
                03-1234567
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#101828]"
              >
                <MessageCircle className="ml-2 h-5 w-5" />
                WhatsApp
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}