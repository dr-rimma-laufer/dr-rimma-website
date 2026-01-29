'use client';
import React from "react";
import { Card } from "../../ui/card";
import { Shield, Heart, Microscope } from "lucide-react";

export function RiskMinimizationSection() {
  return (
    <section className="bg-dark-blue py-12 lg:py-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* כותרת בצד ימין */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-right">
              <span className="block pr-0">אנו ממזערים</span>
              <span className="block pr-8 lg:pr-16">את כל הסיכונים</span>
              <span className="block pr-16 lg:pr-32">של השתלת שיער</span>
            </h2>
          </div>
          
          {/* סיכונים בצד שמאל */}
          <div className="lg:col-span-8">
            <div className="space-y-6">
              {/* זיהום */}
              <div className="flex gap-4 items-start">
                <Shield className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    זיהום
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    כמו בכל הליך כירורגי, גם בהשתלת שיער קיים סיכון
                    מסוים לזיהום. במרפאתנו אנו רואים בבטיחותכם ערך
                    עליון – לכן אנו מקפידים על סביבת טיפול נקייה
                    ומבוקרת, תוך שימוש באמצעי סטריליזציה מתקדמים
                    ועמידה בסטנדרטים הגבוהים ביותר של רפואה מודרנית.
                    כך תוכלו לעבור את התהליך בראש שקט ובתחושת ביטחון
                    מלאה.
                  </p>
                </div>
              </div>

              {/* כאב ודימום */}
              <div className="flex gap-4 items-start">
                <Heart className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    כאב ודימום
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    בימים הראשונים לאחר הטיפול ייתכן שחושו מעט
                    אי־נוחות או תבחינו בדימום קל – תופעות שכיחות
                    וחולפות. ברוב המקרים ניתן להקל על הכאב בעזרת
                    משככי כאבים רגילים הנמכרים ללא מרשם. אם בכל זאת
                    תרגישו אי־נוחות חריגה או דימום שאינו רגיל, אנו
                    כאן בשבילכם ונשמח לסייע בכל שאלה או צורך.
                  </p>
                </div>
              </div>

              {/* נזק לזקיקי שיער */}
              <div className="flex gap-4 items-start">
                <Microscope className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    נזק לזקיקי שיער
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    בתהליך השתלת שיער מסוג FUE חשוב ביותר שהחילוץ
                    יתבצע במימנות גבוהה. כאשר פעולה זו אינה נעשית
                    באופן מדויק, זקיקי השיער עלולים להיפגע ולהפוך
                    לבלתי שמישים להשתלה – ובכך עלול להיפגע גם סיכויי
                    ההצלחה של התוצאה הסופית. ד"ר רימה מבצעת את שלב
                    החילוץ ברמת דיוק מרבית, תוך הקפדה על מינימליזציה
                    של נזק לזקיקים ושמירה על איכותם. כך מובטחת
                    השתלה בטוחה, עם מקסימום זקיקים בריאים ומראה טבעי
                    לאורך שנים.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}