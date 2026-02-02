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
  Stethoscope,
} from 'lucide-react';
import api from '../lib/api';

interface Condition {
  id: string;
  slug: string;
  name: string;
  hebrewName: string;
  description: string;
  causes: string[];
  symptoms: string[];
  treatments: string[];
  image: string;
  category: string;
  status: 'published' | 'draft';
}

const categories = [
  { value: 'scarring', label: 'התקרחות צלקתית' },
  { value: 'non-scarring', label: 'התקרחות לא צלקתית' },
  { value: 'inflammatory', label: 'דלקתי' },
  { value: 'autoimmune', label: 'אוטואימוני' },
  { value: 'other', label: 'אחר' },
];

const ConditionsManager: React.FC = () => {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadConditions();
  }, []);

  const loadConditions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.getConditions();
      if (response.success && response.data) {
        setConditions(response.data);
      } else {
        // Demo data
        setConditions([
          {
            id: '1',
            slug: 'alopecia-areata',
            name: 'Alopecia Areata',
            hebrewName: 'התקרחות אזורית',
            description: 'מחלה אוטואימונית הגורמת לנשירת שיער בצורת כתמים עגולים.',
            causes: ['מערכת חיסון תוקפת זקיקי שיער', 'גורמים גנטיים', 'לחץ נפשי'],
            symptoms: ['כתמים עגולים חלקים', 'נשירה פתאומית', 'שיער שביר בשוליים'],
            treatments: ['טיפול PRP', 'הזרקות סטרואידים', 'אימונותרפיה מקומית'],
            image: '/images/conditions/alopecia-areata.jpg',
            category: 'autoimmune',
            status: 'published',
          },
          {
            id: '2',
            slug: 'lichen-planopilaris',
            name: 'Lichen Planopilaris',
            hebrewName: 'ליכן פלנופילריס',
            description: 'סוג של התקרחות צלקתית הגורמת להרס קבוע של זקיקי השיער.',
            causes: ['מחלה אוטואימונית', 'דלקת כרונית'],
            symptoms: ['אודם סביב זקיקי השיער', 'גרד', 'צלקות'],
            treatments: ['טיפול מקומי', 'תרופות אנטי-דלקתיות'],
            image: '/images/conditions/lpp.jpg',
            category: 'scarring',
            status: 'published',
          },
          {
            id: '3',
            slug: 'seborrheic-dermatitis',
            name: 'Seborrheic Dermatitis',
            hebrewName: 'דרמטיטיס סבוראית',
            description: 'מצב עורי נפוץ הגורם לקשקשים ואדמומיות בקרקפת.',
            causes: ['פטריית מלססיה', 'ייצור יתר של שומן', 'לחץ'],
            symptoms: ['קשקשים', 'אדמומיות', 'גרד'],
            treatments: ['שמפו מיוחד', 'טיפול אנטי-פטרייתי'],
            image: '/images/conditions/seborrheic.jpg',
            category: 'inflammatory',
            status: 'published',
          },
        ]);
      }
    } catch (err) {
      setError('שגיאה בטעינת המצבים הרפואיים');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedCondition({
      id: '',
      slug: '',
      name: '',
      hebrewName: '',
      description: '',
      causes: [],
      symptoms: [],
      treatments: [],
      image: '',
      category: 'other',
      status: 'draft',
    });
    setIsEditing(true);
  };

  const handleEdit = (condition: Condition) => {
    setSelectedCondition({ ...condition });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!selectedCondition) return;

    setIsSaving(true);
    try {
      if (selectedCondition.id) {
        await api.updateCondition(selectedCondition.id, selectedCondition);
        setConditions(
          conditions.map((c) =>
            c.id === selectedCondition.id ? selectedCondition : c
          )
        );
      } else {
        const newCondition = { ...selectedCondition, id: `condition-${Date.now()}` };
        await api.createCondition(newCondition);
        setConditions([...conditions, newCondition]);
      }
      setIsEditing(false);
      setSelectedCondition(null);
    } catch (err) {
      setError('שגיאה בשמירת המצב הרפואי');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCondition) return;

    try {
      await api.deleteCondition(selectedCondition.id);
      setConditions(conditions.filter((c) => c.id !== selectedCondition.id));
      setShowDeleteModal(false);
      setSelectedCondition(null);
    } catch (err) {
      setError('שגיאה במחיקת המצב הרפואי');
    }
  };

  const handleAddListItem = (field: 'causes' | 'symptoms' | 'treatments') => {
    if (!selectedCondition) return;
    setSelectedCondition({
      ...selectedCondition,
      [field]: [...selectedCondition[field], ''],
    });
  };

  const handleUpdateListItem = (
    field: 'causes' | 'symptoms' | 'treatments',
    index: number,
    value: string
  ) => {
    if (!selectedCondition) return;
    const updated = [...selectedCondition[field]];
    updated[index] = value;
    setSelectedCondition({ ...selectedCondition, [field]: updated });
  };

  const handleRemoveListItem = (
    field: 'causes' | 'symptoms' | 'treatments',
    index: number
  ) => {
    if (!selectedCondition) return;
    setSelectedCondition({
      ...selectedCondition,
      [field]: selectedCondition[field].filter((_, i) => i !== index),
    });
  };

  const filteredConditions = conditions.filter((condition) => {
    const matchesSearch =
      condition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      condition.hebrewName.includes(searchTerm);
    const matchesCategory = !filterCategory || condition.category === filterCategory;
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
          <h1 className="text-2xl font-bold text-gray-900">מצבים רפואיים</h1>
          <p className="text-gray-600">נהל מידע על מחלות וסינדרומים</p>
        </div>
        <button onClick={handleCreate} className="btn btn-primary flex items-center gap-2">
          <Plus size={20} />
          מצב חדש
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
      {!isEditing && (
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="חפש מצב רפואי..."
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
      )}

      {/* Conditions Grid */}
      {!isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConditions.map((condition) => (
            <div key={condition.id} className="card">
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                {condition.image ? (
                  <img
                    src={condition.image}
                    alt={condition.hebrewName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Stethoscope size={40} className="text-gray-300" />
                )}
              </div>

              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{condition.hebrewName}</h3>
                  <p className="text-sm text-gray-500">{condition.name}</p>
                </div>
                <span
                  className={`badge ${
                    condition.status === 'published' ? 'badge-success' : 'badge-warning'
                  }`}
                >
                  {condition.status === 'published' ? 'מפורסם' : 'טיוטה'}
                </span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {condition.description}
              </p>

              <span className="badge badge-info">
                {categories.find((c) => c.value === condition.category)?.label}
              </span>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                <button
                  onClick={() => handleEdit(condition)}
                  className="btn btn-secondary flex-1 flex items-center justify-center gap-1"
                >
                  <Edit size={16} />
                  ערוך
                </button>
                <button
                  onClick={() => {
                    setSelectedCondition(condition);
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
      {isEditing && selectedCondition && (
        <div className="card">
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <h2 className="text-xl font-semibold">
              {selectedCondition.id ? 'עריכת מצב רפואי' : 'מצב רפואי חדש'}
            </h2>
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedCondition(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                שם באנגלית
              </label>
              <input
                type="text"
                value={selectedCondition.name}
                onChange={(e) =>
                  setSelectedCondition({ ...selectedCondition, name: e.target.value })
                }
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                שם בעברית
              </label>
              <input
                type="text"
                value={selectedCondition.hebrewName}
                onChange={(e) =>
                  setSelectedCondition({ ...selectedCondition, hebrewName: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                value={selectedCondition.slug}
                onChange={(e) =>
                  setSelectedCondition({ ...selectedCondition, slug: e.target.value })
                }
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">קטגוריה</label>
              <select
                value={selectedCondition.category}
                onChange={(e) =>
                  setSelectedCondition({ ...selectedCondition, category: e.target.value })
                }
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">תיאור</label>
              <textarea
                rows={4}
                value={selectedCondition.description}
                onChange={(e) =>
                  setSelectedCondition({ ...selectedCondition, description: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                תמונה (URL)
              </label>
              <input
                type="text"
                value={selectedCondition.image}
                onChange={(e) =>
                  setSelectedCondition({ ...selectedCondition, image: e.target.value })
                }
                dir="ltr"
              />
            </div>

            {/* Causes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">גורמים</label>
              <div className="space-y-2">
                {selectedCondition.causes.map((cause, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={cause}
                      onChange={(e) =>
                        handleUpdateListItem('causes', index, e.target.value)
                      }
                      className="flex-1"
                    />
                    <button
                      onClick={() => handleRemoveListItem('causes', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddListItem('causes')}
                  className="text-primary-600 text-sm flex items-center gap-1"
                >
                  <Plus size={16} />
                  הוסף גורם
                </button>
              </div>
            </div>

            {/* Symptoms */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">תסמינים</label>
              <div className="space-y-2">
                {selectedCondition.symptoms.map((symptom, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={symptom}
                      onChange={(e) =>
                        handleUpdateListItem('symptoms', index, e.target.value)
                      }
                      className="flex-1"
                    />
                    <button
                      onClick={() => handleRemoveListItem('symptoms', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddListItem('symptoms')}
                  className="text-primary-600 text-sm flex items-center gap-1"
                >
                  <Plus size={16} />
                  הוסף תסמין
                </button>
              </div>
            </div>

            {/* Treatments */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">טיפולים</label>
              <div className="space-y-2">
                {selectedCondition.treatments.map((treatment, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={treatment}
                      onChange={(e) =>
                        handleUpdateListItem('treatments', index, e.target.value)
                      }
                      className="flex-1"
                    />
                    <button
                      onClick={() => handleRemoveListItem('treatments', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddListItem('treatments')}
                  className="text-primary-600 text-sm flex items-center gap-1"
                >
                  <Plus size={16} />
                  הוסף טיפול
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">סטטוס</label>
              <select
                value={selectedCondition.status}
                onChange={(e) =>
                  setSelectedCondition({
                    ...selectedCondition,
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
                setSelectedCondition(null);
              }}
              className="btn btn-secondary"
            >
              ביטול
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isEditing && filteredConditions.length === 0 && (
        <div className="text-center py-12">
          <Stethoscope size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">לא נמצאו מצבים רפואיים</p>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal-backdrop" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">מחיקת מצב רפואי</h3>
            <p className="text-gray-600 mb-6">
              האם אתה בטוח שברצונך למחוק את "{selectedCondition?.hebrewName}"?
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

export default ConditionsManager;
