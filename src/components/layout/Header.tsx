'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { Logo } from "../Logo";
import { Menu, Phone, Calendar, Clock } from "lucide-react";
import { gsap } from "gsap";

const navigationItems = [
  { name: "בית", href: "/" },
  { name: "אודות", href: "/about" },
  { name: "השתלות שיער", href: "/hair-transplant" },
  { name: "טיפולי שיער", href: "/hair-treatments" },
  { name: "רפואת עור", href: "/dermatology" },
  { name: "אסתטיקה רפואית", href: "/aesthetics" },
  { name: "בלוג", href: "/blog" },
  { name: "שאלות נפוצות", href: "/faq" },
  { name: "צור קשר", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="w-full px-3 sm:px-6 lg:px-16 xl:px-20">
        <div className="flex justify-between items-center h-16 md:h-28 gap-8 lg:gap-12">
          {/* Mobile Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                className={`${isScrolled ? 'text-[#101828] hover:bg-[#101828]/20' : 'text-white hover:bg-white/20'} p-2 h-10 w-10`}
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
                <SheetDescription>תפריט הניווט הראשי של האתר</SheetDescription>
              </SheetHeader>

              {/* Mobile Header */}
              <div className="bg-[#101828] px-6 py-3 flex items-center justify-between">
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
                <div className="w-10"></div>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 px-6 py-3 space-y-1 overflow-y-auto">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block w-full text-right py-3 px-5 mr-5 text-lg font-semibold transition-colors border-b border-black/20 ${
                      isActive(item.href)
                        ? "text-[#905e26] bg-black/10"
                        : "text-[#101828] hover:text-[#905e26] hover:bg-black/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Action Buttons */}
              <div className="px-6 py-4 bg-[#101828]">
                <div className="flex gap-4 mb-3">
                  <Link href="/contact" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-white text-[#101828] hover:bg-[#101828] hover:text-white font-semibold py-3">
                      <Calendar className="ml-2 h-5 w-5" />
                      קביעת תור
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent border-white text-white hover:bg-white hover:text-[#101828] font-semibold py-3"
                    onClick={() => window.open("tel:+972501234567", "_self")}
                  >
                    <Phone className="ml-2 h-5 w-5" />
                    חייג עכשיו
                  </Button>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-reverse space-x-2 text-sm text-white/70 mb-1">
                    <Clock className="h-4 w-4" />
                    <span>שעות פעילות</span>
                  </div>
                  <p className="text-sm text-white font-medium">א׳-ה׳: 8:00-20:00 | ו׳: 8:00-14:00</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/">
            <Logo size="md" darkBackground={!isScrolled} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center gap-6">
              {navigationItems.slice(0, 6).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-lg font-semibold transition-all duration-200 hover:text-[#905e26] px-2 py-1 ${
                    isActive(item.href)
                      ? "text-[#905e26] border-b-2 border-[#905e26] font-bold"
                      : isScrolled ? "text-[#101828]" : "text-white"
                  } hover:scale-105`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className={`h-5 w-px ${isScrolled ? 'bg-[#101828]/30' : 'bg-white/30'} mx-5`}></div>

            <div className="flex items-center gap-6">
              {navigationItems.slice(6).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-lg font-semibold transition-all duration-200 hover:text-[#905e26] px-2 py-1 ${
                    isActive(item.href)
                      ? "text-[#905e26] border-b-2 border-[#905e26] font-bold"
                      : isScrolled ? "text-[#101828]" : "text-white"
                  } hover:scale-105`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Phone Button */}
            <button
              ref={el => { ctaButtonRefs.current[0] = el; }}
              className={`relative overflow-hidden inline-flex items-center justify-center rounded-full font-semibold text-base px-5 py-2.5 h-11 border-2 transition-colors duration-200 ${
                isScrolled ? 'border-[#101828]' : 'border-white'
              }`}
              style={{ background: 'transparent' }}
              onMouseEnter={() => handleCtaEnter(0)}
              onMouseLeave={() => handleCtaLeave(0)}
              onClick={() => window.open("tel:+972501234567", "_self")}
            >
              <span
                ref={el => { ctaCircleRefs.current[0] = el; }}
                className="absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                style={{ background: isScrolled ? '#101828' : '#ffffff', willChange: 'transform' }}
                aria-hidden="true"
              />
              <span className="relative inline-block leading-[1] z-[2]">
                <span className="cta-label relative z-[2] inline-flex items-center leading-[1]" style={{ color: isScrolled ? '#101828' : '#ffffff' }}>
                  <Phone className="ml-2 h-5 w-5" />
                  חייג עכשיו
                </span>
                <span className="cta-label-hover absolute left-0 top-0 z-[3] inline-flex items-center" style={{ color: isScrolled ? '#ffffff' : '#101828' }} aria-hidden="true">
                  <Phone className="ml-2 h-5 w-5" />
                  חייג עכשיו
                </span>
              </span>
            </button>

            {/* Appointment Button */}
            <Link href="/contact">
              <button
                ref={el => { ctaButtonRefs.current[1] = el; }}
                className={`relative overflow-hidden inline-flex items-center justify-center rounded-full font-semibold text-base px-5 py-2.5 h-11 border-2 transition-colors duration-200 ${
                  isScrolled ? 'border-[#101828]' : 'border-white'
                }`}
                style={{ background: 'transparent' }}
                onMouseEnter={() => handleCtaEnter(1)}
                onMouseLeave={() => handleCtaLeave(1)}
              >
                <span
                  ref={el => { ctaCircleRefs.current[1] = el; }}
                  className="absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                  style={{ background: isScrolled ? '#101828' : '#ffffff', willChange: 'transform' }}
                  aria-hidden="true"
                />
                <span className="relative inline-block leading-[1] z-[2]">
                  <span className="cta-label relative z-[2] inline-flex items-center leading-[1]" style={{ color: isScrolled ? '#101828' : '#ffffff' }}>
                    <Calendar className="ml-2 h-5 w-5" />
                    קביעת תור
                  </span>
                  <span className="cta-label-hover absolute left-0 top-0 z-[3] inline-flex items-center" style={{ color: isScrolled ? '#ffffff' : '#101828' }} aria-hidden="true">
                    <Calendar className="ml-2 h-5 w-5" />
                    קביעת תור
                  </span>
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
