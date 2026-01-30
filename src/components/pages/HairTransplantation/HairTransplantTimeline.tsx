'use client';
import React, { useState } from 'react';
import calendarImage from '../../../assets/54f1e698f608149f95a784bb87ad536a3722a109_converted.jpg';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

interface TimelineItemProps {
  period: string;
  title: string;
  description: string;
  bgImage: string;
  imageSection: number;
  totalSections: number;
}

interface TimelineData {
  period: string;
  title: string;
  description: string;
  imageSection: number;
}

interface HairTransplantTimelineProps {
  calendarImage?: string;
  className?: string;
  height?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  period, 
  title, 
  description, 
  bgImage, 
  imageSection, 
  totalSections 
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const baseWidth = 100 / totalSections;

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.5s ease-in-out',
        width: isHovered ? `${baseWidth + 5}%` : `${baseWidth}%`,
        height: '100%',
        minHeight: '500px',
        color: '#fff',
        borderLeft: '1px solid rgba(255, 255, 255, 0.3)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transition: 'all 0.5s',
          backgroundImage: `url(${typeof bgImage === 'string' ? bgImage : bgImage.src})`,
          backgroundPosition: `${imageSection * (100/(totalSections-1))}% center`,
          backgroundSize: `${totalSections * 100}% 100%`,
          backgroundRepeat: 'no-repeat',
          filter: isHovered ? 'grayscale(100%) brightness(0.7)' : 'grayscale(0%) brightness(1)'
        }}
      />
      
      {/* Dark Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transition: 'all 0.5s',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 75%)',
          opacity: isHovered ? 1 : 0
        }}
      />
      
      {/* Period Display */}
      <div
        style={{
          position: 'absolute',
          zIndex: 10,
          transition: 'all 0.5s',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          border: '3px solid #fff',
          padding: '0.8em 1.5em',
          backgroundColor: 'transparent',
          opacity: isHovered ? 0 : 1,
          pointerEvents: isHovered ? 'none' : 'auto'
        }}
      >
        <p style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          whiteSpace: 'nowrap',
          margin: 0,
          lineHeight: 1.2,
          color: '#101828'
        }}>
          {period}
        </p>
      </div>
      
      {/* Content */}
      <div
        style={{
          position: 'absolute',
          zIndex: 20,
          textAlign: 'center',
          padding: '0 1rem',
          transition: 'all 0.7s',
          top: '50%',
          right: 0,
          left: 0,
          transform: 'translateY(-50%)',
          opacity: isHovered ? 1 : 0,
          pointerEvents: isHovered ? 'auto' : 'none'
        }}
      >
        <h1 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
          letterSpacing: '0.05em'
        }}>
          {title}
        </h1>
        <p style={{
          fontSize: '0.875rem',
          lineHeight: '1.625',
          textAlign: 'right',
          padding: '0 0.5rem'
        }}>
          {description}
        </p>
      </div>
    </div>
  );
};

