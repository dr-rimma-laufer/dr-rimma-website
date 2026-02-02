import React, { useState, useEffect, useRef } from 'react';
import {
  Upload,
  Trash2,
  X,
  Loader2,
  AlertCircle,
  Search,
  Image,
  FolderOpen,
  Copy,
  Check,
  Grid,
  List,
  Filter,
} from 'lucide-react';
import api from '../lib/api';

interface MediaItem {
  id: string;
  key: string;
  url: string;
  name: string;
  size: number;
  type: string;
  folder: string;
  uploadedAt: string;
}

const folders = [
  { value: '', label: 'כל הקבצים' },
  { value: 'treatments', label: 'טיפולים' },
  { value: 'blog', label: 'בלוג' },
  { value: 'gallery', label: 'גלריה' },
  { value: 'team', label: 'צוות' },
  { value: 'general', label: 'כללי' },
];

const MediaLibrary: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFolder, setCurrentFolder] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadMedia();
  }, [currentFolder]);

  const loadMedia = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.getMedia(currentFolder);
      if (response.success && response.data) {
        setMedia(response.data);
      } else {
        // Demo data
        setMedia([
          {
            id: '1',
            key: 'treatments/prp-treatment.jpg',
            url: '/images/treatments/prp.jpg',
            name: 'prp-treatment.jpg',
            size: 245000,
            type: 'image/jpeg',
            folder: 'treatments',
            uploadedAt: '2025-01-15',
          },
          {
            id: '2',
            key: 'treatments/mesotherapy.jpg',
            url: '/images/treatments/mesotherapy.jpg',
            name: 'mesotherapy.jpg',
            size: 312000,
            type: 'image/jpeg',
            folder: 'treatments',
            uploadedAt: '2025-01-14',
          },
          {
            id: '3',
            key: 'blog/winter-care.jpg',
            url: '/images/blog/winter-care.jpg',
            name: 'winter-care.jpg',
            size: 189000,
            type: 'image/jpeg',
            folder: 'blog',
            uploadedAt: '2025-01-10',
          },
          {
            id: '4',
            key: 'gallery/before-after-1.jpg',
            url: '/images/gallery/ba1.jpg',
            name: 'before-after-1.jpg',
            size: 425000,
            type: 'image/jpeg',
            folder: 'gallery',
            uploadedAt: '2025-01-08',
          },
          {
            id: '5',
            key: 'team/dr-rimma.jpg',
            url: '/images/team/dr-rimma.jpg',
            name: 'dr-rimma.jpg',
            size: 275000,
            type: 'image/jpeg',
            folder: 'team',
            uploadedAt: '2025-01-05',
          },
        ]);
      }
    } catch (err) {
      setError('שגיאה בטעינת קבצי המדיה');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError(null);

    try {
      const uploadPromises = Array.from(files).map((file) =>
        api.uploadMedia(file, currentFolder || 'general')
      );

      const results = await Promise.all(uploadPromises);

      const successful = results.filter((r) => r.success);
      if (successful.length > 0) {
        await loadMedia();
      }

      const failed = results.filter((r) => !r.success);
      if (failed.length > 0) {
        setError(`${failed.length} קבצים נכשלו בהעלאה`);
      }
    } catch (err) {
      setError('שגיאה בהעלאת הקבצים');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (selectedItems.size === 0) return;

    try {
      const deletePromises = Array.from(selectedItems).map((key) =>
        api.deleteMedia(key)
      );

      await Promise.all(deletePromises);
      setMedia(media.filter((m) => !selectedItems.has(m.key)));
      setSelectedItems(new Set());
      setShowDeleteModal(false);
    } catch (err) {
      setError('שגיאה במחיקת הקבצים');
    }
  };

  const toggleSelect = (key: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    setSelectedItems(newSelected);
  };

  const selectAll = () => {
    if (selectedItems.size === filteredMedia.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredMedia.map((m) => m.key)));
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const filteredMedia = media.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = !currentFolder || item.folder === currentFolder;
    return matchesSearch && matchesFolder;
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
          <h1 className="text-2xl font-bold text-gray-900">ספריית מדיה</h1>
          <p className="text-gray-600">נהל תמונות וקבצים</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleUpload(e.target.files)}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="btn btn-primary flex items-center gap-2"
          >
            {isUploading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Upload size={20} />
            )}
            העלה קבצים
          </button>
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

      {/* Toolbar */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="חפש קובץ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>

          {/* Folder Filter */}
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={currentFolder}
              onChange={(e) => setCurrentFolder(e.target.value)}
              className="md:w-40"
            >
              {folders.map((folder) => (
                <option key={folder.value} value={folder.value}>
                  {folder.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Selection Actions */}
        {selectedItems.size > 0 && (
          <div className="flex items-center gap-4 mt-4 pt-4 border-t">
            <span className="text-sm text-gray-600">
              {selectedItems.size} קבצים נבחרו
            </span>
            <button onClick={selectAll} className="text-sm text-primary-600">
              {selectedItems.size === filteredMedia.length ? 'בטל בחירה' : 'בחר הכל'}
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="btn btn-danger flex items-center gap-1"
            >
              <Trash2 size={16} />
              מחק נבחרים
            </button>
          </div>
        )}
      </div>

      {/* Upload Drop Zone */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center hover:border-primary-500 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.classList.add('border-primary-500', 'bg-primary-50');
        }}
        onDragLeave={(e) => {
          e.currentTarget.classList.remove('border-primary-500', 'bg-primary-50');
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove('border-primary-500', 'bg-primary-50');
          handleUpload(e.dataTransfer.files);
        }}
      >
        <Upload size={40} className="mx-auto mb-3 text-gray-400" />
        <p className="text-gray-600 mb-1">גרור קבצים לכאן או לחץ להעלאה</p>
        <p className="text-sm text-gray-400">PNG, JPG, GIF עד 10MB</p>
      </div>

      {/* Media Grid */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className={`relative group bg-white rounded-lg border overflow-hidden cursor-pointer ${
                selectedItems.has(item.key)
                  ? 'ring-2 ring-primary-500'
                  : 'hover:shadow-lg'
              }`}
            >
              {/* Checkbox */}
              <div className="absolute top-2 right-2 z-10">
                <input
                  type="checkbox"
                  checked={selectedItems.has(item.key)}
                  onChange={() => toggleSelect(item.key)}
                  className="w-5 h-5 rounded"
                />
              </div>

              {/* Image */}
              <div
                className="aspect-square bg-gray-100 flex items-center justify-center"
                onClick={() => setPreviewItem(item)}
              >
                {item.type.startsWith('image/') ? (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FolderOpen size={32} className="text-gray-400" />
                )}
              </div>

              {/* Info */}
              <div className="p-2">
                <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(item.size)}</p>
              </div>

              {/* Actions Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyUrl(item.url);
                  }}
                  className="p-2 bg-white rounded-full hover:bg-gray-100"
                  title="העתק URL"
                >
                  {copiedUrl === item.url ? (
                    <Check size={18} className="text-green-600" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItems(new Set([item.key]));
                    setShowDeleteModal(true);
                  }}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 text-red-600"
                  title="מחק"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Media List */}
      {viewMode === 'list' && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th className="w-10">
                  <input
                    type="checkbox"
                    checked={selectedItems.size === filteredMedia.length && filteredMedia.length > 0}
                    onChange={selectAll}
                    className="w-5 h-5 rounded"
                  />
                </th>
                <th>קובץ</th>
                <th>תיקייה</th>
                <th>גודל</th>
                <th>תאריך העלאה</th>
                <th className="w-20">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedia.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.key)}
                      onChange={() => toggleSelect(item.key)}
                      className="w-5 h-5 rounded"
                    />
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        {item.type.startsWith('image/') ? (
                          <img
                            src={item.url}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FolderOpen size={20} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-info">
                      {folders.find((f) => f.value === item.folder)?.label || item.folder}
                    </span>
                  </td>
                  <td>{formatFileSize(item.size)}</td>
                  <td>{item.uploadedAt}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => copyUrl(item.url)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="העתק URL"
                      >
                        {copiedUrl === item.url ? (
                          <Check size={16} className="text-green-600" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItems(new Set([item.key]));
                          setShowDeleteModal(true);
                        }}
                        className="p-1 hover:bg-red-50 rounded text-red-600"
                        title="מחק"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {filteredMedia.length === 0 && (
        <div className="text-center py-12">
          <Image size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">לא נמצאו קבצים</p>
        </div>
      )}

      {/* Preview Modal */}
      {previewItem && (
        <div
          className="modal-backdrop"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="modal-content p-4 max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{previewItem.name}</h3>
              <button
                onClick={() => setPreviewItem(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={previewItem.url}
                alt={previewItem.name}
                className="max-w-full max-h-[60vh] mx-auto"
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {formatFileSize(previewItem.size)} | {previewItem.uploadedAt}
              </div>
              <button
                onClick={() => copyUrl(previewItem.url)}
                className="btn btn-secondary flex items-center gap-2"
              >
                {copiedUrl === previewItem.url ? (
                  <>
                    <Check size={16} className="text-green-600" />
                    הועתק!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    העתק URL
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal-backdrop" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">מחיקת קבצים</h3>
            <p className="text-gray-600 mb-6">
              האם אתה בטוח שברצונך למחוק {selectedItems.size} קבצים? פעולה זו אינה ניתנת לביטול.
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

export default MediaLibrary;
