'use client';

import Link from 'next/link';
import { Button } from "../ui/button";
import { ArrowLeft, GraduationCap, Award, Heart, Microscope } from "lucide-react";
import drRimmaImage from '../../assets/36b3be41fd7ff933e013c53c69ce107b32dffae8_converted.jpg';
import ishrsLogo from '../../assets/955a8e208e1c2e180621afbd81607474be2fd734_converted.jpg';

interface AboutPreviewProps {
  onNavigate?: (page: string) => void;
}

export function AboutPreview({ onNavigate }: AboutPreviewProps) {
  return (
    <section className="min-h-screen bg-white flex items-start hebrew-text pt-20">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-full">
          
          {/* כותרות למובייל בלבד - מוצגות ראשונות */}
          <div className="lg:hidden order-1 text-right mb-3">
            <h2 className="text-4xl font-bold text-[#101828] mb-6 leading-tight">
             אודות ד״ר רימה לאופר בריטבה
            </h2>.
                      </div>

          {/* תמונה ומידע מקצועי - צד ימין */}
          <div className="relative order-2 lg:order-1">
            {/* תמונה ראשית של ד"ר רימה */}
            <div className="relative mb-8">
              <img
                src={drRimmaImage.src}
                alt="ד״ר רימה לאופר - מומחית לרפואת עור והשתלות שיער"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />     
            </div>

            {/* כרטיסיות הישגים מקצועיים */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <GraduationCap className="h-8 w-8 text-[#905e26] mx-auto mb-2" />
                <h4 className="font-semibold text-[#101828] text-sm">בוגרת הטכניון</h4>
                <p className="text-xs text-[#101828]/70">הפקולטה לרפואה</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <Award className="h-8 w-8 text-[#905e26] mx-auto mb-2" />
                <h4 className="font-semibold text-[#101828] text-sm">התמחות רמב"ם</h4>
                <p className="text-xs text-[#101828]/70">דרמטולוגיה</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <Microscope className="h-8 w-8 text-[#905e26] mx-auto mb-2" />
                <h4 className="font-semibold text-[#101828] text-sm">מחקר מתקדם</h4>
                <p className="text-xs text-[#101828]/70">מחלות שיער</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <Heart className="h-8 w-8 text-[#905e26] mx-auto mb-2" />
                <h4 className="font-semibold text-[#101828] text-sm">גישה אישית</h4>
                <p className="text-xs text-[#101828]/70">טיפול מותאם</p>
              </div>
            </div>
          </div>

          {/* תוכן - צד שמאל */}
          <div className="text-right lg:pr-8 order-3 lg:order-2">
            {/* כותרת ראשית - מוסתרת במובייל, מוצגת בדسكטופ */}
            <h2 className="hidden lg:block text-4xl lg:text-5xl font-bold text-[#101828] mb-6 leading-tight">
              ד״ר רימה לאופר
            </h2>

            <h3 className="hidden lg:block text-xl font-semibold text-[#101828] mb-8">
              מומחית לרפואת עור, בעיות קרקפת והשתלות שיער
            </h3>

            {/* תיאור מקצועי */}
            <p className="text-lg text-[#101828] mb-6 leading-relaxed">
              ד״ר רימה לאופר בריטבה היא רופאת עור מומחית, בוגרת הפקולטה לרפואה של הטכניון, 
              בעלת ניסיון קליני עשיר ברפואת עור, בעיות קרקפת, השתלות שיער ואסתטיקה רפואית.
            </p>

            <p className="text-lg text-[#101828] mb-8 leading-relaxed">
              השלימה התמחות בדרמטולוגיה במרכז הרפואי רמב״ם ועסקה במחקר מתקדם בתחום האלופציה אראטה. 
              בנוסף, השלימה התמחויות קליניות באירופה, כולל ב-ISHRS וב-EIMEC בברצלונה.
            </p>

            {/* כפתור פעולה */}
            <Link href="/about">
              <Button
                size="lg"
                className="bg-[#101828] hover:bg-[#905e26] text-white hover:text-white px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                קראו עוד אודותיי
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}