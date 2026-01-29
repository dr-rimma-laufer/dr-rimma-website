'use client';
import React, { useState, useEffect } from 'react';
import { DermatologyHero } from './DermatologyHero';
import { DermatologySkinDisorders } from './DermatologySkinDisorders';
import { DermatologyClinicalOverviewSection } from './DermatologyClinicalOverviewSection';

interface DermatologyPageProps {
  onNavigate: (page: string) => void;
}

export function DermatologyPage({ onNavigate }: DermatologyPageProps) {
  const [activePage, setActivePage] = useState('all');

  const handleNavigate = (page: string) => {
    // If it's a dermatology disease route, use the global navigation
    if (page.startsWith('#dermatology-disease-')) {
      console.log('🔴 DermatologyPage: Forwarding to global navigation:', page);
      onNavigate(page);
    } else if (page === '#dermatology') {
      // כשחוזרים מדף מחלה ל-#dermatology, גלול לסקשן המחלות
      console.log('🔴 DermatologyPage: Navigating back to #dermatology from disease page');
      onNavigate(page);
    } else {
      // Otherwise, handle internal navigation
      setActivePage(page);
      
      // אם חוזרים ל-'all', גלול לסקשן המחלות במקום לתחילת הדף
      if (page === 'all') {
        console.log('🔴 DermatologyPage: Navigating to all diseases, scrolling to diseases section');
        setTimeout(() => {
          const section = document.getElementById('dermatology-diseases-section');
          if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            console.log('📍 Scrolled to diseases section');
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Only show on 'all' page */}
      {activePage === 'all' && (
        <section className="h-auto w-full">
          <DermatologyHero />
                   
        </section>
      )}

      {/* Clinical Overview Section - Only show on 'all' page */}
      {activePage === 'all' && (
        <DermatologyClinicalOverviewSection onNavigate={handleNavigate} />
      )}

      {/* Main Content with Sidebar Section */}
      <DermatologySkinDisorders activePage={activePage} onNavigate={handleNavigate} />
    </div>
  );
}