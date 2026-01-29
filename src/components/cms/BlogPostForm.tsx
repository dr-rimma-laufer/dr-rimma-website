import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Save, X, Upload } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';
import { BlogImageManager } from './BlogImageManager';
import { ImageUploadInstructions } from './ImageUploadInstructions';
import { contentAPI } from '../../utils/supabase/client';

interface BlogPostFormProps {
  post?: any;
  onSave: (type: string, data: any) => void;
  onCancel: () => void;
  setError: (error: string) => void;
  setSuccess: (success: string) => void;
  isLoading: boolean;
}

export const BlogPostForm: React.FC<BlogPostFormProps> = ({
  post,
  onSave,
  onCancel,
  setError,
  setSuccess,
  isLoading
}) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    author: post?.author || 'ד"ר רימה לאופר',
    category: post?.category || 'השתלות שיער',
    tags: post?.tags?.join(', ') || '',
    image: post?.image || 'https://images.unsplash.com/photo-1665231795856-769fb08a90bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGFpciUyMHRyZWF0bWVudCUyMGNsaW5pY3xlbnwxfHx8fDE3NTQ5MzA1MTd8MA&ixlib=rb-4.1.0&q=80&w=600',
    readTime: post?.readTime || '5 דקות קריאה',
    views: post?.views || 0,
    featured: post?.featured || false,
    createdAt: post?.createdAt || new Date().toISOString().split('T')[0],
    additionalImages: post?.additionalImages || [],
    order: post?.order || undefined
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(formData.image);

  // Update image preview when formData.image changes
  React.useEffect(() => {
    setImagePreview(formData.image);
  }, [formData.image]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    const postData = { 
      ...formData, 
      tags: tagsArray,
      views: parseInt(formData.views.toString()) || 0,
      order: formData.order || undefined, // וודא שהסדר נכלל
      additionalImages: formData.additionalImages
    };
    
    console.log('Saving post with data:', {
      ...postData,
      additionalImages: postData.additionalImages?.map(img => ({ 
        ...img, 
        url: img.url.substring(0, 50) + '...' 
      }))
    });
    
    onSave('blog', postData);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const result = await contentAPI.uploadImage(file);
      setFormData({ ...formData, image: result.imageUrl });
      setImagePreview(result.imageUrl);
      setSuccess('תמונה הועלתה בהצלחה');
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('שגיאה בהעלאת התמונה');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData({ ...formData, image: url });
    setImagePreview(url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="כותרת הפוסט"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Input
          placeholder="מחבר"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          required
        />
      </div>
      
      <Textarea
        placeholder="תקציר"
        value={formData.excerpt}
        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
        rows={3}
        required
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="קטגוריה"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        />
        <Input
          placeholder="זמן קריאה"
          value={formData.readTime}
          onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
        />
        <Input
          type="number"
          placeholder="מספר צפיות"
          value={formData.views}
          onChange={(e) => setFormData({ ...formData, views: e.target.value })}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">תגיות (מופרדות בפסיקים)</label>
          <Input
            placeholder="תגיות (מופרדות בפסיקים)"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">🔢 סדר הצגה באתר</label>
          <Input
            type="number"
            placeholder="סדר הצגה (מספר נמוך = יופיע ראשון)"
            value={formData.order || ''}
            onChange={(e) => setFormData({ ...formData, order: e.target.value ? parseInt(e.target.value) : undefined })}
            min="1"
            max="999"
          />
          <p className="text-xs text-gray-500 mt-1">
            מספר נמוך = יופיע ראשון באתר (לדוגמה: 1, 2, 3...)
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block flex items-center space-x-reverse space-x-2">
            <Upload className="h-4 w-4" />
            <span>העלאת תמונה מקומית:</span>
          </label>
          <div className="flex items-center space-x-reverse space-x-4">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploadingImage}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#905e26] file:text-white hover:file:bg-[#101828] disabled:file:bg-gray-400"
            />
            {uploadingImage && (
              <span className="text-sm text-gray-500 flex items-center space-x-reverse space-x-1">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-[#905e26]"></div>
                <span>מעלה...</span>
              </span>
            )}
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">או</span>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">URL תמונה (קישור):</label>
          <Input
            placeholder="https://example.com/image.jpg"
            value={formData.image}
            onChange={handleImageUrlChange}
          />
        </div>
        
        {imagePreview && (
          <div className="space-y-2">
            <label className="text-sm font-medium">תצוגה מקדימה:</label>
            <div className="border rounded-lg p-2">
              <img 
                src={imagePreview} 
                alt="תצוגה מקדימה" 
                className="w-full max-w-md h-48 object-cover rounded-lg mx-auto"
                onError={() => {
                  setImagePreview('');
                  setError('שגיאה בטעינת התמונה - וודאו שהקישור תקין');
                }}
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          placeholder="תאריך פרסום"
          value={formData.createdAt}
          onChange={(e) => setFormData({ ...formData, createdAt: e.target.value })}
        />
        <div className="flex items-center space-x-reverse space-x-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="rounded border-gray-300"
          />
          <label htmlFor="featured" className="text-sm font-medium">
            מאמר מומלץ
          </label>
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium block">תוכן הפוסט (עורך טקסט עשיר):</label>
        <RichTextEditor
          value={formData.content}
          onChange={(content) => setFormData({ ...formData, content })}
          placeholder="הזינו את תוכן הפוסט..."
        />
      </div>
      
      {/* מנהל תמונות נוספות */}
      <div className="space-y-4 border-t pt-6">
        <ImageUploadInstructions />
        <BlogImageManager
          images={formData.additionalImages}
          onChange={(additionalImages) => setFormData({ ...formData, additionalImages })}
          maxImages={5}
          onError={setError}
          onSuccess={setSuccess}
        />
      </div>
      
      <div className="flex space-x-reverse space-x-2">
        <Button type="submit" disabled={isLoading}>
          <Save className="h-4 w-4 ml-2" />
          שמירה
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 ml-2" />
          ביטול
        </Button>
      </div>
    </form>
  );
};