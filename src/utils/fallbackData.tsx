// נתוני Fallback למקרה שהבקאנד לא פועל
export const fallbackBlogPosts = [
  {
    id: 'fallback_post_1',
    title: 'השתלת שיער - מדריך מקצועי מקיף',
    excerpt: 'כל מה שאתם צריכים לדעת על השתלת שיער בטכניקות המתקדמות ביותר בישראל',
    content: `
      <h2>השתלת שיער - מדריך מקצועי מקיף</h2>
      <p>השתלת שיער היא פתרון קבוע ויעיל לטיפול בהתקרחות והדלת שיער. בקליניקה שלנו, אנו מתמחים בטכניקות המתקדמות ביותר.</p>
      
      <h3>הטכניקות העיקריות:</h3>
      <ol>
        <li>טכניקת FUE - השתלה יחידתית ללא חתכים</li>
        <li>טכניקת DHI - השתלה ישירה עם עט השתלה</li>
        <li>טכניקת Sapphire - שימוש בכלים מספיר מתקדמים</li>
      </ol>
      
      <h3>יתרונות השתלת שיער:</h3>
      <ul>
        <li>תוצאות טבעיות ולצמיתות</li>
        <li>השתלה במינימום כאב</li>
        <li>החלמה מהירה וקלה</li>
        <li>ללא צלקות נראות לעין</li>
      </ul>
      
      <p>התייעצו איתנו לקביעת התוכנית הטיפולית המתאימה עבורכם!</p>
    `,
    category: 'השתלת שיער',
    author: 'ד"ר רימה לאופר',
    readTime: '8 דקות קריאה',
    views: 245,
    featured: true,
    image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&h=450&fit=crop',
    tags: ['השתלת שיער', 'FUE', 'DHI', 'טיפולים מתקדמים'],
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'published'
  },
  {
    id: 'fallback_post_2',
    title: 'טיפולי אסתטיקה רפואית מתקדמים',
    excerpt: 'גלו את מגוון הטיפולים האסתטיים החדשניים שאנו מציעים בקליניקה המובילה',
    content: `
      <h2>טיפולי אסתטיקה רפואית מתקדמים</h2>
      <p>טיפולי אסתטיקה רפואית מציעים פתרונות מתקדמים לשיפור המראה החיצוני בצורה בטוחה ויעילה.</p>
      
      <h3>הטיפולים שאנו מציעים:</h3>
      <ol>
        <li>מילוי קמטים בחומצה היאלורונית</li>
        <li>בוטוקס רפואי לחידוד פרצוף</li>
        <li>טיפולי לייזר לחידוש העור</li>
        <li>הידוק עור בטכנולוגיות מתקדמות</li>
      </ol>
      
      <p>כל טיפול מותאם אישית ומבוצע בסביבה סטרילית ומקצועית.</p>
    `,
    category: 'אסתטיקה רפואית',
    author: 'ד"ר רימה לאופר',
    readTime: '6 דקות קריאה',
    views: 180,
    featured: false,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=450&fit=crop',
    tags: ['אסתטיקה', 'בוטוקס', 'מילויים', 'לייזר'],
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'published'
  },
  {
    id: 'fallback_post_3',
    title: 'התקרחות לא צלקתית - סיבות וטיפולים',
    excerpt: 'מדריך מקיף להבנת סוגי ההתקרחות השונים ואפשרויות הטיפול המתקדמות הקיימות',
    content: `
      <h2>התקרחות לא צלקתית - מדריך מקיף</h2>
      <p>התקרחות לא צלקתית היא המצב הנפוץ ביותר של איבוד שיער, והיא כוללת מספר סוגים שונים.</p>
      
      <h3>הסוגים העיקריים של ההתקרחות לא צלקתית:</h3>
      <ol>
        <li>התקרחות אנדרוגנטית (התקרחות זכרית ונשית)</li>
        <li>אלופציה אראטה (התקרחות מקומית)</li>
        <li>איבוד שיער טלוגני</li>
        <li>התקרחות עקב לחץ ומתח</li>
        <li>התקרחות הורמונלית</li>
      </ol>
      
      <h3>אפשרויות טיפול זמינות:</h3>
      <ul>
        <li>טיפולים תרופתיים מקומיים ומערכתיים</li>
        <li>השתלת שיער בטכניקות מתקדמות</li>
        <li>טיפולי PRP (פלסמה עשירה בטסיות)</li>
        <li>טיפולי לייזר לעיכוב איבוד השיער</li>
        <li>טיפולי מיקרו-נידלינג</li>
      </ul>
      
      <p>חשוב לקבל אבחנה מדויקת ולהתחיל בטיפול בהקדם. פנו אלינו לייעוץ מקצועי ואישי.</p>
    `,
    category: 'התקרחות וטיפולים',
    author: 'ד"ר רימה לאופר',
    readTime: '10 דקות קריאה',
    views: 320,
    featured: true,
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=450&fit=crop',
    tags: ['התקרחות', 'אלופציה', 'PRP', 'טיפולים מקצועיים'],
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'published'
  }
];

