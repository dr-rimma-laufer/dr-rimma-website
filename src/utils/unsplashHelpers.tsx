// Unsplash API helpers with enhanced error handling and fallback images

export interface UnsplashImageOptions {
  query: string;
  width?: number;
  height?: number;
  quality?: number;
  crop?: 'entropy' | 'center' | 'top' | 'bottom' | 'left' | 'right';
  format?: 'jpg' | 'png' | 'webp';
}

// High-quality fallback images for medical/hair treatment context - updated with working URLs
const MEDICAL_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800',
  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800',
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800',
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800',
  'https://images.unsplash.com/photo-1628595351029-c2bf17511435?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800'
];

// Map common search terms to relevant medical images
const QUERY_FALLBACK_MAP: Record<string, string[]> = {
  'medical': MEDICAL_FALLBACK_IMAGES.slice(0, 3),
  'hair': MEDICAL_FALLBACK_IMAGES.slice(1, 4),
  'treatment': MEDICAL_FALLBACK_IMAGES.slice(2, 5),
  'clinic': MEDICAL_FALLBACK_IMAGES.slice(0, 2),
  'dermatology': MEDICAL_FALLBACK_IMAGES.slice(3, 6),
  'doctor': MEDICAL_FALLBACK_IMAGES.slice(0, 3),
  'health': MEDICAL_FALLBACK_IMAGES.slice(1, 4),
  'scalp': MEDICAL_FALLBACK_IMAGES.slice(2, 5),
  'beauty': MEDICAL_FALLBACK_IMAGES.slice(0, 3),
  'professional': MEDICAL_FALLBACK_IMAGES.slice(1, 4)
};

/**
 * Get fallback images for a specific query
 */
export function getFallbackImagesForQuery(query: string): string[] {
  const normalizedQuery = query.toLowerCase();
  
  // Find relevant fallbacks based on keywords
  for (const [keyword, images] of Object.entries(QUERY_FALLBACK_MAP)) {
    if (normalizedQuery.includes(keyword)) {
      return images;
    }
  }
  
  // Default fallbacks for medical context
  return MEDICAL_FALLBACK_IMAGES.slice(0, 3);
}

/**
 * Build Unsplash URL with proper parameters
 */
export function buildUnsplashUrl(options: UnsplashImageOptions): string {
  const {
    query,
    width = 800,
    height,
    quality = 80,
    crop = 'entropy',
    format = 'jpg'
  } = options;

  // Base Unsplash search URL - using a working default image
  const baseUrl = 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256'; // Default image ID
  
  // Build parameters
  const params = new URLSearchParams({
    crop,
    cs: 'tinysrgb',
    fit: 'max',
    fm: format,
    ixlib: 'rb-4.1.0',
    q: quality.toString(),
    w: width.toString()
  });

  if (height) {
    params.set('h', height.toString());
  }

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Test if an image URL is accessible
 */
export function testImageAccess(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new window.Image();
    const timeout = setTimeout(() => {
      resolve(false);
    }, 5000); // 5 second timeout

    img.onload = () => {
      clearTimeout(timeout);
      resolve(true);
    };

    img.onerror = () => {
      clearTimeout(timeout);
      resolve(false);
    };

    img.crossOrigin = 'anonymous';
    img.src = url;
  });
}

/**
 * Get a working image URL with fallback mechanism
 */
export async function getReliableImageUrl(options: UnsplashImageOptions): Promise<string> {
  console.log('🔍 Searching for reliable image for query:', options.query);
  
  // Try to build and test the primary Unsplash URL
  try {
    const primaryUrl = buildUnsplashUrl(options);
    console.log('🧪 Testing primary URL:', primaryUrl.substring(0, 50) + '...');
    
    const isPrimaryWorking = await testImageAccess(primaryUrl);
    if (isPrimaryWorking) {
      console.log('✅ Primary URL working');
      return primaryUrl;
    }
  } catch (error) {
    console.warn('⚠️ Error testing primary URL:', error);
  }

  // Try fallback images
  const fallbackImages = getFallbackImagesForQuery(options.query);
  console.log(`🔄 Testing ${fallbackImages.length} fallback images...`);

  for (let i = 0; i < fallbackImages.length; i++) {
    const fallbackUrl = fallbackImages[i];
    console.log(`🧪 Testing fallback ${i + 1}/${fallbackImages.length}:`, fallbackUrl.substring(0, 50) + '...');
    
    try {
      const isWorking = await testImageAccess(fallbackUrl);
      if (isWorking) {
        console.log(`✅ Fallback ${i + 1} working`);
        return fallbackUrl;
      }
    } catch (error) {
      console.warn(`⚠️ Fallback ${i + 1} failed:`, error);
    }
  }

  // If all else fails, return a data URL placeholder
  console.error('❌ All image sources failed, returning placeholder');
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPtmV2YXZl9mGINiz2KjZitixPC90ZXh0Pgo8L3N2Zz4K';
}

/**
 * Enhanced version of the unsplash tool with fallback handling
 */
export async function getUnsplashImage(query: string): Promise<string> {
  try {
    console.log('🖼️ Getting image for query:', query);
    
    const imageUrl = await getReliableImageUrl({
      query,
      width: 800,
      quality: 80,
      crop: 'entropy'
    });
    
    console.log('📸 Final image URL:', imageUrl.substring(0, 50) + '...');
    return imageUrl;
  } catch (error) {
    console.error('❌ Failed to get Unsplash image:', error);
    
    // Return first fallback as last resort
    const fallbacks = getFallbackImagesForQuery(query);
    return fallbacks[0] || MEDICAL_FALLBACK_IMAGES[0];
  }
}

/**
 * Preload images to improve user experience
 */
export function preloadImages(urls: string[]): Promise<boolean[]> {
  return Promise.all(
    urls.map(url => testImageAccess(url))
  );
}

/**
 * Get multiple images for a gallery with variety
 */
export async function getImageGallery(query: string, count: number = 3): Promise<string[]> {
  const images: string[] = [];
  const fallbackImages = getFallbackImagesForQuery(query);
  
  // Try to get working images up to the requested count
  for (let i = 0; i < Math.min(count, fallbackImages.length); i++) {
    try {
      const isWorking = await testImageAccess(fallbackImages[i]);
      if (isWorking) {
        images.push(fallbackImages[i]);
      }
    } catch (error) {
      console.warn(`Failed to test gallery image ${i}:`, error);
    }
  }
  
  // Fill remaining slots with first working image if needed
  while (images.length < count && images.length > 0) {
    images.push(images[0]);
  }
  
  // If no images work, use placeholders
  if (images.length === 0) {
    for (let i = 0; i < count; i++) {
      images.push('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0i+mV2YXZl9mGINiz2KjZitixPC90ZXh0Pgo8L3N2Zz4K');
    }
  }
  
  return images;
}