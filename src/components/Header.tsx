import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { Badge } from "./ui/badge";
import { Logo } from "./Logo";
import { AppointmentDialog } from "./AppointmentDialog";
import { Menu, Phone, Calendar, Clock } from "lucide-react";
import { gsap } from "gsap";

interface HeaderProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
  isScrolled?: boolean;
}

export function Header({
  currentPage = "home",
  onNavigate,
  isScrolled = false,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // CTA Button Animation Refs
  const ctaCircleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const ctaTlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const ctaActiveTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const ctaButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // CTA Button Animation Setup
  useEffect(() => {
    const layoutCta = () => {
      ctaCircleRefs.current.forEach((circle, index) => {
        if (!circle || !ctaButtonRefs.current[index]) return;

        const button = ctaButtonRefs.current[index] as HTMLElement;
        const rect = button.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = button.querySelector<HTMLElement>('.cta-label');
        const white = button.querySelector<HTMLElement>('.cta-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        ctaTlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 0.4, ease: 'power3.easeOut', overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 0.4, ease: 'power3.easeOut', overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.easeOut', overwrite: 'auto' }, 0);
        }

        ctaTlRefs.current[index] = tl;
      });
    };

    layoutCta();

    const onResize = () => layoutCta();
    window.addEventListener('resize', onResize);

    if (document.fonts) {
      document.fonts.ready.then(layoutCta).catch(() => {});
    }

    return () => window.removeEventListener('resize', onResize);
  }, [isScrolled]);

  const handleCtaEnter = (i: number) => {
    const tl = ctaTlRefs.current[i];
    if (!tl) return;
    ctaActiveTweenRefs.current[i]?.kill();
    ctaActiveTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease: 'power3.easeOut',
      overwrite: 'auto'
    });
  };

  const handleCtaLeave = (i: number) => {
    const tl = ctaTlRefs.current[i];
    if (!tl) return;
    ctaActiveTweenRefs.current[i]?.kill();
    ctaActiveTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease: 'power3.easeOut',
      overwrite: 'auto'
    });
  };

  // Updated navigation items without gallery
  const navigationItems = [
    {
      name: "בית",
      href: "#home",
      current: currentPage === "home",
    },
    {
      name: "אודות",
      href: "#about",
      current: currentPage === "about",
    },
    {
      name: "השתלות שיער",
      href: "#hair-transplant",
      current: currentPage === "hair-transplant",
    },
    {
      name: "טיפולי שיער",
      href: "#hair-treatments",
      current:
        currentPage === "hair-treatments" ||
        currentPage === "prp-treatment",
    },
    {
      name: "רפואת עור",
      href: "#dermatology",
      current: currentPage === "dermatology",
    },
    {
      name: "אסתטיקה רפואית",
      href: "#aesthetics",
      current: currentPage === "aesthetics",
    },
    {
      name: "בלוג",
      href: "#blog",
      current: currentPage === "blog",
    },
    {
      name: "שאלות נפוצות",
      href: "#faq",
      current: currentPage === "faq",
    },
    {
      name: "צור קשר",
      href: "#contact",
      current: currentPage === "contact",
    },
  ];

  const handleNavClick = (href: string) => {
    console.log("🎯 Header navigation clicked:", href);
    console.log(
      "📍 Current scroll position before navigation:",
      window.pageYOffset || document.documentElement.scrollTop,
    );

    if (href === "#faq") {
      console.log(
        "📖 FAQ navigation detected from Header - ensuring scroll to top",
      );
    }

    if (onNavigate) {
      console.log("📤 Calling onNavigate with:", href);
      onNavigate(href);

      // Add a small delay to verify the navigation occurred
      setTimeout(() => {
        console.log(
          "📍 Scroll position 200ms after Header navigation:",
          window.pageYOffset ||
            document.documentElement.scrollTop,
        );
      }, 200);
    } else {
      console.warn("⚠️ onNavigate function is not available");
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "header-scrolled shadow-lg" : "header-not-scrolled"
      }`}
    >
      {/* Main Header - 30% Larger */}
      <div className="w-full px-3 sm:px-6 lg:px-16 xl:px-20">
        <div className="flex justify-between items-center h-16 md:h-28 gap-8 lg:gap-12">
          {/* Mobile Menu Button - Left Side */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                className={`${isScrolled ? 'text-dark-blue hover:bg-dark-blue/20' : 'text-white hover:bg-white/20'} p-2 h-10 w-10`}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="w-full mobile-menu-content p-0 border-none flex flex-col"
              dir="rtl"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>תפריט ניווט</SheetTitle>
                <SheetDescription>
                  תפריט הניווט הראשי של האתר - השתלות שיער
                  ואסתטיקה רפואית
                </SheetDescription>
              </SheetHeader>
              {/* Mobile Header with Logo - Reduced padding */}
              <div className="bg-dark-blue px-6 py-3 flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:bg-white/10"
                >
                  ✕
                </Button>
                <div className="flex-1 flex justify-center">
                  <Logo size="sm" darkBackground={true} />
                </div>
                <div className="w-10"></div>{" "}
                {/* Spacer for balance */}
              </div>

              {/* Mobile Navigation with separated sections - Reduced padding */}
              <nav className="flex-1 px-6 py-3 space-y-1 overflow-y-auto">
                {/* Main Pages */}
                {navigationItems.slice(0, 2).map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`block w-full text-right py-3 px-5 mr-5 text-lg font-semibold transition-colors border-b border-black/20 font-weight-600 ${
                      item.current
                        ? "text-gold bg-black/10"
                        : "text-dark-blue hover:text-gold hover:bg-black/10"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}

                {/* Hair Treatments Section */}
                <div className="space-y-1">
                  <button
                    onClick={() =>
                      handleNavClick("#hair-transplant")
                    }
                    className={`block w-full text-right py-3 px-5 mr-5 text-lg font-semibold transition-colors border-b border-black/20 font-weight-600 ${
                      currentPage === "hair-transplant"
                        ? "text-gold bg-black/10"
                        : "text-dark-blue hover:text-gold hover:bg-black/10"
                    }`}
                  >
                    השתלות שיער
                  </button>
                </div>

                {/* Rest of services (without gallery) */}
                {navigationItems.slice(3, 6).map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`block w-full text-right py-3 px-5 mr-5 text-lg font-semibold transition-colors border-b border-black/20 font-weight-600 ${
                      item.current
                        ? "text-gold bg-black/10"
                        : "text-dark-blue hover:text-gold hover:bg-black/10"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}

                {/* Separator between main pages and FAQ/Contact */}
                <div className="border-t-2 border-[#0a0f1a]/30 my-3"></div>

                {navigationItems.slice(6).map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`block w-full text-right py-3 px-5 mr-5 text-lg font-semibold transition-colors border-b border-[#0a0f1a]/20 font-weight-600 ${
                      item.current
                        ? "text-[#905e26] bg-[#0a0f1a]/10"
                        : "text-[#101828] hover:text-[#905e26] hover:bg-[#0a0f1a]/10"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </nav>

              {/* Mobile Action Buttons - Fixed at bottom with safe area */}
              <div className="mobile-buttons-container px-6 py-4 safe-area-inset-bottom">
                <div className="flex gap-4 mb-3">
                  <AppointmentDialog>
                    <Button
                      className="flex-1 bg-white text-[#101828] hover:bg-[#101828] hover:text-white font-semibold py-3 transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Calendar className="ml-2 h-5 w-5" />
                      קביעת תור
                    </Button>
                  </AppointmentDialog>
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent border-white text-white hover:bg-white hover:text-[#101828] hover:border-[#101828] font-semibold py-3"
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.open("tel:+972501234567", "_self");
                    }}
                  >
                    <Phone className="ml-2 h-5 w-5" />
                    חייג עכשיו
                  </Button>
                </div>

                {/* Mobile Contact Info - Compact */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-reverse space-x-2 text-sm text-[#0a0f1a]/70 mb-1">
                    <Clock className="h-4 w-4" />
                    <span>שעות פעילות</span>
                  </div>
                  <p className="text-sm text-[#0a0f1a] font-medium">
                    א׳-ה׳: 8:00-20:00 | ו׳: 8:00-14:00
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo - Center - Slightly Larger */}
          <div
            className="cursor-pointer"
            onClick={() => {
              console.log("Logo clicked - navigating to home");
              handleNavClick("#home");
            }}
          >
            <Logo size="md" darkBackground={!isScrolled} />
          </div>

          {/* Desktop Navigation with separator */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center gap-6">
              {navigationItems.slice(0, 6).map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-lg font-semibold transition-all duration-200 hover:font-bold hover:text-[#905e26] font-weight-600 px-2 py-1 ${
                    item.current
                      ? "text-[#905e26] border-b-2 border-[#905e26] font-bold"
                      : isScrolled ? "text-dark-blue" : "text-white"
                  } hover:scale-105`}
                  style={{
                    fontSize: item.current ? "20px" : "18px",
                    ":hover": {
                      fontSize: "20px",
                    },
                  }}
                  onMouseEnter={(e) => {
                    if (!item.current) {
                      e.currentTarget.style.fontSize = "20px";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!item.current) {
                      e.currentTarget.style.fontSize = "18px";
                    }
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Visual separator */}
            <div className={`h-5 w-px ${isScrolled ? 'bg-dark-blue/30' : 'bg-white/30'} mx-5`}></div>

            <div className="flex items-center gap-6">
              {navigationItems.slice(6).map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-lg font-semibold transition-all duration-200 hover:font-bold hover:text-[#905e26] font-weight-600 px-2 py-1 ${
                    item.current
                      ? "text-[#905e26] border-b-2 border-[#905e26] font-bold"
                      : isScrolled ? "text-dark-blue" : "text-white"
                  } hover:scale-105`}
                  style={{
                    fontSize: item.current ? "20px" : "18px",
                    ":hover": {
                      fontSize: "20px",
                    },
                  }}
                  onMouseEnter={(e) => {
                    if (!item.current) {
                      e.currentTarget.style.fontSize = "20px";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!item.current) {
                      e.currentTarget.style.fontSize = "18px";
                    }
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </nav>

          {/* CTA Buttons with proper spacing - Slightly Larger */}
          <div className="hidden md:flex items-center gap-4">
            {/* Phone Button */}
            <button
              ref={el => { ctaButtonRefs.current[0] = el; }}
              className={`relative overflow-hidden inline-flex items-center justify-center rounded-full font-semibold text-base px-5 py-2.5 h-11 border-2 transition-colors duration-200 ${
                isScrolled 
                  ? 'border-dark-blue' 
                  : 'border-white'
              }`}
              style={{ background: 'transparent' }}
              onMouseEnter={() => handleCtaEnter(0)}
              onMouseLeave={() => handleCtaLeave(0)}
              onClick={() => {
                console.log("Desktop phone button clicked");
                try {
                  window.open("tel:+972501234567", "_self");
                } catch (error) {
                  console.error("Error making phone call:", error);
                  window.location.href = "tel:+972501234567";
                }
              }}
            >
              <span
                ref={el => { ctaCircleRefs.current[0] = el; }}
                className="absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                style={{
                  background: isScrolled ? '#0a0f1a' : '#ffffff',
                  willChange: 'transform'
                }}
                aria-hidden="true"
              />
              <span className="relative inline-block leading-[1] z-[2]">
                <span
                  className="cta-label relative z-[2] inline-flex items-center leading-[1]"
                  style={{ 
                    color: isScrolled ? '#0a0f1a' : '#ffffff',
                    willChange: 'transform' 
                  }}
                >
                  <Phone className="ml-2 h-5 w-5" />
                  חייג עכשיו
                </span>
                <span
                  className="cta-label-hover absolute left-0 top-0 z-[3] inline-flex items-center"
                  style={{
                    color: isScrolled ? '#ffffff' : '#0a0f1a',
                    willChange: 'transform, opacity'
                  }}
                  aria-hidden="true"
                >
                  <Phone className="ml-2 h-5 w-5" />
                  חייג עכשיו
                </span>
              </span>
            </button>

            {/* Appointment Button - Wrapped in AppointmentDialog */}
            <AppointmentDialog>
              <button
                ref={el => { ctaButtonRefs.current[1] = el; }}
                className={`relative overflow-hidden inline-flex items-center justify-center rounded-full font-semibold text-base px-5 py-2.5 h-11 border-2 transition-colors duration-200 ${
                  isScrolled 
                    ? 'border-dark-blue' 
                    : 'border-white'
                }`}
                style={{ background: 'transparent' }}
                onMouseEnter={() => handleCtaEnter(1)}
                onMouseLeave={() => handleCtaLeave(1)}
              >
                <span
                  ref={el => { ctaCircleRefs.current[1] = el; }}
                  className="absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                  style={{
                    background: isScrolled ? '#0a0f1a' : '#ffffff',
                    willChange: 'transform'
                  }}
                  aria-hidden="true"
                />
                <span className="relative inline-block leading-[1] z-[2]">
                  <span
                    className="cta-label relative z-[2] inline-flex items-center leading-[1]"
                    style={{ 
                      color: isScrolled ? '#0a0f1a' : '#ffffff',
                      willChange: 'transform' 
                    }}
                  >
                    <Calendar className="ml-2 h-5 w-5" />
                    קביעת תור
                  </span>
                  <span
                    className="cta-label-hover absolute left-0 top-0 z-[3] inline-flex items-center"
                    style={{
                      color: isScrolled ? '#ffffff' : '#0a0f1a',
                      willChange: 'transform, opacity'
                    }}
                    aria-hidden="true"
                  >
                    <Calendar className="ml-2 h-5 w-5" />
                    קביעת תור
                  </span>
                </span>
              </button>
            </AppointmentDialog>

            {/* Contact Button */}
            <button
              ref={el => { ctaButtonRefs.current[2] = el; }}
              className={`relative overflow-hidden inline-flex items-center justify-center rounded-full font-semibold text-base px-5 py-2.5 h-11 border-2 transition-colors duration-200 ${
                isScrolled 
                  ? 'border-dark-blue' 
                  : 'border-white'
              }`}
              style={{ background: 'transparent' }}
              onMouseEnter={() => handleCtaEnter(2)}
              onMouseLeave={() => handleCtaLeave(2)}
              onClick={() => handleNavClick("#contact")}
            >
              <span
                ref={el => { ctaCircleRefs.current[2] = el; }}
                className="absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                style={{
                  background: isScrolled ? '#0a0f1a' : '#ffffff',
                  willChange: 'transform'
                }}
                aria-hidden="true"
              />
              <span className="relative inline-block leading-[1] z-[2]">
                <span
                  className="cta-label relative z-[2] inline-flex items-center leading-[1]"
                  style={{ 
                    color: isScrolled ? '#0a0f1a' : '#ffffff',
                    willChange: 'transform' 
                  }}
                >
                  צור קשר
                </span>
                <span
                  className="cta-label-hover absolute left-0 top-0 z-[3] inline-flex items-center"
                  style={{
                    color: isScrolled ? '#ffffff' : '#0a0f1a',
                    willChange: 'transform, opacity'
                  }}
                  aria-hidden="true"
                >
                  צור קשר
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}