'use client';
import React, { useState } from 'react';

const menuItems = [
  { id: 'all', name: 'כל הטיפולים' },
  { id: 'acne', name: 'אקנה' },
  { id: 'psoriasis', name: 'פסוריאזיס' },
  { id: 'eczema', name: 'אקזמה' },
  { id: 'rosacea', name: 'רוזציאה' },
  { id: 'vitiligo', name: 'ויטיליגו' },
  { id: 'rashes', name: 'פריחות עור' },
  { id: 'infections', name: 'זיהומי עור' },
  { id: 'warts', name: 'יבלות' },
  { id: 'growths', name: 'גידולי עור' },
  { id: 'hives', name: 'אורטיקריה' },
  { id: 'itchy', name: 'גירוד בעור' },
  { id: 'scars', name: 'הפחתת צלקות' },
  { id: 'hair', name: 'שיער וקרפת' },
  { id: 'patch', name: 'בדיקת רגישות' },
  { id: 'nails', name: 'מצבי ציפורניים' },
  { id: 'melanoma', name: 'סרטן העור' },
  { id: 'fungal', name: 'פטרת' },
  { id: 'herpes', name: 'הרפס' },
];

interface DiseaseNavBarProps {
  onSelect?: (id: string) => void;
  activeId?: string;
}

export function DiseaseNavBar({ onSelect, activeId = 'all' }: DiseaseNavBarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const firstRow = menuItems.slice(0, 6);
  const secondRow = menuItems.slice(6, 12);
  const thirdRow = menuItems.slice(12, 18);

  const handleClick = (id: string) => {
    console.log('🎯 DiseaseNavBar - Navigating to disease:', id);
    if (onSelect) {
      onSelect(id);
    }
  };

  const getLinkClasses = (id: string) => {
    const isActive = activeId === id;
    const isHovered = hoveredId === id && !isActive;
    
    const baseClasses = "block py-3 px-2 text-center transition-all duration-300 cursor-pointer";
    
    if (isActive) {
      return `${baseClasses} bg-dark-blue text-white`;
    }
    
    if (isHovered) {
      return `${baseClasses} bg-blue-50 text-dark-blue`;
    }
    
    return `${baseClasses} bg-white text-dark-blue hover:bg-blue-50`;
  };

  return (
    <div className="sticky top-0 z-[100] bg-white shadow-lg border-b-[3px] border-dark-blue" dir="rtl">
      <div className="hidden md:block w-full py-5 px-2">
        {/* Title */}
        <div className="flex items-center justify-center gap-2.5 mb-4 text-dark-blue">
          <h3 className="text-xl">טיפולים ומחלות עור</h3>
        </div>
        
        {/* Navigation Table - Hidden on mobile */}
        <div className="w-full border-2 border-dark-blue rounded-xl overflow-hidden">
          <table className="w-full border-collapse">
            <tbody>
              {/* First Row */}
              <tr>
                {firstRow.map(item => (
                  <td key={item.id} className="p-0 border border-gray-200">
                    <a
                      className={getLinkClasses(item.id)}
                      onClick={() => handleClick(item.id)}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {item.name}
                    </a>
                  </td>
                ))}
              </tr>
              
              {/* Second Row */}
              <tr>
                {secondRow.map(item => (
                  <td key={item.id} className="p-0 border border-gray-200">
                    <a
                      className={getLinkClasses(item.id)}
                      onClick={() => handleClick(item.id)}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {item.name}
                    </a>
                  </td>
                ))}
              </tr>
              
              {/* Third Row */}
              <tr>
                {thirdRow.map(item => (
                  <td key={item.id} className="p-0 border border-gray-200">
                    <a
                      className={getLinkClasses(item.id)}
                      onClick={() => handleClick(item.id)}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {item.name}
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}