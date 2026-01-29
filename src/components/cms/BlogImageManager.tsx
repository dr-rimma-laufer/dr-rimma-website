import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { BlogImage } from '../../utils/blogConstants';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Trash2, Plus, Upload, MoveUp, MoveDown, FileImage, Eye } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { contentAPI } from '../../utils/supabase/client';

interface BlogImageManagerProps {
  images: BlogImage[];
  onChange: (images: BlogImage[]) => void;
  maxImages?: number;
  onError?: (message: string) => void;
  onSuccess?: (message: string) => void;
}

export const BlogImageManager: React.FC<BlogImageManagerProps> = ({
  images = [],
  onChange,
  maxImages = 5,
  onError,
  onSuccess
}) => {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // הוספת תמונה חדשה
  const addImage = () => {
    if (images.length >= maxImages) return;
    
    const newImage: BlogImage = {
      id: `img_${Date.now()}`,
      url: '',
      caption: '',
      position: images.length + 1,
      alt: ''
    };
    
    onChange([...images, newImage]);
  };

  // עדכון תמונה
  const updateImage = (index: number, field: keyof BlogImage, value: string | number) => {
    const updatedImages = images.map((img, i) => 
      i === index ? { ...img, [field]: value } : img
    );
    onChange(updatedImages);
  };

  // טיפול בגרירה ושחרור
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(null);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleImageUpload(index, imageFile);
    }
  };

  // המרת קובץ לBase64 או URL מקומי
  const convertFileToUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  // העלאת תמונה מקומית
  const handleImageUpload = async (index: number, file: File) => {
    if (!file) return;

    // בדיקת סוג הקובץ
    if (!file.type.startsWith('image/')) {
      if (onError) {
        onError('יש להעלות קובץ תמונה בלבד (JPG, PNG, WebP)');
      }
      return;
    }

    // בדיקת גודל הקובץ (מקסימום 5MB)
    if (file.size > 5 * 1024 * 1024) {
      if (onError) {
        onError('גודל הקובץ גדול מדי (מקסימום 5MB)');
      }
      return;
    }

    setUploadingIndex(index);
    
    try {
      // ניסיון העלאה לשרת ראשית
      try {
        console.log('Attempting to upload image to server...', file.name);
        const result = await contentAPI.uploadImage(file);
        console.log('Server upload result:', result);
        
        // שמירת הנתיב המקורי במקום signed URL כדי שהשרת יכול ליצור signed URLs חדשים
        let filePath = result.filePath || result.imageUrl;
        
        // וודא שאנו שומרים רק את הנתיב, לא signed URL
        if (filePath && filePath.includes('supabase')) {
          // אם זה signed URL, נחלץ את הנתיב
          const pathMatch = filePath.match(/\/blog-images\/([^?]+)/);
          if (pathMatch) {
            filePath = `blog-images/${pathMatch[1]}`;
          }
        }
        
        console.log('Storing file path:', filePath);
        
        // עדכון התמונה ברשימה עם הנתיב המקורי
        const updatedImages = images.map((img, i) => 
          i === index ? { 
            ...img, 
            url: filePath,
            alt: img.alt || file.name.replace(/\.[^/.]+$/, '')
          } : img
        );
        console.log('Updated images array:', updatedImages.map(img => ({ ...img, url: img.url.substring(0, 50) + '...' })));
        onChange(updatedImages);
        
        if (onSuccess) {
          onSuccess('תמונה הועלתה בהצלחה לשרת');
        }
        
      } catch (serverError) {
        console.warn('Server upload failed, using local preview:', serverError);
        
        // אם השרת לא זמין, השתמש ב-Base64 כתמונה מקומית
        const localUrl = await convertFileToUrl(file);
        console.log('Using local Base64, length:', localUrl.length);
        
        const updatedImages = images.map((img, i) => 
          i === index ? { 
            ...img, 
            url: localUrl,
            alt: img.alt || file.name.replace(/\.[^/.]+$/, ''),
            isLocal: true // סימון שזה Base64 מקומי
          } : img
        );
        console.log('Updated images with local Base64:', updatedImages.map(img => ({ ...img, url: img.url.substring(0, 50) + '...' })));
        onChange(updatedImages);
        
        if (onSuccess) {
          onSuccess('תמונה נטענה מקומית (יישמר כ-Base64)');
        }
      }
      
    } catch (error) {
      console.error('Error uploading image:', error);
      if (onError) {
        onError('שגיאה בטעינת התמונה - נסה קובץ אחר');
      }
    } finally {
      setUploadingIndex(null);
    }
  };

  // מחיקת תמונה
  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    // עדכון positions
    const reindexedImages = updatedImages.map((img, i) => ({
      ...img,
      position: i + 1
    }));
    onChange(reindexedImages);
    
    if (onSuccess) {
      onSuccess('תמונה נמחקה');
    }
  };

  // העברת תמונה למעלה
  const moveImageUp = (index: number) => {
    if (index === 0) return;
    
    const updatedImages = [...images];
    [updatedImages[index], updatedImages[index - 1]] = [updatedImages[index - 1], updatedImages[index]];
    
    // עדכון positions
    const reindexedImages = updatedImages.map((img, i) => ({
      ...img,
      position: i + 1
    }));
    onChange(reindexedImages);
  };

  // העברת תמונה למטה
  const moveImageDown = (index: number) => {
    if (index === images.length - 1) return;
    
    const updatedImages = [...images];
    [updatedImages[index], updatedImages[index + 1]] = [updatedImages[index + 1], updatedImages[index]];
    
    // עדכון positions
    const reindexedImages = updatedImages.map((img, i) => ({
      ...img,
      position: i + 1
    }));
    onChange(reindexedImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-[#101828]">תמונות נוספות למאמר</h4>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {images.length} / {maxImages} תמונות
          </Badge>
          <Button
            type="button"
            onClick={addImage}
            disabled={images.length >= maxImages}
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            הוסף תמונה
          </Button>
        </div>
      </div>

      {images.length === 0 && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-8 text-center">
            <FileImage className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              לא נוספו תמונות נוספות למאמר זה
            </p>
            <Button onClick={addImage} variant="outline">
              <Plus className="h-4 w-4 ml-2" />
              הוסף תמונה ראשונה
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {images.map((image, index) => (
          <Card key={image.id} className="border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Badge className="bg-[#101828] text-white">
                    מיקום #{index + 1}
                  </Badge>
                  <span>תמונה במאמר</span>
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => moveImageUp(index)}
                    disabled={index === 0}
                    title="העבר למעלה"
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => moveImageDown(index)}
                    disabled={index === images.length - 1}
                    title="העבר למטה"
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => removeImage(index)}
                    title="מחק תמונה"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* העלאת תמונה מקומית או החלפה */}
              {!image.url ? (
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                    dragOverIndex === index 
                      ? 'border-[#101828] bg-blue-50 scale-105' 
                      : 'border-gray-300 hover:border-[#101828] hover:bg-gray-50'
                  }`}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <div className="space-y-4">
                    {uploadingIndex === index ? (
                      <div className="space-y-3">
                        <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-[#101828] mx-auto"></div>
                        <p className="text-sm font-medium text-[#101828]">מעלה תמונה...</p>
                        <p className="text-xs text-gray-500">אנא המתן, התמונה נטענת</p>
                      </div>
                    ) : (
                      <>
                        <FileImage className={`h-12 w-12 mx-auto transition-colors ${
                          dragOverIndex === index ? 'text-[#101828]' : 'text-gray-400'
                        }`} />
                        <div>
                          <p className={`text-sm font-medium transition-colors ${
                            dragOverIndex === index ? 'text-[#101828]' : 'text-gray-900'
                          }`}>
                            {dragOverIndex === index ? 'שחרר תמונה כאן' : 'העלה תמונה למאמר'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            גרור תמונה לכאן או לחץ לבחירת קובץ
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            פורמטים: JPG, PNG, WebP (עד 5MB)
                          </p>
                        </div>
                        <label className="inline-flex cursor-pointer">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="pointer-events-none bg-[#101828] text-white hover:bg-[#905e26]"
                          >
                            <Upload className="h-4 w-4 ml-2" />
                            בחר תמונה
                          </Button>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload(index, file);
                              }
                            }}
                            className="sr-only"
                          />
                        </label>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* תצוגה מקדימה של התמונה */}
                  <div className="flex items-center justify-between">
                    <Label>תצוגה מקדימה</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewImage(image.url)}
                        title="הגדל תצוגה"
                      >
                        <Eye className="h-3 w-3 ml-1" />
                        הגדל
                      </Button>
                      <label className="cursor-pointer">
                        <Button
                          type="button"
                          variant="outline" 
                          size="sm"
                          className="pointer-events-none text-xs"
                          disabled={uploadingIndex === index}
                        >
                          <Upload className="h-3 w-3 ml-1" />
                          החלף תמונה
                        </Button>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(index, file);
                            }
                          }}
                          className="sr-only"
                          disabled={uploadingIndex === index}
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <ImageWithFallback
                      src={image.url}
                      alt={image.alt || 'תמונה ללא תיאור'}
                      className="w-full max-w-md h-40 object-cover rounded-lg shadow-sm mx-auto transition-all duration-300 group-hover:shadow-md"
                    />
                    
                    {/* מעמעם בזמן העלאה */}
                    {uploadingIndex === index && (
                      <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-[#101828] mx-auto mb-2"></div>
                          <p className="text-sm text-gray-600">מחליף תמונה...</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Drag & Drop על תמונה קיימת */}
                    <div 
                      className={`absolute inset-0 rounded-lg transition-all duration-200 ${
                        dragOverIndex === index 
                          ? 'bg-[#101828]/20 border-2 border-[#101828] border-dashed' 
                          : 'opacity-0 group-hover:opacity-100 bg-black/10'
                      }`}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      {dragOverIndex === index && (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center text-[#101828]">
                            <Upload className="h-6 w-6 mx-auto mb-1" />
                            <p className="text-sm font-medium">שחרר להחלפה</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* פרטי התמונה */}
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label>טקסט חלופי (Alt Text) *</Label>
                  <Input
                    value={image.alt}
                    onChange={(e) => updateImage(index, 'alt', e.target.value)}
                    placeholder="תיאור התמונה לנגישות (חובה)"
                    className="text-right"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    תיאור התמונה לנגישות ומנועי חיפוש
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>כיתוב התמונה</Label>
                  <Textarea
                    value={image.caption}
                    onChange={(e) => updateImage(index, 'caption', e.target.value)}
                    placeholder="כיתוב שיוצג מתחת לתמונה במאמר (אופציונלי)"
                    className="text-right resize-none"
                    rows={2}
                  />
                </div>
              </div>

              {/* הצגת כיתוב אם קיים */}
              {image.caption && image.url && (
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-600 italic">
                    כיתוב: "{image.caption}"
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* הסברים על השימוש */}
      {images.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm">💡</span>
              </div>
              <div className="text-right">
                <h5 className="font-semibold text-blue-800 mb-2">איך זה עובד?</h5>
                <div className="text-blue-700 text-sm leading-relaxed space-y-2">
                  <p>
                    <strong>📍 מיקום התמונות:</strong> התמונות יופיעו במאמר לפי הסדר שקבעת.
                    תמונה במיקום #1 תופיע ראשונה, #2 שנייה, וכן הלאה.
                  </p>
                  <p>
                    <strong>🔄 שינוי סדר:</strong> השתמש בחצים ↑↓ לשינוי סדר התמונות בכל עת.
                  </p>
                  <p>
                    <strong>📱 העלאה מקומית:</strong> העלה תמונות ישירות מהמחשב שלך.
                    הן יישמרו במערכת ויוצגו במאמר באופן מיידי.
                  </p>
                  <p>
                    <strong>🎨 כיתובים:</strong> כל תמונה יכולה לכלול כיתוב שיוצג מתחתיה במאמר.
                  </p>
                  <p>
                    <strong>🔍 נגישות:</strong> הטקסט החלופי חשוב לנגישות ולמנועי חיפוש.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal להגדלת תמונה */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <ImageWithFallback
              src={previewImage}
              alt="תצוגה מוגדלת"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            <Button
              className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
              onClick={() => setPreviewImage(null)}
              size="sm"
            >
              ✕
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};