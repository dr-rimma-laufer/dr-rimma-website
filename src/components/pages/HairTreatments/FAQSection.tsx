'use client';
import React, { useState } from 'react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import desktopImage from '../../../assets/ed4e0da4e8395fe3aa5c7c0204bb392845f22a40_converted.jpg';

// קומפוננטה מקומית לכותרת גרדיאנט - בלתי תלויה
interface LocalGradientHeaderProps {
  title: string;
  className?: string;
}

function LocalGradientHeader({ title, className = '' }: LocalGradientHeaderProps) {
  return (
    <div 
      className={`treatment-summary-gradient relative overflow-hidden border border-gray-800/20 ${className}`}
      style={{
        borderRadius: '12px',
        padding: '20px 24px',
        margin: '0 0 8px 0',
        maxWidth: '1024px',
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


      <h3 
        className="text-2xl font-bold text-white"
        style={{ 
          position: 'relative', 
          zIndex: 1,
          textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.1)'
        }}
      >
        {title}
      </h3>
    </div>
  );
}

export function FAQSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState(new Set());

  // Q&A data organized by categories
  const faqCategories = [
    {
      category: "על הטיפולים השמרניים",
      questions: [
        {
          id: 1,
          question: "מהם טיפולים שמרניים לשיער?",
          answer: "טיפולים שמרניים הם פתרונות רפואיים ללא ניתוח המיועדים להאט נשירת שיער, לחזק את Zackikim השיער הקיימים ולעודד צמיחה. הם כוללים טיפולי PRP, מזותרפיה, לייזר רך ותרופות מקומיות או פומיות.",
          keywords: "טיפולים שמרניים פתרונות רפואיים נשירה חיזוק Zackikim"
        },
        {
          id: 2,
          question: "למי מתאימים הטיפולים השמרניים?",
          answer: "הטיפולים מתאימים לאנשים בשלבים מוקדמים של נשירת שיער, למי שרוצה לשפר איכות ועובי השיער, ולמי שמעוניין במניעה ובשימור השיער הקיים. הם גם משמשים כהשלמה להשתלת שיער.",
          keywords: "מתאימים שלבים מוקדמים איכות עובי מניעה שימור"
        },
        {
          id: 3,
          question: "האם הטיפולים יעילים כמו השתלת שיער?",
          answer: "הטיפולים השמרניים יעילים מאוד בשלבים מוקדמים ובמניעת נשירה נוספת, אך אינם יכולים ליצור שיער באזורים שכבר התקרחו לחלוטין. ההשתלה מתאימה למקרים של נשירה מתקדמת יותר.",
          keywords: "יעילים השתלה שלבים מוקדמים מניעה התקרחות"
        }
      ]
    },
    {
      category: "מהלך הטיפול",
      questions: [
        {
          id: 4,
          question: "כמה זמן נמשך טיפול?",
          answer: "משך הטיפול משתנה בהתאם לסוג: PRP ומזותרפיה נמשכים כ-30-45 דקות, טיפול לייזר רך כ-20 דקות. כל הטיפולים מתבצעים באופן אמבולטורי.",
          keywords: "זמן משך טיפול PRP מזותרפיה לייזר דקות"
        },
        {
          id: 5,
          question: "כמה טיפולים נדרשים?",
          answer: "לרוב נדרשים 3-6 טיפולים ראשוניים במרווחים של 2-4 שבועות, בהתאם למצב ההתחלתי. לאחר מכן, טיפולי תחזוקה כל 3-6 חודשים.",
          keywords: "מספר טיפולים נדרשים מרווחים שבועות תחזוקה"
        },
        {
          id: 6,
          question: "האם הטיפול כואב?",
          answer: "רוב הטיפולים כוללים אי-נוחות קלה בלבד. במזותרפיה ו-PRP ייתכנו תחושות דקירה קלות. ניתן להשתמש בהרדמה מקומית בצורת משחה לפני הטיפול.",
          keywords: "כאב אי נוחות דקירה הרדמה מקומית"
        }
      ]
    },
    {
      category: "תוצאות והחלמה",
      questions: [
        {
          id: 7,
          question: "מתי רואים תוצאות?",
          answer: "תוצאות ראשוניות כמו הפחתת נשירה נראות לרוב אחרי 2-3 טיפולים. שיפור איכותי וצמיחה חדשה מתחילים להיראות אחרי 3-4 חודשים של טיפול סדיר.",
          keywords: "תוצאות מתי זמן הפחתה נשירה צמיחה"
        },
        {
          id: 8,
          question: "כמה זמן נמשכת ההחלמה?",
          answer: "ההחלמה מהירה מאוד - חזרה לשגרה מיידית.ייתכנו אדמומיות או רגישות קלה במקום הטיפול למספר ساعات. ניתן לחזור לעבודה באותו היום.",
          keywords: "החלמה זמן שגרה אדמומיות רגישות עבודה"
        },
        {
          id: 9,
          question: "האם התוצאות קבועות?",
          answer: "הטיפולים השמרניים דורשים המשכיות. התוצאות נשמרות כל עוד ממשיכים בטיפולי תחזוקה. הפסקת הטיפול עלולה להוביל לחזרה הדרגתית של הנשירה.",
          keywords: "קבועות תוצאות המשכיות תחזוקה הפסקה נשירה"
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
          <h2 className="text-4xl font-bold text-center text-dark-blue mb-8">שאלות נפוצות על טיפולי שיער</h2>
          
          {/* תמונה במובייל */}
          <div className="w-full mb-8 flex items-center justify-center">
            <div className="w-full max-w-md h-80">
              <ImageWithFallback
                src={desktopImage}
                alt="שאלות נפוצות על טיפולי שיער"
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
              <div key={catIndex} className="w-full" style={{ padding: '0', margin: '0' }}>
                {/* כותרת קטגוריה */}
                <LocalGradientHeader title={category.category} className="mb-6" />
                
                {/* שאלות בקטגוריה */}
                <div className="space-y-2" style={{ padding: '0 16px' }}>
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
                שאלות נפוצות<br />על טיפולי שיער
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
                  <LocalGradientHeader title={category.category} className="mb-3" />
                  
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