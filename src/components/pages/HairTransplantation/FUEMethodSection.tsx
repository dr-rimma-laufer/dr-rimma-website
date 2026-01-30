'use client';
import React from "react";
import { CheckCircle } from "lucide-react";
import fueMethodImage from "../../../assets/a5605513942d55752720c8ed15c9351247deda1e_converted.jpg";

export function FUEMethodSection() {
  return (
    <section className="bg-white flex items-center pt-16 pb-0">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* חלק עליון - טקסט ותמונה */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-40 items-start mb-16">
          {/* עמודה ימנית - מהי שיטת FUE */}
          <div className="order-1 lg:order-1">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-blue mb-4 text-center">
                מהי השתלת שיער בשיטת FUE ?
                <br />
                Follicular Unit Excision
              </h2>

              {/* תמונה במובייל - מופיעה אחרי הכותרת */}
              <div className="lg:hidden flex items-center justify-center mb-6">
                <img 
                  src={fueMethodImage.src} 
                  alt="שיטת FUE - תהליך השתלת שיער"
                  className="w-full max-w-md rounded-lg shadow-lg border-4 border-dark-blue"
                  style={{ boxShadow: "0 20px 40px rgba(16, 24, 40, 0.2), 0 10px 20px rgba(144, 94, 38, 0.15)" }}
                />
              </div>

              <div className="space-y-3 text-dark-blue/90">
                <p className="text-lg leading-relaxed">
                  השתלת שיער בשיטת FUE היא שיטה מתקדמת להשבת
                  שיער טבעי, המאפשרת תוצאות מדויקות וטבעיות
                  במיוחד. השיטה מבוססת על הוצאה עדינה של יחידות
                  שיער בודדות מאזורי תורם והשתלתן באזורים
                  הזקוקים לטיפול. כל יחידה זקיקית מכילה אשכול
                  טבעי של 1 עד 4 שערות הגדלות יחד, מה שמבטיח
                  מראה אורגני ואותנטי לאחר ההשתלה.
                </p>

                <p className="text-lg leading-relaxed">
                  ההליך מתבצע באמצעות מכשירי מיקרו מתקדמים בקוטר
                  זעיר, המאפשרים דיוק מקסימלי והותרת צלקות
                  מינימליות. אזור התורם העיקרי הוא החלק האחורי
                  והצדדים של הראש, שם זקיקי השיער עמידים יותר
                  להתקרחות ושומרים על תכונותיהם גם לאחר ההשתלה.
                  במקרים מתאימים, ניתן גם לקחת שיער מאזורים
                  נוספים כמו הזקן או חלקי גוף אחרים, דבר המרחיב
                  את האפשרויות הטיפוליות. הזקיקים מושתלים בעיקר
                  באזורים קרחים או מדוללים בקרקפת, אך ניתן גם
                  להשתיל באזורי גוף אחרים בהתאם לצורך האסתטי,
                  כגון גבות, זקן או שפם.
                </p>

                <p className="text-lg leading-relaxed">
                  שיטת FUE מציעה יתרונות משמעותיים הכוללים צלקות
                  נקודתיות זעירות וכמעט בלתי נראות, החלמה מהירה
                  יותר, גמישות בבחירת תסרוקת כולל תספורות קצרות,
                  ובעיקר - תוצאות טבעיות לחלוטין שנשמרות לאורך
                  זמן.
                </p>
              </div>
            </div>
          </div>

          {/* עמודה שמאלית - תמונה בדסקטופ בלבד */}
          <div className="hidden lg:flex lg:order-2 items-center justify-center">
            <img
              src={fueMethodImage.src}
              alt="שיטת FUE - תהליך השתלת שיער"
              className="w-full max-w-md rounded-lg shadow-lg border-4 border-dark-blue"
              style={{ boxShadow: "0 20px 40px rgba(16, 24, 40, 0.2), 0 10px 20px rgba(144, 94, 38, 0.15)" }}
            />
          </div>
        </div>

        {/* חלק תחתון - יתרונות שיטת FUE */}
        <div className="bg-dark-blue p-8 lg:p-12 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="max-w-8xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* כותרת בצד ימין */}
              <div className="lg:col-span-4 flex items-center justify-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">
                  יתרונות עיקריים
                  <br />
                  של
                  <br />
                  שיטת FUE
                </h2>
              </div>
              
              {/* יתרונות בצד שמאל */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="flex gap-4 items-start">
                    <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white mb-2 lg:mb-0 lg:whitespace-nowrap">
                        תוצאות טבעיות
                      </h4>
                      <p className="text-white/90">
                        מראה אורגני ואותנטי של השיער החדש עם צמיחה
                        טבעית לחלוטין
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white mb-2">
                        ללא צלקות נראות
                      </h4>
                      <p className="text-white/90">
                        צלקות נקודתיות זעירות הבלתי נראות לעין, ללא
                        צלקת ליניארית
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white mb-2">
                        החלמה מהירה
                      </h4>
                      <p className="text-white/90">
                        חזרה לפעילות רגילה תוך ימים ספורים עם אי נוחות
                        מינימלית
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white mb-2">
                        דיוק מקסימלי
                      </h4>
                      <p className="text-white/90">
                        מכשירי מיקרו מתקדמים לתוצאות מדויקות ופגיעה
                        מינימלית ברקמות
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white mb-2">
                        יעילות גבוהה
                      </h4>
                      <p className="text-white/90">
                        שימור מקסימלי של זקיקי שיער איכותיים עם שיעור
                        הצלחה גבוה
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white mb-2">
                        גמישות בתסרוקת
                      </h4>
                      <p className="text-white/90">
                        אפשרות לתספורות קצרות ללא חשיפת צלקות ומראה
                        טבעי מושלם
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
