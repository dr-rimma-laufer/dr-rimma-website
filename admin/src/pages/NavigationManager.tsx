import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Save,
  X,
  Loader2,
  AlertCircle,
  GripVertical,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ExternalLink,
  Link,
} from 'lucide-react';
import api from '../lib/api';

interface NavItem {
  id: string;
  label: string;
  href: string;
  isExternal: boolean;
  children: NavItem[];
  order: number;
}

interface NavigationData {
  mainNav: NavItem[];
  footerNav: NavItem[];
}

const NavigationManager: React.FC = () => {
  const [navigation, setNavigation] = useState<NavigationData>({
    mainNav: [],
    footerNav: [],
  });
  const [activeTab, setActiveTab] = useState<'main' | 'footer'>('main');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [editingItem, setEditingItem] = useState<NavItem | null>(null);
  const [editingParentId, setEditingParentId] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadNavigation();
  }, []);

  const loadNavigation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.getNavigation();
      if (response.success && response.data) {
        setNavigation(response.data);
      } else {
        // Demo data
        setNavigation({
          mainNav: [
            { id: '1', label: 'בית', href: '/', isExternal: false, children: [], order: 0 },
            { id: '2', label: 'אודות', href: '/about', isExternal: false, children: [], order: 1 },
            {
              id: '3',
              label: 'טיפולים',
              href: '/treatments',
              isExternal: false,
              order: 2,
              children: [
                { id: '3-1', label: 'טיפול PRP', href: '/treatments/prp', isExternal: false, children: [], order: 0 },
                { id: '3-2', label: 'מזותרפיה', href: '/treatments/mesotherapy', isExternal: false, children: [], order: 1 },
                { id: '3-3', label: 'לייזר', href: '/treatments/laser', isExternal: false, children: [], order: 2 },
              ],
            },
            {
              id: '4',
              label: 'השתלת שיער',
              href: '/hair-transplant',
              isExternal: false,
              order: 3,
              children: [],
            },
            { id: '5', label: 'בלוג', href: '/blog', isExternal: false, children: [], order: 4 },
            { id: '6', label: 'צור קשר', href: '/contact', isExternal: false, children: [], order: 5 },
          ],
          footerNav: [
            { id: 'f1', label: 'תנאי שימוש', href: '/terms', isExternal: false, children: [], order: 0 },
            { id: 'f2', label: 'מדיניות פרטיות', href: '/privacy', isExternal: false, children: [], order: 1 },
            { id: 'f3', label: 'נגישות', href: '/accessibility', isExternal: false, children: [], order: 2 },
          ],
        });
      }
    } catch (err) {
      setError('שגיאה בטעינת הניווט');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await api.updateNavigation(navigation);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('שגיאה בשמירת הניווט');
    } finally {
      setIsSaving(false);
    }
  };

  const getCurrentNav = (): NavItem[] => {
    return activeTab === 'main' ? navigation.mainNav : navigation.footerNav;
  };

  const setCurrentNav = (items: NavItem[]) => {
    if (activeTab === 'main') {
      setNavigation({ ...navigation, mainNav: items });
    } else {
      setNavigation({ ...navigation, footerNav: items });
    }
  };

  const handleAddItem = (parentId: string | null = null) => {
    const newItem: NavItem = {
      id: `nav-${Date.now()}`,
      label: '',
      href: '',
      isExternal: false,
      children: [],
      order: 0,
    };

    setEditingItem(newItem);
    setEditingParentId(parentId);
  };

  const handleEditItem = (item: NavItem, parentId: string | null = null) => {
    setEditingItem({ ...item });
    setEditingParentId(parentId);
  };

  const handleSaveItem = () => {
    if (!editingItem) return;

    const nav = getCurrentNav();

    if (editingParentId) {
      // Adding/editing a child item
      const updateChildren = (items: NavItem[]): NavItem[] => {
        return items.map((item) => {
          if (item.id === editingParentId) {
            const existingIndex = item.children.findIndex((c) => c.id === editingItem.id);
            if (existingIndex >= 0) {
              // Update existing
              const newChildren = [...item.children];
              newChildren[existingIndex] = editingItem;
              return { ...item, children: newChildren };
            } else {
              // Add new
              return {
                ...item,
                children: [...item.children, { ...editingItem, order: item.children.length }],
              };
            }
          }
          return item;
        });
      };
      setCurrentNav(updateChildren(nav));
    } else {
      // Adding/editing a top-level item
      const existingIndex = nav.findIndex((item) => item.id === editingItem.id);
      if (existingIndex >= 0) {
        const newNav = [...nav];
        newNav[existingIndex] = editingItem;
        setCurrentNav(newNav);
      } else {
        setCurrentNav([...nav, { ...editingItem, order: nav.length }]);
      }
    }

    setEditingItem(null);
    setEditingParentId(null);
  };

  const handleDeleteItem = (itemId: string, parentId: string | null = null) => {
    const nav = getCurrentNav();

    if (parentId) {
      const updateChildren = (items: NavItem[]): NavItem[] => {
        return items.map((item) => {
          if (item.id === parentId) {
            return {
              ...item,
              children: item.children.filter((c) => c.id !== itemId),
            };
          }
          return item;
        });
      };
      setCurrentNav(updateChildren(nav));
    } else {
      setCurrentNav(nav.filter((item) => item.id !== itemId));
    }
  };

  const handleMoveItem = (
    itemId: string,
    direction: 'up' | 'down',
    parentId: string | null = null
  ) => {
    const nav = getCurrentNav();

    const moveInArray = (items: NavItem[]): NavItem[] => {
      const index = items.findIndex((item) => item.id === itemId);
      if (
        (direction === 'up' && index <= 0) ||
        (direction === 'down' && index >= items.length - 1)
      ) {
        return items;
      }

      const newItems = [...items];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
      return newItems.map((item, i) => ({ ...item, order: i }));
    };

    if (parentId) {
      const updateChildren = (items: NavItem[]): NavItem[] => {
        return items.map((item) => {
          if (item.id === parentId) {
            return { ...item, children: moveInArray(item.children) };
          }
          return item;
        });
      };
      setCurrentNav(updateChildren(nav));
    } else {
      setCurrentNav(moveInArray(nav));
    }
  };

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const renderNavItem = (item: NavItem, index: number, parentId: string | null = null, totalItems: number) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);

    return (
      <div key={item.id} className="border rounded-lg mb-2">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-t-lg">
          <GripVertical className="text-gray-400 cursor-grab" size={20} />

          {hasChildren && (
            <button onClick={() => toggleExpanded(item.id)} className="p-1">
              {isExpanded ? <ChevronDown size={18} /> : <ChevronLeft size={18} />}
            </button>
          )}

          <div className="flex-1">
            <span className="font-medium text-gray-900">{item.label || 'ללא כותרת'}</span>
            <span className="text-sm text-gray-500 mr-2">{item.href}</span>
            {item.isExternal && (
              <ExternalLink size={14} className="inline text-gray-400 mr-1" />
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handleMoveItem(item.id, 'up', parentId)}
              disabled={index === 0}
              className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
            >
              <ChevronUp size={18} />
            </button>
            <button
              onClick={() => handleMoveItem(item.id, 'down', parentId)}
              disabled={index === totalItems - 1}
              className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
            >
              <ChevronDown size={18} />
            </button>
            {!parentId && (
              <button
                onClick={() => handleAddItem(item.id)}
                className="p-1 hover:bg-gray-200 rounded text-primary-600"
                title="הוסף תת-פריט"
              >
                <Plus size={18} />
              </button>
            )}
            <button
              onClick={() => handleEditItem(item, parentId)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <Link size={18} />
            </button>
            <button
              onClick={() => handleDeleteItem(item.id, parentId)}
              className="p-1 hover:bg-red-50 rounded text-red-600"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="p-3 pr-10 border-t bg-white">
            {item.children
              .sort((a, b) => a.order - b.order)
              .map((child, childIndex) =>
                renderNavItem(child, childIndex, item.id, item.children.length)
              )}
          </div>
        )}
      </div>
    );
  };

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
          <h1 className="text-2xl font-bold text-gray-900">ניהול ניווט</h1>
          <p className="text-gray-600">ערוך את תפריטי הניווט באתר</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="btn btn-primary flex items-center gap-2"
        >
          {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          שמור שינויים
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-red-700">{error}</p>
          <button onClick={() => setError(null)} className="mr-auto">
            <X size={18} className="text-red-500" />
          </button>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <Save className="text-green-500" size={20} />
          <p className="text-green-700">הניווט נשמר בהצלחה!</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('main')}
          className={`btn ${activeTab === 'main' ? 'btn-primary' : 'btn-secondary'}`}
        >
          תפריט ראשי
        </button>
        <button
          onClick={() => setActiveTab('footer')}
          className={`btn ${activeTab === 'footer' ? 'btn-primary' : 'btn-secondary'}`}
        >
          תפריט כותרת תחתונה
        </button>
      </div>

      {/* Navigation Items */}
      <div className="card">
        <div className="flex items-center justify-between mb-4 pb-4 border-b">
          <h2 className="text-lg font-semibold">
            {activeTab === 'main' ? 'תפריט ראשי' : 'תפריט כותרת תחתונה'}
          </h2>
          <button
            onClick={() => handleAddItem()}
            className="btn btn-secondary flex items-center gap-2"
          >
            <Plus size={18} />
            הוסף פריט
          </button>
        </div>

        <div>
          {getCurrentNav()
            .sort((a, b) => a.order - b.order)
            .map((item, index) =>
              renderNavItem(item, index, null, getCurrentNav().length)
            )}
        </div>

        {getCurrentNav().length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>אין פריטים בתפריט</p>
            <button
              onClick={() => handleAddItem()}
              className="text-primary-600 mt-2"
            >
              הוסף פריט ראשון
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="modal-backdrop" onClick={() => setEditingItem(null)}>
          <div className="modal-content p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {editingItem.label ? 'עריכת פריט' : 'פריט חדש'}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  כותרת
                </label>
                <input
                  type="text"
                  value={editingItem.label}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, label: e.target.value })
                  }
                  placeholder="שם הפריט בתפריט"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  קישור
                </label>
                <input
                  type="text"
                  value={editingItem.href}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, href: e.target.value })
                  }
                  dir="ltr"
                  placeholder="/page-url או https://..."
                />
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingItem.isExternal}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, isExternal: e.target.checked })
                    }
                    className="w-5 h-5 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    קישור חיצוני (יפתח בחלון חדש)
                  </span>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-4 border-t">
              <button onClick={handleSaveItem} className="btn btn-primary">
                שמור
              </button>
              <button
                onClick={() => setEditingItem(null)}
                className="btn btn-secondary"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationManager;
