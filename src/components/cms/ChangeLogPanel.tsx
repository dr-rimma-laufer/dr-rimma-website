/**
 * Change Log Panel Component
 * רכיב ניהול מערכת השינויים
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { contentAPI } from '../../utils/supabase/client';
import { 
  Clock, 
  FileText, 
  Database, 
  RotateCcw, 
  Camera, 
  Search, 
  Filter, 
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  Activity,
  BarChart3,
  Trash2,
  Plus,
  Eye,
  ArrowUpDown,
  Calendar
} from 'lucide-react';
import {
  CHANGE_TYPE_COLORS,
  CONTENT_TYPE_ICONS,
  CHANGE_TYPE_LABELS,
  CONTENT_TYPE_LABELS,
  ChangeLogEntry,
  BackupEntry,
  SystemSnapshot,
  ChangeType,
  ContentType
} from '../../utils/changeLogConstants';
import { formatDateHebrew } from '../../utils/changeLogHelpers';

interface ChangeLogPanelProps {
  onClose?: () => void;
}

export function ChangeLogPanel({ onClose }: ChangeLogPanelProps) {
  const [changeLogs, setChangeLogs] = useState<ChangeLogEntry[]>([]);
  const [snapshots, setSnapshots] = useState<SystemSnapshot[]>([]);
  const [statistics, setStatistics] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterContentType, setFilterContentType] = useState<ContentType | 'all'>('all');
  const [filterChangeType, setFilterChangeType] = useState<ChangeType | 'all'>('all');
  const [page, setPage] = useState(0);
  const [limit] = useState(25);

  // Dialog states
  const [showSnapshotDialog, setShowSnapshotDialog] = useState(false);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<BackupEntry | null>(null);
  const [snapshotTitle, setSnapshotTitle] = useState('');
  const [snapshotDescription, setSnapshotDescription] = useState('');

  useEffect(() => {
    loadData();
  }, [page, filterContentType, filterChangeType]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [changeLogsResponse, snapshotsResponse, statisticsResponse] = await Promise.all([
        contentAPI.getChangeLogs({
          limit,
          offset: page * limit,
          contentType: filterContentType === 'all' ? undefined : filterContentType,
          changeType: filterChangeType === 'all' ? undefined : filterChangeType,
        }),
        contentAPI.getSystemSnapshots(20),
        contentAPI.getChangeLogStatistics(),
      ]);

      setChangeLogs(changeLogsResponse.changes || []);
      setSnapshots(snapshotsResponse.snapshots || []);
      setStatistics(statisticsResponse.statistics || {});
    } catch (err: any) {
      setError(`שגיאה בטעינת נתוני השינויים: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSnapshot = async () => {
    if (!snapshotTitle.trim()) {
      setError('נא להזין כותרת לתמונת המצב');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await contentAPI.createSystemSnapshot(snapshotTitle, snapshotDescription);
      setSuccess('תמונת מצב נוצרה בהצלחה');
      setShowSnapshotDialog(false);
      setSnapshotTitle('');
      setSnapshotDescription('');
      loadData();
    } catch (err: any) {
      setError(`שגיאה ביצירת תמונת מצב: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreFromBackup = async (backupId: string) => {
    setLoading(true);
    setError(null);

    try {
      await contentAPI.restoreFromBackup(backupId);
      setSuccess('התוכן שוחזר בהצלחה מהגיבוי');
      setShowRestoreDialog(false);
      setSelectedBackup(null);
      loadData();
    } catch (err: any) {
      setError(`שגיאה בשחזור מגיבוי: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getChangeTypeColor = (changeType: ChangeType) => {
    return CHANGE_TYPE_COLORS[changeType] || '#64748b';
  };

  const getContentTypeIcon = (contentType: ContentType) => {
    return CONTENT_TYPE_ICONS[contentType] || '📄';
  };

  const filteredChangeLogs = changeLogs.filter(change => {
    if (searchTerm) {
      return (
        change.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        change.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        change.userEmail?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">מערכת ניהול שינויים</h1>
          <p className="text-gray-600 mt-2">
            עקוב אחר כל השינויים באתר, צור גיבויים ושחזר תוכן
          </p>
        </div>
        {onClose && (
          <Button onClick={onClose} variant="outline">
            סגור
          </Button>
        )}
      </div>

      {/* Error/Success Messages */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-700">{success}</AlertDescription>
        </Alert>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">סה"כ שינויים</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalChanges || 0}</div>
            <p className="text-xs text-gray-600">כל השינויים שבוצעו</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">שינויים היום</CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.changesLast24h || 0}</div>
            <p className="text-xs text-gray-600">ב-24 השעות האחרונות</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">גיבויים</CardTitle>
            <Database className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalBackups || 0}</div>
            <p className="text-xs text-gray-600">גיבויים פעילים</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">תמונות מצב</CardTitle>
            <Camera className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalSnapshots || 0}</div>
            <p className="text-xs text-gray-600">תמונות מצב שנוצרו</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="changes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="changes">רשימת שינויים</TabsTrigger>
          <TabsTrigger value="snapshots">תמונות מצב</TabsTrigger>
          <TabsTrigger value="statistics">סטטיסטיקות</TabsTrigger>
        </TabsList>

        {/* Changes Tab */}
        <TabsContent value="changes" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                סינון וחיפוש
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="search">חיפוש</Label>
                  <Input
                    id="search"
                    placeholder="חפש לפי כותרת, תיאור או משתמש..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="contentType">סוג תוכן</Label>
                  <Select value={filterContentType} onValueChange={(value: any) => setFilterContentType(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="כל סוגי התוכן" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">כל סוגי התוכן</SelectItem>
                      {Object.entries(CONTENT_TYPE_LABELS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {getContentTypeIcon(key as ContentType)} {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="changeType">סוג שינוי</Label>
                  <Select value={filterChangeType} onValueChange={(value: any) => setFilterChangeType(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="כל סוגי השינוי" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">כל סוגי השינוי</SelectItem>
                      {Object.entries(CHANGE_TYPE_LABELS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Changes List */}
          <Card>
            <CardHeader>
              <CardTitle>רשימת שינויים</CardTitle>
              <CardDescription>
                {filteredChangeLogs.length} שינויים נמצאו
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">טוען...</div>
              ) : filteredChangeLogs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  לא נמצאו שינויים העונים לקריטריונים
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredChangeLogs.map((change, index) => (
                    <div key={change.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-lg">
                              {getContentTypeIcon(change.contentType)}
                            </span>
                            <Badge 
                              style={{ 
                                backgroundColor: getChangeTypeColor(change.changeType),
                                color: 'white'
                              }}
                              className="text-xs"
                            >
                              {CHANGE_TYPE_LABELS[change.changeType]}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {CONTENT_TYPE_LABELS[change.contentType]}
                            </Badge>
                          </div>
                          
                          <h4 className="font-semibold text-lg mb-1">
                            {change.title}
                          </h4>
                          
                          <p className="text-gray-600 text-sm mb-2">
                            {change.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDateHebrew(change.timestamp)}
                            </span>
                            {change.userEmail && (
                              <span>
                                על ידי: {change.userEmail}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mr-4">
                          {change.changeType === 'delete' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                // Load backups for this content
                                // Implementation for showing restore options
                              }}
                            >
                              <RotateCcw className="h-3 w-3 mr-1" />
                              שחזר
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0 || loading}
            >
              הקודם
            </Button>
            <span className="flex items-center px-4">
              עמוד {page + 1}
            </span>
            <Button
              variant="outline"
              onClick={() => setPage(page + 1)}
              disabled={filteredChangeLogs.length < limit || loading}
            >
              הבא
            </Button>
          </div>
        </TabsContent>

        {/* Snapshots Tab */}
        <TabsContent value="snapshots" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>תמונות מצב של המערכת</CardTitle>
                  <CardDescription>
                    תמונות מצב מלאות של כל נתוני האתר
                  </CardDescription>
                </div>
                <Dialog open={showSnapshotDialog} onOpenChange={setShowSnapshotDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Camera className="h-4 w-4 mr-2" />
                      צור תמונת מצב
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>יצירת תמונת מצב חדשה</DialogTitle>
                      <DialogDescription>
                        תמונת מצב תכלול את כל נתוני האתר ותאפשר שחזור מלא במקרה הצורך
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="snapshotTitle">כותרת</Label>
                        <Input
                          id="snapshotTitle"
                          value={snapshotTitle}
                          onChange={(e) => setSnapshotTitle(e.target.value)}
                          placeholder="תמונת מצב - [תאריך]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="snapshotDescription">תיאור</Label>
                        <Textarea
                          id="snapshotDescription"
                          value={snapshotDescription}
                          onChange={(e) => setSnapshotDescription(e.target.value)}
                          placeholder="תיאור אופציונלי של תמונת המצב..."
                          rows={3}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowSnapshotDialog(false)}
                        >
                          ביטול
                        </Button>
                        <Button
                          onClick={handleCreateSnapshot}
                          disabled={loading}
                        >
                          {loading ? 'יוצר...' : 'צור תמונת מצב'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {snapshots.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  אין תמונות מצב זמינות
                </div>
              ) : (
                <div className="space-y-3">
                  {snapshots.map((snapshot) => (
                    <div key={snapshot.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">
                            {snapshot.title}
                          </h4>
                          <p className="text-gray-600 text-sm mb-2">
                            {snapshot.description}
                          </p>
                          
                          <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                            <div>
                              <span className="text-gray-500">סה"כ פריטים:</span>
                              <span className="font-medium mr-1">{snapshot.totalItems}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">פוסטים:</span>
                              <span className="font-medium mr-1">{snapshot.blogPosts}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">שאלות נפוצות:</span>
                              <span className="font-medium mr-1">{snapshot.faqs}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDateHebrew(snapshot.timestamp)}
                            </span>
                            {snapshot.userEmail && (
                              <span>
                                על ידי: {snapshot.userEmail}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mr-4">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            צפה
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              // Implementation for restoring from snapshot
                            }}
                          >
                            <RotateCcw className="h-3 w-3 mr-1" />
                            שחזר
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="statistics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>שינויים לפי סוג</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(statistics.changesByType || {}).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded"
                          style={{ backgroundColor: getChangeTypeColor(type as ChangeType) }}
                        />
                        <span>{CHANGE_TYPE_LABELS[type as ChangeType]}</span>
                      </div>
                      <Badge variant="secondary">{count as number}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>שינויים לפי סוג תוכן</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(statistics.changesByContent || {}).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{getContentTypeIcon(type as ContentType)}</span>
                        <span>{CONTENT_TYPE_LABELS[type as ContentType]}</span>
                      </div>
                      <Badge variant="secondary">{count as number}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>סטטיסטיקות כלליות</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {statistics.changesLast24h || 0}
                  </div>
                  <div className="text-sm text-gray-600">שינויים ב-24 שעות</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {statistics.changesLastWeek || 0}
                  </div>
                  <div className="text-sm text-gray-600">שינויים השבוע</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {statistics.totalChanges || 0}
                  </div>
                  <div className="text-sm text-gray-600">סה"כ שינויים</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}