import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Loader2,
  AlertCircle,
  Star,
  MessageSquare,
  User,
} from 'lucide-react';
import api from '../lib/api';

interface Testimonial {
  id: string;
  name: string;
  treatment: string;
  content: string;
  rating: number;
  image: string;
  date: string;
  isApproved: boolean;
  isFeatured: boolean;
}

const TestimonialsManager: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.getTestimonials();
      if (response.success && response.data) {
        setTestimonials(response.data);
      } else {
        // Demo data
        setTestimonials([
          {
            id: '1',
            name: 'שרה כ.',
            treatment: 'השתלת שיער FUE',
            content: 'התוצאות מדהימות! הצוות היה מקצועי ותומך לאורך כל הדרך. ממליצה בחום!',
            rating: 5,
            image: '',
            date: '2025-01-10',
            isApproved: true,
            isFeatured: true,
          },
          {
            id: '2',
            name: 'דוד מ.',
            treatment: 'טיפול PRP',
            content: 'לאחר 6 טיפולים ראיתי שיפור משמעותי בצפיפות השיער. מרוצה מאוד מהשירות.',
            rating: 5,
            image: '',
            date: '2025-01-05',
            isApproved: true,
            isFeatured: false,
          },
          {
            id: '3',
            name: 'יעל ש.',
            treatment: 'מזותרפיה',
            content: 'טיפול מעולה, השיער נראה הרבה יותר בריא ומלא. ד"ר רימה מקצוענית אמיתית.',
            rating: 4,
            image: '',
            date: '2024-12-20',
            isApproved: true,
            isFeatured: false,
          },
          {
            id: '4',
            name: 'אבי נ.',
            treatment: 'השתלת שיער',
            content: 'חוויה מצוינת מההתחלה ועד הסוף. ממתין לתוצאות המלאות.',
            rating: 5,
            image: '',
            date: '2024-12-15',
            isApproved: false,
            isFeatured: false,
          },
        ]);
      }
    } catch (err) {
      setError('שגיאה בטעינת ההמלצות');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedTestimonial({
      id: '',
      name: '',
      treatment: '',
      content: '',
      rating: 5,
      image: '',
      date: new Date().toISOString().split('T')[0],
      isApproved: false,
      isFeatured: false,
    });
    setIsEditing(true);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setSelectedTestimonial({ ...testimonial });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!selectedTestimonial) return;

    setIsSaving(true);
    try {
      if (selectedTestimonial.id) {
        await api.updateTestimonial(selectedTestimonial.id, selectedTestimonial);
        setTestimonials(
          testimonials.map((t) =>
            t.id === selectedTestimonial.id ? selectedTestimonial : t
          )
        );
      } else {
        const newTestimonial = { ...selectedTestimonial, id: `testimonial-${Date.now()}` };
        await api.createTestimonial(newTestimonial);
        setTestimonials([...testimonials, newTestimonial]);
      }
      setIsEditing(false);
      setSelectedTestimonial(null);
    } catch (err) {
      setError('שגיאה בשמירת ההמלצה');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedTestimonial) return;

    try {
      await api.deleteTestimonial(selectedTestimonial.id);
      setTestimonials(testimonials.filter((t) => t.id !== selectedTestimonial.id));
      setShowDeleteModal(false);
      setSelectedTestimonial(null);
    } catch (err) {
      setError('שגיאה במחיקת ההמלצה');
    }
  };

  const handleToggleApproved = async (testimonial: Testimonial) => {
    const updated = { ...testimonial, isApproved: !testimonial.isApproved };
    try {
      await api.updateTestimonial(testimonial.id, updated);
      setTestimonials(testimonials.map((t) => (t.id === testimonial.id ? updated : t)));
    } catch (err) {
      setError('שגיאה בעדכון ההמלצה');
    }
  };

  const handleToggleFeatured = async (testimonial: Testimonial) => {
    const updated = { ...testimonial, isFeatured: !testimonial.isFeatured };
    try {
      await api.updateTestimonial(testimonial.id, updated);
      setTestimonials(testimonials.map((t) => (t.id === testimonial.id ? updated : t)));
    } catch (err) {
      setError('שגיאה בעדכון ההמלצה');
    }
  };

  const renderStars = (rating: number, editable = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!editable}
            onClick={() =>
              editable &&
              selectedTestimonial &&
              setSelectedTestimonial({ ...selectedTestimonial, rating: star })
            }
            className={`${editable ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <Star
              size={20}
              className={star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
            />
          </button>
        ))}
      </div>
    );
  };

  const filteredTestimonials = testimonials.filter((t) => {
    if (filterStatus === 'approved') return t.isApproved;
    if (filterStatus === 'pending') return !t.isApproved;
    if (filterStatus === 'featured') return t.isFeatured;
    return true;
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
          <h1 className="text-2xl font-bold text-gray-900">המלצות</h1>
          <p className="text-gray-600">נהל המלצות מלקוחות</p>
        </div>
        <button onClick={handleCreate} className="btn btn-primary flex items-center gap-2">
          <Plus size={20} />
          המלצה חדשה
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card text-center">
          <p className="text-3xl font-bold text-gray-900">{testimonials.length}</p>
          <p className="text-sm text-gray-500">סה"כ המלצות</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-green-600">
            {testimonials.filter((t) => t.isApproved).length}
          </p>
          <p className="text-sm text-gray-500">מאושרות</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-yellow-600">
            {testimonials.filter((t) => !t.isApproved).length}
          </p>
          <p className="text-sm text-gray-500">ממתינות לאישור</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-primary-600">
            {testimonials.filter((t) => t.isFeatured).length}
          </p>
          <p className="text-sm text-gray-500">מומלצות</p>
        </div>
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
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="md:w-48"
          >
            <option value="">כל ההמלצות</option>
            <option value="approved">מאושרות</option>
            <option value="pending">ממתינות</option>
            <option value="featured">מומלצות</option>
          </select>
        </div>
      )}

      {/* Testimonials List */}
      {!isEditing && (
        <div className="space-y-4">
          {filteredTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="card">
              <div className="flex gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={24} className="text-primary-600" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.treatment}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {renderStars(testimonial.rating)}
                      {testimonial.isFeatured && (
                        <span className="badge badge-info">מומלץ</span>
                      )}
                      <span
                        className={`badge ${
                          testimonial.isApproved ? 'badge-success' : 'badge-warning'
                        }`}
                      >
                        {testimonial.isApproved ? 'מאושר' : 'ממתין'}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3">"{testimonial.content}"</p>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">{testimonial.date}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleApproved(testimonial)}
                        className={`btn ${
                          testimonial.isApproved ? 'btn-secondary' : 'btn-success'
                        } text-sm py-1`}
                      >
                        {testimonial.isApproved ? 'בטל אישור' : 'אשר'}
                      </button>
                      <button
                        onClick={() => handleToggleFeatured(testimonial)}
                        className={`btn btn-secondary text-sm py-1 ${
                          testimonial.isFeatured ? 'bg-yellow-100' : ''
                        }`}
                      >
                        {testimonial.isFeatured ? 'הסר מומלץ' : 'סמן כמומלץ'}
                      </button>
                      <button
                        onClick={() => handleEdit(testimonial)}
                        className="p-2 hover:bg-gray-100 rounded"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTestimonial(testimonial);
                          setShowDeleteModal(true);
                        }}
                        className="p-2 hover:bg-red-50 rounded text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Form */}
      {isEditing && selectedTestimonial && (
        <div className="card">
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <h2 className="text-xl font-semibold">
              {selectedTestimonial.id ? 'עריכת המלצה' : 'המלצה חדשה'}
            </h2>
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedTestimonial(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">שם</label>
              <input
                type="text"
                value={selectedTestimonial.name}
                onChange={(e) =>
                  setSelectedTestimonial({ ...selectedTestimonial, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">טיפול</label>
              <input
                type="text"
                value={selectedTestimonial.treatment}
                onChange={(e) =>
                  setSelectedTestimonial({ ...selectedTestimonial, treatment: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">תוכן ההמלצה</label>
              <textarea
                rows={4}
                value={selectedTestimonial.content}
                onChange={(e) =>
                  setSelectedTestimonial({ ...selectedTestimonial, content: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">דירוג</label>
              {renderStars(selectedTestimonial.rating, true)}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">תאריך</label>
              <input
                type="date"
                value={selectedTestimonial.date}
                onChange={(e) =>
                  setSelectedTestimonial({ ...selectedTestimonial, date: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">תמונה (URL)</label>
              <input
                type="text"
                value={selectedTestimonial.image}
                onChange={(e) =>
                  setSelectedTestimonial({ ...selectedTestimonial, image: e.target.value })
                }
                dir="ltr"
              />
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedTestimonial.isApproved}
                  onChange={(e) =>
                    setSelectedTestimonial({
                      ...selectedTestimonial,
                      isApproved: e.target.checked,
                    })
                  }
                  className="w-5 h-5 rounded"
                />
                <span className="text-sm font-medium text-gray-700">מאושר</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedTestimonial.isFeatured}
                  onChange={(e) =>
                    setSelectedTestimonial({
                      ...selectedTestimonial,
                      isFeatured: e.target.checked,
                    })
                  }
                  className="w-5 h-5 rounded"
                />
                <span className="text-sm font-medium text-gray-700">מומלץ</span>
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
                setSelectedTestimonial(null);
              }}
              className="btn btn-secondary"
            >
              ביטול
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isEditing && filteredTestimonials.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">לא נמצאו המלצות</p>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal-backdrop" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">מחיקת המלצה</h3>
            <p className="text-gray-600 mb-6">האם אתה בטוח שברצונך למחוק המלצה זו?</p>
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

export default TestimonialsManager;
