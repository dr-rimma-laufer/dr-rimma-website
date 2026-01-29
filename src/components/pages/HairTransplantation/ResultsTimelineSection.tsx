'use client';
import React from "react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";

export function ResultsTimelineSection() {
  return (
    <section className="h-screen bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Title and Description */}
      <div className="text-center py-8 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-blue mb-6">
          ציר זמן השתלת השיער - מההשתלה לתוצאה הסופית
        </h2>
        <p className="text-xl text-dark-blue/80 max-w-4xl mx-auto leading-relaxed">
          תהליך השבת השיער הוא מסע של כשנה, המתחיל ברגע ההשתלה
          ומגיע לשיאו בתוצאה הטבעית הסופית. כל שלב בציר הזמן
          מציג שלב שונה בתהליך הריפוי והצמיחה המחודשת.
        </p>
      </div>

      {/* Desktop & Tablet Layout */}
      <div className="hidden md:flex h-full">
        {/* Scrollable Content Container - Left side */}
        <div className="w-1/2 h-full overflow-y-auto scrollbar-hide px-8 lg:px-12">
          <div className="space-y-8 py-8">
            {/* Basic Understanding */}
            <div>
              <h3 className="text-2xl font-bold text-dark-blue mb-4">
                הבנה בסיסית של המחזור והנשירה
              </h3>
              <p className="text-dark-blue/80 leading-relaxed text-lg">
                מיד לאחר ההשתלה חלק גדול מהשערות באזור המושתל
                נכנס למחזור מנוחה (טלוגן) ובהמשך לנשירה
                (אקסוגן), תהליך תקין שבו השערות הישנות נושרות
                כדי לפנות מקום לצמיחה חדשה בזקיקים.
                בשבועות–חודשים הראשונים הדבר יכול להתבטא
                בנשירה מורגשת ואף במראה "מנומר", אך זהו שלב
                צפוי המאותת על מעבר המחזור לצמיחה מחדש. לעיתים
                70–80% מהשערות המושתלות ינשרו בשלב זה, ולאחר
                כ-3–5 חודשים מתחילים לראות צמיחה חדשה הדרגתית.
              </p>
            </div>

            {/* ימים 0-7 */}
            <div>
              <h3 className="text-2xl font-bold text-dark-blue mb-4">
                ימים 0–7
              </h3>
              <p className="text-dark-blue/80 leading-relaxed text-lg">
                בשבוע הראשון שני האזורים, התורם והמקבל נמצאים
                בריפוי פעיל. בתקופה זו עשויים להופיע גלדים,
                גרד קל ולעיתים נקודות דמיות עדינות, כולן
                תופעות צפויות.
              </p>
            </div>

            {/* שבועיים-שלושה שבועות */}
            <div>
              <h3 className="text-2xl font-bold text-dark-blue mb-4">
                שבועיים–שלושה שבועות
              </h3>
              <p className="text-dark-blue/80 leading-relaxed text-lg">
                סביב שבועיים הנפיחות בד"כ שוככת, הגלדים
                ממשיכים לנשור באופן טבעי. עד שבוע שלישי רוב
                הנפיחות והגלדים כמעט נעלמים, והאדמומיות לאורך
                קו השיער דועכת בהדרגה. בתקופה זו מתחילים
                לעיתים לראות את תחילת הנשירה באזור המקבל כחלק
                ממחזור השיער, ולכן המראה יכול להיראות לא אחיד
                לזמן קצר אף על פי שהזקיקים עצמם "בריאים"
                ומתכוננים לצמיחה מחדש.
              </p>
            </div>

            {/* חודש-חודשיים */}
            <div>
              <h3 className="text-2xl font-bold text-dark-blue mb-4">
                חודש–חודשיים
              </h3>
              <p className="text-dark-blue/80 leading-relaxed text-lg">
                סביב חודש מהניתוח יותר ויותר שיערות באזור
                המושתל נכנסות למנוחה ונושרות, וזהו המנגנון
                המרכזי שמסביר את "שיא" הנשירה לאחר ההשתלה;
                באזור התורם השיער כבר מכסה בדרך־כלל את סימני
                הנטילה. במהלך החודש השני הנשירה נוטה לפחות
                בהדרגה ומתחילים לזהות צמיחה חדשה אך לא אחידה,
                כאשר שיערות שלא נשרו עשויות להיראות דקות
                וחלשות זמנית עד שיתעבו.
              </p>
            </div>

            {/* שלושה-ארבעה חודשים */}
            <div>
              <h3 className="text-2xl font-bold text-dark-blue mb-4">
                שלושה–ארבעה חודשים
              </h3>
              <p className="text-dark-blue/80 leading-relaxed text-lg">
                בתחילת החודש השלישי מתחילות להופיע שערות
                "צעירות"—דקות ובהירות יותר—ולעתים יכולים
                להופיע פצעונים/פוליקוליטיס קלים סביב זקיקים
                מתעוררים, זה בדרך־כלל מצב קל שמגיב לטיפול
                מקומי אנטיביוטי לפי הנחיית המרפאה. לקראת החודש
                הרביעי קצב הצמיחה מתייצב וממוצע ההתקדמות הוא
                בערך 1 ס"מ לחודש, כך שהשינוי עדיין מתון אך
                עקבי.
              </p>
            </div>

            {/* ארבעה-שישה חודשים */}
            <div>
              <h3 className="text-2xl font-bold text-dark-blue mb-4">
                ארבעה–שישה חודשים
              </h3>
              <p className="text-dark-blue/80 leading-relaxed text-lg">
                זהו שלב שבו הצמיחה מורגשת יותר, התעבות הדרגתית
                ושיער שכבר "אפשר לסרק", אם כי צפיפות ואחידות
                מלאות טרם הושגו. סביב חצי שנה התקדמות נעשית
                מוחשית: השיערות מתעבות ומתחזקות, והכיסוי עשוי
                להגיע עד כ-80% מן התוצאה הסופית לפי אחד
                המקורות, כאשר תמונות התקדמות רבות מראות אורך
                ואיכות משתפרים כבר סביב חודש 6.
              </p>
            </div>

            {/* תשעה-שניים עשר חודשים */}
            <div>
              <h3 className="text-2xl font-bold text-dark-blue mb-4">
                תשעה–שניים־עשר חודשים
              </h3>
              <p className="text-dark-blue/80 leading-relaxed text-lg">
                השיער ממשיך לצמוח בקצב של כ-1–2 ס"מ לחודש,
                מתעבה ומשתלב במרקם ובצבע עם השיער הקיים, זוהי
                לרוב ה"קפיצה" שמביאה לתחושת מראה שלם, וניתן
                להסתפר ולעצב כרגיל. לפי עקומת הזמן הקלאסית זהו
                השלב שבו רוב המטופלים חווים את התוצאה הרצויה
                ומעבר לחצי שנה כבר מרגישים שיפור עקבי.
              </p>
            </div>

            {/* סביב שנה לשנה וחצי */}
            <div>
              <h3 className="text-2xl font-bold text-dark-blue mb-4">
                סביב שנה לשנה וחצי
              </h3>
              <p className="text-dark-blue/80 leading-relaxed text-lg">
                בקירוב לשנה לאחר ההשתלה מתקבל לרוב המראה
                הסופי; כל השערות המושתלות אמורות לחדור את
                העור, להתכהות ולהתעבות, והתוצאה נראית ומרגישה
                טבעית לחלוטין – ומשם אפשר ליהנות ולטפל בשיער
                כמו בשגרת חיים רגילה.
              </p>
            </div>
          </div>
        </div>

        {/* Fixed Image Container - Right side */}
        <div className="w-1/2 h-full relative">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1649298173603-9c95aa950879?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2FsZW5kYXIlMjBoYWlyJTIwdHJhbnNwbGFudCUyMHRpbWVsaW5lfGVufDF8fHx8MTc1ODczNDIzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="ציר זמן השתלת שיער"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden h-[calc(100vh-160px)] px-4">
        <div className="h-full overflow-y-auto scrollbar-hide">
          <div className="space-y-6 pb-8">
            {/* Mobile Image */}
            <div className="relative h-48 w-full rounded-lg overflow-hidden mb-6">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1649298173603-9c95aa950879?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2FsZW5kYXIlMjBoYWlyJTIwdHJhbnNwbGFudCUyMHRpbWVsaW5lfGVufDF8fHx8MTc1ODczNDIzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="ציר זמן השתלת שיער"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/5 to-transparent"></div>
            </div>

            {/* ימים 0-7 */}
            <div>
              <h3 className="text-xl font-bold text-dark-blue mb-3">
                ימים 0–7
              </h3>
              <p className="text-dark-blue/80 leading-relaxed">
                בשבוע הראשון שני האזורים, התורם והמקבל נמצאים
                בריפוי פעיל. בתקופה זו עשויים להופיע גלדים,
                גרד קל ולעיתים נקודות דמיות עדינות, כולן
                תופעות צפויות.
              </p>
            </div>

            {/* שבועיים-שלושה שבועות */}
            <div>
              <h3 className="text-xl font-bold text-dark-blue mb-3">
                שבועיים–שלושה שבועות
              </h3>
              <p className="text-dark-blue/80 leading-relaxed">
                סביב שבועיים הנפיחות בד"כ שוככת, הגלדים
                ממשיכים לנשור באופן טבעי. עד שבוע שלישי רוב
                הנפיחות והגלדים כמעט נעלמים, והאדמומיות לאורך
                קו השיער דועכת בהדרגה. בתקופה זו מתחילים
                לעיתים לראות את תחילת הנשירה באזור המקבל כחלק
                ממחזור השיער, ולכן המראה יכול להיראות לא אחיד
                לזמן קצר אף על פי שהזקיקים עצמם "בריאים"
                ומתכוננים לצמיחה מחדש.
              </p>
            </div>

            {/* חודש-חודשיים */}
            <div>
              <h3 className="text-xl font-bold text-dark-blue mb-3">
                חודש–חודשיים
              </h3>
              <p className="text-dark-blue/80 leading-relaxed">
                סביב חודש מהניתוח יותר ויותר שיערות באזור
                המושתל נכנסות למנוחה ונושרות, וזהו המנגנון
                המרכזי שמסביר את "שיא" הנשירה לאחר ההשתלה;
                באזור התורם השיער כבר מכסה בדרך־כלל את סימני
                הנטילה. במהלך החודש השני הנשירה נוטה לפחות
                בהדרגה ומתחילים לזהות צמיחה חדשה אך לא אחידה,
                כאשר שיערות שלא נשרו עשויות להיראות דקות
                וחלשות זמנית עד שיתעבו.
              </p>
            </div>

            {/* שלושה-ארבעה חודשים */}
            <div>
              <h3 className="text-xl font-bold text-dark-blue mb-3">
                שלושה–ארבעה חודשים
              </h3>
              <p className="text-dark-blue/80 leading-relaxed">
                בתחילת החודש השלישי מתחילות להופיע שערות
                "צעירות"—דקות ובהירות יותר—ולעתים יכולים
                להופיע פצעונים/פוליקוליטיס קלים סביב זקיקים
                מתעוררים, זה בדרך־כלל מצב קל שמגיב לטיפול
                מקומי אנטיביוטי לפי הנחיית המרפאה. לקראת החודש
                הרביעי קצב הצמיחה מתייצב וממוצע ההתקדמות הוא
                בערך 1 ס"מ לחודש, כך שהשינוי עדיין מתון אך
                עקבי.
              </p>
            </div>

            {/* ארבעה-שישה חודשים */}
            <div>
              <h3 className="text-xl font-bold text-dark-blue mb-3">
                ארבעה–שישה חודשים
              </h3>
              <p className="text-dark-blue/80 leading-relaxed">
                זהו שלב שבו הצמיחה מורגשת יותר, התעבות
                הדרגתית ושיער שכבר "אפשר לסרק", אם כי צפיפות
                ואחידות מלאות טרם הושגו. סביב חצי שנה התקדמות
                נעשית מוחשית: השיערות מתעבות ומתחזקות, והכיסוי
                עשוי להגיע עד כ-80% מן התוצאה הסופית לפי אחד
                המקורות, כאשר תמונות התקדמות רבות מראות אורך
                ואיכות משתפרים כבר סביב חודש 6.
              </p>
            </div>

            {/* תשעה-שניים עשר חודשים */}
            <div>
              <h3 className="text-xl font-bold text-dark-blue mb-3">
                תשעה–שניים־עשר חודשים
              </h3>
              <p className="text-dark-blue/80 leading-relaxed">
                השיער ממשיך לצמוח בקצב של כ-1–2 ס"מ לחודש,
                מתעבה ומשתלב במרקם ובצבע עם השיער הקיים, זוהי
                לרוב ה"קפיצה" שמביאה לתחושת מראה שלם, וניתן
                להסתפר ולעצב כרגיל. לפי עקומת הזמן הקלאסית זהו
                השלב שבו רוב המטופלים חווים את התוצאה הרצויה
                ומעבר לחצי שנה כבר מרגישים שיפור עקבי.
              </p>
            </div>

            {/* סביב שנה לשנה וחצי */}
            <div>
              <h3 className="text-xl font-bold text-dark-blue mb-3">
                סביב שנה לשנה וחצי
              </h3>
              <p className="text-dark-blue/80 leading-relaxed">
                בקירוב לשנה לאחר ההשתלה מתקבל לרוב המראה
                הסופי; כל השערות המושתלות אמורות לחדור את
                העור, להתכהות ולהתעבות, והתוצאה נראית ומרגישה
                טבעית לחלוטין – ומשם אפשר ליהנות ולטפל בשיער
                כמו בשגרת חיים רגילה.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
