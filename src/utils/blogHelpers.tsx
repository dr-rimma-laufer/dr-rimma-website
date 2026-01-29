import { BlogPost, BlogImage } from './blogConstants';

export const transformCMSPostToBlogPost = (post: any): BlogPost => {
  console.log('transformCMSPostToBlogPost - Original post:', post);
  
  // טיפול בתמונות נוספות - תמיכה בפורמטים שונים
  let additionalImages: BlogImage[] = [];
  
  if (post.additionalImages) {
    console.log('transformCMSPostToBlogPost - Original additionalImages:', post.additionalImages);
    
    additionalImages = post.additionalImages.map((img: any, index: number) => {
      // אם התמונה כבר בפורמט BlogImage
      if (typeof img === 'object' && img.url) {
        return {
          id: img.id || `cms_${index}`,
          url: img.url,
          caption: img.caption || `תמונה ${index + 1}`,
          position: img.position || index + 1,
          alt: img.alt || img.caption || `תמונה ${index + 1}`
        };
      }
      // אם התמונה היא רק URL (string)
      else if (typeof img === 'string') {
        return {
          id: `cms_string_${index}`,
          url: img,
          caption: `תמונה מה-CMS ${index + 1}`,
          position: index + 1,
          alt: `תמונה מה-CMS ${index + 1}`
        };
      }
      // אם התמונה היא אובייקט אחר
      else if (typeof img === 'object' && (img.src || img.image || img.imageUrl)) {
        return {
          id: img.id || `cms_obj_${index}`,
          url: img.src || img.image || img.imageUrl,
          caption: img.caption || img.description || img.title || `תמונה ${index + 1}`,
          position: img.position || index + 1,
          alt: img.alt || img.caption || img.description || img.title || `תמונה ${index + 1}`
        };
      }
      // fallback
      else {
        console.warn('transformCMSPostToBlogPost - Unknown image format:', img);
        return null;
      }
    }).filter(Boolean) as BlogImage[];
  }
  
  console.log('transformCMSPostToBlogPost - Processed additionalImages:', additionalImages);
  
  const transformedPost: BlogPost = {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    tags: post.tags || [],
    image: post.image || post.imageUrl || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=400&fit=crop&crop=smart&auto=format&q=80",
    createdAt: post.createdAt || post.publishedAt,
    author: post.author || "ד״ר רימה לאופר",
    readTime: post.readTime || "5 דקות קריאה",
    views: post.views || Math.floor(Math.random() * 1000) + 100,
    featured: post.featured !== undefined ? post.featured : true,
    additionalImages: additionalImages
  };
  
  console.log('transformCMSPostToBlogPost - Final transformed post:', transformedPost);
  
  return transformedPost;
};

export const transformCMSResponseToBlogPosts = (response: any): BlogPost[] => {
  console.log('transformCMSResponseToBlogPosts - Original response:', response);
  
  if (response && response.posts && response.posts.length > 0) {
    const transformedPosts = response.posts.map((post: any) => transformCMSPostToBlogPost(post));
    console.log('transformCMSResponseToBlogPosts - Final transformed posts:', transformedPosts);
    return transformedPosts;
  }
  
  console.log('transformCMSResponseToBlogPosts - No posts found, returning empty array');
  return [];
};