const HairTransplantTimeline: React.FC<HairTransplantTimelineProps> = ({ 
  calendarImage: customCalendarImage,
  className = '',
  height = '70vh'
}) => {
  const bgImage = customCalendarImage || calendarImage;
  
  const timelineData: TimelineData[] = [
    {
      period: 'ימים 0-7',
      title: 'ימים 0–7',
      description: 'בשבוע הראשון שני האזורים, התורם והמקבל נמצאים בריפוי פעיל. בתקופה זו עשויים להופיע גלדים, גרד קל ולעיתים נקודות דמיות עדינות, כולן תופעות צפויות.',
      imageSection: 6
    },
    {
      period: 'שבועיים-3',
      title: 'שבועיים–שלושה שבועות',
      description: 'סביב שבועיים הנפיחות בד"כ שוככת, הגלדים ממשיכים לנשור באופן טבעי. עד שבוע שלישי רוב הנפיחות והגלדים כמעט נעלמים, והאדמומיות לאורך קו השיער דועכת בהדרגה. בתקופה זו מתחילים לעיתים לראות את תחילת הנשירה באזור המקבל כחלק ממחזור השיער, ולכן המראה יכול להיראות לא אחיד לזמן קצר אף על פי שהזקיקים עצמם "בריאים" ומתכוננים לצמיחה מחדש.',
      imageSection: 5
    },
    {
      period: 'חודש-חודשיים',
      title: 'חודשיים - חודש',
      description: 'סביב חודש מהניתוח יותר ויותר שיערות באזור המושתל נכנסות למנוחה ונושרות, וזהו המנגנון המרכזי שמסביר את "שיא" הנשירה לאחר ההשתלה; באזור התורם השיער כבר מכסה בדרך־כלל את סימני הנטילה. במהלך החודש השני הנשירה נוטה לפחות בהדרגה ומתחילים לזהות צמיחה חדשה אך לא אחידה, כאשר שיערות שלא נשרו עשויות להיראות דקות וחלשות временית עד שיתעבו.',
      imageSection: 4
    },
    {
      period: '3-4 חודשים',
      title: 'שלושה–ארבעה חודשים',
      description: 'בתחילת החודש השלישי מתחילות להופיע שערות "צעירות"—דקות ובהירות יותר—ולעתים יכולים להופיע פצעונים/פוליקוליטיס קלים סביב זקיקים מתעוררים, זה דרך־כלל מצב קל שמגיב לטיפול מקומי אנטיביוטי לפי הנחיית המרפאה. לקראת החודש הרביעי קצב הצמיחה מתייצב וממוצע ההתקדמות הוא בערך 1 ס"מ לחודש, כך שהשינוי עדיין מתון אך עקבי.',
      imageSection: 3
    },
    {
      period: '4-6 חודשים',
      title: 'ארבעה–שישה חודשים',
      description: 'זהו שלב שבו הצמיחה מורגשת יותר, התעבות הדרגתית ושיער שכבר "אפשר לסרק", אם כי צפיפות ואחידות מלאות טרם הושגו. סביב חצי שנה התקדמות נעשית מוחשית: השיערות מתעבות ומתחזקות, והכיסוי עשוי להגיע עד כ-80% מן התוצאה הסופית לפי אחד המקורות, כאשר תמונות התקדמות רבות מראות אורך ואיכות משתפרים כבר סביב חודש 6.',
      imageSection: 2
    },
    {
      period: '9-12 חודשים',
      title: 'תשעה–שניים־עשר חודשים',
      description: 'השיער ממשיך לצמוח בקצב של כ-1–2 ס"מ לחודש, מתעבה ומשתלב במרקם ובצבע עם השיער הקיים, זוהי לרוב ה"קפיצה" שמביאה לתחושת מראה שלם, וניתן להסתפר ולעצב כרגיל. לפי עקומת הזמן הקלאסית זהו השלב שבו רוב המטופלים חווים את התוצאה הרצויה ומעבר לחצי שנה כבר מרגישים שיפור עקבי.',
      imageSection: 1
    },
    {
      period: 'שנה-שנה וחצי',
      title: 'סביב שנה לשנה וחצי',
      description: 'בקירוב לשנה לאחר ההשתלה מתקבל לרוב המראה הסופי; כל השערות המושתלות אמורות לחדור את העור, להתכהות ולהתעבות, והתוצאה נראית ומרגישה טבעית לחלוטין – ומשם אפשר ליהנות ולטפל בשיער כמו בשגרת חיים רגילה.',
      imageSection: 0
    }
  ];

  return (
    <section 
      className={className}
      style={{ 
        backgroundColor: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        direction: 'rtl'
      }}
    >
      {/* Desktop & Tablet Layout */}
      <div className="hidden md:block">
        {/* Header Section with Blue Background */}
        <div className="bg-[#031625] text-white text-center py-8 px-4">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
            ציר זמן השתלת השיער - מההשתלה לתוצאה הסופית
          </h2>
          <p className="text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto">
            תהליך השבת השיער הוא מסע של כשנה, המתחיל ברגע ההשתלה
            ומגיע לשיאו בתוצאה הטבעית הסופית. כל שלב בציר הזמן
            מציג שלב שונה בתהליך הריפוי והצמיחה מחודשת.
          </p>
        </div>

        {/* Two Columns Layout */}
        <div className="flex" style={{ height: height, minHeight: '500px' }}>
          {/* Right Column - Description (30%) */}
          <div 
            className="flex flex-col justify-center px-8 lg:px-12"
            style={{ width: '30%' }}
          >
            <div>
              <h3 className="text-2xl font-bold text-[#031625] mb-4">
                הבנה בסיסית של המחזור והנשירה
              </h3>
              <p className="text-[#031625]/80 leading-relaxed text-lg">
                מיד לאחר ההשתלה חלק גדול מהשערות באזור המושתל
                נכנס למחזור מנוחה ובהמשך לנשירה
                ,תהליך תקין שבו השערות הישנות נושרות
                כדי לפנות מקום לצמיחה חדשה בזקיקים.
                בשבועות–חודשים הראשונים הדבר יכול להתבטא
                בנשירה מורגשת ואף במראה "מנомер", אך זהו שלב
                צפוי המאותת על מעבר המחזור לצמיחה מחדש. לעיתים
                70–80% מהשערות המושתלות ינשרו בשלב זה, وبعد
                כ-3–5 חודשים מתחילים לראות צמיחה חדשה הדרגתית.
              </p>
            </div>
          </div>

          {/* Left Column - Interactive Calendar (70%) */}
          <div
            className="flex"
            style={{ 
              width: '70%',
              overflow: 'hidden'
            }}
          >
            {timelineData.map((item, index) => (
              <TimelineItem
                key={index}
                period={item.period}
                title={item.title}
                description={item.description}
                bgImage={bgImage}
                imageSection={item.imageSection}
                totalSections={timelineData.length}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Header Section with Blue Background */}
        <div className="bg-[#031625] text-white text-center py-8 px-4">
          <h2 className="text-3xl font-bold">
            ציר זמן השתלת השיער - מההשתלה לתוצאה הסופית
          </h2>
        </div>

        {/* Mobile Image */}
        <div className="px-4 pb-8">
          <div className="relative h-48 w-full rounded-lg overflow-hidden mb-6 mt-6">
            <ImageWithFallback
              src={typeof bgImage === 'string' ? bgImage : bgImage.src}
              alt="ציר זמן השתלת שיער"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          {/* Description on White Background */}
          <p className="text-xl leading-relaxed text-[#031625]/80 mb-8">
            תהליך השבת השיער הוא מסע של כשנה, המתחיל ברגע ההשתלה
            ומגיע לשיאו בתוצאה הטבעית הסופית. כל שלב בציר הזמן
            מציג שלב שונה בתהליך הריפוי והצמיחה מחודשת.
          </p>

          {/* Mobile Timeline Items */}
          <div className="space-y-6">
            {timelineData.map((item, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold text-[#031625] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#031625]/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HairTransplantTimeline;