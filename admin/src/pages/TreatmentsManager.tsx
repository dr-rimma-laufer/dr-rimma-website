import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Loader2,
  AlertCircle,
  Search,
  Image,
} from 'lucide-react';
import api from '../lib/api';

interface Treatment {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  price: string;
  benefits: string[];
  process: { step: string; description: string }[];
  faq: { question: string; answer: string }[];
  status: 'published' | 'draft';
}

const categories = [
  { value: 'hair-treatments', label: 'טיפולי שיער' },
  { value: 'hair-transplant', label: 'השתלת שיער' },
  { value: 'dermatology', label: 'דרמטולוגיה' },
  { value: 'aesthetics', label: 'אסתטיקה' },
];

const TreatmentsManager: React.FC = () => {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadTreatments();
  }, []);

  const loadTreatments = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.getTreatments();
      if (response.success && response.data) {
        setTreatments(response.data);
      } else {
        // Demo data
        setTreatments([
          {
            id: '1',
            slug: 'prp-treatment',
            title: 'טיפול PRP',
            subtitle: 'פלזמה עשירה בטסיות דם',
            description: 'טיפול PRP (Platelet-Rich Plasma) הוא טיפול מתקדם המשתמש בפלזמה עשירה בטסיות דם מדמו של המטופל עצמו לחידוש והצמחת שיער.',
            image: '/images/treatments/prp.jpg',
            category: 'hair-treatments',
            duration: '60 דקות',
            price: '1,500 ש"ח',
            benefits: ['עידוד צמיחת שיער חדש', 'חיזוק זקיקי שיער', 'תוצאות טבעיות'],
            process: [
              { step: 'שלב 1', description: 'נטילת דם מהמטופל' },
              { step: 'שלב 2', description: 'צנטריפוגה להפרדת הפלזמה' },
              { step: 'שלב 3', description: 'הזרקה לקרקפת' },
            ],
            faq: [
              { question: 'האם הטיפול כואב?', answer: 'הטיפול כולל הזרקות קלות עם הרדמה מקומית' },
            ],
            status: 'published',
          },
          {
            id: '2',
            slug: 'mesotherapy',
            title: 'מזותרפיה',
            subtitle: 'הזרקות ויטמינים לקרקפת',
            description: 'טיפול מזותרפיה כולל הזרקת קוקטייל של ויטמינים ומינרלים ישירות לקרקפת.',
            image: '/images/treatments/mesotherapy.jpg',
            category: 'hair-treatments',
            duration: '45 דקות',
            price: '1,200 ש"ח',
            benefits: ['הזנת זקיקי השיער', 'שיפור זרימת הדם', 'חיזוק השיער'],
            process: [],
            faq: [],
            status: 'published',
          },
          {
            id: '3',
            slug: 'fue-transplant',
            title: 'השתלת שיער FUE',
            subtitle: 'השתלה בשיטת FUE',
            description: 'השתלת שיער בשיטת FUE היא הטכניקה המתקדמת ביותר להשתלת שיער.',
            image: '/images/treatments/fue.jpg',
            category: 'hair-transplant',
            duration: '6-8 שעות',
            price: 'החל מ-15,000 ש"ח',
            benefits: ['ללא צלקות', 'תוצאות טבעיות', 'החלמה מהירה'],
            process: [],
            faq: [],
            status: 'published',
          },
        ]);
      }
    } catch (err) {
      setError('שגיאה בטעינת הטיפולים');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedTreatment({
      id: '',
      slug: '',
      title: '',
      subtitle: '',
      description: '',
      image: '',
      category: 'hair-treatments',
      duration: '',
      price: '',
      benefits: [],
      process: [],
      faq: [],
      status: 'draft',
    });
    setIsEditing(true);
  };

  const handleEdit = (treatment: Treatment) => {
    setSelectedTreatment({ ...treatment });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!selectedTreatment) return;

    setIsSaving(true);
    try {
      if (selectedTreatment.id) {
        await api.updateTreatment(selectedTreatment.id, selectedTreatment);
        setTreatments(treatments.map((t) => (t.id === selectedTreatment.id ? selectedTreatment : t)));
      } else {
        const newTreatment = { ...selectedTreatment, id: `treatment-${Date.now()}` };
        await api.createTreatment(newTreatment);
        setTreatments([...treatments, newTreatment]);
      }
      setIsEditing(false);
      setSelectedTreatment(null);
    } catch (err) {
      setError('שגיאה בשמירת הטיפול');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedTreatment) return;

    try {
      await api.deleteTreatment(selectedTreatment.id);
      setTreatments(treatments.filter((t) => t.id !== selectedTreatment.id));
      setShowDeleteModal(false);
      setSelectedTreatment(null);
    } catch (err) {
      setError('שגיאה במחיקת הטיפול');
    }
  };

  const handleAddBenefit = () => {
    if (!selectedTreatment) return;
    setSelectedTreatment({
      ...selectedTreatment,
      benefits: [...selectedTreatment.benefits, ''],
    });
  };

  const handleUpdateBenefit = (index: number, value: string) => {
    if (!selectedTreatment) return;
    const updated = [...selectedTreatment.benefits];
    updated[index] = value;
    setSelectedTreatment({ ...selectedTreatment, benefits: updated });
  };

  const handleRemoveBenefit = (index: number) => {
    if (!selectedTreatment) return;
    setSelectedTreatment({
      ...selectedTreatment,
      benefits: selectedTreatment.benefits.filter((_, i) => i !== index),
    });
  };

  const filteredTreatments = treatments.filter((treatment) => {
    const matchesSearch =
      treatment.title.includes(searchTerm) || treatment.description.includes(searchTerm);
    const matchesCategory = !filterCategory || treatment.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

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
          <h1 className="text-2xl font-bold text-gray-900">ניהול טיפולים</h1>
          <p className="text-gray-600">הוסף וערוך טיפולים</p>
        </div>
        <button onClick={handleCreate} className="btn btn-primary flex items-center gap-2">
          <Plus size={20} />
          טיפול חדש
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

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="חפש טיפול..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
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
      </div>

      {/* Treatments Grid */}
      {!isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreatments.map((treatment) => (
            <div key={treatment.id} className="card">
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                {treatment.image ? (
                  <img
                    src={treatment.image}
                    alt={treatment.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image size={40} className="text-gray-300" />
                )}
              </div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{treatment.title}</h3>
                <span
                  className={`badge ${
                    treatment.status === 'published' ? 'badge-success' : 'badge-warning'
                  }`}
                >
                  {treatment.status === 'published' ? 'מפורסם' : 'טיוטה'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-2">{treatment.subtitle}</p>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">{treatment.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <span className="badge badge-info">
                  {categories.find((c) => c.value === treatment.category)?.label}
                </span>
                <span>{treatment.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(treatment)}
                  className="btn btn-secondary flex-1 flex items-center justify-center gap-1"
                >
                  <Edit size={16} />
                  ערוך
                </button>
                <button
                  onClick={() => {
                    setSelectedTreatment(treatment);
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
      {isEditing && selectedTreatment && (
        <div className="card">
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <h2 className="text-xl font-semibold">
              {selectedTreatment.id ? 'עריכת טיפול' : 'טיפול חדש'}
            </h2>
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedTreatment(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">כותרת</label>
              <input
                type="text"
                value={selectedTreatment.title}
                onChange={(e) =>
                  setSelectedTreatment({ ...selectedTreatment, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                value={selectedTreatment.slug}
                onChange={(e) =>
                  setSelectedTreatment({ ...selectedTreatment, slug: e.target.value })
                }
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">כותרת משנה</label>
              <input
                type="text"
                value={selectedTreatment.subtitle}
                onChange={(e) =>
                  setSelectedTreatment({ ...selectedTreatment, subtitle: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">קטגוריה</label>
              <select
                value={selectedTreatment.category}
                onChange={(e) =>
                  setSelectedTreatment({ ...selectedTreatment, category: e.target.value })
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
              <label className="block text-sm font-medium text-gray-700 mb-1">משך הטיפול</label>
              <input
                type="text"
                value={selectedTreatment.duration}
                onChange={(e) =>
                  setSelectedTreatment({ ...selectedTreatment, duration: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">מחיר</label>
              <input
                type="text"
                value={selectedTreatment.price}
                onChange={(e) =>
                  setSelectedTreatment({ ...selectedTreatment, price: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">תיאור</label>
              <textarea
                rows={4}
                value={selectedTreatment.description}
                onChange={(e) =>
                  setSelectedTreatment({ ...selectedTreatment, description: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">תמונה (URL)</label>
              <input
                type="text"
                value={selectedTreatment.image}
                onChange={(e) =>
                  setSelectedTreatment({ ...selectedTreatment, image: e.target.value })
                }
                dir="ltr"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">יתרונות</label>
              <div className="space-y-2">
                {selectedTreatment.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => handleUpdateBenefit(index, e.target.value)}
                      className="flex-1"
                    />
                    <button
                      onClick={() => handleRemoveBenefit(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddBenefit}
                  className="text-primary-600 text-sm flex items-center gap-1"
                >
                  <Plus size={16} />
                  הוסף יתרון
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">סטטוס</label>
              <select
                value={selectedTreatment.status}
                onChange={(e) =>
                  setSelectedTreatment({
                    ...selectedTreatment,
                    status: e.target.value as 'published' | 'draft',
                  })
                }
              >
                <option value="draft">טיוטה</option>
                <option value="published">מפורסם</option>
              </select>
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
                setSelectedTreatment(null);
              }}
              className="btn btn-secondary"
            >
              ביטול
            </button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal-backdrop" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">מחיקת טיפול</h3>
            <p className="text-gray-600 mb-6">
              האם אתה בטוח שברצונך למחוק את הטיפול "{selectedTreatment?.title}"?
            </p>
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

export default TreatmentsManager;
