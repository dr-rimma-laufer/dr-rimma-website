// מנהל נתונים לעבודה במצב אופליין
import { fallbackBlogPosts, fallbackFAQs, fallbackReviews, fallbackSettings } from './fallbackData';

interface OfflineDataState {
  blogPosts: any[];
  faqs: any[];
  reviews: any[];
  settings: any;
  lastUpdate: number;
  isOfflineMode: boolean;
}

const OFFLINE_DATA_KEY = 'dr-rima-offline-data';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 שעות

// שמירת נתונים למחסן מקומי
function saveOfflineData(data: Partial<OfflineDataState>): void {
  try {
    const existingData = getOfflineData();
    const updatedData = {
      ...existingData,
      ...data,
      lastUpdate: Date.now()
    };
    localStorage.setItem(OFFLINE_DATA_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.warn('Failed to save offline data:', error);
  }
}

// טעינת נתונים מהמחסן המקומי
function getOfflineData(): OfflineDataState {
  try {
    const stored = localStorage.getItem(OFFLINE_DATA_KEY);
    if (stored) {
      const data = JSON.parse(stored) as OfflineDataState;
      
      // בדוק אם הנתונים עדיין תקפים
      const isExpired = Date.now() - data.lastUpdate > CACHE_DURATION;
      if (!isExpired) {
        return data;
      }
    }
  } catch (error) {
    console.warn('Failed to load offline data:', error);
  }
  
  // החזר נתוני ברירת מחדל
  return {
    blogPosts: fallbackBlogPosts,
    faqs: fallbackFAQs,
    reviews: fallbackReviews,
    settings: fallbackSettings,
    lastUpdate: Date.now(),
    isOfflineMode: true
  };
}

// מנהל הנתונים הראשי
export class OfflineDataManager {
  private static instance: OfflineDataManager;
  private data: OfflineDataState;

  constructor() {
    this.data = getOfflineData();
  }

  static getInstance(): OfflineDataManager {
    if (!OfflineDataManager.instance) {
      OfflineDataManager.instance = new OfflineDataManager();
    }
    return OfflineDataManager.instance;
  }

  // עדכון נתוני בלוג מהשרת
  updateBlogPosts(posts: any[]): void {
    this.data.blogPosts = posts;
    this.data.isOfflineMode = false;
    saveOfflineData(this.data);
  }

  // עדכון נתוני FAQ מהשרת
  updateFAQs(faqs: any[]): void {
    this.data.faqs = faqs;
    this.data.isOfflineMode = false;
    saveOfflineData(this.data);
  }

  // עדכון נתוני ביקורות מהשרת
  updateReviews(reviews: any[]): void {
    this.data.reviews = reviews;
    this.data.isOfflineMode = false;
    saveOfflineData(this.data);
  }

  // עדכון הגדרות מהשרת
  updateSettings(settings: any): void {
    this.data.settings = settings;
    this.data.isOfflineMode = false;
    saveOfflineData(this.data);
  }

  // קבלת נתוני בלוג
  getBlogPosts(): { posts: any[] } {
    return { posts: this.data.blogPosts };
  }

  // קבלת נתוני FAQ
  getFAQs(): { faqs: any[] } {
    return { faqs: this.data.faqs };
  }

  // קבלת נתוני ביקורות
  getReviews(): { reviews: any[] } {
    return { reviews: this.data.reviews };
  }

  // קבלת הגדרות
  getSettings(): { settings: any } {
    return { settings: this.data.settings };
  }

  // בדיקה האם במצב אופליין
  isOffline(): boolean {
    return this.data.isOfflineMode;
  }

  // כפיית מצב אופליין עם נתוני fallback
  forceOfflineMode(): void {
    this.data = {
      blogPosts: fallbackBlogPosts,
      faqs: fallbackFAQs,
      reviews: fallbackReviews,
      settings: fallbackSettings,
      lastUpdate: Date.now(),
      isOfflineMode: true
    };
    saveOfflineData(this.data);
  }

  // איפוס לנתוני fallback
  reset(): void {
    this.forceOfflineMode();
  }

  // קבלת סטטוס המחסן המקומי
  getStatus(): {
    isOffline: boolean;
    lastUpdate: Date;
    cacheAge: number;
    hasCachedData: boolean;
  } {
    return {
      isOffline: this.data.isOfflineMode,
      lastUpdate: new Date(this.data.lastUpdate),
      cacheAge: Date.now() - this.data.lastUpdate,
      hasCachedData: this.data.blogPosts.length > 0
    };
  }
}

// יצוא instance יחיד
export const offlineDataManager = OfflineDataManager.getInstance();

// פונקציות עזר
export function isNetworkError(error: any): boolean {
  if (!error) return false;
  
  const message = error.message || '';
  const networkErrors = [
    'Failed to fetch',
    'NetworkError',
    'TypeError: Failed to fetch',
    'NETWORK_ERROR',
    'NETWORK_OFFLINE',
    'REQUEST_TIMEOUT',
    'EDGE_FUNCTION_NOT_DEPLOYED',
    'CORS_ERROR'
  ];
  
  return networkErrors.some(errType => message.includes(errType));
}

export function shouldUseOfflineData(error?: any): boolean {
  // אם אין חיבור לאינטרנט
  if (!navigator.onLine) {
    return true;
  }
  
  // אם יש שגיאת רשת
  if (error && isNetworkError(error)) {
    return true;
  }
  
  return false;
}