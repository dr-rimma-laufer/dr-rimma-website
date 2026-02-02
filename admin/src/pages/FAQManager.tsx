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
  GripVertical,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from 'lucide-react';
import api from '../lib/api';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
}

const categories = [
  { value: 'general', label: 'כללי' },
  { value: 'treatments', label: 'טיפולים' },
  { value: 'transplant', label: 'השתלת שיער' },
  { value: 'pricing', label: 'מחירים' },
  { value: 'recovery', label: 'החלמה' },
];

const FAQManager: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expandedFaqs, setExpandedFaqs] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.getFaqs();
      if (response.success && response.data) {
        setFaqs(response.data);
      } else {
        // Demo data
        setFaqs([
          {
            id: '1',
            question: 'מהו טיפול PRP?',
            answer: 'טיפול PRP (Platelet-Rich Plasma) הוא טיפול חדשני המשתמש בפלזמה עשירה בטסיות דם מדמו של המטופל עצמו לעידוד צמיחת שיער.',
            category: 'treatments',
            order: 0,
            isActive: true,
          },
          {
            id: '2',
            question: 'כמה זמן נמשך תהליך ההחלמה אחרי השתלת שיער?',
            answer: 'תהליך ההחלמה הבסיסי נמשך כשבוע-שבועיים. תוצאות מלאות נראות לאחר 9-12 חודשים.',
            category: 'recovery',
            order: 1,
            isActive: true,
          },
          {
            id: '3',
            question: 'האם הטיפולים כואבים?',
            answer: 'רוב הטיפולים כוללים הרדמה מקומית ואינם כואבים. ייתכן אי נוחות קלה לאחר הטיפול.',
            category: 'general',
            order: 2,
            isActive: true,
          },
          {
            id: '4',
            question: 'מהם המחירים של הטיפולים?',
            answer: 'המחירים משתנים בהתאם לסוג הטיפול והיקפו. אנא צרו קשר לקבלת הצעת מחיר אישית.',
            category: 'pricing',
            order: 3,
            isActive: true,
          },
        ]);
      }
    } catch (err) {
      setError('שגיאה בטעינת השאלות הנפוצות');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedFaq({
      id: '',
      question: '',
      answer: '',
      category: 'general',
      order: faqs.length,
      isActive: true,
    });
    setIsEditing(true);
  };

  const handleEdit = (faq: FAQ) => {
    setSelectedFaq({ ...faq });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!selectedFaq) return;

    setIsSaving(true);
    try {
      if (selectedFaq.id) {
        await api.updateFaq(selectedFaq.id, selectedFaq);
        setFaqs(faqs.map((f) => (f.id === selectedFaq.id ? selectedFaq : f)));
      } else {
        const newFaq = { ...selectedFaq, id: `faq-${Date.now()}` };
        await api.createFaq(newFaq);
        setFaqs([...faqs, newFaq]);
      }
      setIsEditing(false);
      setSelectedFaq(null);
    } catch (err) {
      setError('שגיאה בשמירת השאלה');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedFaq) return;

    try {
      await api.deleteFaq(selectedFaq.id);
      setFaqs(faqs.filter((f) => f.id !== selectedFaq.id));
      setShowDeleteModal(false);
      setSelectedFaq(null);
    } catch (err) {
      setError('שגיאה במחיקת השאלה');
    }
  };

  const handleMove = (faqId: string, direction: 'up' | 'down') => {
    const index = faqs.findIndex((f) => f.id === faqId);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === faqs.length - 1)
    ) {
      return;
    }

    const newFaqs = [...faqs];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newFaqs[index], newFaqs[targetIndex]] = [newFaqs[targetIndex], newFaqs[index]];
    newFaqs.forEach((f, i) => (f.order = i));
    setFaqs(newFaqs);
  };

  const toggleExpanded = (faqId: string) => {
    const newExpanded = new Set(expandedFaqs);
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId);
    } else {
      newExpanded.add(faqId);
    }
    setExpandedFaqs(newExpanded);
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.includes(searchTerm) || faq.answer.includes(searchTerm);
    const matchesCategory = !filterCategory || faq.category === filterCategory;
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
          <h1 className="text-2xl font-bold text-gray-900">שאלות נפוצות</h1>
          <p className="text-gray-600">נהל את שאלות ותשובות האתר</p>
        </div>
        <button onClick={handleCreate} className="btn btn-primary flex items-center gap-2">
          <Plus size={20} />
          שאלה חדשה
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
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="חפש שאלה..."
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

      {/* FAQ List */}
      {!isEditing && (
        <div className="space-y-3">
          {filteredFaqs
            .sort((a, b) => a.order - b.order)
            .map((faq, index) => (
              <div key={faq.id} className="card">
                <div className="flex items-start gap-3">
                  <GripVertical className="text-gray-400 cursor-grab mt-1" size={20} />

                  <div className="flex-1">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleExpanded(faq.id)}
                    >
                      <div className="flex items-center gap-3">
                        <HelpCircle size={20} className="text-primary-600" />
                        <h3 className="font-medium text-gray-900">{faq.question}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="badge badge-info">
                          {categories.find((c) => c.value === faq.category)?.label}
                        </span>
                        {!faq.isActive && (
                          <span className="badge badge-warning">לא פעיל</span>
                        )}
                        {expandedFaqs.has(faq.id) ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </div>
                    </div>

                    {expandedFaqs.has(faq.id) && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-gray-600 whitespace-pre-wrap">{faq.answer}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMove(faq.id, 'up')}
                      disabled={index === 0}
                      className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                    >
                      <ChevronUp size={18} />
                    </button>
                    <button
                      onClick={() => handleMove(faq.id, 'down')}
                      disabled={index === filteredFaqs.length - 1}
                      className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                    >
                      <ChevronDown size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(faq)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedFaq(faq);
                        setShowDeleteModal(true);
                      }}
                      className="p-1 hover:bg-red-50 rounded text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Edit Form */}
      {isEditing && selectedFaq && (
        <div className="card">
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <h2 className="text-xl font-semibold">
              {selectedFaq.id ? 'עריכת שאלה' : 'שאלה חדשה'}
            </h2>
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedFaq(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">שאלה</label>
              <input
                type="text"
                value={selectedFaq.question}
                onChange={(e) =>
                  setSelectedFaq({ ...selectedFaq, question: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">תשובה</label>
              <textarea
                rows={6}
                value={selectedFaq.answer}
                onChange={(e) =>
                  setSelectedFaq({ ...selectedFaq, answer: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">קטגוריה</label>
                <select
                  value={selectedFaq.category}
                  onChange={(e) =>
                    setSelectedFaq({ ...selectedFaq, category: e.target.value })
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
                <label className="block text-sm font-medium text-gray-700 mb-1">סטטוס</label>
                <select
                  value={selectedFaq.isActive ? 'active' : 'inactive'}
                  onChange={(e) =>
                    setSelectedFaq({ ...selectedFaq, isActive: e.target.value === 'active' })
                  }
                >
                  <option value="active">פעיל</option>
                  <option value="inactive">לא פעיל</option>
                </select>
              </div>
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
                setSelectedFaq(null);
              }}
              className="btn btn-secondary"
            >
              ביטול
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isEditing && filteredFaqs.length === 0 && (
        <div className="text-center py-12">
          <HelpCircle size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">לא נמצאו שאלות</p>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal-backdrop" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">מחיקת שאלה</h3>
            <p className="text-gray-600 mb-6">האם אתה בטוח שברצונך למחוק שאלה זו?</p>
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

export default FAQManager;
