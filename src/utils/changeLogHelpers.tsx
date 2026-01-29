/**
 * Change Log Helper Functions
 * פונקציות עזר למערכת ניהול השינויים
 */

import { 
  ChangeLogEntry, 
  BackupEntry, 
  SystemSnapshot, 
  ChangeType, 
  ContentType,
  CHANGE_LOG_PREFIXES,
  BACKUP_RETENTION,
  CHANGE_MESSAGES,
} from './changeLogConstants';

/**
 * יצירת ID ייחודי עבור change log entry
 */
export function generateChangeLogId(): string {
  return `${CHANGE_LOG_PREFIXES.CHANGE_LOG}${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * יצירת ID ייחודי עבור backup entry
 */
export function generateBackupId(): string {
  return `${CHANGE_LOG_PREFIXES.BACKUP}${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * יצירת ID ייחודי עבור system snapshot
 */
export function generateSnapshotId(): string {
  return `${CHANGE_LOG_PREFIXES.SNAPSHOT}${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * יצירת change log entry חדש
 */
export function createChangeLogEntry(
  changeType: ChangeType,
  contentType: ContentType,
  contentId: string,
  title: string,
  description: string,
  userId?: string,
  userEmail?: string,
  previousVersion?: any,
  newVersion?: any,
  metadata?: Record<string, any>
): ChangeLogEntry {
  return {
    id: generateChangeLogId(),
    timestamp: new Date().toISOString(),
    changeType,
    contentType,
    contentId,
    title,
    description,
    userId,
    userEmail,
    previousVersion,
    newVersion,
    metadata: {
      ...metadata,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Server',
      ipAddress: 'N/A', // יתווסף בצד השרת
    },
  };
}

/**
 * יצירת backup entry
 */
export function createBackupEntry(
  contentType: ContentType,
  originalId: string,
  backupData: any,
  changeLogId: string,
  title: string,
  description: string,
  userId?: string,
  userEmail?: string,
  retentionDays: number = BACKUP_RETENTION.DEFAULT_RETENTION_DAYS
): BackupEntry {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + (retentionDays * 24 * 60 * 60 * 1000));

  return {
    id: generateBackupId(),
    timestamp: now.toISOString(),
    title,
    description,
    contentType,
    originalId,
    backupData,
    changeLogId,
    userId,
    userEmail,
    expiresAt: expiresAt.toISOString(),
    tags: [`retention_${retentionDays}d`],
  };
}

/**
 * יצירת system snapshot
 */
export function createSystemSnapshot(
  title: string,
  description: string,
  systemData: {
    blogPosts: any[];
    faqs: any[];
    gallery: any[];
    treatments: any[];
    reviews: any[];
    contacts: any[];
    settings: any;
  },
  userId?: string,
  userEmail?: string
): SystemSnapshot {
  return {
    id: generateSnapshotId(),
    timestamp: new Date().toISOString(),
    title,
    description,
    totalItems: systemData.blogPosts.length + systemData.faqs.length + 
                systemData.gallery.length + systemData.treatments.length + 
                systemData.reviews.length + systemData.contacts.length,
    blogPosts: systemData.blogPosts.length,
    faqs: systemData.faqs.length,
    gallery: systemData.gallery.length,
    treatments: systemData.treatments.length,
    reviews: systemData.reviews.length,
    contacts: systemData.contacts.length,
    settings: systemData.settings,
    userId,
    userEmail,
  };
}

/**
 * פילטור והסרת גיבויים שפג תוקפם
 */
export function filterExpiredBackups(backups: BackupEntry[]): {
  valid: BackupEntry[];
  expired: BackupEntry[];
} {
  const now = new Date();
  const valid: BackupEntry[] = [];
  const expired: BackupEntry[] = [];

  backups.forEach(backup => {
    if (backup.expiresAt && new Date(backup.expiresAt) < now) {
      expired.push(backup);
    } else {
      valid.push(backup);
    }
  });

  return { valid, expired };
}

/**
 * קבלת הגיבויים האחרונים לפי פריט תוכן
 */
export function getLatestBackupsForContent(
  backups: BackupEntry[],
  contentType: ContentType,
  originalId: string,
  limit: number = BACKUP_RETENTION.MAX_BACKUPS_PER_ITEM
): BackupEntry[] {
  return backups
    .filter(backup => backup.contentType === contentType && backup.originalId === originalId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

/**
 * חישוב סטטיסטיקות לשינויים
 */
export function calculateChangeStatistics(changes: ChangeLogEntry[]): {
  totalChanges: number;
  changesByType: Record<ChangeType, number>;
  changesByContent: Record<ContentType, number>;
  changesLast24h: number;
  changesLastWeek: number;
  changesLastMonth: number;
  mostActiveUsers: Array<{ userEmail: string; changes: number }>;
} {
  const now = new Date();
  const day24hAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));
  const weekAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
  const monthAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));

  const changesByType: Record<ChangeType, number> = {} as any;
  const changesByContent: Record<ContentType, number> = {} as any;
  const userChanges: Record<string, number> = {};

  let changesLast24h = 0;
  let changesLastWeek = 0;
  let changesLastMonth = 0;

  changes.forEach(change => {
    const changeDate = new Date(change.timestamp);
    
    // ספירה לפי סוג שינוי
    changesByType[change.changeType] = (changesByType[change.changeType] || 0) + 1;
    
    // ספירה לפי סוג תוכן
    changesByContent[change.contentType] = (changesByContent[change.contentType] || 0) + 1;
    
    // ספירה לפי משתמש
    if (change.userEmail) {
      userChanges[change.userEmail] = (userChanges[change.userEmail] || 0) + 1;
    }
    
    // ספירה לפי זמן
    if (changeDate >= day24hAgo) changesLast24h++;
    if (changeDate >= weekAgo) changesLastWeek++;
    if (changeDate >= monthAgo) changesLastMonth++;
  });

  const mostActiveUsers = Object.entries(userChanges)
    .map(([userEmail, changes]) => ({ userEmail, changes }))
    .sort((a, b) => b.changes - a.changes)
    .slice(0, 10);

  return {
    totalChanges: changes.length,
    changesByType,
    changesByContent,
    changesLast24h,
    changesLastWeek,
    changesLastMonth,
    mostActiveUsers,
  };
}

/**
 * יצירת תיאור אוטומטי לשינוי
 */
export function generateChangeDescription(
  changeType: ChangeType,
  contentType: ContentType,
  contentTitle?: string,
  additionalInfo?: string
): string {
  const action = CHANGE_MESSAGES[
    `${contentType.toUpperCase()}_${changeType.toUpperCase()}` as keyof typeof CHANGE_MESSAGES
  ] || `${changeType} ${contentType}`;

  let description = action;
  
  if (contentTitle) {
    description += `: "${contentTitle}"`;
  }
  
  if (additionalInfo) {
    description += ` - ${additionalInfo}`;
  }
  
  return description;
}

/**
 * יצירת tags אוטומטיים לשינוי
 */
export function generateChangeTags(
  changeType: ChangeType,
  contentType: ContentType,
  userEmail?: string,
  additionalTags: string[] = []
): string[] {
  const tags = [
    changeType,
    contentType,
    `date_${new Date().toISOString().split('T')[0]}`,
    ...additionalTags,
  ];

  if (userEmail) {
    tags.push(`user_${userEmail.split('@')[0]}`);
  }

  return tags;
}

/**
 * פורמט תאריך לתצוגה בעברית
 */
export function formatDateHebrew(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) {
    return 'כרגע';
  } else if (diffMinutes < 60) {
    return `לפני ${diffMinutes} דקות`;
  } else if (diffHours < 24) {
    return `לפני ${diffHours} שעות`;
  } else if (diffDays < 7) {
    return `לפני ${diffDays} ימים`;
  } else {
    return date.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}

/**
 * חישוב גודל נתונים בבתים ופורמט לתצוגה
 */
export function formatDataSize(data: any): string {
  const jsonString = JSON.stringify(data);
  const bytes = new TextEncoder().encode(jsonString).length;
  
  if (bytes < 1024) {
    return `${bytes} בתים`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}

/**
 * בדיקה האם שינוי משמעותי (לצורך החלטה על יצירת גיבוי)
 */
export function isSignificantChange(
  changeType: ChangeType,
  contentType: ContentType,
  previousVersion?: any,
  newVersion?: any
): boolean {
  // מחיקה היא תמיד שינוי משמעותי
  if (changeType === 'delete') {
    return true;
  }

  // יצירה היא תמיד שינוי משמעותי
  if (changeType === 'create') {
    return true;
  }

  // עבור עדכונים, בדוק השינויים
  if (changeType === 'update' && previousVersion && newVersion) {
    // בדוק שינויים בשדות חשובים
    const importantFields = ['title', 'content', 'question', 'answer', 'name', 'email'];
    
    for (const field of importantFields) {
      if (previousVersion[field] !== newVersion[field]) {
        return true;
      }
    }
    
    // בדוק שינויים במערכים
    const arrayFields = ['tags', 'additionalImages'];
    for (const field of arrayFields) {
      if (JSON.stringify(previousVersion[field]) !== JSON.stringify(newVersion[field])) {
        return true;
      }
    }
  }

  return false;
}

/**
 * יצירת דו"ח שינויים מסוכם
 */
export function generateChangeReport(
  changes: ChangeLogEntry[],
  period: 'day' | 'week' | 'month' = 'week'
): {
  period: string;
  summary: string;
  details: {
    totalChanges: number;
    creations: number;
    updates: number;
    deletions: number;
    backups: number;
    restores: number;
    topContentTypes: Array<{ type: ContentType; count: number }>;
    topUsers: Array<{ email: string; count: number }>;
  };
} {
  const now = new Date();
  let startDate: Date;
  let periodLabel: string;

  switch (period) {
    case 'day':
      startDate = new Date(now.getTime() - (24 * 60 * 60 * 1000));
      periodLabel = 'היום האחרון';
      break;
    case 'week':
      startDate = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
      periodLabel = 'השבוע האחרון';
      break;
    case 'month':
      startDate = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
      periodLabel = 'החודש האחרון';
      break;
  }

  const periodChanges = changes.filter(
    change => new Date(change.timestamp) >= startDate
  );

  const stats = calculateChangeStatistics(periodChanges);

  const summary = `ב${periodLabel} בוצעו ${stats.totalChanges} שינויים באתר`;

  return {
    period: periodLabel,
    summary,
    details: {
      totalChanges: stats.totalChanges,
      creations: stats.changesByType.create || 0,
      updates: stats.changesByType.update || 0,
      deletions: stats.changesByType.delete || 0,
      backups: stats.changesByType.backup || 0,
      restores: stats.changesByType.restore || 0,
      topContentTypes: Object.entries(stats.changesByContent)
        .map(([type, count]) => ({ type: type as ContentType, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5),
      topUsers: stats.mostActiveUsers.slice(0, 5),
    },
  };
}