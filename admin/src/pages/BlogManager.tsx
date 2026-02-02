import React, { useState, useEffect, useRef } from 'react';
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
  Bold,
  Italic,
  List,
  Link,
  Eye,
  Calendar,
} from 'lucide-react';
import api from '../lib/api';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  publishDate: string;
  status: 'published' | 'draft';
}

const categories = [
  { value: 'hair-care', label: 'טיפוח שיער' },
  { value: 'treatments', label: 'טיפולים' },
  { value: 'news', label: 'חדשות' },
  { value: 'tips', label: 'טיפים' },
  { value: 'research', label: 'מחקרים' },
];

const BlogManager: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newTag, setNewTag] = useState('');
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.getPosts();
      if (response.success && response.data) {
        setPosts(response.data);
      } else {
        // Demo data
        setPosts([
          {
            id: '1',
            slug: 'prp-treatment-benefits',
            title: 'יתרונות טיפול PRP לשיער',
            excerpt: 'טיפול PRP הפך לאחד הטיפולים הפופולריים ביותר לשיקום שיער...',
            content: '<h2>מהו טיפול PRP?</h2><p>טיפול PRP (Platelet-Rich Plasma) הוא טיפול חדשני...</p>',
            image: '/images/blog/prp-benefits.jpg',
            author: 'ד"ר רימה',
            category: 'treatments',
            tags: ['PRP', 'שיער', 'טיפולים'],
            publishDate: '2025-01-15',
            status: 'published',
          },
          {
            id: '2',
            slug: 'hair-care-winter',
            title: 'טיפול בשיער בחורף',
            excerpt: 'החורף יכול להזיק לשיער שלכם. הנה כמה טיפים לשמירה על שיער בריא...',
            content: '<p>בעונת החורף השיער נחשף לתנאים קשים...</p>',
            image: '/images/blog/winter-care.jpg',
            author: 'ד"ר רימה',
            category: 'tips',
            tags: ['חורף', 'טיפוח', 'עצות'],
            publishDate: '2025-01-10',
            status: 'published',
          },
          {
            id: '3',
            slug: 'new-research-hair-loss',
            title: 'מחקר חדש על נשירת שיער',
            excerpt: 'מחקר חדש מגלה תובנות חדשות על הסיבות לנשירת שיער...',
            content: '<p>מחקר חדש שפורסם בכתב העת...</p>',
            image: '/images/blog/research.jpg',
            author: 'ד"ר רימה',
            category: 'research',
            tags: ['מחקר', 'נשירת שיער'],
            publishDate: '2025-01-05',
            status: 'draft',
          },
        ]);
      }
    } catch (err) {
      setError('שגיאה בטעינת הפוסטים');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedPost({
      id: '',
      slug: '',
      title: '',
      excerpt: '',
      content: '',
      image: '',
      author: 'ד"ר רימה',
      category: 'news',
      tags: [],
      publishDate: new Date().toISOString().split('T')[0],
      status: 'draft',
    });
    setIsEditing(true);
  };

  const handleEdit = (post: BlogPost) => {
    setSelectedPost({ ...post });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!selectedPost) return;

    setIsSaving(true);
    try {
      if (selectedPost.id) {
        await api.updatePost(selectedPost.id, selectedPost);
        setPosts(posts.map((p) => (p.id === selectedPost.id ? selectedPost : p)));
      } else {
        const newPost = { ...selectedPost, id: `post-${Date.now()}` };
        await api.createPost(newPost);
        setPosts([...posts, newPost]);
      }
      setIsEditing(false);
      setSelectedPost(null);
    } catch (err) {
      setError('שגיאה בשמירת הפוסט');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedPost) return;

    try {
      await api.deletePost(selectedPost.id);
      setPosts(posts.filter((p) => p.id !== selectedPost.id));
      setShowDeleteModal(false);
      setSelectedPost(null);
    } catch (err) {
      setError('שגיאה במחיקת הפוסט');
    }
  };

  const handleAddTag = () => {
    if (!selectedPost || !newTag.trim()) return;
    if (!selectedPost.tags.includes(newTag.trim())) {
      setSelectedPost({
        ...selectedPost,
        tags: [...selectedPost.tags, newTag.trim()],
      });
    }
    setNewTag('');
  };

  const handleRemoveTag = (tag: string) => {
    if (!selectedPost) return;
    setSelectedPost({
      ...selectedPost,
      tags: selectedPost.tags.filter((t) => t !== tag),
    });
  };

  const insertFormatting = (before: string, after: string = before) => {
    if (!editorRef.current || !selectedPost) return;

    const start = editorRef.current.selectionStart;
    const end = editorRef.current.selectionEnd;
    const text = selectedPost.content;
    const selectedText = text.substring(start, end);

    const newContent =
      text.substring(0, start) + before + selectedText + after + text.substring(end);

    setSelectedPost({ ...selectedPost, content: newContent });

    // Restore cursor position
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
        editorRef.current.setSelectionRange(
          start + before.length,
          end + before.length
        );
      }
    }, 0);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.includes(searchTerm) ||
      post.excerpt.includes(searchTerm) ||
      post.tags.some((tag) => tag.includes(searchTerm))
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
          <h1 className="text-2xl font-bold text-gray-900">ניהול בלוג</h1>
          <p className="text-gray-600">כתוב וערוך פוסטים</p>
        </div>
        <button onClick={handleCreate} className="btn btn-primary flex items-center gap-2">
          <Plus size={20} />
          פוסט חדש
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

      {/* Search */}
      {!isEditing && (
        <div className="card mb-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="חפש פוסט..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
        </div>
      )}

      {/* Posts List */}
      {!isEditing && (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="card flex gap-4">
              <div className="w-32 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                {post.image ? (
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image size={24} className="text-gray-300" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <Calendar size={14} />
                      {post.publishDate}
                      <span className="mx-2">|</span>
                      {post.author}
                    </p>
                  </div>
                  <span
                    className={`badge ${
                      post.status === 'published' ? 'badge-success' : 'badge-warning'
                    }`}
                  >
                    {post.status === 'published' ? 'מפורסם' : 'טיוטה'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 flex-wrap">
                    {post.tags.map((tag) => (
                      <span key={tag} className="badge badge-info">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="btn btn-secondary flex items-center gap-1"
                    >
                      <Edit size={16} />
                      ערוך
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPost(post);
                        setShowDeleteModal(true);
                      }}
                      className="btn btn-danger p-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Form */}
      {isEditing && selectedPost && (
        <div className="card">
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <h2 className="text-xl font-semibold">
              {selectedPost.id ? 'עריכת פוסט' : 'פוסט חדש'}
            </h2>
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedPost(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">כותרת</label>
                <input
                  type="text"
                  value={selectedPost.title}
                  onChange={(e) =>
                    setSelectedPost({ ...selectedPost, title: e.target.value })
                  }
                  className="text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input
                  type="text"
                  value={selectedPost.slug}
                  onChange={(e) =>
                    setSelectedPost({ ...selectedPost, slug: e.target.value })
                  }
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">תקציר</label>
                <textarea
                  rows={3}
                  value={selectedPost.excerpt}
                  onChange={(e) =>
                    setSelectedPost({ ...selectedPost, excerpt: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">תוכן</label>
                {/* Simple Rich Text Toolbar */}
                <div className="flex items-center gap-1 mb-2 p-2 bg-gray-50 rounded-t-lg border border-b-0">
                  <button
                    type="button"
                    onClick={() => insertFormatting('<strong>', '</strong>')}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="מודגש"
                  >
                    <Bold size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('<em>', '</em>')}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="נטוי"
                  >
                    <Italic size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('<ul>\n<li>', '</li>\n</ul>')}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="רשימה"
                  >
                    <List size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('<a href="">', '</a>')}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="קישור"
                  >
                    <Link size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('<h2>', '</h2>')}
                    className="p-2 hover:bg-gray-200 rounded text-sm font-bold"
                    title="כותרת"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('<h3>', '</h3>')}
                    className="p-2 hover:bg-gray-200 rounded text-sm font-bold"
                    title="כותרת משנה"
                  >
                    H3
                  </button>
                </div>
                <textarea
                  ref={editorRef}
                  rows={15}
                  value={selectedPost.content}
                  onChange={(e) =>
                    setSelectedPost({ ...selectedPost, content: e.target.value })
                  }
                  className="font-mono text-sm rounded-t-none"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">הגדרות פרסום</h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">סטטוס</label>
                    <select
                      value={selectedPost.status}
                      onChange={(e) =>
                        setSelectedPost({
                          ...selectedPost,
                          status: e.target.value as 'published' | 'draft',
                        })
                      }
                    >
                      <option value="draft">טיוטה</option>
                      <option value="published">מפורסם</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      תאריך פרסום
                    </label>
                    <input
                      type="date"
                      value={selectedPost.publishDate}
                      onChange={(e) =>
                        setSelectedPost({ ...selectedPost, publishDate: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">מחבר</label>
                    <input
                      type="text"
                      value={selectedPost.author}
                      onChange={(e) =>
                        setSelectedPost({ ...selectedPost, author: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">קטגוריה</label>
                    <select
                      value={selectedPost.category}
                      onChange={(e) =>
                        setSelectedPost({ ...selectedPost, category: e.target.value })
                      }
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">תמונה ראשית</h3>
                <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                  {selectedPost.image ? (
                    <img
                      src={selectedPost.image}
                      alt="תצוגה מקדימה"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image size={32} className="text-gray-400" />
                  )}
                </div>
                <input
                  type="text"
                  placeholder="URL תמונה"
                  value={selectedPost.image}
                  onChange={(e) =>
                    setSelectedPost({ ...selectedPost, image: e.target.value })
                  }
                  dir="ltr"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">תגיות</h3>
                <div className="flex gap-1 flex-wrap mb-3">
                  {selectedPost.tags.map((tag) => (
                    <span key={tag} className="badge badge-info flex items-center gap-1">
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)}>
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="תגית חדשה"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <button onClick={handleAddTag} className="btn btn-secondary">
                    <Plus size={18} />
                  </button>
                </div>
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
            <button className="btn btn-secondary flex items-center gap-2">
              <Eye size={18} />
              תצוגה מקדימה
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedPost(null);
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">מחיקת פוסט</h3>
            <p className="text-gray-600 mb-6">
              האם אתה בטוח שברצונך למחוק את הפוסט "{selectedPost?.title}"?
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

export default BlogManager;
