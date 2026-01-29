export const CMS_TABS = {
  DASHBOARD: 'dashboard',
  BLOG: 'blog',
  FAQ: 'faq',
  REVIEWS: 'reviews',
  CONTACTS: 'contacts'
} as const;

export const CMS_CONTENT_TYPES = {
  BLOG: 'blog',
  FAQ: 'faq',
  REVIEW: 'review',
  SETTINGS: 'settings'
} as const;

export const CMS_MESSAGES = {
  SUCCESS: {
    BLOG_CREATED: 'פוסט נוצר בהצלחה',
    BLOG_UPDATED: 'פוסט עודכן בהצלחה',
    FAQ_CREATED: 'שאלה נוצרה בהצלחה',
    FAQ_UPDATED: 'שאלה עודכנה בהצלחה',
    REVIEW_CREATED: 'המלצה נוצרה בהצלחה',
    SETTINGS_UPDATED: 'הגדרות עודכנו בהצלחה',
    DELETED: 'נמחק בהצלחה'
  },
  ERROR: {
    LOADING_CONTENT: 'שגיאה בטעינת התוכן',
    SAVING_DATA: 'שגיאה בשמירת הנתונים',
    DELETING: 'שגיאה במחיקה'
  }
} as const;

export const DEFAULT_BLOG_POST = {
  title: '',
  content: '',
  excerpt: '',
  author: 'ד"ר רימה לאופר',
  category: 'השתלות שיער',
  tags: '',
  image: 'https://images.unsplash.com/photo-1665231795856-769fb08a90bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGFpciUyMHRyZWF0bWVudCUyMGNsaW5pY3xlbnwxfHx8fDE3NTQ5MzA1MTd8MA&ixlib=rb-4.1.0&q=80&w=600',
  readTime: '5 דקות קריאה',
  views: 0,
  featured: false,
  createdAt: new Date().toISOString().split('T')[0],
  additionalImages: []
};

export const DEFAULT_FAQ = {
  question: '',
  answer: '',
  category: 'השתלות שיער',
  order: 0
};