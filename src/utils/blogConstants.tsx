export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  createdAt: string;
  author?: string;
  readTime?: string;
  views?: number;
  featured?: boolean;
  additionalImages?: BlogImage[];
  order?: number; // שדה סדר להצגה
}

export interface BlogImage {
  id: string;
  url: string;
  caption: string;
  position: number; // מיקום בטקסט (1-5)
  alt: string;
}

export const fallbackBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: "מדריך מלא להשתלת שיער בטכניקת FUE",
    excerpt: "כל מה שצריך לדעת על הטכניקה המתקדמת ביותר להשתלת שיער - מההכנה ועד התוצאה הסופית",
    content: "טכניקת FUE (Follicular Unit Extraction) היא השיטה המתקדמת ביותר להשתלת שיער כיום. הטכניקה מאפשרת השתלה מדויקת של זקיקי שיער בודדים מהאזור התורם לאזור הקלט, ללא צלקות גלויות.\n\nההליך מתבצע באמצעות מכשיר מיקרוסקופי מתקדם המאפשר דיוק מיקרוני בהוצאת הזקיקים. כל זקיק מוצא בנפרד, תוך שמירה על מבנה הטבעי שלו ועל איכות השיער.\n\nתהליך ההשתלה דורש מומחיות גבוהה וניסיון רב. המטופל עובר הכנה יסודית לפני ההליך, הכוללת בדיקות מקדימות והדרכה מפורטת על התהליך והתאוששות.",
    category: "השתלות שיער",
    tags: ["FUE", "השתלות שיער", "טכניקות מתקדמות"],
    image: "https://images.unsplash.com/photo-1640876777012-bdb00a6323e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGFpciUyMHRyYW5zcGxhbnQlMjBwcm9jZWR1cmUlMjBjbGluaWN8ZW58MXx8fHwxNzU0OTMyMzQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    createdAt: "2024-01-15",
    author: "ד״ר רימה לאופר",
    readTime: "8 דקות קריאה",
    views: 1247,
    featured: true,
    additionalImages: [
      {
        id: "img1_demo",
        url: "https://images.unsplash.com/photo-1518235461080-01779c3c1167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtZWRpY2FsJTIwZmFjaWxpdHklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTQ5MzIzNTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        caption: "ציוד מתקדם להשתלות שיער במרפאה",
        position: 1,
        alt: "ציוד רפואי מתקדם להשתלות שיער"
      },
      {
        id: "img2_demo", 
        url: "https://images.unsplash.com/photo-1626351543430-23d7f5609535?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtZWRpY2FsJTIwZG9jdG9yJTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc1NDkzNDM4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        caption: "תהליך ההשתלה המדויק והמקצועי",
        position: 2,
        alt: "הליך השתלת שיער מקצועי"
      }
    ]
  },
  {
    id: '2',
    title: "יתרונות טיפולי PRP לחיזוק השיער",
    excerpt: "מחקרים מוכיחים: טיפולי PRP יעילים למניעת נשירת שיער ולעידוד צמיחה חדשה",
    content: "טיפולי PRP (Platelet Rich Plasma) הם טיפול טבעי וחדשני לבעיות שיער. הטיפול מבוסס על זריקת פלזמה עשירה בטסיות דם ממנה מופקים גורמי צמיחה טבעיים המעודדים התחדשות זקיקי השיער.\n\nתהליך הטיפול כולל לקיחת דגימת דם מהמטופל, הפרדת הפלזמה העשירה בטסיות באמצעות צנטריפוגה, והזרקתה לאזורים הדורשים טיפול.\n\nהטיפול מתאים במיוחד לבעיות של דילול שיער, נשירה מוקדמת, ולחיזוק זקיקי שיער קיימים. התוצאות נראות בהדרגה במהלך 3-6 חודשים.",
    category: "טיפולי שיער",
    tags: ["PRP", "טיפולי שיער", "טיפול טבעי"],
    image: "https://images.unsplash.com/photo-1599727277757-3f54e54ea618?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwbGFib3JhdG9yeSUyMGJsb29kJTIwdGVzdHxlbnwxfHx8fDE3NTQ5MzIzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    createdAt: "2024-01-10",
    author: "ד״ר רימה לאופר",
    readTime: "5 דקות קריאה",
    views: 892,
    featured: true,
    additionalImages: [
      {
        id: "img1_prp",
        url: "https://images.unsplash.com/photo-1599727277757-3f54e54ea618?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwbGFib3JhdG9yeSUyMGJsb29kJTIwdGVzdHxlbnwxfHx8fDE3NTQ5MzIzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        caption: "הכנת פלזמה עשירה בטסיות דם",
        position: 1,
        alt: "הליך הכנת PRP במעבדה"
      },
      {
        id: "img2_prp",
        url: "https://images.unsplash.com/photo-1626351543430-23d7f5609535?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtZWRpY2FsJTIwZG9jdG9yJTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc1NDkzNDM4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", 
        caption: "יעוץ והדרכה למטופל לפני הטיפול",
        position: 2,
        alt: "ייעוץ רפואי אישי למטופל"
      },
      {
        id: "img3_prp",
        url: "https://images.unsplash.com/photo-1640876777012-bdb00a6323e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGFpciUyMHRyYW5zcGxhbnQlMjBwcm9jZWR1cmUlMjBjbGluaWN8ZW58MXx8fHwxNzU0OTMyMzQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        caption: "תוצאות מרשימות לאחר סדרת טיפולים",
        position: 3,
        alt: "תוצאות הצלחה של טיפולי PRP"
      }
    ]
  },
  {
    id: '3',
    title: "בוטוקס מול מילוי קמטים - מה מתאים לכם?",
    excerpt: "השוואה מקיפה בין שני הטיפולים הפופולריים ביותר באסתטיקה רפואית",
    content: "בחירה בין בוטוקס למילוי קמטים תלויה במטרות הטיפול ובסוג הקמטים. בוטוקס יעיל לטיפול בקמטי הבעה, בעוד מילוי מתאים לקמטים סטטיים ולהוספת נפח.\n\nבוטוקס פועל על ידי הרפיית השרירים הגורמים לקמטי ההבעה, ומתאים במיוחד לאזור המצח, בין הגבות ועל צדי העיניים.\n\nטיפולי מילוי, לעומת זאת, מוסיפים נפח ומחליקים קמטים קיימים. הם מתאימים לשיפור קווי החיוך, הוספת נפח לשפתיים וטיפול בקמטים עמוקים יותר.",
    category: "אסתטיקה רפואית",
    tags: ["בוטוקס", "מילוי קמטים", "אסתטיקה"],
    image: "https://images.unsplash.com/photo-1565594090530-d1ebc05b54b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBtZWRpY2FsJTIwY2xpbmljJTIwZXF1aXBtZW50fGVufDF8fHx8MTc1NDkzMjM0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    createdAt: "2024-01-05",
    author: "ד״ר רימה לאופר",
    readTime: "6 דקות קריאה",
    views: 734,
    featured: true,
    additionalImages: [
      {
        id: "img1_botox",
        url: "https://images.unsplash.com/photo-1622336889416-8d790ad807d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luJTIwY2FyZSUyMHRyZWF0bWVudCUyMGZhY2V8ZW58MXx8fHwxNzU0OTMyMzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        caption: "הזרקות בוטוקס מדויקות לטיפול בקמטי הבעה",
        position: 1,
        alt: "טיפול בוטוקס באזור המצח"
      },
      {
        id: "img2_filler",
        url: "https://images.unsplash.com/photo-1565594090530-d1ebc05b54b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBtZWRpY2FsJTIwY2xpbmljJTIwZXF1aXBtZW50fGVufDF8fHx8MTc1NDkzMjM0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        caption: "ייעוץ מקצועי לבחירת הטיפול המתאים",
        position: 2,
        alt: "ייעוץ לטיפולים אסתטיים"
      }
    ]
  }
];