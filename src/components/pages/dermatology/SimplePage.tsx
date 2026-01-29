'use client';
import React from 'react';

interface SimplePageProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  onNavigate: (page: string) => void;
}

export function SimplePage({ id, title, description, icon, gradient, onNavigate }: SimplePageProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5 text-sm">
        <button onClick={() => onNavigate('all')} className="text-[#2b7cba] hover:underline">דף הבית</button>
        <span className="text-gray-400">›</span>
        <span className="text-gray-600">{title}</span>
      </div>

      <div className="bg-gradient-to-r from-[#2b7cba] to-[#1e5a8a] text-white rounded-2xl p-12 mb-12">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg opacity-95 leading-relaxed max-w-3xl">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <div className={`w-full h-[350px] bg-gradient-to-br ${gradient} flex items-center justify-center text-8xl`}>
            {icon}
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-[#2b7cba] mb-5">טיפול מקצועי ואישי</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            אנו מציעים טיפולים מתקדמים ומותאמים אישית עבור {title}. צוות המומחים שלנו בעל ניסיון עשיר וידע מעמיק בתחום.
          </p>
          <p className="text-gray-600 leading-relaxed">
            נשמח לספק לכם ייעוץ מקצועי ולמצוא את הפתרון הטוב ביותר עבורכם.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-10">
        <h2 className="text-3xl font-bold text-[#2b7cba] mb-6">למידע נוסף</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          לקבלת מידע מפורט יותר על טיפולים זמינים ואפשרויות נוספות, אנא פנו אלינו לייעוץ אישי.
        </p>
        <button className="bg-[#2b7cba] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1e5a8a] transition-all duration-200 shadow-lg">
          קביעת תור
        </button>
      </div>
    </div>
  );
}
