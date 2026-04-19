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
  Settings,
} from 'lucide-react';
import api from '../lib/api';

interface SectionContent {
  id: string;
  field_name: string;
  field_type: string;
  value_text?: string;
  value_json?: any;
  language: string;
}

interface Section {
  id: string;
  section_type: string;
  sort_order: number;
  is_visible: boolean;
  settings?: any;
  content: SectionContent[];
  items?: any[];
}

interface ItemSubField {
  name: string;
  label: string;
  multiline?: boolean;
}

interface FieldConfig {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  itemFields?: ItemSubField[];
}

interface Page {
  id: string;
  slug: string;
  title: string;
  title_en?: string;
  page_type: string;
  status: string;
  seo_title?: string;
  seo_description?: string;
  updated_at?: string;
}

// All 15 section types from the CMS architecture
const sectionTypes = [
  { value: 'hero', label: 'Hero Banner', icon: '🖼️', description: 'Full-screen hero with image and CTA' },
  { value: 'hero_animated', label: 'Hero עם אנימציה', icon: '✨', description: 'Hero with bubble animations' },
  { value: 'text_image', label: 'טקסט + תמונה', icon: '📄', description: 'Two-column text with image' },
  { value: 'cards_grid', label: 'רשת כרטיסים', icon: '🃏', description: 'Grid of feature/service cards' },
  { value: 'faq_accordion', label: 'שאלות נפוצות', icon: '❓', description: 'Collapsible FAQ accordion' },
  { value: 'timeline', label: 'ציר זמן/שלבים', icon: '📅', description: 'Step-by-step process timeline' },
  { value: 'cta', label: 'קריאה לפעולה', icon: '📢', description: 'Call-to-action banner' },
  { value: 'statistics', label: 'סטטיסטיקות', icon: '📊', description: 'Statistics/numbers bar' },
  { value: 'reviews', label: 'המלצות', icon: '⭐', description: 'Testimonials gallery' },
  { value: 'expertise', label: 'מומחיות', icon: '🏆', description: 'Expertise/features grid' },
  { value: 'disease_content', label: 'תוכן מחלה', icon: '🏥', description: 'Medical condition info (causes, symptoms, treatment)' },
  { value: 'about_preview', label: 'אודות הרופא', icon: '👨‍⚕️', description: 'Doctor bio preview' },
  { value: 'gallery', label: 'גלריה', icon: '🖼️', description: 'Before/after gallery' },
  { value: 'contact_form', label: 'טופס יצירת קשר', icon: '📧', description: 'Contact form section' },
  { value: 'content_block', label: 'בלוק תוכן', icon: '📝', description: 'Rich text content block' },
  { value: 'rich_text', label: 'טקסט עשיר (משפטי)', icon: '📜', description: 'Legal/content page with titled sections' },
  { value: 'hair_transplant_why', label: 'למה השתלת שיער', icon: '💇', description: 'Why hair transplant + advantages grid' },
  { value: 'hair_transplant_excellence', label: 'מצוינות בהשתלה', icon: '🏅', description: 'Excellence section with images + stats' },
  { value: 'hair_transplant_risks', label: 'מיזעור סיכונים', icon: '🛡️', description: 'Risk minimization items' },
  { value: 'hair_transplant_steps', label: 'שלבי ההשתלה', icon: '📋', description: 'Transplant procedure steps carousel' },
  { value: 'hair_transplant_fue', label: 'שיטת FUE', icon: '🔬', description: 'FUE method description + advantages' },
  { value: 'hair_transplant_natural', label: 'מראה טבעי', icon: '🌿', description: 'Natural appearance topics' },
  { value: 'hair_transplant_timeline', label: 'ציר זמן השתלה', icon: '📆', description: 'Recovery timeline periods' },
  { value: 'hair_transplant_faq', label: 'שאלות נפוצות השתלה', icon: '❔', description: 'Hair transplant FAQ with categories' },
];

