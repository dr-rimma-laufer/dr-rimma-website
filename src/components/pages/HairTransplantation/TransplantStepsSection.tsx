'use client';
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { ChevronLeft, ChevronRight } from "lucide-react";
import consultationImage from "../../../assets/16b8df6bf70f413ac77e5c54e5f658cb82e506bb_converted.jpg";
import transplantProcedureImage from "../../../assets/a1a54e40bec20e5cfd24a912af5359fb4e43b190_converted.jpg";
import preservationImage from "../../../assets/93f0bf50542a3a7de20a3f0a5797139ecaa04fd6_converted.jpg";
import transplantationStepImage from "../../../assets/ed7e487927b1921ddba979a5331d30577076e64a_converted.jpg";
import followUpImage from "../../../assets/bddabeb9312801e4a31888fa116771a55f8feecd_converted.jpg";
import hairLineDesign from "../../../assets/5e4b7f508ccb7b2d1d3893a858f13b22ed5d3bce_converted.jpg";
import hairCalculation from "../../../assets/6b7f0b6e7b8ea6e94a52635c55298431ed2262d4_converted.jpg";

interface Step {
  number: string;
  title: string;
  description: string;
  imageUrl: string;
}

// TransplantStepCard Component (similar to TreatmentStepCard)
function TransplantStepCard({
  step,
  isActive,
  onClick,
  isHovered = false,
}: {
  step: Step;
  isActive: boolean;
  onClick: () => void;
  isHovered?: boolean;
}) {
  return (
    <div className="w-[90%] mx-auto transform transition-all duration-700 ease-in-out">
      {/* Step Number with Line */}
      <div className="text-right mb-4">
        <div className="flex items-center justify-start">
          <div
            className={`text-2xl font-bold mr-4 transition-colors duration-300 ${
              isHovered ? "text-dark-blue" : "text-dark-blue/70"
            }`}
          >
            {step.number}
          </div>
          <div
            className={`w-32 h-px transition-all duration-300 ${
              isHovered ? "bg-dark-blue" : "bg-dark-blue/50"
            }`}
          ></div>
        </div>
      </div>

      {/* Step Card */}
      <div
        className={`relative flex flex-col h-[500px] rounded-2xl bg-white overflow-hidden transition-all duration-300 cursor-pointer group ${
          isHovered
            ? "scale-[1.11] shadow-xl ring-1 ring-dark-blue/15"
            : "shadow-md ring-1 ring-dark-blue/5 hover:shadow-lg hover:scale-105 hover:ring-dark-blue/10"
        }`}
        onClick={onClick}
      >
        {/* Hover Highlight Effect for Desktop */}
        {isHovered && (
          <div className="absolute inset-0 rounded-2xl">
            <div
              className="absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-15"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(16, 24, 40, 0.1) 0%, 
                  rgba(16, 24, 40, 0.05) 25%, 
                  rgba(16, 24, 40, 0.1) 50%, 
                  rgba(16, 24, 40, 0.05) 75%, 
                  rgba(16, 24, 40, 0.1) 100%)`,
              }}
            />
          </div>
        )}

        <div className="relative z-10 flex flex-col h-full">
          {/* Image */}
          <div className="overflow-hidden flex-shrink-0">
            <ImageWithFallback
              src={step.imageUrl}
              alt={step.title}
              className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-grow px-4 py-3">
            <div className="flex-shrink-0 mb-1">
              <h3
                className={`text-lg font-semibold tracking-tight mb-2 transition-colors duration-300 ${
                  isHovered
                    ? "text-dark-blue"
                    : "text-dark-blue/90"
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`leading-relaxed text-sm transition-colors duration-300 ${
                  isHovered
                    ? "text-dark-blue/70"
                    : "text-dark-blue/60"
                }`}
              >
                {step.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const steps: Step[] = [
  {
    number: "07",
    title: "טיפול ומעקב לאחר ההשתלה",
    description:
      "עם סיום ההשתלה, המטופל מקבל הנחיות מפורטות לטיפול בבית – הכוללות שטיפות עדינות, הימנעות ממגע ישיר, הגנה משמש ומעקב רפואי יזום. ביום שלאחר ההשתלה מוזמן המטופל לבדיקה לוודא החלמה תקינה והיקלטות טובה של הזקיקים. שמירה על הנחיות אלו תורמת משמעותית לתוצאה מיטבית ולקליטה מוצלחת של הזקיקים.",
    imageUrl: followUpImage,
  },
  {
    number: "06",
    title: "שלב ההשתלה",
    description:
      "כאשר נאסף מספר מספק של זקיקים, מתחיל שלב ההשתלה. במרפאה נעשה שימוש בשיטת ה-DHI המתקדמת באמצעות עט ההשתלה. הצוות הטיפולי טוען כל זקיק לעט ההשתלה ומוסר אותו לרופא, אשר קובע במדויק את כיוון, זווית ועומק ההחדרה. שיטה זו מאפשרת צפיפות גבוהה, שליטה מלאה בתוצאה והשתלה עדינה גם בין שיערות קיימות, ליצירת מראה טבעי לחלוטין.",
    imageUrl: transplantationStepImage,
  },
  {
    number: "05",
    title: "שימור והכנת הזקיקים להשתלה",
    description:
      "לאחר חילוץ הזקיקים, הם עוברים ניקוי, מיון לפי מספר שיערות בכל יחידה, והשריה בתמיסה עשירה בפלזמה פעילה שמגבירה את אחוזי ההיקלטות והחיות של הזקיקים. הצלחות הפטרי עם הזקיקים נשמרות בקירור עד לשלב ההשתלה. שלב זה קריטי להצלחת התהליך ולשמירה על איכות הזקיקים עד להשתלתם.",
    imageUrl: preservationImage,
  },
  {
    number: "04",
    title: "חילוץ הזקיקים",
    description:
      "אזור התרומה, לרוב בחלק האחורי או בצידי הקרקפת, הוא המקום ממנו נלקחים הזקיקים להשתלה. בשיטת FUE מחלצים כל זקיק שיער בנפרד באמצעות מיקרו-מכשור כירורגי מתקדם. החילוץ מבוצע בזהירות מירבית כדי לשמור על שלמות הזקיקים ועל המראה האסתטי של אזור התרומה – ללא חתך ליניארי וללא צלקת נראית לעין.",
    imageUrl: transplantProcedureImage,
  },
  {
    number: "03",
    title: "חישוב פיזור הזקיקים",
    description:
      "אנו מבצעים חישוב מדויק לפיזור הזקיקים, המתחשב באופן אישי בצרכי המטופל (כולל צפיפות, שטח הטיפול ועיצוב קו השיער). תכנון מוקפד זה מבטיח תוצאה אופטימלית: מראה טבעי, אחיד ובהרמוניה מלאה עם פני המטופל",
    imageUrl: hairCalculation,
  },
  {
    number: "02",
    title: "עיצוב קן השיער",
    description:
      "עיצוב קו השיער בהשתלת שיער הוא תהליך אישי, אמנותי וטכני. מטרתו ליצור מראה טבעי התואם את גיל המטופל, תוך התחשבות במבנה הפנים, נשירת השיער הצפויה והצבה מדויקת של השתלים.",
    imageUrl: hairLineDesign,
  },
  {
    number: "01",
    title: "פגישת ייעוץ",
    description:
      "לפני השתלת שיער מתקיימת פגישת ייעוץ אישית עם דר' רימה, במהלכה נבחנים ההיסטוריה הרפואית, מחלות עוריות או סיסטמיות, והטיפולים התרופתיים שעשויים להשפיע על צמיחת השיער. בנוסף, מוערכים תזונה, אורח חיים וגורמים מתח סביבתיים. בסיום מתבצעת בדיקה קלינית ודרמוסקופית של הקרקפת להערכת צפיפות ואיכות הזקיקים, ועל בסיס ממצאים אלו מותאמת תכנית טיפול אישית ותוצאה צפויה ריאלית.",
    imageUrl: consultationImage,
  },
];

export function TransplantStepsSection() {
  // Mobile carousel state (unchanged)
  const [currentIndex, setCurrentIndex] = useState(4);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(
    null,
  );
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [touchCurrent, setTouchCurrent] = useState<
    number | null
  >(null);
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const [swipeProgress, setSwipeProgress] = useState(0);

  // Desktop carousel state (new)
  const [currentDesktopStep, setCurrentDesktopStep] =
    useState(0);
  const [isDesktopTransitioning, setIsDesktopTransitioning] =
    useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(
    null,
  );
  const [isMobile, setIsMobile] = useState(false);

  const mobileCardRef = useRef<HTMLDivElement>(null);
  const minSwipeDistance = 50;

  // Reverse steps array so step 01 is first
  const reversedSteps = [...steps].reverse();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () =>
      window.removeEventListener("resize", checkIfMobile);
  }, []);

  // טיפול באירועי מגע - התחלה
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchCurrent(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwipeActive(true);
    setSwipeProgress(0);
  };

  // טיפול באירועי מגע - תנועה
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const currentX = e.targetTouches[0].clientX;
    setTouchEnd(currentX);
    setTouchCurrent(currentX);

    // Calculate swipe progress for visual feedback
    const distance = touchStart - currentX;
    const maxDistance = 100;
    const progress = Math.min(
      Math.abs(distance) / maxDistance,
      1,
    );
    setSwipeProgress(progress);
  };

  // טיפול באירועי מגע - סיום
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsSwipeActive(false);
      setSwipeProgress(0);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // בגלל שהמערך הפוך: swipe שמאלה = הבא (index קטן יותר), swipe ימינה = קודם (index גדול יותר)
    if (isLeftSwipe && currentIndex > 0) {
      scrollToNext();
    } else if (
      isRightSwipe &&
      currentIndex < steps.length - 1
    ) {
      scrollToPrevious();
    }

    setIsSwipeActive(false);
    setSwipeProgress(0);
    setTouchStart(null);
    setTouchEnd(null);
    setTouchCurrent(null);
  };

  // Mobile navigation functions (unchanged)
  const scrollToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex - 1;
        return nextIndex < 0 ? steps.length - 1 : nextIndex;
      });
      setIsTransitioning(false);
    }, 300);
  };

  const scrollToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % steps.length,
      );
      setIsTransitioning(false);
    }, 300);
  };

  const goToSlide = (slideIndex: number) => {
    if (isTransitioning || slideIndex === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(slideIndex);
      setIsTransitioning(false);
    }, 300);
  };

  // Desktop carousel functions (new)
  const getVisibleDesktopSteps = useCallback(() => {
    const totalSteps = reversedSteps.length;
    const visibleSteps: Step[] = [];

    // Add current step first (rightmost in RTL)
    visibleSteps.push(reversedSteps[currentDesktopStep]);

    // Add next steps (up to 3 more) - but don't wraparound
    for (let i = 1; i <= 3; i++) {
      const nextIndex = currentDesktopStep + i;
      if (nextIndex < totalSteps) {
        visibleSteps.push(reversedSteps[nextIndex]);
      }
    }

    return visibleSteps;
  }, [currentDesktopStep, reversedSteps]);

  const handleDesktopStepChange = useCallback(
    (stepIndex: number) => {
      if (
        stepIndex !== currentDesktopStep &&
        stepIndex >= 0 &&
        stepIndex < reversedSteps.length
      ) {
        setIsDesktopTransitioning(true);
        setTimeout(() => {
          setCurrentDesktopStep(stepIndex);
          setIsDesktopTransitioning(false);
        }, 300);
      }
    },
    [currentDesktopStep, reversedSteps.length],
  );

  const handleCardClick = (stepIndex: number) => {
    handleDesktopStepChange(stepIndex);
  };

  const handleMouseEnter = (stepIndex: number) => {
    if (!isMobile) {
      setHoveredCard(stepIndex);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoveredCard(null);
    }
  };

  return (
    <section
      className="min-h-screen bg-white flex items-center py-8 md:py-20"
      dir="rtl"
    >
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-dark-blue mb-4">
            תהליך השתלת השיער - צעד אחר צעד
          </h2>
          <p className="text-lg text-[#101828]/70 max-w-4xl leading-relaxed text-center mx-auto">
            המסע שלכם מתחיל בייעוץ מקצועי ומסתיים בתוצאות מרשימות. כל שלב מותאם אישית להבטחת התוצאות המיטביות והטבעיות ביותר
          </p>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>

        {/* Desktop: New Carousel Layout (similar to TreatmentStepsSection) */}
        <div className="hidden md:block">
          <div className="relative overflow-hidden mb-12 pb-8">
            <div
              className={`transition-all duration-700 ease-in-out transform ${
                isDesktopTransitioning
                  ? "opacity-0 translate-x-8"
                  : "opacity-100 translate-x-0"
              }`}
            >
              {/* Desktop: Multiple cards view with hover effects - 4 CARDS */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 items-stretch px-4">
                {getVisibleDesktopSteps().map((step) => {
                  const stepIndex = reversedSteps.findIndex(
                    (s) => s.number === step.number,
                  );
                  return (
                    <div
                      key={`desktop-${step.number}`}
                      onMouseEnter={() =>
                        handleMouseEnter(stepIndex)
                      }
                      onMouseLeave={handleMouseLeave}
                    >
                      <TransplantStepCard
                        step={step}
                        isActive={
                          stepIndex === currentDesktopStep
                        }
                        onClick={() =>
                          handleCardClick(stepIndex)
                        }
                        isHovered={hoveredCard === stepIndex}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step Navigation - Arrow Controls */}
          <div className="flex justify-center items-center gap-6 mb-8">
            {/* Left Arrow (Previous) - Disabled when at start */}
            <button
              onClick={() =>
                handleDesktopStepChange(currentDesktopStep - 1)
              }
              disabled={currentDesktopStep === 0}
              className={`transition-all duration-300 rounded-full p-3 flex items-center justify-center ${
                currentDesktopStep === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                  : "bg-dark-blue text-white hover:bg-dark-blue/80 hover:scale-110 shadow-lg"
              }`}
              aria-label="שלב קודם"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Right Arrow (Next) - Disabled when last step is visible */}
            <button
              onClick={() =>
                handleDesktopStepChange(currentDesktopStep + 1)
              }
              disabled={
                currentDesktopStep ===
                  reversedSteps.length - 1 ||
                (() => {
                  const visibleSteps = getVisibleDesktopSteps();
                  const isLastStepVisible = visibleSteps.some(
                    (step) =>
                      reversedSteps.findIndex(
                        (s) => s.number === step.number,
                      ) ===
                      reversedSteps.length - 1,
                  );
                  return isLastStepVisible;
                })()
              }
              className={`transition-all duration-300 rounded-full p-3 flex items-center justify-center ${
                currentDesktopStep ===
                  reversedSteps.length - 1 ||
                (() => {
                  const visibleSteps = getVisibleDesktopSteps();
                  const isLastStepVisible = visibleSteps.some(
                    (step) =>
                      reversedSteps.findIndex(
                        (s) => s.number === step.number,
                      ) ===
                      reversedSteps.length - 1,
                  );
                  return isLastStepVisible;
                })()
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                  : "bg-dark-blue text-white hover:bg-dark-blue/80 hover:scale-110 shadow-lg"
              }`}
              aria-label="שלב הבא"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile: Carousel Layout (UNCHANGED) */}
        <div className="md:hidden">
          {/* Carousel container */}
          <div
            className="relative mb-8 px-2"
            ref={mobileCardRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* אינדיקטור החלקה */}
            {isSwipeActive && swipeProgress > 0 && (
              <div className="absolute inset-0 z-20 pointer-events-none">
                <div
                  className="absolute inset-0 bg-black/10 rounded-2xl transition-opacity duration-150"
                  style={{ opacity: swipeProgress * 0.5 }}
                />
                {touchCurrent && touchStart && (
                  <div
                    className="absolute top-1/2 transform -translate-y-1/2 text-white font-bold text-lg transition-all duration-150 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm"
                    style={{
                      left:
                        touchCurrent < touchStart
                          ? "auto"
                          : "50%",
                      right:
                        touchCurrent < touchStart
                          ? "50%"
                          : "auto",
                      transform: "translateY(-50%)",
                      opacity: swipeProgress,
                    }}
                  >
                    {touchCurrent < touchStart
                      ? currentIndex > 0
                        ? "הבא ←"
                        : ""
                      : currentIndex < steps.length - 1
                        ? "→ הקודם"
                        : ""}
                  </div>
                )}
              </div>
            )}

            {/* הקלפים */}
            <div
              className={`w-full max-w-lg mx-auto px-2 transition-all duration-700 ease-in-out transform ${
                isTransitioning
                  ? "opacity-0 translate-x-8"
                  : "opacity-100 translate-x-0"
              }`}
              style={{ height: "550px" }}
            >
              {steps.map((step, index) => {
                const isActive = index === currentIndex;

                if (!isActive) return null;

                return (
                  <div
                    key={`step_mobile_${index}`}
                    className="w-full h-full rounded-2xl"
                  >
                    <div className="bg-white border-2 border-dark-blue/20 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={step.imageUrl}
                          alt={step.title}
                          className="w-full h-full object-cover"
                        />

                        {/* Step counter */}
                        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full">
                          <span className="text-sm font-semibold">
                            {step.number}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-5 sm:px-7 py-3 flex-1 overflow-y-auto">
                        <h3 className="text-dark-blue mb-2">
                          {step.title}
                        </h3>
                        <p className="text-dark-blue/80 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls for Mobile */}
          <div className="flex flex-col items-center gap-4 px-4">
            {/* Circular Navigation Buttons */}
            <div className="flex justify-center gap-4">
              {/* Previous button */}
              <button
                className="w-10 h-10 bg-dark-blue hover:bg-black rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl carousel-nav-button"
                onClick={scrollToPrevious}
                aria-label="שלב קודם"
              >
                <ChevronRight className="h-4 w-4 text-white" />
              </button>

              {/* Next button */}
              <button
                className="w-10 h-10 bg-dark-blue hover:bg-black rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl carousel-nav-button"
                onClick={scrollToNext}
                aria-label="שלב הבא"
              >
                <ChevronLeft className="h-4 w-4 text-white" />
              </button>
            </div>

            {/* Position Indicators */}
            <div className="flex gap-3 justify-center">
              {steps.map((_, index) => {
                const reversedIndex = steps.length - 1 - index;
                return (
                  <button
                    key={index}
                    onClick={() => goToSlide(reversedIndex)}
                    disabled={isTransitioning}
                    className={`
                      h-3 rounded-full transition-all duration-300 transform
                      ${
                        reversedIndex === currentIndex
                          ? "w-8 bg-dark-blue scale-110 shadow-lg"
                          : "w-3 bg-gray-300 hover:bg-dark-blue/50 hover:scale-125"
                      }
                      ${isTransitioning ? "cursor-not-allowed" : "cursor-pointer"}
                    `}
                    aria-label={`עבור לשלב ${steps[reversedIndex].number}: ${steps[reversedIndex].title}`}
                  ></button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}