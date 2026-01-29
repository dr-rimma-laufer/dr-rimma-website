'use client';
import React, { useState } from 'react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import mobileImage from '../../../assets/3e7b7fca7daae1bd9c71084cd5385bb5e8f57f46_converted.jpg';
import desktopImage from '../../../assets/ed4e0da4e8395fe3aa5c7c0204bb392845f22a40_converted.jpg';

interface HairTransplanFaqPageProps {
  onNavigate?: (page: string) => void;
}

export function HairTransplanFaqPage({ onNavigate }: HairTransplanFaqPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState(new Set());

  // Q&A data organized by categories
  const faqCategories = [
    {
      category: "לפני הניתוח",
      questions: [
        {
          id: 1,
          question: "מי מתאים להשתלת שיער?",
          answer: "המועמד המתאים הוא מי שיש לו אזור תורם יציב ובריא (לרוב העורף), ושנשירת השיער אינה פעילה בצורה מהירה. בפגישת הייעוץ, ד\"ר רימה מבצעת אבחון מקיף הכולל בדיקה קלינית ודרמוסקופית, על מנת להעריך התאמה ולהגדיר ציפיות ריאליות לתוצאה.",
          keywords: "מתאים מועמד אזור תורם עורף נשירה ייעוץ אבחון"
        },
        {
          id: 2,
          question: "באילו סוגי נשירה ניתן לטפל באמצעות השתלה?",
          answer: "השתלה מתאימה בעיקר לנשירה אנדרוגנטית (תורשתית). במקרים של מחלות דלקתיות או אוטואימוניות בקרקפת, יש צורך קודם לייצב את המצב בעזרת טיפול רפואי—הליך שמנוהל על ידי ד\"ר רימה באופן אישי.",
          keywords: "נשירה אנדרוגנטית תורשתית דלקתיות אוטואימוניות קרקפת טיפול"
        },
        {
          id: 3,
          question: "האם קיימת מגבלת גיל?",
          answer: "אין גיל מוחלט, אך מומלץ לבצע השתלה כאשר דפוס הנשירה כבר התייצב — לרוב בסוף שנות ה־20.",
          keywords: "גיל מגבלת דפוס נשירה תזמון שנות"
        },
        {
          id: 4,
          question: "מטופלים עם מחלות רקע — האם ניתן לעבור השתלה?",
          answer: "כן, בתנאי שהמחלה מאוזנת. למשל סוכרת מחייבת איזון סוכר תקין והנחיות קדם־ניתוחיות. ההחלטה מתקבלת לאחר הערכה רפואית יסודית עם ד\"ר רימה.",
          keywords: "מחלות רקע סוכרת איזון רפואית הערכה"
        },
        {
          id: 5,
          question: "האם יש צורך לגלח את השיער לפני הניתוח?",
          answer: "ברוב המקרים מומלץ לקצר/לגלח את אזור התורם כדי לאפשר דיוק מקסימלי.",
          keywords: "גילוח קיצור אזור תורם דיוק"
        },
        {
          id: 6,
          question: "האם מדובר בפרוצדורה המכוסה ע\"י ביטוח?",
          answer: "לא. השתלת שיער נחשבת פרוצדורה אסתטית, ולכן התשלום פרטי.",
          keywords: "ביטוח אסתטית פרטי תשלום"
        },
      ]
    },
    {
      category: "מהלך הפרוצדורה",
      questions: [
        {
          id: 8,
          question: "מהי השתלת שיער?",
          answer: "הליך מיקרו־כירורגי שבו זקיקי שיער מועברים מאזור תורם לאזורים דלילים או חסרי שיער. העבודה מתבצעת תחת הגדלה אופטית, בדיוק רב, על מנת לשחזר מראה טבעי והרמוני.",
          keywords: "השתלת שיער מיקרו כירורגי זקיקים אזור תורם טבעי"
        },
        {
          id: 9,
          question: "כמה זמן נמשך הניתוח?",
          answer: "בדרך כלל 6–8 שעות, בהתאם לכמות הזקיקים. במקרים גדולים, יתואם הליך דו־יומי. לאורך כל ההליך ד\"ר רימה נוכחת ומפקחת באופן מלא.",
          keywords: "זמן משך ניתוח שעות זקיקים"
        },
        {
          id: 10,
          question: "האם ההליך כואב?",
          answer: "מבצעים הרדמה מקומית. מרבית המטופלים חשים אי־נוחות קלה בלבד בתחילת ההרדמה. לאחר מכן אין כאב במהלך העבודה.",
          keywords: "כאב הרדמה מקומית אי נוחות"
        },
        {
          id: 11,
          question: "האם נשארות צלקות?",
          answer: "בטכניקת FUE נותרות נקודות מיקרוסקופיות זעירות באזור התורם, אשר אינן נראות לעין לאחר ההחלמה.",
          keywords: "צלקות FUE נקודות מיקרוסקופיות החלמה"
        },
        {
          id: 12,
          question: "האם התוצאה נראית טבעית?",
          answer: "בהחלט — כאשר יש תכנון מדויק של זווית הצמיחה, צפיפות וקו שיער מותאם לפנים. אחד ממרכיבי החתימה של ד\"ר רימה הוא קו שיער רך, הרמוני ומאוזן עם מבנה הפנים.",
          keywords: "טבעי תוצאה תכנון זווית צפיפות קו שיער"
        },
        {
          id: 13,
          question: "האם מדובר בטיפול חד־פעמי?",
          answer: "תלוי בדפוס הנשירה ושלב ההתפתחות העתידי שלה. בפגישת הייעוץ ד\"ר רימה תתווה תכנית לטווח ארוך — כולל מניעה, שימור והשלמות במידת הצורך.",
          keywords: "טיפול חד פעמי תכנית ארוך טווח מניעה"
        }
      ]
    },
    {
      category: "לאחר הניתוח — החלמה וטיפול",
      questions: [
        {
          id: 14,
          question: "כמה זמן נמשכת ההחלמה?",
          answer: "חזרה לשגרה קלה תוך יומיים־שלושה. החלמה מלאה של האזור לרוב תוך 7–10 ימים.",
          keywords: "החלמה זמן ימים שגרה"
        },
        {
          id: 15,
          question: "האם יש צורך בתרופות לאחר ההשתלה?",
          answer: "יינתנו הנחיות ברורות לשטיפה נכונה, שמירה על היגיינת האזור, וטיפול מניעתי. במידת הצורך — גם תמיכה לשיפור צמיחת השיער. ד\"ר רימה מלווה באופן אישי בכל שלבי ההחלמה.",
          keywords: "תרופות הנחיות שטיפה היגיינה טיפול מניעתי"
        },
        {
          id: 16,
          question: "מדוע השיער המושתל נושר לאחר מספר שבועות?",
          answer: "זהו שלב טבעי שנקרא \"נשירת הלם\". השיער נושר — אך הזקיק נשאר חי. הצמיחה המחודשת מתחילה סביב חודש 3–4.",
          keywords: "נשירה נשירת הלם שבועות זקיק צמיחה"
        },
        {
          id: 17,
          question: "מתי רואים תוצאות מלאות?",
          answer: "תוצאה ראשונית סביב חודש 4–6. תוצאה מלאה סופית סביב 9–12 חודשים.",
          keywords: "תוצאות מלאות חודשים"
        },
        {
          id: 18,
          question: "פעילות גופנית לאחר השתלה",
          answer: "מומלץ להימנע ממאמץ, חום וסאונה כשבועיים. הדבר מבטיח איחוי נכון ושמירה על הזקיקים.",
          keywords: "פעילות גופנית מאמץ חום סאונה איחוי"
        },
        {
          id: 19,
          question: "עישון ואלכוהול",
          answer: "רצוי להימנע בתקופת ההחלמה — הם עלולים לפגוע בזרימת הדם ובהתאוששות הרקמה.",
          keywords: "עישון אלכוהול החלמה זרימת דם רקמה"
        },
        {
          id: 20,
          question: "כיצד לישון בימים הראשונים?",
          answer: "שינה בתנוחה מוגבהת, עם כרית תומכת, כדי להפחית נפיחות ולמנוע לחץ על האזור.",
          keywords: "שינה תנוחה מוגבהת כרית נפיחות"
        }
      ]
    }
  ];

  // Flatten all questions for filtering
  const allQuestions = faqCategories.flatMap(cat => 
    cat.questions.map(q => ({ ...q, category: cat.category }))
  );

  // Filter questions based on search term
  const filteredQuestions = allQuestions.filter(item => {
    const term = searchTerm.toLowerCase();
    return item.keywords.toLowerCase().includes(term) ||
           item.question.toLowerCase().includes(term) ||
           item.answer.toLowerCase().includes(term) ||
           term === '';
  });

  // Group filtered questions by category
  const filteredByCategory = faqCategories.map(cat => ({
    category: cat.category,
    questions: cat.questions.filter(q => 
      filteredQuestions.some(fq => fq.id === q.id)
    )
  })).filter(cat => cat.questions.length > 0);

  // Toggle accordion item
  const toggleAccordion = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div style={{ 
      width: '100%', 
      margin: '0', 
      padding: '0',
      background: 'transparent',
      minHeight: '100vh',
      fontFamily: "'Open Sans Condensed', 'Assistant', sans-serif",
      direction: 'rtl'
    }}>
      
      {/* Mobile Layout */}
      <div className="lg:hidden w-full min-h-screen bg-white">
        <div className="w-full min-h-screen flex flex-col pt-8 px-4">
          <h2 className="text-4xl font-bold text-center text-dark-blue mb-8">שאלות נפוצות על השתלת שיער</h2>
          
          {/* תמונה במובייל */}
          <div className="w-full mb-8 flex items-center justify-center">
            <div className="w-full max-w-md h-80">
              <ImageWithFallback
                src={desktopImage}
                alt="שאלות נפוצות על השתלת שיער"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>

          <div className="w-full mb-8">
            <input
              type="text"
              className="w-full px-6 py-4 text-lg border-2 border-dark-blue/30 rounded-xl bg-white backdrop-blur-sm focus:outline-none focus:border-dark-blue transition-all duration-300 placeholder-dark-blue/60"
              placeholder="חפש שאלות נפוצות..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full space-y-8 pb-8">
            {filteredByCategory.map((category, catIndex) => (
              <div key={catIndex} className="w-full">
                {/* כותרת קטגוריה */}
                <div 
                  className="treatment-summary-gradient relative overflow-hidden border border-gray-800/20 mb-6"
                  style={{
                    borderRadius: '12px',
                    padding: '16px 20px',
                    margin: '0 auto 24px auto',
                    maxWidth: '100%',
                    width: '100%',
                    position: 'relative',
                    transition: 'all 0.8s ease-out',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* רקע מסתובב ונע */}
                  <div 
                    className="rotating-bg"
                    style={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: `
                        radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 20% 70%, rgba(255, 255, 255, 0.12) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.3) 0%, transparent 70%)
                      `,
                      pointerEvents: 'none',
                      animation: 'rotate 15s linear infinite',
                    }}
                  />
                  
                  {/* רקע נוסף עם אפקט גלים */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: `
                        linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.08) 50%, transparent 70%)
                      `,
                      transform: 'translateX(-100%)',
                      animation: 'shine 6s ease-in-out infinite',
                      pointerEvents: 'none',
                    }}
                  />

                  <h3 
                    className="text-2xl font-bold text-white"
                    style={{ 
                      position: 'relative', 
                      zIndex: 1,
                      textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {category.category}
                  </h3>
                </div>
                
                {/* שאלות בקטגוריה */}
                <div className="space-y-4">
                  {category.questions.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-dark-blue/20 overflow-hidden transition-all duration-300 hover:shadow-xl"
                    >
                      <button
                        className={`w-full text-right px-6 py-5 flex justify-between items-center transition-all duration-300 ${
                          expandedItems.has(item.id) 
                            ? 'bg-dark-blue text-white' 
                            : 'bg-white/95 text-dark-blue hover:bg-dark-blue/10'
                        }`}
                        onClick={() => toggleAccordion(item.id)}
                      >
                        <span className="font-semibold text-lg">{item.question}</span>
                        <span className={`transform transition-transform duration-300 ${
                          expandedItems.has(item.id) ? 'rotate-180' : ''
                        }`}>
                          ▼
                        </span>
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-300 ${
                        expandedItems.has(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="px-6 py-5 bg-white/90 text-dark-blue border-t border-dark-blue/20">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {filteredQuestions.length === 0 && searchTerm && (
              <div className="text-center py-16 text-dark-blue/80 bg-gray-50 backdrop-blur-sm rounded-xl border border-dark-blue/20">
                <div className="text-xl mb-2">🔍</div>
                <div>לא נמצאו שאלות המכילות "{searchTerm}". נסה מילות חיפוש אחרות.</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout - חלוקה חדשה */}
      <div className="hidden lg:flex w-full">
        
        {/* חלק ימין - 30% - חלוקה לשניים - קבוע */}
        <div className="w-[30%] h-screen sticky top-0 flex flex-col">
          {/* חלק עליון - כותרת */}
          <div className="h-1/2 bg-dark-blue flex items-center justify-center p-12">
            <div className="text-center">
              <h2 className="text-5xl font-bold text-white leading-tight">
                שאלות נפוצות<br />על השתלת שיער
              </h2>
            </div>
          </div>
          {/* חלק תחתון - תמונה כרקע */}
          <div 
            className="h-1/2 bg-dark-blue flex items-center justify-center"
            style={{
              backgroundImage: `url(${desktopImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
          </div>
        </div>

        {/* חלק שמאל - 70% - FAQ על רקע לבן */}
        <div className="w-[70%] min-h-screen bg-white flex flex-col py-16 px-12">
          
          <div className="w-full max-w-4xl mx-auto">
            <div className="w-full mb-8">
              <input
                type="text"
                className="w-full px-6 py-4 text-lg border-2 border-dark-blue/30 rounded-xl bg-white focus:outline-none focus:border-dark-blue transition-all duration-300 placeholder-dark-blue/60"
                placeholder="חפש שאלות נפוצות..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="w-full space-y-4 pb-8">
              {filteredByCategory.map((category, catIndex) => (
                <div key={catIndex} className="w-full">
                  {/* כותרת קטגוריה */}
                  <div 
                    className="treatment-summary-gradient relative overflow-hidden border border-gray-800/20 mb-3"
                    style={{
                      borderRadius: '12px',
                      padding: '16px 20px',
                      margin: '0 auto 24px auto',
                      maxWidth: '100%',
                      width: '100%',
                      position: 'relative',
                      transition: 'all 0.8s ease-out',
                      textAlign: 'center',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {/* רקע מסתובב ונע */}
                    <div 
                      className="rotating-bg"
                      style={{
                        position: 'absolute',
                        top: '-50%',
                        left: '-50%',
                        width: '200%',
                        height: '200%',
                        background: `
                          radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                          radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
                          radial-gradient(circle at 20% 70%, rgba(255, 255, 255, 0.12) 0%, transparent 50%),
                          radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.3) 0%, transparent 70%)
                        `,
                        pointerEvents: 'none',
                        animation: 'rotate 15s linear infinite',
                      }}
                    />
                    
                    {/* רקע נוסף עם אפקט גלים */}
                    <div 
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: `
                          linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.08) 50%, transparent 70%)
                        `,
                        transform: 'translateX(-100%)',
                        animation: 'shine 6s ease-in-out infinite',
                        pointerEvents: 'none',
                      }}
                    />

                    <h3 
                      className="text-2xl font-bold text-white"
                      style={{ 
                        position: 'relative', 
                        zIndex: 1,
                        textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      {category.category}
                    </h3>
                  </div>
                  
                  {/* שאלות בקטגוריה */}
                  <div className="space-y-2">
                    {category.questions.map((item) => (
                      <div 
                        key={item.id}
                        className="bg-white rounded-xl shadow-lg border border-dark-blue/20 overflow-hidden transition-all duration-300 hover:shadow-xl"
                      >
                        <button
                          className={`w-full text-right px-6 py-5 flex justify-between items-center transition-all duration-300 ${
                            expandedItems.has(item.id) 
                              ? 'bg-dark-blue text-white' 
                              : 'bg-white text-dark-blue hover:bg-dark-blue/10'
                          }`}
                          onClick={() => toggleAccordion(item.id)}
                        >
                          <span className="font-semibold text-lg">{item.question}</span>
                          <span className={`transform transition-transform duration-300 ${
                            expandedItems.has(item.id) ? 'rotate-180' : ''
                          }`}>
                            ▼
                          </span>
                        </button>
                        
                        <div className={`overflow-hidden transition-all duration-300 ${
                          expandedItems.has(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <div className="px-6 py-5 bg-white text-dark-blue border-t border-dark-blue/20">
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {filteredQuestions.length === 0 && searchTerm && (
                <div className="text-center py-16 text-dark-blue/80 bg-gray-50 rounded-xl border border-dark-blue/20">
                  <div className="text-xl mb-2">🔍</div>
                  <div>לא נמצאו שאלות המכילות "{searchTerm}". נסה מילות חיפוש אחרות.</div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
