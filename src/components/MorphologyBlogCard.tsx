import React, { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft } from 'lucide-react';

interface MorphologyBlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  image: string;
  onReadMore: () => void;
  className?: string;
  featured?: boolean;
}

export const MorphologyBlogCard: React.FC<MorphologyBlogCardProps> = ({
  title,
  excerpt,
  category,
  image,
  onReadMore,
  className = "",
  featured = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileActive, setIsMobileActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // בדיקה אם המכשיר הוא מובייל
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // אנימציית כניסה
    setTimeout(() => setIsVisible(true), 100);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!cardRef.current || !isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // כשהקלף נכנס לתצוגה במובייל, נפעיל את האפקט לזמן קצוב
            setIsMobileActive(true);
            
            // אפקט ויברציה עדין (אם נתמך במכשיר)
            if ('vibrate' in navigator) {
              navigator.vibrate(50); // רק 50ms ויברציה עדינה
            }
            
            setTimeout(() => {
              setIsMobileActive(false);
            }, 3000); // האפקט יתקיים 3 שניות
          }
        });
      },
      {
        threshold: 0.6, // האפקט יופעל כש-60% מהקלף נראה
        rootMargin: '-50px'
      }
    );

    observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isMobile]);

  // האפקט יופעל בדסקטופ עם hover או במובייל עם intersection
  const isActive = isMobile ? isMobileActive : isHovered;

  const containerStyles: React.CSSProperties = {
    fontFamily: "'Open Sans Condensed', 'Assistant', sans-serif",
    maxWidth: isMobile ? 'calc(100vw - 24px)' : (featured ? '340px' : '320px'), // במובייל רוחב מלא פחות מרווחים קטנים
    width: '100%',
    margin: '0 auto',
    padding: isMobile ? '4px' : '12px', // מרווחים קטנים יותר במובייל
  };

  const cardStyles: React.CSSProperties = {
    background: 'transparent', // הסרת הרקע השחור לחלוטין - אין מסגרת שחורה
    padding: '0', // הסרת ה-padding כדי לא ליצור מסגרת
    borderRadius: '18px',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    boxShadow: 'none', // הסרת מסגרת לחלוטין - גם במצב רגיל וגם במצב hover
    transform: isActive 
      ? 'translateY(-8px) scale(1.02)' 
      : isVisible 
        ? 'translateY(0)' 
        : 'translateY(30px)',
    opacity: isVisible ? 1 : 0,
    position: 'relative',
  };

  const cardInnerStyles: React.CSSProperties = {
    background: isActive ? 'rgba(16, 24, 40, 0.8)' : 'white', // רקע כהה במצב hover כדי שהטקסט הלבן יהיה קריא
    borderRadius: '15px',
    height: '100%',
    overflow: 'hidden',
    transition: 'all 0.4s ease',
    position: 'relative',
  };

  const imageStyles: React.CSSProperties = {
    width: '100%',
    height: '180px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '12px 12px 0 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const speechBubbleStyles: React.CSSProperties = {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.95)',
    padding: featured ? '8px 12px' : '6px 10px',
    borderRadius: '16px',
    fontSize: featured ? '12px' : '11px',
    color: isActive ? 'white' : '#101828',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    zIndex: 2,
    fontWeight: '600',
  };

  const speechBubbleArrowStyles: React.CSSProperties = {
    content: '',
    position: 'absolute',
    bottom: '-6px',
    right: '16px',
    width: '0',
    height: '0',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderTop: `6px solid ${isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.95)'}`,
  };

  const contentStyles: React.CSSProperties = {
    padding: '20px',
    transition: 'all 0.4s ease',
    position: 'relative',
    zIndex: 1,
    textAlign: 'right',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '1.2em',
    fontWeight: '600',
    color: isActive ? 'white' : '#101828',
    marginBottom: '8px',
    lineHeight: '1.3',
    transition: 'color 0.4s ease',
    textShadow: isActive ? '0 2px 4px rgba(0, 0, 0, 0.3)' : 'none',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };

  const excerptStyles: React.CSSProperties = {
    color: isActive ? 'rgba(255, 255, 255, 0.9)' : '#6b7280',
    fontSize: '0.85em',
    lineHeight: '1.5',
    marginBottom: '16px',
    transition: 'color 0.4s ease',
    textShadow: isActive ? '0 2px 4px rgba(0, 0, 0, 0.3)' : 'none',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };

  const readMoreStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: isActive ? 'white' : '#101828',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.85em',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    textShadow: isActive ? '0 2px 4px rgba(0, 0, 0, 0.3)' : 'none',
    background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(16, 24, 40, 0.1)',
    padding: '8px 16px',
    borderRadius: '20px',
    border: `1px solid ${isActive ? 'rgba(255, 255, 255, 0.3)' : 'rgba(16, 24, 40, 0.2)'}`,
    backdropFilter: 'blur(10px)',
  };

  const glowStyles: React.CSSProperties = {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'linear-gradient(135deg, #101828 0%, #0a0f1a 100%)',
    borderRadius: '18px',
    opacity: isActive ? 0.4 : 0,
    transition: 'opacity 0.4s ease',
    zIndex: -1,
    filter: 'blur(15px)',
    transform: 'scale(1.1)',
  };

  return (
    <div style={containerStyles} className={`morphology-blog-card ${className}`}>
      <div 
        ref={cardRef}
        style={cardStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* אפקט זוהר */}
        <div style={glowStyles}></div>
        
        <div style={cardInnerStyles}>
          <div style={imageStyles}>
            <ImageWithFallback
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div style={contentStyles}>
            <h3 style={titleStyles}>{title}</h3>
            <p style={excerptStyles}>{excerpt}</p>
            <button 
              style={readMoreStyles}
              onClick={onReadMore}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'translateX(-3px)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'translateX(0)';
              }}
            >
              <ArrowLeft className="h-3 w-3 ml-1" />
              קריאה
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};