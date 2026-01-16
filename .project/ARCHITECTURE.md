# System Architecture

## Overview - 100% Cloudflare Stack

```
┌──────────────────────────────────────────────────────────────┐
│                    CLOUDFLARE PAGES                           │
│                  Next.js Website + Admin                      │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│  │  Home   │ │  About  │ │  Blog   │ │  Admin  │  ...       │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘            │
└────────────────────────┬─────────────────────────────────────┘
                         │ API calls
                         ▼
┌──────────────────────────────────────────────────────────────┐
│                   CLOUDFLARE WORKERS                          │
│                      API Layer                                │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│  │ /pages  │ │ /blog   │ │ /faq    │ │ /upload │  ...       │
│  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘            │
└───────┼───────────┼───────────┼───────────┼──────────────────┘
        │           │           │           │
        ▼           ▼           ▼           ▼
┌───────────────────────────┐  ┌───────────────────────────────┐
│     CLOUDFLARE D1         │  │      CLOUDFLARE R2            │
│    SQLite Database        │  │     Image Storage             │
│  - Pages                  │  │  - Blog images                │
│  - Blog posts             │  │  - Gallery                    │
│  - FAQs                   │  │  - Treatment photos           │
│  - Treatments             │  │                               │
│  - Testimonials           │  │                               │
└───────────────────────────┘  └───────────────────────────────┘
```

---

## Cost: $0/month

| Service | Free Tier Limits | Our Usage |
|---------|------------------|-----------|
| Pages | Unlimited requests | Website |
| Workers | 100k req/day | API |
| D1 | 5GB, 5M reads/day | Database |
| R2 | 10GB storage | Images |

---

## Repository Structure

**GitHub**: `https://github.com/dr-rimma-laufer/dr-rimma-website`

```
dr-rimma-website/
├── .project/                    # Project orchestration
│   ├── STATUS.md
│   ├── ARCHITECTURE.md
│   ├── PROTOCOLS.md
│   ├── BUDGET.md
│   └── logs/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout (Header, Footer)
│   │   ├── page.tsx             # Home page
│   │   ├── globals.css
│   │   ├── about/
│   │   ├── hair-transplant/
│   │   ├── hair-treatments/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── dermatology/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── hair-diseases/
│   │   │   └── [slug]/page.tsx
│   │   ├── aesthetics/
│   │   ├── gallery/
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── faq/
│   │   ├── contact/
│   │   └── admin/               # CMS Admin Panel
│   │       ├── layout.tsx
│   │       ├── page.tsx         # Dashboard
│   │       ├── pages/
│   │       ├── blog/
│   │       ├── faq/
│   │       ├── gallery/
│   │       └── settings/
│   ├── components/
│   │   ├── ui/                  # Shadcn components
│   │   ├── layout/              # Header, Footer
│   │   ├── sections/            # Page sections
│   │   └── admin/               # Admin components
│   ├── lib/
│   │   ├── api.ts               # API client
│   │   ├── auth.ts              # Admin auth
│   │   └── utils.ts
│   └── types/
├── worker/                      # Cloudflare Worker (API)
│   ├── src/
│   │   ├── index.ts             # Main router
│   │   ├── routes/
│   │   │   ├── pages.ts
│   │   │   ├── blog.ts
│   │   │   ├── faq.ts
│   │   │   ├── treatments.ts
│   │   │   ├── gallery.ts
│   │   │   ├── upload.ts
│   │   │   └── auth.ts
│   │   └── db/
│   │       ├── schema.sql
│   │       └── migrations/
│   └── wrangler.toml            # Worker config
├── public/
│   └── images/                  # Static images
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── wrangler.toml                # Pages config
```

---

## Database Schema (D1)

### pages
```sql
CREATE TABLE pages (
  id INTEGER PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_image TEXT,
  content TEXT,
  meta_description TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### treatments
```sql
CREATE TABLE treatments (
  id INTEGER PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'hair' or 'aesthetic'
  short_description TEXT,
  full_description TEXT,
  hero_image TEXT,
  steps TEXT, -- JSON array
  benefits TEXT, -- JSON array
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### diseases
```sql
CREATE TABLE diseases (
  id INTEGER PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'hair' or 'dermatology'
  description TEXT,
  symptoms TEXT,
  treatment_info TEXT,
  hero_image TEXT,
  gallery TEXT, -- JSON array of image URLs
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### blog_posts
```sql
CREATE TABLE blog_posts (
  id INTEGER PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  author TEXT,
  published_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### faqs
```sql
CREATE TABLE faqs (
  id INTEGER PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT, -- 'general', 'hair', 'dermatology', 'aesthetic'
  sort_order INTEGER DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### testimonials
```sql
CREATE TABLE testimonials (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  treatment_type TEXT,
  published_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### gallery_images
```sql
CREATE TABLE gallery_images (
  id INTEGER PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT,
  category TEXT, -- 'before-after', 'clinic', 'team'
  sort_order INTEGER DEFAULT 0,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### site_settings
```sql
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
-- Keys: site_name, phone, email, address, working_hours, social_links (JSON)
```

### admin_users
```sql
CREATE TABLE admin_users (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## API Endpoints (Workers)

### Public (no auth)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/pages | List all pages |
| GET | /api/pages/:slug | Get single page |
| GET | /api/treatments | List treatments |
| GET | /api/treatments/:slug | Get treatment |
| GET | /api/diseases | List diseases |
| GET | /api/diseases/:slug | Get disease |
| GET | /api/blog | List blog posts |
| GET | /api/blog/:slug | Get blog post |
| GET | /api/faq | List FAQs |
| GET | /api/testimonials | List testimonials |
| GET | /api/gallery | List gallery images |
| GET | /api/settings | Get site settings |

### Admin (auth required)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/auth/login | Admin login |
| POST | /api/auth/logout | Admin logout |
| POST | /api/upload | Upload image to R2 |
| POST/PUT/DELETE | /api/admin/* | CRUD operations |

---

## Admin Panel Features

1. **Dashboard** - Overview stats
2. **Pages** - Edit static pages (About, Contact, etc.)
3. **Treatments** - Manage treatment pages
4. **Diseases** - Manage disease pages
5. **Blog** - Create/edit blog posts
6. **FAQ** - Manage FAQs
7. **Gallery** - Upload/manage images
8. **Testimonials** - Manage reviews
9. **Settings** - Site settings, contact info

### Admin UI Stack
- Next.js App Router (`/admin/*`)
- Shadcn/ui components
- Tiptap rich text editor
- React Hook Form
- Simple JWT auth (stored in cookie)

---

## Deployment Flow

### Website (Cloudflare Pages)
```
1. Push to GitHub
2. Cloudflare Pages auto-builds
3. Live in ~2 minutes
```

### API (Cloudflare Workers)
```
1. Run: wrangler deploy
2. Live in ~10 seconds
```

### Database Migrations
```
1. Run: wrangler d1 execute DB --file=migration.sql
2. Instant
```

---

## Design System

### Colors
```css
--gold: #905e26
--dark-blue: #101828
--white: #ffffff
--black: #0a0f1a
```

### Typography
```css
--font-heading: 'Heebo', sans-serif
--font-body: 'Assistant', sans-serif
```

### Spacing
```css
--section-padding: 4rem (py-16)
--container-max: 1280px
--hero-height-desktop: 70vh
--hero-height-mobile: 50vh
```

---

## Security

1. **Admin Auth**: JWT tokens, httpOnly cookies
2. **API Protection**: Auth middleware on admin routes
3. **CORS**: Configured for your domain only
4. **R2**: Signed URLs for uploads
5. **Rate Limiting**: Workers built-in
