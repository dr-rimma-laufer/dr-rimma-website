import { contentAPI } from '../../utils/supabase/client';
import { CMS_CONTENT_TYPES, CMS_MESSAGES } from './CMSConstants';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export interface CMSOperationResult {
  success: boolean;
  data?: any;
  message: string;
}

// Initialize site with sample data if needed
const initializeSite = async () => {
  try {
    console.log('CMSHelpers - Initializing site...');
    
    const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-5af46cb6/init`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    const result = await response.json();
    console.log('CMSHelpers - Site initialization result:', result);
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to initialize site');
    }
    
    return result;
  } catch (error) {
    console.error('CMSHelpers - Error initializing site:', error);
    throw error;
  }
};

// Export the initialize function for manual use
export const initializeSiteManually = initializeSite;

export const loadAllContent = async () => {
  try {
    console.log('CMSHelpers - Starting to load all content...');
    
    const [postsData, faqsData, reviewsData, contactsData, settingsData] = await Promise.all([
      contentAPI.getBlogPosts().then(data => {
        console.log('CMSHelpers - Blog posts response:', data);
        return data;
      }).catch(err => {
        console.error('CMSHelpers - Blog posts error:', err);
        return { posts: [] };
      }),
      contentAPI.getFAQs().then(data => {
        console.log('CMSHelpers - FAQs response:', data);
        return data;
      }).catch(err => {
        console.error('CMSHelpers - FAQs error:', err);
        return { faqs: [] };
      }),
      contentAPI.getReviews().then(data => {
        console.log('CMSHelpers - Reviews response:', data);
        return data;
      }).catch(err => {
        console.error('CMSHelpers - Reviews error:', err);
        return { reviews: [] };
      }),
      contentAPI.getContactSubmissions().catch(() => ({ contacts: [] })), // Add fallback for contacts
      contentAPI.getSettings().then(data => {
        console.log('CMSHelpers - Settings response:', data);
        return data;
      }).catch(err => {
        console.error('CMSHelpers - Settings error:', err);
        return { settings: {} };
      })
    ]);
    
    const result = {
      blogPosts: postsData.posts || [],
      faqs: faqsData.faqs || [],
      reviews: reviewsData.reviews || [],
      contacts: contactsData.contacts || contactsData.submissions || [],
      settings: settingsData.settings || {}
    };
    
    console.log('CMSHelpers - Final result:', result);
    return result;
  } catch (error) {
    console.error('CMSHelpers - Error loading content:', error);
    throw new Error(CMS_MESSAGES.ERROR.LOADING_CONTENT);
  }
};

export const saveContent = async (type: string, data: any, editingItem?: any): Promise<CMSOperationResult> => {
  try {
    let savedItem: any = null;
    let message = '';
    
    switch (type) {
      case CMS_CONTENT_TYPES.BLOG:
        if (editingItem?.id) {
          savedItem = await contentAPI.updateBlogPost(editingItem.id, data);
          message = CMS_MESSAGES.SUCCESS.BLOG_UPDATED;
        } else {
          savedItem = await contentAPI.createBlogPost(data);
          message = CMS_MESSAGES.SUCCESS.BLOG_CREATED;
        }
        break;
        
      case CMS_CONTENT_TYPES.FAQ:
        if (editingItem?.id) {
          savedItem = await contentAPI.updateFAQ(editingItem.id, data);
          message = CMS_MESSAGES.SUCCESS.FAQ_UPDATED;
        } else {
          savedItem = await contentAPI.createFAQ(data);
          message = CMS_MESSAGES.SUCCESS.FAQ_CREATED;
        }
        break;
        
      case CMS_CONTENT_TYPES.REVIEW:
        savedItem = await contentAPI.createReview(data);
        message = CMS_MESSAGES.SUCCESS.REVIEW_CREATED;
        break;
        
      case CMS_CONTENT_TYPES.SETTINGS:
        savedItem = await contentAPI.updateSettings(data);
        message = CMS_MESSAGES.SUCCESS.SETTINGS_UPDATED;
        break;
        
      default:
        throw new Error('Unknown content type');
    }
    
    return {
      success: true,
      data: savedItem,
      message
    };
  } catch (error) {
    console.error('Error saving:', error);
    return {
      success: false,
      message: CMS_MESSAGES.ERROR.SAVING_DATA
    };
  }
};

export const deleteContent = async (type: string, id: string): Promise<CMSOperationResult> => {
  try {
    switch (type) {
      case CMS_CONTENT_TYPES.BLOG:
        await contentAPI.deleteBlogPost(id);
        break;
      case CMS_CONTENT_TYPES.FAQ:
        await contentAPI.deleteFAQ(id);
        break;
      default:
        throw new Error('Unknown content type for deletion');
    }
    
    return {
      success: true,
      message: CMS_MESSAGES.SUCCESS.DELETED
    };
  } catch (error) {
    console.error('Error deleting:', error);
    return {
      success: false,
      message: CMS_MESSAGES.ERROR.DELETING
    };
  }
};

export const updateLocalState = (
  type: string,
  data: any,
  editingItem: any,
  setState: (updater: (prev: any[]) => any[]) => void
) => {
  if (type === CMS_CONTENT_TYPES.BLOG) {
    if (editingItem?.id) {
      setState(prev => prev.map(post => 
        post.id === editingItem.id 
          ? { ...post, ...data, id: editingItem.id }
          : post
      ));
    } else if (data?.post) {
      setState(prev => [data.post, ...prev]);
    }
  } else if (type === CMS_CONTENT_TYPES.FAQ) {
    if (editingItem?.id) {
      setState(prev => prev.map(faq => 
        faq.id === editingItem.id 
          ? { ...faq, ...data, id: editingItem.id }
          : faq
      ));
    } else if (data?.faq) {
      setState(prev => [data.faq, ...prev]);
    }
  }
};