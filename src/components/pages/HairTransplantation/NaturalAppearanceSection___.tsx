'use client';
import React from "react";

export function NaturalAppearanceSection() {
  return (
    <section className="min-h-screen bg-white flex items-center py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-blue mb-6">
            מה יוצר מראה טבעי לאחר השתלת שיער ?
          </h2>
          <p className="text-2xl text-dark-blue/80 max-w-6xl mx-auto leading-relaxed my-8">
            אחד הגורמים החשובים ביותר בהצלחת השתלת שיער הוא
            המראה הטבעי של התוצאה. כדי להגיע לכך, נדרשת תשומת
            לב לפרטים הקטנים ביותר ולשילוב נכון בין טכניקה
            רפואית מדויקת לבין הבנה אסתטית.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* צפיפות נכונה */}
          <div className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-dark-blue mb-4">
                צפיפות נכונה
              </h3>
            </div>
            <p className="text-dark-blue/80 leading-relaxed">
              יצירת שילוב אידיאלי בין השיער הקיים לבין הזקיקים
              המושתלים, כדי להגיע לנפח טבעי ואחיד.
            </p>
          </div>

          {/* זווית הצמיחה */}
          <div className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-dark-blue mb-4">
                זווית הצמיחה
              </h3>
            </div>
            <p className="text-dark-blue/80 leading-relaxed">
              לכל אזור בקרקפת יש זווית ייחודית שבה השיער גדל.
              הקפדה על שחזור זוויות אלו בשלב תכנון ההשתלה היא
              המפתח למראה טבעי.
            </p>
          </div>

          {/* כיוון השיער */}
          <div className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-dark-blue mb-4">
                כיוון השיער
              </h3>
            </div>
            <p className="text-dark-blue/80 leading-relaxed">
              שמירה על כיוון צמיחת השיער המקורי חיונית ליצירת
              המשכיות טבעית ולא מלאכותית.
            </p>
          </div>

          {/* הדרגתיות בקו השיער */}
          <div className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-dark-blue mb-4">
                הדרגתיות בקו השיער
              </h3>
            </div>
            <p className="text-dark-blue/80 leading-relaxed">
              בקו הקדמי מושתלים תחילה זקיקים בודדים, ובהדרגה
              נוספים זקיקים מרובי שערות. כך מתקבלת מראה
              "מתמזג" רך וטבעי.
            </p>
          </div>

          {/* חוסר אחידות טבעית */}
          <div className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-dark-blue mb-4">
                חוסר אחידות טבעית
              </h3>
            </div>
            <p className="text-dark-blue/80 leading-relaxed">
              השיער אינו גדל בקווים ישרים לחלוטין. יצירת
              גבולות מעט לא אחידים מדמה את אופן הצמיחה הטבעי
              ומונעת מראה מלאכותי.
            </p>
          </div>

          {/* תוצאה סופית */}
          <div className="group bg-gradient-to-br from-gold/5 to-gold/10 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gold/20 md:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-dark-blue mb-4">
                תוצאה טבעית מושלמת
              </h3>
            </div>
            <p className="text-dark-blue/80 leading-relaxed font-medium">
              בזכות שילוב עקרונות אלו, השתלת שיער מתבצעת כך
              שהתוצאה הסופית נראית טבעית לחלוטין – כאילו לא
              בוצע טיפול כלל, אלא השיער פשוט צמח מחדש.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
