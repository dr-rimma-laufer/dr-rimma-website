import { 
  CheckCircle, Clock, Microscope, Award, Heart, Shield, Activity, 
  Droplets, Zap, Sparkles, Users, Calendar, Phone, ArrowRight 
} from 'lucide-react';
import prpTreatmentImage from '../assets/1ddb91ad4cad3ffe1727dd3e9dda1124ff85c389_converted.jpg';
import mesotherapyImage from '../assets/881ad7d1767f92cdc6c8eb868e2442a107a155c0_converted.jpg';
import medicationTreatmentImage from '../assets/bc7ce626ca744b6cbb2096a9de29d508602b3faf_converted.jpg';
import lowLevelLaserTreatmentImage from '../assets/c6187059fb58c3bc2ec62f71362f4002baefa4bc_converted.jpg';

export const HAIR_TRANSPLANT_METHODS = [
  {
    title: 'שיטת FUE',
    subtitle: 'ללא חתכים',
    description: 'השתלת שיער בשיטה מתקדמת ללא חתכים, עם החלמה מהירה ותוצאות טבעיות',
    features: ['ללא צלקות', 'החלמה מהירה', 'תוצאות טבעיות'],
    image: 'https://images.unsplash.com/photo-1579684453377-48ec05c6b30a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwdHJhbnNwbGFudCUyMG1lZGljYWwlMjBwcm9jZWR1cmV8ZW58MXx8fHwxNzU0OTMwODk0fDA&ixlib=rb-4.1.0&q=80&w=400',
    color: 'border-[#101828]-200'
  },
  {
    title: 'שיטת FUT', 
    subtitle: 'רצועת שיער',
    description: 'השתלה המאפשרת להשיג כמות גדולה של זקיקי שיער בהליך אחד',
    features: ['כמות גדולה', 'יעילות גבוהה', 'תוצאות מוכחות'],
    image: 'https://images.unsplash.com/photo-1665231795856-769fb08a90bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGFpciUyMHRyZWF0bWVudCUyMGNsaW5pY3xlbnwxfHx8fDE3NTQ5MzA1MTd8MA&ixlib=rb-4.1.0&q=80&w=400',
    color: 'border-[#101828]-200'
  },
  {
    title: 'DHI (Direct Hair Implantation)',
    subtitle: 'השתלה ישירה',
    description: 'טכניקה מתקדמת ביותר עם עט השתלה מיוחד לדיוק ויעילות מקסימליים',
    features: ['דיוק מקסימלי', 'זמן ריפוי קצר', 'צפיפות מירבית'],
    image: 'https://images.unsplash.com/photo-1579684288402-e3e337bcc7af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwbGFzZXIlMjB0aGVyYXB5fGVufDF8fHx8MTc1NDkzMDg5OHww&ixlib=rb-4.1.0&q=80&w=400',
    color: 'border-[#101828]-200'
  }
];

export const CONSERVATIVE_TREATMENTS = [
  {
    title: 'PRP לשיער',
    subtitle: 'פלזמה עשירה בטסיות דם',
    description: 'טיפול טבעי המשתמש בפלזמה מהדם שלכם לעידוד צמיחת שיער חדש וחיזוק השיער הקיים',
    features: ['טיפול טבעי 100%', 'ללא תופעות לוואי', 'תוצאות מוכחות מדעית'],
    image: prpTreatmentImage,
    color: 'border-[#101828]-200 bg-[#101828]-50',
    duration: '45 דקות',
    sessions: '3-6 טיפולים',
    results: '3-6 חודשים'
  },
  {
    title: 'מזותרפיה לשיער',
    subtitle: 'זריקות ויטמינים ומינרלים',
    description: 'הזרקת קוקטייל ויטמינים, מינרלים וחומצות אמינו ישירות לקרקפת לחיזוק השיער',
    features: ['הזנה ישירה לזקיקים', 'חיזוק השיער', 'עצירת נשירה'],
    image: mesotherapyImage,
    color: 'border-[#101828]-200 bg-[#101828]-50',
    duration: '30 דקות',
    sessions: '4-8 טיפולים',
    results: '2-4 חודשים'
  },
  {
    title: 'טיפול תרופתי לשיער',
    subtitle: 'תרופות וכדורים מתקדמים',
    description: 'טיפול רפואי מקיף עם תרופות מאושרות ומוכחות מדעית לעצירת נשירה וחיזוק השיער',
    features: ['מוכח מדעית', 'תוצאות ארוכות טווח', 'פתרון רפואי מקיף'],
    image: medicationTreatmentImage,
    color: 'border-[#101828]-200 bg-[#101828]-50',
    duration: '10 דקות',
    sessions: 'טיפול יומי',
    results: '6-12 חודשים'
  },
  {
    title: 'טיפול לייזר רך' ,
    subtitle: 'לייזר רך לעידוד צמיחה',
    description: 'טכנולוגיית לייזר רך המעוררת את זקיקי השיער ומשפרת את זרימת הדם בקרקפת',
    features: ['ללא כאב', 'אין זמן החלמה', 'מתאים לכל סוגי העור'],
    image: lowLevelLaserTreatmentImage,
    color: 'border-[#101828]-200 bg-[#101828]-50',
    duration: '20 דקות',
    sessions: '10-15 טיפולים',
    results: '4-8 חודשים'
  }
];

