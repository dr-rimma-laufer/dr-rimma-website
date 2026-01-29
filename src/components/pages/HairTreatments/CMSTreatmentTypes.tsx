'use client';
import React, { useState, useEffect } from 'react';
import { Card } from '../../ui/card';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { CONSERVATIVE_TREATMENTS } from '../../../utils/treatmentData';

interface TreatmentType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  duration: string;
  sessions: string;
  results: string;
  color?: string;
  order: number;
  isActive: boolean;
}

interface CMSTreatmentTypesProps {
  sectionId?: string;
  className?: string;
  onNavigate?: (page: string) => void;
}

export function CMSTreatmentTypes({ 
  sectionId = 'conservative-treatments',
  className = '',
  onNavigate
}: CMSTreatmentTypesProps) {
  const [treatments, setTreatments] = useState<TreatmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load treatments from static data
  const loadTreatments = async () => {
    try {
      // Convert static treatment data to expected format
      const staticTreatments: TreatmentType[] = CONSERVATIVE_TREATMENTS.map((treatment, index) => ({
        id: `treatment_${index + 1}`,
        title: treatment.title,
        subtitle: treatment.subtitle,
        description: treatment.description,
        features: treatment.features,
        image: treatment.image,
        duration: treatment.duration,
        sessions: treatment.sessions,
        results: treatment.results,
        color: treatment.color,
        order: index + 1,
        isActive: true
      }));

      // Reorder treatments to put "טיפול תרופתי לשיער" first
      const reorderedTreatments = [...staticTreatments].sort((a, b) => {
        if (a.title === 'טיפול תרופתי לשיער') return -1;
        if (b.title === 'טיפול תרופתי לשיער') return 1;
        return 0;
      });

      setTreatments(reorderedTreatments);
    } catch (error) {
      console.error('Error loading treatments:', error);
      setError('שגיאה בטעינת הטיפולים');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle treatment navigation
  const handleTreatmentClick = (treatmentTitle: string) => {
    console.log('Treatment card clicked:', treatmentTitle); // Debug log
    
    if (!onNavigate) {
      console.warn('onNavigate function not provided to CMSTreatmentTypes');
      return;
    }

    const treatmentRouteMap: { [key: string]: string } = {
      'PRP לשיער': '#treatment-prp',
      'מזותרפיה לשיער': '#treatment-mesotherapy',
      'טיפול תרופתי לשיער': '#treatment-medication',
      'טיפול לייזר רך': '#treatment-laser'
    };

    const route = treatmentRouteMap[treatmentTitle];
    if (route) {
      console.log('Navigating to treatment route:', route); // Debug log
      onNavigate(route);
    } else {
      console.warn('No route found for treatment:', treatmentTitle);
    }
  };

  useEffect(() => {
    loadTreatments();
  }, [sectionId]);

  if (loading) {
    return (
      <section className={`py-20 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-60 sm:h-72 bg-gray-200 rounded-lg relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-300 rounded-b-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`py-20 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">שגיאה בטעינת הטיפולים. אנא נסה שוב מאוחר יותר.</p>
        </div>
      </section>
    );
  }

  if (treatments.length === 0) {
    return (
      <section className={`py-20 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">אין טיפולים זמינו כרגע.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 bg-gradient-to-b from-gray-50 to-white ${className}`}>
      <div className="max-w-7xl lg:w-[90%] lg:max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#101828]">
            הטיפולים השמרניים שלנו
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            מגוון טיפולים מתקדמים ללא ניתוח המבוססים על המחקר המדעי החדיש ביותר
          </p>
        </div>

        {/* Mobile: Single column, Desktop: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {treatments.map((treatment) => (
            <Card 
              key={treatment.id} 
              className="p-0 hover:shadow-2xl transition-all duration-500 cursor-pointer group border-gray-200 overflow-hidden transform hover:scale-105 hover:brightness-110"
              onClick={() => handleTreatmentClick(treatment.title)}
            >
              <div className="relative overflow-hidden h-60 sm:h-72 md:h-60 lg:h-96">
                <ImageWithFallback
                  src={treatment.image}
                  alt={treatment.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                
                {/* Dark overlay that gets lighter on hover */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500"></div>
                
                {/* Simple title overlay at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white text-right group-hover:text-[#905e26] transition-all duration-300 transform group-hover:scale-105">
                    {treatment.title}
                  </h3>
                </div>

                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-t from-[#905e26]/30 via-transparent to-transparent"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}