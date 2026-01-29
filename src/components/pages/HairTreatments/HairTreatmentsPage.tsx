'use client';
import React from 'react';
import { 
  HeroSection,
  ClinicalOverviewSection,
  HairDiseasesSection,
  TreatmentStepsSection,
  CMSTreatmentTypes,
  AdvantagesSection,
  FAQSection,
  ContactCTASection
} from './index';

interface HairTreatmentsPageProps {
  onNavigate?: (page: string) => void;
}

export function HairTreatmentsPage({ onNavigate }: HairTreatmentsPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Clinical Overview Section */}
      <ClinicalOverviewSection onNavigate={onNavigate} />


      {/* Treatment Steps Section */}
      <TreatmentStepsSection />
      
      {/* Hair Diseases Section */}
      <HairDiseasesSection 
        className="bg-gray-50"
        onNavigate={onNavigate}
      />

      {/* Conservative Treatments - CMS Managed */}
      <CMSTreatmentTypes 
        sectionId="conservative-treatments"
        className=""
        onNavigate={onNavigate}
      />

      {/* Advantages */}
      <AdvantagesSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact CTA */}
      <ContactCTASection onNavigate={onNavigate} />
    </div>
  );
}