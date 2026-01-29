'use client';
import React, { useState, useRef, useEffect } from "react";
import { Card } from "../../ui/card";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { HAIR_DISEASES } from "../hairDiseases/hairDiseasesData";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HairDiseasesSectionProps {
  className?: string;
  onNavigate?: (page: string) => void;
}

export function HairDiseasesSection({
  className = "",
  onNavigate,
}: HairDiseasesSectionProps) {
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Push carousel states
  const [swipeIndicatorVisible, setSwipeIndicatorVisible] =
    useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const mobileCardRef = useRef<HTMLDivElement>(null);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(
    null,
  );

  // מציג 3 תמונות בדسكטופ, 1 במובייל
  const ITEMS_TO_SHOW_DESKTOP = 3;
  const ITEMS_TO_SHOW_MOBILE = 1;

  // Auto-play for mobile
  useEffect(() => {
    const startAutoPlay = () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }

      autoPlayIntervalRef.current = setInterval(() => {
        if (!isPaused && window.innerWidth < 768) {
          // Only on mobile
          scrollToNext();
        }
      }, 4000); // Change every 4 seconds
    };

    startAutoPlay();

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [isPaused, currentIndex]);

  // Pause auto-play when user interacts
  const pauseAutoPlay = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // Resume after 10 seconds
  };

  // הצגת אינדיקטור החלקה
  const showSwipeIndicator = (direction: string) => {
    setSwipeIndicatorVisible(true);
    setTimeout(() => setSwipeIndicatorVisible(false), 1000);
  };

  // טיפול באירועי מגע - התחלה
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setIsDragging(false);
    setDragOffset(0);
  };

  // טיפול באירועי מגע - תנועה
  const handleTouchMove = (e: React.TouchEvent) => {
    const deltaX = e.touches[0].clientX - touchStartX;
    const deltaY = Math.abs(e.touches[0].clientY - touchStartY);

    if (
      !isDragging &&
      Math.abs(deltaX) > deltaY &&
      Math.abs(deltaX) > 10
    ) {
      setIsDragging(true);
      e.preventDefault();
    }

    if (isDragging && !isTransitioning) {
      setDragOffset(deltaX);
    }
  };

  // טיפול באירועי מגע - סיום
  const handleTouchEnd = () => {
    if (!isDragging) return;

    const swipeThreshold = 80;

    if (Math.abs(dragOffset) > swipeThreshold) {
      if (dragOffset > 0) {
        scrollToPrevious();
        showSwipeIndicator("right");
      } else {
        scrollToNext();
        showSwipeIndicator("left");
      }
    }

    setDragOffset(0);
    setIsDragging(false);
  };

  // ניווט מעגלי עם אנימציה חלקה - עם push effect
  const scrollToNext = () => {
    if (isTransitioning) return;
    pauseAutoPlay();
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % HAIR_DISEASES.length;
      const isCircularTransition =
        prevIndex === HAIR_DISEASES.length - 1; // מ-8 ל-1
      console.log("Moving to next:", {
        from: prevIndex,
        to: nextIndex,
        isCircular: isCircularTransition,
      });
      return nextIndex;
    });
    showSwipeIndicator("left");
    // Reset transition state after animation - longer for push effect
    setTimeout(() => setIsTransitioning(false), 600);
  };

  // ניווט מעגלי - כפתור שמאל מביא תמונה משמאל עם push effect
  const scrollToPrevious = () => {
    if (isTransitioning) return;
    pauseAutoPlay();
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      const nextIndex =
        prevIndex === 0
          ? HAIR_DISEASES.length - 1
          : prevIndex - 1;
      const isCircularTransition = prevIndex === 0; // מ-1 ל-8
      console.log("Moving to previous:", {
        from: prevIndex,
        to: nextIndex,
        isCircular: isCircularTransition,
      });
      return nextIndex;
    });
    showSwipeIndicator("right");
    // Reset transition state after animation - longer for push effect
    setTimeout(() => setIsTransitioning(false), 600);
  };

  // פונקציה למעבר לקלף ספציפי
  const goToSlide = (slideIndex: number) => {
    if (isTransitioning || slideIndex === currentIndex) return;

    pauseAutoPlay();
    setIsTransitioning(true);
    setCurrentIndex(slideIndex);

    setTimeout(() => setIsTransitioning(false), 600);
  };

  // הכנת מערך התמונות הנראות - דسكטופ (3 תמונות) ומובייל (1 תמונה)
  const getVisibleItems = (isMobile = false) => {
    const visible = [];
    const itemsToShow = isMobile
      ? ITEMS_TO_SHOW_MOBILE
      : ITEMS_TO_SHOW_DESKTOP;

    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % HAIR_DISEASES.length;
      visible.push({
        ...HAIR_DISEASES[index],
        originalIndex: index,
      });
    }
    return visible;
  };

  // פונקציה לקביעת מיקום הקלף עם push effect - מטפלת במעברים מעגליים חלקים
  const getSlideTransform = (index: number) => {
    let diff = index - currentIndex;

    // חישוב המרחק הקצר ביותר במעגל
    const totalItems = HAIR_DISEASES.length;
    if (Math.abs(diff) > totalItems / 2) {
      if (diff > 0) {
        diff = diff - totalItems;
      } else {
        diff = diff + totalItems;
      }
    }

    let transform = `translateX(${diff * 100}%)`;

    if (isDragging && Math.abs(dragOffset) > 0) {
      const dragPercent =
        (dragOffset / (window.innerWidth || 400)) * 100;
      transform = `translateX(${diff * 100 + dragPercent}%)`;
    }

    return transform;
  };

  // פונקציה לקביעת האטימות - מותאמת למעברים מעגליים
  const getSlideOpacity = (index: number) => {
    let diff = Math.abs(index - currentIndex);

    // חישוב המרחק הקצר ביותר במעגל
    const totalItems = HAIR_DISEASES.length;
    const circularDiff = Math.min(diff, totalItems - diff);

    if (circularDiff === 0) return 1;
    if (circularDiff === 1) return 0.7;
    if (circularDiff === 2) return 0.3;
    return 0;
  };

  // Function to handle disease navigation
  const handleDiseaseClick = (diseaseTitle: string) => {
    // Prevent navigation if user was dragging
    if (isDragging || Math.abs(dragOffset) > 10) {
      if (process.env.NODE_ENV === "development") {
        console.log("Click ignored - user was dragging");
      }
      return;
    }

    if (process.env.NODE_ENV === "development") {
      console.log("Disease card clicked:", diseaseTitle);
    }

    if (!onNavigate) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "onNavigate function not provided to HairDiseasesSection",
        );
      }
      return;
    }

    // Map disease titles to routes - updated to match exact titles from hairDiseasesData
    const diseaseRouteMap: { [key: string]: string } = {
      "סבוריאה דרמטיטיס וקשקשת": "#hair-disease-seborrheic-dermatitis",
      "אלופציה אראטה": "#hair-disease-alopecia-areata",
      "Alopecia Areata אלופציה אראטה": "#hair-disease-alopecia-areata",
      "אלופציה טראקציונית": "#hair-disease-traction-alopecia",
      "ליכן פלנופילאריס": "#hair-disease-lichen-planopilaris",
      "לופוס אריתמטוזוס": "#hair-disease-lupus-erythematosus",
      "פוליקוליטיס דקלוואנס": "#hair-disease-folliculitis-decalvans",
      "דלקת תת־עורית מתפשטת": "#hair-disease-dissecting-folliculitis",
      "אקנה קלויידלית נוכה": "#hair-disease-acne-keloidalis-nuchae",
    };

    const route = diseaseRouteMap[diseaseTitle];
    if (route) {
      if (process.env.NODE_ENV === "development") {
        console.log("Navigating to disease route:", route);
      }
      
      // Just navigate - useNavigation will handle saving the scroll position
      onNavigate(route);
    } else {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "No route found for disease:",
          diseaseTitle,
          "Available routes:",
          Object.keys(diseaseRouteMap)
        );
      }
    }
  };

  if (loading) {
    return (
      <section className={`py-20 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop: Horizontal row of diseases */}
          <div className="hidden md:flex flex-wrap justify-center gap-4">
            {HAIR_DISEASES.map((_, i) => (
              <div
                key={i}
                className="animate-pulse flex-shrink-0"
                style={{ maxWidth: "280px", minWidth: "260px" }}
              >
                <div className="h-64 bg-gray-200 rounded-lg relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-300 rounded-b-lg"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Horizontal scroll */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse flex-shrink-0 w-80"
                >
                  <div className="h-60 bg-gray-200 rounded-lg relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-300 rounded-b-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hair-diseases-section" className={`py-20 ${className}`}>
      <div className="max-w-7xl lg:w-[90%] lg:max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* <h2 className="text-3xl font-bold text-gray-900 mb-4">*/}
          <h2 className="text-3xl md:text-4xl font-bold text-[#101828]">
            מחלות שיער וקרקפת
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            אבחון וטיפול במגוון רחב של מחלות שיער וקרקפת עם גישה
            רפואית מקצועית
          </p>
        </div>

        {/* Desktop: Images displayed in a symmetric grid with empty space in position 5 */}
        <div className="hidden md:block relative">
          {/* Desktop: Show diseases in 4 columns grid (2 rows of 4) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {HAIR_DISEASES.map((disease, index) => (
              <div
                key={`disease_desktop_${index}`}
                className="w-full"
              >
                <Card
                  className="disease-card disease-card-smooth gpu-accelerated p-0 hover:shadow-2xl cursor-pointer group border-gray-200 hover:border-gold/50 overflow-hidden h-full flex flex-col transition-all duration-500 transform hover:scale-105 hover:brightness-110"
                  onClick={() =>
                    handleDiseaseClick(disease.title)
                  }
                >
                  <div className="relative overflow-hidden h-60 sm:h-72 md:h-60 lg:h-96">
                    <ImageWithFallback
                      src={disease.image}
                      alt={disease.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                    />

                    {/* Dark overlay that gets lighter on hover */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500"></div>

                    {/* Title overlay at the bottom */}
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-6"
                      dir="rtl"
                    >
                      <h3 className="text-xl sm:text-2xl font-bold text-white text-right group-hover:text-[#905e26] transition-all duration-300 transform group-hover:scale-105">
                        {disease.title}
                      </h3>
                    </div>

                    {/* Subtle glow effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-t from-[#905e26]/30 via-transparent to-transparent"></div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Push carousel with swipe and drag support */}
        <div className="md:hidden">
          {/* Push carousel container */}
          <div
            className="relative mb-8 px-2 smooth-momentum-scroll"
            ref={mobileCardRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* אינדיקטור דחיפה */}
            {isDragging && Math.abs(dragOffset) > 20 && (
              <div
                className={`
                absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl z-30
                transition-all duration-200
              `}
              >
                {dragOffset > 0
                  ? "← המשך לגרור"
                  : "המשך לגרור →"}
              </div>
            )}

            {/* Step Number with Line - Mobile */}
            <div className="text-right mt-2 mb-2 px-4 relative z-40 pb-2">
              <div className="flex items-center justify-start">
                <div className="text-2xl font-bold text-[#101828] mr-4">
                  {currentIndex + 1}
                </div>
                <div className="w-32 h-px bg-[#101828]"></div>
              </div>
            </div>

            {/* הקלפים */}
            <div className="relative w-full max-w-lg mx-auto aspect-square rounded-2xl overflow-hidden">
              {HAIR_DISEASES.map((disease, index) => {
                const isActive = index === currentIndex;
                const isPrev = index < currentIndex;
                const isNext = index > currentIndex;

                return (
                  <div
                    key={`disease_mobile_push_${index}`}
                    className={`
                      absolute top-0 left-0 w-full h-full rounded-2xl
                      transition-all duration-500 ease-out
                      overflow-hidden
                      ${isActive ? "z-20" : isPrev ? "z-10" : "z-0"}
                    `}
                    style={{
                      transform: getSlideTransform(index),
                      opacity: getSlideOpacity(index),
                    }}
                  >
                    <Card
                      className="disease-card disease-card-smooth gpu-accelerated p-0 hover:shadow-2xl cursor-pointer group border-gray-200 hover:border-gold/50 overflow-hidden shadow-lg w-full h-full !flex !gap-0 transition-transform duration-300 hover:scale-105"
                      onClick={() =>
                        handleDiseaseClick(disease.title)
                      }
                    >
                      <div className="relative overflow-hidden w-full h-full rounded-xl">
                        <ImageWithFallback
                          src={disease.image}
                          alt={disease.title}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                        />

                        {/* Dark overlay that gets lighter on hover */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500"></div>

                        {/* Title overlay at the bottom */}
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6"
                          dir="rtl"
                        >
                          <h3 className="text-2xl font-bold text-white text-right group-hover:text-[#905e26] transition-all duration-300 transform group-hover:scale-105 line-clamp-2">
                            {disease.title}
                          </h3>
                        </div>

                        {/* Subtle glow effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-t from-[#905e26]/30 via-transparent to-transparent"></div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls for Mobile */}
          <div className="flex flex-col items-center gap-4">
            {/* Circular Navigation Buttons for Mobile - RTL order */}
            <div className="flex justify-center gap-4">
              {/* Previous button (שמאלה) - מביא תמונה משמאל */}
              <button
                className="w-10 h-10 bg-dark-blue hover:bg-black rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl carousel-nav-button"
                onClick={() => {
                  console.log(
                    "Mobile Previous button clicked - moving left",
                  );
                  scrollToPrevious();
                }}
                aria-label="תמונה קודמת"
              >
                <ChevronRight className="h-4 w-4 text-white" />
              </button>

              {/* Next button (ימינה) - מביא תמונה מימין */}
              <button
                className="w-10 h-10 bg-dark-blue hover:bg-black rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl carousel-nav-button"
                onClick={() => {
                  console.log(
                    "Mobile Next button clicked - moving right",
                  );
                  scrollToNext();
                }}
                aria-label="תמונה הבאה"
              >
                <ChevronLeft className="h-4 w-4 text-white" />
              </button>
            </div>

            {/* Position Indicators for Mobile - larger and more interactive */}
            <div className="flex gap-3 justify-center">
              {HAIR_DISEASES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`
                    h-3 rounded-full transition-all duration-300 transform
                    ${
                      index === currentIndex
                        ? "w-8 bg-gold scale-110 shadow-lg"
                        : "w-3 bg-gray-300 hover:bg-gray-400 hover:scale-125"
                    }
                    ${isTransitioning ? "cursor-not-allowed" : "cursor-pointer"}
                  `}
                  aria-label={`עבור למחלה ${index + 1}: ${HAIR_DISEASES[index].title}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS אנימציות */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes shimmer {
            0% { transform: translateX(-100%) skewX(-12deg); }
            100% { transform: translateX(200%) skewX(-12deg); }
          }
          
          /* אנימציית מעבר מעגלית חלקה */
          .circular-transition {
            transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          
          /* אנימציה מיוחדת למעברי קצה */
          .edge-transition {
            transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          }
        `,
        }}
      />
    </section>
  );
}