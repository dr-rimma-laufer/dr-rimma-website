/**
 * Dr. Rimma Website - CMS API
 * Cloudflare Worker with D1 + R2
 */

export interface Env {
  DB: D1Database;
  R2: R2Bucket;
  CORS_ORIGIN: string;
  JWT_SECRET: string;
}

// Simple JWT implementation
async function createToken(payload: object, secret: string): Promise<string> {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify({ ...payload, exp: Date.now() + 86400000 })); // 24h
  const signature = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(`${header}.${body}.${secret}`)
  );
  return `${header}.${body}.${btoa(String.fromCharCode(...new Uint8Array(signature)))}`;
}

async function verifyToken(token: string, secret: string): Promise<any> {
  try {
    const [header, body, sig] = token.split('.');
    const payload = JSON.parse(atob(body));
    if (payload.exp < Date.now()) throw new Error('Token expired');
    return payload;
  } catch {
    return null;
  }
}

// CORS headers
function corsHeaders(origin: string) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

// JSON response helper
function json(data: any, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

// Auth middleware
async function authenticate(request: Request, env: Env): Promise<any> {
  const auth = request.headers.get('Authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  return verifyToken(auth.slice(7), env.JWT_SECRET);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    const cors = corsHeaders(env.CORS_ORIGIN);

    // Handle CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, { headers: cors });
    }

    try {
      // ==================== AUTH ====================
      if (path === '/api/auth/login' && method === 'POST') {
        const { email, password } = await request.json();
        const user = await env.DB.prepare(
          'SELECT * FROM users WHERE email = ?'
        ).bind(email).first();

        if (!user) {
          return json({ error: 'Invalid credentials' }, 401, cors);
        }

        // Simple password check (in production, use bcrypt)
        const hash = await crypto.subtle.digest(
          'SHA-256',
          new TextEncoder().encode(password)
        );
        const hashStr = btoa(String.fromCharCode(...new Uint8Array(hash)));

        if (user.password_hash !== hashStr) {
          return json({ error: 'Invalid credentials' }, 401, cors);
        }

        const token = await createToken({ userId: user.id, email: user.email, role: user.role }, env.JWT_SECRET);

        // Update last login
        await env.DB.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?')
          .bind(user.id).run();

        return json({
          token,
          user: { id: user.id, email: user.email, name: user.name, role: user.role }
        }, 200, cors);
      }

      if (path === '/api/auth/me' && method === 'GET') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const user = await env.DB.prepare(
          'SELECT id, email, name, role, avatar FROM users WHERE id = ?'
        ).bind(payload.userId).first();

        return json({ user }, 200, cors);
      }

      // ==================== DASHBOARD ====================
      if (path === '/api/dashboard/stats' && method === 'GET') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const [pages, treatments, blogs, faqs, testimonials, contacts] = await Promise.all([
          env.DB.prepare('SELECT COUNT(*) as count FROM pages').first(),
          env.DB.prepare('SELECT COUNT(*) as count FROM treatments').first(),
          env.DB.prepare('SELECT COUNT(*) as count FROM blog_posts WHERE status = "published"').first(),
          env.DB.prepare('SELECT COUNT(*) as count FROM faqs WHERE is_active = 1').first(),
          env.DB.prepare('SELECT COUNT(*) as count FROM testimonials WHERE is_approved = 1').first(),
          env.DB.prepare('SELECT COUNT(*) as count FROM contact_submissions WHERE status = "new"').first(),
        ]);

        return json({
          pages: pages?.count || 0,
          treatments: treatments?.count || 0,
          blogs: blogs?.count || 0,
          faqs: faqs?.count || 0,
          testimonials: testimonials?.count || 0,
          newContacts: contacts?.count || 0,
        }, 200, cors);
      }

      // ==================== PAGES ====================
      if (path === '/api/pages' && method === 'GET') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const pages = await env.DB.prepare(
          'SELECT * FROM pages ORDER BY sort_order, title'
        ).all();

        return json({ pages: pages.results }, 200, cors);
      }

      if (path === '/api/pages' && method === 'POST') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const data = await request.json();
        const id = crypto.randomUUID();

        await env.DB.prepare(`
          INSERT INTO pages (id, slug, title, title_en, page_type, status, seo_title, seo_description)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(id, data.slug, data.title, data.title_en, data.page_type || 'standard',
                data.status || 'draft', data.seo_title, data.seo_description).run();

        return json({ id, message: 'Page created' }, 201, cors);
      }

      if (path.startsWith('/api/pages/') && method === 'GET') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const id = path.split('/')[3];
        const page = await env.DB.prepare('SELECT * FROM pages WHERE id = ?').bind(id).first();

        if (!page) return json({ error: 'Page not found' }, 404, cors);

        // Get sections for this page
        const sections = await env.DB.prepare(
          'SELECT * FROM page_sections WHERE page_id = ? ORDER BY sort_order'
        ).bind(id).all();

        // Get content for each section
        const sectionsWithContent = await Promise.all(
          sections.results.map(async (section: any) => {
            const content = await env.DB.prepare(
              'SELECT * FROM section_content WHERE section_id = ? ORDER BY sort_order'
            ).bind(section.id).all();
            return { ...section, content: content.results };
          })
        );

        return json({ page, sections: sectionsWithContent }, 200, cors);
      }

      if (path.startsWith('/api/pages/') && method === 'PUT') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const id = path.split('/')[3];
        const data = await request.json();

        await env.DB.prepare(`
          UPDATE pages SET
            slug = ?, title = ?, title_en = ?, page_type = ?, status = ?,
            seo_title = ?, seo_description = ?, seo_keywords = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).bind(data.slug, data.title, data.title_en, data.page_type, data.status,
                data.seo_title, data.seo_description, data.seo_keywords, id).run();

        return json({ message: 'Page updated' }, 200, cors);
      }

      if (path.startsWith('/api/pages/') && method === 'DELETE') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const id = path.split('/')[3];
        await env.DB.prepare('DELETE FROM pages WHERE id = ?').bind(id).run();

        return json({ message: 'Page deleted' }, 200, cors);
      }

      // ==================== PAGE SECTIONS ====================
      if (path.match(/\/api\/pages\/[^\/]+\/sections$/) && method === 'POST') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const pageId = path.split('/')[3];
        const data = await request.json();
        const id = crypto.randomUUID();

        await env.DB.prepare(`
          INSERT INTO page_sections (id, page_id, section_type, sort_order, settings)
          VALUES (?, ?, ?, ?, ?)
        `).bind(id, pageId, data.section_type, data.sort_order || 0,
                JSON.stringify(data.settings || {})).run();

        return json({ id, message: 'Section added' }, 201, cors);
      }

      if (path.match(/\/api\/sections\/[^\/]+$/) && method === 'PUT') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const sectionId = path.split('/')[3];
        const data = await request.json();

        await env.DB.prepare(`
          UPDATE page_sections SET
            section_type = ?, sort_order = ?, is_visible = ?, settings = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).bind(data.section_type, data.sort_order, data.is_visible ? 1 : 0,
                JSON.stringify(data.settings || {}), sectionId).run();

        return json({ message: 'Section updated' }, 200, cors);
      }

      if (path.match(/\/api\/sections\/[^\/]+$/) && method === 'DELETE') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const sectionId = path.split('/')[3];
        await env.DB.prepare('DELETE FROM page_sections WHERE id = ?').bind(sectionId).run();

        return json({ message: 'Section deleted' }, 200, cors);
      }

      // ==================== SECTION CONTENT ====================
      if (path.match(/\/api\/sections\/[^\/]+\/content$/) && method === 'PUT') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const sectionId = path.split('/')[3];
        const { content } = await request.json();

        // Delete existing content
        await env.DB.prepare('DELETE FROM section_content WHERE section_id = ?').bind(sectionId).run();

        // Insert new content
        for (const item of content) {
          const id = crypto.randomUUID();
          await env.DB.prepare(`
            INSERT INTO section_content (id, section_id, field_name, field_type, value_text, value_json, language, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `).bind(id, sectionId, item.field_name, item.field_type || 'text',
                  item.value_text, item.value_json ? JSON.stringify(item.value_json) : null,
                  item.language || 'he', item.sort_order || 0).run();
        }

        return json({ message: 'Content updated' }, 200, cors);
      }

      // ==================== TREATMENTS ====================
      if (path === '/api/treatments' && method === 'GET') {
        const treatments = await env.DB.prepare(
          'SELECT t.*, c.name as category_name FROM treatments t LEFT JOIN treatment_categories c ON t.category_id = c.id ORDER BY t.sort_order'
        ).all();
        return json({ treatments: treatments.results }, 200, cors);
      }

      if (path === '/api/treatments' && method === 'POST') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const data = await request.json();
        const id = crypto.randomUUID();

        await env.DB.prepare(`
          INSERT INTO treatments (id, category_id, slug, name, name_en, short_description, full_description,
            hero_image, duration, recovery_time, price_range, is_featured, is_active, sort_order, seo_title, seo_description)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(id, data.category_id, data.slug, data.name, data.name_en, data.short_description,
                data.full_description, data.hero_image, data.duration, data.recovery_time, data.price_range,
                data.is_featured ? 1 : 0, data.is_active ? 1 : 0, data.sort_order || 0,
                data.seo_title, data.seo_description).run();

        return json({ id, message: 'Treatment created' }, 201, cors);
      }

      if (path.startsWith('/api/treatments/') && method === 'GET') {
        const id = path.split('/')[3];
        const treatment = await env.DB.prepare('SELECT * FROM treatments WHERE id = ?').bind(id).first();

        if (!treatment) return json({ error: 'Treatment not found' }, 404, cors);

        const steps = await env.DB.prepare(
          'SELECT * FROM treatment_steps WHERE treatment_id = ? ORDER BY step_number'
        ).bind(id).all();

        const benefits = await env.DB.prepare(
          'SELECT * FROM treatment_benefits WHERE treatment_id = ? ORDER BY sort_order'
        ).bind(id).all();

        return json({ treatment, steps: steps.results, benefits: benefits.results }, 200, cors);
      }

      if (path.startsWith('/api/treatments/') && method === 'PUT') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const id = path.split('/')[3];
        const data = await request.json();

        await env.DB.prepare(`
          UPDATE treatments SET
            category_id = ?, slug = ?, name = ?, name_en = ?, short_description = ?, full_description = ?,
            hero_image = ?, duration = ?, recovery_time = ?, price_range = ?, is_featured = ?, is_active = ?,
            sort_order = ?, seo_title = ?, seo_description = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).bind(data.category_id, data.slug, data.name, data.name_en, data.short_description,
                data.full_description, data.hero_image, data.duration, data.recovery_time, data.price_range,
                data.is_featured ? 1 : 0, data.is_active ? 1 : 0, data.sort_order,
                data.seo_title, data.seo_description, id).run();

        return json({ message: 'Treatment updated' }, 200, cors);
      }

      if (path.startsWith('/api/treatments/') && method === 'DELETE') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const id = path.split('/')[3];
        await env.DB.prepare('DELETE FROM treatments WHERE id = ?').bind(id).run();

        return json({ message: 'Treatment deleted' }, 200, cors);
      }

      // ==================== TREATMENT CATEGORIES ====================
      if (path === '/api/treatment-categories' && method === 'GET') {
        const categories = await env.DB.prepare(
          'SELECT * FROM treatment_categories ORDER BY sort_order'
        ).all();
        return json({ categories: categories.results }, 200, cors);
      }

      // ==================== CONDITIONS ====================
      if (path === '/api/conditions' && method === 'GET') {
        const conditions = await env.DB.prepare(
          'SELECT * FROM conditions ORDER BY sort_order'
        ).all();
        return json({ conditions: conditions.results }, 200, cors);
      }

      if (path === '/api/conditions' && method === 'POST') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const data = await request.json();
        const id = crypto.randomUUID();

        await env.DB.prepare(`
          INSERT INTO conditions (id, category, slug, name, name_en, short_description, full_description,
            causes, symptoms, diagnosis, treatment_options, hero_image, is_active, sort_order, seo_title, seo_description)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(id, data.category, data.slug, data.name, data.name_en, data.short_description,
                data.full_description, data.causes, JSON.stringify(data.symptoms || []),
                data.diagnosis, data.treatment_options, data.hero_image, data.is_active ? 1 : 0,
                data.sort_order || 0, data.seo_title, data.seo_description).run();

        return json({ id, message: 'Condition created' }, 201, cors);
      }

      if (path.startsWith('/api/conditions/') && method === 'PUT') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const id = path.split('/')[3];
        const data = await request.json();

        await env.DB.prepare(`
          UPDATE conditions SET
            category = ?, slug = ?, name = ?, name_en = ?, short_description = ?, full_description = ?,
            causes = ?, symptoms = ?, diagnosis = ?, treatment_options = ?, hero_image = ?,
            is_active = ?, sort_order = ?, seo_title = ?, seo_description = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).bind(data.category, data.slug, data.name, data.name_en, data.short_description,
                data.full_description, data.causes, JSON.stringify(data.symptoms || []),
                data.diagnosis, data.treatment_options, data.hero_image, data.is_active ? 1 : 0,
                data.sort_order, data.seo_title, data.seo_description, id).run();

        return json({ message: 'Condition updated' }, 200, cors);
      }

      if (path.startsWith('/api/conditions/') && method === 'DELETE') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const id = path.split('/')[3];
        await env.DB.prepare('DELETE FROM conditions WHERE id = ?').bind(id).run();

        return json({ message: 'Condition deleted' }, 200, cors);
      }

      // ==================== BLOG ====================
      if (path === '/api/blog' && method === 'GET') {
        const posts = await env.DB.prepare(
          'SELECT * FROM blog_posts ORDER BY created_at DESC'
        ).all();
        return json({ posts: posts.results }, 200, cors);
      }

      if (path === '/api/blog' && method === 'POST') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const data = await request.json();
        const id = crypto.randomUUID();

        await env.DB.prepare(`
          INSERT INTO blog_posts (id, slug, title, title_en, excerpt, content, featured_image,
            author_id, status, is_featured, seo_title, seo_description, published_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(id, data.slug, data.title, data.title_en, data.excerpt, data.content,
                data.featured_image, payload.userId, data.status || 'draft', data.is_featured ? 1 : 0,
                data.seo_title, data.seo_description,
                data.status === 'published' ? new Date().toISOString() : null).run();

        return json({ id, message: 'Post created' }, 201, cors);
      }

      if (path.startsWith('/api/blog/') && method === 'GET') {
        const id = path.split('/')[3];
        const post = await env.DB.prepare('SELECT * FROM blog_posts WHERE id = ?').bind(id).first();
        return json({ post }, 200, cors);
      }

      if (path.startsWith('/api/blog/') && method === 'PUT') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const id = path.split('/')[3];
        const data = await request.json();

        await env.DB.prepare(`
          UPDATE blog_posts SET
            slug = ?, title = ?, title_en = ?, excerpt = ?, content = ?, featured_image = ?,
            status = ?, is_featured = ?, seo_title = ?, seo_description = ?, updated_at = CURRENT_TIMESTAMP,
            published_at = CASE WHEN status = 'published' AND published_at IS NULL THEN CURRENT_TIMESTAMP ELSE published_at END
          WHERE id = ?
        `).bind(data.slug, data.title, data.title_en, data.excerpt, data.content, data.featured_image,
                data.status, data.is_featured ? 1 : 0, data.seo_title, data.seo_description, id).run();

        return json({ message: 'Post updated' }, 200, cors);
      }

      if (path.startsWith('/api/blog/') && method === 'DELETE') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const id = path.split('/')[3];
        await env.DB.prepare('DELETE FROM blog_posts WHERE id = ?').bind(id).run();

        return json({ message: 'Post deleted' }, 200, cors);
      }

      // ==================== FAQ ====================
      if (path === '/api/faqs' && method === 'GET') {
        const faqs = await env.DB.prepare(
          'SELECT f.*, c.name as category_name FROM faqs f LEFT JOIN faq_categories c ON f.category_id = c.id ORDER BY f.sort_order'
        ).all();
        return json({ faqs: faqs.results }, 200, cors);
      }

      if (path === '/api/faqs' && method === 'POST') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const data = await request.json();
        const id = crypto.randomUUID();

        await env.DB.prepare(`
          INSERT INTO faqs (id, category_id, question, question_en, answer, answer_en, is_featured, is_active, sort_order)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(id, data.category_id, data.question, data.question_en, data.answer, data.answer_en,
                data.is_featured ? 1 : 0, data.is_active ? 1 : 0, data.sort_order || 0).run();

        return json({ id, message: 'FAQ created' }, 201, cors);
      }

      if (path.startsWith('/api/faqs/') && method === 'PUT') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const id = path.split('/')[3];
        const data = await request.json();

        await env.DB.prepare(`
          UPDATE faqs SET
            category_id = ?, question = ?, question_en = ?, answer = ?, answer_en = ?,
            is_featured = ?, is_active = ?, sort_order = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).bind(data.category_id, data.question, data.question_en, data.answer, data.answer_en,
                data.is_featured ? 1 : 0, data.is_active ? 1 : 0, data.sort_order, id).run();

        return json({ message: 'FAQ updated' }, 200, cors);
      }

      if (path.startsWith('/api/faqs/') && method === 'DELETE') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const id = path.split('/')[3];
        await env.DB.prepare('DELETE FROM faqs WHERE id = ?').bind(id).run();

        return json({ message: 'FAQ deleted' }, 200, cors);
      }

      if (path === '/api/faq-categories' && method === 'GET') {
        const categories = await env.DB.prepare(
          'SELECT * FROM faq_categories ORDER BY sort_order'
        ).all();
        return json({ categories: categories.results }, 200, cors);
      }

      // ==================== TESTIMONIALS ====================
      if (path === '/api/testimonials' && method === 'GET') {
        const testimonials = await env.DB.prepare(
          'SELECT t.*, tr.name as treatment_name FROM testimonials t LEFT JOIN treatments tr ON t.treatment_id = tr.id ORDER BY t.created_at DESC'
        ).all();
        return json({ testimonials: testimonials.results }, 200, cors);
      }

      if (path === '/api/testimonials' && method === 'POST') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const data = await request.json();
        const id = crypto.randomUUID();

        await env.DB.prepare(`
          INSERT INTO testimonials (id, patient_name, patient_image, treatment_id, rating, title, content,
            before_image, after_image, video_url, is_featured, is_approved, is_visible, display_date)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(id, data.patient_name, data.patient_image, data.treatment_id, data.rating || 5,
                data.title, data.content, data.before_image, data.after_image, data.video_url,
                data.is_featured ? 1 : 0, data.is_approved ? 1 : 0, data.is_visible ? 1 : 0,
                data.display_date).run();

        return json({ id, message: 'Testimonial created' }, 201, cors);
      }

      if (path.startsWith('/api/testimonials/') && method === 'PUT') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const id = path.split('/')[3];
        const data = await request.json();

        await env.DB.prepare(`
          UPDATE testimonials SET
            patient_name = ?, patient_image = ?, treatment_id = ?, rating = ?, title = ?, content = ?,
            before_image = ?, after_image = ?, video_url = ?, is_featured = ?, is_approved = ?, is_visible = ?, display_date = ?
          WHERE id = ?
        `).bind(data.patient_name, data.patient_image, data.treatment_id, data.rating,
                data.title, data.content, data.before_image, data.after_image, data.video_url,
                data.is_featured ? 1 : 0, data.is_approved ? 1 : 0, data.is_visible ? 1 : 0,
                data.display_date, id).run();

        return json({ message: 'Testimonial updated' }, 200, cors);
      }

      if (path.startsWith('/api/testimonials/') && method === 'DELETE') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const id = path.split('/')[3];
        await env.DB.prepare('DELETE FROM testimonials WHERE id = ?').bind(id).run();

        return json({ message: 'Testimonial deleted' }, 200, cors);
      }

      // ==================== GALLERY ====================
      if (path === '/api/gallery' && method === 'GET') {
        const items = await env.DB.prepare(
          'SELECT g.*, m.url, m.thumbnail_url, a.name as album_name FROM gallery_items g LEFT JOIN media m ON g.media_id = m.id LEFT JOIN gallery_albums a ON g.album_id = a.id ORDER BY g.sort_order'
        ).all();
        return json({ items: items.results }, 200, cors);
      }

      if (path === '/api/gallery/albums' && method === 'GET') {
        const albums = await env.DB.prepare(
          'SELECT * FROM gallery_albums ORDER BY sort_order'
        ).all();
        return json({ albums: albums.results }, 200, cors);
      }

      // ==================== NAVIGATION ====================
      if (path === '/api/navigation' && method === 'GET') {
        const menus = await env.DB.prepare('SELECT * FROM navigation_menus').all();
        const items = await env.DB.prepare(
          'SELECT * FROM navigation_items ORDER BY menu_id, sort_order'
        ).all();
        return json({ menus: menus.results, items: items.results }, 200, cors);
      }

      if (path === '/api/navigation' && method === 'PUT') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const { menuId, items } = await request.json();

        // Delete existing items for this menu
        await env.DB.prepare('DELETE FROM navigation_items WHERE menu_id = ?').bind(menuId).run();

        // Insert new items
        for (const item of items) {
          const id = crypto.randomUUID();
          await env.DB.prepare(`
            INSERT INTO navigation_items (id, menu_id, parent_id, label, label_en, url, page_id, icon, is_external, open_in_new_tab, is_visible, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).bind(id, menuId, item.parent_id, item.label, item.label_en, item.url, item.page_id,
                  item.icon, item.is_external ? 1 : 0, item.open_in_new_tab ? 1 : 0,
                  item.is_visible ? 1 : 0, item.sort_order || 0).run();
        }

        return json({ message: 'Navigation updated' }, 200, cors);
      }

      // ==================== SETTINGS ====================
      if (path === '/api/settings' && method === 'GET') {
        const settings = await env.DB.prepare('SELECT * FROM site_settings').all();

        // Convert to key-value object grouped by category
        const grouped: Record<string, Record<string, any>> = {};
        for (const s of settings.results as any[]) {
          if (!grouped[s.category]) grouped[s.category] = {};
          grouped[s.category][s.key] = s.value;
        }

        return json({ settings: grouped }, 200, cors);
      }

      if (path === '/api/settings' && method === 'PUT') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const { settings } = await request.json();

        for (const [key, value] of Object.entries(settings)) {
          await env.DB.prepare(`
            INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = CURRENT_TIMESTAMP
          `).bind(key, value as string, value as string).run();
        }

        return json({ message: 'Settings updated' }, 200, cors);
      }

      // ==================== MEDIA / R2 ====================
      if (path === '/api/media' && method === 'GET') {
        const folder = url.searchParams.get('folder') || 'general';
        const media = await env.DB.prepare(
          'SELECT * FROM media WHERE folder = ? ORDER BY created_at DESC'
        ).bind(folder).all();
        return json({ media: media.results }, 200, cors);
      }

      if (path === '/api/media/upload' && method === 'POST') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const folder = formData.get('folder') as string || 'general';

        if (!file) return json({ error: 'No file provided' }, 400, cors);

        const id = crypto.randomUUID();
        const ext = file.name.split('.').pop();
        const key = `${folder}/${id}.${ext}`;

        // Upload to R2
        await env.R2.put(key, file.stream(), {
          httpMetadata: { contentType: file.type },
        });

        const r2Url = `https://dr-rimma-images.r2.cloudflarestorage.com/${key}`;

        // Save to DB
        await env.DB.prepare(`
          INSERT INTO media (id, filename, original_filename, file_type, mime_type, file_size, url, folder, uploaded_by)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(id, `${id}.${ext}`, file.name,
                file.type.startsWith('image') ? 'image' : 'document',
                file.type, file.size, r2Url, folder, payload.userId).run();

        return json({ id, url: r2Url, message: 'File uploaded' }, 201, cors);
      }

      if (path.startsWith('/api/media/') && method === 'DELETE') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const id = path.split('/')[3];
        const media = await env.DB.prepare('SELECT * FROM media WHERE id = ?').bind(id).first();

        if (media) {
          // Delete from R2
          const key = (media.url as string).split('.com/')[1];
          await env.R2.delete(key);

          // Delete from DB
          await env.DB.prepare('DELETE FROM media WHERE id = ?').bind(id).run();
        }

        return json({ message: 'Media deleted' }, 200, cors);
      }

      // ==================== CONTACT SUBMISSIONS ====================
      if (path === '/api/contacts' && method === 'GET') {
        const payload = await authenticate(request, env);
        if (!payload) return json({ error: 'Unauthorized' }, 401, cors);

        const contacts = await env.DB.prepare(
          'SELECT * FROM contact_submissions ORDER BY created_at DESC'
        ).all();
        return json({ contacts: contacts.results }, 200, cors);
      }

      if (path === '/api/contacts' && method === 'POST') {
        // Public endpoint for contact form
        const data = await request.json();
        const id = crypto.randomUUID();

        await env.DB.prepare(`
          INSERT INTO contact_submissions (id, name, email, phone, subject, message, source_page, treatment_interest)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(id, data.name, data.email, data.phone, data.subject, data.message,
                data.source_page, data.treatment_interest).run();

        return json({ message: 'Message sent successfully' }, 201, cors);
      }

      // ==================== PUBLIC API (for main website) ====================
      if (path === '/api/public/settings' && method === 'GET') {
        const settings = await env.DB.prepare('SELECT key, value FROM site_settings').all();
        const obj: Record<string, any> = {};
        for (const s of settings.results as any[]) {
          obj[s.key] = s.value;
        }
        return json({ settings: obj }, 200, cors);
      }

      if (path === '/api/public/treatments' && method === 'GET') {
        const treatments = await env.DB.prepare(
          'SELECT * FROM treatments WHERE is_active = 1 ORDER BY sort_order'
        ).all();
        return json({ treatments: treatments.results }, 200, cors);
      }

      if (path === '/api/public/faqs' && method === 'GET') {
        const category = url.searchParams.get('category');
        let query = 'SELECT * FROM faqs WHERE is_active = 1';
        if (category) query += ` AND category_id = '${category}'`;
        query += ' ORDER BY sort_order';

        const faqs = await env.DB.prepare(query).all();
        return json({ faqs: faqs.results }, 200, cors);
      }

      if (path === '/api/public/testimonials' && method === 'GET') {
        const testimonials = await env.DB.prepare(
          'SELECT * FROM testimonials WHERE is_approved = 1 AND is_visible = 1 ORDER BY display_date DESC LIMIT 10'
        ).all();
        return json({ testimonials: testimonials.results }, 200, cors);
      }

      if (path === '/api/public/blog' && method === 'GET') {
        const limit = parseInt(url.searchParams.get('limit') || '10');
        const posts = await env.DB.prepare(
          'SELECT id, slug, title, excerpt, featured_image, published_at FROM blog_posts WHERE status = "published" ORDER BY published_at DESC LIMIT ?'
        ).bind(limit).all();
        return json({ posts: posts.results }, 200, cors);
      }

      // 404 for unknown routes
      return json({ error: 'Not found' }, 404, cors);

    } catch (error: any) {
      console.error('API Error:', error);
      return json({ error: error.message || 'Internal server error' }, 500, cors);
    }
  },
};
