'use client';
import React from "react";
import surgeonImage from "../../../assets/c5a25741c3601991b4cfc07b59673a91723524ff_converted.jpg";
import surgeonImage2 from "../../../assets/9d7d0f79fe1fcd19af2a8e203433700e17d554bb_converted.jpg";

export function ExcellenceSection() {
  return (
    <section className="bg-gray-50 py-16 lg:py-24 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 relative">
        {/* grid משופר */}
        <div className="grid lg:grid-cols-14 gap-y-8 lg:gap-y-12 lg:gap-x-8 xl:gap-x-12 items-center">
          
          {/* כותרת - מופיעה ראשונה במובייל, בצד ימין בדסקטופ */}
          <div className="order-1 lg:order-2 lg:col-span-7 xl:col-span-7">
            {/* כותרת במובייל - ממורכזת */}
            <h2 className="lg:hidden text-3xl font-bold text-dark-blue text-center">
             <span className="block">השתלת שיער</span>
             <span className="block">מקצועית ואסתטית</span>
             <span className="block">ברמה הגבוהה ביותר</span>
            </h2>
            
            {/* כותרת בדסקטופ - עם אפקט מדרגות */}
            <h2 className="hidden lg:block text-4xl font-bold text-dark-blue">
             <span className="block pr-0">השתלת שיער</span>
             <span className="block pr-16">מקצועית ואסתטית</span>
             <span className="block pr-32">ברמה הגבוהה ביותר</span>
            </h2>
          </div>

          {/* שמאל - תמונות - מופיעות שניות במובייל, בצד שמאל בדסקטופ */}
          <div className="relative order-2 lg:order-1 lg:col-span-7 xl:col-span-7 lg:row-span-2
                          lg:pr-8 xl:pr-16 transform lg:translate-x-12 xl:translate-x-24 transition-transform duration-700">
            {/* תמונה גדולה */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={surgeonImage2}
                alt="רופאה מבצעת השתלת שיער בדיוק מקסימלי"
                className="w-full aspect-[5/3] lg:aspect-[4/3] object-cover object-center"
              />
            </div>

            {/* תמונה קטנה עם חפיפה */}
            <div className="hidden md:block absolute bottom-0 left-0 w-[62%] -mb-8 lg:-mb-12 -ml-6 lg:-ml-12 xl:-ml-20 z-20">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={surgeonImage}
                  alt="רופאה מומחית מבצעת השתלת שיער"
                  className="w-full aspect-[4/3] object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* ימין - טקסט - מופיעים שלישיים במובייל, בצד ימין בדסקטופ */}
          <div className="space-y-4 order-3 lg:order-2 lg:col-span-7 xl:col-span-7">
            <div className="space-y-4 text-dark-blue/90">
              <p className="text-lg leading-relaxed">
                במרפאת ד"ר רימה לאופר־בריטבה אנו מתמחים בביצוע השתלות שיער מתקדמות, המשלבות מצוינות רפואית עם גישה אסתטית עדינה ומדויקת. כל הליך מתבצע על ידי רופאה מומחית ולא על ידי צוות טכנאים בלבד – כדי להבטיח דיוק מרבי, שימור מיטבי של זקיקים, אחוזי הצלחה גבוהים ותוצאה הרמונית וטבעית.
              </p>

              <p className="text-lg leading-relaxed">
                הקליניקה עושה שימוש בטכנולוגיות החדשניות ביותר בתחום השתלות השיער, המאפשרות טיפול יעיל, בטוח וללא צלקות נראות לעין. מעבר להיבט הרפואי, אנו רואים בחידוש קו השיער תהליך עיצובי ואסתטי – שילוב בין מדע לאמנות. תכנון קו השיער נעשה בהתאמה אישית למבנה הפנים, לקווי המתאר ולמאפייני השיער של כל מטופל ומטופלת, כך שהתוצאה נראית טבעית, מחמיאה ומשקפת את האישיות.
              </p>

              <p className="text-lg leading-relaxed">
                המטרה שלנו היא לא רק להשיב שיער – אלא להחזיר תחושת ביטחון, חיוניות ונראות צעירה לאורך שנים.
              </p>
            </div>
          </div>

        </div>

        {/* סטטיסטיקות - ממורכז מתחת לטקסט */}
        <div className="grid grid-cols-2 gap-6 pt-12 max-w-md mr-auto ml-0">
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl lg:text-6xl font-bold text-dark-blue">98%</span>
            </div>
            <p className="text-sm uppercase tracking-wide text-gray-500">
              שיעור הצלחה של ההשתלות
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl lg:text-6xl font-bold text-dark-blue">18</span>
              <span className="text-xl text-gray-600">חודשים</span>
            </div>
            <p className="text-sm uppercase tracking-wide text-gray-500">
              מעקב רפואי לאחר הניתוח
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


