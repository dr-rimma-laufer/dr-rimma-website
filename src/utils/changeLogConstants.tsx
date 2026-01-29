/**
 * Change Log System Constants and Types
 * מערכת ניהול שינויים לאתר ד"ר רימה לאופר
 */

export type ChangeType = 
  | 'create' 
  | 'update' 
  | 'delete' 
  | 'backup' 
  | 'restore' 
  | 'migration' 
  | 'bulk_operation' 
  | 'system_config';

export type ContentType = 
  | 'blog_post' 
  | 'faq' 
  | 'gallery_image' 
  | 'treatment' 
  | 'review' 
  | 'contact_submission' 
  | 'settings' 
  | 'user' 
  | 'system';

export interface ChangeLogEntry {
  id: string;
  timestamp: string;
  changeType: ChangeType;
  contentType: ContentType;
  contentId: string;
  title: string;
  description: string;
  userId?: string;
  userEmail?: string;
  previousVersion?: any;
  newVersion?: any;
  tags?: string[];
  affectedItems?: number;
  metadata?: Record<string, any>;
}

export interface BackupEntry {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  contentType: ContentType;
  originalId: string;
  backupData: any;
  changeLogId: string;
  userId?: string;
  userEmail?: string;
  expiresAt?: string;
  tags?: string[];
}

export interface SystemSnapshot {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  totalItems: number;
  blogPosts: number;
  faqs: number;
  gallery: number;
  treatments: number;
  reviews: number;
  contacts: number;
  settings: any;
  userId?: string;
  userEmail?: string;
  fileSize?: number;
  compressed?: boolean;
}

export const CHANGE_LOG_PREFIXES = {
  CHANGE_LOG: 'changelog_',
  BACKUP: 'backup_',
  SNAPSHOT: 'snapshot_',
} as const;

export const CHANGE_MESSAGES = {
  // Blog Posts
  BLOG_POST_CREATED: 'פוסט בלוג חדש נוצר',
  BLOG_POST_UPDATED: 'פוסט בלוג עודכן',
  BLOG_POST_DELETED: 'פוסט בלוג נמחק',
  BLOG_POST_RESTORED: 'פוסט בלוג שוחזר',

  // FAQs
  FAQ_CREATED: 'שאלה נפוצה חדשה נוצרה',
  FAQ_UPDATED: 'שאלה נפוצה עודכנה',
  FAQ_DELETED: 'שאלה נפוצה נמחקה',
  FAQ_RESTORED: 'שאלה נפוצה שוחזרה',

  // Gallery
  GALLERY_IMAGE_CREATED: 'תמונה חדשה נוספה לגלריה',
  GALLERY_IMAGE_UPDATED: 'תמונה בגלריה עודכנה',
  GALLERY_IMAGE_DELETED: 'תמונה נמחקה מהגלריה',
  GALLERY_IMAGE_RESTORED: 'תמונה בגלריה שוחזרה',

  // Treatments
  TREATMENT_CREATED: 'טיפול חדש נוצר',
  TREATMENT_UPDATED: 'טיפול עודכן',
  TREATMENT_DELETED: 'טיפול נמחק',
  TREATMENT_RESTORED: 'טיפול שוחזר',

  // Reviews
  REVIEW_CREATED: 'המלצה חדשה נוצרה',
  REVIEW_UPDATED: 'המלצה עודכנה',
  REVIEW_DELETED: 'המלצה נמחקה',
  REVIEW_RESTORED: 'המלצה שוחזרה',

  // Contact Submissions
  CONTACT_RECEIVED: 'פנייה חדשה התקבלה',
  CONTACT_UPDATED: 'פנייה עודכנה',
  CONTACT_DELETED: 'פנייה נמחקה',

  // Settings
  SETTINGS_UPDATED: 'הגדרות האתר עודכנו',
  SETTINGS_RESTORED: 'הגדרות האתר שוחזרו',

  // System Operations
  BACKUP_CREATED: 'גיבוי נוצר',
  BACKUP_RESTORED: 'גיבוי שוחזר',
  SNAPSHOT_CREATED: 'תמונת מצב נוצרה',
  SNAPSHOT_RESTORED: 'תמונת מצב שוחזרה',
  BULK_OPERATION: 'פעולה קבוצתית בוצעה',
  MIGRATION_COMPLETED: 'העברת נתונים הושלמה',
  SYSTEM_INITIALIZED: 'המערכת אותחלה',
  
  // User Management
  USER_CREATED: 'משתמש חדש נוצר',
  USER_UPDATED: 'משתמש עודכן',
  USER_DELETED: 'משתמש נמחק',
} as const;

export const CHANGE_TYPE_COLORS = {
  create: '#22c55e', // ירוק - יצירה
  update: '#3b82f6', // כחול - עדכון
  delete: '#ef4444', // אדום - מחיקה
  backup: '#f59e0b', // כתום - גיבוי
  restore: '#8b5cf6', // סגול - שחזור
  migration: '#06b6d4', // ציאן - העברה
  bulk_operation: '#6366f1', // אינדיגו - פעולה קבוצתית
  system_config: '#64748b', // אפור - הגדרות מערכת
} as const;

export const CONTENT_TYPE_ICONS = {
  blog_post: '📄',
  faq: '❓',
  gallery_image: '🖼️',
  treatment: '💊',
  review: '⭐',
  contact_submission: '📧',
  settings: '⚙️',
  user: '👤',
  system: '🔧',
} as const;

export const CHANGE_TYPE_LABELS = {
  create: 'יצירה',
  update: 'עדכון',
  delete: 'מחיקה',
  backup: 'גיבוי',
  restore: 'שחזור',
  migration: 'העברה',
  bulk_operation: 'פעולה קבוצתית',
  system_config: 'הגדרות מערכת',
} as const;

export const CONTENT_TYPE_LABELS = {
  blog_post: 'פוסט בלוג',
  faq: 'שאלה נפוצה',
  gallery_image: 'תמונת גלריה',
  treatment: 'טיפול',
  review: 'המלצה',
  contact_submission: 'פנייה',
  settings: 'הגדרות',
  user: 'משתמש',
  system: 'מערכת',
} as const;

// Backup retention settings
export const BACKUP_RETENTION = {
  DEFAULT_RETENTION_DAYS: 30,
  MAX_BACKUPS_PER_ITEM: 10,
  SNAPSHOT_RETENTION_DAYS: 90,
  MAX_SNAPSHOTS: 20,
} as const;

// Change log pagination and filtering
export const CHANGE_LOG_SETTINGS = {
  DEFAULT_PAGE_SIZE: 25,
  MAX_PAGE_SIZE: 100,
  SEARCH_DEBOUNCE_MS: 300,
} as const;