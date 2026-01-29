import React, { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { X } from 'lucide-react';
import { BlogPost } from '../utils/blogConstants';

// פונקציה לניקוי טקסט מתגיות HTML ותווים מיוחדים
const cleanHtmlText = (text: string): string => {
  if (!text) return '';
  
  return text
    // הסרת תגיות HTML
    .replace(/<[^>]*>/g, '')
    // הסרת ישויות HTML
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&hellip;/g, '...')
    // הסרת רווחים מיותרים ושורות ריקות
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n\n')
    .trim();
};

interface BlogFullPostViewProps {
  selectedPost: BlogPost | null;
  onClose: () => void;
}

export const BlogFullPostView: React.FC<BlogFullPostViewProps> = ({
  selectedPost,
  onClose
}) => {
  // Move early return BEFORE all hooks to fix hooks rule violation
  if (!selectedPost) return null;

  const [readingProgress, setReadingProgress] = useState(0);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Handle reading progress
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      if (target) {
        const { scrollTop, scrollHeight, clientHeight } = target;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    const scrollContainer = document.querySelector('.blog-scroll-container');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // רינדור התוכן עם פורמט HTML
  const renderFormattedContent = () => {
    // אם התוכן מכיל תגיות HTML, נציג אותו כ-HTML
    if (selectedPost.content && selectedPost.content.includes('<')) {
      return (
        <div 
          className="rich-content-display leading-relaxed text-[#101828]"
          dangerouslySetInnerHTML={{ __html: selectedPost.content }}
        />
      );
    }
    
    // אם זה טקסט רגיל, נציג אותו עם רווחים
    return (
      <div className="whitespace-pre-wrap leading-relaxed text-[#101828]">
        {selectedPost.content}
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* כותרת קבועה */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl shadow-sm sticky top-0 z-10">
          <div className="flex justify-between items-center">
            {/* כותרת בצד ימין */}
            <div className="text-right flex-1">
              <div className="flex items-center justify-start gap-3">
                <h1 className="text-xl md:text-2xl font-bold text-[#101828] leading-tight max-w-md">
                  {selectedPost.title}
                </h1>
              </div>
            </div>
            
            {/* X בעיגול בצד שמאל */}
            <button
              onClick={onClose}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 hover:scale-110"
              title="סגירה (ESC)"
              aria-label="סגירת המאמר"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          {/* אינדיקטור התקדמות הקריאה */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-full bg-[#101828] transition-all duration-300 ease-out"
              style={{ width: `${readingProgress}%` }}
            />
          </div>
        </div>

        {/* תוכן הניתן לגלילה */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30 scroll-smooth relative blog-scroll-container">
          {/* אינדיקטור גלילה */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full opacity-50 mt-2"></div>
          
          {/* תמונה בתחילת התוכן */}
          <div className="mb-6 animate-fadeIn">
            <ImageWithFallback
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-56 md:h-64 object-cover rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            />
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="prose prose-lg max-w-none text-right">
              <div className="text-[#101828] leading-relaxed space-y-6">
                {/* הצגת תוכן נקי */}
                {renderFormattedContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};