// Field configurations for each section type (matching actual DB flat fields + section_items)
const sectionFieldConfigs: Record<string, FieldConfig[]> = {
  hero: [
    { name: 'title', type: 'text', label: 'כותרת', required: true },
    { name: 'subtitle', type: 'text', label: 'תת כותרת' },
    { name: 'description', type: 'textarea', label: 'תיאור' },
    { name: 'background_image', type: 'image', label: 'תמונת רקע' },
  ],
  hero_animated: [
    { name: 'title', type: 'text', label: 'כותרת', required: true },
    { name: 'subtitle', type: 'text', label: 'תת כותרת' },
    { name: 'description', type: 'textarea', label: 'תיאור' },
  ],
  text_image: [
    { name: 'title', type: 'text', label: 'כותרת' },
    { name: 'description', type: 'textarea', label: 'תיאור' },
    { name: 'image', type: 'image', label: 'תמונה' },
    { name: 'image_position', type: 'select', label: 'מיקום תמונה' },
  ],
  about_preview: [
    { name: 'title', type: 'text', label: 'כותרת' },
    { name: 'subtitle', type: 'text', label: 'תת כותרת' },
    { name: 'description', type: 'textarea', label: 'תיאור' },
    { name: 'description2', type: 'textarea', label: 'תיאור 2' },
    { name: 'image', type: 'image', label: 'תמונה' },
    { name: 'cta_text', type: 'text', label: 'טקסט כפתור' },
    { name: 'cta_link', type: 'text', label: 'קישור כפתור' },
    { name: 'credentials', type: 'items', label: 'הסמכות',
      itemFields: [
        { name: 'icon', label: 'אייקון' },
        { name: 'title', label: 'כותרת' },
        { name: 'description', label: 'תיאור' },
      ]
    },
  ],
  expertise: [
    { name: 'title', type: 'text', label: 'כותרת' },
    { name: 'intro', type: 'textarea', label: 'מבוא' },
    { name: 'left_title', type: 'text', label: 'כותרת שמאל' },
    { name: 'left_subtitle', type: 'text', label: 'תת כותרת שמאל' },
    { name: 'left_intro', type: 'textarea', label: 'מבוא שמאל' },
    { name: 'left_sub_intro', type: 'textarea', label: 'תת מבוא שמאל' },
    { name: 'right_title', type: 'text', label: 'כותרת ימין' },
    { name: 'right_subtitle', type: 'text', label: 'תת כותרת ימין' },
    { name: 'right_intro', type: 'textarea', label: 'מבוא ימין' },
    { name: 'left_items', type: 'items', label: 'פריטי אבחון',
      itemFields: [
        { name: 'heading', label: 'כותרת' },
        { name: 'text', label: 'תיאור', multiline: true },
      ]
    },
    { name: 'right_items', type: 'items', label: 'פריטי טיפול',
      itemFields: [
        { name: 'heading', label: 'כותרת' },
        { name: 'text', label: 'תיאור', multiline: true },
      ]
    },
  ],
  cards_grid: [
    { name: 'title', type: 'text', label: 'כותרת' },
    { name: 'subtitle', type: 'text', label: 'תת כותרת' },
    { name: 'intro_text', type: 'textarea', label: 'טקסט מבוא' },
    { name: 'cards', type: 'items', label: 'כרטיסים',
      itemFields: [
        { name: 'title', label: 'כותרת' },
        { name: 'description', label: 'תיאור', multiline: true },
        { name: 'image', label: 'תמונה' },
      ]
    },
  ],
  faq_accordion: [
    { name: 'title', type: 'text', label: 'כותרת' },
    { name: 'subtitle', type: 'text', label: 'תת כותרת' },
    { name: 'faqs', type: 'items', label: 'שאלות ותשובות',
      itemFields: [
        { name: 'question', label: 'שאלה' },
        { name: 'answer', label: 'תשובה', multiline: true },
      ]
    },
  ],
  timeline: [
    { name: 'title', type: 'text', label: 'כותרת' },
    { name: 'subtitle', type: 'text', label: 'תת כותרת' },
    { name: 'steps', type: 'items', label: 'שלבים',
      itemFields: [
        { name: 'title', label: 'כותרת' },
        { name: 'description', label: 'תיאור', multiline: true },
      ]
    },
  ],
  cta: [
    { name: 'title', type: 'text', label: 'כותרת', required: true },
    { name: 'subtitle', type: 'text', label: 'תת כותרת' },
    { name: 'button_primary', type: 'text', label: 'כפתור ראשי' },
    { name: 'button_primary_link', type: 'text', label: 'קישור כפתור ראשי' },
    { name: 'button_secondary', type: 'text', label: 'כפתור משני' },
    { name: 'button_secondary_link', type: 'text', label: 'קישור כפתור משני' },
    { name: 'feature_cards', type: 'items', label: 'כרטיסי תכונות',
      itemFields: [
        { name: 'title', label: 'כותרת' },
        { name: 'description', label: 'תיאור' },
      ]
    },
    { name: 'trust_indicators', type: 'items', label: 'אינדיקטורי אמון',
      itemFields: [
        { name: 'text', label: 'טקסט' },
      ]
    },
  ],
  statistics: [
    { name: 'stats', type: 'items', label: 'סטטיסטיקות',
      itemFields: [
        { name: 'value', label: 'ערך' },
        { name: 'label', label: 'תווית' },
        { name: 'icon', label: 'אייקון' },
      ]
    },
  ],
  reviews: [
    { name: 'title', type: 'text', label: 'כותרת' },
    { name: 'badge', type: 'text', label: 'תג' },
    { name: 'description', type: 'textarea', label: 'תיאור' },
    { name: 'cta_text', type: 'text', label: 'טקסט כפתור' },
    { name: 'cta_button', type: 'text', label: 'כפתור' },
    { name: 'reviews', type: 'items', label: 'המלצות',
      itemFields: [
        { name: 'name', label: 'שם' },
        { name: 'rating', label: 'דירוג' },
        { name: 'date', label: 'תאריך' },
        { name: 'treatment', label: 'טיפול' },
        { name: 'text', label: 'טקסט', multiline: true },
        { name: 'source', label: 'מקור' },
      ]
    },
  ],
  disease_content: [
    { name: 'title', type: 'text', label: 'כותרת' },
    { name: 'overview', type: 'textarea', label: 'סקירה כללית' },
    { name: 'causes', type: 'textarea', label: 'גורמים' },
    { name: 'symptoms', type: 'items', label: 'תסמינים',
      itemFields: [
        { name: 'text', label: 'תסמין' },
      ]
    },
    { name: 'diagnosis', type: 'textarea', label: 'אבחון' },
    { name: 'treatment', type: 'textarea', label: 'טיפול' },
    { name: 'prognosis', type: 'textarea', label: 'פרוגנוזה' },
  ],
  gallery: [
    { name: 'title', type: 'text', label: 'כותרת' },
    { name: 'subtitle', type: 'text', label: 'תת כותרת' },
    { name: 'items', type: 'items', label: 'תמונות',
      itemFields: [
        { name: 'title', label: 'כותרת' },
        { name: 'image', label: 'URL תמונה' },
        { name: 'description', label: 'תיאור' },
      ]
    },
  ],
  contact_form: [
    { name: 'title', type: 'text', label: 'כותרת' },
    { name: 'subtitle', type: 'text', label: 'תת כותרת' },
    { name: 'submit_text', type: 'text', label: 'טקסט כפתור' },
    { name: 'confirmation', type: 'text', label: 'הודעת אישור' },
  ],
  content_block: [
    { name: 'title', type: 'text', label: 'כותרת' },
    { name: 'subtitle', type: 'text', label: 'תת כותרת' },
    { name: 'content', type: 'textarea', label: 'תוכן' },
  ],
  rich_text: [
    { name: 'title', type: 'text', label: 'כותרת', required: true },
    { name: 'last_updated', type: 'text', label: 'עודכן לאחרונה' },
    { name: 'sections', type: 'items', label: 'סעיפים',
      itemFields: [
        { name: 'heading', label: 'כותרת סעיף' },
        { name: 'text', label: 'תוכן', multiline: true },
      ]
    },
  ],
  hair_transplant_why: [
    { name: 'title', type: 'text', label: 'כותרת', required: true },
    { name: 'paragraph1', type: 'textarea', label: 'פסקה 1' },
    { name: 'paragraph2', type: 'textarea', label: 'פסקה 2' },
    { name: 'paragraph3', type: 'textarea', label: 'פסקה 3' },
    { name: 'paragraph4', type: 'textarea', label: 'פסקה 4' },
    { name: 'advantages_title', type: 'text', label: 'כותרת יתרונות' },
    { name: 'advantages', type: 'items', label: 'יתרונות',
      itemFields: [
        { name: 'title', label: 'כותרת' },
        { name: 'description', label: 'תיאור', multiline: true },
      ]
    },
  ],
  hair_transplant_excellence: [
    { name: 'title', type: 'text', label: 'כותרת שורה 1' },
    { name: 'title_line2', type: 'text', label: 'כותרת שורה 2' },
    { name: 'title_line3', type: 'text', label: 'כותרת שורה 3' },
    { name: 'paragraph1', type: 'textarea', label: 'פסקה 1' },
    { name: 'paragraph2', type: 'textarea', label: 'פסקה 2' },
    { name: 'paragraph3', type: 'textarea', label: 'פסקה 3' },
    { name: 'image', type: 'image', label: 'תמונה קטנה' },
    { name: 'image2', type: 'image', label: 'תמונה גדולה' },
    { name: 'stat1_value', type: 'text', label: 'סטטיסטיקה 1 - ערך' },
    { name: 'stat1_label', type: 'text', label: 'סטטיסטיקה 1 - תווית' },
    { name: 'stat2_value', type: 'text', label: 'סטטיסטיקה 2 - ערך' },
    { name: 'stat2_suffix', type: 'text', label: 'סטטיסטיקה 2 - סיומת' },
    { name: 'stat2_label', type: 'text', label: 'סטטיסטיקה 2 - תווית' },
  ],
  hair_transplant_risks: [
    { name: 'title', type: 'text', label: 'כותרת שורה 1' },
    { name: 'title_line2', type: 'text', label: 'כותרת שורה 2' },
    { name: 'title_line3', type: 'text', label: 'כותרת שורה 3' },
    { name: 'risks', type: 'items', label: 'סיכונים',
      itemFields: [
        { name: 'title', label: 'כותרת' },
        { name: 'description', label: 'תיאור', multiline: true },
        { name: 'icon', label: 'אייקון (Shield/Heart/Microscope)' },
      ]
    },
  ],
  hair_transplant_steps: [
    { name: 'title', type: 'text', label: 'כותרת', required: true },
    { name: 'subtitle', type: 'textarea', label: 'תת כותרת' },
    { name: 'steps', type: 'items', label: 'שלבים',
      itemFields: [
        { name: 'number', label: 'מספר (01-07)' },
        { name: 'title', label: 'כותרת' },
        { name: 'description', label: 'תיאור', multiline: true },
        { name: 'image', label: 'תמונה' },
      ]
    },
  ],
  hair_transplant_fue: [
    { name: 'title', type: 'text', label: 'כותרת שורה 1' },
    { name: 'title_line2', type: 'text', label: 'כותרת שורה 2' },
    { name: 'paragraph1', type: 'textarea', label: 'פסקה 1' },
    { name: 'paragraph2', type: 'textarea', label: 'פסקה 2' },
    { name: 'paragraph3', type: 'textarea', label: 'פסקה 3' },
    { name: 'image', type: 'image', label: 'תמונה' },
    { name: 'advantages_title', type: 'text', label: 'כותרת יתרונות שורה 1' },
    { name: 'advantages_title_line2', type: 'text', label: 'כותרת יתרונות שורה 2' },
    { name: 'advantages_title_line3', type: 'text', label: 'כותרת יתרונות שורה 3' },
    { name: 'advantages', type: 'items', label: 'יתרונות',
      itemFields: [
        { name: 'title', label: 'כותרת' },
        { name: 'description', label: 'תיאור', multiline: true },
      ]
    },
  ],
  hair_transplant_natural: [
    { name: 'title', type: 'text', label: 'כותרת שורה 1' },
    { name: 'title_line2', type: 'text', label: 'כותרת שורה 2' },
    { name: 'description', type: 'textarea', label: 'תיאור 1' },
    { name: 'description2', type: 'textarea', label: 'תיאור 2' },
    { name: 'image', type: 'image', label: 'תמונה' },
    { name: 'topics', type: 'items', label: 'נושאים',
      itemFields: [
        { name: 'title', label: 'כותרת' },
        { name: 'description', label: 'תיאור', multiline: true },
      ]
    },
  ],
  hair_transplant_timeline: [
    { name: 'title', type: 'text', label: 'כותרת', required: true },
    { name: 'subtitle', type: 'textarea', label: 'תת כותרת' },
    { name: 'sidebar_title', type: 'text', label: 'כותרת צד' },
    { name: 'sidebar_description', type: 'textarea', label: 'תיאור צד' },
    { name: 'image', type: 'image', label: 'תמונת רקע' },
    { name: 'periods', type: 'items', label: 'תקופות',
      itemFields: [
        { name: 'period', label: 'תקופה (תווית)' },
        { name: 'title', label: 'כותרת' },
        { name: 'description', label: 'תיאור', multiline: true },
      ]
    },
  ],
  hair_transplant_faq: [
    { name: 'title', type: 'text', label: 'כותרת', required: true },
    { name: 'faqs', type: 'items', label: 'שאלות ותשובות',
      itemFields: [
        { name: 'question', label: 'שאלה' },
        { name: 'answer', label: 'תשובה', multiline: true },
        { name: 'category', label: 'קטגוריה' },
      ]
    },
  ],
};

