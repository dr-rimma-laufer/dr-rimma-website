import { useEffect, useRef, useCallback } from 'react';

interface SectionInfo {
  index: number;
  element: Element;
  atBottom?: boolean;
  atTop?: boolean;
}

export function useSmoothScroll(enabled: boolean = true) {
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getSections = useCallback(() => {
    // Get all main sections
    const sections = document.querySelectorAll('section, main > div');
    return Array.from(sections).filter(section => {
      const rect = section.getBoundingClientRect();
      return rect.height > 200; // Filter out small sections
    });
  }, []);

  const getCurrentSection = useCallback((): SectionInfo => {
    const sections = getSections();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Check if we're at the bottom of the page
    if (scrollTop + windowHeight >= documentHeight - 50) {
      return { index: sections.length - 1, element: sections[sections.length - 1], atBottom: true };
    }
    
    // Check if we're at the top of the page
    if (scrollTop <= 50) {
      return { index: 0, element: sections[0], atTop: true };
    }
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const rect = section.getBoundingClientRect();
      const sectionTop = scrollTop + rect.top;
      const sectionBottom = sectionTop + rect.height;
      
      if (scrollTop >= sectionTop - windowHeight / 3 && scrollTop < sectionBottom - windowHeight / 3) {
        return { index: i, element: section };
      }
    }
    
    // Find the closest section instead of defaulting to first
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const rect = section.getBoundingClientRect();
      const sectionTop = scrollTop + rect.top;
      const distance = Math.abs(scrollTop - sectionTop);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    }
    
    return { index: closestIndex, element: sections[closestIndex] };
  }, [getSections]);

  const scrollToSection = useCallback((direction: 'up' | 'down') => {
    if (isScrollingRef.current) return;
    
    const sections = getSections();
    const current = getCurrentSection();
    
    // Don't snap if we're at the bottom and trying to go down
    if (direction === 'down' && current.atBottom) {
      return;
    }
    
    // Don't snap if we're at the top and trying to go up
    if (direction === 'up' && current.atTop) {
      return;
    }
    
    let targetIndex = current.index;
    
    if (direction === 'down' && current.index < sections.length - 1) {
      targetIndex = current.index + 1;
    } else if (direction === 'up' && current.index > 0) {
      targetIndex = current.index - 1;
    }
    
    if (targetIndex !== current.index && sections[targetIndex]) {
      isScrollingRef.current = true;
      
      sections[targetIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Reset scrolling flag after animation
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  }, [getSections, getCurrentSection]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!enabled || isScrollingRef.current) {
      return;
    }

    const now = Date.now();
    const timeDiff = now - lastScrollTimeRef.current;
    
    // Throttle wheel events
    if (timeDiff < 100) {
      return;
    }
    
    lastScrollTimeRef.current = now;
    
    // Only trigger snap for significant scroll movements
    if (Math.abs(e.deltaY) < 30) {
      return;
    }
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Set a longer timeout to trigger section snapping
    scrollTimeoutRef.current = setTimeout(() => {
      if (!isScrollingRef.current) {
        const direction = e.deltaY > 0 ? 'down' : 'up';
        scrollToSection(direction);
      }
    }, 300);
    
  }, [enabled, scrollToSection]);

  const handleTouchStart = useRef({ y: 0, time: 0 });
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!enabled || isScrollingRef.current) {
      return;
    }
    
    const touch = e.touches[0];
    if (!touch) return;
    
    handleTouchStart.current = { y: touch.clientY, time: Date.now() };
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!enabled || isScrollingRef.current) {
      return;
    }
    
    const touch = e.changedTouches[0];
    if (!touch) return;
    
    const deltaY = handleTouchStart.current.y - touch.clientY;
    const deltaTime = Date.now() - handleTouchStart.current.time;
    
    // Only trigger if it's a fast and significant swipe
    if (Math.abs(deltaY) > 80 && deltaTime < 250) {
      const direction = deltaY > 0 ? 'down' : 'up';
      
      setTimeout(() => {
        if (!isScrollingRef.current) {
          scrollToSection(direction);
        }
      }, 200);
    }
  }, [enabled, scrollToSection]);

  useEffect(() => {
    if (!enabled) return;
    
    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      // Cleanup
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [enabled, handleWheel, handleTouchMove, handleTouchEnd]);

  return { isScrolling: isScrollingRef.current };
}