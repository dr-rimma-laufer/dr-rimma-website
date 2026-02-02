// API client for Cloudflare D1 and R2

const API_BASE = import.meta.env.PROD
  ? 'https://dr-rimma-api.drrimmalaufer.workers.dev/api'
  : '/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('admin_token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('admin_token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('admin_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
      });

      if (response.status === 401) {
        this.clearToken();
        window.location.href = '/login';
        return { success: false, error: 'Unauthorized' };
      }

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Request failed' };
      }

      return { success: true, data };
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  // Auth
  async login(email: string, password: string) {
    return this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout() {
    this.clearToken();
    return { success: true };
  }

  async getMe() {
    return this.request<{ user: any }>('/auth/me');
  }

  // Pages
  async getPages() {
    return this.request<any[]>('/pages');
  }

  async getPage(slug: string) {
    return this.request<any>(`/pages/${slug}`);
  }

  async updatePage(slug: string, data: any) {
    return this.request<any>(`/pages/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async createPage(data: any) {
    return this.request<any>('/pages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deletePage(slug: string) {
    return this.request<void>(`/pages/${slug}`, {
      method: 'DELETE',
    });
  }

  // Treatments
  async getTreatments() {
    return this.request<any[]>('/treatments');
  }

  async getTreatment(id: string) {
    return this.request<any>(`/treatments/${id}`);
  }

  async createTreatment(data: any) {
    return this.request<any>('/treatments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTreatment(id: string, data: any) {
    return this.request<any>(`/treatments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTreatment(id: string) {
    return this.request<void>(`/treatments/${id}`, {
      method: 'DELETE',
    });
  }

  // Conditions (Hair Diseases)
  async getConditions() {
    return this.request<any[]>('/conditions');
  }

  async getCondition(id: string) {
    return this.request<any>(`/conditions/${id}`);
  }

  async createCondition(data: any) {
    return this.request<any>('/conditions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCondition(id: string, data: any) {
    return this.request<any>(`/conditions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCondition(id: string) {
    return this.request<void>(`/conditions/${id}`, {
      method: 'DELETE',
    });
  }

  // Blog
  async getPosts() {
    return this.request<any[]>('/blog');
  }

  async getPost(id: string) {
    return this.request<any>(`/blog/${id}`);
  }

  async createPost(data: any) {
    return this.request<any>('/blog', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePost(id: string, data: any) {
    return this.request<any>(`/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePost(id: string) {
    return this.request<void>(`/blog/${id}`, {
      method: 'DELETE',
    });
  }

  // FAQ
  async getFaqs() {
    return this.request<any[]>('/faq');
  }

  async getFaq(id: string) {
    return this.request<any>(`/faq/${id}`);
  }

  async createFaq(data: any) {
    return this.request<any>('/faq', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateFaq(id: string, data: any) {
    return this.request<any>(`/faq/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteFaq(id: string) {
    return this.request<void>(`/faq/${id}`, {
      method: 'DELETE',
    });
  }

  // Gallery
  async getGalleryItems() {
    return this.request<any[]>('/gallery');
  }

  async createGalleryItem(data: any) {
    return this.request<any>('/gallery', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateGalleryItem(id: string, data: any) {
    return this.request<any>(`/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteGalleryItem(id: string) {
    return this.request<void>(`/gallery/${id}`, {
      method: 'DELETE',
    });
  }

  // Testimonials
  async getTestimonials() {
    return this.request<any[]>('/testimonials');
  }

  async createTestimonial(data: any) {
    return this.request<any>('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTestimonial(id: string, data: any) {
    return this.request<any>(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTestimonial(id: string) {
    return this.request<void>(`/testimonials/${id}`, {
      method: 'DELETE',
    });
  }

  // Navigation
  async getNavigation() {
    return this.request<any>('/navigation');
  }

  async updateNavigation(data: any) {
    return this.request<any>('/navigation', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Settings
  async getSettings() {
    return this.request<any>('/settings');
  }

  async updateSettings(data: any) {
    return this.request<any>('/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Media (R2)
  async getMedia(folder?: string) {
    const query = folder ? `?folder=${encodeURIComponent(folder)}` : '';
    return this.request<any[]>(`/media${query}`);
  }

  async uploadMedia(file: File, folder?: string) {
    const formData = new FormData();
    formData.append('file', file);
    if (folder) {
      formData.append('folder', folder);
    }

    const token = this.getToken();

    try {
      const response = await fetch(`${API_BASE}/media/upload`, {
        method: 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Upload failed' };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Upload Error:', error);
      return { success: false, error: 'Upload failed' };
    }
  }

  async deleteMedia(key: string) {
    return this.request<void>(`/media/${encodeURIComponent(key)}`, {
      method: 'DELETE',
    });
  }

  // Dashboard Stats
  async getDashboardStats() {
    return this.request<{
      totalPages: number;
      totalPosts: number;
      totalTreatments: number;
      totalMedia: number;
      recentActivity: any[];
    }>('/dashboard/stats');
  }
}

export const api = new ApiClient();
export default api;