const PagesManager: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddSection, setShowAddSection] = useState(false);
  const [draggedSection, setDraggedSection] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [editingContent, setEditingContent] = useState<Record<string, Record<string, string>>>({});
  // editingItems[sectionId][groupName][language] = array of item objects
  const [editingItems, setEditingItems] = useState<Record<string, Record<string, Record<string, any[]>>>>({});
  const [activeLanguage, setActiveLanguage] = useState<'he' | 'en'>('he');
  const [showPageSettings, setShowPageSettings] = useState(false);
  const [showNewPageModal, setShowNewPageModal] = useState(false);
  const [newPageData, setNewPageData] = useState({ slug: '', title: '', title_en: '', page_type: 'standard' });

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.getPages();
      if (response.success && response.data) {
        setPages(response.data.pages || response.data || []);
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
    setEditingContent({});
    setEditingItems({});

    // Load page with sections
    try {
      const response = await api.getPage(page.id);
      if (response.success && response.data) {
        const sectionsData = response.data.sections || [];
        setSections(Array.isArray(sectionsData) ? sectionsData : []);

        // Initialize editing content from flat fields (section_content)
        const contentMap: Record<string, Record<string, string>> = {};
        const itemsMap: Record<string, Record<string, Record<string, any[]>>> = {};

        (response.data.sections || []).forEach((section: Section) => {
          contentMap[section.id] = {};
          section.content?.forEach((c: SectionContent) => {
            const key = `${c.field_name}_${c.language}`;
            contentMap[section.id][key] = c.value_text || (c.value_json ? JSON.stringify(c.value_json, null, 2) : '');
          });

          // Initialize items from section_items
          itemsMap[section.id] = {};
          if (section.items && section.items.length > 0) {
            // Group by item_group > language > sort_order > fields
            const grouped: Record<string, Record<string, Record<number, Record<string, string>>>> = {};
            for (const item of section.items) {
              const lang = item.language || 'he';
              const group = item.item_group;
              if (!grouped[group]) grouped[group] = {};
              if (!grouped[group][lang]) grouped[group][lang] = {};
              if (!grouped[group][lang][item.sort_order]) grouped[group][lang][item.sort_order] = {};
              grouped[group][lang][item.sort_order][item.field_name] = item.value;
            }
            // Convert to arrays
            for (const [groupName, langs] of Object.entries(grouped)) {
              itemsMap[section.id][groupName] = {};
              for (const [lang, sortedItems] of Object.entries(langs)) {
                const keys = Object.keys(sortedItems).map(Number).sort((a, b) => a - b);
                itemsMap[section.id][groupName][lang] = keys.map(k => sortedItems[k]);
              }
            }
          }
        });

        setEditingContent(contentMap);
        setEditingItems(itemsMap);
      }
    } catch (err) {
      setError('שגיאה בטעינת העמוד');
    }
  };

  const handleCreatePage = async () => {
    if (!newPageData.slug || !newPageData.title) return;

    setIsSaving(true);
    try {
      const response = await api.createPage(newPageData);
      if (response.success) {
        await loadPages();
        setShowNewPageModal(false);
        setNewPageData({ slug: '', title: '', title_en: '', page_type: 'standard' });
      }
    } catch (err) {
      setError('שגיאה ביצירת העמוד');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePage = async () => {
    if (!selectedPage) return;

    setIsSaving(true);
    try {
      await api.updatePage(selectedPage.id, selectedPage);

      // Save section content + items
      for (const section of sections) {
        const sectionContent = editingContent[section.id];
        const sectionItems = editingItems[section.id];

        // Build flat content array from editingContent
        const content = sectionContent
          ? Object.entries(sectionContent)
              .filter(([, value]) => value !== undefined && value !== '')
              .map(([key, value]) => {
                // Fix: use lastIndexOf to correctly split e.g. "left_title_he"
                const lastUnderscore = key.lastIndexOf('_');
                const fieldName = key.substring(0, lastUnderscore);
                const lang = key.substring(lastUnderscore + 1);

                return {
                  field_name: fieldName,
                  field_type: 'text',
                  value_text: value,
                  language: lang || 'he',
                };
              })
          : [];

        // Build items object: { groupName: { he: [...], en: [...] } }
        const items = sectionItems && Object.keys(sectionItems).length > 0
          ? sectionItems
          : undefined;

        await api.updateSectionContent(section.id, content, items);
      }

      // Reorder sections
      await api.reorderSections(sections.map((s, i) => ({ id: s.id, sort_order: i })));

      setError(null);
    } catch (err) {
      setError('שגיאה בשמירת העמוד');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSection = async (sectionType: string) => {
    if (!selectedPage) return;

    try {
      const response = await api.addSection(selectedPage.id, {
        section_type: sectionType,
        sort_order: sections.length,
      });

      if (response.success && response.data) {
        const newSection: Section = {
          id: response.data.id,
          section_type: sectionType,
          sort_order: sections.length,
          is_visible: true,
          content: [],
        };

        setSections([...sections, newSection]);
        setEditingContent({ ...editingContent, [newSection.id]: {} });
        setEditingItems({ ...editingItems, [newSection.id]: {} });
      }
    } catch (err) {
      setError('שגיאה בהוספת סקשן');
    }

    setShowAddSection(false);
  };

  const handleRemoveSection = async (sectionId: string) => {
    if (!confirm('האם למחוק את הסקשן?')) return;

    try {
      await api.deleteSection(sectionId);
      setSections(sections.filter((s) => s.id !== sectionId));
      const newContent = { ...editingContent };
      delete newContent[sectionId];
      setEditingContent(newContent);
      const newItems = { ...editingItems };
      delete newItems[sectionId];
      setEditingItems(newItems);
    } catch (err) {
      setError('שגיאה במחיקת סקשן');
    }
  };

  const handleMoveSection = (sectionId: string, direction: 'up' | 'down') => {
    const index = sections.findIndex((s) => s.id === sectionId);
    const newSections = [...sections];

    if (direction === 'up' && index > 0) {
      [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
    } else if (direction === 'down' && index < sections.length - 1) {
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    }

    newSections.forEach((s, i) => (s.sort_order = i));
    setSections(newSections);
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
    if (!draggedSection || draggedSection === targetId) return;

    const newSections = [...sections];
    const draggedIndex = newSections.findIndex((s) => s.id === draggedSection);
    const targetIndex = newSections.findIndex((s) => s.id === targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [removed] = newSections.splice(draggedIndex, 1);
      newSections.splice(targetIndex, 0, removed);
      newSections.forEach((s, i) => (s.sort_order = i));
      setSections(newSections);
    }
  };

  const handleDragEnd = () => {
    setDraggedSection(null);
  };

  const handleContentChange = (sectionId: string, fieldName: string, value: string) => {
    const key = `${fieldName}_${activeLanguage}`;
    setEditingContent({
      ...editingContent,
      [sectionId]: {
        ...editingContent[sectionId],
        [key]: value,
      },
    });
  };

  // Item handlers for repeatable groups
  const handleItemFieldChange = (sectionId: string, groupName: string, itemIndex: number, fieldName: string, value: string) => {
    setEditingItems(prev => {
      const sectionGroups = { ...prev[sectionId] };
      const groupLangs = { ...sectionGroups[groupName] };
      const items = [...(groupLangs[activeLanguage] || [])];
      items[itemIndex] = { ...items[itemIndex], [fieldName]: value };
      groupLangs[activeLanguage] = items;
      sectionGroups[groupName] = groupLangs;
      return { ...prev, [sectionId]: sectionGroups };
    });
  };

  const handleAddItem = (sectionId: string, groupName: string, fieldConfig: FieldConfig) => {
    const emptyItem: Record<string, string> = {};
    (fieldConfig.itemFields || []).forEach(f => { emptyItem[f.name] = ''; });
    setEditingItems(prev => {
      const sectionGroups = { ...prev[sectionId] };
      const groupLangs = { ...sectionGroups[groupName] };
      const items = [...(groupLangs[activeLanguage] || [])];
      items.push(emptyItem);
      groupLangs[activeLanguage] = items;
      sectionGroups[groupName] = groupLangs;
      return { ...prev, [sectionId]: sectionGroups };
    });
  };

  const handleRemoveItem = (sectionId: string, groupName: string, itemIndex: number) => {
    setEditingItems(prev => {
      const sectionGroups = { ...prev[sectionId] };
      const groupLangs = { ...sectionGroups[groupName] };
      const items = [...(groupLangs[activeLanguage] || [])];
      items.splice(itemIndex, 1);
      groupLangs[activeLanguage] = items;
      sectionGroups[groupName] = groupLangs;
      return { ...prev, [sectionId]: sectionGroups };
    });
  };

  const filteredPages = pages.filter(
    (page) =>
      page.title.includes(searchTerm) || page.slug.includes(searchTerm)
  );

  const getSectionTypeInfo = (type: string) => {
    return sectionTypes.find((s) => s.value === type) || { label: type, icon: '📄', description: '' };
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
          <h1 className="text-2xl font-bold text-gray-900">ניהול עמודים</h1>
          <p className="text-gray-600">בנה ונהל את עמודי האתר עם 15 סוגי סקשן</p>
        </div>
        <button
          onClick={() => setShowNewPageModal(true)}
          className="btn btn-primary flex items-center gap-2"
        >
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
                  {/* Language Toggle */}
                  <div className="flex rounded-lg border overflow-hidden">
                    <button
                      onClick={() => setActiveLanguage('he')}
                      className={`px-3 py-1 text-sm ${
                        activeLanguage === 'he' ? 'bg-primary-500 text-white' : 'bg-white'
                      }`}
                    >
                      עברית
                    </button>
                    <button
                      onClick={() => setActiveLanguage('en')}
                      className={`px-3 py-1 text-sm ${
                        activeLanguage === 'en' ? 'bg-primary-500 text-white' : 'bg-white'
                      }`}
                    >
                      English
                    </button>
                  </div>

                  <button
                    onClick={() => setShowPageSettings(true)}
                    className="btn btn-secondary flex items-center gap-2"
                  >
                    <Settings size={18} />
                  </button>
                  <a
                    href={`https://website-cms.pages.dev/${selectedPage.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary flex items-center gap-2"
                  >
                    <Eye size={18} />
                    תצוגה מקדימה
                  </a>
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
                {(sections || [])
                  .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
                  .map((section, index) => {
                    const typeInfo = getSectionTypeInfo(section.section_type);
                    return (
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
                          <span className="text-xl">{typeInfo.icon}</span>
                          <span className="badge badge-info">{typeInfo.label}</span>
                          <span className="text-gray-500 text-sm flex-1">{typeInfo.description}</span>

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
                              disabled={index === sections.length - 1}
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
                          <div className="p-4 border-t space-y-4">
                            {sectionFieldConfigs[section.section_type]?.map((field) => (
                              <div key={field.name}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  {field.label}
                                  {field.required && <span className="text-red-500">*</span>}
                                </label>
                                {field.type === 'textarea' || field.type === 'richtext' ? (
                                  <textarea
                                    rows={4}
                                    value={editingContent[section.id]?.[`${field.name}_${activeLanguage}`] || ''}
                                    onChange={(e) => handleContentChange(section.id, field.name, e.target.value)}
                                    className="w-full"
                                    placeholder={`${field.label} (${activeLanguage === 'he' ? 'עברית' : 'English'})`}
                                  />
                                ) : field.type === 'items' ? (
                                  <div className="space-y-3 border rounded-lg p-3 bg-gray-50/50">
                                    {(editingItems[section.id]?.[field.name]?.[activeLanguage] || []).map((item, itemIndex) => (
                                      <div key={itemIndex} className="border rounded-lg p-3 bg-white">
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-sm font-medium text-gray-600">
                                            {field.label} #{itemIndex + 1}
                                          </span>
                                          <button
                                            onClick={() => handleRemoveItem(section.id, field.name, itemIndex)}
                                            className="p-1 hover:bg-red-100 rounded text-red-500"
                                            title="הסר פריט"
                                          >
                                            <Trash2 size={16} />
                                          </button>
                                        </div>
                                        <div className="space-y-2">
                                          {field.itemFields?.map(subField => (
                                            <div key={subField.name}>
                                              <label className="block text-xs text-gray-500 mb-1">{subField.label}</label>
                                              {subField.multiline ? (
                                                <textarea
                                                  rows={2}
                                                  value={item[subField.name] || ''}
                                                  onChange={(e) => handleItemFieldChange(section.id, field.name, itemIndex, subField.name, e.target.value)}
                                                  className="w-full text-sm"
                                                  placeholder={subField.label}
                                                />
                                              ) : (
                                                <input
                                                  type="text"
                                                  value={item[subField.name] || ''}
                                                  onChange={(e) => handleItemFieldChange(section.id, field.name, itemIndex, subField.name, e.target.value)}
                                                  className="w-full text-sm"
                                                  placeholder={subField.label}
                                                />
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                    <button
                                      onClick={() => handleAddItem(section.id, field.name, field)}
                                      className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary-500 hover:text-primary-600 transition-colors flex items-center justify-center gap-2 text-sm"
                                    >
                                      <Plus size={16} />
                                      הוסף {field.label}
                                    </button>
                                  </div>
                                ) : field.type === 'image' ? (
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      value={editingContent[section.id]?.[`${field.name}_${activeLanguage}`] || ''}
                                      onChange={(e) => handleContentChange(section.id, field.name, e.target.value)}
                                      className="flex-1"
                                      placeholder="URL של התמונה"
                                    />
                                    <button className="btn btn-secondary">בחר מהמדיה</button>
                                  </div>
                                ) : field.type === 'select' ? (
                                  <select
                                    value={editingContent[section.id]?.[`${field.name}_${activeLanguage}`] || ''}
                                    onChange={(e) => handleContentChange(section.id, field.name, e.target.value)}
                                    className="w-full"
                                  >
                                    <option value="right">ימין</option>
                                    <option value="left">שמאל</option>
                                  </select>
                                ) : (
                                  <input
                                    type="text"
                                    value={editingContent[section.id]?.[`${field.name}_${activeLanguage}`] || ''}
                                    onChange={(e) => handleContentChange(section.id, field.name, e.target.value)}
                                    className="w-full"
                                    placeholder={`${field.label} (${activeLanguage === 'he' ? 'עברית' : 'English'})`}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>

              {/* Add Section Button */}
              <div className="mt-4">
                {showAddSection ? (
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">בחר סוג סקשן (15 אפשרויות)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {sectionTypes.map((type) => (
                        <button
                          key={type.value}
                          onClick={() => handleAddSection(type.value)}
                          className="p-3 text-right border rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{type.icon}</span>
                            <span className="font-medium">{type.label}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{type.description}</p>
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

      {/* New Page Modal */}
      {showNewPageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">עמוד חדש</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Slug (URL)</label>
                <input
                  type="text"
                  value={newPageData.slug}
                  onChange={(e) => setNewPageData({ ...newPageData, slug: e.target.value })}
                  placeholder="about"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">כותרת (עברית)</label>
                <input
                  type="text"
                  value={newPageData.title}
                  onChange={(e) => setNewPageData({ ...newPageData, title: e.target.value })}
                  placeholder="אודות"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Title (English)</label>
                <input
                  type="text"
                  value={newPageData.title_en}
                  onChange={(e) => setNewPageData({ ...newPageData, title_en: e.target.value })}
                  placeholder="About"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">סוג עמוד</label>
                <select
                  value={newPageData.page_type}
                  onChange={(e) => setNewPageData({ ...newPageData, page_type: e.target.value })}
                  className="w-full"
                >
                  <option value="standard">רגיל</option>
                  <option value="treatment">טיפול</option>
                  <option value="disease">מחלה</option>
                  <option value="blog">בלוג</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowNewPageModal(false)}
                className="btn btn-secondary"
              >
                ביטול
              </button>
              <button
                onClick={handleCreatePage}
                disabled={isSaving}
                className="btn btn-primary"
              >
                {isSaving ? <Loader2 className="animate-spin" size={18} /> : 'צור עמוד'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Settings Modal */}
      {showPageSettings && selectedPage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">הגדרות עמוד</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">כותרת SEO</label>
                <input
                  type="text"
                  value={selectedPage.seo_title || ''}
                  onChange={(e) => setSelectedPage({ ...selectedPage, seo_title: e.target.value })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">תיאור SEO</label>
                <textarea
                  value={selectedPage.seo_description || ''}
                  onChange={(e) => setSelectedPage({ ...selectedPage, seo_description: e.target.value })}
                  className="w-full"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">סטטוס</label>
                <select
                  value={selectedPage.status}
                  onChange={(e) => setSelectedPage({ ...selectedPage, status: e.target.value })}
                  className="w-full"
                >
                  <option value="draft">טיוטה</option>
                  <option value="published">מפורסם</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowPageSettings(false)}
                className="btn btn-secondary"
              >
                סגור
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PagesManager;