export const AESTHETIC_TREATMENTS = [
  {
    title: 'חידוש העור',
    subtitle: 'טיפולי אנטי אייג\'ינג',
    description: 'טיפולים מתקדמים להחייאת העור, מתיחת פנים ללא ניתוח והקטנת קמטים',
    features: ['חידוש העור', 'מתיחת פנים', 'טיפול בקמטים'],
    image: 'https://images.unsplash.com/photo-1519668963014-2308b08e5e9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBmYWNpYWwlMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzU0OTMwOTk3fDA&ixlib=rb-4.1.0&q=80&w=400',
    color: 'border-pink-200 bg-pink-50'
  },
  {
    title: 'טיפולי בוטוקס',
    subtitle: 'הזרקות מקצועיות',
    description: 'הזרקות בוטוקס מדויקות לחלקת קמטים וקווי הבעה באזור הפנים',
    features: ['תוצאות מיידיות', 'טיפול בטוח', 'מראה טבעי'],
    image: 'https://images.unsplash.com/photo-1745336670683-3b5586cb5f19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RveCUyMGluamVjdGlvbiUyMG1lZGljYWx8ZW58MXx8fHwxNzU0OTMxMDAyfDA&ixlib=rb-4.1.0&q=80&w=400',
    color: 'border-blue-200 bg-blue-50'
  },
  {
    title: 'מילוי קמטים',
    subtitle: 'חומצה היאלורונית',
    description: 'מילוי קמטים ונפח לפנים עם חומצה היאלורונית איכותית',
    features: ['תוצאות טבעיות', 'ללא זמן החלמה', 'ביטחון גבוה'],
    image: 'https://images.unsplash.com/photo-1629451565902-4c40a51b374e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBtZWRpY2FsJTIwdHJlYXRtZW50fGVufDF8fHx8MTc1NDkzMDU1Nnww&ixlib=rb-4.1.0&q=80&w=400',
    color: 'border-green-200 bg-green-50'
  }
];

export const TREATMENT_PROCESS_STEPS = [
  {
    step: 1,
    title: 'ייעוץ וברור רפואי',
    description: 'בדיקה מקיפה והערכת האזורים הדורשים טיפול',
    icon: Microscope
  },
  {
    step: 2,
    title: 'תכנון הטיפול',
    description: 'עיצוב קו השיער ותכנון מיקום הזקיקים',
    icon: Award
  },
  {
    step: 3,
    title: 'הליך ההשתלה',
    description: 'ביצוע ההשתלה בטכניקה המתאימה ביותר',
    icon: Heart
  },
  {
    step: 4,
    title: 'מעקב ושירות',
    description: 'מעקב רפואי ותמיכה לאורך תהליך ההחלמה',
    icon: Shield
  }
];

export const CONSERVATIVE_TREATMENT_PROCESS = [
  {
    step: 1,
    title: 'אבחון מקיף',
    description: 'בדיקת קרקפת מתקדמת והערכת מצב השיער',
    icon: Activity
  },
  {
    step: 2,
    title: 'תכנון טיפול',
    description: 'בחירת הטיפול המתאים ותכנון לוח זמנים',
    icon: Heart
  },
  {
    step: 3,
    title: 'ביצוע הטיפול',
    description: 'טיפול מקצועי בטכנולוגיה מתקדמת',
    icon: Zap
  },
  {
    step: 4,
    title: 'מעקב ותוצאות',
    description: 'מעקב אחר התקדמות וההתאמות הנדרשות',
    icon: Shield
  }
];