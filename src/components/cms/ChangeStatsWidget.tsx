/**
 * Change Statistics Widget
 * רכיב סטטיסטיקות השינויים
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { contentAPI } from '../../utils/supabase/client';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Clock, 
  Database,
  AlertCircle 
} from 'lucide-react';

interface ChangeStatsWidgetProps {
  className?: string;
}

export function ChangeStatsWidget({ className }: ChangeStatsWidgetProps) {
  const [statistics, setStatistics] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await contentAPI.getChangeLogStatistics();
      setStatistics(response.statistics || {});
    } catch (err: any) {
      setError('שגיאה בטעינת סטטיסטיקות השינויים');
      console.error('Error loading change statistics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            סטטיסטיקות שינויים
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-gray-500">
            טוען סטטיסטיקות...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            סטטיסטיקות שינויים
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-red-500 flex items-center justify-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getChangesTrend = () => {
    const today = statistics.changesLast24h || 0;
    const week = statistics.changesLastWeek || 0;
    const weeklyAverage = week / 7;
    
    if (today > weeklyAverage) {
      return { icon: TrendingUp, color: 'text-green-600', text: 'פעילות גבוהה' };
    } else if (today < weeklyAverage * 0.5) {
      return { icon: TrendingDown, color: 'text-red-600', text: 'פעילות נמוכה' };
    } else {
      return { icon: Activity, color: 'text-blue-600', text: 'פעילות רגילה' };
    }
  };

  const trend = getChangesTrend();
  const TrendIcon = trend.icon;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          סטטיסטיקות שינויים
        </CardTitle>
        <CardDescription>
          מעקב אחר פעילות השינויים באתר
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">היום</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {statistics.changesLast24h || 0}
            </div>
            <div className="text-xs text-gray-500">שינויים ב-24 שעות</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendIcon className={`h-4 w-4 ${trend.color}`} />
              <span className="text-sm font-medium">השבוע</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {statistics.changesLastWeek || 0}
            </div>
            <div className="text-xs text-gray-500">שינויים השבוע</div>
          </div>
        </div>

        {/* Trend Badge */}
        <div className="flex justify-center">
          <Badge 
            variant="outline" 
            className={`${trend.color} border-current`}
          >
            <TrendIcon className="h-3 w-3 mr-1" />
            {trend.text}
          </Badge>
        </div>

        {/* Total Stats */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-purple-600">
                {statistics.totalChanges || 0}
              </div>
              <div className="text-xs text-gray-500">סה"כ שינויים</div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-600">
                {statistics.totalBackups || 0}
              </div>
              <div className="text-xs text-gray-500">גיבויים</div>
            </div>
          </div>
        </div>

        {/* Change Types (if available) */}
        {statistics.changesByType && Object.keys(statistics.changesByType).length > 0 && (
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">סוגי שינויים אחרונים</h4>
            <div className="space-y-1">
              {Object.entries(statistics.changesByType).slice(0, 3).map(([type, count]) => (
                <div key={type} className="flex justify-between text-xs">
                  <span className="capitalize">{type}</span>
                  <span className="font-medium">{count as number}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}