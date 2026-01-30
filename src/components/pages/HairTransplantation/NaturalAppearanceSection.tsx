'use client';
import React from "react";
import naturalAppearImage from '../../../assets/0447b315ad9dcecae583a576664da4d1c00d0360_converted.jpg';

export function NaturalAppearanceSection() {
  return (
    <section className="relative bg-white">
      <div className="relative w-full flex items-center">
        {/* Text Content - Left Side with White Background and Gradient */}
        <div 
          className="w-full lg:w-1/2 py-16 px-6 sm:px-8 lg:px-12 xl:px-16 bg-white relative z-10"
          style={{
            background: window.innerWidth >= 1024 ? 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.95) 15%, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 1) 70%, rgba(255, 255, 255, 0.95) 85%, rgba(255, 255, 255, 0) 100%)' : 'white'
          }}
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-blue mb-6 text-center">
              מה יוצר מראה טבעי
              <br/>
              לאחר השתלת שיער?
            </h2>
            
            {/* Mobile Image - Below Title */}
            <img 
              src={naturalAppearImage.src} 
              alt="מראה טבעי אחרי השתלת שיער" 
              className="lg:hidden w-full h-64 object-cover rounded-xl mb-6"
            />
            
            <p className="text-lg lg:text-xl text-dark-blue/80 leading-relaxed mb-6">
              אחד הגורמים החשובים ביותר בהצלחת השתלת שיער הוא המראה הטבעי של התוצאה. 
              כדי להגיע לכך, נדרשת תשומת לב לפרטים הקטנים ביותר ולשילוב נכון בין טכניקה 
              רפואית מדויקת לבין הבנה אסתטית.
            </p>
            <p className="text-lg lg:text-xl text-dark-blue/80 leading-relaxed mb-6">
                בזכות שילוב עקרונות הבאים, השתלת שיער מתבצעת כך שהתוצאה הסופית נראית 
                טבעית לחלוטין – כאילו לא בוצע טיפול כלל, אלא השיער פשוט צמח מחדש.
            </p>
            {/* צפיפות נכונה */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-dark-blue mb-2">
                עיצוב קו השיער
                </h3>                  
                <p className="text-dark-blue/80 leading-relaxed">
                קו השיער הוא קימור ייחודי ומותאם אישית המושפע מגיל, מבנה עצם, הבעות פנים ופיזור שיער. התעלמות מניואנסים אלו מובילה לתוצאות מלאכותיות. זו הסיבה שבגללה עינו האמנותית של המנתח חיונית לא פחות מטכניקת ההשתלה עצמה.
                </p>
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-dark-blue mb-2">
                 צפיפות נכונה
                </h3>
                <p className="text-dark-blue/80 leading-relaxed">
                  יצירת שילוב אידיאלי בין השיער הקיים לבין הזקיקים המושתלים, 
                  כדי להגיע לנפח טבעי ואחיד.
                </p>
              </div>
              {/* זווית וכיוון הצמיחה */}
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-dark-blue mb-2">
                  זווית וכיוון הצמיחה
                </h3>
                <p className="text-dark-blue/80 leading-relaxed">
                  לכל אזור בקרקפת יש זווית וכיוון ייחודיים שבהם השיער גדל. 
                  הקפדה על שחזור זוויות אלו בשלב תכנון ההשתלה היא המפתח למראה טבעי.
                </p>
              </div>

              {/* הדרגתיות בקו השיער */}
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-dark-blue mb-2">
                  הדרגתיות בקו השיער
                </h3>
                <p className="text-dark-blue/80 leading-relaxed">
                   בקו הקדמי מושתלים תחילה זקיקים בודדים, ובהדרגה
              נוספים זקיקים מרובי שערות. כך מתקבלת מראה
              "מתמזג" רך וטבעי.
                </p>
              </div>

              {/* חוסר אחידות טבעית */}
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-dark-blue mb-2">
                חוסר אחידות טבעית
                </h3>
                <p className="text-dark-blue/80 leading-relaxed">
                השיער אינו גדל בקווים ישרים לחלוטין. יצירת
               גבולות מעט לא אחידים מדמה את אופן הצמיחה הטבעי
              ומונעת מראה מלאכותי.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image - Right Side - Desktop Only */}
        <div className="hidden lg:block absolute left-0 top-0 w-3/5 h-full">
          <img 
            src={naturalAppearImage} 
            alt="מראה טבעי אחרי השתלת שיער" 
            className="w-full h-full object-cover object-left"
          />
        </div>
      </div>
    </section>
  );
}
