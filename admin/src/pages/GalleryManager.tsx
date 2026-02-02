import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  X,
  Loader2,
  AlertCircle,
  Image,
  Upload,
  Edit,
  Save,
  Eye,
} from 'lucide-react';
import api from '../lib/api';

interface GalleryItem {
  id: string;
  beforeImage: string;
  afterImage: string;
  title: string;
  description: string;
  category: string;
  treatmentType: string;
  isPublished: boolean;
  order: number;
}

const categories = [
  { value: 'hair-transplant', label: 'השתלת שיער' },
  { value: 'prp', label: 'טיפול PRP' },
  { value: 'mesotherapy', label: 'מזותרפיה' },
  { value: 'laser', label: 'לייזר' },
  { value: 'other', label: 'אחר' },
];

const GalleryManager: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.getGalleryItems();
      if (response.success && response.data) {
        setItems(response.data);
      } else {
        // Demo data
        setItems([
          {
            id: '1',
            beforeImage: '/images/gallery/before1.jpg',
            afterImage: '/images/gallery/after1.jpg',
            title: 'השתלת שיער - מטופל 1',
            description: 'תוצאות לאחר 12 חודשים מהשתלה בשיטת FUE',
            category: 'hair-transplant',
            treatmentType: 'FUE',
            isPublished: true,
            order: 0,
          },
          {
            id: '2',
            beforeImage: '/images/gallery/before2.jpg',
            afterImage: '/images/gallery/after2.jpg',
            title: 'טיפול PRP - מטופלת 2',
            description: 'תוצאות לאחר 6 טיפולי PRP',
            category: 'prp',
            treatmentType: 'PRP',
            isPublished: true,
            order: 1,
          },
          {
            id: '3',
            beforeImage: '/images/gallery/before3.jpg',
            afterImage: '/images/gallery/after3.jpg',
            title: 'מזותרפיה - מטופל 3',
            description: 'תוצאות לאחר סדרת טיפולי מזותרפיה',
            category: 'mesotherapy',
            treatmentType: 'Mesotherapy',
            isPublished: true,
            order: 2,
          },
        ]);
      }
    } catch (err) {
      setError('שגיאה בטעינת הגלריה');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedItem({
      id: '',
      beforeImage: '',
      afterImage: '',
      title: '',
      description: '',
      category: 'hair-transplant',
      treatmentType: '',
      isPublished: false,
      order: items.length,
    });
    setIsEditing(true);
  };

  const handleEdit = (item: GalleryItem) => {
    setSelectedItem({ ...item });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!selectedItem) return;

    setIsSaving(true);
    try {
      if (selectedItem.id) {
        await api.updateGalleryItem(selectedItem.id, selectedItem);
        setItems(items.map((i) => (i.id === selectedItem.id ? selectedItem : i)));
      } else {
        const newItem = { ...selectedItem, id: `gallery-${Date.now()}` };
        await api.createGalleryItem(newItem);
        setItems([...items, newItem]);
      }
      setIsEditing(false);
      setSelectedItem(null);
    } catch (err) {
      setError('שגיאה בשמירת הפריט');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      await api.deleteGalleryItem(selectedItem.id);
      setItems(items.filter((i) => i.id !== selectedItem.id));
      setShowDeleteModal(false);
      setSelectedItem(null);
    } catch (err) {
      setError('שגיאה במחיקת הפריט');
    }
  };

  const filteredItems = items.filter(
    (item) => !filterCategory || item.category === filterCategory
  );

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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">גלריה לפני/אחרי</h1>
          <p className="text-gray-600">נהל תמונות לפני ואחרי טיפול</p>
        </div>
        <button onClick={handleCreate} className="btn btn-primary flex items-center gap-2">
          <Plus size={20} />
          פריט חדש
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-red-700">{error}</p>
          <button onClick={() => setError(null)} className="mr-auto">
            <X size={18} className="text-red-500" />
          </button>
        </div>
      )}

      {/* Filter */}
      {!isEditing && (
        <div className="card mb-6">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="md:w-48"
          >
            <option value="">כל הקטגוריות</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Gallery Grid */}
      {!isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="card">
              {/* Before/After Images */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="relative">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    {item.beforeImage ? (
                      <img
                        src={item.beforeImage}
                        alt="לפני"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image size={24} className="text-gray-300" />
                      </div>
                    )}
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                    לפני
                  </span>
                </div>
                <div className="relative">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    {item.afterImage ? (
                      <img
                        src={item.afterImage}
                        alt="אחרי"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image size={24} className="text-gray-300" />
                      </div>
                    )}
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                    אחרי
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <span
                  className={`badge ${item.isPublished ? 'badge-success' : 'badge-warning'}`}
                >
                  {item.isPublished ? 'מפורסם' : 'טיוטה'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
              <span className="badge badge-info">
                {categories.find((c) => c.value === item.category)?.label}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                <button
                  onClick={() => setPreviewItem(item)}
                  className="btn btn-secondary flex-1 flex items-center justify-center gap-1"
                >
                  <Eye size={16} />
                  תצוגה
                </button>
                <button
                  onClick={() => handleEdit(item)}
                  className="btn btn-secondary flex-1 flex items-center justify-center gap-1"
                >
                  <Edit size={16} />
                  ערוך
                </button>
                <button
                  onClick={() => {
                    setSelectedItem(item);
                    setShowDeleteModal(true);
                  }}
                  className="btn btn-danger p-2"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Form */}
      {isEditing && selectedItem && (
        <div className="card">
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <h2 className="text-xl font-semibold">
              {selectedItem.id ? 'עריכת פריט' : 'פריט חדש'}
            </h2>
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedItem(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">תמונה לפני</label>
              <div className="aspect-square bg-gray-100 rounded-lg mb-2 overflow-hidden">
                {selectedItem.beforeImage ? (
                  <img
                    src={selectedItem.beforeImage}
                    alt="לפני"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Upload size={32} className="text-gray-300" />
                  </div>
                )}
              </div>
              <input
                type="text"
                placeholder="URL תמונה"
                value={selectedItem.beforeImage}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, beforeImage: e.target.value })
                }
                dir="ltr"
              />
            </div>

            {/* After Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">תמונה אחרי</label>
              <div className="aspect-square bg-gray-100 rounded-lg mb-2 overflow-hidden">
                {selectedItem.afterImage ? (
                  <img
                    src={selectedItem.afterImage}
                    alt="אחרי"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Upload size={32} className="text-gray-300" />
                  </div>
                )}
              </div>
              <input
                type="text"
                placeholder="URL תמונה"
                value={selectedItem.afterImage}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, afterImage: e.target.value })
                }
                dir="ltr"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">כותרת</label>
              <input
                type="text"
                value={selectedItem.title}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, title: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">תיאור</label>
              <textarea
                rows={3}
                value={selectedItem.description}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, description: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">קטגוריה</label>
              <select
                value={selectedItem.category}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, category: e.target.value })
                }
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">סוג טיפול</label>
              <input
                type="text"
                value={selectedItem.treatmentType}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, treatmentType: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedItem.isPublished}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, isPublished: e.target.checked })
                  }
                  className="w-5 h-5 rounded"
                />
                <span className="text-sm font-medium text-gray-700">מפורסם</span>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6 pt-4 border-t">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn btn-primary flex items-center gap-2"
            >
              {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              שמור
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedItem(null);
              }}
              className="btn btn-secondary"
            >
              ביטול
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isEditing && filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Image size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">לא נמצאו פריטים בגלריה</p>
        </div>
      )}

      {/* Preview Modal */}
      {previewItem && (
        <div className="modal-backdrop" onClick={() => setPreviewItem(null)}>
          <div className="modal-content p-6 max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{previewItem.title}</h3>
              <button
                onClick={() => setPreviewItem(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-2 text-center">לפני</p>
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={previewItem.beforeImage}
                    alt="לפני"
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2 text-center">אחרי</p>
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={previewItem.afterImage}
                    alt="אחרי"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-600">{previewItem.description}</p>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal-backdrop" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">מחיקת פריט</h3>
            <p className="text-gray-600 mb-6">האם אתה בטוח שברצונך למחוק פריט זה מהגלריה?</p>
            <div className="flex items-center gap-3">
              <button onClick={handleDelete} className="btn btn-danger">
                מחק
              </button>
              <button onClick={() => setShowDeleteModal(false)} className="btn btn-secondary">
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
