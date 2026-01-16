'use client';

import Link from 'next/link';
import { useState } from 'react';

const navigation = [
  { name: 'דף הבית', href: '/' },
  { name: 'אודות', href: '/about' },
  { name: 'השתלת שיער', href: '/hair-transplant' },
  { name: 'טיפולי שיער', href: '/hair-treatments' },
  { name: 'דרמטולוגיה', href: '/dermatology' },
  { name: 'אסתטיקה', href: '/aesthetics' },
  { name: 'גלריה', href: '/gallery' },
  { name: 'בלוג', href: '/blog' },
  { name: 'שאלות נפוצות', href: '/faq' },
  { name: 'צור קשר', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-dark-blue">
              ד״ר רימה לאופר
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-dark-blue hover:text-gold transition-colors text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/contact" className="btn-gold">
              קביעת תור
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">פתח תפריט</span>
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-dark-blue hover:text-gold transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="btn-gold text-center mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                קביעת תור
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
