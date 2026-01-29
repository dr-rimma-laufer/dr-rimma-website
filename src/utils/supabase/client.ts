// Stub - will be replaced with D1/Cloudflare
export const supabase = {
  from: () => ({
    select: () => ({ data: [], error: null }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null }),
    eq: () => ({ data: null, error: null }),
  }),
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: null, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    }),
  },
  auth: {
    signIn: () => Promise.resolve({ data: null, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
};
export const createClient = () => supabase;
export const auth: any = {
  signIn: (email: string, password: string) => Promise.resolve({ user: null, error: null }),
  signOut: () => Promise.resolve({ error: null }),
  signUp: (email: string, password: string) => Promise.resolve({ user: null, error: null }),
  getSession: () => Promise.resolve({ session: null }),
  onAuthStateChange: (callback: any) => ({ data: { subscription: { unsubscribe: () => {} } } }),
};
export const contentAPI: any = {
  getFAQs: () => Promise.resolve([]),
  getBlogPosts: () => Promise.resolve([]),
  getGalleryImages: () => Promise.resolve([]),
  uploadImage: (file: File) => Promise.resolve({ filePath: '', imageUrl: '', path: '', url: '' }),
  deleteImage: (path: string) => Promise.resolve(true),
  updateBlogPost: (id: string, data: any) => Promise.resolve(null),
  createBlogPost: (data: any) => Promise.resolve(null),
  deleteBlogPost: (id: string) => Promise.resolve(true),
  getChangeLogs: (opts: any) => Promise.resolve({ data: [], count: 0 }),
  getChangeSnapshots: (opts: any) => Promise.resolve({ data: [], count: 0 }),
  getChangeStatistics: (opts: any) => Promise.resolve({ totalChanges: 0, byContentType: {}, byChangeType: {} }),
  getTreatmentTypes: () => Promise.resolve([]),
  updateTreatmentType: (id: string, data: any) => Promise.resolve(null),
  createTreatmentType: (data: any) => Promise.resolve(null),
  deleteTreatmentType: (id: string) => Promise.resolve(true),
};
