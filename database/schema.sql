-- =============================================
-- DR. RIMMA WEBSITE - FULL CMS DATABASE SCHEMA
-- Cloudflare D1
-- =============================================

-- =============================================
-- CORE TABLES
-- =============================================

-- Site Settings (global configuration)
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  category TEXT DEFAULT 'general', -- general, contact, social, seo, theme
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Users (admin panel access)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'editor', -- admin, editor, viewer
  avatar TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME
);

-- =============================================
-- PAGE BUILDER
-- =============================================

-- Pages (all website pages)
CREATE TABLE IF NOT EXISTS pages (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  slug TEXT UNIQUE NOT NULL, -- 'home', 'about', 'hair-transplant', etc.
  title TEXT NOT NULL,
  title_en TEXT, -- English version
  page_type TEXT DEFAULT 'standard', -- standard, treatment, disease, blog
  status TEXT DEFAULT 'published', -- draft, published, archived
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  og_image TEXT,
  template TEXT DEFAULT 'default', -- default, landing, blog, treatment
  sort_order INTEGER DEFAULT 0,
  parent_id TEXT REFERENCES pages(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  published_at DATETIME
);

-- Page Sections (components on each page)
CREATE TABLE IF NOT EXISTS page_sections (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  page_id TEXT NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL, -- hero, cards_grid, faq, gallery, testimonials, text_block, image_text, cta, stats, timeline, comparison
  sort_order INTEGER DEFAULT 0,
  is_visible INTEGER DEFAULT 1,
  settings TEXT, -- JSON for section-specific settings (background color, padding, etc.)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Section Content (actual content for each section)
CREATE TABLE IF NOT EXISTS section_content (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  section_id TEXT NOT NULL REFERENCES page_sections(id) ON DELETE CASCADE,
  field_name TEXT NOT NULL, -- title, subtitle, description, image, button_text, etc.
  field_type TEXT DEFAULT 'text', -- text, richtext, image, link, number, boolean, json
  value_text TEXT,
  value_number REAL,
  value_boolean INTEGER,
  value_json TEXT, -- for complex data like arrays
  language TEXT DEFAULT 'he', -- he, en
  sort_order INTEGER DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TREATMENTS & SERVICES
-- =============================================

-- Treatment Categories
CREATE TABLE IF NOT EXISTS treatment_categories (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  slug TEXT UNIQUE NOT NULL, -- hair-treatments, dermatology, aesthetics
  name TEXT NOT NULL,
  name_en TEXT,
  description TEXT,
  icon TEXT,
  image TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1
);

-- Treatments
CREATE TABLE IF NOT EXISTS treatments (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  category_id TEXT REFERENCES treatment_categories(id),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_en TEXT,
  short_description TEXT,
  full_description TEXT, -- Rich text
  hero_image TEXT,
  gallery_images TEXT, -- JSON array of image URLs
  duration TEXT, -- "30-60 דקות"
  recovery_time TEXT,
  results_timeline TEXT,
  price_range TEXT,
  is_featured INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Treatment Steps (procedure steps)
CREATE TABLE IF NOT EXISTS treatment_steps (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  treatment_id TEXT NOT NULL REFERENCES treatments(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  image TEXT,
  duration TEXT
);

-- Treatment Benefits
CREATE TABLE IF NOT EXISTS treatment_benefits (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  treatment_id TEXT NOT NULL REFERENCES treatments(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0
);

-- =============================================
-- HAIR DISEASES / CONDITIONS
-- =============================================

CREATE TABLE IF NOT EXISTS conditions (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  category TEXT NOT NULL, -- hair_disease, skin_condition
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_en TEXT,
  short_description TEXT,
  full_description TEXT, -- Rich text
  causes TEXT, -- Rich text
  symptoms TEXT, -- JSON array
  diagnosis TEXT, -- Rich text
  treatment_options TEXT, -- Rich text
  hero_image TEXT,
  gallery_images TEXT, -- JSON array
  related_treatments TEXT, -- JSON array of treatment IDs
  is_active INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- BLOG
-- =============================================

-- Blog Categories
CREATE TABLE IF NOT EXISTS blog_categories (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_en TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_en TEXT,
  excerpt TEXT,
  content TEXT NOT NULL, -- Rich text / HTML
  featured_image TEXT,
  author_id TEXT REFERENCES users(id),
  status TEXT DEFAULT 'draft', -- draft, published, archived
  is_featured INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  published_at DATETIME
);

-- Blog Post Categories (many-to-many)
CREATE TABLE IF NOT EXISTS blog_post_categories (
  post_id TEXT NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id TEXT NOT NULL REFERENCES blog_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Blog Tags
CREATE TABLE IF NOT EXISTS blog_tags (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL
);

-- Blog Post Tags (many-to-many)
CREATE TABLE IF NOT EXISTS blog_post_tags (
  post_id TEXT NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id TEXT NOT NULL REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- =============================================
-- FAQ
-- =============================================

-- FAQ Categories
CREATE TABLE IF NOT EXISTS faq_categories (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_en TEXT,
  sort_order INTEGER DEFAULT 0
);

-- FAQs
CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  category_id TEXT REFERENCES faq_categories(id),
  question TEXT NOT NULL,
  question_en TEXT,
  answer TEXT NOT NULL, -- Rich text
  answer_en TEXT,
  related_page_id TEXT REFERENCES pages(id), -- Show on specific page
  related_treatment_id TEXT REFERENCES treatments(id),
  is_featured INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TESTIMONIALS & REVIEWS
-- =============================================

CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  patient_name TEXT NOT NULL,
  patient_image TEXT,
  treatment_id TEXT REFERENCES treatments(id),
  rating INTEGER DEFAULT 5, -- 1-5 stars
  title TEXT,
  content TEXT NOT NULL,
  before_image TEXT,
  after_image TEXT,
  video_url TEXT,
  is_featured INTEGER DEFAULT 0,
  is_approved INTEGER DEFAULT 0, -- Admin must approve
  is_visible INTEGER DEFAULT 1,
  display_date DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- GALLERY / MEDIA
-- =============================================

-- Media Library (all uploaded files)
CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  filename TEXT NOT NULL,
  original_filename TEXT,
  file_type TEXT, -- image, video, document
  mime_type TEXT,
  file_size INTEGER,
  url TEXT NOT NULL, -- R2 URL
  thumbnail_url TEXT,
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  caption TEXT,
  folder TEXT DEFAULT 'general',
  uploaded_by TEXT REFERENCES users(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Gallery Albums
CREATE TABLE IF NOT EXISTS gallery_albums (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_en TEXT,
  description TEXT,
  cover_image TEXT,
  is_visible INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0
);

-- Gallery Items
CREATE TABLE IF NOT EXISTS gallery_items (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  album_id TEXT REFERENCES gallery_albums(id) ON DELETE SET NULL,
  media_id TEXT NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  title TEXT,
  description TEXT,
  category TEXT, -- before_after, procedure, clinic, team
  treatment_id TEXT REFERENCES treatments(id),
  is_before_after INTEGER DEFAULT 0,
  before_image TEXT,
  after_image TEXT,
  is_visible INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- NAVIGATION
-- =============================================

CREATE TABLE IF NOT EXISTS navigation_menus (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  location TEXT UNIQUE NOT NULL, -- header, footer, mobile
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS navigation_items (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  menu_id TEXT NOT NULL REFERENCES navigation_menus(id) ON DELETE CASCADE,
  parent_id TEXT REFERENCES navigation_items(id),
  label TEXT NOT NULL,
  label_en TEXT,
  url TEXT,
  page_id TEXT REFERENCES pages(id),
  icon TEXT,
  is_external INTEGER DEFAULT 0,
  open_in_new_tab INTEGER DEFAULT 0,
  is_visible INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0
);

-- =============================================
-- FORMS & LEADS
-- =============================================

-- Contact Form Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  subject TEXT,
  message TEXT,
  source_page TEXT,
  treatment_interest TEXT,
  status TEXT DEFAULT 'new', -- new, read, replied, archived
  notes TEXT, -- Admin notes
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Appointment Requests
CREATE TABLE IF NOT EXISTS appointment_requests (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  preferred_date DATE,
  preferred_time TEXT,
  treatment_id TEXT REFERENCES treatments(id),
  message TEXT,
  status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled, completed
  admin_notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- VERSION HISTORY
-- =============================================

CREATE TABLE IF NOT EXISTS content_versions (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  entity_type TEXT NOT NULL, -- page, treatment, blog_post, etc.
  entity_id TEXT NOT NULL,
  version_number INTEGER NOT NULL,
  content_snapshot TEXT NOT NULL, -- JSON of entire entity
  changed_by TEXT REFERENCES users(id),
  change_summary TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_status ON pages(status);
CREATE INDEX IF NOT EXISTS idx_page_sections_page ON page_sections(page_id);
CREATE INDEX IF NOT EXISTS idx_section_content_section ON section_content(section_id);
CREATE INDEX IF NOT EXISTS idx_treatments_slug ON treatments(slug);
CREATE INDEX IF NOT EXISTS idx_treatments_category ON treatments(category_id);
CREATE INDEX IF NOT EXISTS idx_conditions_slug ON conditions(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category_id);
CREATE INDEX IF NOT EXISTS idx_media_folder ON media(folder);
CREATE INDEX IF NOT EXISTS idx_gallery_items_album ON gallery_items(album_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_treatment ON testimonials(treatment_id);
CREATE INDEX IF NOT EXISTS idx_content_versions_entity ON content_versions(entity_type, entity_id);

-- =============================================
-- INITIAL DATA
-- =============================================

-- Default navigation menus
INSERT OR IGNORE INTO navigation_menus (id, location, name) VALUES
  ('header-menu', 'header', 'Header Navigation'),
  ('footer-menu', 'footer', 'Footer Navigation'),
  ('mobile-menu', 'mobile', 'Mobile Navigation');

-- Default FAQ categories
INSERT OR IGNORE INTO faq_categories (id, slug, name, sort_order) VALUES
  ('faq-general', 'general', 'שאלות כלליות', 1),
  ('faq-hair-transplant', 'hair-transplant', 'השתלת שיער', 2),
  ('faq-treatments', 'treatments', 'טיפולים', 3),
  ('faq-recovery', 'recovery', 'החלמה', 4);

-- Default treatment categories
INSERT OR IGNORE INTO treatment_categories (id, slug, name, sort_order) VALUES
  ('cat-hair-transplant', 'hair-transplant', 'השתלת שיער', 1),
  ('cat-hair-treatments', 'hair-treatments', 'טיפולי שיער שמרניים', 2),
  ('cat-dermatology', 'dermatology', 'רפואת עור', 3),
  ('cat-aesthetics', 'aesthetics', 'אסתטיקה רפואית', 4);

-- Default blog categories
INSERT OR IGNORE INTO blog_categories (id, slug, name, sort_order) VALUES
  ('blog-hair', 'hair', 'שיער', 1),
  ('blog-skin', 'skin', 'עור', 2),
  ('blog-aesthetics', 'aesthetics', 'אסתטיקה', 3),
  ('blog-tips', 'tips', 'טיפים', 4);

-- Default site settings
INSERT OR IGNORE INTO site_settings (key, value, category) VALUES
  ('site_name', 'ד"ר רימה לאופר', 'general'),
  ('site_name_en', 'Dr. Rimma Laufer', 'general'),
  ('site_tagline', 'מומחית לרפואת עור, שיער ואסתטיקה רפואית', 'general'),
  ('phone', '03-1234567', 'contact'),
  ('mobile', '050-1234567', 'contact'),
  ('email', 'info@dr-rimma.com', 'contact'),
  ('address', 'רחוב הרופאים 1, תל אביב', 'contact'),
  ('working_hours', '{"sunday":"09:00-18:00","monday":"09:00-18:00","tuesday":"09:00-18:00","wednesday":"09:00-18:00","thursday":"09:00-14:00","friday":"closed","saturday":"closed"}', 'contact'),
  ('facebook', 'https://facebook.com/drrimma', 'social'),
  ('instagram', 'https://instagram.com/drrimma', 'social'),
  ('whatsapp', '972501234567', 'social'),
  ('primary_color', '#905e26', 'theme'),
  ('secondary_color', '#101828', 'theme'),
  ('font_hebrew', 'Heebo', 'theme'),
  ('font_english', 'Assistant', 'theme');
