'use client';
import React from "react";
import { CheckCircle } from "lucide-react";

export function WhyHairTransplantSection() {
  return (
    <section className="flex flex-col">
      {/* חלק עליון - למה השתלת שיער? - רקע לבן - תופס רוחב מלא בדسكטופ */}
      <div className="bg-white w-full pt-4 pb-16 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-blue mb-6 text-center lg:mt-8">
            למה השתלת שיער ?
          </h2>

          <div className="space-y-3 text-dark-blue/90 max-w-none w-full">
            <p className="text-lg leading-relaxed">
              השתלת שיער היא הדרך היחידה להשיג צמיחה מחודשת
              וקבועה של שיער באזורים שבהם זקיקי השיער
              הידלדלו מאוד או נעלמו לחלוטין – כמו בקו שיער
              נסוג, בקרחת בקודקוד או באזורים נוספים.
            </p>

            <p className="text-lg leading-relaxed">
              נשירת שיער עלולה לגרום למראה מבוגר יותר, לפגוע
              בתחושת החיוניות ואף לשדר חוסר בריאות. עבור
              רבים, ההשפעה אינה רק אסתטית אלא גם חברתית
              ומקצועית.
            </p>

            <p className="text-lg leading-relaxed">
              שחזור השיער באמצעות השתלה יכול לשנות באופן
              דרמטי את תחושת הדימוי העצמי והביטחון, ולאפשר
              לך להיראות כלפי חוץ כפי שאתה מרגיש בפנים. ברגע
              שהשיער מתחיל לצמוח באזור ההשתלה, תוכל ליהנות
              ממראה טבעי ובריא ולהרגיש מצוין עם השיער שלך
              תוך זמן קצר.
            </p>

            <p className="text-lg leading-relaxed">
              כיום, השתלות שיער אינן נחלתם של מעטים בלבד.
              בזכות  טכנולוגיות מתקדמות, שיטות טיפול חדשניות
              ומחירים נגישים יותר – הפתרון זמין וריאלי עבור
              כל מי שמעוניין להחזיר לעצמו את מראה השיער ואת
              תחושת הביטחון.
            </p>
          </div>
        </div>
      </div>

      {/* חלק תחתון - יתרונות השתלת שיער - רקע כחול - בגובה מצומצם עם 2 עמודות */}
      <div className="bg-dark-blue w-full py-12 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
            יתרונות השתלת שיער
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="flex gap-3 items-start">
              <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white mb-2">
                  שיפור הדימוי העצמי
                </h4>
                <p className="text-white/90">
                  רמת הביטחון העצמי והמראה החיצוני משתפרים
                  באופן ניכר, מה שמוביל לשיפור איכות החיים
                  הכללית
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white mb-2">
                  פתרון קבוע
                </h4>
                <p className="text-white/90">
                  השיער המושתל גדל באופן טבעי ונשאר לכל החיים
                  - ללא צורך בטיפולים נוספים או בהשתלות חוזרות
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white mb-2">
                  מראה טבעי לחלוטין
                </h4>
                <p className="text-white/90">
                  טכנולוגיה מתקדמת המאפשרת השתלה מדויקת של
                  זקיקי שיער בזווית ובכיוון הטבעיים, ליצירת
                  מראה אסתטי ואותנטי
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white mb-2">
                  ללא תחזוקה יומית
                </h4>
                <p className="text-white/90">
                  לאחר תקופת ההתאוששות, השיער מטופל בדיוק כמו
                  שיער רגיל - ניתן לגזור, לצבוע ולעצב ללא
                  מגבלות
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white mb-2">
                  ללא תופעות לוואי
                </h4>
                <p className="text-white/90">
                  הליך בטוח המבוצע תחת הרדמה מקומית, עם שיעור
                  סיבוכים נמוך במיוחד ותקופת החלמה קצרה
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white mb-2">
                  השקעה חד-פעמית
                </h4>
                <p className="text-white/90">
                  בניגוד לטיפולים תרופתיים או קוסמטיים
                  מתמשכים, השתלת שיער היא פתרון חד-פעמי ללא
                  עלויות נוספות
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}