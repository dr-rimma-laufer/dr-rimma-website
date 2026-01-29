import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { FileImage, Upload, Eye, MoveUp, MoveDown, Trash2 } from 'lucide-react';

export const ImageUploadInstructions: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <FileImage className="h-5 w-5" />
          מדריך שימוש - העלאת תמונות למאמר
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* צד שמאל - העלאה */}
          <div className="space-y-3">
            <h5 className="font-semibold text-green-700 flex items-center gap-2">
              <Upload className="h-4 w-4" />
              איך להעלות תמונות:
            </h5>
            <ul className="space-y-2 text-sm text-green-700">
              <li className="flex items-start gap-2">
                <Badge className="bg-green-600 text-white text-xs">1</Badge>
                <span>לחץ על "הוסף תמונה" ליצירת מקום חדש לתמונה</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="bg-green-600 text-white text-xs">2</Badge>
                <span>גרור תמונה מהמחשב לאזור המקווקו או לחץ "בחר תמונה"</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="bg-green-600 text-white text-xs">3</Badge>
                <span>הוסף טקסט חלופי (חובה) וכיתוב (אופציונלי)</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="bg-green-600 text-white text-xs">4</Badge>
                <span>שמור את המאמר - התמונות נשמרות אוטומטית</span>
              </li>
            </ul>
          </div>

          {/* צד ימין - ניהול */}
          <div className="space-y-3">
            <h5 className="font-semibold text-blue-700 flex items-center gap-2">
              <MoveUp className="h-4 w-4" />
              ניהול התמונות:
            </h5>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-center gap-2">
                <MoveUp className="h-3 w-3" />
                <MoveDown className="h-3 w-3" />
                <span>שנה סדר עם החצים (↑↓)</span>
              </li>
              <li className="flex items-center gap-2">
                <Eye className="h-3 w-3" />
                <span>הגדל תצוגה לראייה טובה יותר</span>
              </li>
              <li className="flex items-center gap-2">
                <Upload className="h-3 w-3" />
                <span>החלף תמונה קיימת בקלות</span>
              </li>
              <li className="flex items-center gap-2">
                <Trash2 className="h-3 w-3" />
                <span>מחק תמונות שלא נחוצות</span>
              </li>
            </ul>
          </div>
        </div>

        {/* טיפים חשובים */}
        <div className="bg-white/80 p-4 rounded-lg border border-green-300">
          <h5 className="font-semibold text-green-800 mb-2">💡 טיפים חשובים:</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-green-700">
            <div>
              <strong>פורמטים נתמכים:</strong> JPG, PNG, WebP
            </div>
            <div>
              <strong>גודל מקסימלי:</strong> 5MB לתמונה
            </div>
            <div>
              <strong>מיקום במאמר:</strong> התמונות יופיעו לאחר התוכן הראשי
            </div>
            <div>
              <strong>סדר התצוגה:</strong> לפי המספור שקבעת (#1, #2...)
            </div>
          </div>
        </div>

        {/* דוגמה חזותית */}
        <div className="bg-white/80 p-4 rounded-lg border border-blue-300">
          <h5 className="font-semibold text-blue-800 mb-2">🎯 כך זה נראה במאמר:</h5>
          <div className="text-xs text-blue-700 space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 bg-gray-300 rounded-sm"></div>
              <span>התוכן הראשי של המאמר</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 bg-green-400 rounded-sm"></div>
              <span>תמונה #1 + כיתוב</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 bg-gray-200 rounded-sm"></div>
              <span>טקסט מקשר</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 bg-green-400 rounded-sm"></div>
              <span>תמונה #2 + כיתוב</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 bg-blue-300 rounded-sm"></div>
              <span>גלריית תמונות בסוף</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};