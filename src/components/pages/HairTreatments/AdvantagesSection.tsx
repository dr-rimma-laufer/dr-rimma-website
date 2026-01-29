'use client';
import React from 'react';
import { Droplets, Clock, Shield } from 'lucide-react';

export function AdvantagesSection() {
  const advantages = [
    {
      icon: Droplets,
      title: 'ללא ניתוח',
      description: 'פתרונות יעילים ללא צורך בהליכים ניתוחיים'
    },
    {
      icon: Clock,
      title: 'זמן חלום מינימלי',
      description: 'חזרה מיידית לפעילות יומיומית לאחר הטיפול'
    },
    {
      icon: Shield,
      title: 'בטיחות מקסימלית',
      description: 'טיפולים בטוחים עם מינימום תופעות לוואי'
    }
  ];

  return (
    <section className="flex flex-col lg:flex-row min-h-[500px] lg:min-h-[30vh]">
      {/* Right Section - Gray Background - Desktop Only */}
      <div className="hidden lg:flex bg-gray-100 lg:w-[30%] items-center justify-center py-20 lg:py-12 px-4 sm:px-6 lg:px-12">
        <div className="text-center lg:text-right max-w-xl">
          <h2 className="text-3xl font-bold text-[#101828] mb-4">
            היתרונות של הטיפולים השמרניים
          </h2>
          <p className="text-xl text-[#101828]/80">
            למה לבחור בטיפולים ללא ניתוח לטיפול בבעיות שיער?
          </p>
        </div>
      </div>

      {/* Left Section - Dark Blue Background */}
      <div className="bg-[#101828] w-full lg:w-[70%] py-20 lg:py-12 px-4 sm:px-6 lg:px-12">
        {/* Mobile Title */}
        <div className="lg:hidden text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            היתרונות של הטיפולים השמרניים
          </h2>
          <p className="text-xl text-white/80">
            למה לבחור בטיפולים ללא ניתוח לטיפול בבעיות שיער?
          </p>
        </div>
        
        <div className="max-w-3xl w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center">
                <div className="bg-white text-[#101828] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <advantage.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {advantage.title}
                </h3>
                <p className="text-white/80">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}