'use client';
import React from 'react';
import { Button } from '../../ui/button';
import { Shield, Phone } from 'lucide-react';

interface DermatologyClinicalOverviewSectionProps {
  onNavigate?: (page: string) => void;
}

export function DermatologyClinicalOverviewSection({ onNavigate }: DermatologyClinicalOverviewSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#101828]-900 mb-4">
            מחלות עור
             <br />
            סקירה קלינית
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#101828] to-[#905e26] mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rich-content-display">
              <p className="text-xl leading-relaxed text-gray-700 mb-6">
                העור מהווה את האיבר הגדול ביותר בגוף והוא משקף במידה רבה את מצב הבריאות הכללית והאיזון הפנימי של המטופל. בשל חשיפתו המתמדת לגורמים סביבתיים ולחץ פיזיולוגי, הוא רגיש למגוון רחב של מחלות והפרעות.
              </p>
              
              <p className="text-xl leading-relaxed text-gray-700 mb-6">
                מצבים אלו עשויים לנבוע מגורמים גנטיים, הורמונליים, דלקתיים, אלרגיים, זיהומיים, אוטואימוניים ואף להיות ביטוי למחלות סיסטמיות. לעיתים הם מתבטאים בתסמינים חיצוניים דומים כגון יובש, פריחה, גרד, אודם, כאב או הופעת נגעים שונים, אך מקורם ושיוכם הרפואי שונים לחלוטין.
              </p>
              
              <p className="text-xl leading-relaxed text-gray-700">
                אבחון מדויק של מחלות העור חיוני, שכן ברוב המקרים מדובר לא רק בבעיה אסתטית אלא בהפרעה רפואית אשר זיהוי מוקדם שלה מאפשר טיפול יעיל, מניעת סיבוכים ושיפור משמעותי באיכות החיים.
              </p>
            </div>
          </div>

          {/* Important Notice Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-start mb-4">
                <Shield className="h-6 w-6 text-red-600 mt-1 ml-2 flex-shrink-0" />
                <h3 className="font-bold text-red-800 text-lg">
                  חשוב לדעת
                </h3>
              </div>
              
              <div className="space-y-3 text-red-700">
                <p className="leading-relaxed">
                  כאשר מחלת העור מלווה בכאב, תחושת שריפה, רגישות או גרד משמעותי, 
                  <strong className="text-red-800"> יש לפנות בהקדם לרופא עור מומחה</strong>, 
                  שכן ייתכן שמדובר במצב רפואי המחייב טיפול מיידי.
                </p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-red-200">
                <Button 
                  size="sm"
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('#contact');
                    }
                  }}
                >
                  <Phone className="ml-2 h-4 w-4" />
                  יעוץ דחוף
                </Button>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
