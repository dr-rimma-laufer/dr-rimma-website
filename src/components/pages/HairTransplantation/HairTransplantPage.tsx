'use client';
import React from "react";
import { HairTransplanFaqPage } from "./HairTransplanFaqPage";
import HairTransplantTimeline from "./HairTransplantTimeline";
import { HeroSection } from "./HeroSection";
import { WhyHairTransplantSection } from "./WhyHairTransplantSection";
import { ExcellenceSection } from "./ExcellenceSection";
import { TransplantStepsSection } from "./TransplantStepsSection";
import { FUEMethodSection } from "./FUEMethodSection";
import { NaturalAppearanceSection } from "./NaturalAppearanceSection";
import { RiskMinimizationSection } from "./RiskMinimizationSection";
import { ResultsTimelineSection } from "./ResultsTimelineSection";

interface HairTransplantPageProps {
  onNavigate?: (page: string) => void;
}

export function HairTransplantPage({
  onNavigate,
}: HairTransplantPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* למה השתלת שיער? */}
      <WhyHairTransplantSection />

      {/* מצוינות רפואית */}
      <ExcellenceSection />

      {/* מזעור סיכונים בהשתלת FUE */}
      <RiskMinimizationSection />

      {/* שלבים בהשתלת השיער */}
      <TransplantStepsSection />

      {/* Hair Transplant Methods */}
      {/* מהו השתלת שיער FUE */}
      <FUEMethodSection />

      {/* מה יוצר מראה טבעי לאחר השתלת שיער? */}
      <NaturalAppearanceSection />

      {/* Timeline After Hair Transplant - Results Timeline */}
      {/*<ResultsTimelineSection />*/ }

      {/* Interactive Timeline Section */}
      <HairTransplantTimeline />

      {/* FAQ Section */}
      <HairTransplanFaqPage onNavigate={onNavigate} />
    </div>
  );
}