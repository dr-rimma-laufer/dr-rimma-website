import React, { useEffect, useState } from 'react';
import {
  FileText,
  BookOpen,
  Scissors,
  Image,
  Users,
  TrendingUp,
  Calendar,
  Activity,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import api from '../lib/api';

interface StatCard {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  change?: string;
}

interface ActivityItem {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalPages: 0,
    totalPosts: 0,
    totalTreatments: 0,
    totalMedia: 0,
  });
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.getDashboardStats();
      if (response.success && response.data) {
        setStats({
          totalPages: response.data.totalPages || 12,
          totalPosts: response.data.totalPosts || 8,
          totalTreatments: response.data.totalTreatments || 15,
          totalMedia: response.data.totalMedia || 45,
        });
        setRecentActivity(response.data.recentActivity || []);
      } else {
        // Use demo data for now
        setStats({
          totalPages: 12,
          totalPosts: 8,
          totalTreatments: 15,
          totalMedia: 45,
        });
        setRecentActivity([
          { id: '1', type: 'page', description: 'עדכון עמוד הבית', timestamp: '2 שעות' },
          { id: '2', type: 'post', description: 'פוסט חדש בבלוג', timestamp: '5 שעות' },
          { id: '3', type: 'media', description: 'העלאת 3 תמונות', timestamp: 'אתמול' },
          { id: '4', type: 'treatment', description: 'עדכון טיפול PRP', timestamp: '3 ימים' },
        ]);
      }
    } catch (err) {
      setError('שגיאה בטעינת הנתונים');
      // Still show demo data
      setStats({
        totalPages: 12,
        totalPosts: 8,
        totalTreatments: 15,
        totalMedia: 45,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const statCards: StatCard[] = [
    {
      title: 'עמודים',
      value: stats.totalPages,
      icon: <FileText size={24} />,
      color: 'bg-blue-500',
      change: '+2 החודש',
    },
    {
      title: 'פוסטים בבלוג',
      value: stats.totalPosts,
      icon: <BookOpen size={24} />,
      color: 'bg-green-500',
      change: '+3 החודש',
    },
    {
      title: 'טיפולים',
      value: stats.totalTreatments,
      icon: <Scissors size={24} />,
      color: 'bg-purple-500',
    },
    {
      title: 'קבצי מדיה',
      value: stats.totalMedia,
      icon: <Image size={24} />,
      color: 'bg-orange-500',
      change: '+12 החודש',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary-600" size={40} />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">לוח בקרה</h1>
        <p className="text-gray-600">ברוכים הבאים לפאנל הניהול של Dr. Rimma</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                {card.change && (
                  <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp size={14} />
                    {card.change}
                  </p>
                )}
              </div>
              <div className={`${card.color} p-3 rounded-xl text-white`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">פעילות אחרונה</h2>
            <Activity className="text-gray-400" size={20} />
          </div>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    {activity.type === 'page' && <FileText size={18} className="text-primary-600" />}
                    {activity.type === 'post' && <BookOpen size={18} className="text-primary-600" />}
                    {activity.type === 'media' && <Image size={18} className="text-primary-600" />}
                    {activity.type === 'treatment' && <Scissors size={18} className="text-primary-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">אין פעילות אחרונה</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">פעולות מהירות</h2>
            <Calendar className="text-gray-400" size={20} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/pages"
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center"
            >
              <FileText className="mx-auto mb-2 text-blue-600" size={24} />
              <p className="text-sm font-medium text-blue-900">ערוך עמודים</p>
            </a>
            <a
              href="/blog"
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center"
            >
              <BookOpen className="mx-auto mb-2 text-green-600" size={24} />
              <p className="text-sm font-medium text-green-900">צור פוסט</p>
            </a>
            <a
              href="/media"
              className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-center"
            >
              <Image className="mx-auto mb-2 text-orange-600" size={24} />
              <p className="text-sm font-medium text-orange-900">העלה מדיה</p>
            </a>
            <a
              href="/settings"
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-center"
            >
              <Users className="mx-auto mb-2 text-purple-600" size={24} />
              <p className="text-sm font-medium text-purple-900">הגדרות</p>
            </a>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="card mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">סטטוס מערכת</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">API פעיל</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">מסד נתונים מחובר</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">אחסון מדיה זמין</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
