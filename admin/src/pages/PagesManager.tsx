import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  GripVertical,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
  Eye,
  FileText,
  Search,
} from 'lucide-react';
import api from '../lib/api';

interface Section {
  id: string;
  type: string;
  title: string;
  content: any;
  order: number;
}

interface Page {
  id: string;
  slug: string;
  title: string;
  sections: Section[];
  status: 'published' | 'draft';
  lastModified: string;
}

const sectionTypes = [
  { value: 'hero', label: 'Hero Banner' },
  { value: 'text', label: 'טקסט' },
  { value: 'image-text', label: 'תמונה וטקסט' },
  { value: 'features', label: 'תכונות' },
  { value: 'gallery', label: 'גלריה' },
  { value: 'testimonials', label: 'המלצות' },
  { value: 'faq', label: 'שאלות נפוצות' },
  { value: 'cta', label: 'קריאה לפעולה' },
  { value: 'stats', label: 'סטטיסטיקות' },
  { value: 'team', label: 'צוות' },
  { value: 'contact', label: 'יצירת קשר' },
];

const PagesManager: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddSection, setShowAddSection] = useState(false);
  const [draggedSection, setDraggedSection] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.getPages();
      if (response.success && response.data) {
        setPages(response.data);
      } else {
        // Demo data
        setPages([
          {
            id: '1',
            slug: 'home',
            title: 'עמוד הבית',
            status: 'published',
            lastModified: '2025-01-15',
            sections: [
              { id: 's1', type: 'hero', title: 'Hero Banner', content: {}, order: 0 },
              { id: 's2', type: 'features', title: 'שירותים', content: {}, order: 1 },
              { id: 's3', type: 'testimonials', title: 'המלצות', content: {}, order: 2 },
            ],
          },
          {
            id: '2',
            slug: 'about',
            title: 'אודות',
            status: 'published',
            lastModified: '2025-01-10',
            sections: [
              { id: 's4', type: 'hero', title: 'כותרת', content: {}, order: 0 },
              { id: 's5', type: 'text', title: 'סיפור שלנו', content: {}, order: 1 },
            ],
          },
          {
            id: '3',
            slug: 'contact',
            title: 'צור קשר',
            status: 'published',
            lastModified: '2025-01-05',
            sections: [
              { id: 's6', type: 'contact', title: 'טופס יצירת קשר', content: {}, order: 0 },
            ],
          },
        ]);
      }
    } catch (err) {
      setError('שגיאה בטעינת העמודים');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPage = async (page: Page) => {
    setSelectedPage(page);
    setExpandedSections(new Set());
  };

  const handleSavePage = async () => {
    if (!selectedPage) return;

    setIsSaving(true);
    try {
      await api.updatePage(selectedPage.slug, selectedPage);
      setPages(pages.map((p) => (p.id === selectedPage.id ? selectedPage : p)));
    } catch (err) {
      setError('שגיאה בשמירת העמוד');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSection = (type: string) => {
    if (!selectedPage) return;

    const newSection: Section = {
      id: `section-${Date.now()}`,
      type,
      title: sectionTypes.find((s) => s.value === type)?.label || type,
      content: {},
      order: selectedPage.sections.length,
    };

    setSelectedPage({
      ...selectedPage,
      sections: [...selectedPage.sections, newSection],
    });
    setShowAddSection(false);
  };

  const handleRemoveSection = (sectionId: string) => {
    if (!selectedPage) return;

    setSelectedPage({
      ...selectedPage,
      sections: selectedPage.sections.filter((s) => s.id !== sectionId),
    });
  };

  const handleMoveSection = (sectionId: string, direction: 'up' | 'down') => {
    if (!selectedPage) return;

    const sections = [...selectedPage.sections];
    const index = sections.findIndex((s) => s.id === sectionId);

    if (direction === 'up' && index > 0) {
      [sections[index], sections[index - 1]] = [sections[index - 1], sections[index]];
    } else if (direction === 'down' && index < sections.length - 1) {
      [sections[index], sections[index + 1]] = [sections[index + 1], sections[index]];
    }

    sections.forEach((s, i) => (s.order = i));
    setSelectedPage({ ...selectedPage, sections });
  };

  const toggleSectionExpanded = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleDragStart = (sectionId: string) => {
    setDraggedSection(sectionId);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedSection || draggedSection === targetId || !selectedPage) return;

    const sections = [...selectedPage.sections];
    const draggedIndex = sections.findIndex((s) => s.id === draggedSection);
    const targetIndex = sections.findIndex((s) => s.id === targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [removed] = sections.splice(draggedIndex, 1);
      sections.splice(targetIndex, 0, removed);
      sections.forEach((s, i) => (s.order = i));
      setSelectedPage({ ...selectedPage, sections });
    }
  };

  const handleDragEnd = () => {
    setDraggedSection(null);
  };

  const filteredPages = pages.filter(
    (page) =>
      page.title.includes(searchTerm) || page.slug.includes(searchTerm)
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
          <h1 className="text-2xl font-bold text-gray-900">ניהול עמודים</h1>
          <p className="text-gray-600">ערוך את מבנה העמודים והתוכן</p>
        </div>
        <button className="btn btn-primary flex items-center gap-2">
          <Plus size={20} />
          עמוד חדש
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pages List */}
        <div className="card lg:col-span-1">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="חפש עמוד..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            {filteredPages.map((page) => (
              <button
                key={page.id}
                onClick={() => handleSelectPage(page)}
                className={`w-full text-right p-3 rounded-lg border transition-colors ${
                  selectedPage?.id === page.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-gray-400" />
                    <span className="font-medium text-gray-900">{page.title}</span>
                  </div>
                  <span
                    className={`badge ${
                      page.status === 'published' ? 'badge-success' : 'badge-warning'
                    }`}
                  >
                    {page.status === 'published' ? 'מפורסם' : 'טיוטה'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">/{page.slug}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Page Editor */}
        <div className="card lg:col-span-2">
          {selectedPage ? (
            <>
              {/* Page Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedPage.title}</h2>
                  <p className="text-sm text-gray-500">/{selectedPage.slug}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn btn-secondary flex items-center gap-2">
                    <Eye size={18} />
                    תצוגה מקדימה
                  </button>
                  <button
                    onClick={handleSavePage}
                    disabled={isSaving}
                    className="btn btn-primary flex items-center gap-2"
                  >
                    {isSaving ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <Save size={18} />
                    )}
                    שמור
                  </button>
                </div>
              </div>

              {/* Sections List */}
              <div className="space-y-3">
                {selectedPage.sections
                  .sort((a, b) => a.order - b.order)
                  .map((section, index) => (
                    <div
                      key={section.id}
                      draggable
                      onDragStart={() => handleDragStart(section.id)}
                      onDragOver={(e) => handleDragOver(e, section.id)}
                      onDragEnd={handleDragEnd}
                      className={`border rounded-lg ${
                        draggedSection === section.id ? 'opacity-50 border-dashed' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-t-lg">
                        <GripVertical className="text-gray-400 cursor-grab" size={20} />
                        <span className="badge badge-info">{section.type}</span>
                        <span className="font-medium text-gray-900 flex-1">{section.title}</span>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleMoveSection(section.id, 'up')}
                            disabled={index === 0}
                            className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
                          >
                            <ChevronUp size={18} />
                          </button>
                          <button
                            onClick={() => handleMoveSection(section.id, 'down')}
                            disabled={index === selectedPage.sections.length - 1}
                            className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
                          >
                            <ChevronDown size={18} />
                          </button>
                          <button
                            onClick={() => toggleSectionExpanded(section.id)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleRemoveSection(section.id)}
                            className="p-1 hover:bg-red-100 rounded text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Section Editor (Expanded) */}
                      {expandedSections.has(section.id) && (
                        <div className="p-4 border-t">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                כותרת הסקשן
                              </label>
                              <input
                                type="text"
                                value={section.title}
                                onChange={(e) => {
                                  const updated = selectedPage.sections.map((s) =>
                                    s.id === section.id ? { ...s, title: e.target.value } : s
                                  );
                                  setSelectedPage({ ...selectedPage, sections: updated });
                                }}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                תוכן (JSON)
                              </label>
                              <textarea
                                rows={6}
                                value={JSON.stringify(section.content, null, 2)}
                                onChange={(e) => {
                                  try {
                                    const content = JSON.parse(e.target.value);
                                    const updated = selectedPage.sections.map((s) =>
                                      s.id === section.id ? { ...s, content } : s
                                    );
                                    setSelectedPage({ ...selectedPage, sections: updated });
                                  } catch {}
                                }}
                                className="font-mono text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>

              {/* Add Section Button */}
              <div className="mt-4">
                {showAddSection ? (
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">בחר סוג סקשן</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {sectionTypes.map((type) => (
                        <button
                          key={type.value}
                          onClick={() => handleAddSection(type.value)}
                          className="p-3 text-right border rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowAddSection(false)}
                      className="mt-3 text-gray-500 text-sm"
                    >
                      ביטול
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAddSection(true)}
                    className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary-500 hover:text-primary-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={20} />
                    הוסף סקשן חדש
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <FileText size={48} className="mb-4" />
              <p>בחר עמוד לעריכה</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PagesManager;
