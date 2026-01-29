import { useState, useEffect, useRef } from 'react';
import { PageType, TreatmentOverlayType } from '../utils/appTypes';
import { useAppState, useSupabaseConnectionState } from './useAppState';

export function useNavigation() {
  // שימוש ב-hook החדש לניהול המצב הגלובלי
  const {
    currentPage,
    treatmentOverlay,
    setCurrentPage: setAppCurrentPage,
    setTreatmentOverlay: setAppTreatmentOverlay,
    sessionId,
    timeSinceLastActivity
  } = useAppState();

  // קבלת ה-persistent session ID מהמערכת הגלובלית
  const { persistentSessionId } = useSupabaseConnectionState();

  const [isMobile, setIsMobile] = useState(false);
  
  // Store scroll position when overlay opens
  const scrollPositionRef = useRef<number>(0);
  
  // Track if we're returning from a hair disease page to restore scroll
  const returningFromDiseaseRef = useRef<boolean>(false);
  const savedScrollForRestoreRef = useRef<number>(0);
  
  // Effect to scroll to top whenever currentPage changes
  useEffect(() => {
    console.log('🔄 useEffect triggered for currentPage change:', currentPage);
    console.log('📍 Current scroll position on page change:', window.pageYOffset || document.documentElement.scrollTop);
    
    // Check if we're returning from a hair disease page - if so, DON'T scroll
    if (returningFromDiseaseRef.current && currentPage === 'hair-treatments') {
      console.log('🔄 Returning from disease page - restoring scroll to:', savedScrollForRestoreRef.current);
      
      // Restore the saved scroll position immediately
      window.scrollTo({
        top: savedScrollForRestoreRef.current,
        behavior: 'auto'
      });
      
      // Reset the flag
      returningFromDiseaseRef.current = false;
      savedScrollForRestoreRef.current = 0;
      
      return; // Skip all scroll-to-top logic
    }
    
    // Normal scroll to top behavior for all other page changes
    try {
      // Method 1: Multiple immediate scrolls
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Method 2: Using scrollIntoView on a top element
      const topElement = document.documentElement;
      topElement.scrollIntoView({ behavior: 'auto', block: 'start' });
      
      console.log('⬆️ Immediate scroll executed in useEffect, new position:', window.pageYOffset || document.documentElement.scrollTop);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Error in immediate useEffect scroll:', error);
      }
    }
    
    // Add a very short delay and then additional scroll to top
    const timeoutId = setTimeout(() => {
      console.log('🔄 Executing delayed scrollToTop from useEffect for page:', currentPage);
      scrollToTop();
    }, 50);
    
    // Also add a longer delay to ensure the scroll happens after component render
    const longerTimeoutId = setTimeout(() => {
      const stillScrolled = window.pageYOffset || document.documentElement.scrollTop;
      if (stillScrolled > 10) {
        console.log('🔄 Additional scroll attempt after 200ms for page:', currentPage);
        scrollToTop();
      }
    }, 200);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(longerTimeoutId);
    };
  }, [currentPage, sessionId, persistentSessionId]);

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced utility function to scroll to top with multiple verification methods
  const scrollToTop = () => {
    try {
      console.log('🔄 Starting scrollToTop function');
      console.log('📍 Current position before scroll:', window.pageYOffset || document.documentElement.scrollTop);
      
      // Method 1: Immediate scroll using different approaches
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Method 2: Using scrollTo with behavior auto for immediate effect
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
      
      // Method 3: scrollIntoView on document element
      document.documentElement.scrollIntoView({ 
        behavior: 'auto', 
        block: 'start',
        inline: 'start'
      });
      
      // Method 4: Focus management to ensure proper scroll
      if (document.activeElement && document.activeElement !== document.body) {
        (document.activeElement as HTMLElement).blur();
      }
      document.body.focus();
      
      // Verification and retry mechanism
      setTimeout(() => {
        const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
        console.log('📍 Position after first scroll attempt:', currentPosition);
        
        if (currentPosition > 10) { // If still not at top
          console.log('🔄 Retrying scroll to top...');
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          
          // Final verification
          setTimeout(() => {
            const finalPosition = window.pageYOffset || document.documentElement.scrollTop;
            console.log('📍 Final position after retry:', finalPosition);
            
            if (finalPosition > 10) {
              console.warn('⚠️ Scroll to top may not have worked completely');
              // Last resort - force scroll with animation frame
              requestAnimationFrame(() => {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
              });
            } else {
              console.log('✅ Scroll to top successful!');
            }
          }, 100);
        } else {
          console.log('✅ Scroll to top successful on first attempt!');
        }
      }, 100);
      
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Error in scrollToTop:', error);
      }
      // Multiple fallbacks for older browsers
      try {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo(0, 0);
      } catch (fallbackError) {
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ Fallback scroll also failed:', fallbackError);
        }
      }
    }
  };

  // Navigation handler with improved scroll-to-top functionality
  const handleNavigation = (page: string) => {
    console.log('🧭 Navigation requested to:', page);
    console.log('📍 Current scroll position:', window.pageYOffset || document.documentElement.scrollTop);
    console.log('🔍 Checking route type:', {
      isDermatologyDisease: page.startsWith('#dermatology-disease-'),
      isHairDisease: page.startsWith('#hair-disease-'),
      page
    });
    
    // Multi-method immediate scroll - aggressive approach
    const immediateScrollToTop = () => {
      try {
        // Method 1: Direct property assignment
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Method 2: scrollIntoView on document element
        document.documentElement.scrollIntoView({ behavior: 'auto', block: 'start' });
        
        // Method 3: Focus on document to ensure scroll reset
        if (document.activeElement && document.activeElement !== document.body) {
          (document.activeElement as HTMLElement).blur();
        }
        
        console.log('⬆️ Immediate scroll executed, new position:', window.pageYOffset || document.documentElement.scrollTop);
      } catch (error) {
        console.error('❌ Error in immediate scroll:', error);
      }
    };
    
    // Navigate to the appropriate page and scroll to top
    if (page === '#home') {
      immediateScrollToTop();
      setAppCurrentPage('home');
      setTimeout(() => {
        scrollToTop();
        console.log('⬆️ Delayed scroll to top for home page executed');
      }, 50);
    }
    else if (page === '#about') {
      immediateScrollToTop();
      setAppCurrentPage('about');
      setTimeout(() => {
        scrollToTop();
        console.log('⬆️ Delayed scroll to top for about page executed');
      }, 50);
    }
    else if (page === '#hair-transplant') {
      immediateScrollToTop();
      setAppCurrentPage('hair-transplant');
      setTimeout(() => {
        scrollToTop();
        console.log('⬆️ Delayed scroll to top for hair-transplant page executed');
      }, 50);
    }
    else if (page === '#hair-treatments') {
      immediateScrollToTop();
      setAppCurrentPage('hair-treatments');
      setTimeout(() => {
        scrollToTop();
        console.log('⬆️ Delayed scroll to top for hair-treatments page executed');
      }, 50);
    }
    else if (page === '#aesthetics') {
      immediateScrollToTop();
      setAppCurrentPage('aesthetics');
      setTimeout(() => {
        scrollToTop();
        console.log('⬆️ Delayed scroll to top for aesthetics page executed');
      }, 50);
    }
    else if (page === '#dermatology') {
      immediateScrollToTop();
      setAppCurrentPage('dermatology');
      setTimeout(() => {
        scrollToTop();
        console.log('⬆️ Delayed scroll to top for dermatology page executed');
      }, 50);
    }
    else if (page === '#gallery') {
      immediateScrollToTop();
      setAppCurrentPage('gallery');
      setTimeout(() => {
        scrollToTop();
        console.log('⬆️ Delayed scroll to top for gallery page executed');
      }, 50);
    }
    else if (page === '#blog') {
      immediateScrollToTop();
      setAppCurrentPage('blog');
      setTimeout(() => {
        scrollToTop();
        console.log('⬆️ Delayed scroll to top for blog page executed');
      }, 50);
    }
    else if (page === '#faq') {
      console.log('📖 Navigating to FAQ page with enhanced scroll-to-top');
      immediateScrollToTop();
      setAppCurrentPage('faq');
      setTimeout(() => {
        scrollToTop();
        console.log('⬆️ Delayed scroll to top for FAQ page executed');
      }, 50);
    }
    else if (page === '#contact') {
      immediateScrollToTop();
      setAppCurrentPage('contact');
      setTimeout(() => {
        scrollToTop();
        console.log('⬆️ Delayed scroll to top for contact page executed');
      }, 50);
    }
    // Special hair transplant treatments
    else if (page === '#hair-transplant-afro') {
      // Immediate scroll before changing page
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      
      setAppCurrentPage('hair-transplant');
      setTimeout(() => {
        scrollToTop();
      }, 50);
    }
    else if (page === '#eyebrow-transplant') {
      // Immediate scroll before changing page
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      
      setAppCurrentPage('hair-transplant');
      setTimeout(() => {
        scrollToTop();
      }, 50);
    }
    else if (page === '#beard-transplant') {
      // Immediate scroll before changing page
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      
      setAppCurrentPage('hair-transplant');
      setTimeout(() => {
        scrollToTop();
      }, 50);
    }
    // Treatment handling - mobile vs desktop
    else if (page === '#treatment-prp') {
      if (isMobile) {
        // On mobile, navigate to regular PRP page and add history state
        const previousPage = currentPage;
        
        // Immediate scroll before changing page on mobile
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        
        setAppCurrentPage('prp-treatment');
        setTimeout(() => {
          scrollToTop();
        }, 50); // Scroll to top on mobile navigation
        // Use pushState with proper state management
        const historyState = { 
          page: 'prp-treatment', 
          previousPage: previousPage,
          timestamp: Date.now() 
        };
        window.history.pushState(historyState, '', window.location.href);
      } else {
        // Save current scroll position before opening overlay
        scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
        // On desktop, open overlay
        setAppTreatmentOverlay('treatment-prp');
        window.history.pushState({ overlay: 'treatment-prp', scrollPosition: scrollPositionRef.current }, '', window.location.href);
      }
    }
    else if (page === '#treatment-mesotherapy') {
      if (isMobile) {
        // On mobile, navigate to regular mesotherapy page and add history state
        const previousPage = currentPage;
        
        // Immediate scroll before changing page on mobile
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        
        setAppCurrentPage('mesotherapy-treatment');
        setTimeout(() => {
          scrollToTop();
        }, 50); // Scroll to top on mobile navigation
        // Use pushState with proper state management
        window.history.pushState({ 
          page: 'mesotherapy-treatment', 
          previousPage: previousPage,
          timestamp: Date.now() 
        }, '', window.location.href);
      } else {
        // Save current scroll position before opening overlay
        scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
        // On desktop, open overlay
        setAppTreatmentOverlay('treatment-mesotherapy');
        window.history.pushState({ overlay: 'treatment-mesotherapy', scrollPosition: scrollPositionRef.current }, '', window.location.href);
      }
    }
    else if (page === '#treatment-medication') {
      if (isMobile) {
        // On mobile, navigate to regular medication page and add history state
        const previousPage = currentPage;
        
        // Immediate scroll before changing page on mobile
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        
        setAppCurrentPage('medication-treatment');
        setTimeout(() => {
          scrollToTop();
        }, 50); // Scroll to top on mobile navigation
        // Use pushState with proper state management
        window.history.pushState({ 
          page: 'medication-treatment', 
          previousPage: previousPage,
          timestamp: Date.now() 
        }, '', window.location.href);
      } else {
        // Save current scroll position before opening overlay
        scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
        // On desktop, open overlay
        setAppTreatmentOverlay('treatment-medication');
        window.history.pushState({ overlay: 'treatment-medication', scrollPosition: scrollPositionRef.current }, '', window.location.href);
      }
    }
    else if (page === '#treatment-laser') {
      if (isMobile) {
        // On mobile, navigate to regular laser page and add history state  
        const previousPage = currentPage;
        
        // Immediate scroll before changing page on mobile
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        
        setAppCurrentPage('laser-treatment');
        setTimeout(() => {
          scrollToTop();
        }, 50); // Scroll to top on mobile navigation
        // Use pushState with proper state management
        window.history.pushState({ 
          page: 'laser-treatment', 
          previousPage: previousPage,
          timestamp: Date.now() 
        }, '', window.location.href);
      } else {
        // Save current scroll position before opening overlay
        scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
        setAppTreatmentOverlay('treatment-laser');
        window.history.pushState({ overlay: 'treatment-laser', scrollPosition: scrollPositionRef.current }, '', window.location.href);
      }
    }
    // Hair condition handling
    else if (page.startsWith('hair-condition-')) {
      const conditionPage = page as PageType;
      const previousPage = currentPage;
      
      // Immediate scroll before changing page
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      
      setAppCurrentPage(conditionPage);
      setTimeout(() => {
        scrollToTop();
      }, 50);
      // Use pushState with proper state management
      window.history.pushState({ 
        page: conditionPage, 
        previousPage: previousPage,
        timestamp: Date.now() 
      }, '', window.location.href);
    }
    // Hair disease handling - desktop vs mobile
    else if (page.startsWith('#hair-disease-')) {
      const diseaseType = page.substring(1) as TreatmentOverlayType; // Remove the # prefix
      
      console.log('🩺 Hair disease navigation requested:', {
        page,
        diseaseType,
        isMobile,
        windowWidth: window.innerWidth
      });
      
      if (isMobile) {
        // On mobile, navigate to regular disease page
        const previousPage = currentPage;
        const diseasePage = diseaseType as PageType;
        
        console.log('📱 Mobile disease navigation:', {
          from: previousPage,
          to: diseasePage
        });
        
        // Save current scroll position before navigating
        scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
        console.log('💾 Saving scroll position before disease navigation:', scrollPositionRef.current);
        
        // Immediate scroll before changing page on mobile
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        
        setAppCurrentPage(diseasePage);
        setTimeout(() => {
          scrollToTop();
        }, 50);
        // Use pushState with proper state management - save scroll position
        window.history.pushState({ 
          page: diseasePage, 
          previousPage: previousPage,
          scrollPosition: scrollPositionRef.current,
          timestamp: Date.now() 
        }, '', window.location.href);
      } else {
        console.log('🖥️ Desktop disease navigation - opening overlay');
        // Save current scroll position before opening overlay
        scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
        // On desktop, open overlay
        setAppTreatmentOverlay(diseaseType);
        window.history.pushState({ overlay: diseaseType, scrollPosition: scrollPositionRef.current }, '', window.location.href);
      }
    }
    // Dermatology disease handling - mobile only (desktop uses overlay in DermatologyMain)
    else if (page.startsWith('#dermatology-disease-')) {
      const diseaseType = page.substring(1) as PageType; // Remove the # prefix
      
      console.log('🟢 Dermatology disease navigation requested:', {
        page,
        diseaseType,
        isMobile,
        windowWidth: window.innerWidth,
        currentPage
      });
      
      // For mobile, navigate to disease page
      const previousPage = currentPage;
      
      console.log('🟢 Mobile dermatology disease navigation:', {
        from: previousPage,
        to: diseaseType
      });
      
      // Immediate scroll before changing page on mobile
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      
      console.log('🟢 Setting current page to:', diseaseType);
      setAppCurrentPage(diseaseType);
      setTimeout(() => {
        scrollToTop();
      }, 50);
      // Use pushState with proper state management
      window.history.pushState({ 
        page: diseaseType, 
        previousPage: previousPage,
        timestamp: Date.now() 
        }, '', window.location.href);
    }
  };

  // Close treatment overlay
  const closeTreatmentOverlay = (skipHistoryBack = false) => {
    setAppTreatmentOverlay(null);
    
    // Restore scroll position after a short delay to ensure the overlay is closed
    setTimeout(() => {
      // Try to get scroll position from history state first
      const savedScrollPosition = window.history.state?.scrollPosition || scrollPositionRef.current;
      if (savedScrollPosition) {
        window.scrollTo({
          top: savedScrollPosition,
          behavior: 'auto' // Use 'auto' instead of 'smooth' for immediate positioning
        });
      }
    }, 50);
    
    // Remove the overlay state from history if it was the last entry and not called from popstate
    if (!skipHistoryBack && window.history.state?.overlay) {
      window.history.back();
    }
  };

  // Handle overlay navigation (when user navigates within treatment page)
  const handleOverlayNavigation = (page: string) => {
    if (page === '#hair-treatments') {
      console.log('🔄 Navigating from overlay to hair-treatments page');
      
      // Close overlay and navigate to hair treatments page
      closeTreatmentOverlay();
      
      // Immediate scroll before changing page
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      
      setAppCurrentPage('hair-treatments');
      setTimeout(() => {
        console.log('⬆️ Executing delayed scrollToTop when navigating from overlay');
        scrollToTop();
      }, 50); // Scroll to top when navigating from overlay
    } else {
      // Handle other navigation normally
      console.log('🔄 Handling overlay navigation normally for:', page);
      handleNavigation(page);
    }
  };

  // Handle browser history and overlay events
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && treatmentOverlay) {
        closeTreatmentOverlay();
      }
    };

    const handlePopState = (e: PopStateEvent) => {
      // Debug info for troubleshooting
      console.log('PopState event:', {
        currentPage,
        treatmentOverlay,
        state: e.state,
        isMobile
      });

      // If user clicked back and there's an overlay open, close it
      if (treatmentOverlay && !e.state?.overlay) {
        setAppTreatmentOverlay(null);
        // Restore scroll position when going back
        const savedScrollPosition = e.state?.scrollPosition || scrollPositionRef.current;
        if (savedScrollPosition) {
          setTimeout(() => {
            window.scrollTo({
              top: savedScrollPosition,
              behavior: 'auto'
            });
          }, 50);
        }
        return; // Early return to prevent further processing
      }
      
      // If there's an overlay state, open that overlay
      if (e.state?.overlay && !treatmentOverlay) {
        // Save current scroll position before opening
        scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
        setAppTreatmentOverlay(e.state.overlay as TreatmentOverlayType);
        return; // Early return to prevent further processing
      }
      
      // Handle mobile page navigation back - check for mobile treatment pages, hair conditions, hair diseases, and dermatology diseases
      if (currentPage === 'prp-treatment' || currentPage === 'mesotherapy-treatment' || currentPage === 'medication-treatment' || currentPage === 'laser-treatment' || currentPage.startsWith('hair-condition-') || currentPage.startsWith('hair-disease-') || currentPage.startsWith('dermatology-disease-')) {
        // If there's a previous page in state, go back to it
        if (e.state?.previousPage) {
          console.log('⬅️ Going back to previous page:', e.state.previousPage);
          
          // Check if we need to restore scroll position (for hair-disease pages)
          const savedScrollPosition = e.state?.scrollPosition;
          if (savedScrollPosition && currentPage.startsWith('hair-disease-')) {
            console.log('📍 Preparing to restore scroll position:', savedScrollPosition);
            
            // Set ref flags to restore scroll position - these will be checked in useEffect
            returningFromDiseaseRef.current = true;
            savedScrollForRestoreRef.current = savedScrollPosition;
            
            // Navigate to hair-treatments - the useEffect will restore scroll
            setAppCurrentPage('hair-treatments');
          } else {
            // For other pages, scroll to top
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            
            setAppCurrentPage(e.state.previousPage as PageType);
            setTimeout(() => {
              console.log('⬆️ Executing delayed scrollToTop when returning to previous page');
              scrollToTop();
            }, 50);
          }
        } else {
          // If no state or no previous page, go back to appropriate parent page
          const defaultParentPage = currentPage.startsWith('dermatology-disease-') ? 'dermatology' : 'hair-treatments';
          console.log('⬅️ No previous page found, going to', defaultParentPage);
          
          // Immediate scroll before changing page
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          
          setAppCurrentPage(defaultParentPage);
          setTimeout(() => {
            console.log('⬆️ Executing delayed scrollToTop when returning to parent page');
            scrollToTop();
          }, 50); // Scroll to top when returning from treatment/condition/disease page
        }
        return; // Early return to prevent further processing
      }
    };

    if (treatmentOverlay) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    // Listen for browser back/forward buttons
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [treatmentOverlay, currentPage]);

  return {
    currentPage,
    treatmentOverlay,
    handleNavigation,
    handleOverlayNavigation,
    closeTreatmentOverlay,
    // מידע נוסף על המצב הנוכחי
    sessionId, // App session ID (from localStorage)
    persistentSessionId, // Database session ID (persistent across disconnections)
    timeSinceLastActivity,
    isStateLoaded: true // מציין שהמצב נטען בהצלחה
  };
}