export const fallbackFAQs = [
  {
    id: 'fallback_faq_1',
    question: 'כמה זמן לוקח טיפול השתלת שיער?',
    answer: 'טיפול השתלת שיער לוקח בדרך כלל בין 6-8 שעות, תלוי בכמות הזקיקים הנדרשת להשתלה. הטיפול מתבצע ביום אחד ואינו מצריך אשפוז.',
    category: 'השתלת שיער',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'fallback_faq_2',
    question: 'האם השתלת שיער כואבת?',
    answer: 'הטיפול מבוצע בהרדמה מקומית, כך שלא מרגישים כאב במהלך הפרוצדורה. לאחר הטיפול יכול להיות אי נוחות קלה שחולפת תוך מספר ימים.',
    category: 'השתלת שיער',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'fallback_faq_3',
    question: 'מתי רואים תוצאות של השתלת שיער?',
    answer: 'תוצאות ראשוניות נראות לאחר 3-4 חודשים, והתוצאות הסופיות מתבססות לאחר 10-12 חודשים. השיער החדש צומח באופן הדרגתי וטבעי.',
    category: 'השתלת שיער',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'fallback_faq_4',
    question: 'מה ההבדל בין טכניקת FUE ל-DHI?',
    answer: 'טכניקת FUE כוללת הוצאת זקיקים בודדים וחתירת תעלות לפני השתלה. DHI מאפשרת השתלה ישירה עם עט מיוחד ללא צורך בחתירת תעלות מראש.',
    category: 'טכניקות השתלה',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'fallback_faq_5',
    question: 'מה זה טיפול PRP לשיער?',
    answer: 'PRP (פלסמה עשירה בטסיות) הוא טיפול שמשתמש בתאי הדם של המטופל עצמו כדי לעורר צמיחת שיער חדש ולחזק את השיער הקיים.',
    category: 'טיפולי שיער',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const fallbackReviews = [
  {
    id: 'fallback_review_1',
    name: 'אמיר כהן',
    rating: 5,
    comment: 'חוויה מדהימה! ד"ר לאופר היא מקצועית מעולה והתוצאות מעבר לציפיות. הטיפול היה נוח והשירות מושלם.',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    treatment: 'השתלת שיער FUE',
    createdAt: new Date().toISOString()
  },
  {
    id: 'fallback_review_2',
    name: 'שרה לוי',
    rating: 5,
    comment: 'מרוצה מאוד מהטיפול! הצוות מקצועי ואכפתי, והתוצאות טבעיות ויפות. ממליצה בחום!',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    treatment: 'אסתטיקה רפואית',
    createdAt: new Date().toISOString()
  },
  {
    id: 'fallback_review_3',
    name: 'דוד מזרחי',
    rating: 5,
    comment: 'טיפול מעולה עם תוצאות מרשימות. ד"ר לאופר מקצועית ברמה הגבוהה ביותר. תודה רבה!',
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    treatment: 'טיפול PRP',
    createdAt: new Date().toISOString()
  }
];

export const fallbackSettings = {
  siteName: 'ד"ר רימה לאופר - מומחית השתלות שיער ואסתטיקה רפואית',
  contactPhone: '03-1234567',
  contactEmail: 'info@dr-rima.co.il',
  address: 'רחוב הרצל 123, תל אביב',
  workingHours: 'א׳-ה׳ 9:00-17:00, ו׳ 9:00-13:00',
  description: 'קליניקה מובילה להשתלות שיער וטיפולי אסתטיקה רפואית בישראל',
  keywords: 'השתלת שיער, אסתטיקה רפואית, דר רימה לאופר, FUE, DHI, טיפולי שיער',
  updatedAt: new Date().toISOString()
};

// פונקציה שמחזירה נתוני fallback במבנה הצפוי
export const getFallbackData = () => ({
  blogPosts: { posts: fallbackBlogPosts },
  faqs: { faqs: fallbackFAQs },
  reviews: { reviews: fallbackReviews },
  settings: { settings: fallbackSettings }
});

// בדיקה אם צריך להשתמש במצב fallback - הרחבה לכל שגיאות הרשת הרלוונטיות
export const shouldUseFallbackData = (error: Error | null): boolean => {
  if (!error) return false;
  
  const errorMessage = error.message || '';
  
  // שגיאות רשת וחיבור שמצדיקות fallback
  const networkErrors = [
    'EDGE_FUNCTION_NOT_DEPLOYED',
    'NETWORK_ERROR',
    'NETWORK_OFFLINE', 
    'REQUEST_TIMEOUT',
    'CORS_ERROR',
    'AUTHENTICATION_ERROR',
    'SERVER_ERROR',
    'HTTP_ERROR',
    'Failed to fetch',
    'Backend services unavailable',
    'TypeError: Failed to fetch',
    'NetworkError',
    'TypeError',
    'AbortError'
  ];
  
  // אם יש גישה לאינטרנט אבל השרת לא עונה - השתמש ב-fallback
  const hasInternetButServerDown = navigator.onLine && 
    (errorMessage.includes('Failed to fetch') || 
     errorMessage.includes('NETWORK_ERROR') ||
     errorMessage.includes('REQUEST_TIMEOUT'));
  
  return hasInternetButServerDown || 
         networkErrors.some(errorType => errorMessage.includes(errorType));
};