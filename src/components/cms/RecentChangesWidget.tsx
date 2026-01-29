/**
 * Recent Changes Widget
 * רכיב תצוגת השינויים האחרונים
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { contentAPI } from '../../utils/supabase/client';
import { Clock, Eye, MoreHorizontal, Activity } from 'lucide-react';
import {
  CHANGE_TYPE_COLORS,
  CONTENT_TYPE_ICONS,
  CHANGE_TYPE_LABELS,
  CONTENT_TYPE_LABELS,
  ChangeLogEntry,
  ChangeType,
  ContentType
} from '../../utils/changeLogConstants';
import { formatDateHebrew } from '../../utils/changeLogHelpers';

interface RecentChangesWidgetProps {
  limit?: number;
  onViewAll?: () => void;
}

export function RecentChangesWidget({ limit = 5, onViewAll }: RecentChangesWidgetProps) {
  const [changes, setChanges] = useState<ChangeLogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRecentChanges();
  }, [limit]);

  const loadRecentChanges = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await contentAPI.getChangeLogs({ limit, offset: 0 });
      setChanges(response.changes || []);
    } catch (err: any) {
      setError('שגיאה בטעינת השינויים האחרונים');
      console.error('Error loading recent changes:', err);
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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            שינויים אחרונים
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-gray-500">
            טוען שינויים...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            שינויים אחרונים
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-red-500">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              שינויים אחרונים
            </CardTitle>
            <CardDescription>
              {changes.length > 0 ? `${changes.length} שינויים אחרונים` : 'אין שינויים'}
            </CardDescription>
          </div>
          {onViewAll && changes.length > 0 && (
            <Button variant="outline" size="sm" onClick={onViewAll}>
              <Eye className="h-4 w-4 mr-1" />
              צפה בכל השינויים
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {changes.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>אין שינויים אחרונים להצגה</p>
          </div>
        ) : (
          <div className="space-y-3">
            {changes.map((change, index) => (
              <div 
                key={change.id} 
                className={`flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors ${
                  index < changes.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                {/* Content Type Icon */}
                <div className="flex-shrink-0 mt-1">
                  <span className="text-lg">
                    {getContentTypeIcon(change.contentType)}
                  </span>
                </div>

                {/* Change Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge 
                      style={{ 
                        backgroundColor: getChangeTypeColor(change.changeType),
                        color: 'white'
                      }}
                      className="text-xs px-2 py-0.5"
                    >
                      {CHANGE_TYPE_LABELS[change.changeType]}
                    </Badge>
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      {CONTENT_TYPE_LABELS[change.contentType]}
                    </Badge>
                  </div>
                  
                  <h4 className="font-medium text-sm line-clamp-1 mb-1">
                    {change.title}
                  </h4>
                  
                  {change.description && (
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                      {change.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDateHebrew(change.timestamp)}
                    </span>
                    {change.userEmail && (
                      <span className="truncate max-w-[120px]">
                        {change.userEmail.split('@')[0]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex-shrink-0">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0"
                    onClick={() => {
                      // Implementation for showing change details
                      console.log('Show change details:', change.id);
                    }}
                  >
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}